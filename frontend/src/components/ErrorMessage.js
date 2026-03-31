import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ErrorMessage = ({ onRetry }) => {
  const { language } = useApp();

  const translations = {
    hindi: {
      message: 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।',
      retry: 'पुनः प्रयास करें'
    },
    english: {
      message: 'Something went wrong. Please try again.',
      retry: 'Retry'
    }
  };

  const t = translations[language];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-red-200 shadow-sm rounded-2xl p-6 md:p-8"
      data-testid="error-message"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <p className="text-base leading-relaxed text-stone-600">{t.message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition-colors font-semibold shadow-sm flex items-center space-x-2"
            data-testid="retry-button"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t.retry}</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorMessage;