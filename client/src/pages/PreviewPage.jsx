import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Sparkles, User, Shirt, ChevronRight, Check } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

const PreviewPage = () => {
  const { userImage, selectedSaree, generateTryOn, showToast } = useTryOn();
  const navigate = useNavigate();

  // Redirect if configurations are missing
  React.useEffect(() => {
    if (!selectedSaree) {
      showToast('Please select a saree first.', 'info');
      navigate('/select-saree');
    } else if (!userImage) {
      showToast('Please capture or upload a portrait first.', 'info');
      navigate('/camera');
    }
  }, [userImage, selectedSaree]);

  const handleGenerate = async () => {
    const success = await generateTryOn();
    if (success) {
      navigate('/result');
    }
  };

  if (!selectedSaree || !userImage) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10 pb-20">
      
      {/* Progression Steps */}
      <div className="flex items-center justify-between max-w-lg mx-auto pb-4">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
            <Check className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider mt-1.5 text-slate-400 dark:text-zinc-500">1. Saree</span>
        </div>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-emerald-500 to-emerald-500 mx-2 -mt-4" />
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
            <Check className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider mt-1.5 text-slate-400 dark:text-zinc-500">2. Photo</span>
        </div>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-emerald-500 to-brand-500 mx-2 -mt-4" />
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold shadow-md border-2 border-gold-400">
            3
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider mt-1.5 text-brand-600 dark:text-gold-400">3. Preview</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
          Review Selections
        </h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          Double-check your portrait pose and selected saree before running the AI virtual try-on drape.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
        
        {/* Left Side: User Portrait Preview */}
        <div className="glass-panel p-5 rounded-3xl border border-white/20 dark:border-zinc-800/40 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <User className="w-4 h-4 text-brand-600 dark:text-gold-400" />
              <span>Your Portrait</span>
            </h3>
            <Link
              to="/camera"
              className="text-[11px] uppercase font-bold tracking-wider text-slate-400 dark:text-zinc-500 hover:text-brand-600 dark:hover:text-gold-400 transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retake</span>
            </Link>
          </div>

          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/40">
            <img
              src={userImage}
              alt="User Uploaded Frame"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side: Selected Saree Preview */}
        <div className="glass-panel p-5 rounded-3xl border border-white/20 dark:border-zinc-800/40 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Shirt className="w-4 h-4 text-brand-600 dark:text-gold-400" />
              <span>Selected Couture</span>
            </h3>
            <Link
              to="/select-saree"
              className="text-[11px] uppercase font-bold tracking-wider text-slate-400 dark:text-zinc-500 hover:text-brand-600 dark:hover:text-gold-400 transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Change</span>
            </Link>
          </div>

          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-800">
              <img
                src={selectedSaree.image}
                alt={selectedSaree.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-brand-600 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md border border-brand-400 shadow-lg">
                {selectedSaree.price}
              </div>
            </div>

            <div className="text-left space-y-1">
              <h4 className="font-serif font-bold text-slate-800 dark:text-white text-base">
                {selectedSaree.name}
              </h4>
              <p className="text-xs text-slate-400 dark:text-zinc-500">
                {selectedSaree.material} &bull; {selectedSaree.color}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Giant CTA Section */}
      <div className="max-w-md mx-auto space-y-4 pt-4">
        <button
          onClick={handleGenerate}
          className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-brand-700 via-brand-600 to-gold-600 hover:from-brand-800 hover:to-gold-700 text-white font-bold tracking-wider uppercase text-sm shadow-xl shadow-brand-100 dark:shadow-none hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <Sparkles className="w-5 h-5 text-white animate-spin-slow group-hover:scale-110" />
          <span>Generate AI Saree Look</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-slate-400 dark:text-zinc-500 text-center leading-relaxed">
          By clicking generate, our AI will drape the fabric folds according to your pose. Processing takes around 3 seconds.
        </p>
      </div>

    </div>
  );
};

export default PreviewPage;
