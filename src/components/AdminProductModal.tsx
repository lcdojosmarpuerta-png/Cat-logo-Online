import React, { useState, useEffect, useRef } from 'react';
import { X, UploadCloud, Image as ImageIcon, Save } from 'lucide-react';
import { Product, Category, StoreSettings } from '../types/catalog';
import { compressImageFile } from '../utils/storage';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit: Product | null;
  categories: Category[];
  settings: StoreSettings;
  onSave: (product: Product) => void;
}

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
  categories,
  settings,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [unit, setUnit] = useState('u.');
  const [badge, setBadge] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setCategory(productToEdit.category);
      setPrice(productToEdit.price);
      setUnit(productToEdit.unit || 'u.');
      setBadge(productToEdit.badge || '');
      setDescription(productToEdit.description);
      setImageUrl(productToEdit.image);
    } else {
      setName('');
      setCategory(categories[1]?.id || 'navidad');
      setPrice('');
      setUnit('u.');
      setBadge('');
      setDescription('');
      setImageUrl('');
    }
  }, [productToEdit, categories, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const compressedDataUrl = await compressImageFile(file, 900, 0.85);
      setImageUrl(compressedDataUrl);
    } catch (err) {
      console.error('Error al subir imagen:', err);
      alert('Error al procesar la imagen seleccionada.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Por favor ingresa el nombre del producto o servicio.');
      return;
    }
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice) || numPrice < 0) {
      alert('Por favor ingresa un costo válido.');
      return;
    }

    const finalImage = imageUrl || `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%"><rect width="600" height="600" fill="#fef2f2"/><text x="300" y="310" font-family="cursive" font-size="30" fill="#dc2626" text-anchor="middle" font-weight="bold">${name}</text></svg>`
    )}`;

    const savedProduct: Product = {
      id: productToEdit ? productToEdit.id : 'prod_' + Date.now(),
      name: name.trim(),
      category: category || 'navidad',
      price: numPrice,
      unit: unit.trim() || 'u.',
      badge: badge.trim() || undefined,
      description: description.trim() || 'Sin descripción detallada.',
      image: finalImage,
      inStock: true,
    };

    onSave(savedProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" />

      <div className="relative w-full max-w-xl bg-white border-3 border-red-600 ring-4 ring-emerald-600 rounded-3xl p-6 sm:p-7 shadow-2xl z-10 max-h-[92vh] overflow-y-auto animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-red-500">
          <div>
            <h3 className="font-cursive-title text-2xl font-bold text-red-700 flex items-center gap-2">
              <span>🎄</span>
              <span>{productToEdit ? 'Editar Decoración / Arreglo' : 'Agregar Nueva Decoración o Festejo'}</span>
            </h3>
            <p className="font-cursive-body text-base text-emerald-800 font-bold">
              Personaliza los detalles para publicarlo en el catálogo de Ballón Dulces Khloe
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-700 border-2 border-red-600 ring-1 ring-emerald-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Image Upload / Preview Area */}
          <div>
            <label className="block font-cursive-body text-base font-bold text-slate-800 mb-2">
              Imagen del Producto / Servicio
            </label>

            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-2xl bg-slate-50 border-2 border-emerald-600 ring-1 ring-red-500 overflow-hidden flex items-center justify-center shrink-0 relative group">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Previsualización"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-400" />
                )}
              </div>

              <div className="flex-1 space-y-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 border border-red-500"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>{isUploading ? 'Procesando...' : 'Subir desde tu dispositivo (Galería/PC)'}</span>
                </button>

                <input
                  type="text"
                  placeholder="O pega una URL de imagen..."
                  value={imageUrl.startsWith('data:') ? '' : imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-white border-2 border-red-500 rounded-xl px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-600 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block font-cursive-body text-base font-bold text-slate-800 mb-1">
              Nombre del Producto o Servicio *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Arco Orgánico Navideño Khloe"
              className="w-full bg-white border-2 border-red-500 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-600 font-bold"
            />
          </div>

          {/* Category & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-cursive-body text-base font-bold text-slate-800 mb-1">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border-2 border-emerald-600 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-red-600 font-bold"
              >
                {categories
                  .filter((c) => c.id !== 'todos')
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block font-cursive-body text-base font-bold text-slate-800 mb-1">
                Etiqueta / Badge (Opcional)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="Ej. Navideño 🎄, Oferta..."
                className="w-full bg-white border-2 border-red-500 rounded-xl px-3.5 py-2 text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-600 font-bold"
              />
            </div>
          </div>

          {/* Price & Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-cursive-body text-base font-bold text-slate-800 mb-1">
                Costo / Precio ({settings.currencySymbol}) *
              </label>
              <input
                type="number"
                step="any"
                min="0"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="45.00"
                className="w-full bg-white border-2 border-emerald-600 rounded-xl px-3.5 py-2 text-slate-900 placeholder-slate-400 font-mono-nums outline-none focus:border-red-600 font-bold"
              />
            </div>

            <div>
              <label className="block font-cursive-body text-base font-bold text-slate-800 mb-1">
                Unidad
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="montaje, arreglo, evento..."
                className="w-full bg-white border-2 border-red-500 rounded-xl px-3.5 py-2 text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-600 font-bold"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-cursive-body text-base font-bold text-slate-800 mb-1">
              Descripción Detallada
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe las características, globos, dulces y detalles..."
              className="w-full bg-white border-2 border-emerald-600 rounded-xl p-3 text-slate-900 placeholder-slate-400 outline-none focus:border-red-600 resize-none font-bold"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white font-bold text-base flex items-center gap-1.5 shadow-lg border-2 border-red-600 ring-1 ring-emerald-600"
            >
              <Save className="w-4 h-4" />
              <span>Guardar en Catálogo</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
