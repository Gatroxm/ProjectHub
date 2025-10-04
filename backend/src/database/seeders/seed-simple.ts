import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DocumentationService } from '../../modules/documentation/documentation.service';
import { EstimationService } from '../../modules/estimations/estimation.service';
import { DocumentationType, DocumentationStatus } from '../../modules/documentation/schemas/documentation.schema';
import { ComplexityLevel, TechnologyStack, ProjectType } from '../../modules/estimations/schemas/estimation.schema';

async function seedDatabase() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    console.log('🌱 Iniciando población de base de datos...');

    const documentationService = app.get(DocumentationService);
    const estimationService = app.get(EstimationService);

    // Seed Documentation
    console.log('📚 Creando documentación...');
    await seedDocumentation(documentationService);

    // Seed Estimations
    console.log('🤖 Creando estimaciones...');
    await seedEstimations(estimationService);

    console.log('✅ Base de datos poblada exitosamente!');
  } catch (error) {
    console.error('❌ Error poblando la base de datos:', error);
  } finally {
    await app.close();
  }
}

async function seedDocumentation(service: DocumentationService) {
  const docs = [
    {
      title: 'API Documentation - Project Hub',
      description: 'Documentación completa de la API REST de Project Hub',
      content: `# API Documentation - Project Hub v2.0

## Introducción
Project Hub API proporciona endpoints REST para gestionar proyectos, documentación, estimaciones y reportes.

## Autenticación
Todos los endpoints requieren autenticación JWT excepto login y register.

\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

## Endpoints Principales

### Autenticación
- **POST** \`/auth/login\` - Iniciar sesión
- **POST** \`/auth/register\` - Registrar usuario
- **GET** \`/auth/profile\` - Obtener perfil

### Documentación
- **GET** \`/documentation\` - Listar documentos
- **POST** \`/documentation\` - Crear documento
- **PATCH** \`/documentation/:id\` - Actualizar documento
- **DELETE** \`/documentation/:id\` - Eliminar documento

### Estimaciones
- **POST** \`/estimations\` - Crear estimación con IA
- **GET** \`/estimations\` - Listar estimaciones
- **GET** \`/estimations/stats\` - Estadísticas

### Reportes
- **GET** \`/reports/dashboard\` - Dashboard ejecutivo
- **GET** \`/reports/team-performance\` - Rendimiento equipos
- **GET** \`/reports/project-costs\` - Análisis costos

## Modelos de Datos

### Documentación
\`\`\`json
{
  "title": "string",
  "description": "string",
  "content": "string (markdown)",
  "type": "requirements|technical_spec|api_doc|user_manual|process_doc",
  "status": "draft|under_review|approved|published|archived",
  "version": "string",
  "tags": ["string"]
}
\`\`\`

### Estimación
\`\`\`json
{
  "name": "string",
  "projectType": "web_app|mobile_app|api|ecommerce|crm|erp",
  "technologyStack": "react|angular|vue|nodejs|python|java",
  "complexityLevel": "very_low|low|medium|high|very_high",
  "hasAuthentication": "boolean",
  "estimatedHours": "number",
  "estimatedCost": "number"
}
\`\`\``,
      type: DocumentationType.API_DOC,
      projectId: '670011223344556677889900',
      tags: ['api', 'documentation', 'endpoints', 'rest']
    },
    {
      title: 'Manual de Usuario - Dashboard Ejecutivo',
      description: 'Guía completa para usar el dashboard ejecutivo de Project Hub',
      content: `# Manual de Usuario - Dashboard Ejecutivo

## Introducción
El dashboard ejecutivo de Project Hub proporciona una vista consolidada de todos los proyectos, métricas clave y análisis de rendimiento.

## Acceso al Dashboard
1. Iniciar sesión en Project Hub
2. Navegar a "Dashboard" en el menú principal
3. Seleccionar período de análisis

## Funcionalidades Principales

### 1. Métricas Generales
- **Proyectos Activos**: Número de proyectos en desarrollo
- **Horas Trabajadas**: Total de horas del período
- **Eficiencia Promedio**: Porcentaje de eficiencia del equipo
- **Entregas a Tiempo**: Porcentaje de proyectos entregados a tiempo

### 2. Gráficos de Rendimiento
- Gráfico de barras: Horas por proyecto
- Gráfico circular: Distribución de tiempo por categoría
- Línea de tendencia: Productividad mensual

### 3. Alertas y Notificaciones
- Proyectos con retrasos
- Presupuestos excedidos
- Recursos sobreasignados

### 4. Acciones Rápidas
- Crear nuevo proyecto
- Generar reporte
- Exportar datos
- Programar reunión

## Interpretación de Métricas

### Eficiencia del Equipo
- **Verde (>85%)**: Rendimiento excelente
- **Amarillo (70-85%)**: Rendimiento bueno, área de mejora
- **Rojo (<70%)**: Requiere atención inmediata

### Entregas a Tiempo
- Meta: >90%
- Factores de impacto: estimaciones, recursos, complejidad

## Exportación de Datos
1. Seleccionar período
2. Elegir formato (PDF, Excel, JSON)
3. Hacer clic en "Exportar"
4. El archivo se descargará automáticamente`,
      type: DocumentationType.USER_MANUAL,
      projectId: '670011223344556677889901',
      tags: ['manual', 'dashboard', 'usuario', 'metricas']
    },
    {
      title: 'Especificación Técnica - Motor de Estimaciones IA',
      description: 'Documentación técnica detallada del algoritmo de estimaciones inteligentes',
      content: `# Especificación Técnica - Motor de Estimaciones IA

## Resumen Ejecutivo
El Motor de Estimaciones IA utiliza algoritmos de machine learning para proporcionar estimaciones precisas de tiempo, costo y recursos para proyectos de desarrollo de software.

## Arquitectura del Sistema

### Componentes Principales
1. **Analizador de Complejidad**: Evalúa factores del proyecto
2. **Motor de Cálculo**: Aplica algoritmos de estimación
3. **Sistema de Aprendizaje**: Mejora precisión con feedback
4. **API de Estimaciones**: Expone funcionalidades vía REST

### Algoritmo de Estimación

#### Fase 1: Análisis de Entrada
\`\`\`typescript
interface ProjectInput {
  projectType: ProjectType;
  technologyStack: TechnologyStack;
  complexityLevel: ComplexityLevel;
  features: FeatureSet;
}
\`\`\`

#### Fase 2: Cálculo Base
\`\`\`
baseHours = projectTypeMultiplier * complexityMultiplier * technologyMultiplier
\`\`\`

#### Fase 3: Ajustes por Características
- Autenticación: +15-25%
- Pagos: +20-30%
- Admin Panel: +10-20%
- Reportes: +15-25%
- Tiempo Real: +25-35%

#### Fase 4: Factores de Riesgo
- Experiencia del equipo: 0.8-1.3x
- Complejidad de integraciones: 1.0-1.5x
- Estabilidad de requerimientos: 0.9-1.4x

### Distribución de Horas
- **Frontend**: 35-40%
- **Backend**: 30-35%
- **Base de Datos**: 8-12%
- **Testing**: 15-20%
- **Deployment**: 3-5%
- **Gestión**: 5-8%

### Cálculo de Recursos Humanos
\`\`\`
desarrolladores = Math.ceil(totalHours / (semanas * 40))
ajustePorEficiencia = desarrolladores * factorEficiencia
recursosFinales = ajustePorEficiencia
\`\`\`

### Precisión y Confianza
- **Meta de precisión**: ±15%
- **Nivel de confianza**: 85-95%
- **Mejora continua**: Feedback loop automático

## API Endpoints

### Crear Estimación
\`\`\`http
POST /api/v1/estimations
Content-Type: application/json

{
  "name": "E-commerce Platform",
  "projectType": "ecommerce",
  "technologyStack": "react",
  "complexityLevel": "high",
  "hasAuthentication": true,
  "hasPaymentGateway": true,
  "hasAdminPanel": true
}
\`\`\`

### Respuesta
\`\`\`json
{
  "id": "...",
  "estimatedHours": 1200,
  "estimatedDevelopers": 6,
  "estimatedWeeks": 20,
  "estimatedCost": 96000,
  "aiEstimationData": {
    "confidence": 0.87,
    "factors": ["high_complexity", "multiple_integrations"],
    "recommendations": ["Implementar en fases", "Plan de testing robusto"]
  }
}
\`\`\``,
      type: DocumentationType.TECHNICAL_SPEC,
      projectId: '670011223344556677889902',
      tags: ['especificacion', 'ia', 'estimaciones', 'algoritmo']
    }
  ];

  for (const doc of docs) {
    try {
      await service.create(doc, '670011223344556677889999', 'company123');
      console.log(`  ✅ Documento creado: ${doc.title}`);
    } catch (error) {
      console.log(`  ❌ Error creando documento: ${doc.title}`, error.message);
    }
  }
}

async function seedEstimations(service: EstimationService) {
  const estimations = [
    {
      name: 'E-commerce Platform Avanzado',
      description: 'Plataforma completa de e-commerce con funcionalidades avanzadas de gestión y análisis',
      projectType: ProjectType.ECOMMERCE,
      technologyStack: TechnologyStack.REACT,
      complexityLevel: ComplexityLevel.HIGH,
      hasAuthentication: true,
      hasPaymentGateway: true,
      hasAdminPanel: true,
      hasReporting: true,
      hasNotifications: true,
      hasRealTimeFeatures: true,
      hasFileUpload: true,
      hasThirdPartyIntegrations: true,
      hasMultiLanguage: true,
      hasMobileResponsive: true
    },
    {
      name: 'API REST Microservicios',
      description: 'Arquitectura de microservicios escalable para aplicación empresarial',
      projectType: ProjectType.API,
      technologyStack: TechnologyStack.NODEJS,
      complexityLevel: ComplexityLevel.VERY_HIGH,
      hasAuthentication: true,
      hasPaymentGateway: false,
      hasAdminPanel: false,
      hasReporting: true,
      hasNotifications: true,
      hasRealTimeFeatures: true,
      hasFileUpload: false,
      hasThirdPartyIntegrations: true,
      hasMultiLanguage: false,
      hasMobileResponsive: false
    },
    {
      name: 'Sistema CRM Empresarial',
      description: 'CRM completo para gestión de clientes, ventas y marketing',
      projectType: ProjectType.CRM,
      technologyStack: TechnologyStack.ANGULAR,
      complexityLevel: ComplexityLevel.MEDIUM,
      hasAuthentication: true,
      hasPaymentGateway: false,
      hasAdminPanel: true,
      hasReporting: true,
      hasNotifications: true,
      hasRealTimeFeatures: false,
      hasFileUpload: true,
      hasThirdPartyIntegrations: true,
      hasMultiLanguage: true,
      hasMobileResponsive: true
    },
    {
      name: 'App Móvil React Native',
      description: 'Aplicación móvil multiplataforma con funcionalidades sociales',
      projectType: ProjectType.MOBILE_APP,
      technologyStack: TechnologyStack.REACT_NATIVE,
      complexityLevel: ComplexityLevel.MEDIUM,
      hasAuthentication: true,
      hasPaymentGateway: true,
      hasAdminPanel: false,
      hasReporting: false,
      hasNotifications: true,
      hasRealTimeFeatures: true,
      hasFileUpload: true,
      hasThirdPartyIntegrations: true,
      hasMultiLanguage: false,
      hasMobileResponsive: true
    },
    {
      name: 'Landing Page Corporativa',
      description: 'Sitio web corporativo con CMS integrado y optimización SEO',
      projectType: ProjectType.LANDING_PAGE,
      technologyStack: TechnologyStack.VUE,
      complexityLevel: ComplexityLevel.LOW,
      hasAuthentication: false,
      hasPaymentGateway: false,
      hasAdminPanel: true,
      hasReporting: false,
      hasNotifications: false,
      hasRealTimeFeatures: false,
      hasFileUpload: true,
      hasThirdPartyIntegrations: false,
      hasMultiLanguage: true,
      hasMobileResponsive: true
    }
  ];

  for (const estimation of estimations) {
    try {
      await service.calculateEstimation(estimation, 'company123');
      console.log(`  ✅ Estimación creada: ${estimation.name}`);
    } catch (error) {
      console.log(`  ❌ Error creando estimación: ${estimation.name}`, error.message);
    }
  }
}

// Ejecutar seeding
seedDatabase().catch(error => {
  console.error('Error en seeding:', error);
  process.exit(1);
});