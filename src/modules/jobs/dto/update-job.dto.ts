import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { JobType, JobStatus } from '../entities/job.entity';

export class UpdateJobDto {
  @ApiPropertyOptional({ description: 'Title of the job', example: 'Frontend Developer' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Detailed description of the job', example: 'Responsible for UI development' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Location of the job', example: 'Remote' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ description: 'Salary range for the job', example: '$60,000 - $80,000' })
  @IsOptional()
  @IsString()
  salaryRange?: string;

  @ApiPropertyOptional({ description: 'Skills required for the job', example: 'JavaScript, React, CSS' })
  @IsOptional()
  @IsString()
  skillsRequired?: string;

  @ApiPropertyOptional({ description: 'ID of the company posting the job', example: '12345' })
  @IsOptional()
  companyId?: number;

  @ApiPropertyOptional({ description: 'Type of the job', enum: JobType, example: JobType.INTERNSHIP })
  @IsOptional()
  @IsEnum(JobType)
  jobType?: JobType;

  @ApiPropertyOptional({ description: 'Status of the job', enum: JobStatus, example: JobStatus.CLOSED })
  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;
}
