import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('hindi');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('farmingHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error loading history:', e);
      }
    }
  }, []);

  const addToHistory = (query) => {
    const newHistory = [query, ...history].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('farmingHistory', JSON.stringify(newHistory));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'hindi' ? 'english' : 'hindi'));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        toggleLanguage,
        result,
        setResult,
        loading,
        setLoading,
        error,
        setError,
        uploadedImage,
        setUploadedImage,
        history,
        addToHistory
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}