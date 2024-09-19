import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { JobsService } from '@jobs/jobs.service';
import { Job } from '@jobs/entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Job])],
  controllers: [CompaniesController],
  providers: [CompaniesService, JobsService],
})
export class CompaniesModule {}
