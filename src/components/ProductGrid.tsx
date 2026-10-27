import React from 'react';
import { Plus } from 'lucide-react';
import { Product, StoreSettings } from '../types/catalog';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  settings: StoreSettings;
  isAdmin: boolean;
  isNochebuena?: boolean;
  activeCategory: string;
  onOpenDetail: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onOpenAddModal: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  settings,
  isAdmin,
  isNochebuena = false,
  activeCategory,
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
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Header bar of catalog section with festive title and stats */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2
            className={`font-cursive-title text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wide flex items-center gap-2 ${
              isNochebuena
                ? 'text-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]'
                : 'text-red-700'
            }`}
          >
            <span>🎁 Decoraciones &amp; Festejos Disponibles</span>
            <span
              className={`font-cursive-body text-base sm:text-lg font-bold px-3 py-0.5 rounded-full border-2 shadow-sm ${
                isNochebuena
                  ? 'bg-slate-900 text-amber-300 border-red-500 ring-1 ring-emerald-400'
                  : 'bg-white text-emerald-700 border-red-600 ring-1 ring-emerald-600'
              }`}
            >
              {filteredProducts.length} {filteredProducts.length === 1 ? 'opción' : 'opciones'}
            </span>
          </h2>
          <p
            className={`font-cursive-body text-base sm:text-lg font-bold hidden sm:block ${
              isNochebuena ? 'text-emerald-300' : 'text-emerald-800'
            }`}
          >
            Toca cualquier producto o servicio para ver especificaciones y cotizar por WhatsApp ✨
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white font-cursive-body text-base sm:text-lg font-bold shadow-md flex items-center gap-1.5 active:scale-95 transition-all border-2 border-red-600 ring-2 ring-emerald-600"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Agregar Producto/Servicio</span>
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
              isNochebuena={isNochebuena}
              onOpenDetail={onOpenDetail}
              onAddToCart={onAddToCart}
              onEditProduct={onEditProduct}
              onDeleteProduct={onDeleteProduct}
            />
          ))}
        </div>
      ) : (
        /* Empty state with festive touch */
        <div
          className={`rounded-3xl border-2 p-8 sm:p-12 text-center flex flex-col items-center justify-center shadow-lg ${
            isNochebuena
              ? 'border-red-500 ring-2 ring-emerald-500 bg-slate-900/90 text-white'
              : 'border-red-600 ring-2 ring-emerald-600 bg-white'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-600 ring-2 ring-emerald-600 flex items-center justify-center text-3xl mb-3">
            🎄
          </div>
          <h3
            className={`font-cursive-title text-2xl font-bold mb-1 ${
              isNochebuena ? 'text-amber-300' : 'text-red-700'
            }`}
          >
            No hay opciones en esta categoría navideña
          </h3>
          <p
            className={`font-cursive-body text-base font-bold max-w-sm mb-4 ${
              isNochebuena ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            Explora las demás categorías de Ballón Dulces Khloe o agrega un nuevo arreglo.
          </p>
          {isAdmin && (
            <button
              onClick={onOpenAddModal}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white font-cursive-body text-base font-bold inline-flex items-center gap-2 shadow-lg border-2 border-white"
            >
              <Plus className="w-4 h-4" />
              Crear Producto en esta Categoría
            </button>
          )}
        </div>
      )}

      {/* Admin Bottom prominent button */}
      {isAdmin && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={onOpenAddModal}
            className="w-full sm:w-auto px-7 py-3.5 rounded-3xl bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white font-cursive-title text-xl sm:text-2xl font-bold shadow-[0_8px_25px_rgba(220,38,38,0.3)] flex items-center justify-center gap-2.5 transition-all active:scale-98 border-2 border-red-600 ring-2 ring-emerald-600"
          >
            <Plus className="w-6 h-6 stroke-[3]" />
            <span>+ Agregar Nuevo Producto o Servicio al Catálogo Khloe</span>
          </button>
        </div>
      )}
    </section>
  );
};
