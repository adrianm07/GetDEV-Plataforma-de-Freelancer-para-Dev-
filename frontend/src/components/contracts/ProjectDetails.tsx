import {
  ArrowLeft,
  Calendar,
  Code,
} from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

import type { Project } from "../../types/project";
import type { PublicUser } from "../../types/user";

interface ProjectDetailsProps {
  project: Project;
  developer?: PublicUser;
  onBack: () => void;
}

export function ProjectDetails({
  project,
  developer,
  onBack,
}: ProjectDetailsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/10 to-black">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-900/30 rounded-xl p-6 mb-6">

          <h1 className="text-white mb-4">{project.title}</h1>

          {/* Developer */}
          {developer && (
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="size-14 border-2 border-purple-600">
                <AvatarImage src={developer.photo ?? undefined} />
                <AvatarFallback>
                  {developer.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-gray-400 text-sm">Desenvolvedor</p>
                <p className="text-white">{developer.name}</p>
                <p className="text-gray-400 text-sm">{developer.email}</p>
              </div>
            </div>
          )}

          {/* Technologies */}
          <div className="mb-6">
            <h3 className="flex items-center gap-2 mb-3">
              <Code className="w-5 h-5 text-purple-400" />
              Tecnologias
            </h3>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-purple-900/20 border border-purple-900/30 text-purple-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <h3 className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              Data de conclusão
            </h3>
            <p className="text-gray-300">{project.completedDate}</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-900/30 rounded-xl p-6 mb-6">
          <h2 className="text-white mb-4">Descrição</h2>
          <p className="text-gray-300 whitespace-pre-line leading-relaxed">
            {project.description}
          </p>
        </div>

      </div>
    </div>
  );
}
