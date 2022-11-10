import { Job } from '@root/entity/Job';
import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkType } from '@root/entity/WorkType';
import { Company } from '@root/entity/Company';
import { JobTitle } from '@root/entity/JobTitle';
import { Skill } from '@root/entity/Skill';
import { City } from '@root/entity/City';
import { CityService } from '../city/city.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job, WorkType, Company, JobTitle, Skill, City])],
  controllers: [JobController],
  providers: [JobService, CityService],
})
export class JobModule {}
