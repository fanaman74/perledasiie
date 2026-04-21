import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOrder } from '../context/OrderContext';

export default function TakeawayPanel() {
  const { t } = useTranslation();
  const { items, removeItem, updateQuantity, total } = useOrder();
  const [isOpen, setIsOpen] = useState(false);

  function buildMailtoBody() {
    const lines = items.map(
      (item) => `${item.name} x${item.quantity} — ${(item.price * item.quantity).toFixed(2)}€`
    );
    lines.push('', `Total: ${total.toFixed(2)}€`);
    return encodeURIComponent(lines.join('\n'));
  }

  return (
    <>
      {/* Floating cart badge */}
      {items.length > 0 && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          aria-label="Open cart"
        >
          <svg className="w-6 h-6 text-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-alt text-bg text-xs rounded-full flex items-center justify-center font-bold">
            {items.reduce((sum, i) => sum + i.quantity, 0)}
          </span>
        </button>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-bg-alt z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-display text-xl italic">{t('order.title')}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-text-muted hover:text-text transition-colors"
            aria-label={t('order.close')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="text-text-muted text-center mt-12">{t('order.empty')}</p>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 pb-4 border-b border-border">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base truncate">{item.name}</h3>
                    <p className="text-text-muted text-sm">{(item.price * item.quantity).toFixed(2)}€</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded border border-border text-text-muted hover:text-text flex items-center justify-center text-sm"
                    >
                      -
                    </button>
                    <span className="text-sm w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded border border-border text-text-muted hover:text-text flex items-center justify-center text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border">
            <div className="flex items-center justify-between mb-6">
              <span className="text-text-muted uppercase text-sm tracking-wider">
                {t('order.total')}
              </span>
              <span className="font-display text-2xl text-accent">{total.toFixed(2)}€</span>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`mailto:info@lotus-laeken.be?subject=Commande%20Lotus&body=${buildMailtoBody()}`}
                className="block text-center border border-accent text-accent px-6 py-3 text-sm uppercase tracking-wider hover:bg-accent hover:text-bg transition-colors"
              >
                {t('order.emailOrder')}
              </a>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-accent-alt text-bg px-6 py-3 text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                {t('order.reserveOrder')}
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
