import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum DocumentationType {
  REQUIREMENTS = 'requirements',
  TECHNICAL_SPEC = 'technical_spec',
  API_DOC = 'api_doc',
  USER_MANUAL = 'user_manual',
  PROCESS_DOC = 'process_doc'
}

export enum DocumentationStatus {
  DRAFT = 'draft',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

@Schema({ timestamps: true })
export class Documentation extends Document {
  @Prop({ required: true, maxlength: 255 })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  content: string;

  @Prop({ 
    type: String, 
    enum: DocumentationType, 
    default: DocumentationType.TECHNICAL_SPEC 
  })
  type: DocumentationType;

  @Prop({ 
    type: String, 
    enum: DocumentationStatus, 
    default: DocumentationStatus.DRAFT 
  })
  status: DocumentationStatus;

  @Prop({ default: '1.0.0' })
  version: string;

  @Prop({ type: [String] })
  tags?: string[];

  @Prop({ type: Types.ObjectId, required: true })
  projectId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  authorId: Types.ObjectId;
}

export const DocumentationSchema = SchemaFactory.createForClass(Documentation);