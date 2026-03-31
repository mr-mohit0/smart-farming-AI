import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Volume2, Camera, Mic, ChevronDown, Zap, Shield, TrendingUp, Check } from 'lucide-react';
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
      tryVoice: 'वॉइस डेमो आज़माएं',
      badge1: '24/7 उपलब्ध',
      badge2: 'हिंदी समर्थन',
      badge3: 'मुफ्त परामर्श',
      askQuestion: 'अपना सवाल पूछें',
      analyzing: 'विश्लेषण कर रहे हैं...',
      recommendation: 'गेहूं की खेती की सिफारिश',
      weatherGood: 'मौसम अनुकूल है',
      soilPerfect: 'मिट्टी सही है'
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
      tryVoice: 'Try Voice Demo',
      badge1: '24/7 Available',
      badge2: 'Hindi Support',
      badge3: 'Free Consultation',
      askQuestion: 'Ask your question',
      analyzing: 'Analyzing...',
      recommendation: 'Wheat crop recommended',
      weatherGood: 'Weather is favorable',
      soilPerfect: 'Soil is perfect'
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

  const floatingBadges = [
    { icon: Zap, text: t.badge1, color: 'from-green-500 to-green-600' },
    { icon: Shield, text: t.badge2, color: 'from-blue-500 to-blue-600' },
    { icon: TrendingUp, text: t.badge3, color: 'from-orange-500 to-orange-600' }
  ];

  const results = [
    { icon: Check, text: t.recommendation },
    { icon: Check, text: t.weatherGood },
    { icon: Check, text: t.soilPerfect }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-green-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 pt-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-green-200/20 dark:bg-green-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-200/20 dark:bg-orange-900/20 rounded-full blur-3xl" />
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-32 left-20 w-16 h-16 bg-green-500/10 dark:bg-green-500/20 rounded-2xl backdrop-blur-sm"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 right-20 w-20 h-20 bg-orange-500/10 dark:bg-orange-500/20 rounded-full backdrop-blur-sm"
        />
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
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-900 dark:text-white leading-tight"
                  data-testid="hero-title"
                >
                  {t.title}
                  <br />
                  <span className="text-green-700 dark:text-green-500">{t.titleSuffix}</span>
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
                className="text-lg sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl"
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
                    className="flex items-center space-x-3 px-5 py-3 bg-white dark:bg-stone-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-stone-200 dark:border-stone-700"
                  >
                    <Icon className="w-5 h-5 text-green-700 dark:text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-stone-700 dark:text-stone-300">{feature.label}</span>
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

          {/* Right Mockup Card with Interactive Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            {/* Floating Info Badges */}
            <div className="absolute -top-8 -left-8 z-20 space-y-3">
              {floatingBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      y: [0, -10, 0]
                    }}
                    transition={{ 
                      opacity: { delay: 1 + index * 0.15, duration: 0.5 },
                      x: { delay: 1 + index * 0.15, duration: 0.5 },
                      y: { duration: 3, repeat: Infinity, delay: index * 0.5, ease: 'easeInOut' }
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${badge.color} text-white rounded-xl shadow-lg backdrop-blur-sm`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-semibold">{badge.text}</span>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative bg-white dark:bg-stone-800 rounded-3xl shadow-2xl p-8 border border-stone-200 dark:border-stone-700"
            >
              {/* Card Header with Input */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-md">
                    <Sprout className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-stone-900 dark:text-white">
                      {language === 'hindi' ? 'AI सहायक' : 'AI Assistant'}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {language === 'hindi' ? 'तत्काल सिफारिशें' : 'Instant recommendations'}
                    </p>
                  </div>
                </div>
                
                {/* Interactive Input */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder={t.askQuestion}
                    className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-700 dark:text-stone-300 placeholder-stone-400 focus:outline-none focus:border-green-600"
                    readOnly
                  />
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-600 rounded-full"
                  />
                </motion.div>
              </div>

              {/* Results Content */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 mb-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full"
                  />
                  <span className="text-xs text-stone-500 dark:text-stone-400">{t.analyzing}</span>
                </div>

                {results.map((result, index) => {
                  const Icon = result.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + index * 0.2, duration: 0.5 }}
                      className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-600"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{result.text}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-500 rounded-full opacity-20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-500 rounded-full opacity-20 blur-2xl" />
            </motion.div>

            {/* Success Rate Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-white dark:bg-stone-800 rounded-2xl p-4 shadow-xl border border-stone-200 dark:border-stone-700"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {language === 'hindi' ? 'सफलता दर' : 'Success Rate'}
                  </p>
                  <p className="text-lg font-bold text-green-600">95%</p>
                </div>
              </div>
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
          <ChevronDown className="w-6 h-6 text-stone-400 dark:text-stone-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;