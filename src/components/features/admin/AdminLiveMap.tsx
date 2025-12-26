import React from 'react';
import { motion } from 'framer-motion';
import { Car, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { faker } from '@faker-js/faker';

// Generate mock drivers with coordinates
const drivers = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  name: faker.person.fullName(),
  status: faker.helpers.arrayElement(['busy', 'idle']),
  x: faker.number.int({ min: 10, max: 90 }),
  y: faker.number.int({ min: 10, max: 90 }),
  rotation: faker.number.int({ min: 0, max: 360 }),
}));

export const AdminLiveMap = () => {
  return (
    <Card className="h-[500px] border-0 shadow-xl overflow-hidden relative group">
      <CardHeader className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent pt-6 px-6 pb-12">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Live Fleet Monitor
          </CardTitle>
          <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/10">
            {drivers.length} Active Drivers
          </div>
        </div>
      </CardHeader>

      <div className="absolute inset-0 bg-slate-900">
        {/* Dark Map Style Background */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-122.4194,37.7749,12,0,0/800x600?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2xsN3F3OG0wMDc4MnB0Y2d4b3F4b3F4In0.example')] bg-cover bg-center grayscale"></div>
        
        {/* Grid Overlay for Tech Feel */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        
        {/* Animated Drivers */}
        {drivers.map((driver) => (
          <motion.div
            key={driver.id}
            initial={{ x: `${driver.x}%`, y: `${driver.y}%` }}
            animate={{ 
              x: [`${driver.x}%`, `${driver.x + (Math.random() * 10 - 5)}%`, `${driver.x}%`],
              y: [`${driver.y}%`, `${driver.y + (Math.random() * 10 - 5)}%`, `${driver.y}%`],
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute w-8 h-8 -ml-4 -mt-4 cursor-pointer group/driver"
          >
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/driver:opacity-100 transition-opacity z-20 pointer-events-none">
              <div className="bg-white dark:bg-slate-800 text-xs p-2 rounded-lg shadow-xl whitespace-nowrap border border-gray-100 dark:border-slate-700">
                <p className="font-bold text-gray-900 dark:text-white">{driver.name}</p>
                <p className={`capitalize ${driver.status === 'busy' ? 'text-orange-500' : 'text-green-500'}`}>
                  ● {driver.status}
                </p>
              </div>
            </div>

            {/* Car Icon */}
            <div 
              className={`p-1.5 rounded-full shadow-lg transition-transform hover:scale-125 ${
                driver.status === 'busy' 
                  ? 'bg-orange-500 text-white shadow-orange-500/30' 
                  : 'bg-primary-500 text-white shadow-primary-500/30'
              }`}
              style={{ transform: `rotate(${driver.rotation}deg)` }}
            >
              <Car size={14} fill="currentColor" />
            </div>
            
            {/* Pulse Effect */}
            <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${
               driver.status === 'busy' ? 'bg-orange-500' : 'bg-primary-500'
            }`}></div>
          </motion.div>
        ))}

        {/* Hotspots */}
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-red-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
      </div>
    </Card>
  );
};
