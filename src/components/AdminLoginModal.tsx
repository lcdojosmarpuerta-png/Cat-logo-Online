import React, { useState } from 'react';
import { X, ArrowRight, Lock } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  storedPin: string;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  storedPin,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === storedPin || pin === '1234') {
      setError(false);
      setPin('');
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  const handleQuickUnlock = () => {
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" />

      <div className="relative w-full max-w-sm bg-white border-2 border-pink-400 rounded-3xl p-5 sm:p-6 shadow-2xl z-10 animate-in zoom-in-95 text-center">
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-300 flex items-center justify-center transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-300 flex items-center justify-center mx-auto mb-2.5 text-xl shadow-inner text-pink-600">
          <Lock className="w-6 h-6 stroke-[2.2]" />
        </div>

        <h3 className="font-cursive-title text-xl font-bold text-purple-900 mb-1">Acceso Modo Administrador</h3>
        <p className="font-cursive-body text-xs sm:text-sm text-slate-600 font-bold mb-4">
          Ingresa tu PIN para editar arreglos, banners y opciones de Ballón Dulces Khloe.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="password"
              autoFocus
              maxLength={8}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="••••"
              className={`w-full bg-white border-2 rounded-2xl py-2.5 px-4 text-center text-lg font-mono-nums tracking-widest text-slate-900 placeholder-slate-400 outline-none transition-colors ${
                error ? 'border-red-500 bg-red-50/40' : 'border-pink-300 focus:border-purple-500'
              }`}
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 font-bold">PIN incorrecto. Intenta con 1234.</p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 border border-white"
          >
            <span>Desbloquear Modo Admin</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-dashed border-pink-200">
          <p className="text-xs text-slate-500 font-bold mb-1.5">
            PIN predeterminado: <strong className="text-pink-600">1234</strong>
          </p>
          <button
            onClick={handleQuickUnlock}
            className="text-xs text-purple-600 hover:text-pink-600 font-bold underline"
          >
            Entrar directamente con un clic
          </button>
        </div>
      </div>
    </div>
  );
};
