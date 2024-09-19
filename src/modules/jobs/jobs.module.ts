import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { CompaniesService } from '@companies/companies.service';
import { Company } from '@companies/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, Company])],
  controllers: [JobsController],
  providers: [JobsService, CompaniesService],
})
export class JobsModule {}
