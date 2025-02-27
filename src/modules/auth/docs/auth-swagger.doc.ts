import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { LoginErrorResponseDto } from '@auth/dto/login-error-dto';
import { LoginResponseDto } from '@auth/dto/login-response.dto';
import { LoginDto } from '@auth/dto/login.dto';
import {
  SuccessCreateUserResponse,
  ErrorCreateUserResponse,
  RequestVerificationToken,
} from '@user/dto/user-response.dto';
import { AuthResponseDto } from '@auth/dto/auth-response.dto';
import { GoogleAuthPayloadDto } from '@auth/dto/google-auth.dto';
import { CustomHttpException } from '@helpers/custom-http-filter';
import { GenericAuthResponseDto } from '@auth/dto/generic-reponse.dto';
import { RequestSigninTokenDto } from '@auth/dto/request-signin-token.dto';
import { ChangePasswordDto } from '@auth/dto/change-password.dto';
import { CompanyDto } from '@companies/dto/company.dto';
import { LoginCompanyDto } from '@companies/dto/login-company.dto';
import { CreateCompanyDto } from '@companies/dto/create-company.dto';
import { CreateUserDTO } from '../dto/create-user.dto';

export function LoginUserDocs() {
  return applyDecorators(
    ApiTags('Authentication'),
    ApiOperation({ summary: 'Login a user' }),
    ApiBody({ type: LoginDto }),
    ApiResponse({ status: 200, description: 'Login successful', type: LoginResponseDto }),
    ApiUnauthorizedResponse({ description: 'Invalid credentials', type: LoginErrorResponseDto })
  );
}

export function LoginCompanyDocs() {
  return applyDecorators(
    ApiTags('Authentication'),
    ApiOperation({ summary: 'Login a Comoany Account' }),
    ApiBody({ type: LoginCompanyDto }),
    ApiResponse({ status: 200, description: 'Login successful', type: CompanyDto }),
    ApiUnauthorizedResponse({ description: 'Invalid credentials', type: LoginErrorResponseDto })
  );
}

export function GoogleAuthDocs() {
  return applyDecorators(
    ApiTags('Authentication'),
    ApiOperation({ summary: 'Google Authentication' }),
    ApiBody({ type: GoogleAuthPayloadDto }),
    ApiResponse({ status: 200, description: 'Verify Payload sent from google', type: AuthResponseDto }),
    ApiBadRequestResponse({ description: 'Invalid Google token' })
  );
}

export function RequestVerificationTokenDocs() {
  return applyDecorators(
    ApiTags('Authentication'),
    ApiBody({
      description: 'Request authentication token',
      type: RequestVerificationToken,
    }),
    ApiOperation({ summary: 'Request Verification Token' }),
    ApiResponse({ status: 200, description: 'Verification Token sent to mail', type: GenericAuthResponseDto }),
    ApiResponse({ status: 400, description: 'Bad request', type: CustomHttpException })
  );
}

export function SignInTokenDocs() {
  return applyDecorators(
    ApiTags('Authentication'),
    ApiOperation({ summary: 'Request Signin Token' }),
    ApiBody({ type: RequestSigninTokenDto }),
    ApiResponse({ status: 200, description: 'Sign-in token sent to email', type: GenericAuthResponseDto }),
    ApiResponse({ status: 400, description: 'Bad request' })
  );
}

export function ChangePasswordDocs() {
  return applyDecorators(
    ApiTags('Authentication'),
    ApiBearerAuth(),
    ApiBody({ type: ChangePasswordDto }),
    ApiOperation({ summary: 'Change user password' }),
    ApiResponse({ status: 200, description: 'Password changed successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' })
  );
}

export function RegisterUserDocs() {
  return applyDecorators(
    ApiTags('Authentication'),
    ApiOperation({ summary: 'User Registration' }),
    ApiBody({ type: CreateUserDTO }),
    ApiResponse({ status: 201, description: 'Register a new user', type: SuccessCreateUserResponse }),
    ApiResponse({ status: 400, description: 'User already exists', type: ErrorCreateUserResponse })
  );
}

export function RegisterCompanyDocs() {
  return applyDecorators(
    ApiTags('Authentication'),
    ApiOperation({ summary: 'Company Account Registration' }),
    ApiBody({ type: CreateCompanyDto }),
    ApiResponse({ status: 201, description: 'Register a new Company', type: CompanyDto }),
    ApiResponse({ status: 400, description: 'Company already exists', type: ErrorCreateUserResponse })
  );
}
