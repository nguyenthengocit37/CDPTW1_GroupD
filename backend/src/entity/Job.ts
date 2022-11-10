import { AbstractEntity } from '@common/abstract.entity';
import { Entity, Column, JoinTable, ManyToMany, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { JobTitle } from './JobTitle';
import { WorkType } from './WorkType';
import { Company } from './Company';
import { Skill } from './Skill';

@Entity()
export class Job extends AbstractEntity {
  @OneToOne(() => JobTitle, { cascade: true })
  @JoinColumn()
  jobTitle: JobTitle;
  @Column({ type: 'longtext' })
  description: string;
  @Column({ default: 0 })
  salary?: number = 0;
  @OneToMany(() => WorkType, (workType) => workType.job, {
    cascade: true,
  })
  workType: WorkType[];
  @ManyToOne(() => Company, (company) => company.id, {
    cascade: true,
  })
  company: Company;
  @ManyToMany(() => Skill, { cascade: true })
  @JoinTable()
  skill: Skill[];
  @Column({ unique: true })
  slug: string;
}
