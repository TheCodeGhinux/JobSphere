import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailingController } from './mailing.controller';
import { JobsService } from '../jobs/jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '../jobs/entities/job.entity';
import { JobApplication } from '../jobs/entities/jobs-application.entity';
import { CompaniesService } from '../companies/companies.service';
import UserService from '../user/user.service';
import { Company } from '../companies/entities/company.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, JobApplication, Company, User])],
  controllers: [MailingController],
  providers: [MailingService, JobsService, CompaniesService, UserService],
})
export class MailingModule {}
