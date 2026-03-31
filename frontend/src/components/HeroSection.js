import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const HeroSection = () => {
  const navigate = useNavigate();
  const { language } = useApp();

  const translations = {
    hindi: {
      title: 'स्मार्ट फार्मिंग AI सहायक',
      subtitle:
        'भारतीय किसानों के लिए AI-संचालित फसल मार्गदर्शन, रोग पहचान और स्मार्ट कृषि समाधान',
      features: 'फसल सलाह | रोग पहचान | छवि विश्लेषण | हिंदी आवाज',
      getStarted: 'शुरू करें',
      tryVoice: 'वॉइस डेमो आज़माएं',
      badge1: 'AI संचालित',
      badge2: 'भारतीय किसानों के लिए'
    },
    english: {
      title: 'Smart Farming AI Assistant',
      subtitle:
        'AI-powered crop guidance, disease detection, and smart farming solutions for Indian farmers',
      features: 'Crop Advice | Disease Detection | Image Analysis | Hindi Voice',
      getStarted: 'Get Started',
      tryVoice: 'Try Voice Demo',
      badge1: 'AI Powered',
      badge2: 'For Indian Farmers'
    }
  };

  const t = translations[language];

  const handleVoiceDemo = () => {
    const text =
      language === 'hindi'
        ? 'नमस्ते, मैं स्मार्ट फार्मिंग AI सहायक हूं। मैं आपको फसल की सिफारिश और रोग पहचान में मदद कर सकता हूं।'
        : 'Hello, I am the Smart Farming AI Assistant. I can help you with crop recommendations and disease detection.';

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hindi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Voice synthesis not supported in your browser');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/36719188/pexels-photo-36719188.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="px-4 py-2 bg-white/70 backdrop-blur-xl border border-white/50 rounded-full text-xs font-bold uppercase tracking-wider text-green-700"
              data-testid="hero-badge-ai"
            >
              {t.badge1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="px-4 py-2 bg-white/70 backdrop-blur-xl border border-white/50 rounded-full text-xs font-bold uppercase tracking-wider text-orange-600"
              data-testid="hero-badge-farmers"
            >
              {t.badge2}
            </motion.span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-bold text-white"
            data-testid="hero-title"
          >
            {t.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            data-testid="hero-subtitle"
          >
            {t.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-base text-white/80 font-medium"
            data-testid="hero-features"
          >
            {t.features}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => navigate('/dashboard')}
              className="group px-8 py-4 bg-green-700 text-white rounded-xl hover:bg-green-800 transition-all duration-300 font-semibold shadow-lg flex items-center space-x-2 transform hover:scale-105"
              data-testid="hero-get-started-btn"
            >
              <Sparkles className="w-5 h-5" />
              <span>{t.getStarted}</span>
            </button>

            <button
              onClick={handleVoiceDemo}
              className="group px-8 py-4 bg-white/90 backdrop-blur-xl text-green-800 border-2 border-white rounded-xl hover:bg-white transition-all duration-300 font-semibold shadow-lg flex items-center space-x-2 transform hover:scale-105"
              data-testid="hero-voice-demo-btn"
            >
              <Mic className="w-5 h-5" />
              <span>{t.tryVoice}</span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;