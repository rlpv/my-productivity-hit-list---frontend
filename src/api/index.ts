// ============================================================================
// API INDEX
// Purpose: Central export point for all API modules
// ============================================================================

// Custom API Error class for error handling
export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export { authApi, default as authApiDefault } from "./auth.api";
export {
  taskApi,
  default as taskApiDefault,
  taskApi as tasksApi,
} from "./task.api";

// Re-export for convenience
// Usage: import { taskApi, tasksApi, authApi, ApiError } from "@/api";
