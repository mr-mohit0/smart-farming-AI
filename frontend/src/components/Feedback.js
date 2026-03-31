import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

const Feedback = () => {
  const { language } = useApp();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const translations = {
    hindi: {
      title: 'अपनी प्रतिक्रिया दें',
      subtitle: 'हमें बताएं कि हम कैसे सुधार कर सकते हैं',
      feedbackPlaceholder: 'अपनी प्रतिक्रिया यहां लिखें...',
      submit: 'प्रतिक्रिया भेजें',
      success: 'प्रतिक्रिया के लिए धन्यवाद!'
    },
    english: {
      title: 'Give Your Feedback',
      subtitle: 'Tell us how we can improve',
      feedbackPlaceholder: 'Write your feedback here...',
      submit: 'Submit Feedback',
      success: 'Thank you for your feedback!'
    }
  };

  const t = translations[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error(language === 'hindi' ? 'कृपया रेटिंग दें' : 'Please provide a rating');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast.success(t.success);
      setRating(0);
      setFeedback('');
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
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
          <form onSubmit={handleSubmit} className="space-y-6" data-testid="feedback-form">
            <div>
              <p className="text-sm font-semibold text-stone-700 mb-3 text-center">
                {language === 'hindi' ? 'अपनी रेटिंग दें' : 'Rate your experience'}
              </p>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-all duration-200 transform hover:scale-110"
                    data-testid={`star-${star}`}
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= rating
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-stone-300 hover:text-yellow-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={t.feedbackPlaceholder}
                rows={5}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20 transition-all resize-none"
                data-testid="feedback-textarea"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors font-semibold shadow-sm"
              data-testid="feedback-submit-btn"
            >
              {t.submit}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Feedback;