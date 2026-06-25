import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sparkles, X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { TryOnProvider, useTryOn } from './context/TryOnContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import CameraPage from './pages/CameraPage';
import SareeSelectionPage from './pages/SareeSelectionPage';
import PreviewPage from './pages/PreviewPage';
import ResultPage from './pages/ResultPage';
import HistoryPage from './pages/HistoryPage';

// Toast Container Subcomponent
const ToastContainer = () => {
  const { toasts, removeToast } = useTryOn();
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-[90%] sm:w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = Info;
        let style = 'bg-sky-50 dark:bg-sky-950/90 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-900/40';
        
        if (toast.type === 'success') {
          Icon = CheckCircle2;
          style = 'bg-emerald-50 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/40';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          style = 'bg-rose-50 dark:bg-rose-950/90 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-900/40';
        }
        
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl flex items-center gap-3 border animate-slide-up text-xs font-semibold ${style}`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="flex-1 text-left">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Close Notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

// Main App Router Subcomponent
const AppContent = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF9F6] dark:bg-[#121212] transition-colors duration-300 text-slate-800 dark:text-zinc-100 font-sans">
      <div>
        <Navbar />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/select-saree" element={<SareeSelectionPage />} />
            <Route path="/camera" element={<CameraPage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
      </div>
      
      <Footer />
      <LoadingScreen />
      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <TryOnProvider>
      <Router>
        <AppContent />
      </Router>
    </TryOnProvider>
  );
}

export default App;
