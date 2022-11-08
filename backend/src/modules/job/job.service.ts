import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class JobService {
  sayHello() {
    return 'hello';
  }
  async crawlDataViaPuppeteer() {
    const URL = 'https://itviec.com';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(`${URL}/it-jobs`);
    while (await page.$('.search-page__jobs-pagination a[rel="next"]')) {
      const hrefs = await page.evaluate(() => {
        return Array.from(
          document.querySelectorAll('.job .job__description .title a'),
        ).map((job) => job.getAttribute('href'));
      });
      for (const href of hrefs) {
        await page.goto(`${URL}${href}`);
        const jobDescription = await page.evaluate(
          () => document.querySelector('.job-details__title')?.textContent,
        );
        console.log('hehe', jobDescription);
        await page.goBack();
      }
      await page.evaluate(() => {
        const element = document.querySelector(
          '.search-page__jobs-pagination a[rel="next"]',
        ) as HTMLElement;
        return element.click();
      });

      await page.waitForSelector('.job', { visible: true });
    }
  }
}
