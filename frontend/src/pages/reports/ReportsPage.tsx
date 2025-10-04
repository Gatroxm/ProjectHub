import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface DashboardMetrics {
  totalHoursWorked: number;
  averageHoursPerDay: number;
  tasksCompleted: number;
  projectsInProgress: number;
  projectsCompleted: number;
  estimationAccuracy: number;
  teamUtilization: number;
}

interface TeamMember {
  userId: string;
  userName: string;
  hoursWorked: number;
  tasksCompleted: number;
  averageTaskTime: number;
  productivityScore: number;
}

interface ProjectCost {
  projectId: string;
  projectName: string;
  estimatedCost: number;
  actualCost: number;
  estimatedHours: number;
  actualHours: number;
  profitMargin: number;
  costVariance: number;
  status: string;
}

const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'team' | 'projects' | 'timeline'>('dashboard');

  // Mock data para demostración
  const dashboardMetrics: DashboardMetrics = {
    totalHoursWorked: 1240,
    averageHoursPerDay: 41.33,
    tasksCompleted: 85,
    projectsInProgress: 12,
    projectsCompleted: 8,
    estimationAccuracy: 85.5,
    teamUtilization: 78
  };

  const teamPerformance: TeamMember[] = [
    {
      userId: '1',
      userName: 'Juan Pérez',
      hoursWorked: 168,
      tasksCompleted: 24,
      averageTaskTime: 7.5,
      productivityScore: 0.14
    },
    {
      userId: '2',
      userName: 'María García',
      hoursWorked: 152,
      tasksCompleted: 19,
      averageTaskTime: 8.2,
      productivityScore: 0.12
    },
    {
      userId: '3',
      userName: 'Carlos López',
      hoursWorked: 144,
      tasksCompleted: 22,
      averageTaskTime: 6.8,
      productivityScore: 0.15
    }
  ];

  const projectCosts: ProjectCost[] = [
    {
      projectId: '1',
      projectName: 'E-commerce Platform',
      estimatedCost: 15000,
      actualCost: 13500,
      estimatedHours: 480,
      actualHours: 432,
      profitMargin: 10.0,
      costVariance: -10.0,
      status: 'completed'
    },
    {
      projectId: '2',
      projectName: 'CRM System',
      estimatedCost: 22000,
      actualCost: 25800,
      estimatedHours: 640,
      actualHours: 744,
      profitMargin: -17.3,
      costVariance: 17.3,
      status: 'in_progress'
    }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">📊 Dashboard Ejecutivo</h2>
      
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {dashboardMetrics.totalHoursWorked}h
          </div>
          <div className="text-sm text-gray-600">Horas Trabajadas (30 días)</div>
          <div className="text-xs text-green-600 mt-1">
            ↗️ +12% vs mes anterior
          </div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {dashboardMetrics.tasksCompleted}
          </div>
          <div className="text-sm text-gray-600">Tareas Completadas</div>
          <div className="text-xs text-green-600 mt-1">
            ↗️ +8% vs mes anterior
          </div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">
            {dashboardMetrics.estimationAccuracy}%
          </div>
          <div className="text-sm text-gray-600">Precisión Estimaciones</div>
          <div className="text-xs text-yellow-600 mt-1">
            → +2% vs mes anterior
          </div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-1">
            {dashboardMetrics.teamUtilization}%
          </div>
          <div className="text-sm text-gray-600">Utilización del Equipo</div>
          <div className="text-xs text-green-600 mt-1">
            ↗️ +5% vs mes anterior
          </div>
        </Card>
      </div>

      {/* Gráficos simulados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">📈 Tendencia de Productividad</h3>
          <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="text-4xl mb-2">📊</div>
              <p>Gráfico de líneas mostrando:</p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• Horas por día</li>
                <li>• Tareas completadas</li>
                <li>• Eficiencia del equipo</li>
                <li>• Tiempo promedio por tarea</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">🎯 Estado de Proyectos</h3>
          <div className="h-64 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="text-4xl mb-2">🥧</div>
              <p>Gráfico circular mostrando:</p>
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Completados: {dashboardMetrics.projectsCompleted}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>En Progreso: {dashboardMetrics.projectsInProgress}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderTeamPerformance = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">👥 Rendimiento del Equipo</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {teamPerformance.map((member) => (
          <Card key={member.userId} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{member.userName}</h3>
                <p className="text-sm text-gray-600">Último mes</p>
              </div>
              <div className="text-2xl">👨‍💻</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">⏱️ Horas Trabajadas</span>
                <span className="font-semibold text-blue-600">{member.hoursWorked}h</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">✅ Tareas Completadas</span>
                <span className="font-semibold text-green-600">{member.tasksCompleted}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">📊 Tiempo Promedio</span>
                <span className="font-semibold text-purple-600">{member.averageTaskTime}h</span>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-medium text-gray-700">🎯 Score Productividad</span>
                <span className="font-bold text-orange-600">{member.productivityScore.toFixed(2)}</span>
              </div>
            </div>

            {/* Barra de progreso simulada */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Eficiencia</span>
                <span>{Math.round(member.productivityScore * 100 * 10)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                  style={{ width: `${Math.min(member.productivityScore * 100 * 10, 100)}%` }}
                ></div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabla de comparación */}
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">📋 Comparación Detallada</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Desarrollador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horas/Mes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tareas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiempo/Tarea
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Productividad
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamPerformance.map((member, index) => (
                <tr key={member.userId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{member.userName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.hoursWorked}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.tasksCompleted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.averageTaskTime}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {member.productivityScore.toFixed(3)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderProjectCosts = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">💰 Análisis de Costos por Proyecto</h2>
      
      <div className="space-y-4">
        {projectCosts.map((project) => (
          <Card key={project.projectId} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Información del proyecto */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {project.projectName}
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estado:</span>
                    <span className={`font-medium ${
                      project.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {project.status === 'completed' ? '✅ Completado' : '🔄 En Progreso'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Horas y costos */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">⏱️ Horas</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimadas:</span>
                    <span className="font-medium">{project.estimatedHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reales:</span>
                    <span className="font-medium">{project.actualHours}h</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t">
                    <span className="text-gray-600">Variación:</span>
                    <span className={`font-medium ${
                      project.actualHours <= project.estimatedHours ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {project.actualHours > project.estimatedHours ? '+' : ''}
                      {project.actualHours - project.estimatedHours}h
                    </span>
                  </div>
                </div>
              </div>

              {/* Análisis financiero */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">💰 Análisis Financiero</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Costo Estimado:</span>
                    <span className="font-medium">${project.estimatedCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Costo Real:</span>
                    <span className="font-medium">${project.actualCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t">
                    <span className="text-gray-600">Margen:</span>
                    <span className={`font-bold ${
                      project.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {project.profitMargin >= 0 ? '+' : ''}{project.profitMargin.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Barra de margen */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Margen de Ganancia</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        project.profitMargin >= 0 
                          ? 'bg-gradient-to-r from-green-400 to-green-600' 
                          : 'bg-gradient-to-r from-red-400 to-red-600'
                      }`}
                      style={{ 
                        width: `${Math.min(Math.abs(project.profitMargin) * 2, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Resumen financiero */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Resumen Financiero</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              ${projectCosts.reduce((sum, p) => sum + p.estimatedCost, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Estimado</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              ${projectCosts.reduce((sum, p) => sum + p.actualCost, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Costo Real</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {projectCosts.reduce((sum, p) => sum + p.profitMargin, 0).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Margen Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {projectCosts.reduce((sum, p) => sum + p.estimatedHours, 0)}h
            </div>
            <div className="text-sm text-gray-600">Horas Totales</div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderTimeline = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">📅 Timeline y Tendencias</h2>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">📊 Evolución Temporal</h3>
        <div className="h-96 bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-600">
            <div className="text-6xl mb-4">📈</div>
            <h4 className="text-xl font-semibold mb-4">Gráficos Interactivos</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h5 className="font-medium mb-2">📊 Métricas Diarias:</h5>
                <ul className="space-y-1">
                  <li>• Horas trabajadas por día</li>
                  <li>• Tareas completadas</li>
                  <li>• Ingresos generados</li>
                  <li>• Proyectos activos</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">🔍 Análisis Avanzado:</h5>
                <ul className="space-y-1">
                  <li>• Patrones de productividad</li>
                  <li>• Tendencias estacionales</li>
                  <li>• Predicciones futuras</li>
                  <li>• Alertas de rendimiento</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">🔥 Eficiencia por Tecnología</h3>
          <div className="space-y-3">
            {['React', 'Node.js', 'Python', 'Flutter'].map((tech, index) => (
              <div key={tech} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{tech}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
                      style={{ width: `${85 - index * 10}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {85 - index * 10}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">🎯 KPIs Clave</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">94.5%</div>
              <div className="text-xs text-gray-600">Satisfacción Cliente</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">87%</div>
              <div className="text-xs text-gray-600">Entrega a Tiempo</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-xl font-bold text-purple-600">12.5%</div>
              <div className="text-xs text-gray-600">Crecimiento MoM</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-xl font-bold text-orange-600">3.2</div>
              <div className="text-xs text-gray-600">NPS Score</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📊 Reportes Avanzados</h1>
          <p className="text-gray-600">
            Análisis detallado de rendimiento, costos y tendencias del equipo
          </p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          📥 Exportar Reportes
        </Button>
      </div>

      {/* Navegación de pestañas */}
      <Card className="p-1">
        <nav className="flex space-x-1">
          {[
            { key: 'dashboard', label: '📊 Dashboard', icon: '📊' },
            { key: 'team', label: '👥 Equipo', icon: '👥' },
            { key: 'projects', label: '💰 Proyectos', icon: '💰' },
            { key: 'timeline', label: '📅 Timeline', icon: '📅' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </Card>

      {/* Contenido de la pestaña activa */}
      <div className="min-h-[600px]">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'team' && renderTeamPerformance()}
        {activeTab === 'projects' && renderProjectCosts()}
        {activeTab === 'timeline' && renderTimeline()}
      </div>
    </div>
  );
};

export default ReportsPage;