import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { RolesGuard } from '@guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { CompanyOwnersGuard } from '@/guards/company-owner.guard';

@Controller('jobs')
@ApiTags('Jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @UseGuards(RolesGuard)
  @Post()
  createJob(@Body() createJobDto: CreateJobDto, @Req() req) {
    const company_id = req.user.sub;
    return this.jobsService.createJob(createJobDto, company_id);
  }

  @Get()
  async findAllJobs() {
    return await this.jobsService.findAllJobs();
  }

  @Get(':id')
  async findJobById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.jobsService.findJobById(id);
  }

  @UseGuards(CompanyOwnersGuard)
  @Patch(':id')
  async updateJob(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return await this.jobsService.updateJob(id, updateJobDto);
  }

  @UseGuards(CompanyOwnersGuard)
  @Delete(':id')
  async deleteJob(@Param('id') id: string) {
    return await this.jobsService.deleteJob(id);
  }
}
