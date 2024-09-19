import {
  Controller,
  Post,
  Param,
  Body,
  Patch,
  UseGuards,
  ForbiddenException,
  UnauthorizedException,
  Get,
  Req,
} from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { JobApplicationOwnerGuard } from '@guards/job-application-owner.guard';
import { JobApplicationStatus } from './entities/jobs-application.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Job Applications')
@Controller('job-applications')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Get(':applicationId/status')
  async getApplicationStatus(@Param('applicationId') applicationId: string) {
    return await this.jobApplicationService.getApplicationStatus(applicationId);
  }

  @Get('applications/user')
  async getUserApplications(@Req() req) {
    const userId = req.user.sub;
    return await this.jobApplicationService.getUserApplications(userId);
  }

  @Get('applications/company')
  async getCompanyApplications(@Req() req) {
    const userId = req.user.sub;
    return await this.jobApplicationService.getCompanyApplications(userId);
  }

  // Company rejects a job application
  @Patch(':applicationId/reject')
  @UseGuards(JobApplicationOwnerGuard)
  async rejectApplication(@Param('applicationId') applicationId: string) {
    const status = JobApplicationStatus.REJECTED;
    return this.jobApplicationService.updateApplicationStatus(applicationId, status);
  }

  // Company hires a candidate
  @Patch(':applicationId/hire')
  @UseGuards(JobApplicationOwnerGuard)
  async hireCandidate(@Param('applicationId') applicationId: string) {
    const status = JobApplicationStatus.HIRED;
    return this.jobApplicationService.updateApplicationStatus(applicationId, status);
  }

  // Company offers a job
  @Patch(':applicationId/offer')
  @UseGuards(JobApplicationOwnerGuard)
  async offerJob(@Param('applicationId') applicationId: string) {
    const status = JobApplicationStatus.OFFER;
    return this.jobApplicationService.updateApplicationStatus(applicationId, status);
  }

  // Company schedules an interview
  @Patch(':applicationId/interview')
  @UseGuards(JobApplicationOwnerGuard)
  async scheduleInterview(@Param('applicationId') applicationId: string) {
    const status = JobApplicationStatus.INTERVIEW;
    return this.jobApplicationService.updateApplicationStatus(applicationId, status);
  }
}
