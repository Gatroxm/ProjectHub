import { IsString, IsEnum, IsOptional, IsBoolean, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ComplexityLevel, TechnologyStack, ProjectType } from '../schemas/estimation.schema';

export class CreateEstimationDto {
  @ApiProperty({ description: 'Nombre del proyecto' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descripción del proyecto', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ 
    description: 'Tipo de proyecto',
    enum: ProjectType,
    example: ProjectType.WEB_APP
  })
  @IsEnum(ProjectType)
  projectType: ProjectType;

  @ApiProperty({ 
    description: 'Stack tecnológico',
    enum: TechnologyStack,
    example: TechnologyStack.REACT
  })
  @IsEnum(TechnologyStack)
  technologyStack: TechnologyStack;

  @ApiProperty({ 
    description: 'Nivel de complejidad',
    enum: ComplexityLevel,
    example: ComplexityLevel.MEDIUM
  })
  @IsEnum(ComplexityLevel)
  complexityLevel: ComplexityLevel;

  // Características del proyecto
  @ApiProperty({ description: '¿Requiere autenticación?', default: false })
  @IsOptional()
  @IsBoolean()
  hasAuthentication?: boolean;

  @ApiProperty({ description: '¿Requiere sistema de pagos?', default: false })
  @IsOptional()
  @IsBoolean()
  hasPaymentSystem?: boolean;

  @ApiProperty({ description: '¿Requiere panel de administración?', default: false })
  @IsOptional()
  @IsBoolean()
  hasAdminPanel?: boolean;

  @ApiProperty({ description: '¿Requiere características en tiempo real?', default: false })
  @IsOptional()
  @IsBoolean()
  hasRealTimeFeatures?: boolean;

  @ApiProperty({ description: '¿Requiere integraciones con terceros?', default: false })
  @IsOptional()
  @IsBoolean()
  hasThirdPartyIntegrations?: boolean;

  @ApiProperty({ description: 'Número estimado de páginas', default: 5 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  numberOfPages?: number;

  @ApiProperty({ description: 'Número estimado de formularios', default: 2 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  numberOfForms?: number;

  @ApiProperty({ description: 'Número estimado de APIs', default: 10 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  numberOfApis?: number;

  // Configuración de tarifas (opcional)
  @ApiProperty({ description: 'Tarifa por hora - Frontend Developer', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  hourlyRateFrontend?: number;

  @ApiProperty({ description: 'Tarifa por hora - Backend Developer', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  hourlyRateBackend?: number;

  @ApiProperty({ description: 'Tarifa por hora - Fullstack Developer', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  hourlyRateFullstack?: number;

  @ApiProperty({ description: 'Tarifa por hora - UI/UX Designer', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  hourlyRateDesign?: number;

  @ApiProperty({ description: 'Tarifa por hora - QA Tester', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  hourlyRateTesting?: number;
}

export class EstimationResultDto {
  @ApiProperty({ description: 'Horas totales estimadas' })
  totalHours: number;

  @ApiProperty({ description: 'Horas de frontend' })
  frontendHours: number;

  @ApiProperty({ description: 'Horas de backend' })
  backendHours: number;

  @ApiProperty({ description: 'Horas de testing' })
  testingHours: number;

  @ApiProperty({ description: 'Horas de diseño' })
  designHours: number;

  @ApiProperty({ description: 'Desarrolladores frontend necesarios' })
  frontendDevelopers: number;

  @ApiProperty({ description: 'Desarrolladores backend necesarios' })
  backendDevelopers: number;

  @ApiProperty({ description: 'Desarrolladores fullstack necesarios' })
  fullstackDevelopers: number;

  @ApiProperty({ description: 'Diseñadores UI/UX necesarios' })
  uiUxDesigners: number;

  @ApiProperty({ description: 'QA testers necesarios' })
  qaTesters: number;

  @ApiProperty({ description: 'Semanas estimadas (mínimo)' })
  minimumWeeks: number;

  @ApiProperty({ description: 'Semanas estimadas (promedio)' })
  estimatedWeeks: number;

  @ApiProperty({ description: 'Semanas estimadas (máximo)' })
  maximumWeeks: number;

  @ApiProperty({ description: 'Costo estimado (mínimo)' })
  minimumCost: number;

  @ApiProperty({ description: 'Costo estimado (promedio)' })
  estimatedCost: number;

  @ApiProperty({ description: 'Costo estimado (máximo)' })
  maximumCost: number;

  @ApiProperty({ description: 'Factor de riesgo aplicado' })
  riskFactor: number;

  @ApiProperty({ description: 'Porcentaje de buffer aplicado' })
  bufferPercentage: number;
}