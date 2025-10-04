import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete,
  UseGuards,
  Req
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EstimationService } from './estimation.service';
import { CreateEstimationDto } from './dto/estimation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Estimations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/estimations')
export class EstimationController {
  constructor(private readonly estimationService: EstimationService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear nueva estimación de proyecto',
    description: 'Utiliza IA para calcular horas, recursos y costos de un proyecto basado en sus características'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Estimación creada con cálculos automáticos de IA.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'E-commerce App',
        estimatedHours: 320,
        frontendHours: 112,
        backendHours: 96,
        testingHours: 64,
        designHours: 48,
        frontendDevelopers: 2,
        backendDevelopers: 1,
        uiUxDesigners: 1,
        qaTesters: 1,
        estimatedWeeks: 8,
        estimatedCost: 9600,
        minimumCost: 8160,
        maximumCost: 12000
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  create(
    @Body() createEstimationDto: CreateEstimationDto,
    @Req() req: any,
  ) {
    return this.estimationService.calculateEstimation(
      createEstimationDto,
      req.user.companyId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las estimaciones de la empresa' })
  @ApiResponse({ status: 200, description: 'Lista de estimaciones.' })
  findAll(@Req() req: any) {
    return this.estimationService.findAll(req.user.companyId);
  }

  @Get('stats')
  @ApiOperation({ 
    summary: 'Obtener estadísticas de estimaciones',
    description: 'Estadísticas agregadas para análisis y reportes'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Estadísticas de estimaciones.',
    schema: {
      example: {
        totalProjects: 15,
        averageHours: 280,
        averageCost: 8400,
        averageWeeks: 7.5,
        mostCommonTechnology: 'react',
        mostCommonProjectType: 'web_app',
        estimationsByMonth: {
          '2025-09': { count: 5, totalHours: 1200, totalCost: 36000 },
          '2025-10': { count: 10, totalHours: 2600, totalCost: 78000 }
        }
      }
    }
  })
  getStats(@Req() req: any) {
    return this.estimationService.getEstimationStats(req.user.companyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener estimación por ID' })
  @ApiResponse({ status: 200, description: 'Detalles de la estimación.' })
  @ApiResponse({ status: 404, description: 'Estimación no encontrada.' })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.estimationService.findOne(id, req.user.companyId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar estimación' })
  @ApiResponse({ status: 200, description: 'Estimación eliminada.' })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.estimationService.remove(id, req.user.companyId);
  }
}