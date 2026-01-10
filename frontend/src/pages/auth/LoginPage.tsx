import { Login } from "../../components/auth/Login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function LoginPage() {

    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleLogin(data: {email: string, password: string}) {
        await login(data.email, data.password);
        navigate("/posts")
    }

    return (
        <Login 
            onSubmit={handleLogin}
            onCreateAccount={() => navigate("/auth/register")}
        />
    );
}