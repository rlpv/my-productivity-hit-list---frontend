// ============================================================================
// TASK STORE - Zustand state management for task operations
// ============================================================================

import type { Task } from "@/types";
import { create } from "zustand";

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  selectedTask: Task | null;

  // Actions
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedTask: (task: Task | null) => void;
  clearTasks: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,
  selectedTask: null,

  // Replace all tasks
  setTasks: (tasks) => set({ tasks }),

  // Add new task to list
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  // Update existing task by ID
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t._id === id ? { ...t, ...updates } : t)),
    })),

  // Remove task from list
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t._id !== id),
    })),

  // Toggle task completion status
  toggleComplete: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t._id === id ? { ...t, completed: !t.completed } : t,
      ),
    })),

  // Update loading state
  setLoading: (isLoading) => set({ isLoading }),

  // Set error message
  setError: (error) => set({ error }),

  // Set task for editing
  setSelectedTask: (selectedTask) => set({ selectedTask }),

  // Clear all tasks on logout
  clearTasks: () => set({ tasks: [], selectedTask: null }),
}));
