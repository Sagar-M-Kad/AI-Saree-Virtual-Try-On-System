import React, { createContext, useContext, useState, useEffect } from 'react';
import { sareeService } from '../services/api';

const TryOnContext = createContext();

export const useTryOn = () => {
  const context = useContext(TryOnContext);
  if (!context) {
    throw new Error('useTryOn must be used within a TryOnProvider');
  }
  return context;
};

export const TryOnProvider = ({ children }) => {
  const [userImage, setUserImage] = useState(null);
  const [selectedSaree, setSelectedSaree] = useState(null);
  const [sarees, setSarees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Generating your virtual saree look...');
  const [resultImage, setResultImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [toasts, setToasts] = useState([]);

  // Toast notifier
  const showToast = (message, type = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Sync Theme class on document
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    showToast(`Switched to ${theme === 'light' ? 'Dark' : 'Light'} Mode`, 'info');
  };

  // Load Sarees Catalog
  const fetchSarees = async () => {
    try {
      const data = await sareeService.getSarees();
      setSarees(data);
    } catch (err) {
      showToast('Failed to fetch sarees catalog', 'error');
    }
  };

  // Load History
  const fetchHistory = async () => {
    try {
      const data = await sareeService.getHistory();
      setHistory(data);
    } catch (err) {
      showToast('Failed to fetch try-on history', 'error');
    }
  };

  // Generate Try On
  const generateTryOn = async () => {
    if (!userImage) {
      showToast('Please capture or upload your photo first', 'error');
      return false;
    }
    if (!selectedSaree) {
      showToast('Please select a saree from the catalog', 'error');
      return false;
    }

    setLoading(true);
    setLoadingMessage('Uploading your portrait to the AI server...');
    
    // Simulate loading stage messages
    const stages = [
      'Analyzing body posture and alignment...',
      'Draping the silk fabric around posture...',
      'Adjusting lighting and fabric pleats...',
      'Rendering final premium resolution look...'
    ];
    
    let stageIdx = 0;
    const stageTimer = setInterval(() => {
      if (stageIdx < stages.length) {
        setLoadingMessage(stages[stageIdx]);
        stageIdx++;
      }
    }, 8000 / stages.length);

    try {
      const result = await sareeService.generateTryOn(userImage, selectedSaree.id);
      clearInterval(stageTimer);
      setResultImage(result.resultImage);
      // Refresh history list
      await fetchHistory();
      showToast('Try-On Generated Successfully!', 'success');
      setLoading(false);
      return result;
    } catch (err) {
      clearInterval(stageTimer);
      showToast('Failed to generate virtual try-on', 'error');
      setLoading(false);
      return false;
    }
  };

  // Delete history item
  const deleteHistoryItem = async (id) => {
    try {
      await sareeService.deleteHistory(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
      showToast('Deleted item from history', 'success');
    } catch (err) {
      showToast('Failed to delete history item', 'error');
    }
  };

  // Initial loads
  useEffect(() => {
    fetchSarees();
    fetchHistory();
  }, []);

  return (
    <TryOnContext.Provider
      value={{
        userImage,
        setUserImage,
        selectedSaree,
        setSelectedSaree,
        sarees,
        loading,
        setLoading,
        loadingMessage,
        setLoadingMessage,
        resultImage,
        setResultImage,
        history,
        fetchSarees,
        generateTryOn,
        fetchHistory,
        deleteHistoryItem,
        theme,
        toggleTheme,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </TryOnContext.Provider>
  );
};
