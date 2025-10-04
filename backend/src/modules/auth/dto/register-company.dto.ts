import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class RegisterCompanyDto {
  @ApiProperty({
    description: 'Company name',
    example: 'Acme Development Studio',
    maxLength: 100,
  })
  @IsString({ message: 'Company name must be a string' })
  @MaxLength(100, { message: 'Company name must not exceed 100 characters' })
  @IsNotEmpty({ message: 'Company name is required' })
  companyName: string;

  @ApiProperty({
    description: 'Company website URL (optional)',
    example: 'https://www.acmedev.com',
    required: false,
  })
  @IsString({ message: 'Website must be a string' })
  website?: string;

  @ApiProperty({
    description: 'Admin user first name',
    example: 'John',
    maxLength: 50,
  })
  @IsString({ message: 'First name must be a string' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @ApiProperty({
    description: 'Admin user last name',
    example: 'Doe',
    maxLength: 50,
  })
  @IsString({ message: 'Last name must be a string' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @ApiProperty({
    description: 'Admin user email address',
    example: 'john.doe@acmedev.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'Admin user password',
    example: 'SecurePassword123!',
    minLength: 8,
    maxLength: 100,
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(100, { message: 'Password must not exceed 100 characters' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
