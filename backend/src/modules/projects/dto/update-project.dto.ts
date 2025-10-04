import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MaxLength, IsUUID, IsOptional, IsEnum } from 'class-validator';
import { ProjectStatus } from './create-project.dto';

export class UpdateProjectDto {
  @ApiPropertyOptional({
    description: 'Project name',
    example: 'Updated E-commerce Platform',
    maxLength: 100,
  })
  @IsString({ message: 'Project name must be a string' })
  @MaxLength(100, { message: 'Project name must not exceed 100 characters' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Project description',
    example: 'Updated modern e-commerce solution with React and Node.js',
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Client unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID('4', { message: 'Client ID must be a valid UUID' })
  @IsOptional()
  clientId?: string;

  @ApiPropertyOptional({
    description: 'Project status',
    enum: ProjectStatus,
    example: ProjectStatus.COMPLETED,
  })
  @IsEnum(ProjectStatus, { message: 'Status must be a valid project status' })
  @IsOptional()
  status?: ProjectStatus;

  @ApiPropertyOptional({
    description: 'Array of team member IDs',
    type: [String],
    example: ['550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002'],
  })
  @IsUUID('4', { each: true, message: 'Each team member ID must be a valid UUID' })
  @IsOptional()
  teamMembers?: string[];
}
