import { Filter, X } from "lucide-react";
import { useState } from "react";

const TECHNOLOGIES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "React",
  "Node.js",
  "Angular",
  "Vue.js",
  "PHP",
  "Ruby",
  "Go",
  "C#",
  "Swift",
  "Kotlin",
  "Rust",
];

interface FilterButtonProps {
  onFilterChange: (filters: string[]) => void;
}

export function FilterButton({ onFilterChange }: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const closePanel = () => setIsOpen(false);

  const toggleFilter = (tech: string) => {
    setSelectedFilters((prev) => {
      const updated = prev.includes(tech)
        ? prev.filter((item) => item !== tech)
        : [...prev, tech];

      onFilterChange(updated);
      return updated;
    });
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    onFilterChange([]);
  };

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={toggleOpen}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <Filter className="w-4 h-4" />
        Filtrar
        {selectedFilters.length > 0 && (
          <span className="px-2 py-0.5 bg-white/20 rounded-full text-sm">
            {selectedFilters.length}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={closePanel}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            className="absolute right-0 mt-2 w-80 bg-gray-900 border border-purple-900/30 rounded-xl shadow-2xl z-50 overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="p-4 border-b border-purple-900/30 flex items-center justify-between">
              <h3 className="text-white">Filtrar por Tecnologia</h3>
              <button
                onClick={closePanel}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Fechar filtros"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {TECHNOLOGIES.map((tech) => {
                  const isActive = selectedFilters.includes(tech);

                  return (
                    <button
                      key={tech}
                      onClick={() => toggleFilter(tech)}
                      className={`px-3 py-2 rounded-lg border transition-all ${
                        isActive
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

            {/* Footer */}
            {selectedFilters.length > 0 && (
              <div className="p-4 border-t border-purple-900/30">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
