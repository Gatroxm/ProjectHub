import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface EstimationResult {
  id: string;
  name: string;
  projectType: string;
  technologyStack: string;
  complexityLevel: string;
  estimatedHours: number;
  frontendHours: number;
  backendHours: number;
  testingHours: number;
  designHours: number;
  frontendDevelopers: number;
  backendDevelopers: number;
  uiUxDesigners: number;
  qaTesters: number;
  estimatedWeeks: number;
  estimatedCost: number;
  minimumCost: number;
  maximumCost: number;
  createdAt: string;
}

const EstimationsPage: React.FC = () => {
  const [estimations, setEstimations] = useState<EstimationResult[]>([
    {
      id: '1',
      name: 'E-commerce Platform',
      projectType: 'ecommerce',
      technologyStack: 'react',
      complexityLevel: 'high',
      estimatedHours: 480,
      frontendHours: 168,
      backendHours: 144,
      testingHours: 96,
      designHours: 72,
      frontendDevelopers: 2,
      backendDevelopers: 2,
      uiUxDesigners: 1,
      qaTesters: 1,
      estimatedWeeks: 12,
      estimatedCost: 14400,
      minimumCost: 12240,
      maximumCost: 18000,
      createdAt: '2025-10-04'
    }
  ]);

  const [showCalculator, setShowCalculator] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    projectType: 'web_app',
    technologyStack: 'react',
    complexityLevel: 'medium',
    hasAuthentication: false,
    hasPaymentSystem: false,
    hasAdminPanel: false,
    hasRealTimeFeatures: false,
    hasThirdPartyIntegrations: false,
    numberOfPages: 5,
    numberOfForms: 2,
    numberOfApis: 10,
    hourlyRateFrontend: 25,
    hourlyRateBackend: 30,
    hourlyRateDesign: 20,
    hourlyRateTesting: 18
  });

  const projectTypes: { [key: string]: string } = {
    web_app: '🌐 Aplicación Web',
    mobile_app: '📱 App Móvil',
    api: '🔌 API/Backend',
    ecommerce: '🛒 E-commerce',
    crm: '👥 CRM',
    erp: '🏢 ERP',
    landing_page: '📄 Landing Page',
    blog: '📝 Blog',
    portfolio: '🎨 Portfolio',
    custom: '⚙️ Personalizado'
  };

  const technologyStacks: { [key: string]: string } = {
    react: 'React + Node.js',
    angular: 'Angular + .NET',
    vue: 'Vue.js + Python',
    nodejs: 'Node.js Full-Stack',
    python: 'Python/Django',
    java: 'Java Spring',
    dotnet: '.NET Core',
    php: 'PHP/Laravel',
    mobile_native: 'Nativo iOS/Android',
    react_native: 'React Native',
    flutter: 'Flutter'
  };

  const complexityLevels: { [key: string]: string } = {
    very_low: '⭐ Muy Baja',
    low: '⭐⭐ Baja', 
    medium: '⭐⭐⭐ Media',
    high: '⭐⭐⭐⭐ Alta',
    very_high: '⭐⭐⭐⭐⭐ Muy Alta'
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateEstimation = () => {
    // Simulación del cálculo de IA
    const baseHours = 40;
    let multiplier = 1;

    // Factores de complejidad
    const complexityMultipliers: { [key: string]: number } = {
      very_low: 0.7,
      low: 0.8,
      medium: 1.0,
      high: 1.4,
      very_high: 1.8
    };

    multiplier *= complexityMultipliers[formData.complexityLevel];

    // Factores de proyecto
    const projectMultipliers: { [key: string]: number } = {
      landing_page: 1.0,
      blog: 1.2,
      portfolio: 1.3,
      web_app: 2.0,
      mobile_app: 2.5,
      api: 1.5,
      ecommerce: 3.0,
      crm: 3.5,
      erp: 4.0,
      custom: 2.8
    };

    multiplier *= projectMultipliers[formData.projectType];

    let totalHours = baseHours * multiplier;

    // Características adicionales
    if (formData.hasAuthentication) totalHours += 20;
    if (formData.hasPaymentSystem) totalHours += 40;
    if (formData.hasAdminPanel) totalHours += 60;
    if (formData.hasRealTimeFeatures) totalHours += 30;
    if (formData.hasThirdPartyIntegrations) totalHours += 25;

    // Volumen de trabajo
    totalHours += formData.numberOfPages * 3;
    totalHours += formData.numberOfForms * 5;
    totalHours += formData.numberOfApis * 2;

    // Distribución de horas
    const frontendHours = Math.round(totalHours * 0.35);
    const backendHours = Math.round(totalHours * 0.30);
    const testingHours = Math.round(totalHours * 0.20);
    const designHours = Math.round(totalHours * 0.15);

    // Cálculo de recursos
    const hoursPerWeek = 40;
    const targetWeeks = 8;
    
    const frontendDevelopers = Math.max(1, Math.ceil(frontendHours / (hoursPerWeek * targetWeeks)));
    const backendDevelopers = Math.max(1, Math.ceil(backendHours / (hoursPerWeek * targetWeeks)));
    const designers = Math.max(1, Math.ceil(designHours / (hoursPerWeek * targetWeeks)));
    const testers = Math.max(1, Math.ceil(testingHours / (hoursPerWeek * targetWeeks)));

    // Cálculo de tiempo
    const maxWeeks = Math.max(
      frontendHours / (frontendDevelopers * hoursPerWeek),
      backendHours / (backendDevelopers * hoursPerWeek),
      designHours / (designers * hoursPerWeek),
      testingHours / (testers * hoursPerWeek)
    );

    // Cálculo de costos
    const cost = 
      frontendHours * formData.hourlyRateFrontend +
      backendHours * formData.hourlyRateBackend +
      designHours * formData.hourlyRateDesign +
      testingHours * formData.hourlyRateTesting;

    const newEstimation: EstimationResult = {
      id: Date.now().toString(),
      name: formData.name,
      projectType: formData.projectType,
      technologyStack: formData.technologyStack,
      complexityLevel: formData.complexityLevel,
      estimatedHours: Math.round(totalHours),
      frontendHours,
      backendHours,
      testingHours,
      designHours,
      frontendDevelopers,
      backendDevelopers,
      uiUxDesigners: designers,
      qaTesters: testers,
      estimatedWeeks: Math.round(maxWeeks * 10) / 10,
      estimatedCost: Math.round(cost),
      minimumCost: Math.round(cost * 0.85),
      maximumCost: Math.round(cost * 1.25),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setEstimations(prev => [newEstimation, ...prev]);
    setShowCalculator(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🤖 Motor de Estimaciones con IA</h1>
          <p className="text-gray-600">
            Calcula automáticamente horas, recursos y costos para nuevos proyectos
          </p>
        </div>
        <Button 
          onClick={() => setShowCalculator(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          ⚡ Nueva Estimación
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{estimations.length}</div>
          <div className="text-sm text-gray-600">Proyectos Estimados</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {estimations.reduce((sum, e) => sum + e.estimatedHours, 0)}h
          </div>
          <div className="text-sm text-gray-600">Horas Totales</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            ${estimations.reduce((sum, e) => sum + e.estimatedCost, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Valor Total</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {Math.round(estimations.reduce((sum, e) => sum + e.estimatedWeeks, 0))}w
          </div>
          <div className="text-sm text-gray-600">Semanas Totales</div>
        </Card>
      </div>

      {/* Lista de estimaciones */}
      <div className="space-y-4">
        {estimations.map((estimation) => (
          <Card key={estimation.id} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Información del proyecto */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {estimation.name}
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>📁 {projectTypes[estimation.projectType]}</div>
                  <div>⚙️ {technologyStacks[estimation.technologyStack]}</div>
                  <div>📊 {complexityLevels[estimation.complexityLevel]}</div>
                  <div>📅 {estimation.createdAt}</div>
                </div>
              </div>

              {/* Distribución de horas */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Distribución de Horas</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">💻 Frontend</span>
                    <span className="font-medium">{estimation.frontendHours}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">🔧 Backend</span>
                    <span className="font-medium">{estimation.backendHours}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">🎨 Diseño</span>
                    <span className="font-medium">{estimation.designHours}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">🧪 Testing</span>
                    <span className="font-medium">{estimation.testingHours}h</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center font-semibold">
                    <span>📊 Total</span>
                    <span>{estimation.estimatedHours}h</span>
                  </div>
                </div>
              </div>

              {/* Recursos y costos */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recursos Necesarios</h4>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">👨‍💻 Frontend Devs</span>
                    <span className="font-medium">{estimation.frontendDevelopers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">🔧 Backend Devs</span>
                    <span className="font-medium">{estimation.backendDevelopers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">🎨 Designers</span>
                    <span className="font-medium">{estimation.uiUxDesigners}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">🧪 QA Testers</span>
                    <span className="font-medium">{estimation.qaTesters}</span>
                  </div>
                </div>

                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">⏱️ Duración</span>
                    <span className="font-semibold">{estimation.estimatedWeeks}w</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">💰 Costo</span>
                    <span className="font-semibold text-green-600">
                      ${estimation.estimatedCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Rango: ${estimation.minimumCost.toLocaleString()} - ${estimation.maximumCost.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Calculadora modal */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">🤖 Calculadora de Estimaciones IA</h3>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCalculator(false)}
                >
                  ✕ Cerrar
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Información básica */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Información del Proyecto</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre del proyecto
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Ej: E-commerce de Ropa"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de proyecto
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => handleInputChange('projectType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {Object.entries(projectTypes).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stack tecnológico
                    </label>
                    <select
                      value={formData.technologyStack}
                      onChange={(e) => handleInputChange('technologyStack', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {Object.entries(technologyStacks).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nivel de complejidad
                    </label>
                    <select
                      value={formData.complexityLevel}
                      onChange={(e) => handleInputChange('complexityLevel', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {Object.entries(complexityLevels).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Características del proyecto */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Características</h4>
                  
                  <div className="space-y-3">
                    {[
                      { key: 'hasAuthentication', label: '🔐 Sistema de autenticación' },
                      { key: 'hasPaymentSystem', label: '💳 Sistema de pagos' },
                      { key: 'hasAdminPanel', label: '⚙️ Panel de administración' },
                      { key: 'hasRealTimeFeatures', label: '⚡ Funcionalidades en tiempo real' },
                      { key: 'hasThirdPartyIntegrations', label: '🔌 Integraciones con terceros' }
                    ].map(item => (
                      <label key={item.key} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData[item.key as keyof typeof formData] as boolean}
                          onChange={(e) => handleInputChange(item.key, e.target.checked)}
                          className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        📄 Páginas
                      </label>
                      <Input
                        type="number"
                        value={formData.numberOfPages}
                        onChange={(e) => handleInputChange('numberOfPages', parseInt(e.target.value))}
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        📝 Formularios
                      </label>
                      <Input
                        type="number"
                        value={formData.numberOfForms}
                        onChange={(e) => handleInputChange('numberOfForms', parseInt(e.target.value))}
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        🔌 APIs
                      </label>
                      <Input
                        type="number"
                        value={formData.numberOfApis}
                        onChange={(e) => handleInputChange('numberOfApis', parseInt(e.target.value))}
                        min="1"
                      />
                    </div>
                  </div>

                  <h4 className="font-semibold text-gray-900 pt-4">Tarifas por Hora (USD)</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        💻 Frontend
                      </label>
                      <Input
                        type="number"
                        value={formData.hourlyRateFrontend}
                        onChange={(e) => handleInputChange('hourlyRateFrontend', parseFloat(e.target.value))}
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        🔧 Backend
                      </label>
                      <Input
                        type="number"
                        value={formData.hourlyRateBackend}
                        onChange={(e) => handleInputChange('hourlyRateBackend', parseFloat(e.target.value))}
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        🎨 Diseño
                      </label>
                      <Input
                        type="number"
                        value={formData.hourlyRateDesign}
                        onChange={(e) => handleInputChange('hourlyRateDesign', parseFloat(e.target.value))}
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        🧪 Testing
                      </label>
                      <Input
                        type="number"
                        value={formData.hourlyRateTesting}
                        onChange={(e) => handleInputChange('hourlyRateTesting', parseFloat(e.target.value))}
                        min="1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <Button 
                  variant="outline"
                  onClick={() => setShowCalculator(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={calculateEstimation}
                  disabled={!formData.name}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  ⚡ Calcular con IA
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {estimations.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-gray-400 mb-4">
            🤖
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay estimaciones</h3>
          <p className="text-gray-600 mb-4">
            Usa nuestra IA para calcular automáticamente horas, recursos y costos
          </p>
          <Button onClick={() => setShowCalculator(true)}>
            ⚡ Crear Primera Estimación
          </Button>
        </Card>
      )}
    </div>
  );
};

export default EstimationsPage;