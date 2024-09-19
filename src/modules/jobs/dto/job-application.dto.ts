import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class JobApplicationDto {
  @ApiProperty({
    description: 'Link to the CV',
    example: 'https://example.com/cv-link',
  })
  @IsOptional()
  @IsString()
  cv_link: string;

  @ApiProperty({
    description: 'Current location of the user',
    example: 'Ikeja, Lagos',
  })
  @IsOptional()
  @IsString()
  location: string;
}
