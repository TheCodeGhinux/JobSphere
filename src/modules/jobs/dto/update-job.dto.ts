// update-job.dto.ts
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { JobType, JobStatus } from '../entities/job.entity';

export class UpdateJobDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

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

  @IsOptional()
  @IsEnum(JobType)
  jobType?: JobType;

  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;
}
