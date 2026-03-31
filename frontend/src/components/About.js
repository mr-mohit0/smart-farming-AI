import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, TrendingUp, Users, Leaf, Zap, Cloud, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const About = () => {
  const { language } = useApp();

  const translations = {
    hindi: {
      title: 'कैसे हम मदद करते हैं',
      subtitle: 'भारतीय किसानों के लिए AI-संचालित समाधान',
      benefitsTitle: 'प्रमुख लाभ',
      impactTitle: 'वास्तविक प्रभाव',
      feature1Title: 'AI-संचालित फसल सलाह',
      feature1Desc: 'मिट्टी, मौसम और जलवायु के आधार पर व्यक्तिगत फसल सिफारिशें',
      feature2Title: 'रोग पहचान',
      feature2Desc: 'लक्षणों और छवियों से पौधों की बीमारियों की तुरंत पहचान',
      feature3Title: 'मौसम एकीकरण',
      feature3Desc: 'बेहतर निर्णय के लिए वास्तविक समय का मौसम डेटा',
      feature4Title: 'हिंदी में आवाज',
      feature4Desc: 'आसान समझ के लिए हिंदी में AI जवाब',
      benefit1: 'उपज में 30% वृद्धि',
      benefit2: 'फसल की हानि में कमी',
      benefit3: 'किसानों को सशक्त बनाना',
      impactDesc: 'हमारा मंच पूरे भारत में हजारों किसानों को स्मार्ट कृषि निर्णय लेने में मदद कर रहा है। AI तकनीक के साथ, हम पारंपरिक खेती को आधुनिक, डेटा-संचालित और स्थायी कृषि में बदल रहे हैं।'
    },
    english: {
      title: 'How We Help Farmers',
      subtitle: 'AI-powered solutions for Indian agriculture',
      benefitsTitle: 'Key Benefits',
      impactTitle: 'Real-World Impact',
      feature1Title: 'AI-Powered Crop Advice',
      feature1Desc: 'Personalized crop recommendations based on soil, weather, and climate',
      feature2Title: 'Disease Detection',
      feature2Desc: 'Instant identification of plant diseases from symptoms and images',
      feature3Title: 'Weather Integration',
      feature3Desc: 'Real-time weather data for better decision making',
      feature4Title: 'Voice in Hindi',
      feature4Desc: 'AI responses in Hindi for easy understanding',
      benefit1: '30% Increase in Yield',
      benefit2: 'Reduced Crop Loss',
      benefit3: 'Empowered Farmers',
      impactDesc:
        'Our platform is helping thousands of farmers across India make smart agricultural decisions. With AI technology, we are transforming traditional farming into modern, data-driven, and sustainable agriculture.'
    }
  };

  const t = translations[language];

  const features = [
    {
      icon: Sparkles,
      title: t.feature1Title,
      desc: t.feature1Desc,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Shield,
      title: t.feature2Title,
      desc: t.feature2Desc,
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Cloud,
      title: t.feature3Title,
      desc: t.feature3Desc,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Zap,
      title: t.feature4Title,
      desc: t.feature4Desc,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const benefits = [
    { icon: TrendingUp, text: t.benefit1 },
    { icon: Leaf, text: t.benefit2 },
    { icon: Users, text: t.benefit3 }
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-stone-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/10 dark:bg-green-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/10 dark:bg-orange-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl sm:text-3xl lg:text-4xl tracking-tight font-semibold text-stone-900 dark:text-white mb-4"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base leading-relaxed text-stone-600 dark:text-stone-300 max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white dark:bg-stone-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-stone-200 dark:border-stone-700 overflow-hidden"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits & Impact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-stone-900 dark:text-white mb-6">
              {t.benefitsTitle}
            </h3>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent rounded-xl border-l-4 border-green-600 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-green-700 dark:text-green-500" />
                  </div>
                  <p className="text-base font-medium text-stone-800 dark:text-stone-200">
                    {benefit.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Impact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-green-50 to-orange-50 dark:from-stone-800 dark:to-stone-800 rounded-3xl p-8 md:p-10 border border-stone-200 dark:border-stone-700 shadow-lg">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-green-500 rounded-full opacity-20 blur-xl" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-orange-500 rounded-full opacity-20 blur-xl" />

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-br from-green-600 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-xl sm:text-2xl font-semibold text-stone-900 dark:text-white mb-4">
                {t.impactTitle}
              </h3>
              <p className="text-base leading-relaxed text-stone-700 dark:text-stone-300">
                {t.impactDesc}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;