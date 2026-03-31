import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Footer = () => {
  const { language } = useApp();

  const translations = {
    hindi: {
      tagline: 'भारतीय किसानों के लिए AI-संचालित मार्गदर्शन',
      description:
        'स्मार्ट फार्मिंग AI सहायक भारतीय किसानों को AI तकनीक से सशक्त बनाता है।',
      quickLinks: 'त्वरित लिंक',
      home: 'होम',
      features: 'विशेषताएँ',
      health: 'स्वास्थ्य संसाधन',
      dashboard: 'डैशबोर्ड',
      resources: 'संसाधन',
      aboutUs: 'हमारे बारे में',
      blog: 'ब्लॉग',
      faq: 'FAQ',
      terms: 'शर्तें',
      privacy: 'गोपनीयता',
      contact: 'संपर्क करें',
      getInTouch: 'संपर्क में रहें',
      followUs: 'हमें फॉलो करें',
      copyright: 'सर्वाधिकार सुरक्षित',
      allRights: 'सभी अधिकार सुरक्षित।',
      poweredBy: 'संचालित',
      newsletter: 'न्यूज़लेटर',
      newsletterDesc: 'नवीनतम अपडेट प्राप्त करें',
      subscribe: 'सब्सक्राइब करें'
    },
    english: {
      tagline: 'AI-powered guidance for farmers',
      description: 'Smart Farming AI Assistant empowers Indian farmers with AI technology.',
      quickLinks: 'Quick Links',
      home: 'Home',
      features: 'Features',
      health: 'Health Resources',
      dashboard: 'Dashboard',
      resources: 'Resources',
      aboutUs: 'About Us',
      blog: 'Blog',
      faq: 'FAQ',
      terms: 'Terms',
      privacy: 'Privacy',
      contact: 'Contact',
      getInTouch: 'Get In Touch',
      followUs: 'Follow Us',
      copyright: 'Copyright',
      allRights: 'All rights reserved.',
      poweredBy: 'Powered by',
      newsletter: 'Newsletter',
      newsletterDesc: 'Get the latest updates',
      subscribe: 'Subscribe'
    }
  };

  const t = translations[language];

  const quickLinks = [
    { name: t.home, path: '/' },
    { name: t.features, path: '/features' },
    { name: t.health, path: '/health-resources' },
    { name: t.dashboard, path: '/dashboard' }
  ];

  const resourceLinks = [
    { name: t.aboutUs, path: '#' },
    { name: t.blog, path: '#' },
    { name: t.faq, path: '#' },
    { name: t.contact, path: '#' }
  ];

  const legalLinks = [
    { name: t.terms, path: '#' },
    { name: t.privacy, path: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  const contactInfo = [
    { icon: Mail, text: 'support@smartfarming.ai', href: 'mailto:support@smartfarming.ai' },
    { icon: Phone, text: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: MapPin, text: 'Mumbai, Maharashtra, India', href: '#' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 dark:from-black dark:via-stone-950 dark:to-black text-white">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-orange-500 to-green-600" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <Sprout className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {language === 'hindi' ? 'स्मार्ट फार्मिंग' : 'Smart Farming'}
                </h3>
                <p className="text-xs text-stone-400">{t.tagline}</p>
              </div>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed">{t.description}</p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-stone-800 dark:bg-stone-900 hover:bg-green-600 dark:hover:bg-green-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h4 className="text-base font-semibold text-white mb-6">{t.quickLinks}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-stone-400 hover:text-green-500 transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 transition-all duration-300 mr-0 group-hover:mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h4 className="text-base font-semibold text-white mb-6">{t.resources}</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-sm text-stone-400 hover:text-green-500 transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 transition-all duration-300 mr-0 group-hover:mr-2" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h4 className="text-base font-semibold text-white mb-6">{t.getInTouch}</h4>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <li key={index}>
                    <a
                      href={contact.href}
                      className="flex items-start space-x-3 text-sm text-stone-400 hover:text-green-500 transition-colors group"
                    >
                      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span>{contact.text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="py-8 border-t border-stone-700 dark:border-stone-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-base font-semibold text-white mb-2">{t.newsletter}</h4>
              <p className="text-sm text-stone-400">{t.newsletterDesc}</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-4 py-2.5 bg-stone-800 dark:bg-stone-950 border border-stone-700 dark:border-stone-800 rounded-l-lg text-sm text-white placeholder-stone-500 focus:outline-none focus:border-green-600 transition-colors"
              />
              <button className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-r-lg transition-all duration-300 hover:shadow-lg flex items-center space-x-2">
                <span>{t.subscribe}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-700 dark:border-stone-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-400">
            <div className="flex items-center space-x-2">
              <span>© 2026</span>
              <span className="text-green-500 font-semibold">
                {language === 'hindi' ? 'स्मार्ट फार्मिंग AI' : 'Smart Farming AI'}
              </span>
              <span>- {t.allRights}</span>
            </div>
            <div className="flex items-center space-x-4">
              {legalLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <a
                    href={link.path}
                    className="hover:text-green-500 transition-colors"
                  >
                    {link.name}
                  </a>
                  {index < legalLinks.length - 1 && <span className="text-stone-600">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;