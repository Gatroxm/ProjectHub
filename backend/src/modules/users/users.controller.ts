import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor() {
    // TODO: Inject UsersService
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves a list of all users in the company',
  })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  async findAll() {
    return { message: 'Users endpoint - coming soon' };
  }

    @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        password: { type: 'string', minLength: 8 },
        role: { type: 'string', enum: ['admin', 'developer', 'client'] },
        companyId: { type: 'string' }
      },
      required: ['email', 'firstName', 'lastName', 'password', 'role']
    }
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  async createUser(@Body() createUserDto: any) {
    const newUser = {
      id: Math.floor(Math.random() * 1000).toString(),
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      role: createUserDto.role,
      companyId: createUserDto.companyId || '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return {
      message: 'User created successfully',
      user: newUser
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User found successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUserById(@Param('id') id: string) {
    return {
      id,
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'developer',
      companyId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}
