import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  Req,
  Request,
  UseGuards,
  Res,
  StreamableFile,
  Header,
  ParseEnumPipe,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from '@user/dto/update-user-dto';
import { UserPayload } from '@user/interfaces/user-payload.interface';
import UserService from '@user/user.service';
import { skipAuth } from '@helpers/skipAuth';
import { Response } from 'express';
import * as path from 'path';
import { SoftDeleteUserDocs, UpdateUserDocs } from '@user/docs/user-swagger.doc';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('email')
  async findUserByEmail(@Req() req) {
    const email = req.user.email;
    return this.userService.findUserByEmail(email);
  }

  @Get('id')
  async findUserById(@Req() req) {
    const userId = req.user.id;
    return this.userService.findUserById(userId);
  }

  @UpdateUserDocs()
  @Patch(':userId')
  async updateUser(
    @Request() req: { user: UserPayload },
    @Param('userId') userId: string,
    @Body() updatedUserDto: UpdateUserDto
  ) {
    return this.userService.updateUser(userId, updatedUserDto, req.user);
  }

  @Delete(':userId')
  @SoftDeleteUserDocs()
  async softDeleteUser(@Param('userId', ParseUUIDPipe) userId: string, @Req() req) {
    const authenticatedUserId = req['user'].id;

    return this.userService.softDeleteUser(userId, authenticatedUserId);
  }
}
