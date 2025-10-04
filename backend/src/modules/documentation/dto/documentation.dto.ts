import { IsString, IsEnum, IsOptional, IsArray, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DocumentationType, DocumentationStatus } from '../schemas/documentation.schema';

export class CreateDocumentationDto {
  @ApiProperty({ description: 'Título del documento' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Contenido del documento en formato Markdown' })
  @IsString()
  content: string;

  @ApiProperty({ 
    description: 'Tipo de documentación',
    enum: DocumentationType,
    example: DocumentationType.REQUIREMENTS
  })
  @IsEnum(DocumentationType)
  type: DocumentationType;

  @ApiProperty({ description: 'Descripción breve del documento', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Etiquetas para categorizar', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ description: 'ID del proyecto' })
  @IsUUID()
  projectId: string;
}

export class UpdateDocumentationDto {
  @ApiProperty({ description: 'Título del documento', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Contenido del documento', required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ description: 'Descripción del documento', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ 
    description: 'Estado del documento',
    enum: DocumentationStatus,
    required: false
  })
  @IsOptional()
  @IsEnum(DocumentationStatus)
  status?: DocumentationStatus;

  @ApiProperty({ description: 'Etiquetas', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ description: 'Número de versión', required: false })
  @IsOptional()
  @IsString()
  versionNumber?: string;
}