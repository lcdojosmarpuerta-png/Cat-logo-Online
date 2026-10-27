import React, { useState, useEffect, useRef } from 'react';
import { X, UploadCloud, Image as ImageIcon, Save, Globe } from 'lucide-react';
import { Product, Category, StoreSettings } from '../types/catalog';
import { uploadImageToWeb, isValidWebUrl } from '../utils/imageUpload';

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
  onSave,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [badge, setBadge] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setCategory(productToEdit.category);
      setBadge(productToEdit.badge || '');
      setDescription(productToEdit.description);
      setImageUrl(productToEdit.image);
    } else {
      setName('');
      setCategory(categories[1]?.id || 'arcos');
      setBadge('');
      setDescription('');
      setImageUrl('');
    }
    setUploadStatus(null);
  }, [productToEdit, categories, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadStatus('Cargando imagen a la red...');
      const { url, isOnline } = await uploadImageToWeb(file);
      setImageUrl(url);
      setUploadStatus(isOnline ? '✓ Imagen guardada en la red' : '✓ Imagen cargada localmente');
    } catch (err) {
      console.error('Error al subir imagen:', err);
      alert('Error al procesar la imagen seleccionada.');
      setUploadStatus(null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Por favor ingresa el nombre del arreglo o servicio.');
      return;
    }

    const finalImage = imageUrl || `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%"><rect width="600" height="600" fill="#fdf2f8"/><text x="300" y="310" font-family="cursive" font-size="28" fill="#ec4899" text-anchor="middle" font-weight="bold">${name}</text></svg>`
    )}`;

    const savedProduct: Product = {
      id: productToEdit ? productToEdit.id : 'prod_' + Date.now(),
      name: name.trim(),
      category: category || 'arcos',
      badge: badge.trim() || undefined,
      description: description.trim() || 'Diseño exclusivo personalizado.',
      image: finalImage,
      inStock: true,
    };

    onSave(savedProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" />

      <div className="relative w-full max-w-lg bg-white border-2 border-pink-400 rounded-3xl p-5 sm:p-6 shadow-2xl z-10 max-h-[92vh] overflow-y-auto animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-pink-200">
          <div>
            <h3 className="font-cursive-title text-xl font-bold text-purple-900 flex items-center gap-1.5">
              <span>🎈</span>
              <span>{productToEdit ? 'Editar Arreglo / Decoración' : 'Agregar Arreglo al Catálogo'}</span>
            </h3>
            <p className="font-cursive-body text-xs sm:text-sm text-pink-600 font-bold">
              Las imágenes cargadas se guardan en la red para ser vistas por todos los usuarios online
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
          {/* Image Upload / Preview Area */}
          <div>
            <label className="block font-cursive-body text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
              Imagen del Arreglo (Permanente en la Red)
            </label>

            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-pink-300 overflow-hidden flex items-center justify-center shrink-0 relative">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Previsualización"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-7 h-7 text-slate-400" />
                )}
              </div>

              <div className="flex-1 space-y-1.5">
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
                  className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 shadow-sm"
                >
                  {isUploading ? (
                    <Globe className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <UploadCloud className="w-3.5 h-3.5" />
                  )}
                  <span>{isUploading ? 'Subiendo a la red...' : 'Subir desde Dispositivo / Galería'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    placeholder="O pega enlace web (URL https://...)"
                    value={imageUrl.startsWith('data:') ? '' : imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-white border border-pink-300 rounded-xl px-2.5 py-1 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-purple-500 font-bold"
                  />
                  {isValidWebUrl(imageUrl) && (
                    <span className="text-[10px] text-emerald-600 font-bold px-1.5 py-0.5 bg-emerald-50 rounded border border-emerald-300 whitespace-nowrap">
                      Enlace Web
                    </span>
                  )}
                </div>

                {uploadStatus && (
                  <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    {uploadStatus}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block font-cursive-body text-xs sm:text-sm font-bold text-slate-800 mb-1">
              Nombre del Arreglo o Decoración *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Arco Orgánico Tonos Pastel Khloe"
              className="w-full bg-white border border-pink-300 rounded-xl px-3 py-1.5 text-slate-900 placeholder-slate-400 outline-none focus:border-purple-500 font-bold"
            />
          </div>

          {/* Category & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block font-cursive-body text-xs sm:text-sm font-bold text-slate-800 mb-1">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-purple-300 rounded-xl px-2.5 py-1.5 text-slate-900 outline-none focus:border-pink-500 font-bold"
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
              <label className="block font-cursive-body text-xs sm:text-sm font-bold text-slate-800 mb-1">
                Etiqueta / Badge (Opcional)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="Ej. Más Pedido, Novedad..."
                className="w-full bg-white border border-pink-300 rounded-xl px-3 py-1.5 text-slate-900 placeholder-slate-400 outline-none focus:border-purple-500 font-bold"
              />
            </div>
          </div>

          {/* Concise Description (NO price input) */}
          <div>
            <label className="block font-cursive-body text-xs sm:text-sm font-bold text-slate-800 mb-1">
              Descripción Breve
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción breve (ej. Arco orgánico con globos perlados y nubes)."
              className="w-full bg-white border border-pink-300 rounded-xl p-2.5 text-slate-900 placeholder-slate-400 outline-none focus:border-purple-500 resize-none font-bold"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar en Catálogo</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
