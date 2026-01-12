import { useState } from "react";
import { AccountTypeSelector } from "../../components/auth/AccountTypeSelector";
import { Register } from "../../components/auth/Register";
import type { AccountType } from "../../types/accountType";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth.service";

export interface RegisterFormData {
  name: string;
  email: string;
  senha: string;
  confirmPassword: string;
  telefone: string;
  foto?: File | null;
}

export function RegisterPage() {

    const [accountType, setAccountType] = useState<AccountType>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleSelectType(type: AccountType){
        setAccountType(type);
    }

    function handleBacktoLogin(){
        navigate("/auth/login"); 
    }

    function handleBacktoTypeSelection(){
        setAccountType(null);
    }
async function handleRegisterSuccess(data: RegisterFormData) {
  try {
    setLoading(true);

    let fotoUrl = null;

    // if (data.foto) {
    //   fotoUrl = await uploadProfilePhoto(data.foto);
    // }

    await registerUser({
      nome: data.name,
      email: data.email,
      senha: data.senha,
      telefone: data.telefone,
      fotoUrl,
      tipoUsuario: accountType,
    });

    navigate("/auth/login");
  } catch (error: any) {
  console.error("ERRO REGISTER:", error);
  console.error("RESPONSE:", error?.response);
  console.error("DATA:", error?.response?.data);

  alert("Erro ao cadastrar usuário");



  } finally {
    setLoading(false);
  }
}

    return (
        <>
        {accountType === null ? (
            <AccountTypeSelector 
                onSelectType={handleSelectType}
                onBackToLogin={handleBacktoLogin}
            />
        ) : (
            <Register 
                accountType={accountType}
                onBackToTypeSelection={handleBacktoTypeSelection}
                onRegisterSuccess={handleRegisterSuccess}
                loading={loading}
            />
        )}
        </>
    );
}