import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Home, MapPinOff } from 'lucide-react';
import { motion } from 'framer-motion';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-800 p-12 rounded-3xl shadow-xl max-w-lg w-full border border-gray-100 dark:border-slate-700"
      >
        <div className="bg-red-100 dark:bg-red-900/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPinOff size={48} className="text-red-500" />
        </div>
        
        <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">Destination Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The page you are looking for seems to have taken a wrong turn. Let's get you back on track.
        </p>

        <Link to="/">
          <Button size="lg" className="w-full">
            <Home className="mr-2 h-5 w-5" /> Return Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};
