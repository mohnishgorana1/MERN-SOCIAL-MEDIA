import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authApi from "../api/authApi.js";

const loadUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const initialState = {
  user: loadUserFromLocalStorage(), // it will be an object containing user's info
  isAuthenticated: !!loadUserFromLocalStorage(),
  token: null,
};

// Async thunk for user registration
export const registerAsync = createAsyncThunk(
  "auth/register",
  async (userData) => {
    try {
      const response = await authApi.register(userData);
      return response.data;
    } catch (error) {
      console.log("ERROR register! ", error);
    }
  }
);

// Async thunk for user login
export const loginAsync = createAsyncThunk("auth/login", async (loginData) => {
  try {
    const response = await authApi.login(loginData);
    return response.data;
  } catch (error) {
    console.log("ERROR login! ", error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("Logging out");
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      console.log("Logged out");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload?.result;
        state.token = action.payload?.token;
        state.isAuthenticated = true;

        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", JSON.stringify(state.token));
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.user = action.payload?.result;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("user", JSON.stringify(action.payload?.result));
        localStorage.setItem("token", JSON.stringify(action.payload?.token));
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
