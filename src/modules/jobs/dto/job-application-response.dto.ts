import { ApiProperty } from '@nestjs/swagger';
import { JobType, JobStatus } from '../entities/job.entity';

class JobDetailsDto {
  @ApiProperty({
    description: 'Job ID',
    example: '64dfeafb-bb3b-4868-ba2e-a0ba717f04d3',
  })
  id: string;

  @ApiProperty({
    description: 'Job creation timestamp',
    example: '2024-09-19T13:13:27.378Z',
  })
  created_at: string;

  @ApiProperty({
    description: 'Job last update timestamp',
    example: '2024-09-19T13:13:27.378Z',
  })
  updated_at: string;

  @ApiProperty({
    description: 'Job title',
    example: 'AI/ML dev',
  })
  title: string;

  @ApiProperty({
    description: 'Job description',
    example: 'AI/ML dev job at Giy solutions',
  })
  description: string;

  @ApiProperty({
    description: 'Job location',
    example: null,
    nullable: true,
  })
  location?: string;

  @ApiProperty({
    description: 'Salary range',
    example: null,
    nullable: true,
  })
  salary_range?: string;

  @ApiProperty({
    description: 'Skills required for the job',
    example: null,
    nullable: true,
  })
  skills_required?: string;

  @ApiProperty({
    description: 'Type of the job',
    example: 'full-time',
  })
  job_type: JobType;

  @ApiProperty({
    description: 'Current job status',
    example: 'open',
  })
  status: JobStatus;

  @ApiProperty({
    description: 'Timestamp of job deletion, if applicable',
    example: null,
    nullable: true,
  })
  deletedAt?: string;
}

export class JobApplicationStatusUpdateResponseDto {
  @ApiProperty({
    description: 'Job application ID',
    example: '68e2b65b-499e-4e7b-88f0-f4dd21f79dea',
  })
  id: string;

  @ApiProperty({
    description: 'Timestamp when the application was created',
    example: '2024-09-19T13:14:00.258Z',
  })
  created_at: string;

  @ApiProperty({
    description: 'Timestamp when the application was last updated',
    example: '2024-09-19T16:32:54.424Z',
  })
  updated_at: string;

  @ApiProperty({
    description: "Link to the applicant's CV",
    example: 'link.link',
  })
  cv_link: string;

  @ApiProperty({
    description: "Applicant's location",
    example: 'Ikeja, Lagos',
  })
  location: string;

  @ApiProperty({
    description: 'Current application status',
    example: 'hired',
  })
  status: string;

  @ApiProperty({
    description: 'Timestamp when the application was submitted',
    example: '2024-09-19T13:14:00.258Z',
  })
  appliedAt: Date;

  @ApiProperty({
    description: 'Details of the job for which the application was submitted',
    type: JobDetailsDto,
  })
  job: JobDetailsDto;
}
