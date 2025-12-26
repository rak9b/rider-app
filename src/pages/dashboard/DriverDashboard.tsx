import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { toggleOnlineStatus } from '../../store/slices/authSlice';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Leaderboard } from '../../components/features/driver/Leaderboard';
import { MapPin, User, Clock, CheckCircle, XCircle, Power } from 'lucide-react';
import { faker } from '@faker-js/faker';
import toast from 'react-hot-toast';
import { OnlineChecklistModal } from '../../components/features/driver/OnlineChecklistModal';

// Mock Incoming Requests
const generateRequests = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    rider: faker.person.fullName(),
    pickup: faker.location.streetAddress(),
    destination: faker.location.secondaryAddress(),
    fare: faker.finance.amount({ min: 10, max: 40, dec: 2 }),
    distance: `${faker.number.float({ min: 1, max: 10, fractionDigits: 1 })} km`,
    rating: faker.number.float({ min: 4, max: 5, fractionDigits: 1 }),
  }));
};

export const DriverDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [requests, setRequests] = useState(generateRequests(3));
  const [showChecklist, setShowChecklist] = useState(false);

  const handleToggleStatus = () => {
    if (!user?.isOnline) {
      // If going online, show checklist first
      setShowChecklist(true);
    } else {
      // If going offline, just do it
      dispatch(toggleOnlineStatus());
      toast.success('You are now Offline');
    }
  };

  const confirmOnline = () => {
    dispatch(toggleOnlineStatus());
    toast.success('You are now Online');
  };

  const handleAccept = (id: string) => {
    toast.success('Ride Accepted! Navigation started.');
    setRequests(requests.filter(r => r.id !== id));
  };

  const handleReject = (id: string) => {
    toast('Ride Declined', { icon: '🚫' });
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Status Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {user?.isOnline ? 'You are online and receiving requests.' : 'Go online to start earning.'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-full font-medium flex items-center gap-2 ${user?.isOnline ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-400'}`}>
            <span className={`h-2.5 w-2.5 rounded-full ${user?.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
            {user?.isOnline ? 'Online' : 'Offline'}
          </div>
          <Button 
            onClick={handleToggleStatus}
            variant={user?.isOnline ? 'danger' : 'primary'}
            className="w-32"
          >
            <Power className="mr-2 h-4 w-4" />
            {user?.isOnline ? 'Go Offline' : 'Go Online'}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      {user?.isOnline ? (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Incoming Requests */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Clock className="text-primary-500" /> Incoming Requests
            </h2>
            
            {requests.length > 0 ? (
              requests.map((req) => (
                <Card key={req.id} className="border-l-4 border-l-primary-500 animate-in slide-in-from-left-2 fade-in duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                          <User className="text-gray-500" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">{req.rider}</h3>
                          <span className="text-xs text-yellow-500">★ {req.rating} Rating</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-2xl font-bold text-primary-600 dark:text-primary-400">${req.fare}</span>
                        <span className="text-xs text-gray-500">{req.distance}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 min-w-[16px]"><div className="h-3 w-3 rounded-full border-2 border-green-500"></div></div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{req.pickup}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 min-w-[16px]"><MapPin size={14} className="text-red-500" /></div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{req.destination}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" onClick={() => handleReject(req.id)} className="border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <XCircle className="mr-2 h-4 w-4" /> Decline
                      </Button>
                      <Button onClick={() => handleAccept(req.id)} className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="mr-2 h-4 w-4" /> Accept Ride
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-gray-300 dark:border-slate-600">
                <p className="text-gray-500">No requests at the moment. Searching...</p>
              </div>
            )}
          </div>

          {/* Sidebar Stats & Leaderboard */}
          <div className="space-y-6">
             <Card>
               <CardHeader><CardTitle>Today's Performance</CardTitle></CardHeader>
               <CardContent className="space-y-4">
                 <div className="flex justify-between items-center">
                   <span className="text-gray-600 dark:text-gray-400">Hours Online</span>
                   <span className="font-bold text-gray-900 dark:text-white">4h 12m</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-gray-600 dark:text-gray-400">Trips Completed</span>
                   <span className="font-bold text-gray-900 dark:text-white">8</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-gray-600 dark:text-gray-400">Acceptance Rate</span>
                   <span className="font-bold text-green-500">92%</span>
                 </div>
               </CardContent>
             </Card>
             
             {/* Leaderboard Component */}
             <Leaderboard />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-100 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700">
          <div className="bg-gray-200 dark:bg-slate-700 p-4 rounded-full mb-4">
            <Power size={48} className="text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">You are currently Offline</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md text-center mb-6">
            You won't receive any ride requests while offline. Switch your status to Online to start earning.
          </p>
          <Button onClick={handleToggleStatus} size="lg">Go Online Now</Button>
        </div>
      )}

      <OnlineChecklistModal 
        isOpen={showChecklist} 
        onClose={() => setShowChecklist(false)} 
        onConfirm={confirmOnline} 
      />
    </div>
  );
};
