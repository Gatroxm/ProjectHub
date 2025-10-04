@echo off
echo 🚀 Iniciando ProjectHub - Frontend + Backend
echo.

REM Matar procesos existentes de Node
taskkill /f /im node.exe 2>nul

REM Esperar un momento
timeout /t 2 /nobreak >nul

echo 📦 Iniciando Backend...
start "Backend" cmd /k "cd /d D:\Proyectos\ProjetHub && npm run backend:dev"

echo ⏳ Esperando que el backend inicie...
timeout /t 8 /nobreak >nul

echo 🌐 Iniciando Frontend...
start "Frontend" cmd /k "cd /d D:\Proyectos\ProjetHub && npm run frontend:dev"

echo.
echo ✅ Servidores iniciados:
echo    Backend:  http://localhost:3000/api/v1
echo    Frontend: http://localhost:5173
echo    Swagger:  http://localhost:3000/docs
echo.
echo Presiona cualquier tecla para cerrar los servidores...
pause >nul

echo 🛑 Cerrando servidores...
taskkill /f /im node.exe 2>nul
echo ✅ Servidores cerrados
pause