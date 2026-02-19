// ============================================================================
// AXIOS INSTANCE - Centralized HTTP client configuration
// ============================================================================

import axios from "axios";

// Get API URL from environment variables
const getApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === "string" && envUrl.trim().length > 0) {
    return envUrl.trim();
  }
  return "http://localhost:5000";
};

const API_URL = getApiUrl();

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add auth token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  },
);

// Handle API errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          if (!window.location.pathname.includes("/login")) {
            window.location.href = "/login";
          }
          break;
        case 403:
          console.error(
            "Access forbidden:",
            data?.message || "You don't have permission",
          );
          break;
        case 404:
          console.error(
            "Resource not found:",
            data?.message || "Requested resource not found",
          );
          break;
        case 500:
          console.error(
            "Server error:",
            data?.message || "Internal server error",
          );
          break;
        default:
          console.error("API Error:", data?.message || error.message);
      }
    } else if (error.request) {
      console.error("Network Error: Unable to connect to server");
    } else {
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
