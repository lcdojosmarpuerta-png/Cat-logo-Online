import React, { useState, useRef } from 'react';
import { X, Save, UploadCloud, RotateCcw, Phone, Shield, Sparkles, Building, Globe, Download, Upload } from 'lucide-react';
import { StoreSettings, Product, Banner, Category } from '../types/catalog';
import { uploadImageToWeb, isValidWebUrl } from '../utils/imageUpload';

interface AdminSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: StoreSettings;
  products?: Product[];
  banners?: Banner[];
  categories?: Category[];
  onSaveSettings: (settings: StoreSettings) => void;
  onResetFactoryData: () => void;
  onImportFullData?: (data: { products?: Product[]; banners?: Banner[]; categories?: Category[]; settings?: StoreSettings }) => void;
}

export const AdminSettingsModal: React.FC<AdminSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  products = [],
  banners = [],
  categories = [],
  onSaveSettings,
  onResetFactoryData,
  onImportFullData,
}) => {
  const [companyName, setCompanyName] = useState(settings.companyName);
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [adminPin, setAdminPin] = useState(settings.adminPin);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadStatus('Subiendo logo a la red...');
      const { url, isOnline } = await uploadImageToWeb(file);
      setLogoUrl(url);
      setUploadStatus(isOnline ? '✓ Logo guardado en la red' : '✓ Logo cargado');
    } catch (err) {
      console.error('Error al subir logo:', err);
      alert('Error al procesar el logo seleccionado.');
      setUploadStatus(null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleExportData = () => {
    const exportObject = {
      version: '3.0',
      exportedAt: new Date().toISOString(),
      company: companyName,
      settings: {
        ...settings,
        companyName,
        logoUrl,
        whatsappNumber,
        adminPin,
      },
      categories,
      banners,
      products,
    };
    const jsonStr = JSON.stringify(exportObject, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `catalogo_ballon_dulces_khloe_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (onImportFullData && confirm('¿Deseas importar este catálogo y reemplazar los datos actuales?')) {
          onImportFullData(parsed);
          alert('¡Catálogo importado exitosamente!');
          onClose();
        }
      } catch (err) {
        console.error('Error al importar:', err);
        alert('El archivo seleccionado no es un JSON de catálogo válido.');
      }
    };
    reader.readAsText(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings({
      ...settings,
      companyName: companyName.trim() || 'Ballón Dulces Khloe',
      logoUrl,
      whatsappNumber: whatsappNumber.trim() || '584245104245',
      adminPin: adminPin.trim() || '1234',
    });
    alert('¡Configuración guardada exitosamente!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" />

      <div className="relative w-full max-w-lg bg-white border-2 border-pink-400 rounded-3xl p-5 sm:p-6 shadow-2xl z-10 max-h-[92vh] overflow-y-auto animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-pink-200">
          <div>
            <h3 className="font-cursive-title text-xl font-bold text-purple-900 flex items-center gap-1.5">
              <span>⚙️</span>
              <span>Ajustes de Tienda &amp; WhatsApp</span>
            </h3>
            <p className="font-cursive-body text-xs sm:text-sm text-pink-600 font-bold">
              Configura los datos del catálogo y gestiona las imágenes y copias online
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-3.5 text-xs sm:text-sm">
          {/* Company Name */}
          <div>
            <label className="block font-cursive-body text-xs sm:text-sm font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-pink-600" />
              <span>Nombre de la Empresa o Marca</span>
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ej. Ballón Dulces Khloe"
              className="w-full bg-white border border-pink-300 rounded-xl px-3 py-1.5 text-slate-900 placeholder-slate-400 outline-none focus:border-purple-500 font-bold"
            />
          </div>

          {/* Logo Upload with Online persistence */}
          <div>
            <label className="block font-cursive-body text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
              Logo de la Empresa (Esquina Superior Izquierda)
            </label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-slate-50 border border-pink-300 overflow-hidden flex items-center justify-center shrink-0 p-1">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                ) : (
                  <Sparkles className="w-6 h-6 text-pink-500" />
                )}
              </div>

              <div className="flex-1 space-y-1">
                <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm disabled:opacity-50"
                >
                  {isUploading ? <Globe className="w-3.5 h-3.5 animate-spin" /> : <UploadCloud className="w-3.5 h-3.5" />}
                  <span>{isUploading ? 'Subiendo logo a la red...' : 'Subir Logo a la Red (Online)'}</span>
                </button>
                
                <input
                  type="text"
                  placeholder="O URL directa (https://...)"
                  value={logoUrl.startsWith('data:') ? '' : logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full bg-white border border-pink-200 rounded-xl px-2.5 py-1 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-purple-500 font-bold"
                />

                {uploadStatus && (
                  <p className="text-[11px] font-bold text-emerald-600">{uploadStatus}</p>
                )}
                {logoUrl && (
                  <button
                    type="button"
                    onClick={() => setLogoUrl('/assets/aistudio/IMG-20261012-WA0008_94da2846.jpg')}
                    className="text-[11px] font-bold text-pink-600 hover:underline block"
                  >
                    Restaurar logo oficial de Ballón Dulces Khloe
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* WhatsApp Destination Phone Number */}
          <div>
            <label className="block font-cursive-body text-xs sm:text-sm font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Número de WhatsApp para Recibir Cotizaciones *</span>
            </label>
            <input
              type="text"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="Ej. 584245104245 (código de país + número)"
              className="w-full bg-white border border-emerald-500 rounded-xl px-3 py-1.5 text-slate-900 font-mono-nums placeholder-slate-400 outline-none focus:border-purple-500 font-bold"
            />
            <span className="text-[11px] text-slate-500 font-bold mt-0.5 block">
              Coloca el número completo con código de país sin espacios ni signos + (ej: 584245104245).
            </span>
          </div>

          {/* Admin PIN */}
          <div>
            <label className="block font-cursive-body text-xs sm:text-sm font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-purple-600" />
              <span>PIN de Administrador</span>
            </label>
            <input
              type="text"
              value={adminPin}
              onChange={(e) => setAdminPin(e.target.value)}
              placeholder="1234"
              className="w-full bg-white border border-purple-300 rounded-xl px-3 py-1.5 text-slate-900 font-mono-nums placeholder-slate-400 outline-none focus:border-pink-500 font-bold"
            />
          </div>

          {/* Sincronización / Respaldar Catálogo Online */}
          <div className="pt-2.5 border-t border-dashed border-pink-200 space-y-1.5">
            <span className="font-cursive-body text-xs sm:text-sm font-bold text-purple-900 block">
              Sincronización y Respaldo del Catálogo
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleExportData}
                className="py-1.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                title="Descargar copia del catálogo en formato JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar (JSON)</span>
              </button>

              <input
                type="file"
                ref={importInputRef}
                onChange={handleImportFile}
                accept=".json"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => importInputRef.current?.click()}
                className="py-1.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                title="Cargar copia del catálogo desde archivo JSON"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Importar (JSON)</span>
              </button>
            </div>
          </div>

          {/* Factory Reset Option */}
          <div className="pt-2 border-t border-dashed border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-cursive-body text-xs font-bold text-slate-700 block">Restablecer Datos de Catálogo</span>
                <span className="text-[10px] text-slate-500 font-bold">Restaura los arreglos y banners originales</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm('¿Restablecer todo el catálogo y banners a sus valores iniciales?')) {
                    onResetFactoryData();
                    onClose();
                  }
                }}
                className="px-2.5 py-1 rounded-xl bg-red-50 text-red-700 border border-red-300 hover:bg-red-100 text-xs font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reiniciar</span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar Ajustes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
