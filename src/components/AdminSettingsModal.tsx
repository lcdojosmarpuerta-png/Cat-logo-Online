import React, { useState, useRef } from 'react';
import { X, Save, UploadCloud, RotateCcw, Phone, Shield, Sparkles, Building, DollarSign } from 'lucide-react';
import { StoreSettings } from '../types/catalog';
import { compressImageFile } from '../utils/storage';

interface AdminSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: StoreSettings;
  onSaveSettings: (settings: StoreSettings) => void;
  onResetFactoryData: () => void;
}

export const AdminSettingsModal: React.FC<AdminSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  onResetFactoryData,
}) => {
  const [companyName, setCompanyName] = useState(settings.companyName);
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [currencySymbol, setCurrencySymbol] = useState(settings.currencySymbol);
  const [adminPin, setAdminPin] = useState(settings.adminPin);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const dataUrl = await compressImageFile(file, 600, 0.9);
      setLogoUrl(dataUrl);
    } catch (err) {
      console.error('Error al subir logo:', err);
      alert('Error al procesar el logo seleccionado.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings({
      ...settings,
      companyName: companyName.trim() || 'Ballón Dulces Khloe',
      logoUrl,
      whatsappNumber: whatsappNumber.trim() || '584245104245',
      currencySymbol: currencySymbol.trim() || '$',
      adminPin: adminPin.trim() || '1234',
    });
    alert('¡Configuración guardada exitosamente!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" />

      <div className="relative w-full max-w-lg bg-white border-3 border-red-600 ring-4 ring-emerald-600 rounded-3xl p-6 sm:p-7 shadow-2xl z-10 max-h-[92vh] overflow-y-auto animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-red-500">
          <div>
            <h3 className="font-cursive-title text-2xl font-bold text-red-700 flex items-center gap-2">
              <span>🎅</span>
              <span>Ajustes de Tienda &amp; WhatsApp</span>
            </h3>
            <p className="font-cursive-body text-base text-emerald-800 font-bold">Personaliza los datos del negocio y número de cotizaciones</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-700 border-2 border-red-600 ring-1 ring-emerald-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-sm">
          {/* Company Name */}
          <div>
            <label className="block font-cursive-body text-base font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-red-600" />
              <span>Nombre de la Empresa o Marca</span>
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ej. Ballón Dulces Khloe"
              className="w-full bg-white border-2 border-red-500 rounded-xl px-3.5 py-2 text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-600 font-bold"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block font-cursive-body text-base font-bold text-slate-800 mb-2">
              Logo de la Empresa (Esquina Superior Izquierda)
            </label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-slate-50 border-2 border-emerald-600 ring-1 ring-red-500 overflow-hidden flex items-center justify-center shrink-0 p-1">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                ) : (
                  <Sparkles className="w-6 h-6 text-red-600" />
                )}
              </div>

              <div className="flex-1 space-y-1.5">
                <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-colors border border-red-500"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>{isUploading ? 'Procesando...' : 'Subir Imagen de Logo'}</span>
                </button>
                {logoUrl && (
                  <button
                    type="button"
                    onClick={() => setLogoUrl('/assets/aistudio/IMG-20261012-WA0008_94da2846.jpg')}
                    className="text-xs font-bold text-red-600 hover:underline block"
                  >
                    Restaurar logo original de Ballón Dulces Khloe
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* WhatsApp Destination Phone Number */}
          <div>
            <label className="block font-cursive-body text-base font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Número de WhatsApp para Recibir Presupuestos *</span>
            </label>
            <input
              type="text"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="Ej. 584245104245 (código de país + número)"
              className="w-full bg-white border-2 border-emerald-600 rounded-xl px-3.5 py-2 text-slate-900 font-mono-nums placeholder-slate-400 outline-none focus:border-red-600 font-bold"
            />
            <span className="text-xs text-slate-600 font-bold mt-0.5 block">
              Coloca el número completo con código internacional sin espacios ni signos + (ej: 584245104245).
            </span>
          </div>

          {/* Currency Symbol & Admin PIN */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-cursive-body text-base font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-red-600" />
                <span>Moneda</span>
              </label>
              <input
                type="text"
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
                placeholder="$, Bs., €"
                className="w-full bg-white border-2 border-red-500 rounded-xl px-3.5 py-2 text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-600 font-bold"
              />
            </div>

            <div>
              <label className="block font-cursive-body text-base font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>PIN Admin</span>
              </label>
              <input
                type="text"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="1234"
                className="w-full bg-white border-2 border-emerald-600 rounded-xl px-3.5 py-2 text-slate-900 font-mono-nums placeholder-slate-400 outline-none focus:border-red-600 font-bold"
              />
            </div>
          </div>

          {/* Factory Reset Option */}
          <div className="pt-3 border-t-2 border-dashed border-red-300">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-cursive-body text-base font-bold text-slate-800 block">Restablecer Datos de Demostración</span>
                <span className="text-xs text-slate-600 font-bold">Recupera los productos, banners y categorías iniciales</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm('¿Restablecer todo el catálogo y banners a sus valores de fábrica?')) {
                    onResetFactoryData();
                    onClose();
                  }
                }}
                className="p-2 rounded-xl bg-red-50 text-red-700 border-2 border-red-600 hover:bg-red-100 text-xs font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-300"
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white font-bold text-base flex items-center gap-1.5 shadow-lg border-2 border-red-600 ring-1 ring-emerald-600"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Ajustes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
