import React from 'react';
import { Car, Smartphone, ShieldCheck, CreditCard, Clock, Map } from 'lucide-react';

const FeatureSection = ({ title, desc, features, align = 'left' }: any) => (
  <div className={`py-20 ${align === 'right' ? 'bg-gray-50 dark:bg-slate-800/50' : ''}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`flex flex-col lg:flex-row gap-16 items-center ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
        <div className="flex-1 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{desc}</p>
          <ul className="space-y-4">
            {features.map((item: string, i: number) => (
              <li key={i} className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <ShieldCheck size={14} className="text-green-600 dark:text-green-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-transparent z-10"></div>
             <img 
               src={align === 'left' 
                 ? "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop" 
                 : "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"} 
               alt="App Feature" 
               className="w-full h-full object-cover"
             />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const Features = () => {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen pt-16">
      <div className="text-center max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Features designed for everyone</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Whether you're riding, driving, or managing the fleet, Velox has powerful tools built just for you.</p>
      </div>

      <FeatureSection 
        title="For Riders"
        desc="Experience the ultimate convenience in urban mobility. Book a ride in seconds and travel with peace of mind."
        features={[
          "Real-time driver tracking on interactive maps",
          "Multiple payment options including Cash, Card, and Wallet",
          "Ride sharing to split fares with friends",
          "Scheduled rides for upcoming trips",
          "SOS Emergency button for enhanced safety"
        ]}
      />

      <FeatureSection 
        align="right"
        title="For Drivers"
        desc="Be your own boss. Set your own schedule and earn competitive rates with our driver-first platform."
        features={[
          "Flexible working hours - Go Online/Offline anytime",
          "Instant payout options for your earnings",
          "Heatmaps showing high-demand areas",
          "In-app navigation and route optimization",
          "Driver rewards and loyalty program"
        ]}
      />

      <FeatureSection 
        title="For Admins"
        desc="Complete oversight and control over your ride-hailing operations with our comprehensive dashboard."
        features={[
          "Real-time fleet monitoring and management",
          "Advanced analytics and revenue reporting",
          "User management and verification tools",
          "Dynamic pricing configuration",
          "Automated dispute resolution system"
        ]}
      />
    </div>
  );
};
