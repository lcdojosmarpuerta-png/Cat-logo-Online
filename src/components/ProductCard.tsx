import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Check, Sparkles } from 'lucide-react';
import { Product, StoreSettings } from '../types/catalog';

interface ProductCardProps {
  product: Product;
  settings: StoreSettings;
  isAdmin: boolean;
  onOpenDetail: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  settings,
  isAdmin,
  onOpenDetail,
  onAddToCart,
  onEditProduct,
  onDeleteProduct,
}) => {
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group relative flex flex-col justify-between bg-white/90 backdrop-blur-sm hover:bg-white rounded-3xl border-2 border-red-600 ring-2 ring-emerald-600 hover:border-emerald-600 hover:ring-red-600 shadow-[0_4px_15px_rgba(220,38,38,0.12)] hover:shadow-[0_10px_25px_rgba(220,38,38,0.25),0_10px_30px_rgba(22,163,74,0.25)] transition-all duration-300 cursor-pointer overflow-hidden p-2.5 sm:p-3.5"
    >

      {/* Mini Christmas bow decoration on the top card border */}
      <div className="absolute top-1 right-2 z-10 pointer-events-none select-none text-xs sm:text-sm drop-shadow-sm">
        🎀
      </div>

      {/* Top Image Container */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 border-2 border-emerald-500/70 mb-2 sm:mb-2.5">
        {!imageError && product.image ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-red-50 to-emerald-50 text-center">
            <Sparkles className="w-7 h-7 text-red-600 mb-1" />
            <span className="font-cursive-body text-sm font-bold text-slate-800 line-clamp-1">{product.name}</span>
          </div>
        )}

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full font-cursive-body text-xs sm:text-sm font-bold tracking-wide uppercase bg-white/95 backdrop-blur-md border-2 border-red-600 ring-1 ring-emerald-600 text-red-700 shadow-sm">
            {product.badge}
          </div>
        )}

        {/* Hover preview eye button */}
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3 py-1.5 rounded-full bg-white text-red-700 font-cursive-body text-sm font-bold flex items-center gap-1.5 border-2 border-red-600 ring-1 ring-emerald-600 shadow-lg">
            <Eye className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ver Detalle ✨</span>
          </span>
        </div>

        {/* Admin Quick Action Controls */}
        {isAdmin && (
          <div className="absolute top-2 right-2 flex items-center gap-1 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditProduct(product);
              }}
              title="Editar producto"
              className="p-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-colors border border-white"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`¿Estás seguro de eliminar "${product.name}"?`)) {
                  onDeleteProduct(product.id);
                }
              }}
              title="Eliminar producto"
              className="p-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-md transition-colors border border-white"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Card Info Body */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {/* Subtle Category Kicker */}
          <span className="font-cursive-body text-xs sm:text-sm font-bold text-emerald-700 block mb-0.5">
            {product.category}
          </span>

          {/* Product Name in cursive title */}
          <h3 className="font-cursive-title text-base sm:text-xl font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-red-700 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Price & Action Row */}
        <div className="mt-2 pt-2 border-t-2 border-dashed border-red-200 flex items-center justify-between gap-1">
          <div className="flex flex-col">
            <span className="font-cursive-body text-xs text-slate-600 font-bold leading-none">Costo</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xs sm:text-sm font-bold text-emerald-700">{settings.currencySymbol}</span>
              <span className="font-cursive-title text-xl sm:text-2xl font-black text-red-700">
                {product.price.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
              </span>
              {product.unit && (
                <span className="font-cursive-body text-xs text-slate-600 font-bold ml-0.5">/{product.unit}</span>
              )}
            </div>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            title="Agregar al Carrito"
            className={`p-2 sm:px-3 sm:py-2 rounded-2xl font-cursive-body text-sm sm:text-base font-bold transition-all duration-200 flex items-center justify-center gap-1 shrink-0 border-2 ${
              justAdded
                ? 'bg-emerald-600 text-white border-red-600 scale-105 shadow-md'
                : 'bg-red-600 hover:bg-emerald-600 text-white border-emerald-600 hover:border-red-600 active:scale-95 shadow-sm'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>¡Listo!</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Añadir</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
