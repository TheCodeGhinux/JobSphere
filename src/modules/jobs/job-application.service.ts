import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { JobApplication, JobApplicationStatus } from './entities/jobs-application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Job } from './entities/job.entity';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplication) private jobApplicationRepo: Repository<JobApplication>,
    @InjectRepository(Job) private jobRepo: Repository<Job>,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  // Update job application status
  async updateApplicationStatus(applicationId: string, status: JobApplicationStatus) {
    const application = await this.jobApplicationRepo.findOne({ where: { id: applicationId }, relations: ['job'] });
    if (!application) {
      throw new NotFoundException('Job application not found');
    }

    application.status = status;
    const newApplicationStatus = await this.jobApplicationRepo.save(application);

    return {
      message: 'Job application status updated successfully',
      data: newApplicationStatus,
    };
  }
}
