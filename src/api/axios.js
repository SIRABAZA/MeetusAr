import axios from "axios";
import { API_CONFIG } from "@/config/config";

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  // withCredentials: true, if we need to send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          localStorage.removeItem("token");
          break;
        case 403:
          break;
        case 404:
          break;
        case 500:
          break;
        default:
          break;
      }

      const errorMessage =
        data?.message ||
        data?.error ||
        `HTTP ${status}: ${data?.statusText || "Request failed"}`;
      return Promise.reject({
        ...error,
        message: errorMessage,
        status,
      });
    } else if (error.request) {
      return Promise.reject({
        ...error,
        message: "Network error - no response received",
        status: 0,
      });
    } else {
      return Promise.reject({
        ...error,
        message: error.message || "An unexpected error occurred",
        status: 0,
      });
    }
  }
);

export default api;
