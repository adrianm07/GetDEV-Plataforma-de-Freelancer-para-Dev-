import { Trash2 } from "lucide-react";

interface DeletePostConfirmationProps {
  isOpen: boolean;
  postTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeletePostConfirmation({
  isOpen,
  postTitle,
  onConfirm,
  onCancel,
}: DeletePostConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-post-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-gray-900 to-black border border-purple-900/50 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-900/20 border-2 border-red-600/50 rounded-full flex items-center justify-center">
            <Trash2 className="w-8 h-8 text-red-400" />
          </div>
        </div>

        {/* Title */}
        <h2
          id="delete-post-title"
          className="text-white text-center mb-3"
        >
          Excluir Post
        </h2>

        {/* Message */}
        <p className="text-gray-400 text-center mb-2">
          Tem certeza que deseja excluir este post?
        </p>

        <p className="text-white text-center mb-8 break-words">
          “{postTitle}”
        </p>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
