import React from 'react';

/**
 * 3D Metallic Cleaver Logo Emblem
 */
export const Logo3D = ({ className = "w-10 h-10" }) => (
  <div className={`relative group cursor-pointer perspective-1000 ${className}`}>
    <div className="w-full h-full relative transform-style-3d transition-transform duration-500 group-hover:rotate-y-12 group-hover:rotate-x-6 group-hover:scale-105">
      {/* 3D Glow Aura Behind Logo */}
      <div className="absolute -inset-1 bg-gradient-to-r from-crimson-600 via-gold-500 to-crimson-700 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse-glow" />
      
      {/* 3D Glass Container Box */}
      <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-obsidian-800 via-obsidian-900 to-obsidian-950 p-2 border border-gold-500/40 shadow-3d-depth flex items-center justify-center overflow-hidden">
        {/* Specular highlight stripe */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:translate-x-12 transition-transform duration-700" />
        
        {/* Custom 3D SVG Meat Cleaver Emblem */}
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
          <defs>
            <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#d1d5db" />
              <stop offset="70%" stopColor="#6b7280" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
            <linearGradient id="goldBevel" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f7d794" />
              <stop offset="50%" stopColor="#e5b869" />
              <stop offset="100%" stopColor="#9a7226" />
            </linearGradient>
            <linearGradient id="handleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#850516" />
              <stop offset="50%" stopColor="#e61e38" />
              <stop offset="100%" stopColor="#4a000a" />
            </linearGradient>
            <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.8"/>
            </filter>
          </defs>

          {/* Cleaver Blade Outline 3D Layer */}
          <path d="M 22 20 L 78 20 C 82 20 85 23 85 27 L 85 62 C 85 66 78 72 70 72 L 40 72 L 22 55 Z" fill="url(#bladeGrad)" filter="url(#shadow3d)" />
          {/* Gold Edge Sharp Line */}
          <path d="M 22 55 L 40 72 L 70 72 C 78 72 85 66 85 62" stroke="url(#goldBevel)" strokeWidth="3.5" strokeLinecap="round" />
          {/* Blade Hanging Hole 3D Ring */}
          <circle cx="75" cy="30" r="4.5" fill="#0d0f14" stroke="url(#goldBevel)" strokeWidth="1.5" />
          {/* Handle */}
          <rect x="12" y="32" width="16" height="12" rx="3" fill="url(#handleGrad)" filter="url(#shadow3d)" />
          {/* Handle Brass Pins */}
          <circle cx="16" cy="38" r="1.5" fill="#f7d794" />
          <circle cx="24" cy="38" r="1.5" fill="#f7d794" />
        </svg>
      </div>
    </div>
  </div>
);

/**
 * 3D Styled Icon Capsule Container
 */
export const IconCapsule3D = ({ children, active = false, className = "" }) => (
  <div className={`relative group perspective-1000 inline-block ${className}`}>
    <div className={`transform-style-3d transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-x-12 p-3 rounded-2xl flex items-center justify-center shadow-3d-depth border ${
      active 
        ? 'bg-gradient-to-br from-crimson-700/80 via-obsidian-900 to-obsidian-950 border-gold-400 text-gold-300 shadow-glow-crimson'
        : 'bg-gradient-to-br from-obsidian-800 via-obsidian-900 to-obsidian-950 border-white/10 text-slate-300 group-hover:border-gold-500/50 group-hover:text-gold-400'
    }`}>
      {/* Dynamic 3D lighting edge */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/5 to-white/15 pointer-events-none" />
      <div className="relative z-10 drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
        {children}
      </div>
    </div>
  </div>
);

/**
 * 3D Metallic Badge Tag
 */
export const Badge3D = ({ text, type = 'gold', icon: Icon }) => {
  const styles = {
    gold: 'from-amber-950/80 via-obsidian-900 to-obsidian-950 border-gold-500/50 text-gold-300 shadow-[0_4px_12px_rgba(229,184,105,0.2)]',
    crimson: 'from-crimson-950/80 via-obsidian-900 to-obsidian-950 border-crimson-500/50 text-crimson-400 shadow-[0_4px_12px_rgba(230,30,56,0.25)]',
    silver: 'from-slate-900 via-obsidian-900 to-obsidian-950 border-slate-400/40 text-slate-200 shadow-[0_4px_12px_rgba(255,255,255,0.1)]',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-md bg-gradient-to-r ${styles[type] || styles.gold} transform-style-3d hover:scale-105 transition-transform duration-300`}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{text}</span>
    </div>
  );
};

/**
 * 3D Rotating Stamp Seal
 */
export const StampSeal3D = ({ text = "100% ARTISAN GUARANTEE" }) => (
  <div className="relative w-24 h-24 flex items-center justify-center group perspective-1000">
    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-amber-200 animate-spin-slow opacity-80 blur-xs" />
    <div className="relative w-20 h-20 rounded-full bg-gradient-to-b from-obsidian-800 to-obsidian-950 border-2 border-gold-400 p-1 flex items-center justify-center text-center shadow-3d-depth transform-style-3d group-hover:rotate-y-180 transition-transform duration-700">
      <div className="w-full h-full rounded-full border border-dashed border-gold-500/60 flex flex-col items-center justify-center p-1">
        <span className="text-[9px] font-bold text-gold-300 uppercase tracking-tighter leading-tight">{text}</span>
        <span className="text-[8px] text-crimson-500 mt-0.5">★ ★ ★ ★ ★</span>
      </div>
    </div>
  </div>
);
