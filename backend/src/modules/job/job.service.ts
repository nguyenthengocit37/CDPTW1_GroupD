import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as puppeteer from 'puppeteer';
import { Skill } from 'src/entity/Skill';
import { Repository } from 'typeorm';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillReponsitory: Repository<Skill>,
  ) {}
  sayHello() {
    return 'hello';
  }
  async crawlDataViaPuppeteer() {
    const URL = 'https://itviec.com/it-jobs';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(URL);
    const data = await page.evaluate(() => {
      let skills = {};
      document.querySelectorAll('.job').forEach((element) => {
        const data = {
          name: element.querySelector('.job__description a')?.textContent,
        };
        skills = data;
      });
      return skills;
    });

    const skill = this.skillReponsitory.create(data);
    await this.skillReponsitory.save(skill);
    return skill;
    // await browser.close();
    // return;
  }
}
