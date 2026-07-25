import React, { useState } from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Search, Filter } from 'lucide-react';

interface Ride {
  id: string;
  rider: string;
  driver: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  fare: string;
  status: 'completed' | 'cancelled' | 'in-progress';
  payment: 'Card' | 'Cash' | 'Wallet';
}

const INITIAL_RIDES: Ride[] = [
  {
    id: 'RIDE-101',
    rider: 'John Rider',
    driver: 'Mike Driver',
    pickup: '123 Market St, San Francisco, CA',
    destination: '789 Mission St, San Francisco, CA',
    date: '2026-07-25',
    time: '14:30',
    fare: '25.50',
    status: 'completed',
    payment: 'Card',
  },
  {
    id: 'RIDE-102',
    rider: 'Sarah Rider',
    driver: 'Tom Driver',
    pickup: '456 Howard St, San Francisco, CA',
    destination: '101 California St, San Francisco, CA',
    date: '2026-07-25',
    time: '15:10',
    fare: '18.75',
    status: 'completed',
    payment: 'Cash',
  },
  {
    id: 'RIDE-103',
    rider: 'Alice Smith',
    driver: 'Emma Driver',
    pickup: '500 Post St, San Francisco, CA',
    destination: 'SFO Airport Terminal 2',
    date: '2026-07-25',
    time: '16:00',
    fare: '45.00',
    status: 'in-progress',
    payment: 'Wallet',
  },
  {
    id: 'RIDE-104',
    rider: 'Bob Wilson',
    driver: 'Unassigned',
    pickup: '700 Montgomery St, San Francisco, CA',
    destination: 'Oakland Airport',
    date: '2026-07-25',
    time: '16:15',
    fare: '55.20',
    status: 'cancelled',
    payment: 'Card',
  },
];

export const AdminRides = () => {
  const [rides] = useState<Ride[]>(INITIAL_RIDES);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // BUG-012: Wired search filter to actually filter the ride list
  const filteredRides = rides.filter(r => {
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term || (
      r.id.toLowerCase().includes(term) ||
      r.rider.toLowerCase().includes(term) ||
      r.driver.toLowerCase().includes(term) ||
      r.pickup.toLowerCase().includes(term) ||
      r.destination.toLowerCase().includes(term)
    );
    return matchesStatus && matchesSearch;
  });

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Ride ID, Rider..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
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
        {filteredRides.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 text-gray-500">
            No rides found matching your filters.
          </div>
        ) : (
          filteredRides.map((ride) => (
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
          ))
        )}
      </div>
    </div>
  );
};
