import { apiClient } from '../lib/api';
import type { 
  AuthResponse, 
  LoginCredentials, 
  RegisterCompanyData,
  User 
} from '../types';

export const authApi = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<{success: boolean, data: AuthResponse}>('/auth/login', credentials);
    return response.data.data;
  },

  // Register company
  register: async (data: RegisterCompanyData): Promise<AuthResponse> => {
    const response = await apiClient.post<{success: boolean, data: AuthResponse}>('/auth/register', data);
    return response.data.data;
  },

  // Get profile
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<{success: boolean, data: User}>('/auth/profile');
    return response.data.data;
  },

  // Refresh token
  refreshToken: async (): Promise<AuthResponse> => {
    const response = await apiClient.post<{success: boolean, data: AuthResponse}>('/auth/refresh');
    return response.data.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
};