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
  salaryRange?: string;

  @IsOptional()
  @IsString()
  skillsRequired?: string;

  @IsOptional()
  companyId?: number;

  @IsEnum(JobType)
  jobType: JobType;

  @IsEnum(JobStatus)
  status: JobStatus;
}
