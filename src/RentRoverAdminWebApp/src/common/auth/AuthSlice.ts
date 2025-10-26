import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./AuthState";

const initialState: AuthState = {
  token: null,
  username: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isAuthenticated = action.payload.isAuthenticated; // Set isAuthenticated based on token presence
    },
    clearAuth: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.username = null;
    },
  },
});

export const { setToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
