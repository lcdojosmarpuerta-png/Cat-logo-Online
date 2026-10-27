import React from 'react';
import { ShieldCheck, ShieldAlert, Settings, Image as ImageIcon, Moon, Sun } from 'lucide-react';
import { StoreSettings } from '../types/catalog';
import { ChristmasGarland } from './ChristmasGarland';

interface HeaderProps {
  settings: StoreSettings;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onOpenSettingsModal: () => void;
  snowEnabled: boolean;
  onToggleSnow: () => void;
  isNochebuena: boolean;
  onToggleNochebuena: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  isAdmin,
  onToggleAdmin,
  onOpenSettingsModal,
  snowEnabled,
  onToggleSnow,
  isNochebuena,
  onToggleNochebuena,
}) => {
  return (
    <header
      className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b-4 border-red-600 transition-all duration-300 pt-5 ${
        isNochebuena
          ? 'bg-[#0f0622]/90 shadow-[0_3px_0_0_#16a34a,0_10px_30px_rgba(220,38,38,0.35),0_10px_35px_rgba(22,163,74,0.35)]'
          : 'bg-white/95 shadow-[0_3px_0_0_#16a34a,0_8px_20px_rgba(220,38,38,0.15)]'
      }`}
    >
      {/* Christmas Garland Decoration Component with SVG Fairy Lights */}
      <ChristmasGarland isNochebuena={isNochebuena} />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-22 flex items-center justify-between gap-3">
        
        {/* Esquina superior izquierda: Contenedor para el Logo de la empresa (Primera imagen adjuntada) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="relative group">
            {settings.logoUrl ? (
              <div
                className={`relative p-1 rounded-2xl border-2 border-red-600 ring-2 ring-emerald-600 shadow-md transition-transform hover:scale-102 flex items-center justify-center ${
                  isNochebuena ? 'bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'bg-white'
                }`}
              >
                <span className="absolute -top-2.5 -left-2 text-base sm:text-xl drop-shadow-sm select-none transform -rotate-12" title="¡Feliz Navidad!">
                  🎅
                </span>
                <img
                  src={settings.logoUrl}
                  alt={settings.companyName}
                  referrerPolicy="no-referrer"
                  className="h-12 sm:h-16 w-auto max-w-[130px] sm:max-w-[180px] object-contain rounded-xl"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border-2 border-red-600 ring-2 ring-emerald-600 shadow-md">
                <span className="text-xl">🎈</span>
                <span className="font-cursive-title text-xl font-bold text-red-700">
                  {settings.companyName}
                </span>
              </div>
            )}

            {isAdmin && (
              <button
                onClick={onOpenSettingsModal}
                title="Cambiar Logo de Empresa"
                className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-red-600 text-white hover:bg-emerald-600 shadow-md transition-colors border border-white"
              >
                <ImageIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="hidden md:flex flex-col">
            <span
              className={`font-cursive-title text-2xl font-bold leading-none ${
                isNochebuena
                  ? 'bg-gradient-to-r from-red-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]'
                  : 'bg-gradient-to-r from-red-600 via-emerald-600 to-red-600 bg-clip-text text-transparent'
              }`}
            >
              Ballón Dulces Khloe
            </span>
            <span
              className={`font-cursive-body text-base font-bold tracking-wide ${
                isNochebuena ? 'text-amber-200 drop-shadow-[0_0_5px_rgba(251,191,36,0.3)]' : 'text-emerald-700'
              }`}
            >
              Festejos &amp; Decoraciones Navideñas ✨
            </span>
          </div>
        </div>

        {/* Esquina superior derecha: Título "Catálogo Online" en tipografía cursiva festiva */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <div className="flex flex-col items-end text-right">
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-xl">🎄</span>
              <h1
                className={`font-cursive-title text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wide select-none ${
                  isNochebuena
                    ? 'bg-gradient-to-r from-red-400 via-yellow-200 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]'
                    : 'bg-gradient-to-r from-red-600 via-emerald-600 to-red-600 bg-clip-text text-transparent'
                }`}
              >
                Catálogo Online
              </h1>
              <span className="text-base sm:text-xl">🎀</span>
            </div>
            <span
              className={`font-cursive-body text-sm sm:text-lg font-bold ${
                isNochebuena ? 'text-pink-200' : 'text-emerald-800'
              }`}
            >
              Presupuestos Navideños vía WhatsApp 🎁
            </span>
          </div>

          {/* Theme & Utility Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Opción de Tema Nochebuena (Filtro Oscuro & Luces Navideñas Resaltadas) */}
            <button
              onClick={onToggleNochebuena}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all flex items-center gap-1.5 shadow-sm font-cursive-body select-none active:scale-95 ${
                isNochebuena
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border-amber-300 ring-2 ring-purple-400 shadow-[0_0_18px_rgba(251,191,36,0.7)] animate-pulse'
                  : 'bg-indigo-950 text-indigo-100 border-indigo-700/80 hover:bg-indigo-900 ring-1 ring-amber-400/60 shadow-sm'
              }`}
              title={isNochebuena ? 'Desactivar tema Nochebuena (volver a modo día)' : 'Activar tema Nochebuena (filtro nocturno y luces radiantes)'}
              aria-label="Alternar tema Nochebuena"
            >
              {isNochebuena ? (
                <>
                  <Sun className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  <span className="font-cursive-body font-bold text-xs sm:text-sm whitespace-nowrap hidden sm:inline">
                    Nochebuena ✨
                  </span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span className="font-cursive-body font-bold text-xs sm:text-sm whitespace-nowrap hidden sm:inline">
                    Nochebuena
                  </span>
                </>
              )}
            </button>

            {/* Snow Effect Toggle */}
            <button
              onClick={onToggleSnow}
              className={`p-2 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all flex items-center gap-1 shadow-sm ${
                snowEnabled
                  ? isNochebuena
                    ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 ring-1 ring-red-400'
                    : 'bg-emerald-50 border-emerald-600 text-emerald-800 ring-1 ring-red-500'
                  : isNochebuena
                  ? 'bg-slate-900 border-slate-700 text-slate-400'
                  : 'bg-white border-slate-300 text-slate-600'
              }`}
              title={snowEnabled ? 'Desactivar nieve' : 'Activar nieve navideña'}
            >
              <span>❄️</span>
              <span className="hidden lg:inline font-cursive-body font-bold">Nieve</span>
            </button>

            {isAdmin && (
              <button
                onClick={onOpenSettingsModal}
                className={`p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs sm:text-sm font-bold border-2 transition-colors flex items-center gap-1.5 shadow-sm font-cursive-body ${
                  isNochebuena
                    ? 'text-pink-200 bg-pink-950/70 border-pink-500 hover:bg-pink-900/80'
                    : 'text-emerald-800 bg-emerald-50 border-emerald-600 hover:bg-emerald-100'
                }`}
                title="Configuración de Tienda & WhatsApp"
              >
                <Settings className="w-4 h-4 text-red-600" />
                <span className="hidden md:inline">Ajustes</span>
              </button>
            )}

            <button
              onClick={onToggleAdmin}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 font-cursive-body border-2 ${
                isAdmin
                  ? 'bg-red-600 text-white border-emerald-600 ring-2 ring-red-400 shadow-md hover:bg-red-700'
                  : isNochebuena
                  ? 'bg-slate-900/90 text-red-400 border-red-500 ring-1 ring-emerald-500 hover:bg-slate-800'
                  : 'bg-white text-red-700 border-red-600 ring-1 ring-emerald-600 hover:bg-red-50'
              }`}
              title={isAdmin ? 'Desactivar Modo Administrador' : 'Activar Modo Administrador'}
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span className="hidden sm:inline">Admin Activo</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
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
