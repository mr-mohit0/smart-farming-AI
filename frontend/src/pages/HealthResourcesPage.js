import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Shield, Calculator, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Footer from '../components/Footer';

const HealthResourcesPage = () => {
  const { language } = useApp();

  const translations = {
    hindi: {
      title: 'स्वास्थ्य संसाधन',
      subtitle: 'फसल स्वास्थ्य के लिए विशेषज्ञ मार्गदर्शिका',
      prevention: 'रोग रोकथाम',
      preventionDesc: 'फसलों में रोगों को रोकने के उपाय',
      pest: 'कीट प्रबंधन',
      pestDesc: 'प्रभावी कीट नियंत्रण रणनीतियां',
      nutrient: 'पोषण की कमी',
      nutrientDesc: 'मिट्टी में पोषक तत्वों का प्रबंधन',
      calculator: 'स्वास्थ्य कैलकुलेटर',
      calculatorDesc: 'फसल स्वास्थ्य मूल्यांकन उपकरण'
    },
    english: {
      title: 'Health Resources',
      subtitle: 'Expert guidance for crop health',
      prevention: 'Disease Prevention',
      preventionDesc: 'Methods to prevent diseases in crops',
      pest: 'Pest Management',
      pestDesc: 'Effective pest control strategies',
      nutrient: 'Nutrient Deficiency',
      nutrientDesc: 'Managing soil nutrients',
      calculator: 'Health Calculator',
      calculatorDesc: 'Crop health assessment tools'
    }
  };

  const t = translations[language];

  const resources = [
    { icon: Shield, title: t.prevention, description: t.preventionDesc },
    { icon: Users, title: t.pest, description: t.pestDesc },
    { icon: BookOpen, title: t.nutrient, description: t.nutrientDesc },
    { icon: Calculator, title: t.calculator, description: t.calculatorDesc }
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-stone-200 shadow-sm rounded-2xl p-6 md:p-8 hover:shadow-md transition-all duration-300"
                data-testid={`resource-card-${index}`}
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="text-xl sm:text-2xl font-medium text-stone-800 mb-2">
                  {resource.title}
                </h3>
                <p className="text-base leading-relaxed text-stone-600">
                  {resource.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HealthResourcesPage;