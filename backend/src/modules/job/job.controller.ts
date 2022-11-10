import { Controller, Delete, Get, Param } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  job() {
    return this.jobService.findAll();
  }
  @Get('crawl')
  crawl() {
    return this.jobService.crawlDataViaPuppeteer();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOneById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobService.remove(+id);
  }
}
