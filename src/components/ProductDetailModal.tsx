import React, { useState } from 'react';
import { X, Check, Sparkles, MessageCircle } from 'lucide-react';
import { Product, StoreSettings } from '../types/catalog';

interface ProductDetailModalProps {
  product: Product | null;
  settings: StoreSettings;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  settings,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [added, setAdded] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setAdded(false);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 700);
  };

  const handleDirectWhatsApp = () => {
    const rawPhone = settings.whatsappNumber || '584245104245';
    const cleanPhone = rawPhone.replace(/\D/g, '');
    const message = `¡Hola Ballón Dulces Khloe! Deseo consultar disponibilidad y cotización para el arreglo: *${product.name}* (${product.category}). ✨`;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Card with Brand Pastel Borders & Clean Layout */}
      <div className="relative w-full max-w-xl bg-white border-2 border-pink-400 ring-2 ring-sky-300 rounded-3xl shadow-[0_15px_40px_rgba(244,114,182,0.25)] overflow-hidden z-10 animate-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white hover:bg-pink-50 text-pink-700 flex items-center justify-center border border-pink-300 shadow-sm transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: Product Image */}
        <div className="relative md:w-1/2 aspect-square md:aspect-auto min-h-[220px] md:min-h-full bg-slate-50 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-pink-200">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full font-cursive-body text-xs font-bold tracking-wide uppercase bg-white/95 backdrop-blur-md border border-pink-400 text-pink-700 shadow-sm">
              {product.badge}
            </div>
          )}
        </div>

        {/* Right Side: Details & Actions (NO price, NO quantity selector) */}
        <div className="md:w-1/2 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto bg-white">
          <div>
            {/* Category */}
            <div className="flex items-center gap-1 font-cursive-body text-xs text-purple-600 font-bold tracking-wide mb-1">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>{product.category}</span>
            </div>

            {/* Title */}
            <h2 className="font-cursive-title text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-2">
              {product.name}
            </h2>

            {/* Concise Description */}
            <div className="mb-4">
              <h4 className="font-cursive-body text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Detalles del Arreglo
              </h4>
              <p className="font-cursive-body text-sm sm:text-base text-slate-700 font-semibold leading-relaxed">
                {product.description || 'Diseño exclusivo personalizado para festejos y celebraciones.'}
              </p>
            </div>
          </div>

          {/* Action Module: Add to Quote list or Direct WhatsApp */}
          <div className="pt-3 border-t border-dashed border-pink-200 space-y-2">
            <button
              onClick={handleAdd}
              className={`w-full py-2.5 px-4 rounded-2xl font-cursive-title text-base sm:text-lg font-bold flex items-center justify-center gap-2 shadow-md transition-all duration-200 active:scale-98 border ${
                added
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white border-pink-400'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>¡Agregado a la Lista! ✨</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Agregar a mi Cotización</span>
                </>
              )}
            </button>

            <button
              onClick={handleDirectWhatsApp}
              className="w-full py-2 px-3 rounded-2xl font-cursive-body text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Consultar este Arreglo por WhatsApp</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
