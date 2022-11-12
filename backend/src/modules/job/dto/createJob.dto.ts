import { IsString, IsNumber } from 'class-validator';
export class CreateJobDto {
  @IsNumber()
  jobTitleId: number;
  @IsString()
  description: string;
  @IsNumber()
  salary: number;
  @IsNumber()
  workTypeId: number;
  @IsNumber()
  companyId: number;
  @IsNumber()
  skillId: number;
}
