import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Trash2, Edit3, UploadCloud, Pause, Play, Globe } from 'lucide-react';
import { Banner } from '../types/catalog';
import { uploadImageToWeb } from '../utils/imageUpload';

interface HeroCarouselProps {
  banners: Banner[];
  isAdmin: boolean;
  isDarkMode?: boolean;
  onSelectCategory: (categoryId: string) => void;
  onAddBanner: (banner: Banner) => void;
  onDeleteBanner: (bannerId: string) => void;
  onEditBanner: (banner: Banner) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  banners,
  isAdmin,
  isDarkMode = false,
  onSelectCategory,
  onAddBanner,
  onDeleteBanner,
  onEditBanner,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const autoPlayRef = useRef<number | null>(null);

  // Auto-scroll loop
  useEffect(() => {
    if (banners.length <= 1 || isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [banners.length, isPaused]);

  useEffect(() => {
    if (currentIndex >= banners.length && banners.length > 0) {
      setCurrentIndex(0);
    }
  }, [banners.length, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // Upload image to web so it persists online across all devices and visitors
      const { url } = await uploadImageToWeb(file);
      
      const newBanner: Banner = {
        id: 'banner_' + Date.now(),
        title: 'Decoración Ballón Dulces Khloe',
        subtitle: 'Magia y diseño para tus celebraciones.',
        image: url,
        badge: 'NUEVO DISEÑO',
        buttonText: 'Ver Opciones',
        linkCategory: 'todos',
      };
      onAddBanner(newBanner);
      setCurrentIndex(banners.length);
    } catch (err) {
      console.error('Error al subir banner a la red:', err);
      alert('Hubo un error al cargar la imagen. Intenta nuevamente.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!banners || banners.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="rounded-3xl p-6 border-2 border-pink-400 bg-white text-center shadow-md">
          <p className="text-slate-700 text-base font-cursive-body font-bold">No hay banners disponibles actualmente.</p>
          {isAdmin && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-xs inline-flex items-center gap-1.5 font-cursive-body shadow-md"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Cargar Primer Banner</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  const currentBanner = banners[currentIndex] || banners[0];

  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Hero Frame with Pastel Rainbow Borders & Soft Glow */}
      <div
        className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-500 group ${
          isDarkMode
            ? 'border-pink-500/80 ring-2 ring-sky-400/60 bg-slate-950 shadow-[0_0_25px_rgba(244,114,182,0.35),0_0_25px_rgba(56,189,248,0.3)]'
            : 'border-pink-400 ring-2 ring-sky-300 bg-white shadow-[0_8px_25px_rgba(244,114,182,0.18),0_8px_25px_rgba(56,189,248,0.15)]'
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Carousel Slide Track */}
        <div className="relative w-full aspect-[21/11] sm:aspect-[21/9] md:aspect-[2.6/1] min-h-[200px] sm:min-h-[250px] md:min-h-[290px] overflow-hidden">
          {banners.map((banner, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={banner.id}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
                  isActive
                    ? 'opacity-100 translate-x-0 scale-100 z-10'
                    : 'opacity-0 translate-x-8 scale-98 pointer-events-none z-0'
                }`}
              >
                {/* Banner Background Image */}
                <img
                  src={banner.image}
                  alt={banner.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center select-none"
                />

                {/* Scrim for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-1" />

                {/* Content Overlay with Clean, Minimal Typography */}
                <div className="absolute inset-0 z-2 flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-xl">
                  {banner.badge && (
                    <div className="inline-flex items-center gap-1 self-start px-2.5 py-0.5 rounded-full bg-white/95 border border-pink-400 text-[10px] sm:text-xs font-bold text-pink-700 tracking-wider uppercase mb-1 font-cursive-body shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                      <span>{banner.badge}</span>
                    </div>
                  )}

                  <h2 className="font-cursive-title text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide leading-tight drop-shadow-md">
                    {banner.title}
                  </h2>

                  <p className="mt-1 font-cursive-body text-xs sm:text-sm md:text-base text-pink-100 line-clamp-2 max-w-md leading-snug">
                    {banner.subtitle}
                  </p>

                  <div className="mt-2.5 sm:mt-3 flex items-center gap-2">
                    <button
                      onClick={() => onSelectCategory(banner.linkCategory || 'todos')}
                      className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-sky-600 hover:from-pink-500 hover:to-sky-500 text-white font-extrabold font-cursive-title text-xs sm:text-sm shadow-[0_0_15px_rgba(244,114,182,0.35)] active:scale-95 transition-all flex items-center gap-1.5 border border-white"
                    >
                      <span>{banner.buttonText || 'Ver Opciones'}</span>
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Manual Arrow Controls */}
        {banners.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Banner anterior"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white border border-pink-400 text-pink-700 flex items-center justify-center backdrop-blur-md transition-all active:scale-90 shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Banner siguiente"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white border border-sky-400 text-sky-700 flex items-center justify-center backdrop-blur-md transition-all active:scale-90 shadow-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Dot Indicators */}
        {banners.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-pink-300">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ir al banner ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-6 h-2 bg-gradient-to-r from-pink-500 to-sky-500 shadow-sm'
                    : 'w-2 h-2 bg-slate-300 hover:bg-pink-300'
                }`}
              />
            ))}
          </div>
        )}

        {/* Admin Superimposed Controls */}
        {isAdmin && (
          <div className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-2xl border border-pink-400 shadow-lg font-cursive-body">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs flex items-center gap-1"
              title={isPaused ? 'Reanudar carrusel' : 'Pausar carrusel'}
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            </button>

            <button
              onClick={() => onEditBanner(currentBanner)}
              className="px-2 py-1 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs flex items-center gap-1"
              title="Editar textos del banner"
            >
              <Edit3 className="w-3 h-3" />
              <span>Editar</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-2 py-1 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1 disabled:opacity-50"
              title="Cargar imagen en la red para visualización online"
            >
              {isUploading ? (
                <Globe className="w-3 h-3 animate-spin" />
              ) : (
                <UploadCloud className="w-3 h-3" />
              )}
              <span>{isUploading ? 'Subiendo...' : '+ Subir Online'}</span>
            </button>

            {banners.length > 1 && (
              <button
                onClick={() => {
                  if (confirm('¿Deseas eliminar este banner?')) {
                    onDeleteBanner(currentBanner.id);
                  }
                }}
                className="p-1 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 text-xs flex items-center gap-1"
                title="Eliminar este banner"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
