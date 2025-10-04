import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum ComplexityLevel {
  VERY_LOW = 'very_low',
  LOW = 'low', 
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}

export enum TechnologyStack {
  REACT = 'react',
  ANGULAR = 'angular',
  VUE = 'vue',
  NODEJS = 'nodejs',
  PYTHON = 'python',
  JAVA = 'java',
  NET = 'dotnet',
  PHP = 'php',
  MOBILE_NATIVE = 'mobile_native',
  REACT_NATIVE = 'react_native',
  FLUTTER = 'flutter'
}

export enum ProjectType {
  WEB_APP = 'web_app',
  MOBILE_APP = 'mobile_app',
  API = 'api',
  ECOMMERCE = 'ecommerce',
  CRM = 'crm',
  ERP = 'erp',
  LANDING_PAGE = 'landing_page',
  BLOG = 'blog',
  PORTFOLIO = 'portfolio',
  CUSTOM = 'custom'
}

@Schema({ timestamps: true })
export class ProjectEstimation extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ 
    type: String, 
    enum: ProjectType, 
    default: ProjectType.WEB_APP 
  })
  projectType: ProjectType;

  @Prop({ 
    type: String, 
    enum: TechnologyStack, 
    default: TechnologyStack.REACT 
  })
  technologyStack: TechnologyStack;

  @Prop({ 
    type: String, 
    enum: ComplexityLevel, 
    default: ComplexityLevel.MEDIUM 
  })
  complexityLevel: ComplexityLevel;

  // Características del proyecto
  @Prop({ default: false })
  hasAuthentication: boolean;

  @Prop({ default: false })
  hasPaymentGateway: boolean;

  @Prop({ default: false })
  hasAdminPanel: boolean;

  @Prop({ default: false })
  hasReporting: boolean;

  @Prop({ default: false })
  hasNotifications: boolean;

  @Prop({ default: false })
  hasRealTimeFeatures: boolean;

  @Prop({ default: false })
  hasFileUpload: boolean;

  @Prop({ default: false })
  hasThirdPartyIntegrations: boolean;

  @Prop({ default: false })
  hasMultiLanguage: boolean;

  @Prop({ default: false })
  hasMobileResponsive: boolean;

  // Métricas estimadas
  @Prop({ default: 0 })
  estimatedHours: number;

  @Prop({ default: 0 })
  estimatedDevelopers: number;

  @Prop({ default: 0 })
  estimatedWeeks: number;

  @Prop({ default: 0 })
  estimatedCost: number;

  // Desglose de estimación
  @Prop({
    type: {
      frontend: { type: Number, default: 0 },
      backend: { type: Number, default: 0 },
      database: { type: Number, default: 0 },
      testing: { type: Number, default: 0 },
      deployment: { type: Number, default: 0 },
      projectManagement: { type: Number, default: 0 }
    }
  })
  hoursByCategory: {
    frontend: number;
    backend: number;
    database: number;
    testing: number;
    deployment: number;
    projectManagement: number;
  };

  // Factores de riesgo y ajuste
  @Prop({ default: 1.0 })
  riskMultiplier: number;

  @Prop({ default: 1.0 })
  teamEfficiencyMultiplier: number;

  @Prop({ default: 1.0 })
  technologyFamiliarityMultiplier: number;

  // Información adicional
  @Prop()
  notes?: string;

  @Prop({ type: Types.ObjectId })
  createdBy?: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  projectId?: Types.ObjectId;

  // Datos de la estimación AI
  @Prop({
    type: {
      algorithmVersion: String,
      confidence: Number,
      factors: [String],
      recommendations: [String]
    }
  })
  aiEstimationData?: {
    algorithmVersion: string;
    confidence: number;
    factors: string[];
    recommendations: string[];
  };
}

export const ProjectEstimationSchema = SchemaFactory.createForClass(ProjectEstimation);