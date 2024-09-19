import {
  Controller,
  Post,
  Param,
  Body,
  Patch,
  UseGuards,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
// import { UpdateJobApplicationStatusDto } from './dto/update-job-application-status.dto';
import { CompanyOwnersGuard } from '@guards/company-owner.guard';
import { JobApplicationStatus } from './entities/jobs-application.entity';

@Controller('job-applications')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  // Company rejects a job application
  @Patch(':applicationId/reject')
  @UseGuards(CompanyOwnersGuard)
  async rejectApplication(@Param('applicationId') applicationId: string) {
    const status = JobApplicationStatus.REJECTED;
    return this.jobApplicationService.updateApplicationStatus(applicationId, status);
  }

  // Company hires a candidate
  @Patch(':applicationId/hire')
  @UseGuards(CompanyOwnersGuard)
  async hireCandidate(@Param('applicationId') applicationId: string) {
    const status = JobApplicationStatus.HIRED;
    return this.jobApplicationService.updateApplicationStatus(applicationId, status);
  }

  // Company offers a job
  @Patch(':applicationId/offer')
  @UseGuards(CompanyOwnersGuard)
  async offerJob(@Param('applicationId') applicationId: string) {
    const status = JobApplicationStatus.OFFER;
    return this.jobApplicationService.updateApplicationStatus(applicationId, status);
  }

  // Company schedules an interview
  @Patch(':applicationId/interview')
  @UseGuards(CompanyOwnersGuard)
  async scheduleInterview(@Param('applicationId') applicationId: string) {
    const status = JobApplicationStatus.INTERVIEW;
    return this.jobApplicationService.updateApplicationStatus(applicationId, status);
  }
}
