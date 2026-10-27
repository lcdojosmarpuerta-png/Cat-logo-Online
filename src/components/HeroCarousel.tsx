import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Trash2, Edit3, UploadCloud, Pause, Play } from 'lucide-react';
import { Banner } from '../types/catalog';
import { compressImageFile } from '../utils/storage';

interface HeroCarouselProps {
  banners: Banner[];
  isAdmin: boolean;
  isNochebuena?: boolean;
  onSelectCategory: (categoryId: string) => void;
  onAddBanner: (banner: Banner) => void;
  onDeleteBanner: (bannerId: string) => void;
  onEditBanner: (banner: Banner) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  banners,
  isAdmin,
  isNochebuena = false,
  onSelectCategory,
  onAddBanner,
  onDeleteBanner,
  onEditBanner,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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
      const dataUrl = await compressImageFile(file, 1200, 0.85);
      const newBanner: Banner = {
        id: 'banner_' + Date.now(),
        title: 'Nueva Decoración Navideña Khloe',
        subtitle: 'Globos pastel, candy bar y magia festiva para tu evento',
        image: dataUrl,
        badge: 'NAVIDAD 2026',
        buttonText: 'Ver Paquetes',
        linkCategory: 'navidad',
      };
      onAddBanner(newBanner);
      setCurrentIndex(banners.length);
    } catch (err) {
      console.error('Error al procesar la imagen de banner:', err);
      alert('Hubo un error al cargar la imagen. Intenta con un archivo PNG o JPG más liviano.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!banners || banners.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="rounded-3xl p-8 border-2 border-red-600 ring-2 ring-emerald-600 bg-white text-center shadow-lg">
          <p className="text-red-700 text-lg font-cursive-body font-bold">No hay banners disponibles actualmente.</p>
          {isAdmin && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-emerald-600 text-white font-bold text-sm inline-flex items-center gap-2 font-cursive-body shadow-lg"
            >
              <UploadCloud className="w-4 h-4" />
              Cargar Primer Banner
            </button>
          )}
        </div>
      </div>
    );
  }

  const currentBanner = banners[currentIndex] || banners[0];

  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 pb-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Hero Frame with Red & Green Christmas Borders & Neon Glow */}
      <div
        className={`relative overflow-hidden rounded-3xl border-3 transition-all duration-500 group ${
          isNochebuena
            ? 'border-red-500 ring-4 ring-emerald-400 bg-slate-950 shadow-[0_0_35px_rgba(220,38,38,0.5),0_0_45px_rgba(22,163,74,0.45)]'
            : 'border-red-600 ring-4 ring-emerald-600 bg-white shadow-[0_10px_30px_rgba(220,38,38,0.22),0_10px_35px_rgba(22,163,74,0.22)]'
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Christmas Decorative corner badges */}
        <div className="absolute top-2 left-3 z-20 pointer-events-none flex items-center gap-1 text-sm sm:text-base drop-shadow-md">
          <span>🔔</span>
          <span className="hidden sm:inline">✨</span>
        </div>
        <div className="absolute top-2 right-3 z-20 pointer-events-none flex items-center gap-1 text-sm sm:text-base drop-shadow-md">
          <span className="hidden sm:inline">🍬</span>
          <span>🎄</span>
        </div>

        {/* Carousel Slide Track */}
        <div className="relative w-full aspect-[21/11] sm:aspect-[21/9] md:aspect-[2.6/1] min-h-[240px] sm:min-h-[280px] md:min-h-[320px] overflow-hidden">
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

                {/* Measured gradient scrim for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent z-1" />

                {/* Content Overlay with Cursive Typography & Red/Green Accents */}
                <div className="absolute inset-0 z-2 flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-2xl">
                  {banner.badge && (
                    <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-white/95 border-2 border-red-600 ring-1 ring-emerald-600 text-xs sm:text-sm font-bold text-red-700 tracking-wider uppercase mb-1.5 font-cursive-body shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      <span>{banner.badge}</span>
                      <span>🎄</span>
                    </div>
                  )}

                  <h2 className="font-cursive-title text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide leading-tight drop-shadow-md">
                    {banner.title}
                  </h2>

                  <p className="mt-1 sm:mt-2 font-cursive-body text-base sm:text-xl md:text-2xl text-pink-100 line-clamp-2 max-w-lg leading-snug">
                    {banner.subtitle}
                  </p>

                  <div className="mt-3 sm:mt-5 flex items-center gap-3">
                    <button
                      onClick={() => onSelectCategory(banner.linkCategory || 'todos')}
                      className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white font-extrabold font-cursive-title text-lg sm:text-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] active:scale-95 transition-all flex items-center gap-2 border-2 border-white"
                    >
                      <span>{banner.buttonText || 'Ver Catálogo'}</span>
                      <ChevronRight className="w-5 h-5 stroke-[2.5]" />
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
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white border-2 border-red-600 ring-1 ring-emerald-600 text-red-700 flex items-center justify-center backdrop-blur-md transition-all active:scale-90 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Banner siguiente"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white border-2 border-emerald-600 ring-1 ring-red-600 text-emerald-700 flex items-center justify-center backdrop-blur-md transition-all active:scale-90 shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dot Indicators */}
        {banners.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border-2 border-red-600 ring-1 ring-emerald-600">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ir al banner ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-7 h-2.5 bg-gradient-to-r from-red-600 to-emerald-600 shadow-sm'
                    : 'w-2.5 h-2.5 bg-slate-300 hover:bg-red-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Admin Superimposed Controls */}
        {isAdmin && (
          <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border-2 border-red-600 ring-1 ring-emerald-600 shadow-xl font-cursive-body">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs flex items-center gap-1 border border-slate-300"
              title={isPaused ? 'Reanudar carrusel' : 'Pausar carrusel'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => onEditBanner(currentBanner)}
              className="px-2.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center gap-1"
              title="Editar textos de este banner"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-1"
              title="Subir nueva imagen de banner"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>+ Subir</span>
            </button>

            {banners.length > 1 && (
              <button
                onClick={() => {
                  if (confirm('¿Deseas eliminar este banner del carrusel?')) {
                    onDeleteBanner(currentBanner.id);
                  }
                }}
                className="p-1.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 text-xs flex items-center gap-1 border border-red-300"
                title="Eliminar este banner"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
