import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  name: process.env.APP_NAME || 'Project Hub',
  url: process.env.APP_URL || 'http://localhost:3000',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3001',

  // API Configuration
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  swaggerPath: process.env.SWAGGER_PATH || 'docs',

  // Security
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || 12,

  // Rate Limiting
  rateLimitTtl: parseInt(process.env.RATE_LIMIT_TTL, 10) || 60,
  rateLimitLimit: parseInt(process.env.RATE_LIMIT_LIMIT, 10) || 100,

  // File Upload
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 10485760, // 10MB
  uploadPath: process.env.UPLOAD_PATH || 'uploads',
}));
