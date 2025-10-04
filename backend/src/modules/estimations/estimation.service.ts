import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProjectEstimation } from './schemas/estimation.schema';
import { CreateEstimationDto, EstimationResultDto } from './dto/estimation.dto';

interface EstimationFactors {
  baseHours: number;
  complexityMultiplier: number;
  technologyMultiplier: number;
  projectTypeMultiplier: number;
}

@Injectable()
export class EstimationService {
  constructor(
    @InjectModel(ProjectEstimation.name)
    private estimationModel: Model<ProjectEstimation>,
  ) {}

  /**
   * Motor de estimaciones inteligente
   * Calcula horas, recursos y costos basado en parámetros del proyecto
   */
  async calculateEstimation(
    createEstimationDto: CreateEstimationDto,
    companyId: string,
  ): Promise<ProjectEstimation> {
    const factors = this.getEstimationFactors(createEstimationDto);
    
    // Calcular horas base
    const baseHours = this.calculateBaseHours(createEstimationDto, factors);
    
    // Distribuir horas por tipo
    const distribution = this.calculateHoursDistribution(baseHours, createEstimationDto);
    
    // Calcular recursos humanos necesarios
    const resources = this.calculateHumanResources(distribution, createEstimationDto);
    
    // Calcular tiempos
    const timeEstimates = this.calculateTimeEstimates(distribution, resources);
    
    // Calcular costos
    const costEstimates = this.calculateCostEstimates(distribution, createEstimationDto);

    // Crear la estimación
    const estimation = new this.estimationModel({
      ...createEstimationDto,
      
      // Horas
      estimatedHours: baseHours,
      hoursByCategory: {
        frontend: distribution.frontend,
        backend: distribution.backend,
        database: Math.round(baseHours * 0.1),
        testing: distribution.testing,
        deployment: Math.round(baseHours * 0.05),
        projectManagement: Math.round(baseHours * 0.1)
      },
      
      // Desarrolladores
      estimatedDevelopers: resources.frontend + resources.backend + resources.fullstack,
      
      // Tiempos
      estimatedWeeks: timeEstimates.estimated,
      
      // Costos
      estimatedCost: costEstimates.estimated,
      
      // Factores de riesgo
      riskMultiplier: this.calculateRiskFactor(createEstimationDto),
      teamEfficiencyMultiplier: 1.0,
      technologyFamiliarityMultiplier: 1.0,
      
      // Datos AI
      aiEstimationData: {
        algorithmVersion: '1.0',
        confidence: 0.85,
        factors: ['complexity', 'technology', 'features'],
        recommendations: ['Consider using agile methodology', 'Plan for testing phase']
      }
    });

    return estimation.save();
  }

  private getEstimationFactors(dto: CreateEstimationDto): EstimationFactors {
    // Factores base por tipo de proyecto
    const projectTypeFactors = {
      'landing_page': 1.0,
      'blog': 1.2,
      'portfolio': 1.3,
      'web_app': 2.0,
      'mobile_app': 2.5,
      'api': 1.5,
      'ecommerce': 3.0,
      'crm': 3.5,
      'erp': 4.0,
      'custom': 2.8,
    };

    // Factores de complejidad
    const complexityFactors = {
      'very_low': 0.7,
      'low': 0.8,
      'medium': 1.0,
      'high': 1.4,
      'very_high': 1.8,
    };

    // Factores de tecnología
    const technologyFactors = {
      'react': 1.0,
      'angular': 1.1,
      'vue': 0.95,
      'nodejs': 1.0,
      'python': 0.9,
      'java': 1.2,
      'dotnet': 1.1,
      'php': 0.8,
      'mobile_native': 1.5,
      'react_native': 1.3,
      'flutter': 1.2,
    };

    return {
      baseHours: 40, // Base de 40 horas por proyecto mínimo
      complexityMultiplier: complexityFactors[dto.complexityLevel],
      technologyMultiplier: technologyFactors[dto.technologyStack],
      projectTypeMultiplier: projectTypeFactors[dto.projectType],
    };
  }

  private calculateBaseHours(dto: CreateEstimationDto, factors: EstimationFactors): number {
    let baseHours = factors.baseHours;
    
    // Aplicar multiplicadores principales
    baseHours *= factors.projectTypeMultiplier;
    baseHours *= factors.complexityMultiplier;
    baseHours *= factors.technologyMultiplier;
    
    // Agregar horas por características específicas
    if (dto.hasAuthentication) baseHours += 20;
    if (dto.hasPaymentSystem) baseHours += 40;
    if (dto.hasAdminPanel) baseHours += 60;
    if (dto.hasRealTimeFeatures) baseHours += 30;
    if (dto.hasThirdPartyIntegrations) baseHours += 25;
    
    // Agregar horas por volumen
    baseHours += (dto.numberOfPages || 5) * 3; // 3 horas por página
    baseHours += (dto.numberOfForms || 2) * 5; // 5 horas por formulario
    baseHours += (dto.numberOfApis || 10) * 2; // 2 horas por API
    
    return Math.round(baseHours);
  }

  private calculateHoursDistribution(totalHours: number, dto: CreateEstimationDto) {
    // Distribución porcentual por tipo de trabajo
    let frontendPercentage = 0.35; // 35% frontend
    let backendPercentage = 0.30;  // 30% backend
    let testingPercentage = 0.20;  // 20% testing
    let designPercentage = 0.15;   // 15% diseño
    
    // Ajustar según el tipo de proyecto
    if (dto.projectType === 'api') {
      backendPercentage = 0.70;
      frontendPercentage = 0.10;
      testingPercentage = 0.15;
      designPercentage = 0.05;
    } else if (dto.projectType === 'landing_page') {
      frontendPercentage = 0.50;
      backendPercentage = 0.15;
      designPercentage = 0.25;
      testingPercentage = 0.10;
    }
    
    return {
      frontend: Math.round(totalHours * frontendPercentage),
      backend: Math.round(totalHours * backendPercentage),
      testing: Math.round(totalHours * testingPercentage),
      design: Math.round(totalHours * designPercentage),
    };
  }

  private calculateHumanResources(distribution: any, dto: CreateEstimationDto) {
    // Calcular recursos basado en horas y complejidad
    const hoursPerWeek = 40;
    const targetWeeks = 8; // Objetivo de 8 semanas
    
    return {
      frontend: Math.max(1, Math.ceil(distribution.frontend / (hoursPerWeek * targetWeeks))),
      backend: Math.max(1, Math.ceil(distribution.backend / (hoursPerWeek * targetWeeks))),
      fullstack: 0, // Se puede agregar lógica para usar fullstack en lugar de front+back
      designers: Math.max(1, Math.ceil(distribution.design / (hoursPerWeek * targetWeeks))),
      testers: Math.max(1, Math.ceil(distribution.testing / (hoursPerWeek * targetWeeks))),
      projectManager: 1, // Siempre 1 PM por proyecto
    };
  }

  private calculateTimeEstimates(distribution: any, resources: any) {
    const hoursPerWeek = 40;
    
    // Calcular semanas por cada tipo de trabajo
    const frontendWeeks = distribution.frontend / (resources.frontend * hoursPerWeek);
    const backendWeeks = distribution.backend / (resources.backend * hoursPerWeek);
    const designWeeks = distribution.design / (resources.designers * hoursPerWeek);
    const testingWeeks = distribution.testing / (resources.testers * hoursPerWeek);
    
    // El tiempo total es el máximo entre todos (trabajo en paralelo)
    const estimatedWeeks = Math.max(frontendWeeks, backendWeeks, designWeeks, testingWeeks);
    
    return {
      minimum: Math.round(estimatedWeeks * 0.8 * 10) / 10, // -20%
      estimated: Math.round(estimatedWeeks * 10) / 10,
      maximum: Math.round(estimatedWeeks * 1.3 * 10) / 10, // +30%
    };
  }

  private calculateCostEstimates(distribution: any, dto: CreateEstimationDto) {
    const rates = {
      frontend: dto.hourlyRateFrontend || 25,
      backend: dto.hourlyRateBackend || 30,
      fullstack: dto.hourlyRateFullstack || 35,
      design: dto.hourlyRateDesign || 20,
      testing: dto.hourlyRateTesting || 18,
    };
    
    const baseCost = 
      (distribution.frontend * rates.frontend) +
      (distribution.backend * rates.backend) +
      (distribution.design * rates.design) +
      (distribution.testing * rates.testing);
    
    return {
      minimum: Math.round(baseCost * 0.85), // -15%
      estimated: Math.round(baseCost),
      maximum: Math.round(baseCost * 1.25), // +25%
    };
  }

  private calculateRiskFactor(dto: CreateEstimationDto): number {
    let risk = 1.0;
    
    if (dto.complexityLevel === 'high') risk += 0.1;
    if (dto.complexityLevel === 'very_high') risk += 0.2;
    if (dto.hasPaymentSystem) risk += 0.1;
    if (dto.hasThirdPartyIntegrations) risk += 0.05;
    if (dto.projectType === 'erp' || dto.projectType === 'crm') risk += 0.1;
    
    return Math.round(risk * 100) / 100;
  }

  private calculateBufferPercentage(dto: CreateEstimationDto): number {
    let buffer = 0.15; // 15% base
    
    if (dto.complexityLevel === 'high') buffer += 0.05;
    if (dto.complexityLevel === 'very_high') buffer += 0.10;
    
    return Math.round(buffer * 100) / 100;
  }

  async findAll(companyId: string): Promise<ProjectEstimation[]> {
    return this.estimationModel
      .find({})
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string, companyId: string): Promise<ProjectEstimation> {
    return this.estimationModel
      .findById(id)
      .exec();
  }

  async remove(id: string, companyId: string): Promise<void> {
    await this.estimationModel.findByIdAndDelete(id).exec();
  }

  /**
   * Obtener estadísticas de estimaciones para reportes
   */
  async getEstimationStats(companyId: string) {
    const estimations = await this.findAll(companyId);
    
    if (estimations.length === 0) {
      return {
        totalProjects: 0,
        averageHours: 0,
        averageCost: 0,
        averageWeeks: 0,
        mostCommonTechnology: null,
        mostCommonProjectType: null,
      };
    }

    const totalHours = estimations.reduce((sum, e) => sum + e.estimatedHours, 0);
    const totalCost = estimations.reduce((sum, e) => sum + e.estimatedCost, 0);
    const totalWeeks = estimations.reduce((sum, e) => sum + e.estimatedWeeks, 0);

    // Encontrar tecnología más común
    const techCount = {};
    const projectTypeCount = {};
    
    estimations.forEach(e => {
      techCount[e.technologyStack] = (techCount[e.technologyStack] || 0) + 1;
      projectTypeCount[e.projectType] = (projectTypeCount[e.projectType] || 0) + 1;
    });

    const mostCommonTech = Object.keys(techCount).reduce((a, b) => 
      techCount[a] > techCount[b] ? a : b
    );

    const mostCommonType = Object.keys(projectTypeCount).reduce((a, b) => 
      projectTypeCount[a] > projectTypeCount[b] ? a : b
    );

    return {
      totalProjects: estimations.length,
      averageHours: Math.round(totalHours / estimations.length),
      averageCost: Math.round(totalCost / estimations.length),
      averageWeeks: Math.round((totalWeeks / estimations.length) * 10) / 10,
      mostCommonTechnology: mostCommonTech,
      mostCommonProjectType: mostCommonType,
      estimationsByMonth: this.getEstimationsByMonth(estimations),
    };
  }

  private getEstimationsByMonth(estimations: ProjectEstimation[]) {
    const monthlyData = {};
    
    estimations.forEach(e => {
      const month = (e as any).createdAt.toISOString().substring(0, 7); // YYYY-MM
      if (!monthlyData[month]) {
        monthlyData[month] = {
          count: 0,
          totalHours: 0,
          totalCost: 0,
        };
      }
      monthlyData[month].count++;
      monthlyData[month].totalHours += e.estimatedHours || 0;
      monthlyData[month].totalCost += e.estimatedCost || 0;
    });

    return monthlyData;
  }
}