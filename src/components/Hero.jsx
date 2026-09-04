import React, { useState, useEffect } from 'react';
import { Badge3D, StampSeal3D } from './ThreeDComponents';
import { Flame, ShieldCheck, Truck, Sparkles, ChevronRight, Award, Clock } from 'lucide-react';

export const Hero = ({ onExploreVisualizer, onBuildBox }) => {
  // Live Vault Carving Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Dynamic Background Lighting & Embers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-crimson-700/20 via-gold-500/10 to-transparent rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-crimson-800/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold-600/15 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Headline & Call To Actions */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Top Floating Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge3D text="Himalayan Salt Vault Aged" type="crimson" icon={Flame} />
            <Badge3D text="Miyazaki A5 Wagyu Direct" type="gold" icon={Award} />
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-white leading-[1.08]">
              LUXURY <span className="text-gold-gradient">ARTISAN</span> MEATS & WAGYU
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed">
              Hand-selected heritage breeds, aged in salt vaults, hand-carved by master butchers, and delivered express in temperature-controlled luxury boxes.
            </p>
          </div>

          {/* Daily Vault Countdown Timer */}
          <div className="glass-panel p-4 rounded-2xl border-gold-500/30 flex flex-wrap items-center justify-between gap-4 max-w-xl shadow-3d-depth">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-crimson-600/20 border border-crimson-500/40 text-crimson-400">
                <Clock className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Today’s Master Carving Slot</p>
                <p className="text-sm font-bold text-gold-300">Reserve Fresh 45-Day Tomahawk Cut</p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-sm font-bold text-white bg-obsidian-950 px-3 py-1.5 rounded-xl border border-white/10">
              <span className="text-gold-400">{String(timeLeft.hours).padStart(2, '0')}h</span> :
              <span className="text-gold-400">{String(timeLeft.minutes).padStart(2, '0')}m</span> :
              <span className="text-crimson-400">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>

          {/* CTA Buttons - Equal Length */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={onExploreVisualizer}
              className="w-full sm:w-64 py-4 rounded-2xl bg-gradient-to-r from-crimson-600 via-crimson-700 to-crimson-800 text-white font-bold text-sm tracking-wider uppercase shadow-glow-crimson hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 border border-crimson-400/50"
            >
              <Sparkles className="w-4 h-4 text-gold-300 group-hover:rotate-12 transition-transform" />
              <span>Explore Cut Visualizer</span>
              <ChevronRight className="w-4 h-4 text-gold-300" />
            </button>

            <button
              onClick={onBuildBox}
              className="w-full sm:w-64 py-4 rounded-2xl bg-obsidian-900 hover:bg-obsidian-800 text-slate-200 hover:text-gold-300 font-bold text-sm tracking-wider uppercase border border-gold-500/40 hover:border-gold-400 shadow-3d-depth hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Build Custom Box</span>
            </button>
          </div>

          {/* Quick Features List */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
              <span>100% Traceable Origin</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-crimson-500 shrink-0" />
              <span>Dry Aged Up To 90 Days</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Dry-Ice Cold Express</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Interactive Showcase Card */}
        <div className="lg:col-span-5 relative perspective-2000 flex justify-center">
          <div className="w-full max-w-md transform-style-3d hover:rotate-y-6 hover:rotate-x-3 transition-transform duration-700 ease-out group">
            
            {/* Stamp Guarantee Badge Overlay */}
            <div className="absolute -top-6 -right-6 z-30 pointer-events-none">
              <StampSeal3D text="MASTER SELECTION" />
            </div>

            {/* Glass Card Container */}
            <div className="glass-panel-gold rounded-3xl p-6 border-2 border-gold-500/40 shadow-2xl relative overflow-hidden">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-crimson-900/60 border border-crimson-500/50 text-crimson-300 font-mono text-xs font-bold">
                  BMS 12 PERFECT MARBLE
                </span>
              </div>

              {/* Steak Image Container */}
              <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-5 group-hover:scale-105 transition-transform duration-500 shadow-3d-depth">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
                  alt="Wagyu Ribeye"
                  className="w-full h-full object-cover filter contrast-110 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200 bg-obsidian-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                  <span className="font-semibold text-gold-300">Miyazaki Prefecture, JP</span>
                  <span className="font-mono text-slate-400">16 oz Cut</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-display text-white group-hover:text-gold-300 transition-colors">
                  Miyazaki Japanese A5 Wagyu Ribeye
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Unrivaled snowflake marbling. Soft as velvet, melting seamlessly on your palate with rich umami depth.
                </p>
              </div>

              {/* Interactive Quick Add CTA inside card */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1 text-gold-400 text-xs font-bold">
                  <span>★ 5.0</span>
                  <span className="text-slate-500">(142 Master Reviews)</span>
                </div>
                <button
                  onClick={onExploreVisualizer}
                  className="px-4 py-2 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white font-bold text-xs shadow-glow-crimson transition-all"
                >
                  View Cut Controls
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
