import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Check, Sparkles } from 'lucide-react';
import { Product, StoreSettings } from '../types/catalog';

interface ProductCardProps {
  product: Product;
  settings: StoreSettings;
  isAdmin: boolean;
  isDarkMode?: boolean;
  isSelected?: boolean;
  onOpenDetail: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isAdmin,
  isDarkMode = false,
  isSelected = false,
  onOpenDetail,
  onAddToCart,
  onEditProduct,
  onDeleteProduct,
}) => {
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className={`group relative flex flex-col justify-between rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden p-2.5 sm:p-3 ${
        isDarkMode
          ? 'bg-slate-900/85 backdrop-blur-md hover:bg-slate-900/95 border-pink-500/70 ring-1 ring-sky-400/40 shadow-[0_0_15px_rgba(244,114,182,0.2)] hover:shadow-[0_0_25px_rgba(244,114,182,0.4)]'
          : 'bg-white/95 backdrop-blur-sm hover:bg-white border-pink-300 hover:border-pink-400 ring-1 ring-sky-200 shadow-[0_4px_15px_rgba(244,114,182,0.12)] hover:shadow-[0_10px_25px_rgba(244,114,182,0.22)]'
      }`}
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-pink-200 mb-2">
        {!imageError && product.image ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-pink-50 to-sky-50 text-center">
            <Sparkles className="w-6 h-6 text-pink-500 mb-1" />
            <span className="font-cursive-body text-xs font-bold text-slate-800 line-clamp-1">{product.name}</span>
          </div>
        )}

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full font-cursive-body text-[10px] sm:text-xs font-bold tracking-wide uppercase bg-white/95 backdrop-blur-md border border-pink-400 text-pink-700 shadow-sm">
            {product.badge}
          </div>
        )}

        {/* Hover preview eye button */}
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-white text-purple-700 font-cursive-body text-xs font-bold flex items-center gap-1 border border-pink-400 shadow-md">
            <Eye className="w-3 h-3 text-pink-600" />
            <span>Ver Detalle</span>
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
              className="p-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white shadow-md transition-colors border border-white"
            >
              <Edit2 className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`¿Estás seguro de eliminar "${product.name}"?`)) {
                  onDeleteProduct(product.id);
                }
              }}
              title="Eliminar producto"
              className="p-1 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-md transition-colors border border-white"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Card Info Body (No price/cost displayed) */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {/* Subtle Category Kicker */}
          <span
            className={`font-cursive-body text-xs font-bold block mb-0.5 ${
              isDarkMode ? 'text-sky-300' : 'text-purple-600'
            }`}
          >
            {product.category}
          </span>

          {/* Product Name */}
          <h3
            className={`font-cursive-title text-sm sm:text-base font-bold line-clamp-2 leading-snug transition-colors ${
              isDarkMode
                ? 'text-white group-hover:text-pink-300'
                : 'text-slate-900 group-hover:text-pink-600'
            }`}
          >
            {product.name}
          </h3>
        </div>

        {/* Action Button Row: Cotizar / Agregar a lista */}
        <div className="mt-2 pt-1.5 border-t border-dashed border-pink-200/60 flex items-center justify-between gap-1">
          <span
            className={`font-cursive-body text-[11px] font-bold ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Consultar por WhatsApp
          </span>

          <button
            onClick={handleQuickAdd}
            title="Agregar a mi Cotización"
            className={`p-1.5 sm:px-2.5 sm:py-1 rounded-xl font-cursive-body text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1 shrink-0 border ${
              justAdded || isSelected
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white border-pink-400 active:scale-95 shadow-sm'
            }`}
          >
            {justAdded || isSelected ? (
              <>
                <Check className="w-3 h-3 stroke-[3]" />
                <span>Agregado</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3 stroke-[3]" />
                <span>Cotizar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
