import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JobApplicationStatusUpdateResponseDto } from '../dto/job-application-response.dto';

export function GetApplicationStatusDocs() {
  return applyDecorators(
    ApiTags('Job Applications'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get the status of a job application' }),
    ApiParam({
      name: 'applicationId',
      description: 'ID of the job application',
      example: 'd746f8a6-67c1-47f9-a0a4-8149b01b6e8c',
    }),
    ApiResponse({
      status: 200,
      description: 'Job application status retrieved successfully',
      type: JobApplicationStatusUpdateResponseDto,
    })
  );
}

export function GetUserApplicationsDocs() {
  return applyDecorators(
    ApiTags('Job Applications'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get all applications submitted by a user' }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      description: 'User applications retrieved successfully',
      type: [JobApplicationStatusUpdateResponseDto],
    })
  );
}

export function GetCompanyApplicationsDocs() {
  return applyDecorators(
    ApiTags('Job Applications'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get all applications submitted for a company’s jobs' }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      description: 'Company job applications retrieved successfully',
      type: [JobApplicationStatusUpdateResponseDto],
    })
  );
}

export function RejectApplicationDocs() {
  return applyDecorators(
    ApiTags('Job Applications'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Reject a job application' }),
    ApiParam({
      name: 'applicationId',
      description: 'ID of the job application to reject',
      example: 'd746f8a6-67c1-47f9-a0a4-8149b01b6e8c',
    }),
    ApiResponse({
      status: 200,
      description: 'Job application rejected successfully',
      type: JobApplicationStatusUpdateResponseDto,
    })
  );
}

export function HireCandidateDocs() {
  return applyDecorators(
    ApiTags('Job Applications'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Hire a candidate for the job' }),
    ApiParam({
      name: 'applicationId',
      description: 'ID of the job application to hire',
      example: 'd746f8a6-67c1-47f9-a0a4-8149b01b6e8c',
    }),
    ApiResponse({
      status: 200,
      description: 'Candidate hired successfully',
      type: JobApplicationStatusUpdateResponseDto,
    })
  );
}

export function OfferJobDocs() {
  return applyDecorators(
    ApiTags('Job Applications'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Offer a job to a candidate' }),
    ApiParam({
      name: 'applicationId',
      description: 'ID of the job application to offer the job',
      example: 'd746f8a6-67c1-47f9-a0a4-8149b01b6e8c',
    }),
    ApiResponse({
      status: 200,
      description: 'Job offer sent successfully',
      type: JobApplicationStatusUpdateResponseDto,
    })
  );
}

export function ScheduleInterviewDocs() {
  return applyDecorators(
    ApiTags('Job Applications'),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Schedule an interview with a candidate' }),
    ApiParam({
      name: 'applicationId',
      description: 'ID of the job application to schedule an interview',
      example: 'd746f8a6-67c1-47f9-a0a4-8149b01b6e8c',
    }),
    ApiResponse({
      status: 200,
      description: 'Interview scheduled successfully',
      type: JobApplicationStatusUpdateResponseDto,
    })
  );
}
