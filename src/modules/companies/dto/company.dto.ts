import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CompanyDto {
  @ApiProperty({ description: 'Company ID', example: 'a5057404-b5ea-485a-af13-9ac0f2cd7709' })
  id: string;

  @ApiProperty({ description: 'Company name', example: 'Company 2' })
  name: string;

  @ApiProperty({ description: 'Industry the company belongs to', example: 'Tech' })
  industry: string;

  @ApiPropertyOptional({ description: 'Company logo', example: null })
  logo?: string;

  @ApiProperty({ description: 'Company description', example: 'Tech company ayo' })
  description: string;

  @ApiProperty({ description: 'Location of the company', example: 'Lagos' })
  location: string;

  @ApiProperty({ description: 'Company email', example: 'company2@mail.com' })
  company_email: string;

  @ApiProperty({ description: 'Company creation timestamp', example: '2024-09-19T07:44:58.476Z' })
  created_at: string;

  @ApiProperty({ description: 'Company last updated timestamp', example: '2024-09-19T07:44:58.476Z' })
  updated_at: string;

  @ApiProperty({ description: 'User type, which is "company" in this case', example: 'company' })
  user_type: string;
}
