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
  settings,
  onOpenCart,
}) => {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-18 left-0 w-full z-40 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-2xl mx-auto pointer-events-auto">
        <button
          onClick={onOpenCart}
          className="w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-3xl bg-gradient-to-r from-red-600 via-emerald-600 to-red-600 hover:from-red-500 hover:to-emerald-500 text-white font-cursive-title text-base sm:text-lg font-bold shadow-[0_8px_25px_rgba(220,38,38,0.35),0_8px_30px_rgba(22,163,74,0.3)] flex items-center justify-between transition-all duration-300 active:scale-98 animate-in slide-in-from-bottom-4 border-2 border-red-600 ring-2 ring-emerald-600"
        >
          {/* Left: Icon & Title */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white text-red-700 border border-emerald-600 flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="tracking-wide">Ver Carrito Navideño 🎁</span>
              <span className="bg-white text-emerald-800 border-2 border-red-600 px-2 py-0.5 rounded-full font-cursive-body text-xs sm:text-sm font-extrabold">
                {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}
              </span>
            </div>
          </div>

          {/* Right: Total & Arrow */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex flex-col items-end leading-tight mr-1">
              <span className="font-cursive-body text-[10px] font-bold text-white/90">Total Estimado</span>
              <span className="font-cursive-title text-base sm:text-lg font-black text-white">
                {settings.currencySymbol}
                {totalAmount.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="w-7 h-7 rounded-full bg-white text-emerald-700 flex items-center justify-center border border-red-600">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
