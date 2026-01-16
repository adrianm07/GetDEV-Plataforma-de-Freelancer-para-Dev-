import { X, Save } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export interface PostFormData {
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  deadline: string;
  minPrice: string | undefined;
  maxPrice: string | undefined;
  developerName: string;
}

interface PostFormPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: PostFormData) => void;
  initialData?: PostFormData;
  isEditing: boolean;
}

const AVAILABLE_TECHNOLOGIES = [
  "React", "Node.js", "TypeScript", "JavaScript", "Python", "Django",
  "Next.js", "Vue.js", "Angular", "MongoDB", "PostgreSQL", "MySQL",
  "Docker", "AWS", "Firebase", "GraphQL", "REST API", "TailwindCSS",
] as const;

const DEFAULT_FORM_DATA: PostFormData = {
  title: "",
  description: "",
  fullDescription: "",
  technologies: [],
  deadline: "",
  minPrice: "",
  maxPrice: "",
  developerName: "",
};

export function PostFormPanel({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing,
}: PostFormPanelProps) {
  const [formData, setFormData] = useState<PostFormData>(DEFAULT_FORM_DATA);

  /** Reset / preload form */
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
    setFormData({
      title: initialData.title ?? "",
      description: initialData.description ?? "",
      fullDescription: initialData.fullDescription ?? "",
      technologies: initialData.technologies ?? [],
      deadline: initialData.deadline ?? "",
      minPrice: initialData.minPrice ?? "",
      maxPrice: initialData.maxPrice ?? "",
      developerName: initialData.developerName ?? "",
    }); 
  }else {
      setFormData(DEFAULT_FORM_DATA);
    }
  }, [isOpen, initialData]);

  const handleChange = useCallback(
    (field: keyof PostFormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const toggleTechnology = useCallback((tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter((t) => t !== tech)
        : [...prev.technologies, tech],
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-2xl h-full overflow-y-auto bg-gradient-to-br from-gray-900 to-black border-l border-purple-900/50 shadow-2xl animate-slide-in-right">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 border-b border-purple-900/30 bg-gradient-to-r from-gray-900 to-black">
          <h2 className="text-white">
            {isEditing ? "Editar Post" : "Criar Novo Post"}
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800 transition"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          {/* Title */}
          <Input
            label="Título do Projeto"
            required = {!isEditing}
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Ex: Desenvolvimento de E-commerce"
          />

          {/* Short Description */}
          <Textarea
            label="Descrição Breve"
            required = {!isEditing}
            rows={3}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          {/* Full Description */}
          <Textarea
            label="Descrição Completa"
            required = {!isEditing}
            rows={6}
            value={formData.fullDescription}
            onChange={(e) => handleChange("fullDescription", e.target.value)}
          />

          {/* Technologies */}
          <div>
            <label className="block mb-2 text-gray-300">
              Tecnologias Necessárias <span className="text-red-400">*</span>
            </label>

            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TECHNOLOGIES.map((tech) => {
                const active = formData.technologies.includes(tech);

                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => toggleTechnology(tech)}
                    className={`px-4 py-2 rounded-lg border transition ${
                      active
                        ? "bg-purple-600 border-purple-600 text-white"
                        : "bg-gray-800/50 border-purple-900/30 text-gray-300 hover:border-purple-600/50"
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deadline */}
          <Input
            label="Prazo de Entrega"
            value={formData.deadline}
            onChange={(e) => handleChange("deadline", e.target.value)}
            placeholder="Ex: 2-3 meses"
          />

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Preço Mínimo (R$)"
              required = {!isEditing}
              type="number"
              value={formData.minPrice}
              onChange={(e) => handleChange("minPrice", e.target.value)}
            />
            <Input
              label="Preço Máximo (R$)"
              required = {!isEditing}
              type="number"
              value={formData.maxPrice}
              onChange={(e) => handleChange("maxPrice", e.target.value)}
            />
          </div>

          {/* Contact */}
          <div className="grid md:grid-cols-2 gap-4">
          </div>

          {/* Developer */}
          <Input
            label="Desenvolvedor"
            disabled
            value={formData.developerName}
            placeholder="Será preenchido automaticamente"
          />

          {/* Actions */}
          <div className="sticky bottom-0 flex gap-4 pt-6 pb-8 bg-gradient-to-t from-black via-black to-transparent">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition"
            >
              <Save className="w-5 h-5" />
              {isEditing ? "Salvar Alterações" : "Criar Post"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


interface BaseFieldProps {
  label: string;
  required?: boolean;
}

function Input({
  label,
  required,
  ...props
}: BaseFieldProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block mb-2 text-gray-300">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-purple-900/30 text-white focus:outline-none focus:border-purple-600 transition"
      />
    </div>
  );
}

function Textarea({
  label,
  required,
  ...props
}: BaseFieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="block mb-2 text-gray-300">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        {...props}
        className="w-full px-4 py-3 rounded-lg resize-none bg-gray-800/50 border border-purple-900/30 text-white focus:outline-none focus:border-purple-600 transition"
      />
    </div>
  );
}
