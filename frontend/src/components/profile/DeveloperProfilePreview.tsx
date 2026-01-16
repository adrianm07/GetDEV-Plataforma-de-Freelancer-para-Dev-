import { Mail, Phone, Code, Briefcase, ExternalLink } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

import type { Developer } from "../../types/developer";
import type { SummaryPost } from "../../types/project";

interface DeveloperProfileProps {
  isOpen: boolean;
  onClose: () => void;
  developer: Developer;
  onProjectClick?: (project: SummaryPost) => void;
}

export function DeveloperProfile({
  isOpen,
  onClose,
  developer,
  onProjectClick,
}: DeveloperProfileProps) {
  const handleProjectClick = (project: SummaryPost) => {
    onClose();
    onProjectClick?.(project);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-gray-900 to-black border-purple-800/50 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Perfil do Desenvolvedor</DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <Avatar className="size-24 border-4 border-purple-600">
              <AvatarImage src={developer.photo ?? undefined} />
              <AvatarFallback>
                {developer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-white">{developer.name}</h2>
              <p className="text-purple-400">Desenvolvedor</p>
            </div>
          </div>

          {/* Contact */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-400" />
              Informações de Contato
            </h3>

            <a
              href={`mailto:${developer.email}`}
              className="flex items-center gap-3 p-3 rounded-lg bg-black/50 border border-purple-900/30 hover:border-purple-600/50 transition"
            >
              <Mail className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-gray-400">Email</p>
                <p>{developer.email}</p>
              </div>
            </a>

            <a
              href={`https://wa.me/${developer.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-black/50 border border-purple-900/30 hover:border-purple-600/50 transition"
            >
              <Phone className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-gray-400">Telefone / WhatsApp</p>
                <p>{developer.phone}</p>
              </div>
            </a>
          </section>

          {/* Skills */}
          <section>
            <h3 className="mb-3">Habilidades</h3>
            <div className="flex flex-wrap gap-2">
              {developer.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-2 rounded-full bg-purple-900/20 border border-purple-900/30 text-purple-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Projects */}
          {developer.projects?.length && (
            <section>
              <h3 className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-purple-400" />
                Histórico de Projetos
              </h3>

              <div className="space-y-4">
                {developer.projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 rounded-lg bg-black/50 border border-purple-900/30 hover:border-purple-600/50 transition"
                  >
                    <div className="flex justify-between mb-2">
                      <h4>{project.title}</h4>
                      <span className="text-sm text-gray-400">
                        {project.completedDate}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-sm rounded bg-purple-900/20 border border-purple-900/30 text-purple-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Acessar link
                        </a>
                      )}

                      {onProjectClick && (
                        <button
                          onClick={() => handleProjectClick(project)}
                          className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
                        >
                          Ver detalhes
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
