import React, { useState } from 'react';
import { BOX_PRESETS, PRODUCTS_DATA } from '../data/meatData';
import { Badge3D, StampSeal3D } from './ThreeDComponents';
import { Box, Package, Check, Plus, Minus, ShieldCheck, Sparkles, Truck } from 'lucide-react';

export const CustomBoxBuilder = ({ onAddBoxToCart }) => {
  const [selectedPreset, setSelectedPreset] = useState(BOX_PRESETS[1]); // Master Vault Box
  const [selectedItems, setSelectedItems] = useState([
    'wagyu-ribeye-a5',
    'dry-aged-tomahawk',
    'porterhouse-reserve',
    'wagyu-tenderloin-a5',
  ]);
  const [isSubscription, setIsSubscription] = useState(true);
  const [deliveryFrequency, setDeliveryFrequency] = useState('Monthly');

  const maxCapacity = selectedPreset.cutsCount;
  const currentCount = selectedItems.length;

  const toggleItem = (productId) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems(selectedItems.filter(id => id !== productId));
    } else {
      if (selectedItems.length < maxCapacity) {
        setSelectedItems([...selectedItems, productId]);
      }
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = selectedPreset.price;
    const subDiscount = isSubscription ? 0.85 : 1.0;
    return Math.round(basePrice * subDiscount);
  };

  const handleAddBox = () => {
    onAddBoxToCart({
      id: `custom-box-${Date.now()}`,
      name: `${selectedPreset.name} (${selectedItems.length} Cuts)`,
      presetName: selectedPreset.name,
      itemsCount: selectedItems.length,
      price: calculateTotalPrice(),
      isSubscription,
      frequency: isSubscription ? deliveryFrequency : 'One-Time',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      badge3D: selectedPreset.badge
    });
  };

  return (
    <section id="box-builder" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="flex justify-center">
          <Badge3D text="Sub-Zero Climate Box" type="gold" icon={Box} />
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
          CUSTOM <span className="text-gold-gradient">MEAT BOX</span> BUILDER
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Build your personalized insulated box. Save up to 25% on VIP cut bundles with guaranteed cold-chain delivery.
        </p>
      </div>

      {/* Preset Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {BOX_PRESETS.map((preset) => {
          const isSelected = selectedPreset.id === preset.id;
          return (
            <div
              key={preset.id}
              onClick={() => {
                setSelectedPreset(preset);
                setSelectedItems(preset.defaultItems.slice(0, preset.cutsCount));
              }}
              className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 border flex flex-col justify-between ${
                isSelected
                  ? 'glass-panel-gold border-gold-400 shadow-glow-gold scale-105'
                  : 'glass-panel border-white/10 hover:border-gold-500/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge3D text={preset.badge} type={isSelected ? 'gold' : 'silver'} />
                  <span className="text-xs font-mono text-crimson-400 font-bold bg-crimson-950/80 px-2.5 py-1 rounded-full border border-crimson-500/40">
                    SAVE {preset.savingsPercent}%
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-white mb-2">{preset.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{preset.recommendedFor}</p>

                <div className="text-3xl font-black font-mono text-gold-gradient mb-4">
                  ${preset.price}.00
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>Capacity: {preset.cutsCount} Cuts</span>
                <span className="text-gold-400 font-bold">Included Shipping</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Slot Selector */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-gold-400" /> Select Cuts For Your Box
                </h3>
                <p className="text-xs text-slate-400">Click cuts to fill your {maxCapacity}-cut box slots.</p>
              </div>

              {/* Live Capacity Meter */}
              <div className="flex items-center gap-3 bg-obsidian-950 px-4 py-2 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-400 font-semibold">Box Slots:</span>
                <div className="flex items-center gap-1.5 font-mono text-sm font-bold">
                  <span className={currentCount === maxCapacity ? 'text-emerald-400' : 'text-gold-400'}>
                    {currentCount}
                  </span>
                  <span className="text-slate-600">/</span>
                  <span className="text-white">{maxCapacity}</span>
                </div>
              </div>
            </div>

            {/* Cut Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {PRODUCTS_DATA.map((product) => {
                const isSelected = selectedItems.includes(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => toggleItem(product.id)}
                    className={`cursor-pointer p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-crimson-950 via-obsidian-900 to-obsidian-950 border-gold-400 text-white shadow-glow-crimson'
                        : 'bg-obsidian-950/60 border-white/10 text-slate-300 hover:border-gold-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-xl object-cover border border-white/10"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{product.name}</h4>
                        <span className="text-[11px] text-gold-400 font-mono">${product.price}.00</span>
                      </div>
                    </div>

                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-crimson-600 border-crimson-400 text-white shadow-glow-crimson'
                        : 'bg-obsidian-900 border-white/20 text-slate-500'
                    }`}>
                      {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Insulated Box Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel-gold rounded-3xl p-6 border-2 border-gold-400/40 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h4 className="text-base font-bold font-display text-white">{selectedPreset.name}</h4>
                <p className="text-xs text-slate-400">Climate Insulated Delivery</p>
              </div>
              <StampSeal3D text="100% ECO ICE COLD" />
            </div>

            {/* Subscription Toggle */}
            <div className="bg-obsidian-950 p-4 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gold-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" /> Subscribe & Save 15%
                </span>
                <input
                  type="checkbox"
                  checked={isSubscription}
                  onChange={(e) => setIsSubscription(e.target.checked)}
                  className="w-4 h-4 accent-crimson-600 rounded cursor-pointer"
                />
              </div>

              {isSubscription && (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {['Monthly', 'Bi-Weekly'].map((freq) => (
                    <button
                      key={freq}
                      onClick={() => setDeliveryFrequency(freq)}
                      className={`py-1.5 text-[11px] font-bold rounded-xl border transition-all ${
                        deliveryFrequency === freq
                          ? 'bg-crimson-600 text-white border-crimson-400'
                          : 'bg-obsidian-900 text-slate-400 border-white/10'
                      }`}
                    >
                      {freq} Delivery
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing Details */}
            <div className="space-y-2 text-xs text-slate-300 font-mono">
              <div className="flex justify-between">
                <span>Box Base Price:</span>
                <span>${selectedPreset.price}.00</span>
              </div>
              {isSubscription && (
                <div className="flex justify-between text-emerald-400">
                  <span>Subscriber Discount (15%):</span>
                  <span>-${Math.round(selectedPreset.price * 0.15)}.00</span>
                </div>
              )}
              <div className="flex justify-between text-gold-400">
                <span>VIP Insulated Packaging:</span>
                <span>FREE</span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between text-lg font-black text-white font-mono">
                <span>Total:</span>
                <span className="text-gold-gradient">${calculateTotalPrice()}.00</span>
              </div>
            </div>

            {/* Add Box to Cart CTA */}
            <button
              onClick={handleAddBox}
              disabled={selectedItems.length === 0}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-crimson-600 to-crimson-800 text-white font-bold text-xs uppercase tracking-widest shadow-glow-crimson hover:scale-105 transition-all duration-300 border border-crimson-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Custom Box To Cart (${calculateTotalPrice()})
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
