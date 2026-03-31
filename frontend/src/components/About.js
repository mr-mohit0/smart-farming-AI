import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const About = () => {
  const { language } = useApp();

  const translations = {
    hindi: {
      title: 'हमारे बारे में',
      content1:
        'स्मार्ट फार्मिंग AI सहायक भारतीय किसानों के लिए एक आधुनिक समाधान है।',
      content2:
        'हम AI तकनीक का उपयोग करके फसल की सिफारिश, रोग पहचान और कृषि सलाह प्रदान करते हैं।',
      content3:
        'हमारा लक्ष्य किसानों को स्मार्ट निर्णय लेने में मदद करना और फसल उत्पादन बढ़ाना है।'
    },
    english: {
      title: 'About Us',
      content1: 'Smart Farming AI Assistant is a modern solution for Indian farmers.',
      content2:
        'We use AI technology to provide crop recommendations, disease detection, and agricultural advice.',
      content3:
        'Our goal is to help farmers make smart decisions and increase crop production.'
    }
  };

  const t = translations[language];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight font-semibold text-stone-900 mb-6">
              {t.title}
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-stone-600">
              <p>{t.content1}</p>
              <p>{t.content2}</p>
              <p>{t.content3}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="https://images.pexels.com/photos/4723058/pexels-photo-4723058.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=1200"
              alt="Farmer"
              className="rounded-2xl shadow-lg w-full h-96 object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;