import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, Car, Shield, Home, CreditCard, FileText, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/utils';

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Toggle with Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    { id: 'home', name: 'Go to Home', icon: Home, path: '/' },
    { id: 'dashboard', name: 'Dashboard', icon: User, path: '/dashboard/rider' },
    { id: 'book', name: 'Book a Ride', icon: Car, path: '/dashboard/rider' },
    { id: 'history', name: 'Ride History', icon: FileText, path: '/dashboard/rider/history' },
    { id: 'profile', name: 'Profile Settings', icon: Settings, path: '/dashboard/rider/profile' },
    { id: 'safety', name: 'Safety Center', icon: Shield, path: '/faq' },
    { id: 'payment', name: 'Payment Methods', icon: CreditCard, path: '/dashboard/rider/profile' },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]" 
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 z-[70] overflow-hidden"
          >
            <div className="flex items-center px-4 py-3 border-b border-gray-100 dark:border-slate-800">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 text-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <div className="text-xs text-gray-400 border border-gray-200 dark:border-slate-700 px-2 py-1 rounded">ESC</div>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto p-2">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => handleSelect(cmd.path)}
                    className="w-full flex items-center px-3 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-left group"
                  >
                    <div className="p-2 bg-gray-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 rounded-lg mr-3 transition-colors">
                      <cmd.icon className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-primary-500" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{cmd.name}</span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No results found.
                </div>
              )}
            </div>
            
            <div className="px-4 py-2 bg-gray-50 dark:bg-slate-950/50 border-t border-gray-100 dark:border-slate-800 text-xs text-gray-400 flex justify-between">
              <span>Velox Command</span>
              <span>v1.0.0</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
