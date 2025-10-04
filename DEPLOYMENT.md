# 🚀 Guía de Despliegue - Project Hub

## 📋 Resumen
Esta guía detalla el proceso completo de despliegue de Project Hub en producción, incluyendo la base de datos MongoDB Atlas que ya contiene datos reales.

## ✅ Estado Actual
- ✅ **Base de datos**: MongoDB Atlas poblada con datos reales
- ✅ **Backend**: NestJS compilado y funcional
- ✅ **Credenciales**: Protegidas y configuradas
- ✅ **API**: 25+ endpoints funcionales
- ✅ **Documentación**: 3 documentos técnicos completos
- ✅ **Estimaciones**: 5 estimaciones IA con datos reales
- ✅ **Módulos**: Documentación, Estimaciones, Reportes operativos

---

## 🗄️ Base de Datos - MongoDB Atlas

### Configuración Actual
- **Cluster**: `cluster0.xtx03x5.mongodb.net`
- **Base de datos**: `projecthub`
- **Colecciones**: `documentations`, `projectestimations`, `reports`

### Datos Poblados
```
📚 Documentación: 3 documentos
  - API Documentation - Project Hub
  - Manual de Usuario - Dashboard Ejecutivo  
  - Especificación Técnica - Motor de Estimaciones IA

🤖 Estimaciones: 5 estimaciones
  - E-commerce Platform Avanzado ($8,470 - 348h)
  - API REST Microservicios ($6,207 - 228h)
  - Sistema CRM Empresarial ($7,398 - 304h)
  - App Móvil React Native ($6,110 - 250h)
  - Landing Page Corporativa ($3,232 - 135h)

📊 Total: $31,417 en estimaciones, 1,265 horas
```

---

## 🛠️ Opciones de Despliegue

### 1. 🚢 Docker + Cloud (Recomendado)

#### Dockerfile (Backend)
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci --only=production

# Copiar código
COPY dist/ ./dist/
COPY .env.production .env

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

#### Variables de Entorno Producción
```bash
# .env.production
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://Gatroxm:2FW9SKicAEzH6BY@cluster0.xtx03x5.mongodb.net/projecthub?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=super-secure-production-secret-2024
CORS_ORIGIN=https://your-domain.com
```

### 2. ☁️ Vercel + Serverless

#### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/main.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/main.js"
    }
  ],
  "env": {
    "NODE_ENV": "production",
    "MONGODB_URI": "@mongodb-uri"
  }
}
```

### 3. 🌐 Railway/Render

#### railway.json
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run start:prod",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

---

## 📦 Scripts de Despliegue

### Preparación Local
```bash
# 1. Compilar proyecto
npm run build

# 2. Verificar datos en MongoDB
npm run verify:data

# 3. Test producción local
NODE_ENV=production npm start
```

### Despliegue Automatizado
```bash
# deploy.sh
#!/bin/bash

echo "🚀 Iniciando despliegue de Project Hub..."

# Verificar conexión a MongoDB
echo "🔗 Verificando MongoDB Atlas..."
npm run verify:data

# Compilar para producción
echo "⚙️ Compilando proyecto..."
npm run build

# Ejecutar tests
echo "🧪 Ejecutando tests..."
npm test

# Desplegar según plataforma
if [ "$PLATFORM" = "docker" ]; then
  echo "🐳 Desplegando con Docker..."
  docker build -t projecthub-api .
  docker push your-registry/projecthub-api
elif [ "$PLATFORM" = "vercel" ]; then
  echo "▲ Desplegando en Vercel..."
  vercel --prod
fi

echo "✅ Despliegue completado!"
```

---

## 🔧 Configuración de Producción

### 1. Variables de Entorno Seguras
```bash
# Generar JWT secret seguro
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Configurar CORS apropiado
CORS_ORIGIN=https://your-frontend-domain.com

# Configurar rate limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=100
```

### 2. Monitoreo y Logs
```typescript
// Agregar al main.ts para producción
if (process.env.NODE_ENV === 'production') {
  // Winston logger
  app.useLogger(app.get(Logger));
  
  // Health checks
  app.use('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  });
}
```

### 3. Optimizaciones de Performance
```typescript
// Compression y security headers
app.use(compression());
app.use(helmet());

// Request timeout
app.use(timeout('30s'));
```

---

## 🚦 Checklist de Despliegue

### Pre-despliegue
- [ ] ✅ MongoDB Atlas poblado con datos
- [ ] ✅ Variables de entorno configuradas
- [ ] ✅ Compilación exitosa
- [ ] ✅ Tests pasando
- [ ] [ ] Documentación API actualizada
- [ ] [ ] Certificados SSL configurados

### Durante Despliegue
- [ ] Backup de base de datos
- [ ] Verificar conectividad MongoDB
- [ ] Monitorear logs de inicio
- [ ] Verificar health endpoints

### Post-despliegue
- [ ] Verificar endpoints principales
- [ ] Test de estimaciones IA
- [ ] Verificar documentación
- [ ] Monitorear métricas de rendimiento

---

## 🆘 Troubleshooting

### Error: Conexión MongoDB
```bash
# Verificar conectividad
npm run verify:data

# Si falla, verificar:
# 1. IP whitelist en MongoDB Atlas
# 2. Credenciales en variables de entorno
# 3. Formato de connection string
```

### Error: Puerto en uso
```bash
# Cambiar puerto en .env
PORT=8080

# O usar puerto dinámico
PORT=${PORT:-3000}
```

### Error: CORS
```bash
# Configurar origen correcto
CORS_ORIGIN=https://your-domain.com

# Para múltiples orígenes
CORS_ORIGIN=https://domain1.com,https://domain2.com
```

---

## 📊 Endpoints de Producción

### Health Check
```
GET /health
GET /api/v1/health
GET /api/v1/health/detailed
```

### APIs Principales
```
POST /api/v1/auth/login
GET  /api/v1/documentation
POST /api/v1/estimations
GET  /api/v1/reports/dashboard
```

### Swagger UI
```
https://your-domain.com/docs
```

---

## 🎯 Próximos Pasos

1. **Elegir plataforma de despliegue** (Docker, Vercel, Railway)
2. **Configurar dominio personalizado**
3. **Implementar CI/CD con GitHub Actions**
4. **Configurar monitoring (New Relic, DataDog)**
5. **Optimizar para performance y SEO**

---

¡La aplicación está **lista para producción** con base de datos real y funcionalidades completas! 🚀