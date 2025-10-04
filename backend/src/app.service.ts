import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppInfo() {
    return {
      name: 'Project Hub API',
      version: '2.0.0',
      description: 'SaaS Multi-Tenant Platform for Software Development Houses',
      status: 'active',
      features: [
        'AI-Powered Estimations',
        'Document Management', 
        'Advanced Reporting',
        'MongoDB Atlas Integration'
      ],
      endpoints: {
        documentation: '/docs',
        graphql: '/graphql',
        api: '/api/v1'
      }
    };
  }

  getHealth() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'MongoDB Atlas',
      environment: process.env.NODE_ENV || 'development'
    };
  }
}