import { IsNotEmpty, IsString, IsEmail, IsEmpty, MinLength, IsStrongPassword } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  company_email: string;

  @IsString()
  industry: string;

  @IsString()
  location: string;

  @IsString()
  description: string;

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
}
