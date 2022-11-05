import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class JobService {
  sayHello() {
    return 'hello';
  }
  async crawlDataViaPuppeteer() {
    const URL = 'https://itviec.com/it-jobs';
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(URL);
    await page.evaluate(() => {
      document.querySelectorAll('.job').forEach((element) => {
        function getTextContent(element: Element, selector: string): string {
          return element.querySelector(selector)?.textContent;
        }
        const data = {
          title: getTextContent(element, '.job__description a'),
        };
        console.log(data);

        // return data;
      });
    });
    // await browser.close();
    // return;
  }
}
