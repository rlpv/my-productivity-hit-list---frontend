import axios from "axios";

// Get API URL from environment or use fallback
const getApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  // Ensure we have a valid URL
  if (envUrl && typeof envUrl === "string" && envUrl.trim().length > 0) {
    return envUrl.trim();
  }
  // Fallback to localhost
  return "http://localhost:5000";
};

const API_URL = getApiUrl();

console.log("API URL:", API_URL); // Debug log

const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request URL:", config.baseURL + (config.url || ""));
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
