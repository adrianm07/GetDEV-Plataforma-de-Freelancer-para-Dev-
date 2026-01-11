import { UserCircle, Briefcase } from "lucide-react";
import type { AccountType } from "../../types/accountType";

interface AccountTypeSelectorProps {
  onSelectType: (type: AccountType) => void;
  onBackToLogin: () => void;
}

interface AccountCardProps {
  type: AccountType;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  onSelect: (type: AccountType) => void;
}

function AccountCard({
  type,
  title,
  description,
  icon,
  features,
  onSelect,
}: AccountCardProps) {
  return (
    <button
      onClick={() => onSelect(type)}
      className="group relative bg-black/50 border-2 border-purple-800/50 rounded-2xl p-8 hover:border-purple-600 transition-all duration-300 hover:bg-purple-950/30 cursor-pointer"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-purple-900/50 flex items-center justify-center group-hover:bg-purple-800/50 transition-colors">
          {icon}
        </div>

        <h2 className="text-white">{title}</h2>
        <p className="text-gray-400">{description}</p>

        <ul className="text-left text-gray-400 space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}

export function AccountTypeSelector({
  onSelectType,
  onBackToLogin,
}: AccountTypeSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-white mb-3">Escolha o tipo de conta</h1>
          <p className="text-gray-400">
            Selecione como você deseja usar a plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <AccountCard
            type="DESENVOLVEDOR"
            title="Desenvolvedor"
            description="Encontre oportunidades de trabalho e projetos freelancer na área de tecnologia"
            icon={<UserCircle className="w-12 h-12 text-purple-400" />}
            features={[
              "Busque contratos disponíveis",
              "Filtre por tecnologias",
              "Candidate-se a projetos",
            ]}
            onSelect={onSelectType}
          />

          <AccountCard
            type="CONTRATANTE"
            title="Contratante"
            description="Publique projetos e encontre desenvolvedores qualificados para suas necessidades"
            icon={<Briefcase className="w-12 h-12 text-purple-400" />}
            features={[
              "Publique contratos",
              "Receba propostas",
              "Gerencie projetos",
            ]}
            onSelect={onSelectType}
          />
        </div>

        <div className="text-center">
          <button
            onClick={onBackToLogin}
            className="text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
          >
            Voltar para o login
          </button>
        </div>
      </div>
    </div>
  );
}
