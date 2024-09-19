import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JobType, JobStatus } from '../entities/job.entity';

export class CreateJobDto {
  @ApiProperty({ description: 'Title of the job', example: 'Frontend Developer' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Detailed description of the job', example: 'Responsible for UI development' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ description: 'Location of the job', example: 'Remote' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ description: 'Salary range for the job', example: '$60,000 - $80,000' })
  @IsOptional()
  @IsString()
  salary_range?: string;

  @ApiPropertyOptional({ description: 'Skills required for the job', example: 'JavaScript, React, CSS' })
  @IsOptional()
  @IsString()
  skills_required?: string;

  @ApiPropertyOptional({ description: 'ID of the company posting the job', example: '12345' })
  @IsOptional()
  company_id?: string;

  @ApiProperty({ description: 'Type of the job', enum: JobType, example: JobType.FULL_TIME })
  @IsEnum(JobType)
  job_type: JobType;

  @ApiPropertyOptional({ description: 'Status of the job', enum: JobStatus, example: JobStatus.OPEN })
  @IsOptional()
  @IsEnum(JobStatus)
  status: JobStatus;
}
