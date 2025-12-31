import { LogOut } from "lucide-react";

interface LogoutConfirmationProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function LogoutConfirmation({
  open,
  onConfirm,
  onCancel,
}: LogoutConfirmationProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative mx-4 w-full max-w-md rounded-2xl border border-purple-900/50 bg-gradient-to-br from-gray-900 to-black p-8 shadow-2xl">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-600/50 bg-red-900/20">
            <LogOut className="h-8 w-8 text-red-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-3 text-center text-lg font-semibold text-white">
          Confirmar logout
        </h2>

        {/* Message */}
        <p className="mb-8 text-center text-sm text-gray-400">
          Tem certeza que deseja sair da sua conta?
        </p>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg bg-gray-800 px-6 py-3 text-sm text-white transition-colors hover:bg-gray-700"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 text-sm text-white transition-all hover:from-red-700 hover:to-red-800"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
