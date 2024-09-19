import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { RolesGuard } from '@guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { CompanyOwnersGuard } from '@/guards/company-owner.guard';
import { CreateJobDocs, FindAllJobsDocs, FindJobByIdDocs, RemoveJobDocs, UpdateJobDocs } from './docs/job.docs';
import { AuthGuard } from '@/guards/auth.guard';
import { JobApplicationDto } from './dto/job-application.dto';

@Controller('jobs')
@ApiTags('Jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @CreateJobDocs()
  @UseGuards(RolesGuard)
  @Post()
  createJob(@Body() createJobDto: CreateJobDto, @Req() req) {
    const company_id = req.user.sub;
    return this.jobsService.createJob(createJobDto, company_id);
  }

  @FindAllJobsDocs()
  @Get()
  async findAllJobs() {
    return await this.jobsService.findAllJobs();
  }

  @FindJobByIdDocs()
  @Get(':id')
  async findJobById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.jobsService.findJobById(id);
  }

  @UpdateJobDocs()
  @UseGuards(CompanyOwnersGuard)
  @Patch(':id')
  async updateJob(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return await this.jobsService.updateJob(id, updateJobDto);
  }

  @Post('/:jobId/apply')
  async applyToJob(
    @Param('jobId', new ParseUUIDPipe()) jobId: string,
    @Body() jobApplicationDto: JobApplicationDto,
    @Req() req
  ) {
    const userId = req.user.sub;
    return this.jobsService.applyToJob(userId, jobId, jobApplicationDto);
  }

  @RemoveJobDocs()
  @UseGuards(CompanyOwnersGuard)
  @Delete(':id')
  async deleteJob(@Param('id') id: string) {
    return await this.jobsService.deleteJob(id);
  }
}
