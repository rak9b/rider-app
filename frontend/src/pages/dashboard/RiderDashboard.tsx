import React from 'react';
import { BookRide } from '../../components/features/rider/BookRide';
import { ActiveRideCard } from '../../components/features/rider/ActiveRideCard';
import { LoyaltyCard } from '../../components/features/rider/LoyaltyCard';
import { Stories } from '../../components/features/rider/Stories';
import { Gift, MapPin, Search } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const RiderDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="space-y-8 pb-32">
      {/* Header with Greeting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {user?.name?.split(' ')[0] || 'Rider'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Ready for your next journey?</p>
        </div>
        <div className="hidden md:flex bg-white dark:bg-slate-800 rounded-full px-4 py-2 border border-slate-200 dark:border-slate-700 items-center gap-2 text-sm text-slate-500">
          <MapPin size={16} className="text-primary-500" />
          <span>Current Location: <span className="text-slate-900 dark:text-white font-bold">San Francisco, CA</span></span>
        </div>
      </div>

      {/* Stories Section */}
      <div className="mb-6 overflow-x-auto pb-4 scrollbar-hide">
        <Stories />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Booking Area */}
        <div className="flex-1 w-full space-y-8">
          <BookRide />

          {/* Recent Destinations / Suggestions */}
          <GlassCard className="p-6 border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><Search size={18} /> Recent Destinations</h3>
            <div className="space-y-3">
              {[
                { name: 'Office', address: '123 Tech Park, Silicon Valley' },
                { name: 'Gym', address: 'Gold\'s Gym, Downtown' },
                { name: 'Home', address: '555 California St, SF' }
              ].map((place, i) => (
                <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors group">
                  <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">{place.name}</p>
                    <p className="text-xs text-slate-500">{place.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Sidebar / Extra Info for Desktop */}
        <div className="w-full lg:w-96 space-y-6">
          <LoyaltyCard />

          {/* Refer & Earn Banner */}
          <GlassCard className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-[2rem] p-8 text-white shadow-xl shadow-pink-500/20 relative overflow-hidden group cursor-pointer border-0">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                <Gift className="text-white" size={24} />
              </div>
              <h3 className="font-black text-2xl mb-2">Get $20 Free</h3>
              <p className="text-pink-100 font-medium mb-6 leading-relaxed">Invite your friends to Velox. They get $10, you get $20 off your next ride.</p>
              <button className="h-10 px-6 font-bold bg-white text-pink-600 rounded-xl shadow-lg hover:bg-pink-50 transition-colors text-sm">
                Share Invite Code
              </button>
            </div>
          </GlassCard>

          {/* Safety Tip */}
          <GlassCard className="p-6 border-slate-200 dark:border-slate-800">
            <div className="flex gap-4">
              <div className="h-24 w-2 bg-green-500 rounded-full" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Safety First</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">Always verify the driver's vehicle plate number and photo before entering the car.</p>
                <a href="/safety" className="text-xs font-bold text-green-600 hover:underline">Read Safety Guidelines</a>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
      <ActiveRideCard />
    </div>
  );
};
