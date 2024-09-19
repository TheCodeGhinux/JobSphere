import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { CompaniesService } from '@companies/companies.service';
import { JobsService } from '@jobs/jobs.service';
import { UserType } from '@user/entities/user.entity';
import { JobApplicationService } from '@jobs/job-application.service';

@Injectable()
export class JobApplicationOwnerGuard implements CanActivate {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly jobsService: JobsService,
    private readonly jobApplicationService: JobApplicationService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as { sub?: string };
    const applicationId = request.params.applicationId;

    if (!user?.sub) {
      throw new UnauthorizedException('User unauthenticated, please sign in.');
    }

    // Fetch the current user making the request
    const currentUser = await this.companiesService.findById(user.sub);

    if (!currentUser) {
      throw new ForbiddenException('A company account is required to perform this action.');
    }

    const isSuperAdmin = currentUser.user_type === UserType.SUPER_ADMIN;

    // Fetch the job application
    const jobApplication = await this.jobApplicationService.getApplication(applicationId);

    if (!jobApplication) {
      throw new NotFoundException('Job application not found.');
    }

    // Fetch the job related to the application
    const job = await this.jobsService.getJobById(jobApplication.job.id);

    if (!job) {
      throw new NotFoundException('Job not found.');
    }

    // Check if the current company owns the job
    const isOwner = job.company.id === currentUser.id;

    if (!isOwner && !isSuperAdmin) {
      throw new ForbiddenException('You do not have permission to update this job application.');
    }

    return true;
  }
}
