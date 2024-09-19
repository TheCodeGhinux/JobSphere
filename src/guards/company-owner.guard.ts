import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { CompaniesService } from '@companies/companies.service';
import { JobsService } from '@jobs/jobs.service';
import { UserType } from '@user/entities/user.entity';

@Injectable()
export class CompanyOwnersGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly companiesService: CompaniesService,
    private readonly jobsService: JobsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as { sub?: string };
    const jobId = request.params.id;

    if (!user?.sub) {
      throw new UnauthorizedException('User unauthenticated, please sign in.');
    }

    // Fetch the current user making the request
    const currentUser = await this.companiesService.findById(user.sub);
    if (!currentUser) {
      throw new ForbiddenException('A company account is required to perform this action.');
    }

    const isSuperAdmin = currentUser.user_type === UserType.SUPER_ADMIN;

    // Determine if the request is for a job or a company
    if (request.route.path.includes('jobs')) {
      // Fetch the job to be updated
      const job = await this.jobsService.getJobById(jobId);

      if (!job) {
        throw new NotFoundException('Job not found.');
      }

      // Check if the current company owns the job
      const isOwner = job.company.id === currentUser.id;

      if (!isOwner && !isSuperAdmin) {
        throw new ForbiddenException('You do not have permission to update this job.');
      }
    } else {
      // Otherwise, treat it as a company profile update (existing functionality)
      const companyId = request.params.id;
      const profile = await this.companiesService.findById(companyId);

      if (!profile) {
        throw new ForbiddenException('Company profile not found.');
      }

      const isOwner = profile.id === currentUser.id;

      if (!isOwner && !isSuperAdmin) {
        throw new ForbiddenException('You do not have permission to update this company.');
      }
    }

    return true;
  }
}
