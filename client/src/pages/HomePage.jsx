import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Camera, Shirt, ArrowRight, ShieldCheck, HeartHandshake, Zap } from 'lucide-react';
import Hero from '../components/Hero';

const HomePage = () => {
  
  const steps = [
    {
      num: '01',
      title: 'Choose Your Saree',
      desc: 'Browse our exclusive catalog of Banarasi silk, Kanjeevarams, and designer prints. Pick your dream outfit.',
      icon: Shirt,
      color: 'text-brand-600 bg-brand-50 dark:bg-brand-950/40 dark:text-brand-400'
    },
    {
      num: '02',
      title: 'Capture/Upload Portrait',
      desc: 'Capture a well-lit full-body picture using your webcam, or select an existing photo from your device.',
      icon: Camera,
      color: 'text-gold-600 bg-gold-50 dark:bg-gold-950/40 dark:text-gold-400'
    },
    {
      num: '03',
      title: 'Get Virtual Drape',
      desc: 'Our proprietary AI engine matches posture and wraps the fabric around you in high-definition details.',
      icon: Sparkles,
      color: 'text-royal-600 bg-royal-50 dark:bg-royal-950/40 dark:text-royal-400'
    }
  ];

  const features = [
    {
      title: 'High-Fidelity AI Textures',
      desc: 'Fabric folds, shadows, borders, and color textures are blended seamlessly onto your pose.',
      icon: Zap
    },
    {
      title: 'Zero Latency Rendering',
      desc: 'Receive your styled model pictures in under 3 seconds, ready for preview and downloads.',
      icon: Sparkles
    },
    {
      title: 'Secure & Privacy First',
      desc: 'We encrypt and process images temporarily. Your uploads are never stored permanently without consent.',
      icon: ShieldCheck
    },
    {
      title: 'Curated Ethnic Couture',
      desc: 'Direct tie-ups with master weavers across India to display realistic, buyable ethnic sarees.',
      icon: HeartHandshake
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <Hero />

      {/* How it Works Section */}
      <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-xs uppercase tracking-[0.2em] font-extrabold text-brand-600 dark:text-gold-400">
            Draping Workflow
          </h2>
          <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Three Steps to Virtual Perfection
          </h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            Drape elegant couture sarees without ever stepping foot inside a physical trial room.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl relative border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left"
              >
                {/* Floating step count */}
                <div className="absolute top-4 right-4 text-3xl font-serif font-extrabold text-slate-200 dark:text-zinc-800">
                  {step.num}
                </div>

                {/* Icon wrapper */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-inner ${step.color}`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title and description */}
                <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 font-serif">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Highlight Banner */}
      <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="glass-panel border border-white/20 dark:border-zinc-800/40 p-8 sm:p-12 rounded-[2rem] relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-600/5 via-gold-500/5 to-transparent pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            <div className="lg:col-span-5 text-left space-y-6">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
                Designed for Luxury Boutiques & Smart Shoppers
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                Unlock instant virtual previews of traditional weaves. Avoid the hassle of physically draping multiple heavier silk sarees, while getting a precise, color-accurate showcase.
              </p>
              <Link
                to="/select-saree"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-slate-900 text-xs font-semibold tracking-wide transition-all shadow-md"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="flex gap-4 text-left">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-gold-100 dark:bg-gold-950/40 flex items-center justify-center text-gold-600 dark:text-gold-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-sm font-bold text-slate-800 dark:text-white font-sans">
                        {feat.title}
                      </h5>
                      <p className="text-xs text-slate-400 dark:text-zinc-500 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
