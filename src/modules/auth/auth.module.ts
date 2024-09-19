import { Module } from '@nestjs/common';
import RegistrationController from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import appConfig from '@config/auth.config';
import { Repository } from 'typeorm';
import AuthenticationService from './auth.service';
import UserService from '@user/user.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleAuthService } from './google-auth.service';
import { Company } from '@companies/entities/company.entity';
import { CompaniesService } from '@companies/companies.service';

@Module({
  controllers: [RegistrationController],
  providers: [AuthenticationService, Repository, UserService, GoogleStrategy, GoogleAuthService, CompaniesService],
  imports: [
    TypeOrmModule.forFeature([User, Company]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: appConfig().jwtSecret,
      signOptions: { expiresIn: `${appConfig().jwtExpiry}s` },
    }),
  ],
})
export class AuthModule {}
