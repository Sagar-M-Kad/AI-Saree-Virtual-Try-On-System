import React from 'react';
import { Check, Sparkles } from 'lucide-react';

const SareeCard = ({ saree, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-500 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl ${
        isSelected
          ? 'border-brand-500 ring-2 ring-brand-500/20 scale-[1.02]'
          : 'border-slate-200/60 dark:border-zinc-800/80 hover:border-gold-400/50 dark:hover:border-gold-600/50'
      }`}
    >
      {/* Saree Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-zinc-800">
        <img
          src={saree.image}
          alt={saree.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Shadow overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Selected Overlay Checkmark Badge */}
        {isSelected && (
          <div className="absolute top-3 right-3 bg-brand-600 text-white p-1.5 rounded-full shadow-lg border border-brand-400 flex items-center justify-center animate-pulse">
            <Check className="w-4.5 h-4.5 stroke-[3]" />
          </div>
        )}

        {/* Material Tag (e.g., Silk, Cotton) */}
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-white/95 dark:bg-zinc-950/95 text-slate-800 dark:text-zinc-200 border border-slate-100/50 dark:border-zinc-800/40">
            {saree.material}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-gold-500 text-white flex items-center gap-1 shadow-sm">
            <Sparkles className="w-2.5 h-2.5" />
            <span>{saree.category}</span>
          </span>
        </div>
      </div>

      {/* Saree Details */}
      <div className="p-4 text-left space-y-1 bg-white dark:bg-zinc-900 transition-colors">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base leading-tight group-hover:text-brand-600 dark:group-hover:text-gold-400 transition-colors line-clamp-1">
            {saree.name}
          </h3>
          <span className="text-sm font-semibold text-brand-600 dark:text-gold-400 shrink-0 font-sans">
            {saree.price}
          </span>
        </div>
        
        <p className="text-xs text-slate-400 dark:text-zinc-500 font-medium">
          {saree.color}
        </p>
        
        <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-2 pt-1 leading-relaxed">
          {saree.description}
        </p>
      </div>

      {/* Selected bottom visual stripe */}
      <div className={`h-1.5 w-full bg-gradient-to-r from-brand-600 to-gold-500 transform origin-left transition-transform duration-300 ${isSelected ? 'scale-x-100' : 'scale-x-0'}`} />
    </div>
  );
};

export default SareeCard;
