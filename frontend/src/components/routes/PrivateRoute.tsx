import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { userLogado, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!userLogado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
