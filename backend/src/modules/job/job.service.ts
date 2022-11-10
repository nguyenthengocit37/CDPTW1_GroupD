import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Company } from './dto/company.dto';
import { JobCrawl } from './dto/jobCrawl.dto';

@Injectable()
export class JobService {
  sayHello() {
    return 'hello';
  }
  async crawlDataViaPuppeteer() {
    const DOMAIN_URL = 'https://itviec.com';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(`${DOMAIN_URL}/it-jobs`);
    while (await page.$('.search-page__jobs-pagination a[rel="next"]')) {
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

        const job: JobCrawl = await newPage.evaluate(() => {
          const title = document.querySelector('.job-details__title')?.textContent;
          const description = document.querySelector('.job-details__paragraph').innerHTML;
          const workTypes = Array.from(
            document.querySelectorAll('.svg-icon__box[data-bs-original-title] div.svg-icon__text span'),
          ).map((skill) => skill?.textContent);
          const skills: string[] = Array.from(
            document.querySelectorAll('.job-details .job-details__tag-list>a>span'),
          ).map((skill) => skill?.textContent);
          const city = document.querySelector('.job-details__overview .svg-icon .svg-icon__text span')?.textContent;
          const company: Company = {
            name: document.querySelector('.jd-page__employer-overview .employer-long-overview__name>a')?.textContent,
            description: document.querySelector('.jd-page__employer-overview .employer-long-overview__short-desc')
              ?.textContent,
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
        console.log(job);

        await newPage.close();
      }

      await page.click('a[rel="next"]');
      await page.waitForSelector('.job', { visible: true });
    }
  }
}
