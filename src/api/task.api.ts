// ============================================================================
// TASK API - Task management endpoints for CRUD operations
// ============================================================================

import axiosInstance from "@/axios/axios-instance";
import type { Task } from "@/types";

export const taskApi = {
  // Get all tasks for authenticated user
  getAll: () => axiosInstance.get<{ data: Task[] }>("/tasks"),

  // Get a single task by ID
  getById: (id: string) => axiosInstance.get<{ data: Task }>(`/tasks/${id}`),

  // Create new task
  create: (data: { title: string; description?: string }) =>
    axiosInstance.post<{ data: Task }>("/tasks", data),

  // Update existing task
  update: (id: string, data: Partial<Task>) =>
    axiosInstance.put<{ data: Task }>(`/tasks/${id}`, data),

  // Delete task permanently
  delete: (id: string) => axiosInstance.delete(`/tasks/${id}`),

  // Toggle task completion status
  toggleComplete: (id: string, completed: boolean) =>
    axiosInstance.put<{ data: Task }>(`/tasks/${id}`, { completed }),
};

export default taskApi;
