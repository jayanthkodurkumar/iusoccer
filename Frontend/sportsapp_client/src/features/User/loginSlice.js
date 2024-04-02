import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { isAuthenticated: false, user: null, error: null };

const LOGIN_URL = "http://localhost:8080/login";

export const fetchLoginData = createAsyncThunk(
  "login/fetchLoginData",
  async (data) => {
    try {
      const response = await axios.post(LOGIN_URL, data);

      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoginData.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(fetchLoginData.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.error;
    });
  },
});

export const { loginSuccess, loginFailure, logout } = loginSlice.actions;

export default loginSlice.reducer;
