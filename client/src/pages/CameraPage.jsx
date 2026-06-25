import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Camera, Check } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';
import CameraCapture from '../components/CameraCapture';

const CameraPage = () => {
  const { userImage, selectedSaree, showToast } = useTryOn();
  const navigate = useNavigate();

  const handleProceed = () => {
    if (!userImage) {
      showToast('Please capture or upload a portrait first.', 'error');
      return;
    }
    navigate('/preview');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 pb-16">
      
      {/* Steps Progression Header */}
      <div className="flex items-center justify-between max-w-lg mx-auto pb-4">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
            <Check className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider mt-1.5 text-slate-400 dark:text-zinc-500">1. Saree</span>
        </div>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-emerald-500 to-brand-500 mx-2 -mt-4" />
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold shadow-md border-2 border-gold-400">
            <Camera className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider mt-1.5 text-brand-600 dark:text-gold-400">2. Photo</span>
        </div>
        <div className="h-[2px] flex-1 bg-slate-200 dark:bg-zinc-800 mx-2 -mt-4" />
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 flex items-center justify-center text-xs font-bold">
            3
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider mt-1.5 text-slate-400 dark:text-zinc-500">3. Preview</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="space-y-4 text-center max-w-xl mx-auto">
        <h1 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
          Capture Your Portrait
        </h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
          Stand in front of your webcam or upload a clear, full-body photo. This picture will be used by our AI to drape the selected saree.
        </p>

        {selectedSaree && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold-100/60 dark:bg-gold-950/20 border border-gold-300/40 text-gold-800 dark:text-gold-300 text-xs font-semibold">
            <span>Selected: {selectedSaree.name}</span>
          </div>
        )}
      </div>

      {/* Webcam Component Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-[2rem] border border-white/20 dark:border-zinc-800/40 shadow-xl max-w-2xl mx-auto">
        <CameraCapture />
      </div>

      {/* Navigation actions */}
      <div className="flex items-center justify-between max-w-2xl mx-auto pt-6 border-t border-slate-200/50 dark:border-zinc-800/40">
        <Link
          to="/select-saree"
          className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-zinc-400 hover:text-brand-600 dark:hover:text-gold-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Saree Selection</span>
        </Link>

        {userImage && (
          <button
            onClick={handleProceed}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-gold-600 text-white font-semibold text-xs tracking-wider uppercase hover:shadow-lg transition-all duration-200 animate-pulse-slow"
          >
            <span>Proceed to Preview</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
};

export default CameraPage;
