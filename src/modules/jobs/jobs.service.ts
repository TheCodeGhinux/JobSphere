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

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private jobsRepository: Repository<Job>,
    private companiesService: CompaniesService
  ) {}

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

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
