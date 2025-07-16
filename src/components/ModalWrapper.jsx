import { X } from "lucide-react";

export default function ModalWrapper({ title, imagePath, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <img
          src={imagePath}
          alt="Illustration"
          className="w-20 h-20 mx-auto mb-4"
        />
        <h2 className="text-center text-xl font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}
