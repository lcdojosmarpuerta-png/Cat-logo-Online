import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FooterBar: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 h-14 sm:h-16 bg-white/95 backdrop-blur-md border-t-4 border-red-600 shadow-[0_-3px_0_0_#16a34a,0_-8px_25px_rgba(220,38,38,0.15)] flex items-center justify-center px-3 sm:px-4">
      {/* Decorative mini Christmas garland light dots right above the footer border */}
      <div className="absolute -top-2 left-0 w-full flex justify-around pointer-events-none px-4 overflow-hidden">
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-twinkle-1 shadow-[0_0_8px_#dc2626]" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-twinkle-2 shadow-[0_0_8px_#16a34a]" />
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-twinkle-3 shadow-[0_0_8px_#dc2626]" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-twinkle-4 shadow-[0_0_8px_#16a34a]" />
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-twinkle-1 shadow-[0_0_8px_#dc2626]" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-twinkle-2 shadow-[0_0_8px_#16a34a]" />
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-twinkle-3 shadow-[0_0_8px_#dc2626]" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-twinkle-4 shadow-[0_0_8px_#16a34a]" />
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
        <div className="font-cursive-body text-base sm:text-xl text-slate-800 font-bold tracking-wide truncate flex items-center gap-1.5 sm:gap-2">
          <span>
            Diseñado y Creado por <strong className="text-red-700 font-extrabold font-cursive-title text-lg sm:text-2xl">S&amp;S Web Studio</strong>
          </span>
          <span className="text-emerald-600 font-black">|</span>
          <a
            href="https://wa.me/584245104245?text=Hola%20S%26S%20Web%20Studio%2C%20vi%20el%20cat%C3%A1logo%20navide%C3%B1o%20de%20Ball%C3%B3n%20Dulces%20Khloe%20y%20deseo%20m%C3%A1s%20informaci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:text-red-700 font-extrabold transition-colors inline-flex items-center gap-1 hover:underline decoration-red-500/60"
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
