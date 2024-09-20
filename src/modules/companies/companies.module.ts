import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { JobsService } from '@jobs/jobs.service';
import { Job } from '@jobs/entities/job.entity';
import { JobApplication } from '@jobs/entities/jobs-application.entity';
import UserService from '@user/user.service';
import { User } from '@user/entities/user.entity';
import { MailingService } from '../mailing/mailing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Job, JobApplication, User])],
  controllers: [CompaniesController],
  providers: [CompaniesService, JobsService, UserService, MailingService],
})
export class CompaniesModule {}
