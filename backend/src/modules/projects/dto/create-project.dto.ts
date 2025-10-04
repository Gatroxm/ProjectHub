import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsUUID, IsOptional, IsEnum } from 'class-validator';

export enum ProjectStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  PAUSED = 'paused',
  ARCHIVED = 'archived',
}

export class CreateProjectDto {
  @ApiProperty({
    description: 'Project name',
    example: 'E-commerce Platform',
    maxLength: 100,
  })
  @IsString({ message: 'Project name must be a string' })
  @IsNotEmpty({ message: 'Project name is required' })
  @MaxLength(100, { message: 'Project name must not exceed 100 characters' })
  name: string;

  @ApiProperty({
    description: 'Project description',
    example: 'Modern e-commerce solution with React and Node.js',
    required: false,
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Client unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID('4', { message: 'Client ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Client ID is required' })
  clientId: string;

  @ApiProperty({
    description: 'Project status',
    enum: ProjectStatus,
    example: ProjectStatus.ACTIVE,
    required: false,
  })
  @IsEnum(ProjectStatus, { message: 'Status must be a valid project status' })
  @IsOptional()
  status?: ProjectStatus;

  @ApiProperty({
    description: 'Array of team member IDs',
    type: [String],
    example: ['550e8400-e29b-41d4-a716-446655440001'],
    required: false,
  })
  @IsUUID('4', { each: true, message: 'Each team member ID must be a valid UUID' })
  @IsOptional()
  teamMembers?: string[];
}
