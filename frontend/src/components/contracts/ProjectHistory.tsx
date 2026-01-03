import { Briefcase, ExternalLink } from "lucide-react";

interface CompletedProject {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  completedDate: string;
  link?: string;
}

interface ProjectHistoryProps {
  projects: CompletedProject[];
}

export function ProjectHistory({ projects }: ProjectHistoryProps) {
  if (!projects?.length) return null;

  return (
    <section className="bg-gradient-to-br from-gray-900 to-black border border-purple-900/30 rounded-xl p-6">
      <h3 className="text-white flex items-center gap-2 mb-6">
        <Briefcase className="w-5 h-5 text-purple-400" />
        Histórico de Projetos
      </h3>

      <div className="space-y-4">
        {projects.map((project) => (
          <article
            key={project.id}
            className="bg-black/50 border border-purple-900/30 rounded-lg p-4 transition-colors hover:border-purple-600/50"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <h4 className="text-white">{project.name}</h4>
              <span className="text-gray-400 text-sm whitespace-nowrap">
                {project.completedDate}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-3">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-sm bg-purple-900/20 border border-purple-900/30 rounded text-purple-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* External Link */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Ver Projeto
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
