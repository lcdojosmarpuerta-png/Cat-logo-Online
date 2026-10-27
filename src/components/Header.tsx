import React from 'react';
import { ShieldCheck, ShieldAlert, Settings, Image as ImageIcon, Moon, Sun } from 'lucide-react';
import { StoreSettings } from '../types/catalog';

interface HeaderProps {
  settings: StoreSettings;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onOpenSettingsModal: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  isAdmin,
  onToggleAdmin,
  onOpenSettingsModal,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <header
      className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b-3 transition-all duration-300 py-2 sm:py-2.5 ${
        isDarkMode
          ? 'bg-[#0e0720]/90 border-pink-500/80 shadow-[0_2px_0_0_#38bdf8,0_8px_25px_rgba(244,114,182,0.25)]'
          : 'bg-white/95 border-pink-400 shadow-[0_2px_0_0_#38bdf8,0_6px_18px_rgba(244,114,182,0.12)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2.5 sm:gap-3">
        
        {/* Esquina superior izquierda: Logo de Ballón Dulces Khloe */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="relative group">
            {settings.logoUrl ? (
              <div
                className={`relative p-1 rounded-2xl border-2 border-pink-400 ring-2 ring-sky-400 shadow-sm transition-transform hover:scale-102 flex items-center justify-center ${
                  isDarkMode ? 'bg-white/95 shadow-[0_0_15px_rgba(244,114,182,0.35)]' : 'bg-white'
                }`}
              >
                <img
                  src={settings.logoUrl}
                  alt={settings.companyName}
                  referrerPolicy="no-referrer"
                  className="h-10 sm:h-13 w-auto max-w-[110px] sm:max-w-[150px] object-contain rounded-xl"
                />
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-white border-2 border-pink-400 ring-2 ring-sky-400 shadow-sm">
                <span className="text-base sm:text-lg">🎈</span>
                <span className="font-cursive-title text-base sm:text-lg font-bold text-pink-600">
                  {settings.companyName}
                </span>
              </div>
            )}

            {isAdmin && (
              <button
                onClick={onOpenSettingsModal}
                title="Cambiar Logo de Empresa"
                className="absolute -bottom-1.5 -right-1.5 p-1.5 rounded-full bg-pink-600 text-white hover:bg-sky-600 shadow-md transition-colors border border-white"
              >
                <ImageIcon className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="hidden md:flex flex-col">
            <span
              className={`font-cursive-title text-lg sm:text-xl font-bold leading-none ${
                isDarkMode
                  ? 'bg-gradient-to-r from-pink-400 via-yellow-200 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(244,114,182,0.3)]'
                  : 'bg-gradient-to-r from-pink-600 via-purple-600 to-sky-600 bg-clip-text text-transparent'
              }`}
            >
              Ballón Dulces Khloe
            </span>
            <span
              className={`font-cursive-body text-xs sm:text-sm font-bold tracking-wide ${
                isDarkMode ? 'text-pink-200' : 'text-slate-600'
              }`}
            >
              Festejos &amp; Decoraciones ✨
            </span>
          </div>
        </div>

        {/* Esquina superior derecha: Título "Catálogo Online" */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-end text-right">
            <div className="flex items-center gap-1">
              <span className="text-sm">✨</span>
              <h1
                className={`font-cursive-title text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-wide select-none ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-pink-300 via-amber-200 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(244,114,182,0.45)]'
                    : 'bg-gradient-to-r from-pink-600 via-purple-600 to-sky-600 bg-clip-text text-transparent'
                }`}
              >
                Catálogo Online
              </h1>
              <span className="text-sm">🎈</span>
            </div>
            <span
              className={`font-cursive-body text-xs sm:text-sm font-bold ${
                isDarkMode ? 'text-pink-200' : 'text-slate-700'
              }`}
            >
              Cotizaciones directas vía WhatsApp
            </span>
          </div>

          {/* Theme & Admin Buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-bold border-2 transition-all flex items-center gap-1 shadow-sm font-cursive-body select-none active:scale-95 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.5)]'
                  : 'bg-slate-900 text-amber-300 border-slate-700 hover:bg-slate-800 shadow-sm'
              }`}
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label="Alternar tema"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                  <span className="hidden sm:inline">Modo Día</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span className="hidden sm:inline">Modo Noche</span>
                </>
              )}
            </button>

            {isAdmin && (
              <button
                onClick={onOpenSettingsModal}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-bold border-2 transition-colors flex items-center gap-1 shadow-sm font-cursive-body ${
                  isDarkMode
                    ? 'text-pink-200 bg-pink-950/70 border-pink-500 hover:bg-pink-900/80'
                    : 'text-purple-800 bg-purple-50 border-purple-400 hover:bg-purple-100'
                }`}
                title="Configuración de Tienda & WhatsApp"
              >
                <Settings className="w-3.5 h-3.5 text-pink-600" />
                <span className="hidden md:inline">Ajustes</span>
              </button>
            )}

            <button
              onClick={onToggleAdmin}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1 font-cursive-body border-2 ${
                isAdmin
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border-sky-400 shadow-md'
                  : isDarkMode
                  ? 'bg-slate-900/90 text-pink-400 border-pink-500 hover:bg-slate-800'
                  : 'bg-white text-pink-700 border-pink-400 hover:bg-pink-50'
              }`}
              title={isAdmin ? 'Desactivar Modo Administrador' : 'Activar Modo Administrador'}
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  <span className="hidden sm:inline">Admin Activo</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-3.5 h-3.5 text-pink-500" />
                  <span className="hidden sm:inline">Admin</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};
