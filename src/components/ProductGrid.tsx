import React from 'react';
import { Plus } from 'lucide-react';
import { Product, StoreSettings } from '../types/catalog';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  settings: StoreSettings;
  isAdmin: boolean;
  isDarkMode?: boolean;
  activeCategory: string;
  selectedProductIds?: string[];
  onOpenDetail: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onOpenAddModal: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  settings,
  isAdmin,
  isDarkMode = false,
  activeCategory,
  selectedProductIds = [],
  onOpenDetail,
  onAddToCart,
  onEditProduct,
  onDeleteProduct,
  onOpenAddModal,
}) => {
  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'todos') return true;
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
      {/* Header bar of catalog section with brand title and stats */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div>
          <h2
            className={`font-cursive-title text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-wide flex items-center gap-2 ${
              isDarkMode
                ? 'text-pink-300 drop-shadow-[0_0_12px_rgba(244,114,182,0.45)]'
                : 'text-purple-900'
            }`}
          >
            <span>🎈 Arreglos &amp; Festejos</span>
            <span
              className={`font-cursive-body text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-full border shadow-sm ${
                isDarkMode
                  ? 'bg-slate-900 text-pink-300 border-pink-500/70'
                  : 'bg-white text-purple-700 border-pink-300'
              }`}
            >
              {filteredProducts.length} {filteredProducts.length === 1 ? 'opción' : 'opciones'}
            </span>
          </h2>
          <p
            className={`font-cursive-body text-xs sm:text-sm font-bold hidden sm:block ${
              isDarkMode ? 'text-sky-200' : 'text-slate-600'
            }`}
          >
            Toca cualquier arreglo para ver detalles y solicitar tu cotización por WhatsApp ✨
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={onOpenAddModal}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-cursive-body text-xs sm:text-sm font-bold shadow-md flex items-center gap-1.5 active:scale-95 transition-all border border-pink-400"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Agregar Arreglo</span>
          </button>
        )}
      </div>

      {/* Strict Responsive Grid:
          Mobile: grid-cols-2
          Tablet: md:grid-cols-3 lg:grid-cols-4
          PC / Large: xl:grid-cols-5
      */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              settings={settings}
              isAdmin={isAdmin}
              isDarkMode={isDarkMode}
              isSelected={selectedProductIds.includes(product.id)}
              onOpenDetail={onOpenDetail}
              onAddToCart={onAddToCart}
              onEditProduct={onEditProduct}
              onDeleteProduct={onDeleteProduct}
            />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div
          className={`rounded-3xl border-2 p-6 sm:p-10 text-center flex flex-col items-center justify-center shadow-lg ${
            isDarkMode
              ? 'border-pink-500/70 bg-slate-900/90 text-white'
              : 'border-pink-300 bg-white'
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-pink-50 border border-pink-300 flex items-center justify-center text-2xl mb-2.5">
            🎈
          </div>
          <h3
            className={`font-cursive-title text-xl font-bold mb-1 ${
              isDarkMode ? 'text-pink-300' : 'text-purple-800'
            }`}
          >
            No hay arreglos en esta categoría
          </h3>
          <p
            className={`font-cursive-body text-sm font-bold max-w-sm mb-3.5 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Explora las demás categorías de Ballón Dulces Khloe para armar tu cotización.
          </p>
          {isAdmin && (
            <button
              onClick={onOpenAddModal}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-cursive-body text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 shadow-md border border-white"
            >
              <Plus className="w-3.5 h-3.5" />
              Crear Arreglo en esta Categoría
            </button>
          )}
        </div>
      )}

      {/* Admin Bottom prominent button */}
      {isAdmin && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={onOpenAddModal}
            className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-sky-600 hover:from-pink-500 hover:to-sky-500 text-white font-cursive-title text-base sm:text-lg font-bold shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 border border-white"
          >
            <Plus className="w-5 h-5 stroke-[3]" />
            <span>+ Agregar Nuevo Arreglo al Catálogo Khloe</span>
          </button>
        </div>
      )}
    </section>
  );
};
