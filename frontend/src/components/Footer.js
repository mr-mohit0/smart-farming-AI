import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Mail, Github, Twitter, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Footer = () => {
  const { language } = useApp();

  const translations = {
    hindi: {
      about: 'परियोजना के बारे में',
      aboutText:
        'स्मार्ट फार्मिंग AI सहायक भारतीय किसानों को AI-संचालित कृषि सलाह प्रदान करता है।',
      technologies: 'प्रौद्योगिकियां',
      connect: 'जुड़ें',
      madeWith: 'प्यार से बनाया गया'
    },
    english: {
      about: 'About Project',
      aboutText:
        'Smart Farming AI Assistant provides AI-powered agricultural guidance to Indian farmers.',
      technologies: 'Technologies',
      connect: 'Connect',
      madeWith: 'Made with love'
    }
  };

  const t = translations[language];

  return (
    <footer className="bg-stone-50 border-t border-stone-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-stone-900">
                {language === 'hindi' ? 'स्मार्ट फार्मिंग' : 'Smart Farming'}
              </span>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">{t.aboutText}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold text-stone-900 mb-4">{t.technologies}</h4>
            <div className="space-y-2 text-sm text-stone-600">
              <p>React.js</p>
              <p>Node.js + Express</p>
              <p>Google Gemini AI</p>
              <p>MongoDB</p>
              <p>OpenWeather API</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold text-stone-900 mb-4">{t.connect}</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white border border-stone-200 rounded-lg flex items-center justify-center hover:border-green-700 hover:text-green-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white border border-stone-200 rounded-lg flex items-center justify-center hover:border-green-700 hover:text-green-700 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white border border-stone-200 rounded-lg flex items-center justify-center hover:border-green-700 hover:text-green-700 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 pt-8 border-t border-stone-200 text-center">
          <p className="text-sm text-stone-600 flex items-center justify-center space-x-2">
            <span>{t.madeWith}</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>{language === 'hindi' ? 'भारतीय किसानों के लिए' : 'for Indian farmers'}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;