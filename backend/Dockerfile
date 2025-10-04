# Development Dockerfile for NestJS Backend
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (for better caching)
COPY backend/package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY backend/ .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/v1/health || exit 1

# Start the application
CMD ["npm", "run", "start:prod"]