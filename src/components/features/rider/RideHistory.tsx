import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { faker } from '@faker-js/faker';
import { MapPin, Calendar, DollarSign, ChevronRight } from 'lucide-react';
import { RideDetailsModal } from '../common/RideDetailsModal';

// Mock Data Generation
const generateHistory = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    date: faker.date.recent().toLocaleDateString(),
    time: faker.date.recent().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    pickup: faker.location.streetAddress(),
    destination: faker.location.streetAddress(),
    driver: faker.person.fullName(),
    driverImg: faker.image.avatar(),
    fare: faker.finance.amount({ min: 10, max: 100, dec: 2 }),
    status: faker.helpers.arrayElement(['completed', 'cancelled']),
  }));
};

export const RideHistory = () => {
  const rides = generateHistory(8);
  const [selectedRide, setSelectedRide] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Trips</h2>
      </div>
      
      <div className="grid gap-4">
        {rides.map((ride) => (
          <div 
            key={ride.id} 
            onClick={() => setSelectedRide(ride)}
            className="group bg-white dark:bg-dark-surface rounded-2xl p-4 border border-gray-100 dark:border-white/5 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Driver Avatar / Date Box */}
                <div className="flex-shrink-0">
                  <div className="h-14 w-14 rounded-xl bg-gray-100 dark:bg-white/5 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                    <span className="text-xs font-bold uppercase">{ride.date.split('/')[1]}</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{ride.date.split('/')[0]}</span>
                  </div>
                </div>

                {/* Ride Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                      {ride.destination}
                    </h3>
                    <Badge variant={ride.status === 'completed' ? 'success' : 'danger'} className="text-[10px] px-1.5 py-0">
                      {ride.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-3">
                    <span className="flex items-center"><Calendar size={12} className="mr-1" /> {ride.time}</span>
                    <span className="flex items-center"><DollarSign size={12} className="mr-1" /> {ride.fare}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center space-x-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{ride.driver}</p>
                  <p className="text-xs text-gray-500">Driver</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors">
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <RideDetailsModal 
        isOpen={!!selectedRide} 
        onClose={() => setSelectedRide(null)} 
        ride={selectedRide} 
      />
    </div>
  );
};
