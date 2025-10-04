# Project Hub API - Bruno Collections

Esta carpeta contiene todas las colecciones de Bruno para probar las APIs del Project Hub.

## 📋 Prerequisitos

1. **Bruno** instalado en tu sistema
2. **Servidor NestJS** ejecutándose en `http://localhost:3000`

## 🚀 Cómo importar y usar

### 1. Importar en Bruno
1. Abre Bruno
2. Selecciona "Open Collection" 
3. Navega hasta `d:\Proyectos\ProjetHub\backend\bruno-collections`
4. Selecciona la carpeta completa

### 2. Configurar el entorno
- **Environment**: Local
- **Base URL**: `http://localhost:3000/api/v1`

### 3. Flujo recomendado de pruebas

#### **Paso 1: Autenticación**
```
1. Auth/Login.bru           -> Obtener token de acceso
   o
1. Auth/Register Company.bru -> Registrar nueva empresa y obtener token
```

#### **Paso 2: Crear datos de prueba**
```
2. Users/Create User.bru     -> Crear un usuario
3. Projects/Create Project.bru -> Crear un proyecto
4. Tasks/Create Task.bru     -> Crear una tarea
```

#### **Paso 3: Probar funcionalidades**
```
5. Tasks/Start Task Timer.bru -> Iniciar cronómetro de tarea
6. Time Tracking/Start Time Tracking.bru -> Seguimiento de tiempo
7. Tasks/Stop Task Timer.bru -> Parar cronómetro
```

## 📚 Colecciones disponibles

### 🔐 Auth
- ✅ **Register Company**: Registrar nueva empresa con admin
- ✅ **Login**: Iniciar sesión con credenciales
- ✅ **Get Profile**: Obtener perfil del usuario autenticado
- ✅ **Refresh Token**: Renovar token de acceso

### 👥 Users
- ✅ **Create User**: Crear nuevo usuario
- ✅ **Get All Users**: Listar todos los usuarios
- ✅ **Get User by ID**: Obtener usuario específico

### 📋 Projects
- ✅ **Create Project**: Crear nuevo proyecto
- ✅ **Get All Projects**: Listar proyectos con filtros
- ✅ **Update Project**: Actualizar proyecto existente

### ✔️ Tasks
- ✅ **Create Task**: Crear nueva tarea
- ✅ **Start Task Timer**: Iniciar cronómetro de tarea
- ✅ **Stop Task Timer**: Parar cronómetro de tarea

### ⏱️ Time Tracking
- ✅ **Get Time Tracking**: Obtener registros de tiempo
- ✅ **Start Time Tracking**: Iniciar seguimiento de tiempo

### 🏢 Companies
- ✅ **Get Companies**: Listar empresas

### 🏥 Health
- ✅ **Health Check**: Verificación básica del servidor
- ✅ **Detailed Health Check**: Verificación detallada

## 🔧 Variables de entorno automáticas

Las siguientes variables se configuran automáticamente:
- `token`: Se actualiza automáticamente después del login/registro
- `userId`: Se establece después de crear/obtener usuarios
- `projectId`: Se establece después de crear proyectos
- `taskId`: Se establece después de crear tareas

## 📝 Credenciales de prueba

### Login existente:
```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

### Registro de nueva empresa:
```json
{
  "companyName": "Mi Empresa de Desarrollo",
  "website": "https://miempresa.com",
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan.perez@miempresa.com",
  "password": "MiPassword123!"
}
```

## 🔍 Tests automáticos

Cada request incluye tests automáticos que verifican:
- ✅ Código de estado HTTP correcto
- ✅ Estructura de respuesta válida
- ✅ Datos específicos en la respuesta

## 🔄 Scripts post-response

Los scripts automáticos establecen variables de entorno basadas en las respuestas:
- Tokens de autenticación
- IDs de recursos creados
- Datos necesarios para requests posteriores

---

**¡Listo para probar todas las APIs del Project Hub!** 🚀