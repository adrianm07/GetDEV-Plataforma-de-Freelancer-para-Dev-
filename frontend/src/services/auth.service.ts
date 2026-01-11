import type { RegisterRequest } from "../types/user";
import { api } from "./api";

export function setAuthToken(token: string) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function clearAuthToken() {
  delete api.defaults.headers.common["Authorization"];
  localStorage.removeItem("token");
}

export async function loginRequest(email: string, password: string) {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
}

export async function getLoggedUser() {
  const response = await api.get("/me");
  return response.data;
}

export async function registerUser(user: RegisterRequest){
  const response = await api.post("/auth/register", user);
  return response.data;
}

export default api;
