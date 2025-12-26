import React from 'react';
import { BookRide } from '../../components/features/rider/BookRide';
import { ActiveRideCard } from '../../components/features/rider/ActiveRideCard';
import { LoyaltyCard } from '../../components/features/rider/LoyaltyCard';
import { Stories } from '../../components/features/rider/Stories';
import { Gift } from 'lucide-react';

export const RiderDashboard = () => {
  return (
    <div className="space-y-8 pb-20">
      {/* Stories Section */}
      <div className="mb-4">
        <Stories />
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 w-full">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Book a Ride</h1>
            <p className="text-gray-500 dark:text-gray-400">Where do you want to go today?</p>
          </div>
          <BookRide />
        </div>
        
        {/* Sidebar / Extra Info for Desktop */}
        <div className="w-full md:w-80 space-y-6">
          <LoyaltyCard />
          
          {/* Refer & Earn Banner */}
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                <Gift className="text-white" />
              </div>
              <h3 className="font-bold text-lg mb-1">Refer & Earn $20</h3>
              <p className="text-sm text-pink-100 mb-3">Invite your friends to Velox and earn credit for every ride they take.</p>
              <button className="text-xs font-bold bg-white text-pink-600 px-4 py-2 rounded-lg shadow-sm">
                Invite Friends
              </button>
            </div>
          </div>
        </div>
      </div>
      <ActiveRideCard />
    </div>
  );
};
