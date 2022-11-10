import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import slugify from 'slugify';

import { JobCrawl } from './dto/jobCrawl.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { WorkType } from '@root/entity/WorkType';
import { JobTitle } from '@root/entity/JobTitle';
import { Skill } from '@root/entity/Skill';
import { City } from '@root/entity/City';
import { Job } from '@root/entity/Job';
import { Company } from '@root/entity/Company';
import { CompanyDto } from './dto/company.dto';
import { CityService } from '../city/city.service';

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
  async crawlDataViaPuppeteer() {
    const DOMAIN_URL = 'https://itviec.com';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--window-size=1920,1080'],
    });
    const page = await browser.newPage();
    await page.goto(`${DOMAIN_URL}/it-jobs`);
    let isNewJobs = true;
    while ((await page.$('.search-page__jobs-pagination a[rel="next"]')) && isNewJobs) {
      const jobUrls: string[] = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.job .job__description .title a')).map((job: Element) =>
          job.getAttribute('href'),
        );
      });

      // crawl from job detail page
      for (const jobUrl of jobUrls) {
        const newPage = await browser.newPage();
        await newPage.goto(`${DOMAIN_URL}${jobUrl}`, {
          waitUntil: 'networkidle0',
        });

        // wait for image to be loaded
        await newPage.waitForSelector('.jd-page__employer-overview .employer-long-overview__logo img', {
          visible: true,
          timeout: 5000, //5 second
        });

        const job: JobCrawl = await newPage.evaluate(() => {
          const title = document.querySelector('.job-details__title')?.textContent.trim();
          const description = document.querySelector('.job-details__paragraph').innerHTML;
          const workTypes = Array.from(
            document.querySelectorAll('.svg-icon__box[data-bs-original-title] div.svg-icon__text span'),
          ).map((skill) => skill?.textContent.trim());
          const skills: string[] = Array.from(
            document.querySelectorAll('.job-details .job-details__tag-list>a>span'),
          ).map((skill) => skill?.textContent.trim());
          const cityCrawl = document
            .querySelector('.job-details__overview .svg-icon .svg-icon__text span')
            ?.textContent.trim();
          const city = cityCrawl.split(',').pop(); //get city name
          const company: CompanyDto = {
            name: document
              .querySelector('.jd-page__employer-overview .employer-long-overview__name>a')
              ?.textContent.trim(),
            description: document
              .querySelector('.jd-page__employer-overview .employer-long-overview__short-desc')
              ?.textContent.trim(),
            imageUrl: document
              .querySelector('.jd-page__employer-overview .employer-long-overview__logo img')
              .getAttribute('src'),
          };
          return {
            title,
            description,
            workTypes,
            skills,
            city,
            company,
          };
        });

        let companyExist = await this.companyRepository.findOneBy({ name: job.company.name });

        if (!companyExist) {
          let cityExist = await this.cityService.findOneByCondition({ name: job.city });
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

        const workTypes: WorkType[] = await Promise.all(
          job.workTypes.map(async (workType) => {
            let workTypeExist = await this.workTypeRepository.findOneBy({ name: workType });
            if (!workTypeExist) {
              workTypeExist = this.workTypeRepository.create({ name: workType });
            }
            return workTypeExist;
          }),
        );
        const skills: Skill[] = await Promise.all(
          job.skills.map(async (skill) => {
            let skillExist = await this.skillRepository.findOneBy({ name: skill });
            if (!skillExist) {
              skillExist = this.skillRepository.create({ name: skill });
            }
            return skillExist;
          }),
        );

        const jobTitle = this.jobTitleRepository.create({ title: job.title });

        const slug = slugify(`${job.company.name}${job.title}`, {
          lower: true,
        });
        const jobExist = await this.jobRepository.findOneBy({ slug });
        if (jobExist) {
          isNewJobs = false;
          break;
        }
        const newJob = this.jobRepository.create({
          jobTitle,
          description: job.description,
          workType: workTypes,
          company: companyExist,
          skill: skills,
          slug,
        });
        await this.jobRepository.save(newJob);
        console.log('done::::');

        await newPage.close();
      }
      if (isNewJobs) {
        await page.click('a[rel="next"]');
        await page.waitForSelector('.job', { visible: true });
      }
    }
    console.log('crawl done::::');
    return 'success';
  }
  async findAll(): Promise<Job[]> {
    return await this.jobRepository.find();
  }
  async findByCondition(condition: any): Promise<Job[]> {
    return await this.jobRepository.find(condition);
  }
  async findOneById(id: number): Promise<Job> {
    return await this.jobRepository.findOneBy({ id });
  }
  async findOneByCondition(condition: any): Promise<Job> {
    return await this.jobRepository.findOneBy(condition);
  }
  async remove(id: number): Promise<DeleteResult> {
    return await this.jobRepository.delete(id);
  }
}
