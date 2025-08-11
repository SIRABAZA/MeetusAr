import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";
import { API_CONFIG } from "@/config/config";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      // Step 6: Call login API
      const loginResponse = await api.post(API_CONFIG.ENDPOINTS.LOGIN, {
        email: credentials.email,
        password: credentials.password,
        isEmployee: true,
      });

      const { token } = loginResponse.data;

      // Step 7: Store token in localStorage (since HTTP-only cookies require backend setup)
      localStorage.setItem("token", token);

      // Step 8: Call user info API
      const userResponse = await api.get(API_CONFIG.ENDPOINTS.USER_INFO);
      const userData = userResponse.data;

      return { token, user: userData };
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
  return null;
});

// Async thunk to check authentication status
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const userResponse = await api.get(API_CONFIG.ENDPOINTS.USER_INFO);
      const userData = userResponse.data;

      return { token, user: userData };
    } catch (error) {
      localStorage.removeItem("token");
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })

      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })

      // Check auth status cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
