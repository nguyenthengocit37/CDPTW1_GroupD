import { Company } from './company.dto';

export class JobCrawl {
  title: string;
  description: string;
  salary?: number;
  workTypes: Array<string>;
  company: Company;
  skills?: Array<string>;
  city: string;
}
