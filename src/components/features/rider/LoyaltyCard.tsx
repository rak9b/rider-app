import React from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Crown, ChevronRight, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoyaltyCard = () => {
  const points = 2450;
  const nextTier = 3000;
  const progress = (points / nextTier) * 100;

  return (
    <Card className="relative overflow-hidden border-none shadow-xl">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 dark:from-black dark:via-slate-900 dark:to-black z-0"></div>
      
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>

      <CardContent className="relative z-10 p-6 text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Crown className="text-yellow-400 fill-yellow-400" size={20} />
              <span className="font-bold text-yellow-400 tracking-wider text-sm uppercase">Gold Member</span>
            </div>
            <h3 className="text-3xl font-bold">{points.toLocaleString()} <span className="text-lg font-normal text-gray-400">pts</span></h3>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg">
            <Gift size={24} className="text-white" />
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Progress to Platinum</span>
            <span>{nextTier - points} pts needed</span>
          </div>
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            />
          </div>
        </div>

        <button className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-3 text-sm font-medium backdrop-blur-sm">
          <span>View Rewards Catalog</span>
          <ChevronRight size={16} />
        </button>
      </CardContent>
    </Card>
  );
};
