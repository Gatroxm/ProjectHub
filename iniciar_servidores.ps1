# Script para iniciar Backend y Frontend de ProjectHub
Write-Host "Iniciando ProjectHub - Backend y Frontend" -ForegroundColor Cyan

# Limpiar procesos anteriores
Write-Host "Limpiando procesos anteriores..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Iniciar Backend
Write-Host "Iniciando Backend (NestJS)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-Command", "
    Write-Host 'BACKEND - ProjectHub' -ForegroundColor Green;
    Write-Host 'Puerto: 3000' -ForegroundColor Cyan;
    Write-Host 'API: http://localhost:3000/api/v1' -ForegroundColor Cyan;
    Write-Host 'Docs: http://localhost:3000/docs' -ForegroundColor Cyan;
    Write-Host '----------------------------------------' -ForegroundColor Gray;
    cd 'd:\Proyectos\ProjetHub\backend';
    npm run start:dev;
    Read-Host 'Presiona Enter para cerrar'
" -WindowStyle Normal

# Esperar que el backend se inicie
Write-Host "Esperando que el backend se inicie..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

# Verificar backend
Write-Host "Verificando backend..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:3000/api/v1/health" -Method GET -TimeoutSec 10
    Write-Host "Backend funcionando correctamente" -ForegroundColor Green
} catch {
    Write-Host "Backend no responde. Esperando mas tiempo..." -ForegroundColor Red
    Start-Sleep -Seconds 5
}

# Iniciar Frontend
Write-Host "Iniciando Frontend (React + Vite)..." -ForegroundColor Magenta
Start-Process powershell -ArgumentList "-Command", "
    Write-Host 'FRONTEND - ProjectHub' -ForegroundColor Magenta;
    Write-Host 'Puerto: 5173' -ForegroundColor Cyan;
    Write-Host 'URL: http://localhost:5173' -ForegroundColor Cyan;
    Write-Host '----------------------------------------' -ForegroundColor Gray;
    cd 'd:\Proyectos\ProjetHub\frontend';
    npm run dev;
    Read-Host 'Presiona Enter para cerrar'
" -WindowStyle Normal

Start-Sleep -Seconds 5

Write-Host "ProjectHub iniciado correctamente!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:3000/api/v1" -ForegroundColor Cyan
Write-Host "Swagger Docs: http://localhost:3000/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "Usuarios de prueba:" -ForegroundColor Yellow
Write-Host "   admin@example.com / password" -ForegroundColor Gray
Write-Host "   test@proyectohub.com / 123456" -ForegroundColor Gray
Write-Host ""
Write-Host "Presiona Enter para abrir el navegador..." -ForegroundColor Green
Read-Host

# Abrir navegador
Start-Process "http://localhost:5173"