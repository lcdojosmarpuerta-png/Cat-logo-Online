import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { Product, StoreSettings } from '../types/catalog';

interface ProductDetailModalProps {
  product: Product | null;
  settings: StoreSettings;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  settings,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setAdded(false);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Card with White Background & Red/Green Christmas Borders */}
      <div className="relative w-full max-w-2xl bg-white border-3 border-red-600 ring-4 ring-emerald-600 rounded-3xl shadow-[0_15px_40px_rgba(220,38,38,0.28),0_15px_45px_rgba(22,163,74,0.28)] overflow-hidden z-10 animate-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[92vh]">
        
        {/* Decorative corner ribbons */}
        <span className="absolute top-2 left-3 z-20 text-lg pointer-events-none">🎄</span>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white hover:bg-red-50 text-red-700 hover:text-red-800 flex items-center justify-center border-2 border-red-600 ring-1 ring-emerald-600 shadow-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Image */}
        <div className="relative md:w-1/2 aspect-square md:aspect-auto min-h-[220px] md:min-h-full bg-slate-50 flex items-center justify-center overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-emerald-600">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full font-cursive-body text-sm font-bold tracking-wide uppercase bg-white/95 backdrop-blur-md border-2 border-red-600 ring-1 ring-emerald-600 text-red-700 shadow-md">
              {product.badge}
            </div>
          )}
        </div>

        {/* Right Side: Product Details & Purchase Module with Cursive Fonts */}
        <div className="md:w-1/2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto bg-white">
          <div>
            {/* Category */}
            <div className="flex items-center gap-1.5 font-cursive-body text-base text-emerald-700 font-bold tracking-wide mb-1">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span>{product.category}</span>
            </div>

            {/* Title */}
            <h2 className="font-cursive-title text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-3">
              {product.name}
            </h2>

            {/* Cost Details */}
            <div className="mb-4 p-3 rounded-2xl bg-red-50/50 border-2 border-red-500 ring-1 ring-emerald-500 flex items-baseline justify-between shadow-inner">
              <span className="font-cursive-body text-base text-slate-800 font-bold">Costo del Arreglo:</span>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-bold text-emerald-700">{settings.currencySymbol}</span>
                <span className="font-cursive-title text-3xl font-black text-red-700">
                  {product.price.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                </span>
                {product.unit && (
                  <span className="font-cursive-body text-sm text-slate-600 font-bold ml-0.5">/{product.unit}</span>
                )}
              </div>
            </div>

            {/* Full Description */}
            <div className="mb-5">
              <h4 className="font-cursive-body text-sm font-bold text-emerald-800 uppercase tracking-wider mb-1">
                Detalles &amp; Especificaciones
              </h4>
              <p className="font-cursive-body text-base sm:text-lg text-slate-700 font-semibold leading-relaxed max-h-36 overflow-y-auto pr-1">
                {product.description}
              </p>
            </div>
          </div>

          {/* Action Module */}
          <div className="pt-3 border-t-2 border-dashed border-emerald-300">
            {/* Quantity Selector & Subtotal */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-cursive-body text-base font-bold text-slate-800">Cantidad:</span>
              <div className="flex items-center gap-2 bg-white border-2 border-red-600 ring-1 ring-emerald-600 rounded-2xl p-1">
                <button
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed text-red-700 flex items-center justify-center transition-colors border border-red-300"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-9 text-center font-cursive-title text-xl font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="w-8 h-8 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition-colors border border-emerald-300"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Total preview if > 1 */}
            {quantity > 1 && (
              <div className="flex items-center justify-between font-cursive-body text-base text-slate-700 font-bold mb-3 px-1">
                <span>Subtotal estimado:</span>
                <span className="font-cursive-title text-xl font-bold text-red-700">
                  {settings.currencySymbol}
                  {totalPrice.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                </span>
              </div>
            )}

            {/* Primary Action Button: "Agregar al Carrito de Compras" */}
            <button
              onClick={handleAdd}
              className={`w-full py-3.5 px-4 rounded-2xl font-cursive-title text-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all duration-200 active:scale-98 border-2 ${
                added
                  ? 'bg-emerald-600 text-white border-red-600 ring-2 ring-emerald-400'
                  : 'bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white border-red-600 ring-2 ring-emerald-600'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>¡Agregado con Éxito! 🎁</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Agregar al Carrito de Compras 🛍️</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
