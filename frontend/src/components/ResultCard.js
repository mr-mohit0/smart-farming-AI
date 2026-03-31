import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Copy, Sprout, AlertTriangle, Pill, CloudRain, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

const ResultCard = ({ data, isStreaming = false, isRealtime = true }) => {
  const { language } = useApp();
  const [displayedText, setDisplayedText] = useState({});
  const [isTyping, setIsTyping] = useState(false);

  const translations = {
    hindi: {
      crop: 'फसल',
      disease: 'रोग',
      solution: 'समाधान',
      reason: 'कारण',
      cause: 'कारण',
      tips: 'सुझाव',
      weather: 'मौसम',
      severity: 'गंभीरता',
      confidence: 'विश्वास',
      expectedYield: 'अपेक्षित उपज',
      copied: 'कॉपी हो गया!',
      temperature: 'तापमान',
      humidity: 'आर्द्रता'
    },
    english: {
      crop: 'Crop',
      disease: 'Disease',
      solution: 'Solution',
      reason: 'Reason',
      cause: 'Cause',
      tips: 'Tips',
      weather: 'Weather',
      severity: 'Severity',
      confidence: 'Confidence',
      expectedYield: 'Expected Yield',
      copied: 'Copied!',
      temperature: 'Temperature',
      humidity: 'Humidity'
    }
  };

  const t = translations[language];

  // Streaming/typing effect - ChatGPT style
  useEffect(() => {
    if (!data || !isStreaming) {
      setDisplayedText(data || {});
      return;
    }

    setIsTyping(true);
    const fieldsToAnimate = Object.keys(data).filter(key => typeof data[key] === 'string' && key !== 'weather');
    let currentFieldIndex = 0;
    let currentCharIndex = 0;
    const newDisplayed = {};

    const typeNextChar = () => {
      if (currentFieldIndex >= fieldsToAnimate.length) {
        setIsTyping(false);
        return;
      }

      const currentField = fieldsToAnimate[currentFieldIndex];
      const fullText = data[currentField] || '';

      if (currentCharIndex < fullText.length) {
        newDisplayed[currentField] = fullText.substring(0, currentCharIndex + 1);
        setDisplayedText({ ...newDisplayed, weather: data.weather });
        currentCharIndex++;
        setTimeout(typeNextChar, 20); // Speed of typing
      } else {
        currentFieldIndex++;
        currentCharIndex = 0;
        setTimeout(typeNextChar, 100); // Pause between fields
      }
    };

    typeNextChar();
  }, [data, isStreaming]);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      let text = '';

      if (displayedText.crop) {
        text += `${t.crop}: ${displayedText.crop}. `;
        if (displayedText.reason) text += `${t.reason}: ${displayedText.reason}. `;
        if (displayedText.tips) text += `${t.tips}: ${displayedText.tips}. `;
      }

      if (displayedText.disease) {
        text += `${t.disease}: ${displayedText.disease}. `;
        if (displayedText.cause) text += `${t.cause}: ${displayedText.cause}. `;
        if (displayedText.solution) text += `${t.solution}: ${displayedText.solution}. `;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hindi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error('Voice synthesis not supported');
    }
  };

  const handleCopy = () => {
    let text = '';

    if (displayedText.crop) {
      text += `${t.crop}: ${displayedText.crop}\n`;
      if (displayedText.reason) text += `${t.reason}: ${displayedText.reason}\n`;
      if (displayedText.tips) text += `${t.tips}: ${displayedText.tips}\n`;
      if (displayedText.expectedYield) text += `${t.expectedYield}: ${displayedText.expectedYield}\n`;
    }

    if (displayedText.disease) {
      text += `${t.disease}: ${displayedText.disease}\n`;
      if (displayedText.cause) text += `${t.cause}: ${displayedText.cause}\n`;
      if (displayedText.solution) text += `${t.solution}: ${displayedText.solution}\n`;
      if (displayedText.severity) text += `${t.severity}: ${displayedText.severity}\n`;
    }

    if (displayedText.weather) {
      text += `\n${t.weather}:\n`;
      text += `${t.temperature}: ${displayedText.weather.temperature}°C\n`;
      text += `${t.humidity}: ${displayedText.weather.humidity}%\n`;
    }

    navigator.clipboard.writeText(text);
    toast.success(t.copied);
  };

  if (!displayedText) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-xl backdrop-saturate-150 border border-stone-200 dark:border-stone-700 shadow-lg rounded-2xl p-6 md:p-8 space-y-6"
      data-testid="result-card"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-medium text-stone-800 dark:text-white">
            {displayedText.crop ? t.crop : t.disease} {language === 'hindi' ? 'परिणाम' : 'Results'}
          </h3>
          {isRealtime && (
            <span className="px-2 py-0.5 text-xs font-bold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded-full" data-testid="realtime-badge">
              {language === 'hindi' ? 'AI लाइव' : 'AI Live'}
            </span>
          )}
          {!isRealtime && (
            <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 rounded-full" data-testid="fallback-badge">
              {language === 'hindi' ? 'सामान्य' : 'General'}
            </span>
          )}
          {isTyping && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex items-center space-x-1"
            >
              <div className="w-2 h-2 bg-green-600 rounded-full" />
              <div className="w-2 h-2 bg-green-600 rounded-full" />
              <div className="w-2 h-2 bg-green-600 rounded-full" />
            </motion.div>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleSpeak}
            className="p-2 bg-green-100 dark:bg-green-900/50 hover:bg-green-200 dark:hover:bg-green-900 rounded-lg transition-colors"
            data-testid="speak-button"
            title="Speak"
          >
            <Volume2 className="w-5 h-5 text-green-700 dark:text-green-500" />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 rounded-lg transition-colors"
            data-testid="copy-button"
            title="Copy"
          >
            <Copy className="w-5 h-5 text-stone-700 dark:text-stone-300" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {displayedText.crop && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-600"
              data-testid="crop-info"
            >
              <Sprout className="w-6 h-6 text-green-700 dark:text-green-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-green-800 dark:text-green-400">{t.crop}</p>
                <p className="text-green-700 dark:text-green-300 mt-1">
                  {displayedText.crop}
                  {isTyping && displayedText.crop === data?.crop && (
                    <span className="inline-block w-2 h-4 bg-green-700 ml-1 animate-pulse" />
                  )}
                </p>
              </div>
            </motion.div>
          )}

          {displayedText.disease && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start space-x-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-l-4 border-orange-600"
              data-testid="disease-info"
            >
              <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-orange-800 dark:text-orange-400">{t.disease}</p>
                <p className="text-orange-700 dark:text-orange-300 mt-1">
                  {displayedText.disease}
                  {isTyping && displayedText.disease === data?.disease && (
                    <span className="inline-block w-2 h-4 bg-orange-700 ml-1 animate-pulse" />
                  )}
                </p>
              </div>
            </motion.div>
          )}

          {(displayedText.reason || displayedText.cause) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl"
              data-testid="cause-info"
            >
              <p className="font-semibold text-stone-800 dark:text-stone-200">{displayedText.reason ? t.reason : t.cause}</p>
              <p className="text-stone-600 dark:text-stone-300 mt-1">
                {displayedText.reason || displayedText.cause}
                {isTyping && (displayedText.reason === data?.reason || displayedText.cause === data?.cause) && (
                  <span className="inline-block w-2 h-4 bg-stone-600 ml-1 animate-pulse" />
                )}
              </p>
            </motion.div>
          )}

          {(displayedText.solution || displayedText.tips) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-600"
              data-testid="solution-info"
            >
              <Pill className="w-6 h-6 text-blue-600 dark:text-blue-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-blue-800 dark:text-blue-400">{displayedText.solution ? t.solution : t.tips}</p>
                <p className="text-blue-700 dark:text-blue-300 mt-1">
                  {displayedText.solution || displayedText.tips}
                  {isTyping && (displayedText.solution === data?.solution || displayedText.tips === data?.tips) && (
                    <span className="inline-block w-2 h-4 bg-blue-700 ml-1 animate-pulse" />
                  )}
                </p>
              </div>
            </motion.div>
          )}

          {displayedText.expectedYield && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl"
              data-testid="yield-info"
            >
              <p className="font-semibold text-green-800 dark:text-green-400">{t.expectedYield}</p>
              <p className="text-green-700 dark:text-green-300 mt-1">{displayedText.expectedYield}</p>
            </motion.div>
          )}

          {displayedText.severity && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl"
              data-testid="severity-info"
            >
              <p className="font-semibold text-red-800 dark:text-red-400">{t.severity}</p>
              <p className="text-red-700 dark:text-red-300 mt-1">{displayedText.severity}</p>
            </motion.div>
          )}

          {displayedText.confidence && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl"
              data-testid="confidence-info"
            >
              <p className="font-semibold text-purple-800 dark:text-purple-400">{t.confidence}</p>
              <p className="text-purple-700 dark:text-purple-300 mt-1">{displayedText.confidence}</p>
            </motion.div>
          )}

          {displayedText.weather && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-start space-x-3 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl border-l-4 border-sky-600"
              data-testid="weather-info"
            >
              <CloudRain className="w-6 h-6 text-sky-600 dark:text-sky-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-sky-800 dark:text-sky-400">{t.weather}</p>
                <div className="mt-2 space-y-1 text-sky-700 dark:text-sky-300">
                  <p>
                    {t.temperature}: {displayedText.weather.temperature}°C
                  </p>
                  <p>
                    {t.humidity}: {displayedText.weather.humidity}%
                  </p>
                  {displayedText.weather.condition && <p>{displayedText.weather.condition}</p>}
                  {displayedText.weather.city && <p>{displayedText.weather.city}</p>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ResultCard;