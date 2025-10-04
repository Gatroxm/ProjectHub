import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Documentation } from '../../modules/documentation/schemas/documentation.schema';
import { ProjectEstimation } from '../../modules/estimations/schemas/estimation.schema';
import { Report } from '../../modules/reports/schemas/report.schema';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    console.log('🌱 Iniciando seeding de la base de datos...');

    // Obtener modelos
    const documentationModel = app.get<Model<Documentation>>(getModelToken(Documentation.name));
    const estimationModel = app.get<Model<ProjectEstimation>>(getModelToken(ProjectEstimation.name));
    const reportModel = app.get<Model<Report>>(getModelToken(Report.name));

    // Limpiar datos existentes
    console.log('🗑️ Limpiando datos existentes...');
    await documentationModel.deleteMany({});
    await estimationModel.deleteMany({});
    await reportModel.deleteMany({});

    // Seed Documentación
    console.log('📚 Creando documentación inicial...');
    await seedDocumentation(documentationModel);

    // Seed Estimaciones
    console.log('🤖 Creando estimaciones iniciales...');
    await seedEstimations(estimationModel);

    // Seed Reportes
    console.log('📊 Creando reportes iniciales...');
    await seedReports(reportModel);

    console.log('✅ Seeding completado exitosamente!');
  } catch (error) {
    console.error('❌ Error durante el seeding:', error);
  } finally {
    await app.close();
  }
}

async function seedDocumentation(model: Model<Documentation>) {
  const docs = [
    {
      title: 'API Documentation - Project Hub',
      description: 'Documentación completa de la API REST de Project Hub',
      content: `# API Documentation

## Autenticación
Todos los endpoints requieren autenticación JWT excepto login y register.

## Endpoints Principales

### Auth
- POST /auth/login
- POST /auth/register
- GET /auth/profile

### Proyectos
- GET /projects
- POST /projects
- PUT /projects/:id

### Documentación
- GET /documentation
- POST /documentation
- PATCH /documentation/:id
      `,
      type: 'api_doc',
      status: 'published',
      version: '1.0.0',
      tags: ['api', 'documentation', 'endpoints'],
      projectId: '507f1f77bcf86cd799439011',
      authorId: '507f1f77bcf86cd799439012'
    },
    {
      title: 'Manual de Usuario - Dashboard',
      description: 'Guía completa para usar el dashboard ejecutivo',
      content: `# Manual de Usuario - Dashboard

## Introducción
El dashboard ejecutivo proporciona una vista consolidada de todos los proyectos.

## Funcionalidades

### 1. Vista General
- Métricas de rendimiento
- Gráficos de progreso
- Alertas importantes

### 2. Gestión de Proyectos
- Crear nuevos proyectos
- Asignar equipos
- Seguimiento de tiempos

### 3. Reportes
- Exportar datos
- Análisis de costos
- Métricas de productividad
      `,
      type: 'user_manual',
      status: 'approved',
      version: '2.1.0',
      tags: ['manual', 'dashboard', 'usuario'],
      projectId: '507f1f77bcf86cd799439013',
      authorId: '507f1f77bcf86cd799439012'
    },
    {
      title: 'Requerimientos Técnicos - Módulo Estimaciones',
      description: 'Especificaciones técnicas del motor de estimaciones IA',
      content: `# Requerimientos Técnicos - Motor de Estimaciones IA

## Objetivo
Desarrollar un sistema inteligente que calcule estimaciones precisas de proyectos.

## Requerimientos Funcionales

### RF-001: Análisis de Complejidad
El sistema debe evaluar la complejidad basado en:
- Tipo de proyecto
- Stack tecnológico
- Funcionalidades requeridas

### RF-002: Cálculo de Recursos
- Estimar horas de desarrollo
- Determinar número de desarrolladores
- Calcular duración del proyecto

### RF-003: Factores de Riesgo
- Identificar riesgos potenciales
- Aplicar multiplicadores de ajuste
- Generar recomendaciones

## Requerimientos No Funcionales

### RNF-001: Performance
- Tiempo de respuesta < 2 segundos
- Soporte para 1000+ estimaciones concurrentes

### RNF-002: Precisión
- Margen de error < 15%
- Mejora continua con feedback
      `,
      type: 'requirements',
      status: 'under_review',
      version: '1.2.0',
      tags: ['requerimientos', 'estimaciones', 'ia'],
      projectId: '507f1f77bcf86cd799439014',
      authorId: '507f1f77bcf86cd799439015'
    }
  ];

  await model.insertMany(docs);
  console.log(`  ✅ ${docs.length} documentos creados`);
}

async function seedEstimations(model: Model<ProjectEstimation>) {
  const estimations = [
    {
      name: 'E-commerce Avanzado',
      description: 'Plataforma de comercio electrónico con funcionalidades avanzadas',
      projectType: 'ecommerce',
      technologyStack: 'react',
      complexityLevel: 'high',
      hasAuthentication: true,
      hasPaymentGateway: true,
      hasAdminPanel: true,
      hasReporting: true,
      hasNotifications: true,
      hasRealTimeFeatures: true,
      hasFileUpload: true,
      hasThirdPartyIntegrations: true,
      hasMultiLanguage: true,
      hasMobileResponsive: true,
      estimatedHours: 1200,
      estimatedDevelopers: 6,
      estimatedWeeks: 20,
      estimatedCost: 96000,
      hoursByCategory: {
        frontend: 400,
        backend: 350,
        database: 120,
        testing: 200,
        deployment: 60,
        projectManagement: 70
      },
      riskMultiplier: 1.3,
      teamEfficiencyMultiplier: 0.9,
      technologyFamiliarityMultiplier: 1.1,
      aiEstimationData: {
        algorithmVersion: '2.1',
        confidence: 0.87,
        factors: ['high_complexity', 'multiple_integrations', 'payment_gateway'],
        recommendations: [
          'Considerar desarrollo en fases',
          'Implementar testing automatizado',
          'Plan de contingencia para integraciones'
        ]
      }
    },
    {
      name: 'API Microservicios',
      description: 'Arquitectura de microservicios para sistema empresarial',
      projectType: 'api',
      technologyStack: 'nodejs',
      complexityLevel: 'very_high',
      hasAuthentication: true,
      hasPaymentGateway: false,
      hasAdminPanel: false,
      hasReporting: true,
      hasNotifications: true,
      hasRealTimeFeatures: true,
      hasFileUpload: false,
      hasThirdPartyIntegrations: true,
      hasMultiLanguage: false,
      hasMobileResponsive: false,
      estimatedHours: 800,
      estimatedDevelopers: 4,
      estimatedWeeks: 16,
      estimatedCost: 64000,
      hoursByCategory: {
        frontend: 80,
        backend: 500,
        database: 100,
        testing: 80,
        deployment: 30,
        projectManagement: 10
      },
      riskMultiplier: 1.4,
      teamEfficiencyMultiplier: 1.0,
      technologyFamiliarityMultiplier: 0.95,
      aiEstimationData: {
        algorithmVersion: '2.1',
        confidence: 0.82,
        factors: ['microservices_architecture', 'high_scalability', 'complex_integration'],
        recommendations: [
          'Documentación exhaustiva de APIs',
          'Implementar monitoring completo',
          'Estrategia de deployment blue-green'
        ]
      }
    },
    {
      name: 'CRM Empresarial',
      description: 'Sistema CRM completo para gestión de clientes',
      projectType: 'crm',
      technologyStack: 'angular',
      complexityLevel: 'medium',
      hasAuthentication: true,
      hasPaymentGateway: false,
      hasAdminPanel: true,
      hasReporting: true,
      hasNotifications: true,
      hasRealTimeFeatures: false,
      hasFileUpload: true,
      hasThirdPartyIntegrations: true,
      hasMultiLanguage: true,
      hasMobileResponsive: true,
      estimatedHours: 600,
      estimatedDevelopers: 3,
      estimatedWeeks: 12,
      estimatedCost: 48000,
      hoursByCategory: {
        frontend: 250,
        backend: 200,
        database: 60,
        testing: 60,
        deployment: 20,
        projectManagement: 10
      },
      riskMultiplier: 1.1,
      teamEfficiencyMultiplier: 1.1,
      technologyFamiliarityMultiplier: 1.0,
      aiEstimationData: {
        algorithmVersion: '2.1',
        confidence: 0.91,
        factors: ['standard_crm_features', 'known_technology', 'moderate_complexity'],
        recommendations: [
          'Usar componentes pre-construidos',
          'Implementar en módulos',
          'Testing de integración prioritario'
        ]
      }
    }
  ];

  await model.insertMany(estimations);
  console.log(`  ✅ ${estimations.length} estimaciones creadas`);
}

async function seedReports(model: Model<Report>) {
  const reports = [
    {
      name: 'Reporte Mensual - Octubre 2025',
      description: 'Análisis de productividad y costos del mes de octubre',
      type: 'project_progress',
      status: 'completed',
      frequency: 'monthly',
      parameters: {
        month: '2025-10',
        includeProjects: 'all',
        metrics: ['productivity', 'costs', 'timeline']
      },
      data: {
        totalProjects: 12,
        completedProjects: 8,
        activeProjects: 4,
        totalHours: 2340,
        totalCost: 187200,
        averageEfficiency: 0.87,
        onTimeDelivery: 0.75,
        topPerformers: [
          { name: 'Juan Pérez', efficiency: 0.95, hoursWorked: 160 },
          { name: 'Ana García', efficiency: 0.92, hoursWorked: 155 }
        ]
      },
      generatedAt: new Date('2025-10-01T09:00:00.000Z'),
      createdBy: '507f1f77bcf86cd799439012',
      projectIds: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439013'],
      tags: ['mensual', 'productividad', 'octubre']
    },
    {
      name: 'Análisis de Costos Q4 2025',
      description: 'Análisis detallado de costos del cuarto trimestre',
      type: 'budget_analysis',
      status: 'completed',
      frequency: 'quarterly',
      parameters: {
        quarter: 'Q4-2025',
        includeOverhead: true,
        currency: 'USD'
      },
      data: {
        budgetAllocated: 500000,
        actualCost: 467500,
        variance: -32500,
        variancePercentage: -6.5,
        costByCategory: {
          development: 350000,
          testing: 70000,
          management: 47500
        },
        savings: 32500,
        recommendations: [
          'Optimizar procesos de testing',
          'Renegociar contratos de herramientas',
          'Implementar automatizaciones'
        ]
      },
      generatedAt: new Date('2025-10-02T14:30:00.000Z'),
      createdBy: '507f1f77bcf86cd799439012',
      projectIds: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439013', '507f1f77bcf86cd799439014'],
      tags: ['trimestral', 'costos', 'q4', 'budget']
    },
    {
      name: 'Rendimiento de Equipos - Septiembre',
      description: 'Evaluación del rendimiento de todos los equipos de desarrollo',
      type: 'team_performance',
      status: 'completed',
      frequency: 'monthly',
      parameters: {
        month: '2025-09',
        teams: ['frontend', 'backend', 'fullstack', 'qa'],
        metrics: ['velocity', 'quality', 'collaboration']
      },
      data: {
        totalTeams: 4,
        averageVelocity: 78.5,
        qualityScore: 0.89,
        collaborationIndex: 0.82,
        teamMetrics: [
          {
            teamName: 'Frontend Team',
            members: 5,
            velocity: 85,
            quality: 0.91,
            completedTasks: 127,
            avgHoursPerTask: 6.2
          },
          {
            teamName: 'Backend Team',
            members: 4,
            velocity: 82,
            quality: 0.93,
            completedTasks: 98,
            avgHoursPerTask: 8.1
          },
          {
            teamName: 'QA Team',
            members: 3,
            velocity: 75,
            quality: 0.88,
            completedTasks: 156,
            avgHoursPerTask: 4.5
          }
        ],
        improvements: [
          'Incrementar colaboración entre frontend y backend',
          'Implementar más automation en QA',
          'Mejorar estimaciones de tareas complejas'
        ]
      },
      generatedAt: new Date('2025-09-30T16:45:00.000Z'),
      createdBy: '507f1f77bcf86cd799439015',
      tags: ['equipos', 'rendimiento', 'septiembre', 'velocity']
    }
  ];

  await model.insertMany(reports);
  console.log(`  ✅ ${reports.length} reportes creados`);
}

// Ejecutar seeder
seed().catch(error => {
  console.error('Error en seeding:', error);
  process.exit(1);
});