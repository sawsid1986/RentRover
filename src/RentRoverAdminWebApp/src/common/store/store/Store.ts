import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../auth/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
