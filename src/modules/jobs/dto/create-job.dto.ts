// create-job.dto.ts
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { JobType, JobStatus } from '../entities/job.entity';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  salary_range?: string;

  @IsOptional()
  @IsString()
  skills_required?: string;

  @IsOptional()
  company_id?: string;

  @IsEnum(JobType)
  job_type: JobType;

  @IsOptional()
  @IsEnum(JobStatus)
  status: JobStatus;
}
