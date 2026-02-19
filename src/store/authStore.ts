// ============================================================================
// AUTH STORE - Zustand state management for authentication
// ============================================================================

import type { User } from "@/types";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  termsAccepted: boolean;

  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setTermsAccepted: (accepted: boolean) => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  termsAccepted: false,

  // Set user data on successful login
  login: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    set({ user, token, isAuthenticated: true, isLoading: false });
  },

  // Clear user data on logout
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },

  // Update loading state
  setLoading: (isLoading) => set({ isLoading }),

  // Save terms acceptance to localStorage
  setTermsAccepted: (termsAccepted) => {
    localStorage.setItem("termsAccepted", termsAccepted.toString());
    set({ termsAccepted });
  },

  // Restore auth state from localStorage on app start
  initialize: () => {
    try {
      const userStr = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const termsAccepted = localStorage.getItem("termsAccepted") === "true";

      if (userStr && token) {
        const user = JSON.parse(userStr) as User;
        set({
          user,
          token,
          isAuthenticated: true,
          termsAccepted,
          isLoading: false,
        });
      } else {
        set({ termsAccepted, isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },
}));
