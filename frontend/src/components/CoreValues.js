import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Sparkles, Target } from 'lucide-react';
import { useApp } from '../context/AppContext';

const CoreValues = () => {
  const { language } = useApp();

  const translations = {
    hindi: {
      title: 'हमारे मूल मूल्य',
      integrity: 'ईमानदारी',
      integrityDesc: 'पारदर्शिता और विश्वास हमारे काम की नींव है',
      innovation: 'नवाचार',
      innovationDesc: 'AI तकनीक से कृषि में क्रांति',
      community: 'समुदाय',
      communityDesc: 'किसानों की सेवा हमारा प्रथम लक्ष्य',
      excellence: 'उत्कृष्टता',
      excellenceDesc: 'सबसे अच्छी सेवा प्रदान करना'
    },
    english: {
      title: 'Our Core Values',
      integrity: 'Integrity',
      integrityDesc: 'Transparency and trust are the foundation of our work',
      innovation: 'Innovation',
      innovationDesc: 'Revolutionizing agriculture with AI technology',
      community: 'Community',
      communityDesc: 'Serving farmers is our primary goal',
      excellence: 'Excellence',
      excellenceDesc: 'Providing the best service'
    }
  };

  const t = translations[language];

  const values = [
    { icon: Heart, title: t.integrity, description: t.integrityDesc, color: 'red' },
    { icon: Sparkles, title: t.innovation, description: t.innovationDesc, color: 'blue' },
    { icon: Users, title: t.community, description: t.communityDesc, color: 'green' },
    { icon: Target, title: t.excellence, description: t.excellenceDesc, color: 'orange' }
  ];

  const colorMap = {
    red: 'bg-red-100 text-red-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700'
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight font-semibold text-stone-900">
            {t.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                data-testid={`core-value-${index}`}
              >
                <div
                  className={`w-12 h-12 ${colorMap[value.color]} rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium text-stone-800 mb-2">{value.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;