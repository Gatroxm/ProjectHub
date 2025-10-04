import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentationController } from './documentation.controller';
import { DocumentationService } from './documentation.service';
import { Documentation, DocumentationSchema } from './schemas/documentation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Documentation.name, schema: DocumentationSchema }
    ])
  ],
  controllers: [DocumentationController],
  providers: [DocumentationService],
  exports: [DocumentationService],
})
export class DocumentationModule {}
