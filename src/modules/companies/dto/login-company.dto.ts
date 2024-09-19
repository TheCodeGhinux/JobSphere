import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginCompanyDto {
  @ApiProperty({
    description: 'Company email address',
    example: 'company2@mail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  company_email: string;

  @ApiProperty({
    description: 'Company password',
    example: 'Password@123',
    minLength: 8,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
