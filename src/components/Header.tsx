import React from 'react';
import { ShieldCheck, ShieldAlert, Settings, Image as ImageIcon } from 'lucide-react';
import { StoreSettings } from '../types/catalog';

interface HeaderProps {
  settings: StoreSettings;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onOpenSettingsModal: () => void;
  snowEnabled: boolean;
  onToggleSnow: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  isAdmin,
  onToggleAdmin,
  onOpenSettingsModal,
  snowEnabled,
  onToggleSnow,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/95 border-b-4 border-red-600 shadow-[0_3px_0_0_#16a34a,0_8px_20px_rgba(220,38,38,0.15)] transition-all duration-200">
      
      {/* Christmas fairy lights garland hanging from the top */}
      <div className="relative w-full h-3 flex items-center justify-between px-3 overflow-hidden pointer-events-none bg-gradient-to-r from-red-50 via-emerald-50 to-red-50">
        <svg className="absolute top-0 left-0 w-full h-4 text-emerald-700" preserveAspectRatio="none" viewBox="0 0 1000 20">
          <path d="M 0 5 Q 50 18 100 5 T 200 5 T 300 5 T 400 5 T 500 5 T 600 5 T 700 5 T 800 5 T 900 5 T 1000 5" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </svg>
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-twinkle-1 shadow-[0_0_8px_#dc2626] z-10" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-twinkle-2 shadow-[0_0_8px_#16a34a] z-10" />
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-twinkle-3 shadow-[0_0_8px_#dc2626] z-10" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-twinkle-4 shadow-[0_0_8px_#16a34a] z-10" />
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-twinkle-1 shadow-[0_0_8px_#dc2626] z-10" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-twinkle-2 shadow-[0_0_8px_#16a34a] z-10" />
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-twinkle-3 shadow-[0_0_8px_#dc2626] z-10" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-twinkle-4 shadow-[0_0_8px_#16a34a] z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-22 flex items-center justify-between gap-3">
        
        {/* Esquina superior izquierda: Contenedor para el Logo de la empresa (Primera imagen adjuntada) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="relative group">
            {settings.logoUrl ? (
              <div className="relative p-1 rounded-2xl bg-white border-2 border-red-600 ring-2 ring-emerald-600 shadow-md transition-transform hover:scale-102 flex items-center justify-center">
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
            <span className="font-cursive-title text-2xl font-bold bg-gradient-to-r from-red-600 via-emerald-600 to-red-600 bg-clip-text text-transparent leading-none">
              Ballón Dulces Khloe
            </span>
            <span className="font-cursive-body text-base text-emerald-700 font-bold tracking-wide">
              Festejos &amp; Decoraciones Navideñas ✨
            </span>
          </div>
        </div>

        {/* Esquina superior derecha: Título "Catálogo Online" en tipografía cursiva festiva con colores rojo y verde */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col items-end text-right">
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-xl">🎄</span>
              <h1 className="font-cursive-title text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wide bg-gradient-to-r from-red-600 via-emerald-600 to-red-600 bg-clip-text text-transparent select-none">
                Catálogo Online
              </h1>
              <span className="text-base sm:text-xl">🎀</span>
            </div>
            <span className="font-cursive-body text-sm sm:text-lg text-emerald-800 font-bold">
              Presupuestos Navideños vía WhatsApp 🎁
            </span>
          </div>

          {/* Toggle Snow Button + Admin Button */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleSnow}
              className={`p-2 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all flex items-center gap-1 shadow-sm ${
                snowEnabled
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-800 ring-1 ring-red-500'
                  : 'bg-white border-slate-300 text-slate-600'
              }`}
              title={snowEnabled ? 'Desactivar nieve' : 'Activar nieve navideña'}
            >
              <span>❄️</span>
              <span className="hidden lg:inline font-cursive-body">Nieve</span>
            </button>

            {isAdmin && (
              <button
                onClick={onOpenSettingsModal}
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 border-2 border-emerald-600 hover:bg-emerald-100 transition-colors flex items-center gap-1.5 shadow-sm font-cursive-body"
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
                  <ShieldAlert className="w-4 h-4 text-emerald-600" />
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
