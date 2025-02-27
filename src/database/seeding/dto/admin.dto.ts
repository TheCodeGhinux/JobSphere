import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDTO } from '@auth/dto/create-user.dto';

export class CreateAdminDto extends CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  secret: string;
}
