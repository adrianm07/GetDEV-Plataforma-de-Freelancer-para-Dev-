import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});


api.interceptors.request.use((config) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJsb2dpbi11c2VyIiwic3ViIjoibGFsYUBlbWFpbC5jb20iLCJleHAiOjE3Njc5NzU0NjZ9.UWsB_hF3thc8ehFiuGJ7WvIxfW73R1ItTHcD7NArp58";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
