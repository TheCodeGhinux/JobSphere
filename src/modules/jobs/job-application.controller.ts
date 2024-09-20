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
import {
  GetApplicationStatusDocs,
  GetCompanyApplicationsDocs,
  GetUserApplicationsDocs,
  HireCandidateDocs,
  OfferJobDocs,
  RejectApplicationDocs,
  ScheduleInterviewDocs,
} from './docs/job-application.docs';

@ApiTags('Job Applications')
@Controller('job-applications')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @GetApplicationStatusDocs()
  @Get(':applicationId/status')
  async getApplicationStatus(@Param('applicationId') applicationId: string) {
    return await this.jobApplicationService.getApplicationStatus(applicationId);
  }

  @GetUserApplicationsDocs()
  @Get('applications/user')
  async getUserApplications(@Req() req) {
    const userId = req.user.sub;
    return await this.jobApplicationService.getUserApplications(userId);
  }

  @GetCompanyApplicationsDocs()
  @Get('applications/company')
  async getCompanyApplications(@Req() req) {
    const userId = req.user.sub;
    return await this.jobApplicationService.getCompanyApplications(userId);
  }

  // Company rejects a job application
  @RejectApplicationDocs()
  @Patch(':applicationId/reject')
  @UseGuards(JobApplicationOwnerGuard)
  async rejectApplication(@Param('applicationId') applicationId: string) {
    const status = JobApplicationStatus.REJECTED;
    return this.jobApplicationService.rejectApplication(applicationId);
  }

  // Company hires a candidate
  @HireCandidateDocs()
  @Patch(':applicationId/hire')
  @UseGuards(JobApplicationOwnerGuard)
  async hireCandidate(@Param('applicationId') applicationId: string) {
    const status = JobApplicationStatus.HIRED;
    return this.jobApplicationService.hireCandidate(applicationId);
  }

  // Company offers a job
  @OfferJobDocs()
  @Patch(':applicationId/offer')
  @UseGuards(JobApplicationOwnerGuard)
  async offerJob(@Param('applicationId') applicationId: string) {
    return this.jobApplicationService.offerJob(applicationId);
  }

  // Company schedules an interview
  @ScheduleInterviewDocs()
  @Patch(':applicationId/interview')
  @UseGuards(JobApplicationOwnerGuard)
  async scheduleInterview(@Param('applicationId') applicationId: string) {
    return this.jobApplicationService.scheduleInterview(applicationId);
  }
}
