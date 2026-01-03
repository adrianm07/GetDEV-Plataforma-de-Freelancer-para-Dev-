import { X, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RateDeveloperProps {
  isOpen: boolean;
  projectTitle: string;
  developerName: string;
  onClose: () => void;
  onSubmit: (rating: number, review: string) => void;
}

export function RateDeveloper({
  isOpen,
  projectTitle,
  developerName,
  onClose,
  onSubmit,
}: RateDeveloperProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");

  if (!isOpen) return null;

  const resetState = () => {
    setRating(0);
    setHoveredRating(0);
    setReview("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Por favor, selecione uma nota para o desenvolvedor");
      return;
    }

    onSubmit(rating, review);
    resetState();
    onClose();
  };

  const displayRating = hoveredRating || rating;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rate-developer-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-gray-900 to-black border border-purple-900/50 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-yellow-900/20 border-2 border-yellow-600/50 rounded-full flex items-center justify-center">
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        {/* Title */}
        <h2
          id="rate-developer-title"
          className="text-white text-center mb-2"
        >
          Avaliar Desenvolvedor
        </h2>

        {/* Info */}
        <p className="text-gray-400 text-center mb-1">
          Projeto: <span className="text-white">{projectTitle}</span>
        </p>
        <p className="text-gray-400 text-center mb-6">
          Desenvolvedor: <span className="text-white">{developerName}</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-gray-300 mb-3 text-center">
              Nota <span className="text-red-400">*</span>
            </label>

            <div className="flex justify-center gap-1 mb-2">
              {Array.from({ length: 5 }, (_, i) => {
                const value = i + 1;
                const isFilled = displayRating >= value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoveredRating(value)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="cursor-pointer focus:outline-none transition-transform hover:scale-110"
                    aria-label={`${value} estrelas`}
                  >
                    <Star
                      className={`w-10 h-10 transition-colors ${
                        isFilled
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600 hover:text-gray-500"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <p className="text-center text-purple-300">
              {rating > 0
                ? `${rating} ${rating === 1 ? "estrela" : "estrelas"}`
                : "Selecione uma nota"}
            </p>
          </div>

          {/* Review */}
          <div>
            <label className="block text-gray-300 mb-2">
              Comentário (opcional)
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              placeholder="Conte como foi sua experiência trabalhando com este desenvolvedor..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-purple-900/30 rounded-lg text-white focus:outline-none focus:border-purple-600 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg transition-all"
            >
              Enviar Avaliação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
