import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Bug, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Footer from '../components/Footer';

const FeaturesPage = () => {
  const { language } = useApp();

  const translations = {
    hindi: {
      title: 'विशेषताएँ',
      subtitle: 'किसानों के लिए AI-संचालित समाधान',
      soilTypes: 'मिट्टी के प्रकार',
      soilDesc: 'विभिन्न मिट्टी के प्रकारों के बारे में जानें और उनके लिए उपयुक्त फसलें',
      diseases: 'फसलों की बीमारियां',
      diseasesDesc: 'सामान्य फसल रोगों की पहचान और उपचार',
      aiSolutions: 'AI समाधान',
      aiDesc: 'कृषि समस्याओं के लिए स्मार्ट AI-संचालित समाधान'
    },
    english: {
      title: 'Features',
      subtitle: 'AI-powered solutions for farmers',
      soilTypes: 'Soil Types',
      soilDesc: 'Learn about different soil types and suitable crops',
      diseases: 'Crop Diseases',
      diseasesDesc: 'Identify common crop diseases and their treatments',
      aiSolutions: 'AI Solutions',
      aiDesc: 'Smart AI-powered solutions for agricultural problems'
    }
  };

  const t = translations[language];

  const features = [
    {
      icon: Leaf,
      title: t.soilTypes,
      description: t.soilDesc,
      image:
        'https://images.unsplash.com/photo-1568584952324-45e972c25fb4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwyfHxsdXNoJTIwZ3JlZW4lMjBjcm9wJTIwZmllbGR8ZW58MHx8fHwxNzc0OTU5NzU3fDA&ixlib=rb-4.1.0&q=85'
    },
    {
      icon: Bug,
      title: t.diseases,
      description: t.diseasesDesc,
      image:
        'https://images.pexels.com/photos/4723058/pexels-photo-4723058.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=1200'
    },
    {
      icon: Sparkles,
      title: t.aiSolutions,
      description: t.aiDesc,
      image:
        'https://images.pexels.com/photos/36719188/pexels-photo-36719188.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-bold text-stone-900">
            {t.title}
          </h1>
          <p className="text-base leading-relaxed text-stone-600 mt-4 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-stone-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300"
                data-testid={`feature-card-${index}`}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-green-700" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-medium text-stone-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed text-stone-600">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeaturesPage;