import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loginRequest, getLoggedUser, setAuthToken, clearAuthToken } from "../services/auth.service";
import type { UserProfileData } from "../types/user";

interface AuthContextData {
  user: UserProfileData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    setAuthToken(token);

    getLoggedUser()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function login(email: string, password: string) {
    const { token } = await loginRequest(email, password);

    localStorage.setItem("token", token);
    setAuthToken(token);

    const user = await getLoggedUser();
    setUser(user);
  }

  function logout() {
    clearAuthToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
