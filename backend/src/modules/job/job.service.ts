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
        const data = {
          title: element.querySelector('.job__description a')?.textContent,
          city: element.querySelector('.city .address .text')?.textContent,
        };
        console.log(data);
      });
    });
    // await browser.close();
    // return;
  }
}
