#!/bin/bash

# Script para iniciar Backend y Frontend de ProjectHub
echo "🚀 Iniciando ProjectHub - Backend y Frontend"

# Limpiar procesos anteriores
echo "🧹 Limpiando procesos anteriores..."
pkill -f "npm run start:dev"
pkill -f "npm run dev"
sleep 2

# Iniciar Backend
echo "🔧 Iniciando Backend (NestJS)..."
cd backend
npm run start:dev &
BACKEND_PID=$!
cd ..

# Esperar que el backend se inicie
echo "⏳ Esperando que el backend se inicie..."
sleep 8

# Verificar backend
echo "🔍 Verificando backend..."
if curl -f http://localhost:3000/api/v1/health > /dev/null 2>&1; then
    echo "✅ Backend funcionando correctamente"
else
    echo "❌ Backend no responde. Esperando más tiempo..."
    sleep 5
fi

# Iniciar Frontend
echo "🎨 Iniciando Frontend (React + Vite)..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

sleep 5

echo "🌟 ¡ProjectHub iniciado!"
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:3000/api/v1"
echo "📚 Swagger Docs: http://localhost:3000/docs"
echo ""
echo "👤 Usuarios de prueba:"
echo "   • admin@example.com / password"
echo "   • test@proyectohub.com / 123456"
echo ""
echo "Press Ctrl+C to stop all servers..."

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo "🛑 Deteniendo servidores..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    pkill -f "npm run start:dev"
    pkill -f "npm run dev"
    echo "✅ Servidores detenidos"
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT

# Mantener el script ejecutándose
wait