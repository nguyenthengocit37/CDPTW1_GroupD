import { AbstractEntity } from '@common/abstract.entity';
import { Entity, Column, JoinTable, ManyToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { JobTitle } from './JobTitle';
import { WorkType } from './WorkType';
import { Company } from './Company';
import { Skill } from './Skill';

@Entity()
export class Job extends AbstractEntity {
  @OneToOne(() => JobTitle, { cascade: true, eager: true })
  @JoinColumn()
  jobTitle: JobTitle;
  @Column({ type: 'longtext' })
  description: string;
  @Column({ default: 0 })
  salary?: number = 0;
  @ManyToOne(() => WorkType, (workType) => workType.id, {
    cascade: true,
    eager: true,
  })
  workType: WorkType;
  @ManyToOne(() => Company, (company) => company.id, {
    cascade: true,
    eager: true,
  })
  company: Company;
  @ManyToMany(() => Skill, { cascade: true, eager: true })
  @JoinTable()
  skills: Skill[];
  @Column({ unique: true })
  slug: string;
}
