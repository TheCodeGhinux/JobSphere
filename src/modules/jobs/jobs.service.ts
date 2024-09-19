import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job, JobStatus } from './entities/job.entity';
import { Repository } from 'typeorm';
import { CustomHttpException } from '@/helpers/custom-http-filter';
import * as SYS_MSG from '@constant/SystemMessages';
import { object } from 'joi';
import { CompaniesService } from '@companies/companies.service';
import { JobApplication } from './entities/jobs-application.entity';
import UserService from '@user/user.service';
import { JobApplicationDto } from './dto/job-application.dto';
import { formatJobApplicationResponse } from '@/utils/jobApplicationResponse.util';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private jobsRepository: Repository<Job>,
    @InjectRepository(JobApplication) private jobsApplicationRepository: Repository<JobApplication>,
    private companiesService: CompaniesService,
    private userService: UserService
  ) {}

  async getJobById(id: string) {
    const job = await this.jobsRepository.findOne({
      where: { id },
      relations: ['company'],
    });
    return job;
  }

  async createJob(createJobDto: CreateJobDto, company_id: string) {
    const company = await this.companiesService.findById(company_id);
    const newJob = new Job();
    Object.assign(newJob, createJobDto);
    newJob.status = JobStatus.OPEN;
    newJob.company = company;

    if (!newJob) {
      throw new CustomHttpException(SYS_MSG.FAILED_TO_JOB, 400);
    }

    await this.jobsRepository.save(newJob);
    return {
      message: 'Job created successfully',
      data: newJob,
    };
  }

  async findAllJobs() {
    const jobs = await this.jobsRepository.find({
      relations: ['company'],
    });
    return { message: 'Jobs found successfully', data: jobs };
  }

  async findJobById(id: string) {
    const job = await this.getJobById(id);
    if (!job) throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND('Job'), 404);
    return { message: 'Job fetched successfully', data: job };
  }

  async updateJob(id: string, updateJobDto: UpdateJobDto) {
    const job = await this.getJobById(id);
    if (!job) throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND('Job'), 404);
    Object.assign(job, updateJobDto);
    await this.jobsRepository.save(job);
    return { message: 'Job updated successfully', data: job };
  }

  async applyToJob(userId: string, jobId: string, jobApplicationDto: JobApplicationDto) {
    const job = await this.getJobById(jobId);
    if (!job) throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND('Job'), 404);

    const user = await this.userService.getUserById(userId);
    if (!user) throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND('User'), 404);

    const existingApplication = await this.jobsApplicationRepository.findOne({
      where: { job: { id: jobId }, user: { id: userId } },
    });
    if (existingApplication) {
      throw new CustomHttpException('You have already applied to this job', 400);
    }

    // Extract location and cv_link from either the user or jobApplicationDto
    const location = jobApplicationDto.location || user.location;
    const cvLink = jobApplicationDto.cv_link || user.cv_link;

    // Check if at least one is provided
    if (!location && !cvLink) {
      throw new CustomHttpException('Location or CV link must be provided', 400);
    }

    const newJobApplication = new JobApplication();
    Object.assign(newJobApplication, jobApplicationDto);
    newJobApplication.job = job;
    newJobApplication.user = user;
    newJobApplication.location = location;
    newJobApplication.cv_link = cvLink;

    await this.jobsApplicationRepository.save(newJobApplication);
    return formatJobApplicationResponse(job, user, newJobApplication);
  }

  async deleteJob(id: string) {
    const job = await this.getJobById(id);
    if (!job) throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND('Job'), 404);

    await this.jobsRepository.softDelete(id);
    return { message: 'Job deleted successfully' };
  }
}
