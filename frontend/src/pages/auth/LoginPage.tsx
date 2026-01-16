import { Login } from "../../components/auth/Login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(data: { email: string; password: string }) {
    try {
      await login(data.email, data.password);
      toast.success("Login realizado com sucesso!", {
        duration: 3000,
        position: "bottom-right",
      });
      navigate("/posts");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Email ou senha inválidos", {
        duration: 3000,
        position: "bottom-right",
      });
    }
  }

  return (
    <div>
      <Login
        onSubmit={handleLogin}
        onCreateAccount={() => navigate("/auth/register")}
      />
    </div>
  );
}
