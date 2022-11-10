import { CompanyDto } from './company.dto';

export class JobCrawl {
  title: string;
  description: string;
  salary?: number;
  workType: string;
  company: CompanyDto;
  skills: Array<string>;
  city: string;
}
