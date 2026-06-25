import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Check, Filter } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';
import SareeCard from '../components/SareeCard';

const SareeSelectionPage = () => {
  const { sarees, selectedSaree, setSelectedSaree, fetchSarees } = useTryOn();
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSarees();
  }, []);

  const categories = ['All', 'Silk', 'Organza', 'Georgette', 'Cotton'];

  const filteredSarees = activeFilter === 'All'
    ? sarees
    : sarees.filter(s => s.category.toLowerCase() === activeFilter.toLowerCase());

  const handleProceed = () => {
    if (!selectedSaree) return;
    navigate('/camera');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 pb-20">
      
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 border border-brand-200/50 dark:border-brand-900/30 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stage 1: Choose Your Couture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white">
          Select A Designer Saree
        </h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          Browse through our curated collection of authentic Indian textiles. Select any saree to try on virtually.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-lg mx-auto">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-zinc-500 mr-2 uppercase tracking-wider font-bold">
          <Filter className="w-3.5 h-3.5" />
          <span>Fabrics</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeFilter === cat
                ? 'bg-brand-600 text-white shadow-md border-brand-500'
                : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-300 border border-slate-200/60 dark:border-zinc-800 hover:border-gold-400/50 dark:hover:border-gold-600/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Saree Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSarees.map((saree) => (
          <SareeCard
            key={saree.id}
            saree={saree}
            isSelected={selectedSaree && selectedSaree.id === saree.id}
            onSelect={() => setSelectedSaree(saree)}
          />
        ))}
      </div>

      {/* Floating Selected Saree Detail Drawer (Bottom Sticky on Desktop/Mobile) */}
      {selectedSaree && (
        <div className="sticky bottom-6 z-30 w-full max-w-3xl mx-auto glass-panel p-5 rounded-3xl border border-gold-400/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-5 animate-slide-up bg-white/95 dark:bg-zinc-950/95">
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Thumbnail */}
            <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
              <img
                src={selectedSaree.image}
                alt={selectedSaree.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Metadata info */}
            <div className="text-left space-y-1">
              <p className="text-[10px] uppercase font-bold tracking-widest text-brand-600 dark:text-gold-400 flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
                <span>Selected Saree</span>
              </p>
              <h4 className="text-base font-serif font-extrabold text-slate-800 dark:text-white">
                {selectedSaree.name}
              </h4>
              <p className="text-xs text-slate-400 dark:text-zinc-500">
                {selectedSaree.material} &bull; {selectedSaree.color}
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <button
            onClick={handleProceed}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-700 via-brand-600 to-gold-600 hover:from-brand-800 hover:to-gold-700 text-white text-sm font-bold tracking-wider uppercase shadow-lg shadow-brand-100 dark:shadow-none hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Proceed to Camera Booth</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </div>
      )}

    </div>
  );
};

export default SareeSelectionPage;
