import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Documentation, DocumentationStatus } from './schemas/documentation.schema';
import { CreateDocumentationDto, UpdateDocumentationDto } from './dto/documentation.dto';

@Injectable()
export class DocumentationService {
  constructor(
    @InjectModel(Documentation.name)
    private documentationModel: Model<Documentation>,
  ) {}

  async create(
    createDocumentationDto: CreateDocumentationDto,
    userId: string,
    companyId: string,
  ): Promise<Documentation> {
    const documentation = new this.documentationModel({
      ...createDocumentationDto,
      authorId: new Types.ObjectId(userId),
      projectId: new Types.ObjectId(createDocumentationDto.projectId),
    });

    return documentation.save();
  }

  async findAllByProject(projectId: string, companyId: string): Promise<Documentation[]> {
    return this.documentationModel
      .find({ projectId: new Types.ObjectId(projectId) })
      .sort({ updatedAt: -1 })
      .exec();
  }

  async findOne(id: string, companyId: string): Promise<Documentation> {
    const documentation = await this.documentationModel
      .findById(id)
      .exec();

    if (!documentation) {
      throw new NotFoundException('Documentación no encontrada');
    }

    return documentation;
  }

  async update(
    id: string,
    updateDocumentationDto: UpdateDocumentationDto,
    userId: string,
    companyId: string,
  ): Promise<Documentation> {
    const documentation = await this.findOne(id, companyId);
    
    // Solo el autor puede editar (o admins - esto se puede extender)
    if (documentation.authorId.toString() !== userId) {
      throw new ForbiddenException('No tienes permisos para editar esta documentación');
    }

    // Auto-increment version if content changed
    if (updateDocumentationDto.content && updateDocumentationDto.content !== documentation.content) {
      const [major, minor, patch] = documentation.version.split('.').map(Number);
      documentation.version = `${major}.${minor}.${patch + 1}`;
    }

    Object.assign(documentation, updateDocumentationDto);
    return documentation.save();
  }

  async publish(id: string, companyId: string): Promise<Documentation> {
    const documentation = await this.findOne(id, companyId);
    
    documentation.status = DocumentationStatus.APPROVED;
    
    return documentation.save();
  }

  async remove(id: string, userId: string, companyId: string): Promise<void> {
    const documentation = await this.findOne(id, companyId);
    
    if (documentation.authorId.toString() !== userId) {
      throw new ForbiddenException('No tienes permisos para eliminar esta documentación');
    }

    await this.documentationModel.findByIdAndDelete(id).exec();
  }

  async findByType(type: string, companyId: string): Promise<Documentation[]> {
    return this.documentationModel
      .find({ type })
      .sort({ updatedAt: -1 })
      .exec();
  }

  async search(query: string, companyId: string): Promise<Documentation[]> {
    return this.documentationModel
      .find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
        ],
      })
      .sort({ updatedAt: -1 })
      .exec();
  }

  async getVersionHistory(id: string, companyId: string): Promise<Documentation[]> {
    // En una implementación real, mantendrías un historial de versiones
    // Por ahora, devolvemos solo la versión actual
    const current = await this.findOne(id, companyId);
    return [current];
  }
}