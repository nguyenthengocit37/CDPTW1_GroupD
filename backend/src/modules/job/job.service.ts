import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

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
    await page.goto(`${URL}/it-jobs`);
    while (await page.$('.search-page__jobs-pagination a[rel="next"]')) {
      const jobUrls: string[] = await page.evaluate(() => {
        return Array.from(
          document.querySelectorAll('.job .job__description .title a'),
        ).map((job: Element) => job.getAttribute('href'));
      });
      // crawl from job detail page
      for (const jobUrl of jobUrls) {
        const newPage = await browser.newPage();
        await newPage.goto(`${DOMAIN_URL}${jobUrl}`, {
          waitUntil: 'networkidle0',
        });
        const jobDescription: string = await newPage.evaluate(
          () => document.querySelector('.job-details__title')?.textContent,
        );
        console.log('description:', jobDescription);
        await newPage.close();
      }

      await page.click('a[rel="next"]');
      await page.waitForSelector('.job', { visible: true });
    }
  }
}
