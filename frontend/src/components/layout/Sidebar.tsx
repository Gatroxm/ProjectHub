import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Users, 
  FileText,
  Calculator,
  BarChart3,
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Proyectos',
    href: '/projects',
    icon: FolderKanban,
  },
  {
    name: 'Tareas',
    href: '/tasks',
    icon: CheckSquare,
  },
  {
    name: 'Usuarios',
    href: '/users',
    icon: Users,
  },
  {
    name: 'Documentación',
    href: '/documentation',
    icon: FileText,
  },
  {
    name: 'Estimaciones',
    href: '/estimations',
    icon: Calculator,
  },
  {
    name: 'Reportes',
    href: '/reports',
    icon: BarChart3,
  },
];

export const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">ProjectHub</h1>
        {user?.company && (
          <p className="text-sm text-gray-500 mt-1">{user.company.name}</p>
        )}
      </div>

      {/* Navigation */}
      <nav className="px-3 pb-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User info and logout */}
      <div className="absolute bottom-0 w-64 p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="ml-2"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};