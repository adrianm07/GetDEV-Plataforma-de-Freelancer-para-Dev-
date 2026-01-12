import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Upload, ArrowLeft } from "lucide-react";
import type { AccountType } from "../../types/accountType";
import type { RegisterFormData } from "../../pages/auth/RegisterPage";


interface RegisterProps {
  accountType: AccountType
  onBackToTypeSelection: () => void;
  onRegisterSuccess: (data: RegisterFormData) => void;
  loading: boolean;
}

export function Register({
  accountType,
  onBackToTypeSelection,
  onRegisterSuccess,
  loading,
}: RegisterProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    senha: "",
    confirmPassword: "",
    telefone: "",
    foto: null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handlePhotoChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, foto: file }));
  }

  function formatPhone(value: string) {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }

    return value;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (formData.senha !== formData.confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    console.log("Cadastro:", { ...formData, accountType });
    onRegisterSuccess(formData);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <button
          onClick={onBackToTypeSelection}
          className="flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </button>

        <div className="bg-black/50 border border-purple-800/50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-white mb-2">
              {accountType === "DESENVOLVEDOR"
                ? "Cadastro de Desenvolvedor"
                : "Cadastro de Contratante"}
            </h1>
            <p className="text-gray-400">
              Preencha seus dados para criar sua conta
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Foto */}
            <div className="flex flex-col items-center">
              <Label htmlFor="photo" className="text-white mb-3">
                Foto de Perfil (Opcional)
              </Label>

              <div className="relative">
                <Avatar className="w-32 h-32 border-2 border-purple-600">
                  <AvatarImage src={previewUrl ?? undefined} />
                  <AvatarFallback className="bg-purple-900/30">
                    <Upload className="w-8 h-8 text-purple-400" />
                  </AvatarFallback>
                </Avatar>

                <input
                  type="file"
                  id="fotoUrl"
                  name="fotoUrl"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="name" className="text-white mb-2 block">
                Nome Completo <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Digite seu nome completo"
                className="border-purple-800/50  focus:border-purple-600"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-white mb-2 block">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="seu.email@exemplo.com"
                className="border-purple-800/50 focus:border-purple-600"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-white mb-2 block">
                Telefone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    telefone: formatPhone(e.target.value),
                  }))
                }
                required
                maxLength={15}
                placeholder="(00) 00000-0000"
                className="border-purple-800/50 focus:border-purple-600"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white mb-2 block">
                Senha <span className="text-red-500">*</span>
              </Label>
              <Input
                id="senha"
                name="senha"
                type="password"
                value={formData.senha}
                onChange={handleChange}
                required
                minLength={8}
                placeholder="Mínimo 8 caracteres"
                className="border-purple-800/50 focus:border-purple-600"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-white mb-2 block">
                Confirmar Senha <span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={8}
                placeholder="Digite a senha novamente"
                className="border-purple-800/50 focus:border-purple-600"
              />
            </div>

            <Button
              disabled={loading}
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {loading ? "Criando Conta" : "Criar Conta"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
