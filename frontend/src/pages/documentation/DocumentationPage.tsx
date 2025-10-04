import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface Documentation {
  id: string;
  title: string;
  content: string;
  type: string;
  status: string;
  author: string;
  versionNumber: string;
  updatedAt: string;
  tags: string[];
}

const DocumentationPage: React.FC = () => {
  const [documents, _setDocuments] = useState<Documentation[]>([
    {
      id: '1',
      title: 'API Documentation',
      content: '# API Documentation\n\nEsta es la documentación de nuestra API...',
      type: 'api_doc',
      status: 'approved',
      author: 'Juan Pérez',
      versionNumber: '1.2.0',
      updatedAt: '2025-10-04',
      tags: ['api', 'backend', 'endpoints']
    },
    {
      id: '2',
      title: 'Requerimientos del Proyecto',
      content: '# Requerimientos Funcionales\n\n1. El usuario debe poder...',
      type: 'requirements',
      status: 'draft',
      author: 'María García',
      versionNumber: '1.0.0',
      updatedAt: '2025-10-03',
      tags: ['requirements', 'funcional']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const documentTypes = [
    { value: 'all', label: 'Todos los tipos' },
    { value: 'requirements', label: 'Requerimientos' },
    { value: 'technical_spec', label: 'Especificaciones Técnicas' },
    { value: 'api_doc', label: 'Documentación API' },
    { value: 'user_manual', label: 'Manual de Usuario' },
    { value: 'changelog', label: 'Changelog' },
    { value: 'meeting_notes', label: 'Notas de Reuniones' },
    { value: 'code_snippets', label: 'Snippets de Código' },
    { value: 'architecture', label: 'Arquitectura' }
  ];

  const statusColors: { [key: string]: string } = {
    draft: 'bg-yellow-100 text-yellow-800',
    review: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    outdated: 'bg-red-100 text-red-800',
    archived: 'bg-gray-100 text-gray-800'
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📚 Documentación de Proyectos</h1>
          <p className="text-gray-600">
            Centraliza toda la documentación de tus proyectos con versionado automático
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          + Nuevo Documento
        </Button>
      </div>

      {/* Filtros */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar documentos
            </label>
            <Input
              type="text"
              placeholder="Buscar por título o contenido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de documento
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {documentTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
              }}
            >
              🔄 Limpiar Filtros
            </Button>
          </div>
        </div>
      </Card>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{documents.length}</div>
          <div className="text-sm text-gray-600">Total Documentos</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {documents.filter(d => d.status === 'approved').length}
          </div>
          <div className="text-sm text-gray-600">Aprobados</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {documents.filter(d => d.status === 'draft').length}
          </div>
          <div className="text-sm text-gray-600">Borradores</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {new Set(documents.flatMap(d => d.tags)).size}
          </div>
          <div className="text-sm text-gray-600">Tags Únicos</div>
        </Card>
      </div>

      {/* Lista de documentos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[doc.status]}`}>
                {doc.status}
              </span>
            </div>

            <div className="text-sm text-gray-600 mb-3">
              📝 Por {doc.author} • v{doc.versionNumber} • {doc.updatedAt}
            </div>

            <div className="text-gray-700 mb-4 line-clamp-3">
              {doc.content.substring(0, 150)}...
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {doc.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                📁 {documentTypes.find(t => t.value === doc.type)?.label || doc.type}
              </span>
              <div className="space-x-2">
                <Button size="sm" variant="outline">
                  👁️ Ver
                </Button>
                <Button size="sm" variant="outline">
                  ✏️ Editar
                </Button>
                <Button size="sm" variant="outline">
                  📋 Historial
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron documentos</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || selectedType !== 'all' 
              ? 'Intenta ajustar tus filtros de búsqueda' 
              : 'Comienza creando tu primer documento'
            }
          </p>
          <Button onClick={() => setShowCreateModal(true)}>
            📝 Crear Primer Documento
          </Button>
        </Card>
      )}

      {/* Modal de creación (placeholder) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Crear Nuevo Documento</h3>
            <p className="text-gray-600 mb-4">
              Funcionalidad en desarrollo. Este modal permitirá crear nuevos documentos con:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              <li>• ✏️ Editor Markdown enriquecido</li>
              <li>• 📂 Categorización por tipo</li>
              <li>• 🏷️ Sistema de etiquetas</li>
              <li>• 📝 Versionado automático</li>
              <li>• 👥 Control de permisos</li>
            </ul>
            <Button 
              onClick={() => setShowCreateModal(false)}
              className="w-full"
            >
              Cerrar
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DocumentationPage;