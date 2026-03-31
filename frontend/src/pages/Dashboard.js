import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import CropForm from '../components/CropForm';
import DiseaseForm from '../components/DiseaseForm';
import ImageUpload from '../components/ImageUpload';
import ResultCard from '../components/ResultCard';
import Loader from '../components/Loader';
import WeatherForecast from '../components/WeatherForecast';
import CropMarketPrices from '../components/CropMarketPrices';
import EducationalContent from '../components/EducationalContent';
import Footer from '../components/Footer';

const Dashboard = () => {
  const { language, result, loading } = useApp();

  const translations = {
    hindi: {
      title: 'डैशबोर्ड',
      subtitle: 'अपने खेत का विश्लेषण शुरू करें'
    },
    english: {
      title: 'Dashboard',
      subtitle: 'Start analyzing your farm'
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-bold text-stone-900 dark:text-white">
            {t.title}
          </h1>
          <p className="text-base leading-relaxed text-stone-600 dark:text-stone-300 mt-4 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          <CropForm />
          <DiseaseForm />
        </div>

        <div className="mb-8">
          <ImageUpload />
        </div>

        {loading && <Loader />}

        {!loading && result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ResultCard data={result} isStreaming={true} isRealtime={result?._isRealtime !== false} />
          </motion.div>
        )}

        {/* Weather Forecast Dashboard */}
        <WeatherForecast />

        {/* Crop Market Prices */}
        <CropMarketPrices />

        {/* Educational Content Section */}
        <EducationalContent />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
