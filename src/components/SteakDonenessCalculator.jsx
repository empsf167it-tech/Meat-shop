import React, { useState } from 'react';
import { DONENESS_GUIDE } from '../data/meatData';
import { Badge3D } from './ThreeDComponents';
import { Thermometer, Timer, Flame, ChefHat, Sparkles, Droplets, Gauge } from 'lucide-react';

export const SteakDonenessCalculator = () => {
  const [selectedIndex, setSelectedIndex] = useState(1); // Medium Rare default
  const activeGuide = DONENESS_GUIDE[selectedIndex];

  // Extra metrics calculated per doneness level
  const donenessMetrics = [
    { level: 'Rare', searTime: '1.5 mins / side', restTime: '10 Mins', retention: '99%', searTemp: '500°F Sear', basting: 'Rosemary Garlic Butter' },
    { level: 'Medium Rare', searTime: '2.5 mins / side', restTime: '8 Mins', retention: '96%', searTemp: '475°F Sear', basting: 'Thyme Compound Butter' },
    { level: 'Medium', searTime: '3.5 mins / side', restTime: '6 Mins', retention: '88%', searTemp: '450°F Sear', basting: 'Smoked Sea Salt Butter' },
    { level: 'Medium Well', searTime: '4.5 mins / side', restTime: '5 Mins', retention: '78%', searTemp: '425°F Sear', basting: 'Shallot & Beef Tallow' },
    { level: 'Well Done', searTime: '5.5 mins / side', restTime: '4 Mins', retention: '65%', searTemp: '400°F Sear', basting: 'Caramelized Butter' },
  ];

  const currentMetric = donenessMetrics[selectedIndex] || donenessMetrics[1];

  return (
    <section id="doneness" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="flex justify-center">
          <Badge3D text="Master Butcher Tool" type="crimson" icon={Thermometer} />
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
          STEAK DONENESS <span className="text-gold-gradient">CALCULATOR</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Interactive temperature guide and searing timer to ensure perfection for every cut.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Doneness Level Buttons & Slider */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gold-300 flex items-center gap-2">
              <Flame className="w-4 h-4 text-crimson-500" /> Target Cooking Level
            </h3>

            {/* Level selector buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {DONENESS_GUIDE.map((item, idx) => (
                <button
                  key={item.level}
                  onClick={() => setSelectedIndex(idx)}
                  className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all duration-300 border flex flex-col items-center gap-1 ${
                    selectedIndex === idx
                      ? 'bg-gradient-to-r from-crimson-700 via-obsidian-900 to-obsidian-950 border-gold-400 text-white shadow-glow-crimson scale-105'
                      : 'bg-obsidian-950/60 border-white/10 text-slate-400 hover:border-gold-500/40'
                  }`}
                >
                  <span style={{ color: item.color }} className="font-bold">● {item.level}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.temp}</span>
                </button>
              ))}
            </div>

            {/* Doneness Description Box */}
            <div className="p-4 rounded-2xl bg-obsidian-950/90 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Internal Meat Temp Target:</span>
                <span className="font-mono font-bold text-gold-400">{activeGuide.temp}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{activeGuide.desc}"
              </p>
            </div>

            {/* Master Butcher Basting Tip */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 to-obsidian-950 border border-gold-500/30 flex items-start gap-3">
              <ChefHat className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-gold-300 block">Master Butcher Pro Tip:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Remove steak from heat 5°F below target temp. Rest on warm wood board for {currentMetric.restTime} with {currentMetric.basting} so juices redistribute evenly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Steak Interior Cross-Section Simulation Card */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-lg glass-panel-gold p-6 sm:p-8 rounded-3xl border-2 border-gold-400/40 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-lg font-bold font-display text-white">Visual Interior Simulation</h3>
                <p className="text-xs text-slate-400">Steak Cross-Section & Temperature Gauge</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-crimson-950 text-gold-300 text-xs font-mono font-bold border border-gold-500/30">
                {activeGuide.level}
              </span>
            </div>

            {/* Rich Steak Cut Cross-Section Visual Graphic */}
            <div className="relative w-full rounded-2xl bg-obsidian-950 border border-white/15 p-4 shadow-3d-depth overflow-hidden space-y-3">
              
              {/* Outer Top Crust Label */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="uppercase tracking-wider">Top Caramelized Sear Bark</span>
                <span className="text-gold-400">Maillard Layer (2mm)</span>
              </div>

              {/* Realistic Steak Cross-Section Layers Graphic */}
              <div className="relative h-28 w-full rounded-xl overflow-hidden border border-amber-950/60 shadow-inner flex flex-col justify-between p-1 bg-obsidian-900">
                
                {/* Top Crust Line */}
                <div className="h-3 w-full bg-gradient-to-r from-amber-950 via-[#3d1810] to-amber-950 border-b border-amber-900/50 flex items-center justify-center">
                  <div className="w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px] opacity-60" />
                </div>

                {/* Core Interior Flesh (Dynamic Gradient per Doneness) */}
                <div 
                  className="flex-1 w-full my-0.5 rounded transition-all duration-700 relative flex items-center justify-center overflow-hidden shadow-inner"
                  style={{
                    background: `linear-gradient(180deg, #3d1810 0%, ${activeGuide.color} 30%, ${activeGuide.color} 70%, #3d1810 100%)`
                  }}
                >
                  {/* Subtle Marbling Fibers */}
                  <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />
                  
                  {/* Digital Thermometer Probe Line overlay */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                    <div className="w-3/4 h-0.5 bg-gradient-to-r from-transparent via-gold-300 to-transparent shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  </div>

                  {/* Core Badge */}
                  <span className="relative z-10 px-3 py-1 rounded-full bg-obsidian-950/90 text-white font-mono text-xs font-bold border border-gold-500/40 shadow-2xl">
                    Core Target: {activeGuide.temp}
                  </span>
                </div>

                {/* Bottom Crust Line */}
                <div className="h-3 w-full bg-gradient-to-r from-amber-950 via-[#3d1810] to-amber-950 border-t border-amber-900/50 flex items-center justify-center">
                  <div className="w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px] opacity-60" />
                </div>
              </div>

              {/* Outer Bottom Crust Label */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="uppercase tracking-wider">Cast Iron Sear Bed</span>
                <span className="text-crimson-400 font-bold">{currentMetric.searTemp}</span>
              </div>
            </div>

            {/* Rich 4-Metric Grid Dashboard */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-obsidian-950/90 border border-white/10 space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5 text-[10px]">
                  <Timer className="w-3.5 h-3.5 text-gold-400" /> Sear Time
                </span>
                <span className="text-gold-300 font-bold text-sm block">{currentMetric.searTime}</span>
              </div>

              <div className="p-3 rounded-2xl bg-obsidian-950/90 border border-white/10 space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5 text-[10px]">
                  <ChefHat className="w-3.5 h-3.5 text-crimson-400" /> Rest Time
                </span>
                <span className="text-crimson-400 font-bold text-sm block">{currentMetric.restTime}</span>
              </div>

              <div className="p-3 rounded-2xl bg-obsidian-950/90 border border-white/10 space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5 text-[10px]">
                  <Droplets className="w-3.5 h-3.5 text-blue-400" /> Juice Retention
                </span>
                <span className="text-emerald-400 font-bold text-sm block">{currentMetric.retention}</span>
              </div>

              <div className="p-3 rounded-2xl bg-obsidian-950/90 border border-white/10 space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5 text-[10px]">
                  <Gauge className="w-3.5 h-3.5 text-gold-400" /> Sear Heat Target
                </span>
                <span className="text-gold-400 font-bold text-sm block">{currentMetric.searTemp}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
