import { AbstractEntity } from '@common/abstract.entity';
import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { JobTitle } from './JobTitle';
import { WorkType } from './WorkType';
import { Company } from './Company';
import { Skill } from './Skill';

@Entity()
export class Job extends AbstractEntity {
  @OneToOne(() => JobTitle)
  @JoinColumn()
  jobTitle: JobTitle;
  @Column()
  description: string;
  @Column()
  salary: number;
  @OneToMany(() => WorkType, (workType) => workType.job)
  workType: WorkType[];
  @ManyToOne(() => Company, (company) => company.id)
  company: Company;
  @ManyToMany(() => Skill)
  @JoinTable()
  skill: Skill[];
}
