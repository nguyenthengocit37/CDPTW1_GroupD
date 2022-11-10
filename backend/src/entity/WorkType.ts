import { AbstractEntity } from '@common/abstract.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Job } from './Job';

@Entity()
export class WorkType extends AbstractEntity {
  @Column()
  name: string;
  @ManyToOne(() => Job, (job) => job.workType)
  job: Job;
}
