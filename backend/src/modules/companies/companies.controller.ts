import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor() {
    // TODO: Inject CompaniesService
  }

  @Get()
  @ApiOperation({
    summary: 'Get all companies',
    description: 'Retrieves a list of all companies (Admin only)',
  })
  @ApiResponse({ status: 200, description: 'Companies retrieved successfully' })
  async findAll() {
    return { message: 'Companies endpoint - coming soon' };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get company by ID',
    description: 'Retrieves company details by ID',
  })
  @ApiResponse({ status: 200, description: 'Company retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async findOne(@Param('id') id: string) {
    return { message: `Company ${id} endpoint - coming soon` };
  }
}
