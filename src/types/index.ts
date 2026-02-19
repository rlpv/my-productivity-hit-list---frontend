// ============================================================================
// DOMAIN MODELS
// ============================================================================
export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// AUTH TYPES
// ============================================================================
// Extended user data with authentication info (stored in localStorage)
export interface UserData {
  _id?: string;
  username?: string;
  email?: string;
  token?: string;
  expiresAt?: number; // Token expiration timestamp (Unix milliseconds)
  role?: "user" | "admin";
  // ... other user properties
}

// ============================================================================
// TOAST/NOTIFICATION TYPES
// ============================================================================
export interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

export interface ToastContextType {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}
