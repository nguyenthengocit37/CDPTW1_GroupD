import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkType } from 'src/entity/WorkType';
import { Skill } from 'src/entity/Skill';

@Module({
  controllers: [JobController],
  imports: [TypeOrmModule.forFeature([Skill])],
  providers: [JobService],
})
export class JobModule {}
