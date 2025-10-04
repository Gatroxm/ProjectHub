import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const useAuthRedirect = (redirectTo: string = '/dashboard') => {
  const { isAuthenticated, isLoading, user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useAuthRedirect - State:', { 
      isAuthenticated, 
      isLoading, 
      hasUser: !!user, 
      hasToken: !!token,
      redirectTo 
    });
    
    // Solo redirigir si no está cargando y está autenticado
    if (!isLoading && isAuthenticated && user && token) {
      console.log('useAuthRedirect - All conditions met, redirecting to:', redirectTo);
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo, user, token]);

  return { isAuthenticated, isLoading };
};