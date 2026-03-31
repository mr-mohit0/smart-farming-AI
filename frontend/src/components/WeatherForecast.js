import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Droplets, Wind, Thermometer, MapPin, Search, Navigation, Sun, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getWeatherForecast } from '../services/api';
import { toast } from 'sonner';

const weatherIcons = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Drizzle: CloudDrizzle,
  Thunderstorm: CloudLightning,
  Snow: CloudSnow,
};

const tipIcons = {
  rain: CloudRain,
  drought: Sun,
  heat: Thermometer,
  cold: CloudSnow,
  humidity: Droplets,
  good: CheckCircle,
};

const dayNames = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  hi: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
};

const WeatherForecast = () => {
  const { language } = useApp();
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);

  const t = {
    hindi: {
      title: 'मौसम पूर्वानुमान',
      subtitle: 'अपने खेत के लिए 5-दिन का मौसम पूर्वानुमान देखें',
      searchPlaceholder: 'शहर का नाम दर्ज करें...',
      search: 'खोजें',
      autoDetect: 'स्थान पहचानें',
      current: 'वर्तमान मौसम',
      forecast: '5-दिन का पूर्वानुमान',
      tips: 'खेती सुझाव',
      feelsLike: 'महसूस',
      humidity: 'नमी',
      wind: 'हवा',
      rain: 'बारिश',
      high: 'उच्च',
      low: 'निम्न',
      kmh: 'km/h',
      mm: 'मिमी',
    },
    english: {
      title: 'Weather Forecast',
      subtitle: 'View 5-day weather forecast for your farm',
      searchPlaceholder: 'Enter city name...',
      search: 'Search',
      autoDetect: 'Detect Location',
      current: 'Current Weather',
      forecast: '5-Day Forecast',
      tips: 'Farming Tips',
      feelsLike: 'Feels like',
      humidity: 'Humidity',
      wind: 'Wind',
      rain: 'Rain',
      high: 'High',
      low: 'Low',
      kmh: 'km/h',
      mm: 'mm',
    },
  }[language];

  const fetchForecast = useCallback(async (params) => {
    setLoading(true);
    try {
      const response = await getWeatherForecast(params);
      setWeatherData(response.data);
    } catch (error) {
      toast.error(typeof error === 'string' ? error : 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    fetchForecast({ city: city.trim() });
  };

  const handleAutoDetect = () => {
    if (!navigator.geolocation) {
      toast.error(language === 'hindi' ? 'जियोलोकेशन उपलब्ध नहीं है' : 'Geolocation not available');
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoLoading(false);
        fetchForecast({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => {
        setGeoLoading(false);
        toast.error(language === 'hindi' ? 'स्थान प्राप्त नहीं हो सका' : 'Could not get location');
      },
      { timeout: 10000 }
    );
  };

  useEffect(() => {
    fetchForecast({ city: 'Delhi' });
  }, [fetchForecast]);

  const getDayName = (dateStr) => {
    const d = new Date(dateStr);
    const names = language === 'hindi' ? dayNames.hi : dayNames.en;
    return names[d.getDay()];
  };

  const getDateStr = (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  const WeatherIcon = ({ condition, className }) => {
    const Icon = weatherIcons[condition] || Cloud;
    return <Icon className={className} />;
  };

  return (
    <section className="mt-16 mb-8" data-testid="weather-forecast-section">
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

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-10"
      >
        <form onSubmit={handleSearch} className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 transition-all"
              data-testid="weather-city-input"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 disabled:bg-stone-400 transition-colors font-semibold whitespace-nowrap"
            data-testid="weather-search-btn"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t.search}
          </button>
        </form>
        <button
          type="button"
          onClick={handleAutoDetect}
          disabled={geoLoading}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl hover:border-green-700 dark:hover:border-green-500 transition-colors font-medium whitespace-nowrap"
          data-testid="weather-detect-btn"
        >
          {geoLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
          {t.autoDetect}
        </button>
      </motion.div>

      {loading && !weatherData && (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-green-700" />
        </div>
      )}

      {weatherData && (
        <div className="space-y-6">
          {/* Current Weather Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-green-700 via-green-800 to-emerald-900 rounded-2xl p-6 md:p-8 text-white shadow-xl"
            data-testid="current-weather-card"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1 opacity-80">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{weatherData.current.city}, {weatherData.current.country}</span>
                </div>
                <p className="text-xs opacity-60 uppercase tracking-wider mb-4">{t.current}</p>
                <div className="flex items-end gap-3">
                  <span className="text-6xl md:text-7xl font-light leading-none">{weatherData.current.temperature}°</span>
                  <div className="mb-2">
                    <p className="text-lg capitalize">{weatherData.current.description}</p>
                    <p className="text-sm opacity-70">{t.feelsLike} {weatherData.current.feelsLike}°C</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <Droplets className="w-6 h-6 mx-auto mb-1 opacity-80" />
                  <p className="text-2xl font-semibold">{weatherData.current.humidity}%</p>
                  <p className="text-xs opacity-60">{t.humidity}</p>
                </div>
                <div className="text-center">
                  <Wind className="w-6 h-6 mx-auto mb-1 opacity-80" />
                  <p className="text-2xl font-semibold">{weatherData.current.windSpeed}</p>
                  <p className="text-xs opacity-60">{t.wind} ({t.kmh})</p>
                </div>
                <div className="hidden sm:block text-center">
                  <WeatherIcon condition={weatherData.current.condition} className="w-12 h-12 mx-auto opacity-90" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 5-Day Forecast */}
          <div>
            <h3 className="text-lg font-semibold text-stone-800 dark:text-white mb-4">{t.forecast}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {weatherData.forecast.map((day, i) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white dark:bg-stone-800 rounded-xl p-4 text-center border border-stone-200 dark:border-stone-700 hover:shadow-md transition-shadow"
                  data-testid={`forecast-day-${i}`}
                >
                  <p className="text-sm font-bold text-stone-800 dark:text-white">{getDayName(day.date)}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">{getDateStr(day.date)}</p>
                  <WeatherIcon condition={day.condition} className="w-8 h-8 mx-auto mb-2 text-green-700 dark:text-green-500" />
                  <div className="flex justify-center gap-2 text-sm mb-1">
                    <span className="font-semibold text-stone-900 dark:text-white">{day.tempMax}°</span>
                    <span className="text-stone-400 dark:text-stone-500">{day.tempMin}°</span>
                  </div>
                  <div className="space-y-1 mt-2">
                    <div className="flex items-center justify-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                      <Droplets className="w-3 h-3" />
                      <span>{day.humidity}%</span>
                    </div>
                    {day.rain > 0 && (
                      <div className="flex items-center justify-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                        <CloudRain className="w-3 h-3" />
                        <span>{day.rain} {t.mm}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Planting Tips */}
          {weatherData.plantingTips && weatherData.plantingTips.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-stone-800 dark:text-white mb-4">{t.tips}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {weatherData.plantingTips.map((tip, i) => {
                  const TipIcon = tipIcons[tip.type] || AlertCircle;
                  const isGood = tip.type === 'good';
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`flex items-start gap-3 p-4 rounded-xl border ${
                        isGood
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                          : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
                      }`}
                      data-testid={`planting-tip-${i}`}
                    >
                      <TipIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isGood ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`} />
                      <p className={`text-sm ${isGood ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'}`}>
                        {language === 'hindi' ? tip.message_hi : tip.message_en}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default WeatherForecast;
