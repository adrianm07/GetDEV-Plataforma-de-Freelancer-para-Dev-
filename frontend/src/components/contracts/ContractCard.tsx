import type { ContractSummary } from "../../types/contract";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { User } from "lucide-react";

interface ContractCardProps {
  contract: ContractSummary;
  onSelect?: (id: number) => void;
}

export function ContractCard({ contract, onSelect }: ContractCardProps) {
  const {
    id,
    title,
    contractorName,
    contractorPhoto,
    description,
    technologies,
  } = contract;

  return (
    <div
      onClick={() => onSelect?.(id)}
      className="bg-gradient-to-br from-gray-900 to-black border border-purple-900/30 rounded-xl p-6 hover:border-purple-600/50 transition-all cursor-pointer group"
    >
      {/* Contractor Info */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="size-12 border-2 border-purple-600/50">
          <AvatarImage
            src={contractorPhoto ?? undefined}
            alt={contractorName}
            className="object-cover"
          />
          <AvatarFallback className="bg-purple-900/40">
            <User className="size-6 text-purple-300" />
          </AvatarFallback>
        </Avatar>

        <h3 className="text-white group-hover:text-purple-400 transition-colors">
          {contractorName}
        </h3>
      </div>

      {/* Title */}
      <h2 className="text-white mb-3 group-hover:text-purple-400 transition-colors">
        {title}
      </h2>

      {/* Description */}
      <p className="text-gray-300 mb-4 line-clamp-3">
        {description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-purple-900/20 border border-purple-900/30 rounded-full text-purple-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
