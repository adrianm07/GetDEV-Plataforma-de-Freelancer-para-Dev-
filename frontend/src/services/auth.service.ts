import type { RegisterRequest } from "../types/user";
import { api } from "./api";

export function setAuthToken(token: string) {
  localStorage.setItem("token", token);
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
  try {
    const response = await api.get("/me");
    return response.data;
  }
  catch (err) {
    console.error("Erro ao buscar usuário logado:", err);
    return null;
  }
}


export async function registerUser(user: RegisterRequest){
  const response = await api.post("/auth/register", user);
  return response.data;
}

export default api;
