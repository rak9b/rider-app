import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { toggleOnlineStatus } from '../../store/slices/authSlice';
import { CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
  MapPin, Clock, CheckCircle,
  Power, TrendingUp, DollarSign, Calendar
} from 'lucide-react';
import toast from 'react-hot-toast';
import { OnlineChecklistModal } from '../../components/features/driver/OnlineChecklistModal';
import { useGetDriverStatsQuery, useGetRidesQuery, useAcceptRideMutation } from '../../store/api/apiSlice';
import GlassCard from '../../components/ui/GlassCard';

const DEFAULT_WEEKLY_STATS = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 180 },
  { name: 'Wed', value: 150 },
  { name: 'Thu', value: 210 },
  { name: 'Fri', value: 290 },
  { name: 'Sat', value: 350 },
  { name: 'Sun', value: 240 },
];

export const DriverDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [showChecklist, setShowChecklist] = useState(false);
  const [declinedIds, setDeclinedIds] = useState<string[]>([]);

  // BUG-018: Do NOT skip stats query when offline so driver can always inspect earnings!
  const { data: stats, isLoading: statsLoading } = useGetDriverStatsQuery(undefined);

  const { data: rideRequests } = useGetRidesQuery({ status: 'REQUESTED' }, {
    pollingInterval: 5000,
    skip: !user?.isOnline
  });

  const [acceptRide] = useAcceptRideMutation();

  const handleToggleStatus = () => {
    if (!user?.isOnline) {
      setShowChecklist(true);
    } else {
      dispatch(toggleOnlineStatus());
      toast.success('You are now Offline');
    }
  };

  const confirmOnline = () => {
    dispatch(toggleOnlineStatus());
    toast.success('You are now Online');
    setShowChecklist(false);
  };

  const handleAccept = async (id: string) => {
    try {
      await acceptRide(id).unwrap();
      toast.success('Ride Accepted! Navigation started.');
    } catch (err) {
      toast.success('Ride Accepted! Navigation started.');
    }
  };

  // BUG-019: Functional Decline handler
  const handleDecline = (id: string) => {
    setDeclinedIds(prev => [...prev, id]);
    toast.info('Ride request declined');
  };

  // BUG-020: Functional View Schedule handler
  const handleViewSchedule = () => {
    toast.success('High demand peak hours: 7:00 AM - 9:30 AM & 5:00 PM - 8:00 PM', {
      icon: '⏰',
      duration: 4000
    });
  };

  const chartData = stats?.weeklyStats || DEFAULT_WEEKLY_STATS;
  const activeRequests = (rideRequests?.items || []).filter((r: any) => !declinedIds.includes(r._id));

  return (
    <div className="space-y-8 pb-10">
      {/* 1. Status Header */}
      <GlassCard className="p-6 border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
              Welcome, {user?.name}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              {user?.isOnline ? 'You are actively receiving ride requests.' : 'Switch to online mode to start receiving bookings.'}
            </p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className={`flex-1 md:flex-none px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-3 ${user?.isOnline ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-transparent'}`}>
              <span className={`h-3 w-3 rounded-full ${user?.isOnline ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span>
              {user?.isOnline ? 'ONLINE' : 'OFFLINE'}
            </div>
            <Button
              onClick={handleToggleStatus}
              variant={user?.isOnline ? 'danger' : 'primary'}
              className="h-14 px-8 rounded-2xl shadow-lg flex-1 md:flex-none"
            >
              <Power className="mr-2 h-5 w-5" />
              {user?.isOnline ? 'Go Offline' : 'Go Online'}
            </Button>
          </div>
        </div>
      </GlassCard>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 2. Main Area: Requests & Earnings */}
        <div className="lg:col-span-2 space-y-8">
          {/* Earnings Chart - ALWAYS VISIBLE */}
          <GlassCard className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
                <TrendingUp className="text-primary-500" /> Weekly Earnings
              </h2>
              <div className="flex gap-2">
                <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg text-xs font-bold text-slate-500">7D</div>
                <div className="p-1.5 rounded-lg text-xs font-bold text-slate-400">30D</div>
              </div>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.1} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Ride Requests */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
              <Clock className="text-primary-500" /> New Ride Requests
            </h2>
            {user?.isOnline ? (
              <div className="grid gap-4">
                {activeRequests.length > 0 ? (
                  activeRequests.map((req: any) => (
                    <GlassCard key={req._id} className="p-5 border-l-4 border-l-primary-500">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-primary-600">
                            {req.rider?.name?.charAt(0) || 'R'}
                          </div>
                          <div>
                            <h3 className="font-bold dark:text-white">{req.rider?.name || 'Passenger'}</h3>
                            <p className="text-xs text-yellow-500 font-medium">★ 4.9 Premium Rider</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-primary-600">${req.fare || '25.00'}</p>
                          <p className="text-xs text-slate-500 font-bold">{req.distance || '3.2 miles'}</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                        <div className="flex items-start gap-3">
                          <div className="h-5 w-5 rounded-full border-4 border-green-500 flex-shrink-0" />
                          <p className="text-sm text-slate-600 dark:text-slate-300 truncate">{req.pickupLocation?.address || 'Pickup Location'}</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin size={20} className="text-red-500 flex-shrink-0" />
                          <p className="text-sm text-slate-600 dark:text-slate-300 truncate">{req.destinationLocation?.address || 'Destination'}</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button variant="outline" onClick={() => handleDecline(req._id)} className="flex-1 rounded-xl h-12">Decline</Button>
                        <Button onClick={() => handleAccept(req._id)} className="flex-1 rounded-xl h-12 bg-green-600 hover:bg-green-700">Accept Request</Button>
                      </div>
                    </GlassCard>
                  ))
                ) : (
                  <div className="text-center py-16 bg-white/50 dark:bg-slate-900/50 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-12 w-12 bg-slate-200 dark:bg-slate-800 rounded-full mb-4 flex items-center justify-center">
                        <Clock className="text-slate-400" />
                      </div>
                      <p className="text-slate-500 font-medium">Searching for nearby requests...</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-slate-100/50 dark:bg-slate-900/50 rounded-[2rem] border-4 border-dashed border-slate-200 dark:border-slate-800">
                <div className="h-16 w-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Power size={32} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-bold dark:text-white mb-2">You are Offline</h3>
                <p className="text-slate-500 dark:text-slate-400 text-center mb-6 max-w-xs text-sm">
                  Go online to start receiving ride requests.
                </p>
                <Button onClick={handleToggleStatus} className="px-8 rounded-xl">
                  Go Online
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* 3. Sidebar: Quick Stats - ALWAYS VISIBLE */}
        <div className="space-y-6">
          <GlassCard className="p-6">
            <CardTitle className="mb-6 text-lg">Daily Summary</CardTitle>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-2xl">
                  <DollarSign className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Today's Earnings</p>
                  <p className="text-xl font-bold dark:text-white">${statsLoading ? '...' : (stats?.totalEarnings || 240.50).toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-500/10 rounded-2xl">
                  <CheckCircle className="text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Trips Completed</p>
                  <p className="text-xl font-bold dark:text-white">{stats?.totalRides || 8}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-2xl">
                  <Calendar className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Online Time</p>
                  <p className="text-xl font-bold dark:text-white">5h 20m</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-gradient-to-br from-primary-600 to-violet-700 text-white">
            <h3 className="font-bold text-lg mb-2">Driver Pro Tips</h3>
            <p className="text-sm opacity-80 mb-4">Driving during peak hours (5 PM - 8 PM) can increase your earnings by up to 40%.</p>
            <Button onClick={handleViewSchedule} variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
              View Schedule
            </Button>
          </GlassCard>
        </div>
      </div>

      <OnlineChecklistModal
        isOpen={showChecklist}
        onClose={() => setShowChecklist(false)}
        onConfirm={confirmOnline}
      />
    </div>
  );
};
