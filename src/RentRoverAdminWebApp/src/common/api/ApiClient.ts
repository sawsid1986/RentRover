import axios from "axios";
import { store } from "../store/store/Store";
import { clearAuth } from "../auth/AuthSlice";

const ApiClient = axios.create({
  timeout: 5000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

ApiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const UNAUTHORIZED = 401;
    const { dispatch } = store; // direct access to redux store.
    const { status } = error.response;
    if (status === UNAUTHORIZED) {
      dispatch(clearAuth());
    }
    return Promise.reject(error);
  }
);

export default ApiClient;
