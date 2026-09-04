import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, ArrowRight, Sparkles, Tag } from 'lucide-react';

export const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onProceedCheckout }) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.calculatedPrice || item.price;
    return acc + (itemPrice * (item.quantity || 1));
  }, 0);

  const discountAmount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const shippingFee = subtotal >= 150 ? 0 : 25;
  const grandTotal = subtotal - discountAmount + shippingFee;

  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'PRIME10') {
      setDiscountApplied(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-obsidian-950 border-l border-gold-500/30 text-white shadow-2xl flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-obsidian-900/80">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h2 className="text-lg font-bold font-display tracking-wider text-white">Your Meat Vault</h2>
              <span className="px-2 py-0.5 rounded-full bg-crimson-600 text-xs font-mono font-bold">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-3 bg-obsidian-900 border-b border-white/5 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-gold-400" /> Express Cold Shipping
              </span>
              <span className="text-gold-300 font-bold">
                {subtotal >= 150 ? 'FREE SHIPPED!' : `$${150 - subtotal} Away From Free`}
              </span>
            </div>
            <div className="w-full bg-obsidian-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-gold-500 to-crimson-500 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-slate-400 text-sm">Your 3D Meat Vault is currently empty.</p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-crimson-600 text-white font-bold text-xs uppercase shadow-glow-crimson"
                >
                  Explore Cuts Catalog
                </button>
              </div>
            ) : (
              cartItems.map((item, index) => {
                const itemPrice = item.calculatedPrice || item.price;
                return (
                  <div
                    key={`${item.id}-${index}`}
                    className="glass-panel p-3.5 rounded-2xl border border-white/10 flex items-center justify-between gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-white/10"
                    />
                    
                    <div className="flex-1 space-y-1">
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                      {item.customThickness && (
                        <p className="text-[10px] text-slate-400 font-mono">
                          {item.customThickness}" Cut • {item.customAging}D Aged
                        </p>
                      )}
                      <div className="text-xs font-mono font-bold text-gold-400">
                        ${itemPrice * (item.quantity || 1)}.00
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-obsidian-950 px-2 py-1 rounded-xl border border-white/10">
                        <button
                          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-white px-1">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-500 hover:text-crimson-400 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Cart Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-obsidian-900/90 space-y-4">
              {/* Promo Code Entry */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Promo Code (PRIME10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-obsidian-950 border border-white/10 rounded-xl py-2 pl-8 pr-3 text-xs text-white uppercase font-mono placeholder-slate-500 focus:outline-none focus:border-gold-400"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 rounded-xl bg-obsidian-800 text-gold-300 hover:bg-gold-500 hover:text-obsidian-950 text-xs font-bold transition-all border border-gold-500/40"
                >
                  Apply
                </button>
              </div>

              {discountApplied && (
                <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> 10% VIP Promo Applied (-${discountAmount}.00)
                </p>
              )}

              {/* Summary Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal}.00</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount (10%):</span>
                    <span>-${discountAmount}.00</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Refrigerated Delivery:</span>
                  <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee}.00`}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-base font-black text-white">
                  <span>Grand Total:</span>
                  <span className="text-gold-gradient">${grandTotal}.00</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedCheckout}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-crimson-600 via-crimson-700 to-crimson-800 text-white font-bold text-xs uppercase tracking-widest shadow-glow-crimson hover:scale-[1.02] transition-all flex items-center justify-center gap-2 border border-crimson-400/50"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight className="w-4 h-4 text-gold-300" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
