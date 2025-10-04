import { apiClient } from '../lib/api';
import type { 
  Task, 
  PaginatedResponse,
  ApiResponse 
} from '../types';

export const tasksApi = {
  // Get all tasks
  getAll: async (params?: {
    page?: number;
    limit?: number;
    projectId?: string;
    status?: string;
    assignedToId?: string;
  }): Promise<PaginatedResponse<Task>> => {
    const response = await apiClient.get<{success: boolean, data: PaginatedResponse<Task>}>('/tasks', {
      params,
    });
    return response.data.data;
  },

  // Get task by ID
  getById: async (id: string): Promise<Task> => {
    const response = await apiClient.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  // Create task
  create: async (data: Partial<Task>): Promise<ApiResponse<Task>> => {
    const response = await apiClient.post<ApiResponse<Task>>('/tasks', data);
    return response.data;
  },

  // Update task
  update: async (id: string, data: Partial<Task>): Promise<ApiResponse<Task>> => {
    const response = await apiClient.put<ApiResponse<Task>>(`/tasks/${id}`, data);
    return response.data;
  },

  // Delete task
  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/tasks/${id}`);
    return response.data;
  },

  // Start timer
  startTimer: async (id: string, description?: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.post<ApiResponse<void>>(`/tasks/${id}/start-timer`, {
      description,
    });
    return response.data;
  },

  // Stop timer
  stopTimer: async (id: string, description?: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.post<ApiResponse<void>>(`/tasks/${id}/stop-timer`, {
      description,
    });
    return response.data;
  },
};