import { Mail, Phone} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

import type { UserProfileData } from "../../types/user";
import type { Project } from "../../types/project";

interface UserProfileProps {
  user: UserProfileData;
  canEdit?: boolean;
  onEditProfile?: () => void;
  onProjectClick?: (project: Project) => void;
}

export function UserProfile({
  user,
  canEdit = false,
  onEditProfile,
  onProjectClick,
}: UserProfileProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-900/30 rounded-xl p-8 mb-8">
          <div className="flex gap-8 items-start">

            {/* Avatar */}
            <div className="flex flex-col items-center">
              <Avatar className="size-32 border-4 border-purple-600">
                <AvatarImage src={user.photo ?? undefined} />
                <AvatarFallback>
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              {canEdit && onEditProfile && (
                <button
                  onClick={onEditProfile}
                  className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition"
                >
                  Editar Perfil
                </button>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-white">{user.name}</h1>
              <p className="text-purple-400 mb-4">
                {user.role === "DESENVOLVEDOR" ? "Desenvolvedor" : "Contratante"}
              </p>

              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>{user.email}</span>
              </div>
              {/* Telefone */}
              {user.phone && (
                <div className="flex items-center gap-2 text-gray-400 mt-2">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span>{user.phone}</span>
                </div>
              )}

              {/* Descrição */}
              {user.description && (
              <div className="mt-6 p-4 bg-black/30 rounded-lg border border-purple-900/20">
                <p className="text-gray-300 leading-relaxed">
                  {user.description}
                </p>
              </div>
            )}

            </div>

          </div>
        </div>


        {/* Skills */}
        {user.skills?.length ? (
          <div className="rounded-xl p-8 bg-gray-900 border border-purple-900/30 mb-8">
            <h2 className="text-white mb-4">Habilidades</h2>
            <div className="flex flex-wrap gap-3">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-purple-900/30 rounded-full text-purple-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {/* Portfolio */}
        <div className="rounded-xl p-8 bg-gray-900 border border-purple-900/30">
          <h2 className="text-white mb-6">Projetos</h2>

          {user.portfolio?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.portfolio.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onProjectClick?.(project)}
                  className="cursor-pointer rounded-lg p-5 bg-black/40 border border-purple-900/30 hover:border-purple-600/50 transition"
                >
                  <h3 className="text-white mb-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 mb-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-sm bg-purple-900/20 rounded text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              Nenhum projeto cadastrado.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
