import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/models/RootState";

const ApiClient = axios.create({
  timeout: 5000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

ApiClient.interceptors.request.use(
  (config) => {
    const token = useSelector((state: RootState) => state.auth.token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiClient;
