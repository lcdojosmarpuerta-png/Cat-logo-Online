import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, StoreSettings } from '../types/catalog';

interface FixedCartBarProps {
  cart: CartItem[];
  settings: StoreSettings;
  onOpenCart: () => void;
}

export const FixedCartBar: React.FC<FixedCartBarProps> = ({
  cart,
  onOpenCart,
}) => {
  const totalItems = cart.length;

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-14 sm:bottom-16 left-0 w-full z-40 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-xl mx-auto pointer-events-auto">
        <button
          onClick={onOpenCart}
          className="w-full py-2.5 sm:py-3 px-4 sm:px-5 rounded-3xl bg-gradient-to-r from-pink-600 via-purple-600 to-sky-600 hover:from-pink-500 hover:to-sky-500 text-white font-cursive-title text-base sm:text-lg font-bold shadow-[0_8px_25px_rgba(244,114,182,0.35)] flex items-center justify-between transition-all duration-300 active:scale-98 animate-in slide-in-from-bottom-4 border-2 border-white/60"
        >
          {/* Left: Icon & Title */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white text-pink-600 flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="tracking-wide">Ver Lista de Cotización</span>
              <span className="bg-white text-purple-700 px-2 py-0.5 rounded-full font-cursive-body text-xs sm:text-sm font-extrabold shadow-sm">
                {totalItems} {totalItems === 1 ? 'arreglo' : 'arreglos'}
              </span>
            </div>
          </div>

          {/* Right: Action Prompt & Arrow */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline font-cursive-body text-xs font-bold text-white/90">
              Solicitar por WhatsApp
            </span>
            <div className="w-7 h-7 rounded-full bg-white text-purple-700 flex items-center justify-center shadow-sm">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
