import React, { useState } from 'react';
import { Logo3D, StampSeal3D, Badge3D } from './ThreeDComponents';
import { Mail, ShieldCheck, Award, Flame, Phone, MapPin, Check } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-obsidian-950 border-t border-gold-500/20 text-slate-400 pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-crimson-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Top Newsletter Card */}
        <div className="glass-panel-gold rounded-3xl p-8 border border-gold-400/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl font-bold font-display text-white">JOIN THE WAGYU VAULT CLUB</h3>
            <p className="text-xs text-slate-300">Receive private vault dry-aging allocations, master chef recipes, and 10% off your first cut.</p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full lg:w-auto max-w-md">
            <div className="relative flex-1">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-obsidian-950 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-crimson-600 to-crimson-800 text-white font-bold text-xs uppercase tracking-wider shadow-glow-crimson hover:scale-105 transition-all whitespace-nowrap"
            >
              {subscribed ? 'Joined!' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Footer Navigation Columns: 1 col on mobile, 2x2 on md (768px), 4 cols on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info (Identical Logo & Font styling as Header) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo3D className="w-11 h-11" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black font-display tracking-widest text-gold-gradient">
                    PRIME CUT
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-semibold">
                  Artisan Butchery & Wagyu Vault
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              The world’s premier digital butchery experience. Hand-selected heritage cuts dry-aged in Himalayan salt chambers.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-crimson-500" />
              <span>450 Master Butcher Row, Austin, TX</span>
            </div>
          </div>

          {/* Col 2: Vault Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300 font-display">Vault Collections</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><a href="#visualizer" className="hover:text-gold-300 transition-colors">Japanese A5 Wagyu Ribeye</a></li>
              <li><a href="#visualizer" className="hover:text-gold-300 transition-colors">45-Day Himalayan Tomahawk</a></li>
              <li><a href="#visualizer" className="hover:text-gold-300 transition-colors">60-Day Dry Aged Porterhouse</a></li>
              <li><a href="#box-builder" className="hover:text-gold-300 transition-colors">Custom Insulated Boxes</a></li>
            </ul>
          </div>

          {/* Col 3: Master Butchery */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300 font-display">Master Tools</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><a href="#doneness" className="hover:text-gold-300 transition-colors">Steak Doneness Calculator</a></li>
              <li><a href="#traceability" className="hover:text-gold-300 transition-colors">Farm-To-Table Journey</a></li>
              <li><a href="#visualizer" className="hover:text-gold-300 transition-colors">Cut Thickness Tuner</a></li>
              <li><a href="#" className="hover:text-gold-300 transition-colors">Sommelier Wine Pairing Guide</a></li>
            </ul>
          </div>

          {/* Col 4: Trust Seal & Stamp */}
          <div className="flex flex-col items-center justify-center space-y-3 md:items-start lg:items-center">
            <StampSeal3D text="100% WAGYU CERTIFIED" />
            <span className="text-[10px] text-slate-500 font-mono text-center md:text-left lg:text-center">USDA Prime • Miyazaki Certified</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© 2026 PRIME CUT Artisan Butchery. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gold-400">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-gold-400">Terms of Vault Service</a>
            <span>•</span>
            <a href="#" className="hover:text-gold-400">Cold Chain Shipping Guarantee</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
