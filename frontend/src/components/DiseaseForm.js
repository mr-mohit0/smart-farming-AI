import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { askAI } from '../services/api';
import { toast } from 'sonner';

const DiseaseForm = () => {
  const { language, setResult, setLoading, addToHistory } = useApp();
  const [symptoms, setSymptoms] = useState('');

  const translations = {
    hindi: {
      title: 'रोग पहचान',
      symptoms: 'लक्षण',
      placeholder: 'पौधे में दिखाई देने वाले लक्षण बताएं...',
      submit: 'रोग की जांच करें',
      commonSymptoms: 'सामान्य लक्षण',
      yellowLeaves: 'पीली पत्तियां',
      spots: 'धब्बे',
      dryness: 'सूखापन',
      wilting: 'मुरझाना'
    },
    english: {
      title: 'Disease Detection',
      symptoms: 'Symptoms',
      placeholder: 'Describe the symptoms you see on the plant...',
      submit: 'Detect Disease',
      commonSymptoms: 'Common Symptoms',
      yellowLeaves: 'Yellow Leaves',
      spots: 'Spots',
      dryness: 'Dryness',
      wilting: 'Wilting'
    }
  };

  const t = translations[language];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!symptoms.trim()) {
      toast.error(language === 'hindi' ? 'कृपया लक्षण बताएं' : 'Please describe symptoms');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await askAI('disease', { symptoms });
      setResult({ ...response.data, _isRealtime: response.isRealtime !== false });
      addToHistory({ type: 'disease', data: { symptoms }, timestamp: new Date().toISOString() });
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSymptom = (symptom) => {
    setSymptoms((prev) => (prev ? `${prev}, ${symptom}` : symptom));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-sm rounded-2xl p-6 md:p-8"
      data-testid="disease-form"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
        </div>
        <h3 className="text-xl sm:text-2xl font-medium text-stone-800 dark:text-white">{t.title}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">{t.symptoms} *</label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder={t.placeholder}
            rows={4}
            className="w-full bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl px-4 py-3 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20 transition-all resize-none text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500"
            data-testid="symptoms-textarea"
          />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-green-700 mb-3">
            {t.commonSymptoms}
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: t.yellowLeaves, value: language === 'hindi' ? 'पीली पत्तियां' : 'yellow leaves' },
              { label: t.spots, value: language === 'hindi' ? 'पत्तियों पर धब्बे' : 'spots on leaves' },
              { label: t.dryness, value: language === 'hindi' ? 'पत्तियों में सूखापन' : 'dryness in leaves' },
              { label: t.wilting, value: language === 'hindi' ? 'पौधा मुरझा रहा है' : 'plant wilting' }
            ].map((symptom, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleQuickSymptom(symptom.value)}
                className="px-3 py-1.5 text-sm bg-stone-100 dark:bg-stone-700 hover:bg-green-100 dark:hover:bg-green-900/50 hover:text-green-700 dark:hover:text-green-400 text-stone-700 dark:text-stone-300 rounded-lg transition-colors"
                data-testid={`quick-symptom-${index}`}
              >
                {symptom.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!symptoms.trim()}
          className="w-full px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors font-semibold shadow-sm"
          data-testid="submit-disease-form"
        >
          {t.submit}
        </button>
      </form>
    </motion.div>
  );
};

export default DiseaseForm;