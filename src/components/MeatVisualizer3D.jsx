import React, { useState } from 'react';
import { PRODUCTS_DATA } from '../data/meatData';
import { Badge3D } from './ThreeDComponents';
import { Rotate3d, Flame, Shield, Award, Plus, Check, Utensils, Wine, Sliders } from 'lucide-react';

export const MeatVisualizer3D = ({ onAddToCart, onAddToBox }) => {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS_DATA[0]);
  const [selectedAging, setSelectedAging] = useState(selectedProduct.agingDays);
  const [selectedThickness, setSelectedThickness] = useState(1.5);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Smooth 3D tilt formula
    setRotateY((x / rect.width) * 30);
    setRotateX((-y / rect.height) * 30);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleAdd = () => {
    onAddToCart({
      ...selectedProduct,
      customAging: selectedAging,
      customThickness: selectedThickness,
      calculatedPrice: Math.round(selectedProduct.price * (selectedThickness / 1.5))
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <section id="visualizer" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="flex justify-center">
          <Badge3D text="Interactive Studio" type="gold" icon={Rotate3d} />
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
          MEAT CUT <span className="text-gold-gradient">VISUALIZER</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Hover over or touch the cut card to interact. Adjust dry-aging vault days and butcher cut thickness to see live texture and price adjustments.
        </p>
      </div>

      {/* Main Studio Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Product Selection Tabs */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs uppercase tracking-widest font-bold text-gold-400 px-1 mb-2 flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Select Master Cut
          </h3>
          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {PRODUCTS_DATA.map((product) => {
              const isSelected = selectedProduct.id === product.id;
              return (
                <button
                  key={product.id}
                  onClick={() => {
                    setSelectedProduct(product);
                    setSelectedAging(product.agingDays);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-gradient-to-r from-crimson-900/80 via-obsidian-900 to-obsidian-950 border-gold-400 text-white shadow-glow-crimson scale-[1.02]'
                      : 'bg-obsidian-900/60 border-white/10 text-slate-300 hover:border-gold-500/40 hover:bg-obsidian-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover border border-white/10"
                    />
                    <div>
                      <h4 className="text-xs font-bold font-display text-white line-clamp-1">{product.name}</h4>
                      <p className="text-[11px] text-gold-400 font-mono">${product.price}.00</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-semibold px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-400">
                    {product.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Column: 3D Interactive Tilt Preview Card */}
        <div className="lg:col-span-5 perspective-2000 flex flex-col items-center">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: rotateX === 0 ? 'all 0.5s ease-out' : 'none'
            }}
            className="w-full transform-style-3d cursor-grab active:cursor-grabbing group relative"
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-crimson-600/30 via-gold-500/20 to-crimson-800/30 rounded-3xl blur-xl opacity-80 group-hover:opacity-100 transition-all" />

            {/* 3D Glass Container */}
            <div className="glass-panel-gold rounded-3xl p-6 border-2 border-gold-400/50 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
              {/* Interactive Rotation Indicator */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-obsidian-950/80 px-3 py-1.5 rounded-full border border-gold-500/30 text-gold-300 text-[10px] font-bold tracking-wider uppercase">
                <Rotate3d className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Interactive Tilt</span>
              </div>

              {/* Main Image Showcase */}
              <div className="relative h-72 w-full rounded-2xl overflow-hidden mb-6 shadow-3d-depth border border-white/10 group-hover:scale-105 transition-transform duration-500">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover filter contrast-110 brightness-95"
                />
                
                {/* Dynamic Specular Lighting Layer */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${50 + rotateY * 2}% ${50 - rotateX * 2}%, rgba(255,255,255,0.25) 0%, transparent 60%)`
                  }}
                />

                {/* Overlaid Badges */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-obsidian-950/90 text-gold-300 text-xs font-bold border border-gold-500/30">
                    {selectedProduct.marblingScore}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-crimson-900/90 text-white text-xs font-bold border border-crimson-500/40">
                    {selectedAging}-Day Dry Aged
                  </span>
                </div>
              </div>

              {/* Product Specifications */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-display text-white">{selectedProduct.name}</h3>
                  <div className="text-right">
                    <div className="text-2xl font-black text-gold-gradient font-mono">
                      ${Math.round(selectedProduct.price * (selectedThickness / 1.5))}
                    </div>
                    <div className="text-[10px] text-slate-400">Custom Cut Price</div>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">{selectedProduct.description}</p>
              </div>

              {/* Interactive Add Button */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-glow-crimson ${
                    addedAnimation 
                      ? 'bg-emerald-600 text-white border border-emerald-400' 
                      : 'bg-gradient-to-r from-crimson-600 to-crimson-800 text-white hover:from-crimson-500 hover:to-crimson-700 border border-crimson-400/50'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" /> Add Cut To Cart (${Math.round(selectedProduct.price * (selectedThickness / 1.5))})
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Tuning Controls (Aging Vault + Thickness Tuner) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Dry Aging Controls */}
          <div className="glass-panel p-5 rounded-3xl border-gold-500/30 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300 flex items-center gap-2">
              <Flame className="w-4 h-4 text-crimson-500" /> Himalayan Salt Vault Aging
            </h4>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Aging Duration:</span>
                <span className="text-gold-400 font-bold">{selectedAging} Days</span>
              </div>
              <input
                type="range"
                min="21"
                max="90"
                step="7"
                value={selectedAging}
                onChange={(e) => setSelectedAging(Number(e.target.value))}
                className="w-full h-2 bg-obsidian-950 rounded-lg appearance-none cursor-pointer accent-crimson-500 border border-white/10"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>21D (Fresh)</span>
                <span>45D (Nutty)</span>
                <span>90D (Blue Cheese)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-950/80 border border-white/5 text-[11px] text-slate-400 leading-relaxed">
              <span className="text-gold-300 font-bold">Vault Profile: </span>
              {selectedAging <= 30 && "Mild beefiness, smooth moisture, delicate texture."}
              {selectedAging > 30 && selectedAging <= 60 && "Intense oaky notes, hazelnut aroma, tenderized grain."}
              {selectedAging > 60 && "Deep umami, concentrated funky truffle and blue cheese depth."}
            </div>
          </div>

          {/* Thickness Tuner */}
          <div className="glass-panel p-5 rounded-3xl border-gold-500/30 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-gold-400" /> Butcher Cut Thickness
            </h4>

            <div className="grid grid-cols-3 gap-2">
              {[1.0, 1.5, 2.0].map((thickness) => (
                <button
                  key={thickness}
                  onClick={() => setSelectedThickness(thickness)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all ${
                    selectedThickness === thickness
                      ? 'bg-crimson-600 text-white border-crimson-400 shadow-glow-crimson'
                      : 'bg-obsidian-950/80 text-slate-400 border-white/10 hover:border-gold-400'
                  }`}
                >
                  {thickness}" Cut
                </button>
              ))}
            </div>

            <div className="text-[11px] text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Est. Sear Time:</span>
                <span className="text-slate-200 font-semibold">{selectedThickness * 2.5} mins / side</span>
              </div>
              <div className="flex justify-between">
                <span>Serving Size:</span>
                <span className="text-slate-200 font-semibold">{selectedThickness >= 2.0 ? '2 People' : '1 Person'}</span>
              </div>
            </div>
          </div>

          {/* Wine & Chef Pairing Note */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-obsidian-900 to-obsidian-950 border border-gold-500/20 text-xs space-y-2">
            <div className="flex items-center gap-2 text-gold-300 font-bold">
              <Wine className="w-4 h-4 text-crimson-400" /> Master Sommelier Pairing
            </div>
            <p className="text-slate-300 text-[11px] italic">
              "{selectedProduct.winePairing}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
