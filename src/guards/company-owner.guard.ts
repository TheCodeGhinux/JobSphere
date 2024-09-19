import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { CompaniesService } from '@companies/companies.service';
import { UserType } from '@user/entities/user.entity';

@Injectable()
export class CompanyOwnersGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly companiesService: CompaniesService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as { sub?: string };
    const companyId = request.params.id;
    if (!user?.sub) {
      throw new UnauthorizedException('User unauthenticated, please sign in.');
    }

    // Fetch the current user making the request
    const currentUser = await this.companiesService.findById(user.sub);
    if (!currentUser) {
      throw new ForbiddenException('A company account is required to perform this action.');
    }

    // Fetch the profile to be updated (user or company profile)
    const profile = await this.companiesService.findById(companyId);

    if (!profile) {
      throw new ForbiddenException('Company profile not found.');
    }

    const isOwner = profile.id === currentUser.id;
    const isSuperAdmin = currentUser.user_type === UserType.SUPER_ADMIN;

    if (!isOwner && !isSuperAdmin) {
      throw new ForbiddenException('You do not have permission to update this company.');
    }

    return true;
  }
}
