import { Controller, Get } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  job() {
    return this.jobService.sayHello();
  }
  @Get('crawl')
  crawl() {
    return this.jobService.crawlDataViaPuppeteer();
  }
}
