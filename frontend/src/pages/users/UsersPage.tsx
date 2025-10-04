import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search, Filter, Mail, Calendar } from 'lucide-react';
import { usersApi } from '../../services/users';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Loading } from '../../components/ui/Loading';
import type { User } from '../../types';

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'developer':
        return 'bg-blue-100 text-blue-800';
      case 'client':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'developer':
        return 'Desarrollador';
      case 'client':
        return 'Cliente';
      default:
        return role;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardDescription className="flex items-center mt-1">
                <Mail className="h-3 w-3 mr-1" />
                {user.email}
              </CardDescription>
            </div>
          </div>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
            {getRoleLabel(user.role)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Registrado: {new Date(user.createdAt).toLocaleDateString()}
          </div>
          {user.company && (
            <div>
              {user.company.name}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');

  const { data: usersResponse, isLoading, error } = useQuery({
    queryKey: ['users', roleFilter],
    queryFn: () => usersApi.getAll({
      role: roleFilter || undefined,
    }),
  });

  if (isLoading) {
    return <Loading message="Cargando usuarios..." />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error al cargar los usuarios</p>
      </div>
    );
  }

  const users = usersResponse?.data || [];

  // Filter users by search term
  const filteredUsers = users.filter((user: User) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  const totalUsers = users.length;
  const adminUsers = users.filter((u: User) => u.role === 'admin').length;
  const developerUsers = users.filter((u: User) => u.role === 'developer').length;
  const clientUsers = users.filter((u: User) => u.role === 'client').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Usuarios</h1>
          <p className="text-gray-600">Gestiona los miembros de tu equipo</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Invitar Usuario
        </Button>
      </div>

      {/* User Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Administradores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{adminUsers}</div>
            <p className="text-xs text-gray-500">Acceso completo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Desarrolladores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{developerUsers}</div>
            <p className="text-xs text-gray-500">Miembros del equipo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{clientUsers}</div>
            <p className="text-xs text-gray-500">Acceso limitado</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="">Todos los roles</option>
            <option value="admin">Administradores</option>
            <option value="developer">Desarrolladores</option>
            <option value="client">Clientes</option>
          </select>
        </div>
      </div>

      {/* Users Grid */}
      {filteredUsers.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user: User) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {searchTerm || roleFilter ? 'No se encontraron usuarios' : 'No hay usuarios'}
          </h3>
          <p className="mt-2 text-gray-500">
            {searchTerm || roleFilter 
              ? 'Intenta cambiar los filtros de búsqueda'
              : 'Comienza invitando a tu equipo'
            }
          </p>
          {!searchTerm && !roleFilter && (
            <div className="mt-6">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Invitar Primer Usuario
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};