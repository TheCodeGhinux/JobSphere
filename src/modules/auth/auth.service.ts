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

@Injectable()
export default class AuthenticationService {
  constructor(
    private userService: UserService,
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
}
