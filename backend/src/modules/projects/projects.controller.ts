import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProjectDto, ProjectStatus } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { ProjectsListResponseDto } from './dto/projects-list-response.dto';

@ApiTags('Projects')
@Controller('projects')
// @UseGuards(JwtAuthGuard) // Temporarily disabled for initial setup
// @ApiBearerAuth('JWT-auth') // Temporarily disabled for initial setup
export class ProjectsController {
  constructor() {
    // TODO: Inject ProjectsService
  }

  @Post()
  @ApiOperation({
    summary: 'Create new project',
    description: 'Creates a new project within the authenticated company tenant',
  })
  @ApiResponse({
    status: 201,
    description: 'Project created successfully',
    type: ProjectResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid project data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Insufficient permissions' })
  async create(@Body() createProjectDto: CreateProjectDto): Promise<ProjectResponseDto> {
    // TODO: Implement project creation
    return {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: createProjectDto.name,
      description: createProjectDto.description,
      status: ProjectStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tenantId: 'tenant-123',
      clientId: createProjectDto.clientId,
      teamMembers: [],
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Get projects list',
    description: 'Retrieves paginated list of projects for the authenticated company',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page', example: 10 })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by project status',
    enum: ['active', 'completed', 'paused', 'archived'],
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search in project names and descriptions',
  })
  @ApiResponse({
    status: 200,
    description: 'Projects retrieved successfully',
    type: ProjectsListResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ): Promise<ProjectsListResponseDto> {
    // TODO: Implement projects listing with filtering and pagination
    return {
      data: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'E-commerce Platform',
          description: 'Modern e-commerce solution with React and Node.js',
          status: ProjectStatus.ACTIVE,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tenantId: 'tenant-123',
          clientId: 'client-456',
          teamMembers: [],
        },
      ],
      meta: {
        total: 1,
        page: Number(page),
        limit: Number(limit),
        totalPages: 1,
      },
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get project by ID',
    description: 'Retrieves detailed information about a specific project',
  })
  @ApiParam({ name: 'id', description: 'Project unique identifier' })
  @ApiResponse({
    status: 200,
    description: 'Project retrieved successfully',
    type: ProjectResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(@Param('id') id: string): Promise<ProjectResponseDto> {
    // TODO: Implement project retrieval by ID
    return {
      id,
      name: 'E-commerce Platform',
      description: 'Modern e-commerce solution with React and Node.js',
      status: ProjectStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tenantId: 'tenant-123',
      clientId: 'client-456',
      teamMembers: [],
    };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update project',
    description: 'Updates an existing project with new information',
  })
  @ApiParam({ name: 'id', description: 'Project unique identifier' })
  @ApiResponse({
    status: 200,
    description: 'Project updated successfully',
    type: ProjectResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @ApiResponse({ status: 400, description: 'Invalid update data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectResponseDto> {
    // TODO: Implement project update
    return {
      id,
      name: updateProjectDto.name || 'Updated Project',
      description: updateProjectDto.description || 'Updated description',
      status: updateProjectDto.status || ProjectStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tenantId: 'tenant-123',
      clientId: updateProjectDto.clientId || 'client-456',
      teamMembers: [],
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete project',
    description: 'Soft deletes a project (archives it)',
  })
  @ApiParam({ name: 'id', description: 'Project unique identifier' })
  @ApiResponse({ status: 200, description: 'Project deleted successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    // TODO: Implement project soft deletion
    return { message: `Project ${id} has been archived successfully` };
  }
}
