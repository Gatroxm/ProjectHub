import { 
  Controller, 
  Get, 
  Query,
  UseGuards,
  Req
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReportsService, ProductivityMetrics, ProjectCostAnalysis, TimelineReport } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('dashboard')
  @ApiOperation({ 
    summary: 'Dashboard ejecutivo',
    description: 'Métricas clave de productividad y rendimiento del equipo'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Métricas del dashboard ejecutivo.',
    schema: {
      example: {
        totalHoursWorked: 1240,
        averageHoursPerDay: 41.33,
        tasksCompleted: 85,
        projectsInProgress: 12,
        projectsCompleted: 8,
        estimationAccuracy: 85,
        teamUtilization: 78
      }
    }
  })
  getExecutiveDashboard(@Req() req: any) {
    return this.reportsService.getExecutiveDashboard(req.user.companyId);
  }

  @Get('team-performance')
  @ApiOperation({ 
    summary: 'Reporte de rendimiento del equipo',
    description: 'Análisis detallado del rendimiento individual de cada miembro del equipo'
  })
  @ApiQuery({ name: 'startDate', description: 'Fecha de inicio (YYYY-MM-DD)', required: false })
  @ApiQuery({ name: 'endDate', description: 'Fecha de fin (YYYY-MM-DD)', required: false })
  @ApiResponse({ 
    status: 200, 
    description: 'Reporte de rendimiento del equipo.',
    schema: {
      example: [
        {
          userId: '123e4567-e89b-12d3-a456-426614174000',
          userName: 'Juan Pérez',
          hoursWorked: 168,
          tasksCompleted: 24,
          averageTaskTime: 7.5,
          productivityScore: 0.14
        }
      ]
    }
  })
  getTeamPerformance(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Req() req?: any
  ) {
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();
    
    return this.reportsService.getTeamPerformance(req.user.companyId, start, end);
  }

  @Get('project-costs')
  @ApiOperation({ 
    summary: 'Análisis de costos por proyecto',
    description: 'Comparación entre costos estimados vs reales, márgenes de ganancia'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Análisis de costos por proyecto.',
    schema: {
      example: [
        {
          projectId: '123e4567-e89b-12d3-a456-426614174000',
          projectName: 'E-commerce App',
          estimatedCost: 12000,
          actualCost: 10800,
          estimatedHours: 320,
          actualHours: 288,
          profitMargin: 10,
          costVariance: -10,
          status: 'completed'
        }
      ]
    }
  })
  getProjectCostAnalysis(@Req() req: any) {
    return this.reportsService.getProjectCostAnalysis(req.user.companyId);
  }

  @Get('timeline')
  @ApiOperation({ 
    summary: 'Reporte de timeline y tendencias',
    description: 'Evolución temporal de horas trabajadas, tareas completadas y ingresos'
  })
  @ApiQuery({ name: 'startDate', description: 'Fecha de inicio (YYYY-MM-DD)', required: false })
  @ApiQuery({ name: 'endDate', description: 'Fecha de fin (YYYY-MM-DD)', required: false })
  @ApiQuery({ name: 'interval', description: 'Intervalo de agrupación', enum: ['day', 'week', 'month'], required: false })
  @ApiResponse({ 
    status: 200, 
    description: 'Reporte de timeline.',
    schema: {
      example: [
        {
          date: '2025-10-01',
          hoursWorked: 42.5,
          tasksCompleted: 8,
          revenue: 1062.50,
          projectsActive: 5
        }
      ]
    }
  })
  getTimelineReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('interval') interval?: 'day' | 'week' | 'month',
    @Req() req?: any
  ) {
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();
    
    return this.reportsService.getTimelineReport(
      req.user.companyId, 
      start, 
      end
    );
  }

  @Get('technology-efficiency')
  @ApiOperation({ 
    summary: 'Reporte de eficiencia por tecnología',
    description: 'Análisis de rendimiento y costos por stack tecnológico'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Eficiencia por tecnología.',
    schema: {
      example: [
        {
          technology: 'react',
          projectCount: 8,
          totalEstimatedHours: 2240,
          totalEstimatedCost: 67200,
          averageHoursPerProject: 280,
          averageCostPerProject: 8400
        }
      ]
    }
  })
  getTechnologyEfficiency(@Req() req: any) {
    // TODO: Implement technology efficiency report
    return {
      technologies: [
        {
          name: 'React',
          projects: 5,
          avgHoursPerProject: 120,
          costEfficiency: 85.2,
          completionRate: 94.1
        }
      ]
    };
  }
}