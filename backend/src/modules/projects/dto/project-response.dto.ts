import { ApiProperty } from '@nestjs/swagger';
import { ProjectStatus } from './create-project.dto';

export class TeamMemberDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@company.com',
  })
  email: string;

  @ApiProperty({
    description: 'User role in the project',
    example: 'developer',
  })
  role: string;
}

export class ProjectResponseDto {
  @ApiProperty({
    description: 'Project unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Project name',
    example: 'E-commerce Platform',
  })
  name: string;

  @ApiProperty({
    description: 'Project description',
    example: 'Modern e-commerce solution with React and Node.js',
  })
  description: string;

  @ApiProperty({
    description: 'Project status',
    enum: ProjectStatus,
    example: ProjectStatus.ACTIVE,
  })
  status: ProjectStatus;

  @ApiProperty({
    description: 'Project creation timestamp',
    example: '2025-10-04T10:00:00.000Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Project last update timestamp',
    example: '2025-10-04T15:30:00.000Z',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Company tenant identifier',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  tenantId: string;

  @ApiProperty({
    description: 'Client unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  clientId: string;

  @ApiProperty({
    description: 'Project team members',
    type: [TeamMemberDto],
  })
  teamMembers: TeamMemberDto[];
}
