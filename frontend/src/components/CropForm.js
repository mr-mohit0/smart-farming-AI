import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { askAI } from '../services/api';
import { toast } from 'sonner';

const CropForm = () => {
  const { language, setResult, setLoading, addToHistory } = useApp();
  const [formData, setFormData] = useState({
    soil: '',
    season: '',
    location: ''
  });

  const translations = {
    hindi: {
      title: 'फसल की सिफारिश',
      soil: 'मिट्टी का प्रकार',
      season: 'मौसम',
      location: 'स्थान (वैकल्पिक)',
      submit: 'सिफारिश प्राप्त करें',
      selectSoil: 'मिट्टी चुनें',
      selectSeason: 'मौसम चुनें',
      clay: 'चिकनी मिट्टी',
      sandy: 'रेतीली मिट्टी',
      loamy: 'दोमट मिट्टी',
      summer: 'गर्मी',
      winter: 'सर्दी',
      rainy: 'बरसात',
      enterLocation: 'शहर का नाम दर्ज करें'
    },
    english: {
      title: 'Crop Recommendation',
      soil: 'Soil Type',
      season: 'Season',
      location: 'Location (Optional)',
      submit: 'Get Recommendation',
      selectSoil: 'Select Soil Type',
      selectSeason: 'Select Season',
      clay: 'Clay',
      sandy: 'Sandy',
      loamy: 'Loamy',
      summer: 'Summer',
      winter: 'Winter',
      rainy: 'Rainy',
      enterLocation: 'Enter city name'
    }
  };

  const t = translations[language];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.soil || !formData.season) {
      toast.error(language === 'hindi' ? 'कृपया सभी आवश्यक फील्ड भरें' : 'Please fill all required fields');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await askAI('crop', formData);
      setResult({ ...response.data, _isRealtime: response.isRealtime !== false });
      addToHistory({ type: 'crop', data: formData, timestamp: new Date().toISOString() });
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-sm rounded-2xl p-6 md:p-8"
      data-testid="crop-form"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <Sprout className="w-6 h-6 text-green-700" />
        </div>
        <h3 className="text-xl sm:text-2xl font-medium text-stone-800 dark:text-white">{t.title}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">{t.soil} *</label>
          <select
            value={formData.soil}
            onChange={(e) => setFormData({ ...formData, soil: e.target.value })}
            className="w-full bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl px-4 py-3 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20 transition-all text-stone-900 dark:text-white"
            data-testid="soil-select"
          >
            <option value="">{t.selectSoil}</option>
            <option value="clay">{t.clay}</option>
            <option value="sandy">{t.sandy}</option>
            <option value="loamy">{t.loamy}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">{t.season} *</label>
          <select
            value={formData.season}
            onChange={(e) => setFormData({ ...formData, season: e.target.value })}
            className="w-full bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl px-4 py-3 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20 transition-all text-stone-900 dark:text-white"
            data-testid="season-select"
          >
            <option value="">{t.selectSeason}</option>
            <option value="summer">{t.summer}</option>
            <option value="winter">{t.winter}</option>
            <option value="rainy">{t.rainy}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            {t.location}
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder={t.enterLocation}
            className="w-full bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl px-4 py-3 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20 transition-all text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500"
            data-testid="location-input"
          />
        </div>

        <button
          type="submit"
          disabled={!formData.soil || !formData.season}
          className="w-full px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors font-semibold shadow-sm"
          data-testid="submit-crop-form"
        >
          {t.submit}
        </button>
      </form>
    </motion.div>
  );
};

export default CropForm;