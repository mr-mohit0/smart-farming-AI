import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

const SignupPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { language } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const translations = {
    hindi: {
      title: 'साइनअप',
      subtitle: 'नया खाता बनाएं',
      name: 'नाम',
      email: 'ईमेल',
      password: 'पासवर्ड',
      submit: 'खाता बनाएं',
      haveAccount: 'पहले से ही खाता है?',
      login: 'लॉगिन करें'
    },
    english: {
      title: 'Sign Up',
      subtitle: 'Create a new account',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      submit: 'Create Account',
      haveAccount: 'Already have an account?',
      login: 'Login'
    }
  };

  const t = translations[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await register(formData.email, formData.password, formData.name);

    if (result.success) {
      toast.success(language === 'hindi' ? 'खाता बनाया गया' : 'Account created successfully');
      navigate('/dashboard');
    } else {
      toast.error(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-stone-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white border border-stone-200 shadow-sm rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-green-700" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight font-semibold text-stone-900">
              {t.title}
            </h2>
            <p className="text-base leading-relaxed text-stone-600 mt-2">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" data-testid="signup-form">
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
                data-testid="name-input"
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
                data-testid="email-input"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                {t.password}
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20 transition-all"
                required
                minLength={6}
                data-testid="password-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors font-semibold shadow-sm"
              data-testid="signup-submit-btn"
            >
              {loading ? (language === 'hindi' ? 'बनाया जा रहा है...' : 'Creating...') : t.submit}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-stone-600">
            {t.haveAccount}{' '}
            <Link to="/login" className="text-green-700 hover:text-green-800 font-semibold">
              {t.login}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;