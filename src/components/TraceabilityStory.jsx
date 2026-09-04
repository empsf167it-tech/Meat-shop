import React, { useState } from 'react';
import { Badge3D, StampSeal3D } from './ThreeDComponents';
import { ShieldCheck, Compass, Flame, Scissors, Truck, Award, CheckCircle } from 'lucide-react';

export const TraceabilityStory = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: 'Heritage Ranches & Pasture',
      icon: Compass,
      location: 'Miyazaki, JP & Texas Hill Country, USA',
      details: '100% grass-fed, pasture-raised cattle with zero antibiotics or artificial hormones. Raised with stress-free care under Japanese master rancher guidelines.',
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
      badge: 'Heritage Certified'
    },
    {
      id: 2,
      title: 'Himalayan Salt Block Dry Vault',
      icon: Flame,
      location: 'Sub-Zero Aging Chamber #4',
      details: 'Aged on pink Himalayan salt brick walls for 21 to 90 days at a precise 34°F and 75% humidity. Moisture evaporates slowly to concentrate deep nuttiness.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      badge: 'Salt Aged'
    },
    {
      id: 3,
      title: 'Master Butcher Hand-Carving',
      icon: Scissors,
      location: 'Artisan Butchery Studio',
      details: 'Each steak is cut to order by master butchers using hand-honed Japanese steel blades. Trimmed to exact thickness specifications.',
      image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
      badge: 'Hand Crafted'
    },
    {
      id: 4,
      title: 'Sub-Zero Express Cold-Chain',
      icon: Truck,
      location: 'Direct Doorstep Logistics',
      details: 'Vacuum-sealed in BPA-free military-grade casing and packed inside our matte black insulated eco-box with dry ice pellets for 48h thermal protection.',
      image: 'https://images.unsplash.com/photo-1585325701165-351af916e581?auto=format&fit=crop&w=800&q=80',
      badge: 'Cold Shield'
    }
  ];

  return (
    <section id="traceability" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="flex justify-center">
          <Badge3D text="100% Transparent Journey" type="gold" icon={ShieldCheck} />
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
          FARM-TO-TABLE <span className="text-gold-gradient">TRACEABILITY</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Every cut is tracked from ethical ranching to dry-aging vault to your doorstep.
        </p>
      </div>

      {/* Interactive 4 Step Timeline Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-3xl transition-all duration-300 border text-left flex items-center gap-3 ${
                isActive
                  ? 'glass-panel-gold border-gold-400 shadow-glow-gold scale-105'
                  : 'glass-panel border-white/10 hover:border-gold-500/40 text-slate-400'
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 border ${
                isActive ? 'bg-crimson-600 border-crimson-400 text-white shadow-glow-crimson' : 'bg-obsidian-950 border-white/10 text-slate-400'
              }`}>
                0{step.id}
              </div>
              <div>
                <h4 className={`text-xs font-bold font-display ${isActive ? 'text-white' : 'text-slate-300'}`}>{step.title}</h4>
                <span className="text-[10px] text-gold-400 font-mono">Step 0{step.id}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Feature Display */}
      <div className="glass-panel rounded-3xl p-6 lg:p-8 border border-gold-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-3d-depth">
          <img
            src={steps[activeStep].image}
            alt={steps[activeStep].title}
            className="w-full h-full object-cover filter brightness-90 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4">
            <Badge3D text={steps[activeStep].badge} type="gold" />
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-crimson-400 text-xs font-mono font-bold">
              <CheckCircle className="w-4 h-4" /> PHASE 0{steps[activeStep].id} OF 04
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">{steps[activeStep].title}</h3>
            <p className="text-xs text-gold-300 font-mono">Location: {steps[activeStep].location}</p>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed font-light">
            {steps[activeStep].details}
          </p>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
              <Award className="w-4 h-4 text-gold-400" />
              <span>Full USDA Prime / A5 Certification Attached</span>
            </div>
            <StampSeal3D text="AUTHENTICITY GUARANTEED" />
          </div>
        </div>
      </div>
    </section>
  );
};
