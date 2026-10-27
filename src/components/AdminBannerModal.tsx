import React, { useState, useEffect, useRef } from 'react';
import { X, UploadCloud, Save, Image as ImageIcon, Globe } from 'lucide-react';
import { Banner, Category } from '../types/catalog';
import { uploadImageToWeb, isValidWebUrl } from '../utils/imageUpload';

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
  const [buttonText, setButtonText] = useState('Ver Opciones');
  const [linkCategory, setLinkCategory] = useState('todos');
  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (banner) {
      setTitle(banner.title);
      setSubtitle(banner.subtitle);
      setBadge(banner.badge || '');
      setButtonText(banner.buttonText || 'Ver Opciones');
      setLinkCategory(banner.linkCategory || 'todos');
      setImage(banner.image);
    }
    setUploadStatus(null);
  }, [banner, isOpen]);

  if (!isOpen || !banner) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadStatus('Cargando imagen a la red...');
      const { url, isOnline } = await uploadImageToWeb(file);
      setImage(url);
      setUploadStatus(isOnline ? '✓ Imagen guardada en la red' : '✓ Imagen cargada');
    } catch (err) {
      console.error('Error al subir banner:', err);
      alert('Error al procesar la imagen del banner.');
      setUploadStatus(null);
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
      buttonText: buttonText.trim() || 'Ver Opciones',
      linkCategory,
      image,
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" />

      <div className="relative w-full max-w-lg bg-white border-2 border-pink-400 rounded-3xl p-5 sm:p-6 shadow-2xl z-10 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-pink-200">
          <div>
            <h3 className="font-cursive-title text-xl font-bold text-purple-900 flex items-center gap-1.5">
              <span>🎈</span>
              <span>Editar Banner Promocional</span>
            </h3>
            <p className="font-cursive-body text-xs sm:text-sm text-pink-600 font-bold">
              Las imágenes cargadas se guardan en la red para ser visibles online en todos los dispositivos
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
          {/* Banner Preview & Upload */}
          <div>
            <label className="block font-cursive-body text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
              Imagen del Banner
            </label>
            <div className="w-full aspect-[21/9] rounded-2xl bg-slate-50 border border-pink-300 overflow-hidden mb-2 relative group flex items-center justify-center">
              {image ? (
                <img src={image} alt="Banner" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-slate-400" />
              )}
            </div>

            <div className="space-y-1.5">
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
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
                <span>{isUploading ? 'Subiendo a la red...' : 'Cargar Nueva Imagen de Banner'}</span>
              </button>

              <div className="flex items-center gap-1">
                <input
                  type="text"
                  placeholder="O ingresa enlace web (URL https://...)"
                  value={image.startsWith('data:') ? '' : image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-white border border-pink-300 rounded-xl px-2.5 py-1 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-purple-500 font-bold"
                />
                {isValidWebUrl(image) && (
                  <span className="text-[10px] text-emerald-600 font-bold px-1.5 py-0.5 bg-emerald-50 rounded border border-emerald-300 whitespace-nowrap">
                    Enlace Web
                  </span>
                )}
              </div>

              {uploadStatus && (
                <p className="text-[11px] font-bold text-emerald-600">
                  {uploadStatus}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-cursive-body text-xs sm:text-sm font-bold text-slate-800 mb-1">
              Etiqueta Superior (Badge)
            </label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="Ej. FESTEJOS & DECORACIONES"
              className="w-full bg-white border border-pink-300 rounded-xl px-3 py-1.5 text-slate-900 placeholder-slate-400 outline-none focus:border-purple-500 font-bold"
            />
          </div>

          <div>
            <label className="block font-cursive-body text-xs sm:text-sm font-bold text-slate-800 mb-1">
              Título Principal * (Corto y directo)
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Ballón Dulces Khloe"
              className="w-full bg-white border border-purple-300 rounded-xl px-3 py-1.5 text-slate-900 placeholder-slate-400 outline-none focus:border-pink-500 font-bold"
            />
          </div>

          <div>
            <label className="block font-cursive-body text-xs sm:text-sm font-bold text-slate-800 mb-1">
              Subtítulo Breve
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Ej. Magia y color para tus celebraciones."
              className="w-full bg-white border border-pink-300 rounded-xl px-3 py-1.5 text-slate-900 placeholder-slate-400 outline-none focus:border-purple-500 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block font-cursive-body text-xs sm:text-sm font-bold text-slate-800 mb-1">
                Texto del Botón
              </label>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="Ver Opciones"
                className="w-full bg-white border border-purple-300 rounded-xl px-3 py-1.5 text-slate-900 placeholder-slate-400 outline-none focus:border-pink-500 font-bold"
              />
            </div>

            <div>
              <label className="block font-cursive-body text-xs sm:text-sm font-bold text-slate-800 mb-1">
                Categoría a Enlazar
              </label>
              <select
                value={linkCategory}
                onChange={(e) => setLinkCategory(e.target.value)}
                className="w-full bg-white border border-pink-300 rounded-xl px-2.5 py-1.5 text-slate-900 outline-none focus:border-purple-500 font-bold"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
              <span>Guardar Banner</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
