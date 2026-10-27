import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, Send, User, FileText } from 'lucide-react';
import { CartItem, StoreSettings } from '../types/catalog';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  settings: StoreSettings;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  settings,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);

  if (!isOpen) return null;

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCost = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleSendBudget = () => {
    if (cart.length === 0) return;

    const rawPhone = settings.whatsappNumber || '584245104245';
    const cleanPhone = rawPhone.replace(/\D/g, '');

    let message = `🎄✨ *SOLICITUD DE PRESUPUESTO NAVIDEÑO* ✨🎄\n`;
    message += `🎈 *BALLÓN DULCES KHLOE - FESTEJOS Y DECORACIONES* 🎈\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    if (customerName.trim()) {
      message += `👤 *Cliente:* ${customerName.trim()}\n`;
    }
    const today = new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    message += `📅 *Fecha:* ${today}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `📋 *DETALLE DE PEDIDO:* \n\n`;

    cart.forEach((item, idx) => {
      const itemSubtotal = item.product.price * item.quantity;
      message += `${idx + 1}. *${item.product.name}*\n`;
      message += `   • Cantidad: ${item.quantity} ${item.product.unit || 'u.'}\n`;
      message += `   • Precio: ${settings.currencySymbol}${item.product.price.toLocaleString('es-ES')}\n`;
      message += `   • Subtotal: ${settings.currencySymbol}${itemSubtotal.toLocaleString('es-ES')}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL ESTIMADO: ${settings.currencySymbol}${totalCost.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

    if (customerNotes.trim()) {
      message += `\n📝 *Notas / Fecha del Evento:* ${customerNotes.trim()}\n`;
    }

    message += `\n_Enviado desde el Catálogo Online de Ballón Dulces Khloe._\n¡Quedo a la espera de su respuesta para coordinar los detalles! 🎅🎉`;

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

      {/* Drawer Container with White Background and Red/Green Border */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white border-l-4 border-red-600 shadow-[-4px_0_0_0_#16a34a,-12px_0_30px_rgba(0,0,0,0.2)] flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-3.5 sm:p-4 border-b-2 border-red-600 ring-1 ring-emerald-600 flex items-center justify-between bg-gradient-to-r from-red-50/70 via-white to-emerald-50/70">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white border-2 border-red-600 ring-1 ring-emerald-600 flex items-center justify-center text-xl shadow-sm">
                🎁
              </div>
              <div>
                <h3 className="font-cursive-title text-lg sm:text-xl font-bold text-red-700 leading-tight">
                  Carrito de Presupuesto Navideño
                </h3>
                <span className="font-cursive-body text-xs sm:text-sm text-emerald-800 font-bold">
                  {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'} seleccionados ✨
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {cart.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('¿Vaciar todo el carrito?')) onClearCart();
                  }}
                  title="Vaciar carrito"
                  className="font-cursive-body text-xs font-bold text-red-600 hover:text-red-800 px-1.5 py-0.5 rounded transition-colors"
                >
                  Vaciar
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white hover:bg-red-50 text-red-700 flex items-center justify-center transition-colors border-2 border-red-600 ring-1 ring-emerald-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-white">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-700">
                <div className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-600 ring-2 ring-emerald-600 flex items-center justify-center text-4xl mb-3 shadow-inner">
                  🛍️
                </div>
                <h4 className="font-cursive-title text-2xl font-bold text-red-700 mb-1">
                  Tu carrito navideño está vacío
                </h4>
                <p className="font-cursive-body text-base text-slate-700 font-bold max-w-xs mb-4">
                  Explora las decoraciones, arcos y mesas dulces de Ballón Dulces Khloe para armar tu presupuesto.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-emerald-600 text-white font-cursive-body text-base font-bold hover:from-red-500 hover:to-emerald-500 shadow-lg border-2 border-white"
                >
                  Ver Opciones Navideñas 🎄
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <div
                    key={item.product.id}
                    className="p-3 rounded-2xl bg-white border-2 border-red-600 ring-1 ring-emerald-600 flex items-center gap-3 transition-colors hover:bg-red-50/30 shadow-sm"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover bg-slate-50 border-2 border-emerald-500 shrink-0"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-cursive-title text-sm sm:text-base font-bold text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="font-cursive-title text-sm text-emerald-700 font-bold">
                          {settings.currencySymbol}
                          {item.product.price.toLocaleString('es-ES')}
                        </span>
                        {item.product.unit && (
                          <span className="font-cursive-body text-[10px] text-slate-600 font-bold">/{item.product.unit}</span>
                        )}
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div className="flex items-center bg-white border-2 border-red-600 ring-1 ring-emerald-600 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-5 h-5 rounded bg-red-50 hover:bg-red-100 text-red-700 flex items-center justify-center text-[10px]"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="w-6 text-center font-cursive-title text-sm font-bold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-5 h-5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        <span className="font-cursive-title text-base font-bold text-red-700 ml-auto">
                          {settings.currencySymbol}
                          {itemTotal.toLocaleString('es-ES')}
                        </span>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1 rounded text-red-600 hover:text-red-800 transition-colors"
                          title="Eliminar ítem"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Optional Customer info */}
            {cart.length > 0 && (
              <div className="pt-2 space-y-2">
                <div className="p-3 rounded-2xl bg-slate-50 border-2 border-emerald-600 ring-1 ring-red-500 space-y-2">
                  <div className="flex items-center gap-1.5 font-cursive-body text-xs sm:text-sm font-bold text-slate-800">
                    <User className="w-3.5 h-3.5 text-red-600" />
                    <span>Tu Nombre o Motivo del Evento (Opcional):</span>
                  </div>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej. Cumpleaños de Sofía / Cena Navideña"
                    className="w-full bg-white border-2 border-red-500 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-600 font-cursive-body font-bold"
                  />

                  <div className="flex items-center gap-1.5 font-cursive-body text-xs sm:text-sm font-bold text-slate-800 pt-1">
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Fecha del Evento o Detalles Especiales (Opcional):</span>
                  </div>
                  <input
                    type="text"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="Ej. Sábado 20 de Diciembre, temática princesas..."
                    className="w-full bg-white border-2 border-emerald-500 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-red-600 font-cursive-body font-bold"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer & Actions */}
          {cart.length > 0 && (
            <div className="p-3.5 sm:p-4 border-t-2 border-red-600 ring-1 ring-emerald-600 bg-gradient-to-r from-red-50/60 via-white to-emerald-50/60 space-y-2.5">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-cursive-body text-xs sm:text-sm text-slate-800 font-bold block">Total Estimado</span>
                  <span className="font-cursive-body text-[10px] sm:text-xs text-emerald-700 font-bold">Montaje y traslados a coordinar</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs sm:text-sm font-bold text-emerald-700">{settings.currencySymbol}</span>
                  <span className="font-cursive-title text-2xl sm:text-3xl font-black text-red-700">
                    {totalCost.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Action Button: Solicitar Presupuesto */}
              <button
                onClick={handleSendBudget}
                className="w-full py-2.5 sm:py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-red-600 to-emerald-600 hover:from-emerald-500 hover:to-red-500 text-white font-cursive-title text-base sm:text-lg font-bold flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(22,163,74,0.3)] active:scale-98 transition-all border-2 border-red-600 ring-2 ring-emerald-600"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>Solicitar Presupuesto vía WhatsApp 💬</span>
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
          <div className="relative w-full max-w-md bg-white border-3 border-emerald-600 ring-4 ring-red-600 rounded-3xl p-5 sm:p-6 shadow-2xl z-10 text-center animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-600 ring-2 ring-red-600 flex items-center justify-center mx-auto mb-3 text-3xl shadow-inner">
              🎄
            </div>

            <h3 className="font-cursive-title text-xl sm:text-2xl font-extrabold text-red-700 mb-2 leading-snug">
              ¡Presupuesto Enviado con Éxito!
            </h3>

            {/* Texto exacto requerido por el usuario */}
            <p className="font-cursive-body text-base sm:text-lg text-emerald-900 font-bold mb-4 bg-emerald-50 border-2 border-emerald-600 ring-1 ring-red-500 rounded-2xl p-3 leading-relaxed">
              ¡Su pedido ya fue enviado y pronto será atendido por nuestro personal!
            </p>

            <p className="font-cursive-body text-xs sm:text-sm text-slate-700 font-bold mb-4">
              Se ha abierto WhatsApp para que converses directamente con el equipo de Ballón Dulces Khloe. 🎈✨
            </p>

            <button
              onClick={handleFinishOrder}
              className="w-full py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white font-cursive-title text-base sm:text-lg font-bold shadow-md transition-all border-2 border-red-600 ring-2 ring-emerald-600"
            >
              Aceptar y Volver al Catálogo 🎁
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
