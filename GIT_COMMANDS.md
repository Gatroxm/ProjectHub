# 📋 Comandos Git para ProjectHub

## 🚀 Preparar y Subir Cambios

### **Paso 1: Verificar estado actual**
```bash
git status
```

### **Paso 2: Agregar todos los archivos**
```bash
# Agregar todos los cambios
git add .

# O agregar archivos específicos
git add README.md
git add CHANGELOG.md
git add USUARIOS_PRUEBA.md
git add iniciar_servidores.ps1
git add iniciar_servidores.sh
git add backend/
git add frontend/
```

### **Paso 3: Commit con mensaje descriptivo**
```bash
git commit -m "🚀 v1.0.0: Sistema completo funcional

✨ Nuevas características:
- Sistema de autenticación JWT completo
- Dashboard interactivo con métricas
- Frontend React + Tailwind CSS responsivo
- Backend NestJS con API REST y GraphQL
- Scripts automatizados de inicio
- Documentación completa de instalación

🔧 Características técnicas:
- Login y redirección automática funcionando
- CORS configurado correctamente
- Manejo de errores con datos mock
- Multi-tenant architecture
- 4 usuarios de prueba disponibles

📚 Documentación:
- README.md con guía completa de instalación
- CHANGELOG.md con historial de versiones
- USUARIOS_PRUEBA.md actualizado
- Scripts para Windows y Linux/Mac

🌐 URLs operativas:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000/api/v1
- Swagger: http://localhost:3000/docs
- GraphQL: http://localhost:3000/graphql"
```

### **Paso 4: Push al repositorio**
```bash
# Primera vez (configurar upstream)
git push -u origin main

# Siguientes veces
git push
```

### **Paso 5: Crear tag de versión**
```bash
git tag -a v1.0.0 -m "🚀 Primera versión completa y funcional"
git push origin v1.0.0
```

## 🔍 Comandos Útiles

### **Ver cambios antes del commit**
```bash
git diff                    # Ver cambios no staged
git diff --cached          # Ver cambios staged
git diff HEAD              # Ver todos los cambios
```

### **Ver historial**
```bash
git log --oneline          # Log resumido
git log --graph --oneline  # Log con gráfico
```

### **Deshacer cambios**
```bash
git checkout -- archivo    # Deshacer cambios en archivo
git reset HEAD archivo     # Unstage archivo
git reset --soft HEAD~1    # Deshacer último commit (mantener cambios)
```

## 📋 Checklist Pre-Commit

- [ ] ✅ Ambos servidores inician correctamente
- [ ] ✅ Login funciona con todos los usuarios
- [ ] ✅ Dashboard carga sin errores
- [ ] ✅ README.md actualizado
- [ ] ✅ CHANGELOG.md completo
- [ ] ✅ Scripts de inicio funcionan
- [ ] ✅ No hay archivos sensibles (.env, node_modules)
- [ ] ✅ Documentación clara y completa

## 🎯 Mensaje de Commit Sugerido

```bash
git commit -m "🚀 v1.0.0: ProjectHub sistema completo operativo

- ✅ Autenticación JWT funcional con 4 usuarios de prueba
- ✅ Dashboard interactivo con datos mock y API
- ✅ Frontend React + Tailwind CSS responsivo  
- ✅ Backend NestJS con Swagger y GraphQL
- ✅ Scripts automatizados (Windows/Linux/Mac)
- ✅ Documentación completa de instalación
- ✅ CORS configurado, login y redirección OK

URLs: Frontend http://localhost:5173 | API http://localhost:3000/api/v1"
```

¡Todo listo para subir al repositorio! 🎉