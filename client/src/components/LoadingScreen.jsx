import React from 'react';
import { Sparkles, Cpu, Scissors, Shirt } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

const LoadingScreen = () => {
  const { loading, loadingMessage } = useTryOn();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-lg animate-fade-in">
      
      {/* Decorative Rotating Golden Mandalas/Rings */}
      <div className="relative flex items-center justify-center w-40 h-40">
        <div className="absolute w-32 h-32 border-4 border-dashed border-gold-500/20 rounded-full animate-spin-slow" />
        <div className="absolute w-24 h-24 border-2 border-brand-500/40 rounded-full animate-ping" />
        <div className="absolute w-28 h-28 border border-gold-400/30 rounded-full animate-pulse-slow" />
        
        {/* Core AI Icon */}
        <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-700 to-gold-500 shadow-2xl flex items-center justify-center border border-gold-300/40">
          <Sparkles className="w-8 h-8 text-white animate-pulse" />
        </div>

        {/* Orbiting particles */}
        <div className="absolute top-2 left-6 w-3 h-3 bg-brand-500 rounded-full animate-bounce" />
        <div className="absolute bottom-6 right-2 w-2 h-2 bg-gold-400 rounded-full animate-ping" />
      </div>

      {/* Loading Message and Step Indicator */}
      <div className="mt-8 text-center space-y-4 max-w-sm px-4">
        
        {/* Title */}
        <h2 className="text-xl font-bold font-serif text-white tracking-wide">
          Generating Saree Look
        </h2>

        {/* Dynamic Detail Message */}
        <p className="text-sm font-medium text-gradient-gold animate-pulse tracking-wide min-h-[20px]">
          {loadingMessage}
        </p>

        {/* Dynamic Loading Bar */}
        <div className="w-48 h-1.5 mx-auto bg-zinc-800 rounded-full overflow-hidden border border-zinc-700/50">
          <div className="h-full bg-gradient-to-r from-brand-600 to-gold-400 rounded-full animate-shimmer"
               style={{ width: '100%', backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
        </div>

        {/* Phase Badges */}
        <div className="flex items-center justify-center gap-4 pt-6 border-t border-white/5 mt-4">
          <div className="flex flex-col items-center text-[10px] uppercase font-bold tracking-widest text-zinc-500">
            <Cpu className="w-4.5 h-4.5 mb-1.5 text-slate-500" />
            <span>AI Align</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex flex-col items-center text-[10px] uppercase font-bold tracking-widest text-zinc-500">
            <Scissors className="w-4.5 h-4.5 mb-1.5 text-slate-500 animate-pulse" />
            <span>Fabric Fit</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex flex-col items-center text-[10px] uppercase font-bold tracking-widest text-zinc-500">
            <Shirt className="w-4.5 h-4.5 mb-1.5 text-slate-500" />
            <span>Drape Render</span>
          </div>
        </div>

      </div>

      {/* Tailwind helper to animate custom spin speed */}
      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>

    </div>
  );
};

export default LoadingScreen;
