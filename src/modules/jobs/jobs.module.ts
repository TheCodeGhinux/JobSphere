import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { CompaniesService } from '@companies/companies.service';
import { Company } from '@companies/entities/company.entity';
import { JobApplicationController } from './job-application.controller';
import { JobApplication } from './entities/jobs-application.entity';
import UserService from '@user/user.service';
import { User } from '@user/entities/user.entity';
import { JobApplicationService } from './job-application.service';
import { MailingService } from '../mailing/mailing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job, Company, JobApplication, User])],
  controllers: [JobsController, JobApplicationController],
  providers: [JobsService, CompaniesService, UserService, JobApplicationService, MailingService],
})
export class JobsModule {}
