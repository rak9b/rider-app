import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { NotificationCenter } from '../features/common/NotificationCenter';
import { CommandPalette } from '../features/common/CommandPalette';
import { WeatherWidget } from '../features/common/WeatherWidget';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X, Zap, User, LogOut, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Features', path: '/features' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <CommandPalette />
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-primary-600 text-white p-1.5 rounded-xl shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform">
                <Zap size={24} fill="currentColor" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white">Velox</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated && <WeatherWidget />}
              
              {/* Command Palette Trigger */}
              <button 
                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
                onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                title="Search (Cmd+K)"
              >
                <Search size={20} />
              </button>

              <LanguageSwitcher />
              <ThemeToggle />
              {isAuthenticated && <NotificationCenter />}
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-3 ml-2">
                  <Link to={`/dashboard/${user?.role}`}>
                    <Button variant="ghost" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={handleLogout} size="sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">Log in</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="shadow-lg shadow-primary-500/20">Sign up</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              {isAuthenticated && <NotificationCenter />}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 hover:bg-gray-50 dark:hover:bg-slate-800"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-100 dark:border-slate-800 mt-4 space-y-3">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to={`/dashboard/${user?.role}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full"
                      >
                        <Button className="w-full justify-start" variant="ghost">
                          <User className="mr-2 h-4 w-4" />
                          Dashboard
                        </Button>
                      </Link>
                      <Button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full justify-start"
                        variant="outline"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full"
                      >
                        <Button variant="ghost" className="w-full">Log in</Button>
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full"
                      >
                        <Button className="w-full">Sign up</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};
