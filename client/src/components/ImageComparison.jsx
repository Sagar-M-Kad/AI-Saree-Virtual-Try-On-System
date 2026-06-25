import React, { useState, useRef, useEffect } from 'react';
import { Eye, Split } from 'lucide-react';

const ImageComparison = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0-100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Visual Instruction Badge */}
      <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 dark:text-zinc-500">
        <Split className="w-4 h-4 text-gold-500" />
        <span>Drag the slider to compare Before and After</span>
      </div>

      {/* Comparison Container */}
      <div
        ref={containerRef}
        className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800 select-none cursor-ew-resize"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Before Image (Source Portrait - Full Background) */}
        <img
          src={beforeImage}
          alt="Original Portrait"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        
        {/* Before Tag (Bottom Left) */}
        <div className="absolute bottom-4 left-4 bg-slate-950/70 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg border border-white/10 z-10">
          Before
        </div>

        {/* After Image (Virtual Saree Try-On - Clipped Width Overlay) */}
        <div
          className="absolute inset-y-0 left-0 h-full overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={afterImage}
            alt="AI Draped Saree"
            className="absolute inset-y-0 left-0 h-full object-cover pointer-events-none max-w-none"
            style={{ width: containerRef.current ? containerRef.current.offsetWidth : '400px' }}
          />
        </div>
        
        {/* After Tag (Bottom Right) */}
        <div className="absolute bottom-4 right-4 bg-brand-950/80 backdrop-blur-md text-gold-400 text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg border border-brand-500/20 z-10">
          After
        </div>

        {/* Sliding Vertical Divider Handle */}
        <div
          className="absolute inset-y-0 w-1 bg-gradient-to-b from-brand-500 via-gold-400 to-brand-500 cursor-ew-resize flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute w-8 h-8 rounded-full bg-white dark:bg-zinc-900 shadow-2xl border-2 border-gold-500 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
            <Eye className="w-4 h-4 text-brand-600 dark:text-gold-400" />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ImageComparison;
