import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

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

      <div className="relative w-full max-w-sm bg-white border-3 border-red-600 ring-4 ring-emerald-600 rounded-3xl p-6 sm:p-7 shadow-2xl z-10 animate-in zoom-in-95 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-700 border-2 border-red-600 ring-1 ring-emerald-600 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-red-50 border-2 border-red-600 ring-2 ring-emerald-600 flex items-center justify-center mx-auto mb-3 text-2xl shadow-inner">
          🎅
        </div>

        <h3 className="font-cursive-title text-2xl font-bold text-red-700 mb-1">Acceso Modo Administrador</h3>
        <p className="font-cursive-body text-base text-slate-700 font-bold mb-5">
          Ingresa tu PIN para gestionar decoraciones, banners y categorías de Khloe.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              className={`w-full bg-white border-2 rounded-2xl py-3 px-4 text-center text-xl font-mono-nums tracking-widest text-slate-900 placeholder-slate-400 outline-none transition-colors ${
                error ? 'border-red-600 bg-red-50/40' : 'border-red-600 ring-1 ring-emerald-600 focus:border-emerald-600'
              }`}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 font-bold">PIN incorrecto. Intenta con 1234.</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 border-2 border-red-600 ring-1 ring-emerald-600"
          >
            <span>Desbloquear Modo Admin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 pt-4 border-t-2 border-dashed border-emerald-300">
          <p className="text-sm text-slate-600 font-bold mb-2">
            PIN predeterminado de demostración: <strong className="text-red-700">1234</strong>
          </p>
          <button
            onClick={handleQuickUnlock}
            className="text-base text-emerald-700 hover:text-red-700 font-bold underline decoration-red-500/60"
          >
            Entrar directamente con un clic
          </button>
        </div>
      </div>
    </div>
  );
};
