import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import * as SYS_MSG from '@constant/SystemMessages';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from '@auth/dto/login-response.dto';
import { CreateUserDTO } from '@auth/dto/create-user.dto';
import UserService from '@user/user.service';
import { LoginDto } from '@auth/dto/login.dto';
import { RequestSigninTokenDto } from '@auth/dto/request-signin-token.dto';

import { GoogleAuthService } from '@auth/google-auth.service';
import GoogleAuthPayload from '@auth/interfaces/GoogleAuthPayloadInterface';
import { GoogleVerificationPayloadInterface } from '@auth/interfaces/GoogleVerificationPayloadInterface';
import { CustomHttpException } from '@helpers/custom-http-filter';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { CreateCompanyDto } from '@companies/dto/create-company.dto';
import { CompaniesService } from '@companies/companies.service';
import { LoginCompanyDto } from '@companies/dto/login-company.dto';

@Injectable()
export default class AuthenticationService {
  constructor(
    private userService: UserService,
    private companiesService: CompaniesService,
    private jwtService: JwtService,
    private googleAuthService: GoogleAuthService,
    private configService: ConfigService
  ) {}

  async createNewUser(createUserDto: CreateUserDTO) {
    const userExists = await this.userService.getUserByemail(createUserDto.email);

    if (userExists) {
      throw new CustomHttpException(SYS_MSG.USER_ACCOUNT_EXIST, HttpStatus.BAD_REQUEST);
    }

    await this.userService.createUser(createUserDto);

    const user = await this.userService.getUserByemail(createUserDto.email);

    if (!user) {
      throw new CustomHttpException(SYS_MSG.FAILED_TO_CREATE_USER, HttpStatus.BAD_REQUEST);
    }

    const access_token = this.jwtService.sign({
      id: user.id,
      sub: user.id,
      email: user.email,
    });

    const responsePayload = {
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    };

    return {
      message: SYS_MSG.USER_CREATED_SUCCESSFULLY,
      access_token,
      data: responsePayload,
    };
  }

  async createNewCompany(createCompanyDto: CreateCompanyDto) {
    const companyEmailExists = await this.companiesService.getCompanyByEmail(createCompanyDto.company_email);

    if (companyEmailExists) {
      throw new CustomHttpException(SYS_MSG.RESOURCE_ALREADY_EXISTS('Company email'), HttpStatus.BAD_REQUEST);
    }

    const companyName = await this.companiesService.getCompanyByname(createCompanyDto.name);

    if (companyName) {
      throw new CustomHttpException(SYS_MSG.RESOURCE_ALREADY_EXISTS('Company'), HttpStatus.BAD_REQUEST);
    }

    const company = await this.companiesService.createCompany(createCompanyDto);
    if (!company) {
      throw new CustomHttpException('Failed to create new company', HttpStatus.BAD_REQUEST);
    }

    const access_token = this.jwtService.sign({
      id: company.id,
      sub: company.id,
      company_email: company.company_email,
    });

    return {
      message: 'Company created successfully',
      access_token,
      data: company,
    };
  }
  async loginUser(loginDto: LoginDto, res: any) {
    const { email, password } = loginDto;

    const user = await this.userService.getUserByemail(email);

    if (!user) {
      throw new CustomHttpException(SYS_MSG.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new CustomHttpException(SYS_MSG.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }
    const payload = { id: user.id, sub: user.id, email: user.email, user_type: user.user_type };
    const access_token = await this.jwtService.signAsync(payload);
    const cookie = this.setCookie(access_token, res);
    const responsePayload = {
      access_token,
      data: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    };

    return { message: SYS_MSG.LOGIN_SUCCESSFUL, ...responsePayload };
  }

  async loginCompany(loginCompanyDto: LoginCompanyDto, res: Response) {
    const { company_email, password } = loginCompanyDto;

    const company = await this.companiesService.getCompanyByEmail(company_email);

    const isMatch = await bcrypt.compare(password, company.password);

    if (!isMatch) {
      throw new CustomHttpException(SYS_MSG.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }
    const payload = { id: company.id, sub: company.id, email: company.company_email, user_type: company.user_type };
    const access_token = await this.jwtService.signAsync(payload);
    const cookie = this.setCookie(access_token, res);
    const responsePayload = {
      access_token,
      data: {
        id: company.id,
        name: company.name,
        company_email: company.company_email,
      },
    };

    return { message: SYS_MSG.LOGIN_SUCCESSFUL, ...responsePayload };
  }

  async setCookie(token: string, res: Response) {
    const cookieExpiry = this.configService.get<number>('auth.cookieExpiry');

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: cookieExpiry,
    });
  }
}
