import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum ReportType {
  PROJECT_PROGRESS = 'project_progress',
  TEAM_PERFORMANCE = 'team_performance',
  BUDGET_ANALYSIS = 'budget_analysis',
  TIME_TRACKING = 'time_tracking',
  QUALITY_METRICS = 'quality_metrics',
  CUSTOM = 'custom'
}

export enum ReportStatus {
  GENERATING = 'generating',
  COMPLETED = 'completed',
  FAILED = 'failed',
  SCHEDULED = 'scheduled'
}

export enum ReportFrequency {
  ONCE = 'once',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly'
}

@Schema({ timestamps: true })
export class Report extends Document {
  @Prop({ required: true, maxlength: 255 })
  name: string;

  @Prop()
  description?: string;

  @Prop({ 
    type: String, 
    enum: ReportType, 
    required: true 
  })
  type: ReportType;

  @Prop({ 
    type: String, 
    enum: ReportStatus, 
    default: ReportStatus.GENERATING 
  })
  status: ReportStatus;

  @Prop({ 
    type: String, 
    enum: ReportFrequency, 
    default: ReportFrequency.ONCE 
  })
  frequency: ReportFrequency;

  @Prop({ type: Object })
  parameters: Record<string, any>;

  @Prop({ type: Object })
  data: Record<string, any>;

  @Prop()
  filePath?: string;

  @Prop()
  fileSize?: number;

  @Prop({ type: Date })
  generatedAt?: Date;

  @Prop({ type: Date })
  scheduledAt?: Date;

  @Prop({ type: Types.ObjectId, required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: [Types.ObjectId] })
  projectIds?: Types.ObjectId[];

  @Prop({ type: [String] })
  tags?: string[];

  @Prop()
  errorMessage?: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);