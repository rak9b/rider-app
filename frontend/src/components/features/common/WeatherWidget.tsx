import React from 'react';
import { CloudRain, Sun, Cloud, Wind } from 'lucide-react';

export const WeatherWidget = () => {
  return (
    <div className="flex items-center gap-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-100 dark:border-white/5">
      <Sun className="w-4 h-4 text-yellow-500" />
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">24°C</span>
      <span className="text-xs text-gray-400 border-l border-gray-300 dark:border-gray-600 pl-2">Clear Sky</span>
    </div>
  );
};
