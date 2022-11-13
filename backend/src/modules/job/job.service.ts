import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import slugify from 'slugify';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { JobCrawl } from './dto/jobCrawl.dto';
import { WorkType } from '@root/entity/WorkType';
import { JobTitle } from '@root/entity/JobTitle';
import { Skill } from '@root/entity/Skill';
import { Job } from '@root/entity/Job';
import { Company } from '@root/entity/Company';
import { CompanyDto } from './dto/company.dto';
import { CityService } from '../city/city.service';
import { City } from '@root/entity/City';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(WorkType)
    private readonly workTypeRepository: Repository<WorkType>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(JobTitle)
    private readonly jobTitleRepository: Repository<JobTitle>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    private readonly cityService: CityService,
  ) {}
  sayHello() {
    return 'hello';
  }
  /**
   *  @Cron config
   *    * * * * * *
   *    | | | | | |
   *   | | | | | day of week
   *   | | | | months
   *   | | | day of month
   *   | | hours
   *   | minutes
   *   seconds (optional)
   */
  @Cron('23 23 23 * * *') // It will be running when 23h:23m:23s once time
  async crawlDataViaPuppeteer() {
    const DOMAIN_URL = 'https://itviec.com';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--window-size=1920,1080'],
    });
    const page = await browser.newPage();
    await page.goto(`${DOMAIN_URL}/it-jobs`);

    let numberOfJobs = 0;
    const nextButtonSelector = '.search-page__jobs-pagination a[rel="next"]';
    while (await page.$(nextButtonSelector)) {
      const jobUrls: string[] = await page.evaluate(() => {
        const jobUrlSelector = '.job .job__description .title a';
        return Array.from(document.querySelectorAll(jobUrlSelector)).map((job: Element) => job.getAttribute('href'));
      });

      // crawl from job detail page
      for (const jobUrl of jobUrls) {
        const newPage = await browser.newPage();
        await newPage.goto(`${DOMAIN_URL}${jobUrl}`, {
          waitUntil: 'networkidle0',
        });
        const imageSelector = '.jd-page__employer-overview .employer-long-overview__logo img';
        // wait for image to be loaded
        await newPage.waitForSelector(imageSelector, {
          visible: true,
          timeout: 5000, //5 second
        });

        const job: JobCrawl = await newPage.evaluate(() => {
          const titleSelector = '.job-details__title';
          const descriptionSelector = '.job-details';
          const workTypeSelector = '.svg-icon__box[data-bs-original-title] div.svg-icon__text span';
          const skillSelector = '.job-details .job-details__tag-list>a>span';
          const citySelector = '.job-details__overview .svg-icon .svg-icon__text span';
          const nameCompanySelector = '.jd-page__employer-overview .employer-long-overview__name>a';
          const descriptionCompanySelector = '.jd-page__employer-overview .employer-long-overview__short-desc';
          const imageUrlCompanySelector = '.jd-page__employer-overview .employer-long-overview__logo img';

          const title = document.querySelector(titleSelector)?.textContent.trim();

          const workType = document.querySelector(workTypeSelector)?.textContent.trim();
          const skills: string[] = Array.from(document.querySelectorAll(skillSelector)).map((skill) =>
            skill?.textContent.trim(),
          );
          const cityCrawl = document.querySelector(citySelector)?.textContent.trim();
          const city = cityCrawl.split(',').pop(); //get city name
          const company: CompanyDto = {
            name: document.querySelector(nameCompanySelector)?.textContent.trim(),
            description: document.querySelector(descriptionCompanySelector)?.textContent.trim(),
            imageUrl: document.querySelector(imageUrlCompanySelector).getAttribute('src'),
          };

          const getDescription = () => {
            const descriptionElement = document.querySelector(descriptionSelector);
            //remove unnecessary elements in description
            descriptionElement.removeChild(descriptionElement.querySelector('.job-details__header'));
            descriptionElement.removeChild(descriptionElement.querySelector('.job-details__overview'));
            descriptionElement.removeChild(descriptionElement.querySelector('.job-details__divider'));
            return descriptionElement.innerHTML;
          };
          const description = getDescription();

          return {
            title,
            description,
            workType,
            skills,
            city,
            company,
          };
        });
        const slug = slugify(`${job.company.name}${job.title}`, {
          lower: true,
        });
        const jobExist: Job = await this.jobRepository.findOneBy({ slug });
        if (jobExist) {
          newPage.close();
          console.log('job exist:::', jobExist.jobTitle.title);
          continue;
        }

        let companyExist: Company = await this.companyRepository.findOneBy({ name: job.company.name });
        if (!companyExist) {
          let cityExist: City = await this.cityService.findOneByCondition({ name: job.city });
          if (!cityExist) {
            cityExist = await this.cityService.create({ name: job.city });
          }
          companyExist = this.companyRepository.create({
            name: job.company.name,
            description: job.company.description,
            imageUrl: job.company.imageUrl,
            city: [cityExist],
          });
        }

        let workTypeExist: WorkType = await this.workTypeRepository.findOneBy({ name: job.workType });
        if (!workTypeExist) {
          workTypeExist = this.workTypeRepository.create({ name: job.workType });
        }
        const skills: Skill[] = await Promise.all(
          job.skills.map(async (skill) => {
            let skillExist = await this.skillRepository.findOneBy({ name: skill });
            if (!skillExist) {
              skillExist = this.skillRepository.create({ name: skill });
            }
            return skillExist;
          }),
        );

        const jobTitle: JobTitle = this.jobTitleRepository.create({ title: job.title });

        const newJob: Job = this.jobRepository.create({
          jobTitle,
          description: job.description,
          workType: workTypeExist,
          company: companyExist,
          skills,
          slug,
        });
        await this.jobRepository.save(newJob);
        console.log(`done:::(${++numberOfJobs})`, newJob.jobTitle.title);
        await newPage.close();
      }
      await page.click('a[rel="next"]');
      await page.waitForSelector('.job', { visible: true });
    }
    numberOfJobs = 0;
    console.log('crawl done::::');
    return 'success';
  }
  async findAll(query: { take: number; page: number }): Promise<{count:number;data:Job[]}> {
    const take = query.take || 20;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const [data,count] = await this.jobRepository.findAndCount({
      order: { createdDate: 'DESC' },
      take,
      skip,
    });
    return {count,data}
  }
  async findByCondition(condition: any): Promise<Job[]> {
    return await this.jobRepository.find(condition);
  }
  async findOneBySlug(slug: string): Promise<Job> {
    return await this.jobRepository.findOneBy({ slug });
  }
  async findOneByCondition(condition: any): Promise<Job> {
    return await this.jobRepository.findOneBy(condition);
  }
  async remove(id: number): Promise<DeleteResult> {
    return await this.jobRepository.delete(id);
  }
}
