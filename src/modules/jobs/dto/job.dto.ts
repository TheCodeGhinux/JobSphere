import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JobType, JobStatus } from '../entities/job.entity';
import { CompanyDto } from '@/modules/companies/dto/company.dto';

export class JobDto {
  @ApiProperty({ description: 'Job ID', example: '85e418db-a7ee-4b01-b9ba-ae9c9521b8eb' })
  id: string;

  @ApiProperty({ description: 'Title of the job', example: 'Backend dev' })
  title: string;

  @ApiProperty({ description: 'Job description', example: 'Backend dev job at Giy solutions' })
  description: string;

  @ApiProperty({ description: 'Type of the job', enum: JobType, example: JobType.FULL_TIME })
  job_type: JobType;

  @ApiProperty({ description: 'Job status', enum: JobStatus, example: JobStatus.OPEN })
  status: JobStatus;

  @ApiProperty({ description: 'Company associated with the job', type: CompanyDto })
  company: CompanyDto;

  @ApiPropertyOptional({ description: 'Location of the job', example: 'Lagos' })
  location?: string;

  @ApiPropertyOptional({ description: 'Salary range for the job', example: '$60,000 - $80,000' })
  salary_range?: string;

  @ApiPropertyOptional({ description: 'Skills required for the job', example: 'JavaScript, Node.js' })
  skills_required?: string;

  @ApiProperty({ description: 'Job creation timestamp', example: '2024-09-19T07:56:44.289Z' })
  created_at: string;

  @ApiProperty({ description: 'Job last updated timestamp', example: '2024-09-19T07:56:44.289Z' })
  updated_at: string;

  @ApiPropertyOptional({ description: 'Job deletion timestamp', example: null })
  deletedAt?: string;
}
