import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as { user_type?: string };

    // Allowed roles for creating a job
    const allowedRoles = ['company', 'admin', 'super_admin'];

    if (!user || !user.user_type || !allowedRoles.includes(user.user_type)) {
      throw new ForbiddenException('You do not have permission to create jobs.');
    }

    return true;
  }
}
