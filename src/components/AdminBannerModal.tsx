import React, { useState, useEffect, useRef } from 'react';
import { X, UploadCloud, Save, Image as ImageIcon } from 'lucide-react';
import { Banner, Category } from '../types/catalog';
import { compressImageFile } from '../utils/storage';

interface AdminBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  banner: Banner | null;
  categories: Category[];
  onSave: (banner: Banner) => void;
}

export const AdminBannerModal: React.FC<AdminBannerModalProps> = ({
  isOpen,
  onClose,
  banner,
  categories,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [badge, setBadge] = useState('');
  const [buttonText, setButtonText] = useState('Ver Catálogo');
  const [linkCategory, setLinkCategory] = useState('todos');
  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (banner) {
      setTitle(banner.title);
      setSubtitle(banner.subtitle);
      setBadge(banner.badge || '');
      setButtonText(banner.buttonText || 'Ver Catálogo');
      setLinkCategory(banner.linkCategory || 'todos');
      setImage(banner.image);
    }
  }, [banner, isOpen]);

  if (!isOpen || !banner) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const compressed = await compressImageFile(file, 1200, 0.85);
      setImage(compressed);
    } catch (err) {
      console.error('Error al subir banner:', err);
      alert('Error al procesar la imagen del banner.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Por favor ingresa un título para el banner.');
      return;
    }

    const updated: Banner = {
      ...banner,
      title: title.trim(),
      subtitle: subtitle.trim(),
      badge: badge.trim() || undefined,
      buttonText: buttonText.trim() || 'Ver Catálogo',
      linkCategory,
      image,
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" />

      <div className="relative w-full max-w-lg bg-white border-3 border-red-600 ring-4 ring-emerald-600 rounded-3xl p-6 sm:p-7 shadow-2xl z-10 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-red-500">
          <div>
            <h3 className="font-cursive-title text-2xl font-bold text-red-700 flex items-center gap-2">
              <span>🎀</span>
              <span>Editar Banner Navideño</span>
            </h3>
            <p className="font-cursive-body text-base text-emerald-800 font-bold">Personaliza la imagen y los textos promocionales de Khloe</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-700 border-2 border-red-600 ring-1 ring-emerald-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Banner Preview & Upload */}
          <div>
            <label className="block font-cursive-body text-base font-bold text-slate-800 mb-2">
              Imagen del Banner (Formato Panorámico)
            </label>
            <div className="w-full aspect-[21/9] rounded-2xl bg-slate-50 border-2 border-emerald-600 ring-1 ring-red-500 overflow-hidden mb-2 relative group flex items-center justify-center">
              {image ? (
                <img src={image} alt="Banner" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-slate-400" />
              )}
            </div>

            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors border border-red-500"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{isUploading ? 'Procesando imagen...' : 'Cargar Nueva Imagen de Banner'}</span>
            </button>
          </div>

          <div>
            <label className="block font-cursive-body text-base font-bold text-slate-800 mb-1">
              Etiqueta Superior (Badge)
            </label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="Ej. NAVIDAD KHLOE 2026"
              className="w-full bg-white border-2 border-red-500 rounded-xl px-3.5 py-2 text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-600 font-bold"
            />
          </div>

          <div>
            <label className="block font-cursive-body text-base font-bold text-slate-800 mb-1">
              Título Principal *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Magia Navideña & Globos Pastel"
              className="w-full bg-white border-2 border-emerald-600 rounded-xl px-3.5 py-2 text-slate-900 placeholder-slate-400 outline-none focus:border-red-600 font-bold"
            />
          </div>

          <div>
            <label className="block font-cursive-body text-base font-bold text-slate-800 mb-1">
              Subtítulo / Mensaje Promocional
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Ej. Decoraciones espectaculares para fiestas y eventos"
              className="w-full bg-white border-2 border-red-500 rounded-xl px-3.5 py-2 text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-600 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-cursive-body text-base font-bold text-slate-800 mb-1">
                Texto del Botón
              </label>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="Ver Catálogo"
                className="w-full bg-white border-2 border-emerald-600 rounded-xl px-3.5 py-2 text-slate-900 placeholder-slate-400 outline-none focus:border-red-600 font-bold"
              />
            </div>

            <div>
              <label className="block font-cursive-body text-base font-bold text-slate-800 mb-1">
                Categoría a Enlazar
              </label>
              <select
                value={linkCategory}
                onChange={(e) => setLinkCategory(e.target.value)}
                className="w-full bg-white border-2 border-red-500 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-emerald-600 font-bold"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white font-bold text-base flex items-center gap-1.5 shadow-lg border-2 border-red-600 ring-1 ring-emerald-600"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Banner</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
