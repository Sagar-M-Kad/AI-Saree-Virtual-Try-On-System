import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Camera, ArrowRight, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-24">
      {/* Decorative background grids/lights */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-bl from-gold-200/20 via-brand-200/10 to-transparent dark:from-gold-950/20 dark:via-brand-950/10 dark:to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[35%] h-[35%] bg-gradient-to-tr from-royal-300/10 via-slate-100 to-transparent dark:from-royal-950/10 dark:via-zinc-900 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-8 text-left animate-slide-up">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-300/50 bg-gold-50/50 dark:bg-gold-950/20 dark:border-gold-800/40 text-gold-700 dark:text-gold-300">
              <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-spin-slow" />
              <span className="text-xs font-semibold tracking-wide uppercase">Next-Gen AI Couture Draping</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif text-slate-900 dark:text-white leading-[1.1]">
                Visualize Yourself in <br />
                <span className="text-gradient-brand">Exquisite Indian</span> <br />
                <span className="text-gradient-gold">Sarees, Instantly.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-500 dark:text-zinc-400 max-w-xl leading-relaxed">
                Step into the future of ethnic fashion. Capture a photo, select from our handpicked luxury catalog of Banarasi silk, Kanjeevaram, and designer organza sarees, and let our virtual try-on drape you in absolute elegance.
              </p>
            </div>

            {/* Interactive Stats Panel */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 border-t border-b border-slate-200/50 dark:border-zinc-800/50 py-4 max-w-md">
              <div>
                <span className="block text-2xl font-bold font-serif text-brand-600 dark:text-gold-400">10k+</span>
                <span className="block text-xs text-slate-400 dark:text-zinc-500 font-medium">Virtual Drapes</span>
              </div>
              <div>
                <span className="block text-2xl font-bold font-serif text-brand-600 dark:text-gold-400">99.4%</span>
                <span className="block text-xs text-slate-400 dark:text-zinc-500 font-medium">Posture Match</span>
              </div>
              <div>
                <span className="block text-2xl font-bold font-serif text-brand-600 dark:text-gold-400">100%</span>
                <span className="block text-xs text-slate-400 dark:text-zinc-500 font-medium">Secure Gallery</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/select-saree"
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold tracking-wide text-white bg-gradient-to-r from-brand-700 via-brand-600 to-gold-600 hover:from-brand-800 hover:to-gold-700 shadow-md shadow-brand-200 dark:shadow-none hover:shadow-lg transition-all duration-300"
              >
                <span>Start Virtual Try-On</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/history"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold tracking-wide border border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-gold-400 transition-all duration-300"
              >
                <span>View Past Looks</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Premium Showcase Image Cards */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center animate-fade-in">
            {/* Visual background rings */}
            <div className="absolute w-[80%] h-[80%] border border-gold-300/20 dark:border-gold-700/10 rounded-full animate-pulse-slow pointer-events-none" />

            {/* Main Image Showcase */}
            <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-3xl overflow-hidden border-2 border-gold-400/30 shadow-2xl dark:shadow-zinc-950/60 transform rotate-2 hover:rotate-0 transition-transform duration-500 group">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600"
                alt="Beautiful Banarasi Saree Couture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Image Gradient Shade Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
              
              {/* Draping Status Floating Card */}
              <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 rounded-2xl flex items-center justify-between border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                      alt="User avatar preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">Source Portrait</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-white">Alisha Sen</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-brand-50 dark:bg-brand-950/50 px-2 py-1 rounded-lg text-brand-600 dark:text-brand-300 font-bold text-[10px]">
                  <Star className="w-3 h-3 fill-current text-brand-500" />
                  <span>Draped</span>
                </div>
              </div>
            </div>

            {/* Overlap Secondary Card */}
            <div className="absolute -left-6 bottom-12 glass-panel border border-white/20 p-3.5 rounded-2xl shadow-xl w-44 hidden sm:flex items-center gap-2.5 transform -rotate-3 hover:rotate-0 transition-all duration-300">
              <div className="w-8 h-8 rounded-lg bg-gold-100 dark:bg-gold-950/60 flex items-center justify-center text-gold-600 dark:text-gold-400">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">AI Fabric Fit</p>
                <p className="text-xs font-extrabold text-slate-800 dark:text-white">Perfect drape</p>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
