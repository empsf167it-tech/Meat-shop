import React, { useState } from 'react';
import { PRODUCTS_DATA, CATEGORIES_DATA } from '../data/meatData';
import { IconCapsule3D, Badge3D } from './ThreeDComponents';
import { Flame, Crown, Shield, Utensils, Beef, Star, Plus, Check, Eye } from 'lucide-react';

export const CategoryGrid = ({ onAddToCart, onQuickView }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [addedIds, setAddedIds] = useState({});

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === activeCategory);

  const getCategoryIcon = (iconName) => {
    switch(iconName) {
      case 'Crown': return Crown;
      case 'Shield': return Shield;
      case 'Beef': return Beef;
      case 'Utensils': return Utensils;
      default: return Flame;
    }
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <section id="catalog" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <Badge3D text="Hand-Carved Reserve" type="crimson" icon={Flame} />
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white mt-3">
            VAULT <span className="text-gold-gradient">SELECTIONS</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl">
            Explore our curated inventory of certified Japanese A5 Wagyu, Himalayan dry-aged cuts, and artisan sausages.
          </p>
        </div>

        {/* Category Filters Grid */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES_DATA.map((cat) => {
            const IconComponent = getCategoryIcon(cat.iconName);
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 border ${
                  isActive
                    ? 'bg-gradient-to-r from-crimson-600 via-crimson-700 to-crimson-800 text-white border-crimson-400 shadow-glow-crimson scale-105'
                    : 'bg-obsidian-900/80 text-slate-300 border-white/10 hover:border-gold-500/50 hover:text-gold-300'
                }`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-gold-300' : 'text-slate-400'}`} />
                <span>{cat.name}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-obsidian-950 text-[10px] text-slate-400">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const isAdded = addedIds[product.id];
          return (
            <div
              key={product.id}
              className="card-3d-hover group relative rounded-3xl glass-panel p-5 border border-white/10 hover:border-gold-500/40 flex flex-col justify-between overflow-hidden"
            >
              {/* Product Badge Tag Overlay */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-crimson-900/80 text-crimson-300 text-[10px] font-bold uppercase tracking-wider border border-crimson-500/40">
                  {product.tag}
                </span>
                <span className="text-[10px] font-mono text-gold-400 bg-obsidian-950 px-2 py-0.5 rounded border border-gold-500/20">
                  {product.marblingScore}
                </span>
              </div>

              {/* Product Image */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 shadow-3d-depth">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-70" />
                
                {/* 3D Badge on image */}
                <div className="absolute bottom-2 left-2">
                  <Badge3D text={product.badge3D} type="gold" />
                </div>
              </div>

              {/* Product Meta */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{product.origin}</span>
                  <div className="flex items-center text-gold-400 font-bold">
                    <Star className="w-3 h-3 fill-gold-400 mr-1" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold font-display text-white group-hover:text-gold-300 transition-colors line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              {/* Footer Price & Add Button */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Per Cut</span>
                  <span className="text-xl font-black font-mono text-gold-gradient">${product.price}.00</span>
                </div>

                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className={`p-3 rounded-2xl font-bold text-xs uppercase transition-all duration-300 flex items-center justify-center gap-1.5 shadow-3d-depth ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-crimson-600 to-crimson-800 text-white hover:from-crimson-500 hover:to-crimson-700 border border-crimson-400/40 shadow-glow-crimson'
                  }`}
                  aria-label={`Add ${product.name} to cart`}
                >
                  {isAdded ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Add</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
