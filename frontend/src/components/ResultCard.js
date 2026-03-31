import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, Copy, Sprout, AlertTriangle, Pill, CloudRain } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

const ResultCard = ({ data }) => {
  const { language } = useApp();

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

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      let text = '';

      if (data.crop) {
        text += `${t.crop}: ${data.crop}. `;
        if (data.reason) text += `${t.reason}: ${data.reason}. `;
        if (data.tips) text += `${t.tips}: ${data.tips}. `;
      }

      if (data.disease) {
        text += `${t.disease}: ${data.disease}. `;
        if (data.cause) text += `${t.cause}: ${data.cause}. `;
        if (data.solution) text += `${t.solution}: ${data.solution}. `;
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

    if (data.crop) {
      text += `${t.crop}: ${data.crop}\n`;
      if (data.reason) text += `${t.reason}: ${data.reason}\n`;
      if (data.tips) text += `${t.tips}: ${data.tips}\n`;
      if (data.expectedYield) text += `${t.expectedYield}: ${data.expectedYield}\n`;
    }

    if (data.disease) {
      text += `${t.disease}: ${data.disease}\n`;
      if (data.cause) text += `${t.cause}: ${data.cause}\n`;
      if (data.solution) text += `${t.solution}: ${data.solution}\n`;
      if (data.severity) text += `${t.severity}: ${data.severity}\n`;
    }

    if (data.weather) {
      text += `\n${t.weather}:\n`;
      text += `${t.temperature}: ${data.weather.temperature}°C\n`;
      text += `${t.humidity}: ${data.weather.humidity}%\n`;
    }

    navigator.clipboard.writeText(text);
    toast.success(t.copied);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/70 backdrop-blur-xl backdrop-saturate-150 border border-white/50 shadow-lg rounded-2xl p-6 md:p-8 space-y-6"
      data-testid="result-card"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl sm:text-2xl font-medium text-stone-800">
          {data.crop ? t.crop : t.disease} {language === 'hindi' ? 'परिणाम' : 'Results'}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={handleSpeak}
            className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
            data-testid="speak-button"
            title="Speak"
          >
            <Volume2 className="w-5 h-5 text-green-700" />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            data-testid="copy-button"
            title="Copy"
          >
            <Copy className="w-5 h-5 text-stone-700" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {data.crop && (
          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl" data-testid="crop-info">
            <Sprout className="w-6 h-6 text-green-700 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-green-800">{t.crop}</p>
              <p className="text-green-700 mt-1">{data.crop}</p>
            </div>
          </div>
        )}

        {data.disease && (
          <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-xl" data-testid="disease-info">
            <AlertTriangle className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-orange-800">{t.disease}</p>
              <p className="text-orange-700 mt-1">{data.disease}</p>
            </div>
          </div>
        )}

        {(data.reason || data.cause) && (
          <div className="p-4 bg-stone-50 rounded-xl" data-testid="cause-info">
            <p className="font-semibold text-stone-800">{data.reason ? t.reason : t.cause}</p>
            <p className="text-stone-600 mt-1">{data.reason || data.cause}</p>
          </div>
        )}

        {(data.solution || data.tips) && (
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl" data-testid="solution-info">
            <Pill className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-blue-800">{data.solution ? t.solution : t.tips}</p>
              <p className="text-blue-700 mt-1">{data.solution || data.tips}</p>
            </div>
          </div>
        )}

        {data.expectedYield && (
          <div className="p-4 bg-green-50 rounded-xl" data-testid="yield-info">
            <p className="font-semibold text-green-800">{t.expectedYield}</p>
            <p className="text-green-700 mt-1">{data.expectedYield}</p>
          </div>
        )}

        {data.severity && (
          <div className="p-4 bg-red-50 rounded-xl" data-testid="severity-info">
            <p className="font-semibold text-red-800">{t.severity}</p>
            <p className="text-red-700 mt-1">{data.severity}</p>
          </div>
        )}

        {data.confidence && (
          <div className="p-4 bg-purple-50 rounded-xl" data-testid="confidence-info">
            <p className="font-semibold text-purple-800">{t.confidence}</p>
            <p className="text-purple-700 mt-1">{data.confidence}</p>
          </div>
        )}

        {data.weather && (
          <div className="flex items-start space-x-3 p-4 bg-sky-50 rounded-xl" data-testid="weather-info">
            <CloudRain className="w-6 h-6 text-sky-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-sky-800">{t.weather}</p>
              <div className="mt-2 space-y-1 text-sky-700">
                <p>
                  {t.temperature}: {data.weather.temperature}°C
                </p>
                <p>
                  {t.humidity}: {data.weather.humidity}%
                </p>
                {data.weather.condition && <p>{data.weather.condition}</p>}
                {data.weather.city && <p>{data.weather.city}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResultCard;