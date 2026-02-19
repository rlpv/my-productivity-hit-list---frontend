// ============================================================================
// AUTH API - Authentication endpoints for user management
// ============================================================================

import axiosInstance from "@/axios/axios-instance";
import type { User } from "@/types";

export const authApi = {
  // Login user with email and password
  login: (email: string, password: string) =>
    axiosInstance.post<{
      data: { _id: string; username: string; email: string; token: string };
    }>("/users/login", { email, password }),

  // Register new user with username, email, and password
  register: (username: string, email: string, password: string) =>
    axiosInstance.post<{ data: { user: User; token: string } }>(
      "/users/register",
      { username, email, password },
    ),

  // Logout current user
  logout: () => axiosInstance.post("/users/logout"),

  // Change user password with verification
  changePassword: (currentPassword: string, newPassword: string) =>
    axiosInstance.post("/users/change-password", {
      currentPassword,
      newPassword,
    }),

  // Request password reset via email OTP
  forgotPassword: (email: string) =>
    axiosInstance.post("/users/forgot-password", { email }),

  // Verify OTP code from email
  verifyOtp: (email: string, otp: string) =>
    axiosInstance.post("/users/verify-otp", { email, otp }),

  // Reset password with verified OTP token
  resetPassword: (resetToken: string, newPassword: string) =>
    axiosInstance.post("/users/reset-password", { resetToken, newPassword }),
};

export default authApi;
