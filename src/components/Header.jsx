import React, { useState } from 'react';
import { Logo3D, IconCapsule3D } from './ThreeDComponents';
import { ShoppingBag, Search, Compass, ShieldCheck, Flame, Box, Thermometer, Menu, X, Sparkles } from 'lucide-react';

export const Header = ({ cartCount = 0, onOpenCart, activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'visualizer', label: ' Explorer', icon: Compass },
    { id: 'catalog', label: 'Vault', icon: Flame },
    { id: 'box-builder', label: 'Custom Box', icon: Box },
    { id: 'doneness', label: 'Doneness Guide', icon: Thermometer },
    { id: 'traceability', label: 'Traceability', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-obsidian-950/85 border-b border-gold-500/20 shadow-2xl transition-all duration-300">
      {/* Ticker Announcement Bar */}
      <div className="bg-gradient-to-r from-crimson-800 via-obsidian-900 to-crimson-900 text-gold-300 text-xs py-1.5 px-4 font-medium tracking-wide flex items-center justify-between border-b border-crimson-600/30">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
            <span className="font-semibold text-white">DRY-AGING VAULT OPEN:</span>
            <span className="hidden sm:inline">Himalayan Salt Block Aged 45 & 90-Day Cuts Available Now</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <span className="hidden md:inline">🚚 Express Refrigerated Packaging</span>
            <span className="text-gold-400 font-bold">Code: PRIME10 (10% OFF)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => onNavigate('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <Logo3D className="w-11 h-11" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black font-display tracking-widest text-gold-gradient group-hover:brightness-125 transition-all">
                PRIME CUT
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-semibold">
              Artisan Butchery & Wagyu Vault
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links (Responsive Breakpoint xl) */}
        <nav className="hidden xl:flex items-center gap-1 bg-obsidian-900/80 p-1.5 rounded-full border border-white/10 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-crimson-600 to-crimson-800 text-white shadow-glow-crimson border border-crimson-400/40 scale-105'
                    : 'text-slate-300 hover:text-gold-300 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gold-300' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons (Search + Cart) */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="hidden sm:flex items-center relative">
            <input
              type="text"
              placeholder="Search Wagyu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-obsidian-900 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/60 w-32 md:w-44 transition-all focus:w-52"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
          </div>

          {/* Interactive Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative group perspective-1000 flex items-center"
            aria-label="View Shopping Cart"
          >
            <IconCapsule3D active={cartCount > 0} className="transform-style-3d">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gold-300 group-hover:scale-110 transition-transform" />
                <span className="hidden md:inline text-xs font-bold text-slate-200">Cart</span>
              </div>
            </IconCapsule3D>

            {/* Cart Badge Count */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-crimson-600 text-white font-bold text-[10px] shadow-glow-crimson border border-white/40 animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile/Tablet Menu Toggle (below xl) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-obsidian-900 border border-white/10 text-slate-300 hover:text-gold-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-obsidian-900 border-b border-gold-500/20 px-4 py-4 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-crimson-900/40 hover:text-gold-300 border border-transparent hover:border-crimson-500/30 transition-all"
              >
                <Icon className="w-4 h-4 text-gold-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
