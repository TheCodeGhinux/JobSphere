import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import * as SYS_MSG from '@constant/SystemMessages';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
  Get,
  Patch,
  Query,
  Param,
} from '@nestjs/common';
import { CreateUserDTO } from '@auth/dto/create-user.dto';
import { skipAuth } from '@helpers/skipAuth';
import AuthenticationService from '@auth/auth.service';
import { LoginResponseDto } from '@auth/dto/login-response.dto';
import { LoginDto } from '@auth/dto/login.dto';
import { RequestSigninTokenDto } from '@auth/dto/request-signin-token.dto';
import GoogleAuthPayload from '@auth/interfaces/GoogleAuthPayloadInterface';
import { ChangePasswordDto } from '@auth/dto/change-password.dto';
import {
  ChangePasswordDocs,
  GoogleAuthDocs,
  LoginUserDocs,
  RegisterUserDocs,
  RequestVerificationTokenDocs,
  SignInTokenDocs,
} from '@auth/docs/auth-swagger.doc';
import { Response } from 'express';
import { CreateCompanyDto } from '@companies/dto/create-company.dto';
import { LoginCompanyDto } from '@companies/dto/login-company.dto';

@ApiTags('Authentication')
@Controller('auth')
export default class RegistrationController {
  constructor(private authService: AuthenticationService) {}

  @skipAuth()
  @RegisterUserDocs()
  @Post('register')
  @HttpCode(201)
  public async registerUser(@Body() body: CreateUserDTO): Promise<any> {
    return this.authService.createNewUser(body);
  }

  @skipAuth()
  @Post('register/company')
  @HttpCode(201)
  public async registerCompany(@Body() body: CreateCompanyDto): Promise<any> {
    return this.authService.createNewCompany(body);
  }

  @skipAuth()
  @LoginUserDocs()
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.loginUser(loginDto, res);
  }

  @skipAuth()
  @LoginUserDocs()
  @Post('login/company')
  @HttpCode(200)
  async loginCompany(@Body() loginCompanyDto: LoginCompanyDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.loginCompany(loginCompanyDto, res);
  }
}
