import { JobTitle } from './JobTitle';
import { WorkType } from './WorkType';
import { Company } from './Company';
import { Skill } from './Skill';
import { AbstractType } from './abstractType';

export interface Job extends AbstractType {
  jobTitle: JobTitle;
  description: string;
  salary?: number;
  workType: WorkType;
  skills: Skill[];
  company: Company;
  slug: string;
}
