# 🔐 Usuarios de Prueba - ProjectHub

> **✅ Sistema completamente funcional - Login y Dashboard operativos**

## 🚀 **Inicio Rápido**

1. **Ejecutar servidores:**
   ```bash
   # Windows (PowerShell)
   .\iniciar_servidores.ps1
   
   # Linux/Mac
   ./iniciar_servidores.sh
   ```

2. **Abrir aplicación:** http://localhost:5173
3. **Usar cualquiera de las credenciales de abajo**

## 👥 **Usuarios Disponibles**

### **🔐 Administrador Principal**
```
Email: admin@example.com
Contraseña: password
Rol: Admin
Descripción: Acceso completo al sistema
```

### **👨‍💻 Desarrollador**
```
Email: developer@company.com
Contraseña: dev123
Rol: Developer
Descripción: Gestión de proyectos y tareas
```

### **👤 Usuario Básico**
```
Email: test@proyectohub.com
Contraseña: 123456
Rol: User
Descripción: Usuario estándar para pruebas
```

### **🤝 Cliente**
```
Email: client@proyecto.com
Contraseña: client2024
Rol: Client
Descripción: Vista de cliente con permisos limitados
```

## 🌐 **URLs del Sistema**

- **🎨 Frontend:** http://localhost:5173/
- **🔧 Backend API:** http://localhost:3000/api/v1
- **📚 Swagger Docs:** http://localhost:3000/docs
- **🔍 GraphQL:** http://localhost:3000/graphql

## ✅ **Estado del Sistema**

| Componente | Estado | URL |
|------------|---------|-----|
| Frontend React | ✅ Funcionando | http://localhost:5173 |
| Backend NestJS | ✅ Funcionando | http://localhost:3000 |
| Autenticación | ✅ Operativa | Login y redirección OK |
| Dashboard | ✅ Cargando | Datos mock + API |
| CORS | ✅ Configurado | Frontend ↔ Backend |

## 🧪 **Funcionalidades Verificadas**

- ✅ **Login completo** - Autenticación JWT funcional
- ✅ **Redirección automática** - Login → Dashboard
- ✅ **Dashboard interactivo** - Métricas y estadísticas
- ✅ **Manejo de errores** - Fallback a datos mock
- ✅ **Responsive design** - Tailwind CSS v3
- ✅ **API REST** - Endpoints documentados
- ✅ **Multi-tenant** - Separación por empresa

## 🎯 **Prueba Recomendada**

1. **Ejecuta:** `.\iniciar_servidores.ps1`
2. **Ve a:** http://localhost:5173
3. **Login:** `admin@example.com` / `password`
4. **Explora:** Dashboard, proyectos, configuración

¡Sistema completamente operativo! 🎉

## 🌐 **URLs de Acceso**

- **Frontend:** http://localhost:5173/
- **Backend API:** http://localhost:3000/api/v1
- **Documentación Swagger:** http://localhost:3000/docs
- **GraphQL Playground:** http://localhost:3000/graphql

## 📋 **Instrucciones de Prueba**

### **Desde el Frontend (Recomendado):**
1. Ve a http://localhost:5173/
2. Usa cualquiera de las credenciales de arriba
3. Explora la aplicación

### **Desde Swagger UI:**
1. Ve a http://localhost:3000/docs
2. Busca el endpoint `POST /api/v1/auth/login`
3. Haz clic en "Try it out"
4. Usa el siguiente JSON:
```json
{
  "email": "test@proyectohub.com",
  "password": "123456"
}
```

### **Desde API directa (PowerShell):**
```powershell
$body = '{"email":"test@proyectohub.com","password":"123456"}'
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/v1/auth/login" -Method POST -Body $body -ContentType "application/json"
$response
```

## 🧪 **Funcionalidades para Probar**

### **Autenticación:**
- ✅ Login con diferentes usuarios
- ✅ Registro de nuevos usuarios (mock)
- ✅ Obtener perfil de usuario
- ✅ Logout

### **Proyectos:**
- 📋 Crear proyectos
- 📋 Listar proyectos
- 📋 Ver detalles de proyecto
- 📋 Editar proyectos
- 📋 Eliminar proyectos

### **Tareas:**
- ✅ Crear tareas
- ✅ Gestionar tareas
- ⏱️ Iniciar/parar cronómetro
- 📊 Seguimiento de tiempo

### **Multi-Tenant:**
- 🏢 Cada usuario pertenece a una empresa diferente
- 🔒 Datos aislados por tenant

## 🎯 **Recomendaciones**

1. **Empieza con:** `test@proyectohub.com` / `123456`
2. **Prueba la interfaz** primero en http://localhost:5173/
3. **Revisa la API** en http://localhost:3000/docs
4. **Explora GraphQL** en http://localhost:3000/graphql

✅ admin@example.com / password
✅ test@proyectohub.com / 123456
✅ developer@company.com / dev123  
✅ client@proyecto.com / client2024