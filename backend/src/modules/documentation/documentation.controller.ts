import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query,
  UseGuards,
  Req
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { DocumentationService } from './documentation.service';
import { CreateDocumentationDto, UpdateDocumentationDto } from './dto/documentation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { DocumentationType } from './documentation.entity';

@ApiTags('Documentation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/documentation')
export class DocumentationController {
  constructor(private readonly documentationService: DocumentationService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva documentación' })
  @ApiResponse({ status: 201, description: 'Documentación creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  create(
    @Body() createDocumentationDto: CreateDocumentationDto,
    @Req() req: any,
  ) {
    return this.documentationService.create(
      createDocumentationDto,
      req.user.sub,
      req.user.companyId,
    );
  }

  @Get('project/:projectId')
  @ApiOperation({ summary: 'Obtener toda la documentación de un proyecto' })
  @ApiResponse({ status: 200, description: 'Lista de documentación del proyecto.' })
  findAllByProject(@Param('projectId') projectId: string, @Req() req: any) {
    return this.documentationService.findAllByProject(projectId, req.user.companyId);
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar documentación por contenido' })
  @ApiQuery({ name: 'q', description: 'Término de búsqueda' })
  @ApiResponse({ status: 200, description: 'Resultados de búsqueda.' })
  search(@Query('q') query: string, @Req() req: any) {
    return this.documentationService.search(query, req.user.companyId);
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Obtener documentación por tipo' })
  @ApiResponse({ status: 200, description: 'Lista de documentación por tipo.' })
  findByType(@Param('type') type: string, @Req() req: any) {
    return this.documentationService.findByType(type, req.user.companyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener documentación por ID' })
  @ApiResponse({ status: 200, description: 'Detalles de la documentación.' })
  @ApiResponse({ status: 404, description: 'Documentación no encontrada.' })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.documentationService.findOne(id, req.user.companyId);
  }

  @Get(':id/versions')
  @ApiOperation({ summary: 'Obtener historial de versiones' })
  @ApiResponse({ status: 200, description: 'Historial de versiones.' })
  getVersionHistory(@Param('id') id: string, @Req() req: any) {
    return this.documentationService.getVersionHistory(id, req.user.companyId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar documentación' })
  @ApiResponse({ status: 200, description: 'Documentación actualizada.' })
  @ApiResponse({ status: 403, description: 'Sin permisos para editar.' })
  @ApiResponse({ status: 404, description: 'Documentación no encontrada.' })
  update(
    @Param('id') id: string,
    @Body() updateDocumentationDto: UpdateDocumentationDto,
    @Req() req: any,
  ) {
    return this.documentationService.update(
      id,
      updateDocumentationDto,
      req.user.sub,
      req.user.companyId,
    );
  }

  @Patch(':id/publish')
  @ApiOperation({ summary: 'Publicar documentación' })
  @ApiResponse({ status: 200, description: 'Documentación publicada.' })
  publish(@Param('id') id: string, @Req() req: any) {
    return this.documentationService.publish(id, req.user.companyId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar documentación' })
  @ApiResponse({ status: 200, description: 'Documentación eliminada.' })
  @ApiResponse({ status: 403, description: 'Sin permisos para eliminar.' })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.documentationService.remove(id, req.user.sub, req.user.companyId);
  }
}