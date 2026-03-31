import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Leaf, Camera, Volume2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const BriefAbout = () => {
  const { language } = useApp();

  const translations = {
    hindi: {
      title: 'फार्मिंग AI',
      description1:
        'हमारा AI-संचालित प्लेटफॉर्म किसानों को फसल चयन और रोग प्रबंधन के बारे में सूचित निर्णय लेने में मदद करता है।',
      description2:
        'उन्नत AI तकनीक का उपयोग करते हुए, हम आपकी मिट्टी, मौसम और स्थान के अनुसार तत्काल सिफारिशें प्रदान करते हैं।',
      howItWorks: 'यह कैसे काम करता है',
      step1: 'फसल सलाह या रोग पहचान चुनें',
      step2: 'विवरण दें या पौधे की छवि अपलोड करें',
      step3: 'तत्काल AI-संचालित सिफारिशें प्राप्त करें',
      step4: 'आवाज आउटपुट का उपयोग करके हिंदी में सलाह सुनें'
    },
    english: {
      title: 'Farming AI',
      description1:
        'Our AI-powered platform helps farmers make informed decisions about crop selection and disease management.',
      description2:
        'Using advanced AI technology, we provide instant recommendations tailored to your soil, season, and location.',
      howItWorks: 'How It Works',
      step1: 'Select crop advice or disease detection',
      step2: 'Provide details or upload plant image',
      step3: 'Get instant AI-powered recommendations',
      step4: 'Listen to advice in Hindi using voice output'
    }
  };

  const t = translations[language];

  const steps = [
    { icon: Sprout, text: t.step1 },
    { icon: Leaf, text: t.step2 },
    { icon: Camera, text: t.step3 },
    { icon: Volume2, text: t.step4 }
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-stone-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-white mb-6">
                {t.title}
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-stone-600 dark:text-stone-300">
                <p>{t.description1}</p>
                <p>{t.description2}</p>
              </div>
            </motion.div>

            {/* How It Works Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                {t.howItWorks}
              </h3>
              
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 8 }}
                      className="flex items-start space-x-4 group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-green-700 dark:bg-green-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-base text-stone-600 dark:text-stone-300 leading-relaxed pt-2">
                        {step.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative group"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-3xl shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=1000&fit=crop"
                alt="Green leaf texture"
                className="w-full h-[600px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BriefAbout;