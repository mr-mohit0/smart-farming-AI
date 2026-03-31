import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RefreshCw, IndianRupee, Loader2, BarChart3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getCropPrices } from '../services/api';

const CropMarketPrices = () => {
  const { language } = useApp();
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [filterType, setFilterType] = useState('all');

  const t = {
    hindi: {
      title: 'फसल बाजार भाव',
      subtitle: 'प्रमुख मंडियों से ताजा फसल भाव',
      crop: 'फसल',
      price: 'भाव',
      change: 'बदलाव',
      mandi: 'मंडी',
      refresh: 'रीफ्रेश',
      perQuintal: 'प्रति क्विंटल',
      all: 'सभी',
      gainers: 'बढ़त',
      losers: 'गिरावट',
      sortName: 'नाम',
      sortPrice: 'भाव',
      sortChange: 'बदलाव',
    },
    english: {
      title: 'Crop Market Prices',
      subtitle: 'Latest crop prices from major mandis',
      crop: 'Crop',
      price: 'Price',
      change: 'Change',
      mandi: 'Mandi',
      refresh: 'Refresh',
      perQuintal: 'per quintal',
      all: 'All',
      gainers: 'Gainers',
      losers: 'Losers',
      sortName: 'Name',
      sortPrice: 'Price',
      sortChange: 'Change',
    },
  }[language];

  const fetchPrices = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getCropPrices();
      setPriceData(response.data);
    } catch (error) {
      console.error('Failed to fetch prices:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  const getSortedCrops = () => {
    if (!priceData) return [];
    let crops = [...priceData.crops];

    if (filterType === 'gainers') {
      crops = crops.filter((c) => c.change > 0);
    } else if (filterType === 'losers') {
      crops = crops.filter((c) => c.change < 0);
    }

    if (sortBy === 'name') {
      crops.sort((a, b) => (language === 'hindi' ? a.name_hi : a.name_en).localeCompare(language === 'hindi' ? b.name_hi : b.name_en));
    } else if (sortBy === 'price') {
      crops.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'change') {
      crops.sort((a, b) => b.change - a.change);
    }

    return crops;
  };

  const crops = getSortedCrops();

  return (
    <section className="mt-16 mb-8" data-testid="crop-prices-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight font-semibold text-stone-900 dark:text-white mb-3">
          {t.title}
        </h2>
        <p className="text-base leading-relaxed text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex gap-2">
          {[
            { key: 'all', label: t.all },
            { key: 'gainers', label: t.gainers },
            { key: 'losers', label: t.losers },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setFilterType(filter.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterType === filter.key
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-green-600 dark:hover:border-green-500'
              }`}
              data-testid={`filter-${filter.key}`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 focus:outline-none focus:border-green-700"
            data-testid="sort-select"
          >
            <option value="name">{t.sortName}</option>
            <option value="price">{t.sortPrice}</option>
            <option value="change">{t.sortChange}</option>
          </select>
          <button
            onClick={fetchPrices}
            disabled={loading}
            className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-green-600 dark:hover:border-green-500 transition-colors"
            data-testid="refresh-prices-btn"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            {t.refresh}
          </button>
        </div>
      </div>

      {loading && !priceData && (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-green-700" />
        </div>
      )}

      {priceData && (
        <>
          {/* Price Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {crops.map((crop, i) => {
              const isPositive = crop.change > 0;
              return (
                <motion.div
                  key={crop.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-stone-800 rounded-xl p-5 border border-stone-200 dark:border-stone-700 hover:shadow-md transition-all"
                  data-testid={`crop-price-card-${crop.id}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-stone-900 dark:text-white text-base">
                        {language === 'hindi' ? crop.name_hi : crop.name_en}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        {crop.mandi}, {crop.state}
                      </p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                      isPositive
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>
                      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {isPositive ? '+' : ''}{crop.change}%
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <IndianRupee className="w-4 h-4 text-stone-600 dark:text-stone-300" />
                    <span className="text-2xl font-bold text-stone-900 dark:text-white">{crop.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-stone-500 dark:text-stone-400">/{t.perQuintal}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-xs text-center text-stone-400 dark:text-stone-500 italic"
          >
            {language === 'hindi' ? priceData.disclaimer_hi : priceData.disclaimer_en}
          </motion.p>
        </>
      )}
    </section>
  );
};

export default CropMarketPrices;
