import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MinLength } from 'class-validator';
import { User, UserType } from '@user/entities/user.entity';

export class CreateUserDTO {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    description:
      'The password for the user account.\
    It must contain at least one uppercase letter, one lowercase letter,\
    one number, and one special character.',
    example: 'P@ssw0rd!',
  })
  @MinLength(8)
  @IsNotEmpty()
  @IsStrongPassword(
    {},
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }
  )
  password: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({
    description: 'The cv link of the user',
    example: 'example.url',
  })
  @IsNotEmpty()
  @IsString()
  cv_link: string;

  @ApiProperty({
    description: 'The location of the user',
    example: 'Ikeja, Lagos',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Account type of user, either company or user',
    example: 'user',
  })
  @IsNotEmpty()
  @IsString()
  user_type: UserType;
}
