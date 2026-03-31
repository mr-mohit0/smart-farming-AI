import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Volume2, Camera, Mic, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const HeroSection = () => {
  const navigate = useNavigate();
  const { language } = useApp();

  const translations = {
    hindi: {
      title: 'स्मार्ट फार्मिंग',
      titleSuffix: 'AI सहायक',
      subtitle:
        'भारतीय किसानों के लिए AI-संचालित फसल मार्गदर्शन, रोग पहचान और स्मार्ट कृषि समाधान',
      cropAdvice: 'फसल सलाह',
      diseaseDetection: 'रोग पहचान',
      imageAnalysis: 'छवि विश्लेषण',
      hindiVoice: 'हिंदी आवाज',
      getStarted: 'शुरू करें',
      tryVoice: 'वॉइस डेमो आज़माएं'
    },
    english: {
      title: 'Smart Farming',
      titleSuffix: 'AI Assistant',
      subtitle:
        'AI-powered crop guidance, disease detection, and smart farming solutions for Indian farmers',
      cropAdvice: 'Crop Advice',
      diseaseDetection: 'Disease Detection',
      imageAnalysis: 'Image Analysis',
      hindiVoice: 'Hindi Voice',
      getStarted: 'Get Started',
      tryVoice: 'Try Voice Demo'
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
    }
  };

  const features = [
    { icon: Sprout, label: t.cropAdvice },
    { icon: Camera, label: t.diseaseDetection },
    { icon: Camera, label: t.imageAnalysis },
    { icon: Volume2, label: t.hindiVoice }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-green-50 pt-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-left"
          >
            {/* Title with Plant Icon */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-start space-x-4"
              >
                <h1
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-900 leading-tight"
                  data-testid="hero-title"
                >
                  {t.title}
                  <br />
                  <span className="text-green-700">{t.titleSuffix}</span>
                </h1>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
                  className="flex-shrink-0 mt-2"
                >
                  <div className="relative">
                    <div className="w-16 h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-b-full" />
                    <Sprout className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 text-green-500" />
                  </div>
                </motion.div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg sm:text-xl text-stone-600 leading-relaxed max-w-xl"
                data-testid="hero-subtitle"
              >
                {t.subtitle}
              </motion.p>
            </div>

            {/* Feature Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-2 gap-3"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center space-x-3 px-5 py-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-stone-200"
                  >
                    <Icon className="w-5 h-5 text-green-700 flex-shrink-0" />
                    <span className="text-sm font-medium text-stone-700">{feature.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/dashboard')}
                className="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                data-testid="hero-get-started-btn"
              >
                <Sprout className="w-5 h-5" />
                <span>{t.getStarted}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleVoiceDemo}
                className="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                data-testid="hero-voice-demo-btn"
              >
                <Mic className="w-5 h-5" />
                <span>{t.tryVoice}</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Mockup Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative bg-white rounded-3xl shadow-2xl p-8 border border-stone-200"
            >
              {/* Card Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-md">
                  <Sprout className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-stone-200 rounded-full w-3/4 animate-pulse" />
                  <div className="h-3 bg-stone-100 rounded-full w-1/2 animate-pulse" />
                </div>
              </div>

              {/* Card Content */}
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.15, duration: 0.5 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0" />
                    <div className="flex-1 h-3 bg-stone-100 rounded-full" style={{ width: `${90 - index * 10}%` }} />
                  </motion.div>
                ))}
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-500 rounded-full opacity-20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-500 rounded-full opacity-20 blur-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center space-y-2"
        >
          <ChevronDown className="w-6 h-6 text-stone-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;