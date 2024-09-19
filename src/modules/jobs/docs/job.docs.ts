import { applyDecorators } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';
import { JobDto } from '../dto/job.dto';

export function CreateJobDocs() {
  return applyDecorators(
    ApiTags('Jobs'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Create a new job' }),
    ApiBody({ type: CreateJobDto }),
    ApiResponse({ status: 201, description: 'Job created successfully', type: JobDto }),
    ApiUnauthorizedResponse({ description: 'Unauthorized access' }),
    ApiForbiddenResponse({ description: 'User does not have permission to create a job' })
  );
}

export function FindAllJobsDocs() {
  return applyDecorators(
    ApiTags('Jobs'),
    ApiOperation({ summary: 'Retrieve all jobs' }),
    ApiResponse({ status: 200, description: 'Jobs retrieved successfully', type: [JobDto] }),
    ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  );
}

export function FindJobByIdDocs() {
  return applyDecorators(
    ApiTags('Jobs'),
    ApiOperation({ summary: 'Retrieve a job by ID' }),
    ApiParam({ name: 'id', description: 'UUID of the job', type: String }),
    ApiResponse({ status: 200, description: 'Job retrieved successfully', type: JobDto }),
    ApiUnauthorizedResponse({ description: 'Unauthorized access' }),
    ApiNotFoundResponse({ description: 'Job not found' })
  );
}

export function UpdateJobDocs() {
  return applyDecorators(
    ApiTags('Jobs'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update a job by ID' }),
    ApiParam({ name: 'id', description: 'UUID of the job', type: String }),
    ApiBody({ type: UpdateJobDto }),
    ApiResponse({ status: 200, description: 'Job updated successfully', type: JobDto }),
    ApiUnauthorizedResponse({ description: 'Unauthorized access' }),
    ApiForbiddenResponse({ description: 'Only company owners can update' }),
    ApiNotFoundResponse({ description: 'Job not found' })
  );
}

export function RemoveJobDocs() {
  return applyDecorators(
    ApiTags('Jobs'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Remove a job by ID' }),
    ApiParam({ name: 'id', description: 'ID of the job', type: String }),
    ApiResponse({ status: 200, description: 'Job removed successfully' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized access' }),
    ApiNotFoundResponse({ description: 'Job not found' })
  );
}
