import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Search, MapPin, Calendar, DollarSign, Navigation, Filter } from 'lucide-react';
import { faker } from '@faker-js/faker';

const generateRides = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid().slice(0, 8).toUpperCase(),
    rider: faker.person.fullName(),
    driver: faker.person.fullName(),
    pickup: faker.location.streetAddress(),
    destination: faker.location.streetAddress(),
    date: faker.date.recent().toLocaleDateString(),
    time: faker.date.recent().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    fare: faker.finance.amount({ min: 10, max: 80, dec: 2 }),
    status: faker.helpers.arrayElement(['completed', 'cancelled', 'in-progress']),
    payment: faker.helpers.arrayElement(['Card', 'Cash', 'Wallet']),
  }));
};

export const AdminRides = () => {
  const [rides] = useState(generateRides(20));
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRides = statusFilter === 'all' 
    ? rides 
    : rides.filter(r => r.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ride Oversight</h1>
          <p className="text-gray-500 dark:text-gray-400">Monitor all trips in real-time.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search Ride ID, Rider..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <Button variant="outline"><Filter size={18} /></Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'in-progress', 'completed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              statusFilter === status 
                ? 'bg-primary-600 text-white' 
                : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredRides.map((ride) => (
          <Card key={ride.id} className="hover:shadow-md transition-all">
            <CardContent className="p-5">
              <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
                {/* ID & Status */}
                <div className="min-w-[120px]">
                  <div className="font-mono text-xs text-gray-500 mb-1">#{ride.id}</div>
                  <Badge variant={
                    ride.status === 'completed' ? 'success' : 
                    ride.status === 'cancelled' ? 'danger' : 'warning'
                  } className="capitalize">
                    {ride.status}
                  </Badge>
                </div>

                {/* Route */}
                <div className="flex-1 space-y-2 w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{ride.pickup}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{ride.destination}</span>
                  </div>
                </div>

                {/* People */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm w-full lg:w-auto">
                  <div>
                    <span className="text-xs text-gray-500 block">Rider</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{ride.rider}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Driver</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{ride.driver}</span>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between w-full lg:w-auto gap-8">
                  <div className="text-right">
                    <div className="font-bold text-lg text-gray-900 dark:text-white">${ride.fare}</div>
                    <div className="text-xs text-gray-500">{ride.payment}</div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <div>{ride.date}</div>
                    <div>{ride.time}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
