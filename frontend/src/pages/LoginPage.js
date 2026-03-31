import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { language } = useApp();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const translations = {
    hindi: {
      title: 'लॉगिन',
      subtitle: 'अपने खाते में प्रवेश करें',
      email: 'ईमेल',
      password: 'पासवर्ड',
      submit: 'लॉगिन करें',
      noAccount: 'खाता नहीं है?',
      signup: 'साइनअप करें'
    },
    english: {
      title: 'Login',
      subtitle: 'Access your account',
      email: 'Email',
      password: 'Password',
      submit: 'Login',
      noAccount: "Don't have an account?",
      signup: 'Sign up'
    }
  };

  const t = translations[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      toast.success(language === 'hindi' ? 'सफलतापूर्वक लॉगिन हुआ' : 'Login successful');
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
              <LogIn className="w-8 h-8 text-green-700" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight font-semibold text-stone-900">
              {t.title}
            </h2>
            <p className="text-base leading-relaxed text-stone-600 mt-2">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" data-testid="login-form">
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
                data-testid="password-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors font-semibold shadow-sm"
              data-testid="login-submit-btn"
            >
              {loading ? (language === 'hindi' ? 'लॉगिन हो रहा है...' : 'Logging in...') : t.submit}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-stone-600">
            {t.noAccount}{' '}
            <Link to="/signup" className="text-green-700 hover:text-green-800 font-semibold">
              {t.signup}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;