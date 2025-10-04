import { apiClient } from '../lib/api';
import type { 
  Project, 
  PaginatedResponse,
  ApiResponse 
} from '../types';

export const projectsApi = {
  // Get all projects
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<Project>> => {
    const response = await apiClient.get<{success: boolean, data: PaginatedResponse<Project>}>('/projects', {
      params,
    });
    return response.data.data;
  },

  // Get project by ID
  getById: async (id: string): Promise<Project> => {
    const response = await apiClient.get<Project>(`/projects/${id}`);
    return response.data;
  },

  // Create project
  create: async (data: Partial<Project>): Promise<ApiResponse<Project>> => {
    const response = await apiClient.post<ApiResponse<Project>>('/projects', data);
    return response.data;
  },

  // Update project
  update: async (id: string, data: Partial<Project>): Promise<ApiResponse<Project>> => {
    const response = await apiClient.put<ApiResponse<Project>>(`/projects/${id}`, data);
    return response.data;
  },

  // Delete project
  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/projects/${id}`);
    return response.data;
  },
};