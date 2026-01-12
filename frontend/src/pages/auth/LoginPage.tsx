import { Login } from "../../components/auth/Login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function LoginPage() {

    const navigate = useNavigate();
    const { login } = useAuth();

async function handleLogin(data: { email: string; password: string }) {
  try {
    await login(data.email, data.password);
    navigate("/posts");
  } catch (error: any) {
     console.error("ERRO REGISTER:", error);
  console.error("RESPONSE:", error?.response);
  console.error("DATA:", error?.response?.data);
    alert(
      error?.response?.data?.message ?? "Email ou senha inválidos"
    );
  }
}


    return (
        <Login 
            onSubmit={handleLogin}
            onCreateAccount={() => navigate("/auth/register")}
        />
    );
}