import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Category, Product } from '../types/catalog';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  products: Product[];
  isAdmin: boolean;
  isNochebuena?: boolean;
  onAddCategory: (categoryName: string) => void;
  onDeleteCategory: (categoryId: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  products,
  isAdmin,
  isNochebuena = false,
  onAddCategory,
  onDeleteCategory,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    onAddCategory(newCatName.trim());
    setNewCatName('');
    setIsAdding(false);
  };

  const getProductCount = (categoryId: string) => {
    if (categoryId === 'todos') return products.length;
    return products.filter((p) => p.category.toLowerCase() === categoryId.toLowerCase()).length;
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3">
      {/* Category horizontal scrolling bar */}
      <div className="flex items-center md:justify-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar py-1.5 scroll-smooth">
        {categories.map((cat, index) => {
          const isActive = activeCategory === cat.id;
          const count = getProductCount(cat.id);
          const isRemovable = isAdmin && cat.id !== 'todos';
          const isEven = index % 2 === 0;

          return (
            <div key={cat.id} className="relative flex-shrink-0 group">
              <button
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-cursive-body text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 select-none border-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-emerald-600 text-white border-red-500 ring-2 ring-emerald-400 shadow-[0_0_15px_rgba(220,38,38,0.45)] scale-102'
                    : isNochebuena
                    ? isEven
                      ? 'bg-slate-900/85 text-slate-100 hover:text-red-300 hover:bg-slate-800 border-red-500 ring-1 ring-emerald-500 shadow-sm'
                      : 'bg-slate-900/85 text-slate-100 hover:text-emerald-300 hover:bg-slate-800 border-emerald-500 ring-1 ring-red-500 shadow-sm'
                    : isEven
                    ? 'bg-white text-slate-800 hover:text-red-700 hover:bg-red-50/60 border-red-500 ring-1 ring-emerald-500 shadow-sm'
                    : 'bg-white text-slate-800 hover:text-emerald-700 hover:bg-emerald-50/60 border-emerald-600 ring-1 ring-red-500 shadow-sm'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-full font-mono-nums ${
                    isActive
                      ? 'bg-white text-red-700 font-extrabold'
                      : isNochebuena
                      ? 'bg-slate-800 text-amber-300 font-bold border border-slate-700'
                      : isEven
                      ? 'bg-red-100 text-red-800 font-bold'
                      : 'bg-emerald-100 text-emerald-800 font-bold'
                  }`}
                >
                  {count}
                </span>
              </button>

              {/* Admin delete button for category */}
              {isRemovable && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`¿Eliminar la categoría "${cat.name}"? Los productos de esta categoría se conservarán.`)) {
                      onDeleteCategory(cat.id);
                    }
                  }}
                  title="Eliminar categoría"
                  className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 shadow-md border border-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}

        {/* Admin add category button */}
        {isAdmin && (
          <div className="flex-shrink-0">
            {isAdding ? (
              <form onSubmit={handleCreate} className="flex items-center gap-1.5 bg-white border-2 border-red-600 ring-1 ring-emerald-600 rounded-full px-3 py-1 shadow-md">
                <input
                  type="text"
                  placeholder="Nombre de categoría..."
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  autoFocus
                  className="bg-transparent text-xs text-slate-900 placeholder-slate-400 outline-none w-36 px-1 font-cursive-body font-bold"
                />
                <button
                  type="submit"
                  className="text-[11px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full hover:bg-emerald-700 font-cursive-body"
                >
                  Crear
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="text-slate-500 hover:text-red-600 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="whitespace-nowrap px-3.5 py-1.5 rounded-full font-cursive-body text-xs sm:text-sm font-bold bg-white text-emerald-700 border-2 border-emerald-600 ring-1 ring-red-500 hover:bg-emerald-50 transition-all flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5] text-red-600" />
                <span>+ Nueva Categoría</span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
