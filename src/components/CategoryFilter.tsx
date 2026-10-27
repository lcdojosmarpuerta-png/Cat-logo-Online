import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Category, Product } from '../types/catalog';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  products: Product[];
  isAdmin: boolean;
  onAddCategory: (categoryName: string) => void;
  onDeleteCategory: (categoryId: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  products,
  isAdmin,
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
                className={`whitespace-nowrap px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-cursive-body text-base sm:text-lg font-bold transition-all duration-200 flex items-center gap-2 select-none border-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-emerald-600 text-white border-red-600 ring-2 ring-emerald-600 shadow-[0_4px_15px_rgba(220,38,38,0.3)] scale-102'
                    : isEven
                    ? 'bg-white text-slate-800 hover:text-red-700 hover:bg-red-50/60 border-red-500 ring-1 ring-emerald-500 shadow-sm'
                    : 'bg-white text-slate-800 hover:text-emerald-700 hover:bg-emerald-50/60 border-emerald-600 ring-1 ring-red-500 shadow-sm'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-mono-nums ${
                    isActive
                      ? 'bg-white text-red-700 font-extrabold'
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
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 shadow-md border border-white"
                >
                  <X className="w-3.5 h-3.5" />
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
                  className="bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none w-40 px-1 font-cursive-body font-bold"
                />
                <button
                  type="submit"
                  className="text-xs bg-emerald-600 text-white font-bold px-2.5 py-0.5 rounded-full hover:bg-emerald-700 font-cursive-body"
                >
                  Crear
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="text-slate-500 hover:text-red-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="whitespace-nowrap px-4 py-2 rounded-full font-cursive-body text-base font-bold bg-white text-emerald-700 border-2 border-emerald-600 ring-1 ring-red-500 hover:bg-emerald-50 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4 stroke-[2.5] text-red-600" />
                <span>+ Nueva Categoría</span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
