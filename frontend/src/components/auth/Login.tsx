"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginProps {
  onSubmit: (data: LoginFormData) => void;
  onCreateAccount: () => void;
}

export function Login({ onSubmit, onCreateAccount }: LoginProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-900/50 mb-4">
            <LogIn className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-white mb-2">Bem-vindo de volta</h1>
          <p className="text-gray-400">
            Entre com sua conta para continuar
          </p>
        </div>

        {/* Form */}
        <div className="bg-black/50 border border-purple-800/50 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-white mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="seu.email@exemplo.com"
                className="bg-black/50 border-purple-800/50 text-white focus:border-purple-600"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white mb-2 block">
                Senha
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Digite sua senha"
                className="bg-black/50 border-purple-800/50 text-white focus:border-purple-600 mb-10"
              />
            </div>

            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Não tem uma conta?{" "}
              <button
                onClick={onCreateAccount}
                className="text-purple-400 hover:text-purple-300 transition"
              >
                Criar conta
              </button>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-gray-500">
          Plataforma de contratos freelancer para desenvolvedores
        </p>
      </div>
    </div>
  );
}
