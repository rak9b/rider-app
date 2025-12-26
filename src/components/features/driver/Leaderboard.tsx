import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Trophy, Medal, TrendingUp } from 'lucide-react';
import { faker } from '@faker-js/faker';

const drivers = Array.from({ length: 5 }).map((_, i) => ({
  id: i,
  name: faker.person.fullName(),
  points: faker.number.int({ min: 1000, max: 5000 }),
  rides: faker.number.int({ min: 50, max: 200 }),
  avatar: faker.image.avatar(),
  trend: faker.helpers.arrayElement(['up', 'down', 'stable'])
}));

export const Leaderboard = () => {
  const sortedDrivers = drivers.sort((a, b) => b.points - a.points);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Trophy className="text-yellow-500" size={20} />
          Top Drivers
        </CardTitle>
        <span className="text-xs text-gray-500 bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-full">This Week</span>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100 dark:divide-slate-800">
          {sortedDrivers.map((driver, index) => (
            <div key={driver.id} className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="w-8 font-bold text-gray-400 text-lg">
                {index === 0 ? <Medal className="text-yellow-500" /> : 
                 index === 1 ? <Medal className="text-gray-400" /> : 
                 index === 2 ? <Medal className="text-orange-500" /> : 
                 `#${index + 1}`}
              </div>
              <img src={driver.avatar} alt={driver.name} className="w-10 h-10 rounded-full mx-3 border border-gray-100 dark:border-slate-700" />
              <div className="flex-1">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">{driver.name}</h4>
                <p className="text-xs text-gray-500">{driver.rides} rides</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary-600 dark:text-primary-400">{driver.points.toLocaleString()}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Points</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100 dark:border-slate-800 text-center">
          <button className="text-sm text-primary-500 font-medium hover:text-primary-600 flex items-center justify-center gap-1 w-full">
            <TrendingUp size={16} /> View Full Rankings
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
