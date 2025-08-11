import api from "@/api/axios";
import { API_CONFIG } from "@/config/config";

export const loginAPI = async (credentials) => {
  try {
    const loginResponse = await api.post(API_CONFIG.ENDPOINTS.LOGIN, {
      email: credentials.email,
      password: credentials.password,
      isEmployee: true,
    });

    const { token } = loginResponse.data;

    if (!token) {
      throw new Error("No token received from login API");
    }

    localStorage.setItem("token", token);

    const userData = await getUserInfoAPI();

    return { token, user: userData };
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};

export const getUserInfoAPI = async () => {
  try {
    const userResponse = await api.get(API_CONFIG.ENDPOINTS.USER_INFO);

    const userData = userResponse.data;

    if (!userData || !userData.id || !userData.name) {
      throw new Error("Invalid user data received from API");
    }

    return userData;
  } catch (error) {
    localStorage.removeItem("token");
    throw new Error("Failed to retrieve user information");
  }
};

export const validateStoredToken = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const userData = await getUserInfoAPI();
    return { token, user: userData };
  } catch (error) {
    localStorage.removeItem("token");
    throw error;
  }
};
