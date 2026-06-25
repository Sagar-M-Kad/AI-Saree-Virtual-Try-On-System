import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Shield, Cpu } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-zinc-950 border-t border-slate-200/60 dark:border-zinc-900 transition-colors duration-300">
      {/* Decorative Traditional Border Top Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-600 via-gold-500 to-royal-500" />
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-gold-500">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-serif font-bold tracking-wider text-brand-800 dark:text-gold-400">
                PALLAV
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-sm leading-relaxed">
              Experience the magic of traditional draping combined with next-generation artificial intelligence. Try on premium Indian sarees in real-time, instantly.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-zinc-500">
                <Shield className="w-3.5 h-3.5" />
                <span>100% Privacy Secure</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-zinc-500">
                <Cpu className="w-3.5 h-3.5" />
                <span>AI Powered Engine</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-zinc-500 font-sans">
              Discover
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-slate-600 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-gold-400 transition-colors">
                  Home Landing
                </Link>
              </li>
              <li>
                <Link to="/select-saree" className="text-sm text-slate-600 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-gold-400 transition-colors">
                  Saree Collection
                </Link>
              </li>
              <li>
                <Link to="/camera" className="text-sm text-slate-600 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-gold-400 transition-colors">
                  Camera Booth
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: History & Support */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-zinc-500 font-sans">
              Experience
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/history" className="text-sm text-slate-600 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-gold-400 transition-colors">
                  Try-On Gallery
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-gold-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-gold-400 transition-colors">
                  Instructions Guide
                </a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Divider */}
        <div className="my-8 h-[1px] bg-slate-200/60 dark:bg-zinc-900" />

        {/* Bottom copyright banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} Pallav Try-On Systems. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Handcrafted with</span>
            <Heart className="w-3 h-3 text-brand-500 fill-brand-500" />
            <span>in India for Premium Couture.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
