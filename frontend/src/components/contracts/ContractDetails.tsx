"use client";

import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Mail,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import type { Contract as ContractDetailsType } from "../../types/contract";

interface ContractDetailsProps {
  contract: ContractDetailsType;
  onBack: () => void;
  accountType?: "developer" | "contractor";
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function InfoCard({ icon, title, value }: InfoCardProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-black/50 border border-purple-900/20 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-purple-900/20 rounded-lg">
          {icon}
        </div>
        <h3 className="text-white">{title}</h3>
      </div>
      <p className="text-gray-300 ml-12">{value}</p>
    </div>
  );
}

export function ContractDetails({
  contract,
  onBack,
  accountType = "developer",
}: ContractDetailsProps) {

  const deadline = contract.deadline ?? "Não informado";
  const priceRange = contract.priceRange ?? "A combinar";
  const fullDescription =
    contract.fullDescription ?? contract.description;
  const email = contract.email ?? "contato@exemplo.com";
  const phone = contract.phone ?? "5511999999999";
const contractorPhoto =
  contract.contractorPhoto ?? undefined;

  function handleEmail() {
    window.location.href = `mailto:${email}?subject=Interesse no projeto: ${contract.title}`;
  }

  function handleWhatsApp() {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no projeto: ${contract.title}`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  }

  function handleApply() {
    toast.success(
      "Solicitação enviada com sucesso! O contratante entrará em contato.",
      { duration: 4000 }
    );
  }

  /* ---------- render ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/10 to-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-6"
        >
          <ArrowLeft className="size-5" />
          Voltar para contratos
        </button>

        {/* Card */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-900/30 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-purple-900/30">
            <div className="flex items-start gap-6 mb-6">
              <Avatar className="size-20 border-4 border-purple-600">
                <AvatarImage
                  src={contractorPhoto}
                  alt={contract.contractorName}
                />
                <AvatarFallback>
                  {contract.contractorName.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h1 className="text-white mb-2">
                  {contract.title}
                </h1>
                <p className="text-purple-400 mb-4">
                  Publicado por {contract.contractorName}
                </p>
                <p className="text-gray-300">
                  {contract.description}
                </p>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-white mb-3">
                Tecnologias Necessárias
              </h3>
              <div className="flex flex-wrap gap-2">
                {contract.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-purple-900/20 border border-purple-900/30 rounded-lg text-purple-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-8 border-b border-purple-900/30">
            <h2 className="text-white mb-4">
              Descrição Completa do Projeto
            </h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {fullDescription}
            </p>
          </div>

          {/* Info */}
          <div className="p-8 border-b border-purple-900/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard
                icon={<Calendar className="size-5 text-purple-400" />}
                title="Prazo de Entrega"
                value={deadline}
              />

              <InfoCard
                icon={<DollarSign className="size-5 text-purple-400" />}
                title="Faixa de Preço"
                value={priceRange}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="p-8">
            <h3 className="text-white mb-4">
              Interessado no Projeto?
            </h3>

            <div
              className={`grid gap-4 ${
                accountType === "contractor"
                  ? "md:grid-cols-2"
                  : "md:grid-cols-3"
              }`}
            >
              <Button
                variant="outline"
                onClick={handleEmail}
                className="gap-2"
              >
                <Mail className="size-5" />
                Enviar E-mail
              </Button>

              <Button
                className="gap-2 bg-green-600 hover:bg-green-700"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="size-5" />
                WhatsApp
              </Button>

              {accountType !== "contractor" && (
                <Button
                  className="gap-2 bg-purple-600 hover:bg-purple-700"
                  onClick={handleApply}
                >
                  <CheckCircle className="size-5" />
                  Assumir Vaga
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
