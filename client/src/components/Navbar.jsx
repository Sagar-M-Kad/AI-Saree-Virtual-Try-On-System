import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Sparkles, Camera, History } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTryOn();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', icon: Sparkles },
    { path: '/select-saree', label: 'Select Saree', icon: Sparkles },
    { path: '/camera', label: 'Camera Capture', icon: Camera },
    { path: '/history', label: 'Try-On History', icon: History },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full transition-all duration-300 border-b glass-panel border-white/20 dark:border-zinc-800/40">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-gold-500 shadow-md">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider font-serif bg-clip-text text-transparent bg-gradient-to-r from-brand-800 via-gold-600 to-brand-700 dark:from-brand-300 dark:via-gold-400 dark:to-brand-200">
                PALLAV
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-slate-500 dark:text-zinc-400 -mt-1">
                AI Virtual Try-On
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800/50 ${
                    isActive(link.path)
                      ? 'text-brand-600 dark:text-gold-400 font-semibold'
                      : 'text-slate-600 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-gold-300'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-brand-500 to-gold-500" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Hand Actions (Theme toggle & Mobile menu btn) */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200/60 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 transition-all duration-300 shadow-sm"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-gold-400 animate-spin-slow" /> : <Moon className="w-5 h-5 text-brand-700" />}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 md:hidden rounded-xl border border-slate-200/60 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all duration-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-fade-in border-t border-slate-100 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-brand-50 text-brand-600 dark:bg-zinc-900 dark:text-gold-400 border-l-4 border-brand-500'
                      : 'text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900/40'
                  }`}
                >
                  <Icon className="w-5 h-5 opacity-70" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
