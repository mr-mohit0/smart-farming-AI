import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sprout } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useApp();
  const { user, logout } = useAuth();

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
      signup: 'Signup',
      logout: 'Logout',
      dashboard: 'Dashboard'
    }
  };

  const t = translations[language];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 transition-all">
      <div className="max-width px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-green-700 rounded-xl">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <Link to="/" className="text-xl font-bold text-stone-900" data-testid="navbar-title">
                {t.title}
              </Link>
              <p className="text-xs text-stone-600 hidden sm:block">{t.tagline}</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-stone-700 hover:text-green-700 transition-colors font-medium"
              data-testid="nav-home"
            >
              {t.home}
            </Link>
            <Link
              to="/features"
              className="text-stone-700 hover:text-green-700 transition-colors font-medium"
              data-testid="nav-features"
            >
              {t.features}
            </Link>
            <Link
              to="/health-resources"
              className="text-stone-700 hover:text-green-700 transition-colors font-medium"
              data-testid="nav-health"
            >
              {t.health}
            </Link>

            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-sm bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors font-medium"
              data-testid="language-toggle"
            >
              {language === 'hindi' ? 'English' : 'हिन्दी'}
            </button>

            {user && user !== false ? (
              <>
                <span className="text-sm text-stone-600">{user.name || user.email}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-semibold"
                  data-testid="logout-button"
                >
                  {t.logout}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-green-700 border border-green-700 rounded-xl hover:bg-stone-50 transition-colors font-semibold"
                  data-testid="login-button"
                >
                  {t.login}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition-colors font-semibold shadow-sm"
                  data-testid="signup-button"
                >
                  {t.signup}
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
            data-testid="mobile-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-200" data-testid="mobile-menu">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block text-stone-700 hover:text-green-700 py-2 font-medium"
            >
              {t.home}
            </Link>
            <Link
              to="/features"
              onClick={() => setIsOpen(false)}
              className="block text-stone-700 hover:text-green-700 py-2 font-medium"
            >
              {t.features}
            </Link>
            <Link
              to="/health-resources"
              onClick={() => setIsOpen(false)}
              className="block text-stone-700 hover:text-green-700 py-2 font-medium"
            >
              {t.health}
            </Link>

            <button
              onClick={toggleLanguage}
              className="w-full text-left px-3 py-2 bg-stone-100 rounded-lg font-medium"
            >
              {language === 'hindi' ? 'Switch to English' : 'हिन्दी में बदलें'}
            </button>

            {user && user !== false ? (
              <>
                <div className="py-2 text-sm text-stone-600">{user.name || user.email}</div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-semibold"
                >
                  {t.logout}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-center text-green-700 border border-green-700 rounded-xl hover:bg-stone-50 transition-colors font-semibold"
                >
                  {t.login}
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-center bg-green-700 text-white rounded-xl hover:bg-green-800 transition-colors font-semibold"
                >
                  {t.signup}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;