import React from 'react';
import { motion } from 'framer-motion';
import { Users, Leaf, Image, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useInView } from 'framer-motion';

const StatCard = ({ icon: Icon, value, label, delay, color }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.replace(/\D/g, ''));
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative overflow-hidden bg-white dark:bg-stone-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-200 dark:border-stone-700"
    >
      <div className="relative z-10">
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-4`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="text-4xl font-bold text-stone-900 dark:text-white mb-2">
          {formatNumber(count)}+
        </div>
        <div className="text-sm font-medium text-stone-600 dark:text-stone-300">{label}</div>
      </div>
      <div className={`absolute -right-4 -bottom-4 w-32 h-32 ${color} opacity-10 rounded-full blur-2xl`} />
    </motion.div>
  );
};

const Statistics = () => {
  const { language } = useApp();

  const translations = {
    hindi: {
      title: 'हमारा प्रभाव',
      subtitle: 'संख्याओं में हमारी यात्रा',
      farmers: 'किसान सहायता प्राप्त',
      crops: 'फसल विश्लेषित',
      diseases: 'रोग पहचाने गए',
      success: 'सफलता दर'
    },
    english: {
      title: 'Our Impact',
      subtitle: 'Making a difference in numbers',
      farmers: 'Farmers Helped',
      crops: 'Crops Analyzed',
      diseases: 'Diseases Detected',
      success: 'Success Rate'
    }
  };

  const t = translations[language];

  const stats = [
    { icon: Users, value: '5000', label: t.farmers, color: 'bg-gradient-to-br from-green-500 to-green-600' },
    { icon: Leaf, value: '12000', label: t.crops, color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
    { icon: Image, value: '8000', label: t.diseases, color: 'bg-gradient-to-br from-orange-500 to-orange-600' },
    { icon: TrendingUp, value: '95', label: t.success, color: 'bg-gradient-to-br from-purple-500 to-purple-600' }
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-stone-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight font-semibold text-stone-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <p className="text-base leading-relaxed text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              delay={index * 0.1}
              color={stat.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;