import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FooterBar: React.FC<{ isNochebuena?: boolean }> = ({ isNochebuena = false }) => {
  return (
    <footer
      className={`fixed bottom-0 left-0 w-full z-50 h-14 sm:h-16 backdrop-blur-md border-t-4 transition-all duration-300 flex items-center justify-center px-3 sm:px-4 ${
        isNochebuena
          ? 'bg-[#0b0318]/95 border-red-500 shadow-[0_-3px_0_0_#16a34a,0_-12px_35px_rgba(220,38,38,0.4),0_-12px_40px_rgba(22,163,74,0.35)] text-slate-100'
          : 'bg-white/95 border-red-600 shadow-[0_-3px_0_0_#16a34a,0_-8px_25px_rgba(220,38,38,0.15)] text-slate-800'
      }`}
    >
      {/* Decorative mini Christmas garland light dots right above the footer border */}
      <div className="absolute -top-2 left-0 w-full flex justify-around pointer-events-none px-4 overflow-hidden">
        <span className={`w-2.5 h-2.5 rounded-full bg-red-600 animate-twinkle-1 ${isNochebuena ? 'shadow-[0_0_14px_#ef4444]' : 'shadow-[0_0_8px_#dc2626]'}`} />
        <span className={`w-2.5 h-2.5 rounded-full bg-emerald-500 animate-twinkle-2 ${isNochebuena ? 'shadow-[0_0_14px_#22c55e]' : 'shadow-[0_0_8px_#16a34a]'}`} />
        <span className={`w-2.5 h-2.5 rounded-full bg-red-600 animate-twinkle-3 ${isNochebuena ? 'shadow-[0_0_14px_#ef4444]' : 'shadow-[0_0_8px_#dc2626]'}`} />
        <span className={`w-2.5 h-2.5 rounded-full bg-emerald-500 animate-twinkle-4 ${isNochebuena ? 'shadow-[0_0_14px_#22c55e]' : 'shadow-[0_0_8px_#16a34a]'}`} />
        <span className={`w-2.5 h-2.5 rounded-full bg-red-600 animate-twinkle-1 ${isNochebuena ? 'shadow-[0_0_14px_#ef4444]' : 'shadow-[0_0_8px_#dc2626]'}`} />
        <span className={`w-2.5 h-2.5 rounded-full bg-emerald-500 animate-twinkle-2 ${isNochebuena ? 'shadow-[0_0_14px_#22c55e]' : 'shadow-[0_0_8px_#16a34a]'}`} />
        <span className={`w-2.5 h-2.5 rounded-full bg-red-600 animate-twinkle-3 ${isNochebuena ? 'shadow-[0_0_14px_#ef4444]' : 'shadow-[0_0_8px_#dc2626]'}`} />
        <span className={`w-2.5 h-2.5 rounded-full bg-emerald-500 animate-twinkle-4 ${isNochebuena ? 'shadow-[0_0_14px_#22c55e]' : 'shadow-[0_0_8px_#16a34a]'}`} />
      </div>

      <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-2 sm:gap-4 text-center select-none">
        
        {/* Segunda imagen adjuntada por el usuario: Logo oficial de S&S Web Studio para el cintillo inferior */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="h-8 sm:h-10 px-2 py-0.5 rounded-xl bg-white border-2 border-red-600 ring-1 ring-emerald-600 shadow-sm flex items-center justify-center overflow-hidden">
            <img
              src="/assets/aistudio/1791899989619_db0f9485.jpg"
              alt="S&S Web Studio"
              referrerPolicy="no-referrer"
              className="h-full w-auto object-contain max-h-7 sm:max-h-9"
            />
          </div>
        </div>

        {/* Texto exacto con tipografía cursiva festiva */}
        <div
          className={`font-cursive-body text-base sm:text-xl font-bold tracking-wide truncate flex items-center gap-1.5 sm:gap-2 ${
            isNochebuena ? 'text-slate-200' : 'text-slate-800'
          }`}
        >
          <span>
            Diseñado y Creado por{' '}
            <strong
              className={`font-extrabold font-cursive-title text-lg sm:text-2xl ${
                isNochebuena ? 'text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-red-700'
              }`}
            >
              S&amp;S Web Studio
            </strong>
          </span>
          <span className="text-emerald-500 font-black">|</span>
          <a
            href="https://wa.me/584245104245?text=Hola%20S%26S%20Web%20Studio%2C%20vi%20el%20cat%C3%A1logo%20navide%C3%B1o%20de%20Ball%C3%B3n%20Dulces%20Khloe%20y%20deseo%20m%C3%A1s%20informaci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-extrabold transition-colors inline-flex items-center gap-1 hover:underline decoration-red-500/60 ${
              isNochebuena ? 'text-emerald-300 hover:text-amber-300' : 'text-emerald-700 hover:text-red-700'
            }`}
            title="Escribir a WhatsApp / Llamar a S&S Web Studio"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 inline" />
            <span className="font-mono-nums">0424-5104245</span>
          </a>
        </div>

      </div>
    </footer>
  );
};
