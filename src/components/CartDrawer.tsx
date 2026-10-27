import React, { useState } from 'react';
import { X, Trash2, Send, User, FileText, Sparkles } from 'lucide-react';
import { CartItem, StoreSettings } from '../types/catalog';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  settings: StoreSettings;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  settings,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);

  if (!isOpen) return null;

  const totalItems = cart.length;

  const handleSendBudget = () => {
    if (cart.length === 0) return;

    const rawPhone = settings.whatsappNumber || '584245104245';
    const cleanPhone = rawPhone.replace(/\D/g, '');

    let message = `🎈 *BALLÓN DULCES KHLOE - FESTEJOS Y DECORACIONES* 🎈\n`;
    message += `✨ *SOLICITUD DE COTIZACIÓN* ✨\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    if (customerName.trim()) {
      message += `👤 *Cliente:* ${customerName.trim()}\n`;
    }
    const today = new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    message += `📅 *Fecha:* ${today}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `📋 *ARREGLOS Y SERVICIOS DE INTERÉS:*\n\n`;

    cart.forEach((item, idx) => {
      message += `${idx + 1}. *${item.product.name}*\n`;
      message += `   • Categoría: ${item.product.category}\n`;
      if (item.product.description) {
        message += `   • Detalle: ${item.product.description}\n`;
      }
      message += `\n`;
    });

    if (customerNotes.trim()) {
      message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `📝 *Fecha del Evento / Notas:* ${customerNotes.trim()}\n`;
    }

    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `_Enviado desde el Catálogo Online de Ballón Dulces Khloe._\n`;
    message += `¡Hola! Me gustaría cotizar la disponibilidad y presupuesto para estos arreglos. ¡Muchas gracias! ✨`;

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    setShowConfirmationAlert(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFinishOrder = () => {
    setShowConfirmationAlert(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container with Brand Styling */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l-4 border-pink-500 shadow-[-10px_0_30px_rgba(244,114,182,0.2)] flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-3.5 sm:p-4 border-b border-pink-200 flex items-center justify-between bg-gradient-to-r from-pink-50/70 via-white to-sky-50/70">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white border border-pink-300 flex items-center justify-center text-lg shadow-sm">
                🎈
              </div>
              <div>
                <h3 className="font-cursive-title text-lg sm:text-xl font-bold text-purple-900 leading-tight">
                  Lista de Cotización
                </h3>
                <span className="font-cursive-body text-xs sm:text-sm text-pink-600 font-bold">
                  {totalItems} {totalItems === 1 ? 'arreglo seleccionado' : 'arreglos seleccionados'} ✨
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {cart.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('¿Vaciar la lista de cotización?')) onClearCart();
                  }}
                  title="Vaciar lista"
                  className="font-cursive-body text-xs font-bold text-red-500 hover:text-red-700 px-1.5 py-0.5 rounded transition-colors"
                >
                  Vaciar
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white hover:bg-pink-50 text-slate-700 flex items-center justify-center transition-colors border border-pink-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Cart Item List (NO price, NO quantity selector) */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-2.5 bg-white">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-700">
                <div className="w-16 h-16 rounded-full bg-pink-50 border border-pink-300 flex items-center justify-center text-3xl mb-3 shadow-inner">
                  🎈
                </div>
                <h4 className="font-cursive-title text-xl font-bold text-purple-900 mb-1">
                  Tu lista de cotización está vacía
                </h4>
                <p className="font-cursive-body text-xs sm:text-sm text-slate-600 font-bold max-w-xs mb-4">
                  Explora las decoraciones, arcos y mesas dulces de Ballón Dulces Khloe para cotizar tu evento.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-cursive-body text-xs sm:text-sm font-bold shadow-md border border-white"
                >
                  Explorar Arreglos ✨
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-2.5 rounded-2xl bg-white border border-pink-200 flex items-center gap-2.5 transition-colors hover:bg-pink-50/30 shadow-sm"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover bg-slate-50 border border-pink-300 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <span className="font-cursive-body text-[10px] text-purple-600 font-bold block leading-none mb-0.5">
                      {item.product.category}
                    </span>
                    <h4 className="font-cursive-title text-sm sm:text-base font-bold text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                  </div>

                  {/* Single Remove Button (NO quantity selector) */}
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                    title="Quitar de la lista"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}

            {/* Optional Customer info */}
            {cart.length > 0 && (
              <div className="pt-2 space-y-2">
                <div className="p-3 rounded-2xl bg-slate-50 border border-pink-200 space-y-2">
                  <div className="flex items-center gap-1.5 font-cursive-body text-xs sm:text-sm font-bold text-slate-800">
                    <User className="w-3.5 h-3.5 text-pink-600" />
                    <span>Tu Nombre o Motivo del Evento (Opcional):</span>
                  </div>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej. Cumpleaños de Sofía / Bautizo"
                    className="w-full bg-white border border-pink-300 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-purple-500 font-cursive-body font-bold"
                  />

                  <div className="flex items-center gap-1.5 font-cursive-body text-xs sm:text-sm font-bold text-slate-800 pt-1">
                    <FileText className="w-3.5 h-3.5 text-purple-600" />
                    <span>Fecha del Evento o Detalles Especiales (Opcional):</span>
                  </div>
                  <input
                    type="text"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="Ej. Sábado 15 de Noviembre, temática princesa..."
                    className="w-full bg-white border border-purple-300 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-pink-500 font-cursive-body font-bold"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer & Actions (NO price/subtotal/total) */}
          {cart.length > 0 && (
            <div className="p-3.5 sm:p-4 border-t border-pink-200 bg-gradient-to-r from-pink-50/50 via-white to-purple-50/50 space-y-2">
              <div className="flex items-center justify-between font-cursive-body text-xs font-bold text-slate-600">
                <span>{totalItems} {totalItems === 1 ? 'servicio seleccionado' : 'servicios seleccionados'}</span>
                <span className="text-purple-600">Disponibilidad a coordinar</span>
              </div>

              {/* Action Button: Solicitar Cotización */}
              <button
                onClick={handleSendBudget}
                className="w-full py-2.5 sm:py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-sky-600 hover:from-pink-500 hover:to-sky-500 text-white font-cursive-title text-base sm:text-lg font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all border border-white"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>Solicitar Cotización por WhatsApp 💬</span>
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Confirmation Screen Alert with exact requested text */}
      {showConfirmationAlert && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            onClick={handleFinishOrder}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md bg-white border-2 border-pink-400 rounded-3xl p-5 sm:p-6 shadow-2xl z-10 text-center animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-pink-50 border border-pink-300 flex items-center justify-center mx-auto mb-3 text-3xl shadow-inner">
              🎈
            </div>

            <h3 className="font-cursive-title text-xl sm:text-2xl font-extrabold text-purple-900 mb-2 leading-snug">
              ¡Cotización Enviada con Éxito!
            </h3>

            {/* Texto exacto requerido por el usuario */}
            <p className="font-cursive-body text-base sm:text-lg text-pink-900 font-bold mb-4 bg-pink-50 border border-pink-300 rounded-2xl p-3 leading-relaxed">
              ¡Su pedido ya fue enviado y pronto será atendido por nuestro personal!
            </p>

            <p className="font-cursive-body text-xs sm:text-sm text-slate-600 font-bold mb-4">
              Se ha abierto WhatsApp para que converses directamente con el equipo de Ballón Dulces Khloe. ✨
            </p>

            <button
              onClick={handleFinishOrder}
              className="w-full py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-cursive-title text-base sm:text-lg font-bold shadow-md transition-all border border-white"
            >
              Aceptar y Volver al Catálogo 🎈
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
