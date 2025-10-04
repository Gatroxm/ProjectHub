import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Configuration
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig } from './config/app.config';
import { jwtConfig } from './config/jwt.config';

// Feature modules
import { AuthModule } from './modules/auth/auth.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { TimeTrackingModule } from './modules/time-tracking/time-tracking.module';
import { HealthModule } from './modules/health/health.module';
import { DocumentationModule } from './modules/documentation/documentation.module';
import { EstimationModule } from './modules/estimations/estimation.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig],
      envFilePath: ['.env.development', '.env'],
      cache: true,
    }),

    // Database Configuration - MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/projecthub_dev';
        
        console.log('🔗 Conectando a MongoDB:', mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Log sin mostrar credenciales
        
        return {
          uri: mongoUri,
          retryWrites: true,
          w: 'majority'
        };
      },
    }),

    // Feature modules
    AuthModule,
    ProjectsModule,
    TasksModule,
    UsersModule,
    CompaniesModule,
    TimeTrackingModule,
    HealthModule,
    DocumentationModule,
    EstimationModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
