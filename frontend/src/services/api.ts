import axios from "axios";
import { getToken } from "./token.service";


export const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    const token = getToken(); 
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");

      if (window.location.pathname !== "/auth/login") {
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);
