import { IsNotEmpty, IsString, IsEmail, MinLength, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Name of the company', example: 'Tech Innovations' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Company email address', example: 'info@techinnovations.com' })
  @IsNotEmpty()
  @IsEmail()
  company_email: string;

  @ApiProperty({ description: 'Industry in which the company operates', example: 'Technology' })
  @IsString()
  industry: string;

  @ApiProperty({ description: 'Location of the company', example: 'San Francisco, CA' })
  @IsString()
  location: string;

  @ApiProperty({ description: 'Brief description of the company', example: 'A leading innovator in tech solutions.' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Password for company account', example: 'StrongPassword!123' })
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
