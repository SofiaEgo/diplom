import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../services/api";

export const userLogin = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUser(userData);
      if (response.data && response.data.user && response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data;
      } else {
        throw new Error("Неверный формат ответа сервера");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Ошибка при авторизации" }
      );
    }
  }
);

const tokenFromStorage = localStorage.getItem("authToken");
const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage,
    token: tokenFromStorage || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.token = payload.token;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload?.message || "Ошибка при авторизации";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
