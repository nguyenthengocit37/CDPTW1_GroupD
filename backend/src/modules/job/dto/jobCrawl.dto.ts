import { CompanyDto } from './company.dto';

export class JobCrawl {
  title: string;
  description: string;
  salary?: number;
  workTypes: Array<string>;
  company: CompanyDto;
  skills?: Array<string>;
  city: string;
}
