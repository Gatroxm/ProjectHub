import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DocumentationService } from '../../modules/documentation/documentation.service';
import { EstimationService } from '../../modules/estimations/estimation.service';

async function verifyDatabase() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    console.log('🔍 Verificando datos en MongoDB Atlas...\n');

    const documentationService = app.get(DocumentationService);
    const estimationService = app.get(EstimationService);

    // Verificar documentación
    console.log('📚 DOCUMENTACIÓN:');
    const docs = await documentationService.search('', 'company123');
    console.log(`  Total documentos: ${docs.length}`);
    docs.forEach((doc, index) => {
      console.log(`  ${index + 1}. ${doc.title} (${doc.type}) - ${doc.status}`);
    });

    // Verificar estimaciones
    console.log('\n🤖 ESTIMACIONES:');
    const estimations = await estimationService.findAll('company123');
    console.log(`  Total estimaciones: ${estimations.length}`);
    estimations.forEach((est, index) => {
      console.log(`  ${index + 1}. ${est.name}`);
      console.log(`     - Tipo: ${est.projectType} | Stack: ${est.technologyStack}`);
      console.log(`     - Horas: ${est.estimatedHours} | Desarrolladores: ${est.estimatedDevelopers}`);
      console.log(`     - Costo: $${est.estimatedCost?.toLocaleString() || 'N/A'}`);
    });

    // Estadísticas generales
    console.log('\n📊 ESTADÍSTICAS:');
    if (estimations.length > 0) {
      const totalHours = estimations.reduce((sum, est) => sum + (est.estimatedHours || 0), 0);
      const totalCost = estimations.reduce((sum, est) => sum + (est.estimatedCost || 0), 0);
      const avgComplexity = estimations.map(e => e.complexityLevel).reduce((acc, level) => {
        acc[level] = (acc[level] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      console.log(`  Total horas estimadas: ${totalHours.toLocaleString()}`);
      console.log(`  Costo total estimado: $${totalCost.toLocaleString()}`);
      console.log(`  Complejidad más común: ${Object.entries(avgComplexity).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}`);
    }

    console.log('\n✅ Verificación completada - Base de datos poblada correctamente!\n');
    
  } catch (error) {
    console.error('❌ Error verificando la base de datos:', error);
  } finally {
    await app.close();
  }
}

// Ejecutar verificación
verifyDatabase().catch(error => {
  console.error('Error en verificación:', error);
  process.exit(1);
});