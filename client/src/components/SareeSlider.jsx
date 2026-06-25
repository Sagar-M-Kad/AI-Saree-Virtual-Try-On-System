import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import SareeCard from './SareeCard';
import { useTryOn } from '../context/TryOnContext';

const SareeSlider = () => {
  const { sarees, selectedSaree, setSelectedSaree } = useTryOn();
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  if (!sarees || sarees.length === 0) {
    return (
      <div className="w-full py-12 text-center text-slate-400 dark:text-zinc-500">
        <p className="text-sm font-medium">No sarees found in the catalog.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full group">
      
      {/* Scroll Navigation Buttons (Visible on hover on desktop) */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-[40%] z-10 -translate-y-1/2 p-3 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-gold-400 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-2"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-[40%] z-10 -translate-y-1/2 p-3 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-gold-400 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:-translate-x-2"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Horizontal Carousel Track */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-2 no-scrollbar"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE 10+
        }}
      >
        {sarees.map((saree) => (
          <div
            key={saree.id}
            className="w-[280px] sm:w-[300px] shrink-0 transform transition-transform duration-300 first:ml-0 hover:scale-[1.01]"
          >
            <SareeCard
              saree={saree}
              isSelected={selectedSaree && selectedSaree.id === saree.id}
              onSelect={() => setSelectedSaree(saree)}
            />
          </div>
        ))}
      </div>

      {/* Embedded styling for hiding scrollbar on Chrome/Safari */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Visual Indicator of count */}
      <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-slate-400 dark:text-zinc-500 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-gold-500" />
        <span>Select from {sarees.length} exclusive designer sarees</span>
      </div>

    </div>
  );
};

export default SareeSlider;
