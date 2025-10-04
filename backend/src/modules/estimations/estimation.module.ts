import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstimationService } from './estimation.service';
import { EstimationController } from './estimation.controller';
import { ProjectEstimation, ProjectEstimationSchema } from './schemas/estimation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectEstimation.name, schema: ProjectEstimationSchema }
    ])
  ],
  controllers: [EstimationController],
  providers: [EstimationService],
  exports: [EstimationService],
})
export class EstimationModule {}