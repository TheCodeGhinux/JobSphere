import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { RolesGuard } from '@guards/roles.guard';

@Controller('jobs')
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
