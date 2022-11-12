import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { Job } from '@root/entity/Job';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  job(@Query() query): Promise<Job[]> {
    return this.jobService.findAll(query);
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
