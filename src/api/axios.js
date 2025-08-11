import axios from "axios";
import { API_CONFIG } from "@/config/config";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Add authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request for debugging (remove in production)
    console.log("Request:", config.method?.toUpperCase(), config.url);

    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log response for debugging (remove in production)
    console.log("Response:", response.status, response.config.url);

    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      console.error("Response Error:", status, data);

      // Handle specific error statuses
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem("token");
          window.location.href = "/login";
          break;
        case 403:
          // Forbidden
          console.error("Access forbidden");
          break;
        case 404:
          // Not found
          console.error("Resource not found");
          break;
        case 500:
          // Internal server error
          console.error("Internal server error");
          break;
        default:
          console.error(`HTTP Error: ${status}`);
      }

      // Return error with custom message if available
      const errorMessage = data?.message || data?.error || "An error occurred";
      return Promise.reject({
        ...error,
        message: errorMessage,
        status,
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network Error:", error.request);
      return Promise.reject({
        ...error,
        message: "Network error - no response received",
        status: 0,
      });
    } else {
      // Something else happened
      console.error("Error:", error.message);
      return Promise.reject({
        ...error,
        message: error.message || "An unexpected error occurred",
        status: 0,
      });
    }
  }
);

export default api;
