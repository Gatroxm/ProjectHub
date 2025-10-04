const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Iniciando ProjectHub...');

// Función para ejecutar comando
function runCommand(command, args, cwd, label) {
    return new Promise((resolve, reject) => {
        console.log(`📦 ${label}: ${command} ${args.join(' ')}`);

        const child = spawn(command, args, {
            cwd,
            stdio: 'inherit',
            shell: true
        });

        child.on('close', (code) => {
            if (code === 0) {
                console.log(`✅ ${label} completado`);
                resolve();
            } else {
                console.log(`❌ ${label} falló con código ${code}`);
                reject(new Error(`${label} failed with code ${code}`));
            }
        });

        child.on('error', (error) => {
            console.log(`❌ Error en ${label}:`, error);
            reject(error);
        });
    });
}

async function startDev() {
    const rootDir = process.cwd();
    const backendDir = path.join(rootDir, 'backend');
    const frontendDir = path.join(rootDir, 'frontend');

    try {
        // Verificar si el directorio dist existe y compilar si es necesario
        const distDir = path.join(backendDir, 'dist');

        if (!fs.existsSync(distDir) || !fs.existsSync(path.join(distDir, 'main.js'))) {
            console.log('🔨 Compilando backend...');
            await runCommand('npm', ['run', 'build'], backendDir, 'Backend Build');
        }

        // Iniciar frontend y backend en paralelo
        console.log('🌐 Iniciando servidores...');

        const frontend = spawn('npm', ['run', 'dev'], {
            cwd: frontendDir,
            stdio: 'inherit',
            shell: true
        });

        const backend = spawn('npm', ['run', 'start:dev'], {
            cwd: backendDir,
            stdio: 'inherit',
            shell: true
        });

        // Manejar cierre
        process.on('SIGINT', () => {
            console.log('\n🛑 Cerrando servidores...');
            frontend.kill();
            backend.kill();
            process.exit();
        });

        console.log('✅ Servidores iniciados:');
        console.log('   Frontend: http://localhost:5173');
        console.log('   Backend:  http://localhost:3000');
        console.log('   Swagger:  http://localhost:3000/docs');
        console.log('\n💡 Presiona Ctrl+C para detener');

    } catch (error) {
        console.error('❌ Error iniciando aplicación:', error);
        process.exit(1);
    }
}

startDev();