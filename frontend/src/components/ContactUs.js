import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

const ContactUs = () => {
  const { language } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const translations = {
    hindi: {
      title: 'हमसे संपर्क करें',
      subtitle: 'हम आपसे सुनना पसंद करेंगे',
      name: 'नाम',
      email: 'ईमेल',
      message: 'संदेश',
      submit: 'भेजें',
      success: 'संदेश भेजा गया!'
    },
    english: {
      title: 'Contact Us',
      subtitle: "We'd love to hear from you",
      name: 'Name',
      email: 'Email',
      message: 'Message',
      submit: 'Send Message',
      success: 'Message sent!'
    }
  };

  const t = translations[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success(t.success);
      setFormData({ name: '', email: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight font-semibold text-stone-900 mb-4">
            {t.title}
          </h2>
          <p className="text-base leading-relaxed text-stone-600">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-stone-200 shadow-sm rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                {t.name}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20 transition-all"
                required
                data-testid="contact-name-input"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                {t.email}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20 transition-all"
                required
                data-testid="contact-email-input"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                {t.message}
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20 transition-all resize-none"
                required
                data-testid="contact-message-textarea"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors font-semibold shadow-sm flex items-center justify-center space-x-2"
              data-testid="contact-submit-btn"
            >
              <Send className="w-5 h-5" />
              <span>{t.submit}</span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;