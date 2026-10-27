import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FooterBar: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  return (
    <footer
      className={`fixed bottom-0 left-0 w-full z-50 h-13 sm:h-15 backdrop-blur-md border-t-2 transition-all duration-300 flex items-center justify-center px-3 sm:px-4 ${
        isDarkMode
          ? 'bg-[#0a0417]/95 border-pink-500/70 shadow-[0_-2px_0_0_#38bdf8,0_-8px_25px_rgba(244,114,182,0.2)] text-slate-100'
          : 'bg-white/95 border-pink-300 shadow-[0_-2px_0_0_#38bdf8,0_-6px_20px_rgba(244,114,182,0.1)] text-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-2 sm:gap-4 text-center select-none">
        
        {/* Segunda imagen adjuntada por el usuario: Logo oficial de S&S Web Studio para el cintillo inferior */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="h-7 sm:h-9 px-2 py-0.5 rounded-xl bg-white border border-pink-300 shadow-sm flex items-center justify-center overflow-hidden">
            <img
              src="/assets/aistudio/1791899989619_db0f9485.jpg"
              alt="S&S Web Studio"
              referrerPolicy="no-referrer"
              className="h-full w-auto object-contain max-h-6 sm:max-h-8"
            />
          </div>
        </div>

        {/* Texto exacto */}
        <div
          className={`font-cursive-body text-xs sm:text-sm font-bold tracking-wide truncate flex items-center gap-1.5 sm:gap-2 ${
            isDarkMode ? 'text-slate-200' : 'text-slate-800'
          }`}
        >
          <span>
            Diseñado y Creado por{' '}
            <strong
              className={`font-extrabold font-cursive-title text-sm sm:text-base ${
                isDarkMode ? 'text-pink-300 drop-shadow-[0_0_6px_rgba(244,114,182,0.45)]' : 'text-pink-700'
              }`}
            >
              S&amp;S Web Studio
            </strong>
          </span>
          <span className="text-purple-400 font-black">|</span>
          <a
            href="https://wa.me/584245104245?text=Hola%20S%26S%20Web%20Studio%2C%20vi%20el%20cat%C3%A1logo%20de%20Ball%C3%B3n%20Dulces%20Khloe%20y%20deseo%20m%C3%A1s%20informaci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-extrabold transition-colors inline-flex items-center gap-1 hover:underline decoration-pink-500/60 ${
              isDarkMode ? 'text-sky-300 hover:text-pink-300' : 'text-sky-700 hover:text-pink-700'
            }`}
            title="Escribir a WhatsApp / Llamar a S&S Web Studio"
          >
            <MessageCircle className="w-3.5 h-3.5 text-pink-600 inline" />
            <span className="font-mono-nums">0424-5104245</span>
          </a>
        </div>

      </div>
    </footer>
  );
};
