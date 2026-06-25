import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, RefreshCw, Sparkles, Share2, Award, Heart, CheckCircle2 } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';
import ImageComparison from '../components/ImageComparison';

const ResultPage = () => {
  const { userImage, resultImage, selectedSaree, showToast, setSelectedSaree } = useTryOn();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!resultImage || !userImage) {
      showToast('No generated result found. Please start try-on.', 'info');
      navigate('/select-saree');
    }
  }, [resultImage, userImage]);

  const handleDownload = async () => {
    if (!resultImage) return;
    try {
      // Fetch image and trigger download to bypass cross-origin restrictions
      const response = await fetch(resultImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `saree-virtual-tryon-${selectedSaree?.id || 'result'}.webp`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      showToast('Image downloaded successfully!', 'success');
    } catch (err) {
      console.error(err);
      // Fallback
      const link = document.createElement('a');
      link.href = resultImage;
      link.target = '_blank';
      link.download = `saree-virtual-tryon.webp`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Fallback download opened in tab', 'info');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My AI Saree Virtual Try-On',
        text: `Look at me draped in this gorgeous ${selectedSaree?.name || 'Saree'}!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(resultImage || window.location.href);
      showToast('Image link copied to clipboard!', 'success');
    }
  };

  const handleGenerateAnother = () => {
    setSelectedSaree(null);
    navigate('/select-saree');
  };

  if (!resultImage || !userImage) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10 pb-20">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Try-On Generation Completed</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white">
          Your Virtual Drape Result
        </h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          The AI has successfully rendered the saree fabric along your pose. Use the slider tool to compare.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start max-w-4xl mx-auto">
        
        {/* Left Side: Before/After Slider */}
        <div className="md:col-span-7 flex justify-center">
          <ImageComparison beforeImage={userImage} afterImage={resultImage} />
        </div>

        {/* Right Side: Showcase Metadata and Download CTAs */}
        <div className="md:col-span-5 space-y-6 text-left">
          
          {/* Saree Spec Card */}
          <div className="glass-panel p-6 rounded-3xl border border-white/20 dark:border-zinc-800/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-gold-600 dark:text-gold-400 flex items-center gap-1">
                <Award className="w-4 h-4 text-gold-500" />
                <span>Premium Quality</span>
              </span>
              <span className="text-sm font-extrabold text-brand-600 dark:text-gold-400">
                {selectedSaree?.price}
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-serif font-bold text-slate-800 dark:text-white">
                {selectedSaree?.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Fabric: <strong className="font-semibold text-slate-700 dark:text-zinc-200">{selectedSaree?.material}</strong>
              </p>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Pattern details: <span className="italic text-slate-600 dark:text-zinc-300">{selectedSaree?.color}</span>
              </p>
            </div>

            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed border-t border-slate-100 dark:border-zinc-800/60 pt-4">
              {selectedSaree?.description}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3.5">
            {/* Download */}
            <button
              onClick={handleDownload}
              className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-brand-700 via-brand-600 to-gold-600 hover:from-brand-800 hover:to-gold-700 text-white flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <Download className="w-4.5 h-4.5" />
              <span>Download Image</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="w-full py-3.5 rounded-xl font-semibold border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center justify-center gap-2 transition-all duration-200"
            >
              <Share2 className="w-4.5 h-4.5" />
              <span>Share Draped Look</span>
            </button>

            {/* Try Another */}
            <button
              onClick={handleGenerateAnother}
              className="w-full py-3.5 rounded-xl font-semibold border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center justify-center gap-2 transition-all duration-200"
            >
              <RefreshCw className="w-4.5 h-4.5 text-brand-500" />
              <span>Generate Another Look</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-zinc-500 justify-center">
            <Heart className="w-3 h-3 text-brand-500 fill-brand-500" />
            <span>Saved directly to your History Gallery</span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ResultPage;
