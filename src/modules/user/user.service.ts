import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '@user/dto/update-user-dto';
import UserResponseDTO from '@user/dto/user-response.dto';
import { User, UserType } from '@user/entities/user.entity';
import { UserPayload } from '@user/interfaces/user-payload.interface';
import CreateNewUserOptions from '@user/options/CreateNewUserOptions';
import UpdateUserRecordOption from '@user/options/UpdateUserRecordOption';
import UserIdentifierOptionsType from '@user/options/UserIdentifierOptions';
import { pick } from '@helpers/pick';
import * as SYS_MSG from '@constant/SystemMessages';
import { CustomHttpException } from '@helpers/custom-http-filter';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createUser(createUserPayload: CreateNewUserOptions): Promise<any> {
    const newUser = new User();
    Object.assign(newUser, createUserPayload);
    newUser.is_active = true;
    return await this.userRepository.save(newUser);
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return user;
  }

  async getUserByemail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  // async updateUserRecord(userUpdateOptions: UpdateUserRecordOption) {
  //   const { updatePayload, identifierOptions } = userUpdateOptions;
  //   const user = await this.getUserById(identifierOptions);
  //   Object.assign(user, updatePayload);
  //   await this.userRepository.save(user);
  // }

  async updateUser(userId: string, updateUserDto: UpdateUserDto, currentUser: UserPayload) {
    if (!userId) {
      throw new CustomHttpException('UserId is required', HttpStatus.BAD_REQUEST);
    }

    const user = await this.getUserById(userId);
    if (!user) {
      throw new CustomHttpException(SYS_MSG.USER_NOT_FOUND, 404);
    }
    // TODO: CHECK IF USER IS AN ADMIN
    if (currentUser.id !== userId) {
      throw new CustomHttpException('You are not authorized to update this user', HttpStatus.FORBIDDEN);
    }

    try {
      Object.assign(user, updateUserDto);
      await this.userRepository.save(user);
    } catch (error) {
      throw new CustomHttpException('Failed to update user', HttpStatus.BAD_REQUEST);
    }

    return {
      message: 'User Updated Successfully',
      data: user,
    };
  }

  async softDeleteUser(userId: string, authenticatedUserId: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new CustomHttpException(SYS_MSG.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (user.id !== authenticatedUserId) {
      throw new CustomHttpException('You are not authorized to delete this user', HttpStatus.UNAUTHORIZED);
    }

    await this.userRepository.softDelete(userId);

    return {
      message: 'User deleted successfully',
    };
  }
}
