import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { JobApplication, JobApplicationStatus } from './entities/jobs-application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Job } from './entities/job.entity';
import { application } from 'express';
import { MailingService } from '../mailing/mailing.service';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplication) private jobApplicationRepo: Repository<JobApplication>,
    @InjectRepository(Job) private jobRepo: Repository<Job>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly mailService: MailingService
  ) {}

  async getApplication(applicationId: string) {
    const application = await this.jobApplicationRepo.findOne({
      where: { id: applicationId },
      relations: ['job', 'user'],
    });
    return application;
  }
  // Update job application status
  // async updateApplicationStatus(applicationId: string, status: JobApplicationStatus) {
  //   const application = await this.jobApplicationRepo.findOne({ where: { id: applicationId }, relations: ['job'] });
  //   if (!application) {
  //     throw new NotFoundException('Job application not found');
  //   }

  //   application.status = status;
  //   const newApplicationStatus = await this.jobApplicationRepo.save(application);

  //   return {
  //     message: 'Job application status updated successfully',
  //     data: newApplicationStatus,
  //   };
  // }

  async hireCandidate(applicationId: string) {
    const application = await this.getApplication(applicationId);
    const startDate = '2024-09-29';

    application.status = JobApplicationStatus.HIRED;
    await this.jobApplicationRepo.save(application);

    console.log('application', application);

    // Send email notification
    await this.mailService.sendHiredNotification(
      application.user.first_name,
      application.user.email,
      application.job.title,
      application.job.company_name
      // startDate,
    );

    return {
      message: 'Job application status updated to Hired',
      data: application,
    };
  }

  async rejectApplication(applicationId: string) {
    const application = await this.getApplication(applicationId);
    application.status = JobApplicationStatus.REJECTED;
    await this.jobApplicationRepo.save(application);

    // Send rejection email
    await this.mailService.sendJobApplicationRejection(
      application.user.first_name,
      application.user.email,
      application.job.title,
      application.job.company_name
    );

    return {
      message: 'Job application status updated to Rejected',
      data: application,
    };
  }

  async offerJob(applicationId: string) {
    const application = await this.getApplication(applicationId);
    application.status = JobApplicationStatus.OFFER;
    await this.jobApplicationRepo.save(application);

    // Send job offer email
    await this.mailService.sendJobOfferNotification(
      application.user.first_name,
      application.user.email,
      application.job.title,
      application.job.company_name
    );

    return {
      message: 'Job application status updated to Offer',
      data: application,
    };
  }

  async scheduleInterview(applicationId: string) {
    const application = await this.getApplication(applicationId);
    const interviewDate = '2024-09-29';
    const location = '123 Main St, City, Country';

    application.status = JobApplicationStatus.INTERVIEW;
    await this.jobApplicationRepo.save(application);

    // Send interview schedule email
    await this.mailService.sendJobInterviewSchedule(
      application.user.first_name,
      application.user.email,
      application.job.title,
      application.job.company_name,
      interviewDate,
      location
    );

    return {
      message: 'Job application status updated to Interview Scheduled',
      data: application,
    };
  }

  async getApplicationStatus(applicationId: string) {}

  async getUserApplications(userId: string) {
    const userApplications = await this.jobApplicationRepo.find({
      where: { user: { id: userId } },
      relations: ['job'],
    });

    if (!userApplications) {
      throw new NotFoundException('No job application not found for user');
    }

    return {
      message: 'Job applications retrieved successfully',
      data: userApplications,
    };
  }

  async getAllApplications() {
    const applications = await this.jobApplicationRepo.find({ relations: ['job'] });
    return {
      message: 'Job applications retrieved successfully',
      data: applications,
    };
  }
  async getCompanyApplications(userId: string) {}
}
