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

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

@ApiTags('Tasks')
@Controller('tasks')
// @UseGuards(JwtAuthGuard) // Temporarily disabled for initial setup
// @ApiBearerAuth('JWT-auth') // Temporarily disabled for initial setup
export class TasksController {
  constructor() {
    // TODO: Inject TasksService
  }

  @Post()
  @ApiOperation({
    summary: 'Create new task',
    description: 'Creates a new task within a project',
  })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid task data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createTaskDto: any) {
    // TODO: Implement task creation
    return {
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Get tasks list',
    description: 'Retrieves paginated list of tasks with filtering options',
  })
  @ApiQuery({ name: 'projectId', required: false, description: 'Filter by project ID' })
  @ApiQuery({ name: 'assigneeId', required: false, description: 'Filter by assigned user ID' })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by task status',
    enum: TaskStatus,
  })
  @ApiQuery({
    name: 'priority',
    required: false,
    description: 'Filter by task priority',
    enum: TaskPriority,
  })
  @ApiQuery({ name: 'page', required: false, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page', example: 10 })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @Query('projectId') projectId?: string,
    @Query('assigneeId') assigneeId?: string,
    @Query('status') status?: TaskStatus,
    @Query('priority') priority?: TaskPriority,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    // TODO: Implement tasks listing with filtering
    return {
      data: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          title: 'Implement user authentication',
          description: 'Create JWT-based authentication system',
          status: TaskStatus.IN_PROGRESS,
          priority: TaskPriority.HIGH,
          projectId: projectId || '550e8400-e29b-41d4-a716-446655440000',
          assigneeId: assigneeId || '550e8400-e29b-41d4-a716-446655440001',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
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
    summary: 'Get task by ID',
    description: 'Retrieves detailed information about a specific task',
  })
  @ApiParam({ name: 'id', description: 'Task unique identifier' })
  @ApiResponse({ status: 200, description: 'Task retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(@Param('id') id: string) {
    // TODO: Implement task retrieval by ID
    return {
      id,
      title: 'Implement user authentication',
      description: 'Create JWT-based authentication system with proper validation',
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.HIGH,
      projectId: '550e8400-e29b-41d4-a716-446655440000',
      assigneeId: '550e8400-e29b-41d4-a716-446655440001',
      estimatedHours: 8,
      actualHours: 4.5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update task',
    description: 'Updates an existing task with new information',
  })
  @ApiParam({ name: 'id', description: 'Task unique identifier' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 400, description: 'Invalid update data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(@Param('id') id: string, @Body() updateTaskDto: any) {
    // TODO: Implement task update
    return {
      id,
      title: updateTaskDto.title || 'Updated Task',
      description: updateTaskDto.description || 'Updated description',
      status: updateTaskDto.status || TaskStatus.IN_PROGRESS,
      priority: updateTaskDto.priority || TaskPriority.MEDIUM,
      updatedAt: new Date().toISOString(),
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete task',
    description: 'Soft deletes a task',
  })
  @ApiParam({ name: 'id', description: 'Task unique identifier' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id') id: string) {
    // TODO: Implement task soft deletion
    return { message: `Task ${id} has been deleted successfully` };
  }

  @Post(':id/start-timer')
  @ApiOperation({
    summary: 'Start task timer',
    description: 'Starts time tracking for the specified task',
  })
  @ApiParam({ name: 'id', description: 'Task unique identifier' })
  @ApiResponse({ status: 200, description: 'Timer started successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 400, description: 'Timer already running' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async startTimer(@Param('id') id: string) {
    // TODO: Implement timer start logic
    return {
      message: `Timer started for task ${id}`,
      startedAt: new Date().toISOString(),
    };
  }

  @Post(':id/stop-timer')
  @ApiOperation({
    summary: 'Stop task timer',
    description: 'Stops time tracking for the specified task and logs the time worked',
  })
  @ApiParam({ name: 'id', description: 'Task unique identifier' })
  @ApiResponse({ status: 200, description: 'Timer stopped successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 400, description: 'No active timer found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async stopTimer(@Param('id') id: string) {
    // TODO: Implement timer stop logic
    return {
      message: `Timer stopped for task ${id}`,
      stoppedAt: new Date().toISOString(),
      timeWorked: '00:45:30', // Example: 45 minutes 30 seconds
    };
  }
}
