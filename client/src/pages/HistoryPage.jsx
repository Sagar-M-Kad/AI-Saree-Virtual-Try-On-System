import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Download, ExternalLink, Calendar, RefreshCw, Sparkles, FolderHeart } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

const HistoryPage = () => {
  const { history, fetchHistory, deleteHistoryItem, resultImage, setResultImage, setSelectedSaree, userImage, setUserImage, sarees, showToast } = useTryOn();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDownload = async (item) => {
    try {
      const response = await fetch(item.resultImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `saree-tryon-history-${item.id}.webp`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      showToast('Image downloaded successfully!', 'success');
    } catch (err) {
      const link = document.createElement('a');
      link.href = item.resultImage;
      link.target = '_blank';
      link.download = `saree-tryon-history.webp`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Fallback download opened in tab', 'info');
    }
  };

  const handleReview = (item) => {
    // Lock context variables to this historical selection
    const matchedSaree = sarees.find(s => s.id === item.sareeId);
    if (matchedSaree) {
      setSelectedSaree(matchedSaree);
    }
    setUserImage(item.userImage);
    setResultImage(item.resultImage);
    navigate('/result');
  };

  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return isoString;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 pb-20 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-slate-200/60 dark:border-zinc-900 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-600 dark:text-gold-400">
            <FolderHeart className="w-4 h-4 text-brand-500" />
            <span>Virtual Dressing Room Archive</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Try-On History Gallery
          </h1>
        </div>

        <button
          onClick={fetchHistory}
          className="flex items-center gap-2 self-start px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Gallery</span>
        </button>
      </div>

      {/* Grid Display */}
      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 px-4 glass-panel rounded-[2rem] border border-white/20 dark:border-zinc-900">
          <div className="w-16 h-16 rounded-2xl bg-gold-50 dark:bg-gold-950/20 text-gold-600 dark:text-gold-400 flex items-center justify-center mb-6 shadow-inner animate-pulse-slow">
            <FolderHeart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-serif text-slate-800 dark:text-white mb-2">
            No try-ons recorded yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-500 max-w-sm mb-8 leading-relaxed">
            Your generated looks will appear here automatically. Start trying on custom sarees to build your collection.
          </p>
          <button
            onClick={() => navigate('/select-saree')}
            className="px-6 py-3 bg-gradient-to-r from-brand-600 to-gold-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md"
          >
            Start Virtual Try-On
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {history.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden border border-slate-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 hover:shadow-xl transition-all duration-300"
            >
              
              {/* Image Output Display */}
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
                <img
                  src={item.resultImage}
                  alt={item.sareeName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                
                {/* Floating controls layout */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">
                  
                  {/* Top Action controls */}
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleDownload(item)}
                      className="p-2 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 border border-white/20 transition-all"
                      title="Download image"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteHistoryItem(item.id)}
                      className="p-2 rounded-lg bg-red-500/20 backdrop-blur-md text-red-300 hover:bg-red-600 hover:text-white border border-red-500/30 transition-all"
                      title="Delete item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bottom details clickable reviewer */}
                  <button
                    onClick={() => handleReview(item)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-gold-600 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>View Draped Result</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                </div>
              </div>

              {/* Card Footer Detail Panel */}
              <div className="p-4 space-y-2 bg-white dark:bg-zinc-900">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-serif font-extrabold text-slate-800 dark:text-white text-sm line-clamp-1 leading-tight">
                    {item.sareeName}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-zinc-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default HistoryPage;
