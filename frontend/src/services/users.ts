import { apiClient } from '../lib/api';
import type { 
  User, 
  PaginatedResponse,
  ApiResponse 
} from '../types';

export const usersApi = {
  // Get all users
  getAll: async (params?: {
    page?: number;
    limit?: number;
    role?: string;
  }): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get<{success: boolean, data: PaginatedResponse<User>}>('/users', {
      params,
    });
    return response.data.data;
  },

  // Get user by ID
  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  // Create user
  create: async (data: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    companyId?: string;
  }): Promise<ApiResponse<User>> => {
    const response = await apiClient.post<ApiResponse<User>>('/users', data);
    return response.data;
  },
};