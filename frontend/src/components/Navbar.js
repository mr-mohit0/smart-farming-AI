import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sprout, Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, darkMode, toggleDarkMode } = useApp();
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const translations = {
    hindi: {
      title: 'स्मार्ट फार्मिंग AI सहायक',
      tagline: 'किसानों के लिए AI-संचालित मार्गदर्शन',
      home: 'होम',
      features: 'विशेषताएँ',
      health: 'स्वास्थ्य संसाधन',
      login: 'लॉगिन',
      signup: 'साइनअप',
      logout: 'लॉगआउट',
      dashboard: 'डैशबोर्ड'
    },
    english: {
      title: 'Smart Farming AI Assistant',
      tagline: 'AI-powered guidance for farmers',
      home: 'Home',
      features: 'Features',
      health: 'Health Resources',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      dashboard: 'Dashboard'
    }
  };

  const t = translations[language];

  const navLinks = [
    { path: '/', label: t.home, testId: 'nav-home' },
    { path: '/features', label: t.features, testId: 'nav-features' },
    { path: '/health-resources', label: t.health, testId: 'nav-health' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-sm'
          : 'bg-white dark:bg-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            data-testid="navbar-logo"
          >
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <Sprout className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-stone-900 dark:text-white tracking-tight" data-testid="navbar-title">
                {t.title}
              </h1>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">{t.tagline}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={link.testId}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                  isActive(link.path)
                    ? 'text-green-700 dark:text-green-500'
                    : 'text-stone-600 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-500'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-green-700 transition-all duration-300 ${
                    isActive(link.path) ? 'w-8' : 'w-0 group-hover:w-8'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2.5 text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-all duration-300"
              data-testid="dark-mode-toggle"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 text-sm font-semibold text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-all duration-300 hover:scale-105"
              data-testid="language-toggle"
            >
              {language === 'hindi' ? 'English' : 'हिंदी'}
            </button>

            {user && user !== false ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-semibold text-stone-700 hover:text-green-700 transition-colors"
                >
                  {user.name || user.email}
                </Link>
                <button
                  onClick={logout}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                  data-testid="logout-button"
                >
                  {t.logout}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-sm font-semibold text-stone-700 hover:text-green-700 transition-all duration-300"
                  data-testid="login-button"
                >
                  {t.login}
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                  data-testid="signup-button"
                >
                  {t.signup}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-stone-700" />
            ) : (
              <Menu className="w-6 h-6 text-stone-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-stone-200 overflow-hidden"
            data-testid="mobile-menu"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-green-50 text-green-700'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-stone-200 space-y-3">
                <button
                  onClick={toggleLanguage}
                  className="w-full px-4 py-3 text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors text-left"
                >
                  {language === 'hindi' ? 'Switch to English' : 'हिन्दी में बदलें'}
                </button>

                {user && user !== false ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-stone-700 bg-stone-50 rounded-lg"
                    >
                      {user.name || user.email}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg transition-all"
                    >
                      {t.logout}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-sm font-semibold text-center text-stone-700 border border-stone-300 rounded-lg transition-all hover:bg-stone-50"
                    >
                      {t.login}
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-sm font-semibold text-center text-white bg-gradient-to-r from-green-600 to-green-700 rounded-lg transition-all"
                    >
                      {t.signup}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;