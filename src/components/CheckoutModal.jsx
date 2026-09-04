import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle, ShieldCheck, CreditCard, Lock, Truck, Sparkles, Box } from 'lucide-react';

export const CheckoutModal = ({ isOpen, onClose, cartItems, onClearCart }) => {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    name: 'Lord Arthur Sterling',
    email: 'sterling@luxuryartisan.com',
    address: '742 Evergreen Terrace, Suite 400',
    city: 'Beverly Hills',
    zip: '90210',
    deliverySlot: 'Tomorrow 9:00 AM - 12:00 PM Express',
    paymentMethod: 'card'
  });
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.calculatedPrice || item.price;
    return acc + (itemPrice * (item.quantity || 1));
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedId = `PRIME-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');

    // Trigger Luxury Gold & Crimson Confetti Explosion!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e5b869', '#e61e38', '#ffffff', '#f7d794']
    });

    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      <div className="relative w-full max-w-2xl bg-obsidian-950 border-2 border-gold-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 text-slate-100">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-obsidian-900/90">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-gold-400" />
            <h3 className="text-xl font-bold font-display text-white">
              {step === 'form' ? 'Express Checkout' : 'Order Confirmed!'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Form */}
        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Delivery Contact Info */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center gap-2">
                <Truck className="w-4 h-4" /> Refrigerated Express Shipping Address
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-obsidian-900 border border-white/10 rounded-xl p-2.5 text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Email (For Tracking)</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-obsidian-900 border border-white/10 rounded-xl p-2.5 text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-obsidian-900 border border-white/10 rounded-xl p-2.5 text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Time Slot */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">Select Cold-Chain Delivery Slot</label>
              <select
                value={formData.deliverySlot}
                onChange={(e) => setFormData({ ...formData, deliverySlot: e.target.value })}
                className="w-full bg-obsidian-900 border border-white/10 rounded-xl p-2.5 text-xs text-gold-300 font-mono focus:outline-none focus:border-gold-400"
              >
                <option>Tomorrow 9:00 AM - 12:00 PM Express (Guaranteed Dry-Ice)</option>
                <option>Friday Morning 8:00 AM - 11:00 AM Slot</option>
                <option>Saturday Morning 10:00 AM - 1:00 PM Weekend Feast</option>
              </select>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300">Payment Option</label>
              <div className="grid grid-cols-3 gap-2">
                {['card', 'apple', 'crypto'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: method })}
                    className={`py-3 px-2 rounded-xl text-xs font-bold uppercase border transition-all ${
                      formData.paymentMethod === method
                        ? 'bg-crimson-600 border-crimson-400 text-white shadow-glow-crimson'
                        : 'bg-obsidian-900 text-slate-400 border-white/10 hover:border-gold-400'
                    }`}
                  >
                    {method === 'card' && 'Credit Card'}
                    {method === 'apple' && 'Apple Pay'}
                    {method === 'crypto' && 'Crypto / BTC'}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-crimson-600 via-crimson-700 to-crimson-800 text-white font-bold text-xs uppercase tracking-widest shadow-glow-crimson hover:scale-[1.02] transition-all flex items-center justify-center gap-2 border border-crimson-400/50"
            >
              <Lock className="w-4 h-4 text-gold-300" />
              <span>Confirm & Pay (${subtotal}.00)</span>
            </button>
          </form>
        ) : (
          /* Step 2: Success Receipt */
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-600/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-gold animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-display text-white">Thank You For Your Order!</h3>
              <p className="text-xs text-slate-400">Order Reference Number:</p>
              <span className="px-4 py-1.5 rounded-full bg-obsidian-900 border border-gold-500/40 text-gold-300 font-mono font-bold text-sm inline-block">
                {orderId}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-obsidian-900 border border-white/10 text-xs text-slate-300 text-left space-y-2 font-mono">
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="text-white">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Arrival:</span>
                <span className="text-gold-400 font-bold">{formData.deliverySlot}</span>
              </div>
              <div className="flex justify-between">
                <span>Packaging:</span>
                <span className="text-emerald-400">Sub-Zero Dry Ice Box</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-crimson-600 to-crimson-800 text-white font-bold text-xs uppercase tracking-widest shadow-glow-crimson"
            >
              Back To Vault
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
