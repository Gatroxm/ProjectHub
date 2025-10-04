import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/auth';
import type { User, AuthResponse, LoginCredentials, RegisterCompanyData } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterCompanyData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!token && !!user;
  
  // Debug log para rastrear cambios en isAuthenticated
  useEffect(() => {
    console.log('AuthContext - isAuthenticated changed:', { 
      isAuthenticated, 
      hasToken: !!token, 
      hasUser: !!user,
      isLoading 
    });
  }, [isAuthenticated, token, user, isLoading]);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedToken = localStorage.getItem('access_token');
        const savedUser = localStorage.getItem('user');

        if (savedToken && savedUser && savedUser !== 'undefined') {
          setToken(savedToken);
          try {
            setUser(JSON.parse(savedUser));
          } catch (parseError) {
            console.error('Error parsing saved user data:', parseError);
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            return;
          }
          
          // Verify token is still valid
          try {
            const profile = await authApi.getProfile();
            setUser(profile);
            localStorage.setItem('user', JSON.stringify(profile));
          } catch (error) {
            // Token is invalid, clear auth state
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            setToken(null);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response: AuthResponse = await authApi.login(credentials);
      
      console.log('AuthContext - Login response:', response);
      
      // Actualizar el estado y localStorage
      setToken(response.access_token);
      setUser(response.user);
      
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      console.log('AuthContext - Token saved to localStorage:', response.access_token);
      console.log('AuthContext - User saved to localStorage:', response.user);
      
      // Usar un pequeño delay para asegurar que el estado se propague
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterCompanyData) => {
    try {
      setIsLoading(true);
      const response: AuthResponse = await authApi.register(data);
      
      setToken(response.access_token);
      setUser(response.user);
      
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Error during logout:', error);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};