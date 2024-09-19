import { applyDecorators } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CreateCompanyDto } from '../dto/create-company.dto';

export function UpdateCompanyDocs() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiTags('Companies'),
    ApiOperation({ summary: 'Update a company by ID' }),
    ApiParam({ name: 'id', description: 'UUID of the company', type: String }),
    ApiBody({ type: UpdateCompanyDto }),
    ApiResponse({ status: 200, description: 'Company updated successfully', type: CreateCompanyDto }),
    ApiUnauthorizedResponse({ description: 'Unauthorized access' }),
    ApiForbiddenResponse({ description: 'Only company owners can update' }),
    ApiNotFoundResponse({ description: 'Company not found' })
  );
}

export function FindAllCompaniesDocs() {
  return applyDecorators(
    ApiTags('Companies'),
    ApiOperation({ summary: 'Retrieve all companies' }),
    ApiResponse({ status: 200, description: 'Companies retrieved successfully', type: [CreateCompanyDto] }),
    ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  );
}

export function FindCompanyByIdDocs() {
  return applyDecorators(
    ApiTags('Companies'),
    ApiOperation({ summary: 'Retrieve a company by ID' }),
    ApiParam({ name: 'id', description: 'UUID of the company', type: String }),
    ApiResponse({ status: 200, description: 'Company retrieved successfully', type: CreateCompanyDto }),
    ApiUnauthorizedResponse({ description: 'Unauthorized access' }),
    ApiNotFoundResponse({ description: 'Company not found' })
  );
}

export function CreateCompanyDocs() {
  return applyDecorators(
    ApiTags('Companies'),
    ApiOperation({ summary: 'Create a new company' }),
    ApiBody({ type: CreateCompanyDto }),
    ApiResponse({ status: 201, description: 'Company created successfully', type: CreateCompanyDto }),
    ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  );
}

export function DeleteCompanyDocs() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiTags('Companies'),
    ApiOperation({ summary: 'Delete a company' }),
    ApiResponse({ status: 200, description: 'Company deleted successfully' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  );
}
