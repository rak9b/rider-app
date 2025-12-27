import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookRide } from '../../components/features/rider/BookRide';
import { ActiveRideCard } from '../../components/features/rider/ActiveRideCard';
import { LoyaltyCard } from '../../components/features/rider/LoyaltyCard';
import { Stories } from '../../components/features/rider/Stories';
import {
  Gift, MapPin, Search, Clock, Star, Zap, TrendingUp,
  ChevronRight, Sparkles, Award, Calendar, Navigation
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const RiderDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const recentDestinations = [
    {
      id: '1',
      name: 'Office',
      address: '123 Tech Park, Silicon Valley',
      icon: '🏢',
      distance: '5.2 km',
      estimatedTime: '15 min'
    },
    {
      id: '2',
      name: 'Gym',
      address: 'Gold\'s Gym, Downtown',
      icon: '💪',
      distance: '2.8 km',
      estimatedTime: '8 min'
    },
    {
      id: '3',
      name: 'Home',
      address: '555 California St, SF',
      icon: '🏠',
      distance: '12.5 km',
      estimatedTime: '25 min'
    }
  ];

  const quickStats = [
    { label: 'Rides This Month', value: '24', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Loyalty Points', value: '1,250', icon: Award, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Saved ($)', value: '$45', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-32"
    >
      {/* Enhanced Header with Animated Greeting */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 via-violet-600 to-purple-700 p-8 md:p-10 text-white shadow-2xl"
      >
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2"
              >
                <Sparkles size={20} className="text-yellow-300" />
                <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">
                  Premium Member
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-black tracking-tight"
              >
                {getGreeting()}, {user?.name?.split(' ')[0] || 'Rider'}! 👋
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 font-medium text-lg"
              >
                Where would you like to go today?
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20"
            >
              <MapPin size={20} className="text-yellow-300" />
              <div>
                <p className="text-xs font-bold opacity-80">Current Location</p>
                <p className="text-sm font-bold">San Francisco, CA</p>
              </div>
            </motion.div>
          </div>

          {/* Quick Stats Row */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-3 gap-4 mt-8"
          >
            {quickStats.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${stat.bg}`}>
                    <stat.icon className={stat.color} size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-black">{stat.value}</p>
                    <p className="text-xs opacity-80">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Stories Section with Enhanced Animation */}
      <motion.div variants={itemVariants} className="overflow-x-auto pb-4 scrollbar-hide">
        <Stories />
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Booking Area */}
        <motion.div variants={itemVariants} className="flex-1 w-full space-y-8">
          <BookRide />

          {/* Enhanced Recent Destinations */}
          <GlassCard className="p-6 md:p-8 border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-xl text-slate-900 dark:text-white flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary-500/10">
                  <Navigation size={20} className="text-primary-600" />
                </div>
                Recent Destinations
              </h3>
              <button className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 group">
                View All
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {recentDestinations.map((place, i) => (
                  <motion.div
                    key={place.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    onClick={() => setSelectedDestination(place.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${selectedDestination === place.id
                        ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border-2 border-transparent'
                      }`}
                  >
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-3xl flex-shrink-0 shadow-lg shadow-primary-500/30">
                      {place.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-base text-slate-900 dark:text-white mb-1">
                        {place.name}
                      </p>
                      <p className="text-sm text-slate-500 mb-1">{place.address}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1 text-slate-400">
                          <MapPin size={12} />
                          {place.distance}
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock size={12} />
                          {place.estimatedTime}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="h-10 w-10 rounded-xl bg-primary-500 text-white flex items-center justify-center shadow-lg shadow-primary-500/30 hover:bg-primary-600 transition-colors"
                    >
                      <ChevronRight size={20} />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </GlassCard>

          {/* Upcoming Scheduled Rides */}
          <GlassCard className="p-6 md:p-8 border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-xl text-slate-900 dark:text-white flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10">
                  <Calendar size={20} className="text-orange-600" />
                </div>
                Scheduled Rides
              </h3>
              <button className="text-sm font-bold text-primary-600 hover:text-primary-700">
                + Schedule
              </button>
            </div>
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                <Calendar size={32} className="text-slate-400" />
              </div>
              <p className="text-slate-500 font-medium">No scheduled rides</p>
              <p className="text-sm text-slate-400 mt-1">Book a ride in advance for hassle-free travel</p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Enhanced Sidebar */}
        <motion.div variants={itemVariants} className="w-full lg:w-96 space-y-6">
          <LoyaltyCard />

          {/* Enhanced Refer & Earn Banner */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <GlassCard className="bg-gradient-to-br from-pink-500 via-rose-600 to-purple-700 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group cursor-pointer border-0">
              {/* Animated Background */}
              <motion.div
                className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.5, 1],
                  x: [-10, 10, -10],
                  y: [-10, 10, -10]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md"
                >
                  <Gift className="text-white" size={28} />
                </motion.div>

                <h3 className="font-black text-3xl mb-2">Get $20 Free</h3>
                <p className="text-pink-100 font-medium mb-6 leading-relaxed">
                  Invite your friends to RiderApp. They get $10, you get $20 off your next ride.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-12 px-6 font-bold bg-white text-pink-600 rounded-xl shadow-xl hover:bg-pink-50 transition-colors flex items-center gap-2 group"
                >
                  Share Invite Code
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Enhanced Safety Tip */}
          <GlassCard className="p-6 border-slate-200 dark:border-slate-800">
            <div className="flex gap-4">
              <motion.div
                animate={{ height: [80, 100, 80] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 bg-gradient-to-b from-green-400 to-green-600 rounded-full"
              />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Star size={16} className="text-green-500" />
                  Safety First
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  Always verify the driver's vehicle plate number and photo before entering the car.
                </p>
                <a
                  href="/safety"
                  className="text-xs font-bold text-green-600 hover:underline flex items-center gap-1 group"
                >
                  Read Safety Guidelines
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </GlassCard>

          {/* Premium Support Card */}
          <GlassCard className="p-6 border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 mb-4">
                <Sparkles size={28} className="text-primary-600" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                24/7 Premium Support
              </h4>
              <p className="text-sm text-slate-500 mb-4">
                Need help? Our support team is always here for you.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-10 px-6 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/30"
              >
                Contact Support
              </motion.button>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <ActiveRideCard />
    </motion.div>
  );
};
