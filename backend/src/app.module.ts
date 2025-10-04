import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Configuration
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

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig],
      envFilePath: ['.env.development', '.env'],
      cache: true,
    }),

    // Feature modules
    AuthModule,
    ProjectsModule,
    TasksModule,
    UsersModule,
    CompaniesModule,
    TimeTrackingModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
