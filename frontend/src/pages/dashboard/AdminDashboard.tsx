import React from 'react';
import { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Users as UsersIcon, Car, DollarSign, Activity,
  TrendingUp, ArrowUpRight, Search, Filter,
  UserX, CheckCircle, ShieldAlert
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { AdminLiveMap } from '../../components/features/admin/AdminLiveMap';
import GlassCard from '../../components/ui/GlassCard';
import { useGetAdminAnalyticsQuery, useGetRidesQuery, useUpdateUserStatusMutation } from '../../store/api/apiSlice';
import toast from 'react-hot-toast';

export const AdminDashboard = () => {
  const { data: analytics, isLoading: analyticsLoading } = useGetAdminAnalyticsQuery(undefined);
  const { data: rides } = useGetRidesQuery({ limit: 5 });
  const [updateStatus] = useUpdateUserStatusMutation();

  const handleBlockUser = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    try {
      await updateStatus({ id: userId, status: newStatus }).unwrap();
      toast.success(`User successfully ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update user status');
    }
  };

  const stats = [
    { title: 'Total Revenue', value: analytics?.stats?.totalRevenue ? `$${analytics.stats.totalRevenue.toLocaleString()}` : '$0', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
    { title: 'Active Drivers', value: analytics?.stats?.totalDrivers || '0', icon: Car, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Total Riders', value: analytics?.stats?.totalRiders || '0', icon: UsersIcon, color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { title: 'Total Rides', value: analytics?.stats?.totalRides || '0', icon: Activity, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Admin Command Center</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium font-inter">Monitor system health and perform administrative actions.</p>
        </div>
        <div className="flex gap-3">
          <Badge variant="success" className="h-10 px-4 rounded-xl flex items-center gap-2 font-bold bg-green-500/10 text-green-600 border-green-500/20">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            SYSTEM OPTIMAL
          </Badge>
          <Button variant="outline" className="h-10 rounded-xl border-slate-200 dark:border-slate-800">
            <Filter size={18} className="mr-2" /> Global Filter
          </Button>
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <GlassCard key={i} className="p-6 border-slate-200/50 dark:border-slate-800/50">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.title}</p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none">
                  {analyticsLoading ? '...' : stat.value}
                </h3>
              </div>
              <div className={`p-3 rounded-2xl ${stat.bg}`}>
                <stat.icon className={stat.color} size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-[10px] font-bold text-green-600 bg-green-400/10 w-fit px-2 py-0.5 rounded-full">
              <TrendingUp size={10} className="mr-1" /> 12% FROM LAST MONTH
            </div>
          </GlassCard>
        ))}
      </div>

      {/* 3. Live Map */}
      <GlassCard className="overflow-hidden border-0">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h2 className="font-bold text-lg flex items-center gap-2"><MapPin className="text-primary-500" /> Fleet Tracking</h2>
          <Button size="sm" variant="ghost" className="text-primary-500 hover:bg-primary-500/10">Fullscreen Mode</Button>
        </div>
        <div className="h-[400px]">
          <AdminLiveMap />
        </div>
      </GlassCard>

      {/* 4. Analytics & Recent Rides */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Revenue Analytics */}
        <GlassCard className="lg:col-span-2 p-6">
          <CardHeader className="p-0 mb-8">
            <CardTitle className="text-xl">Revenue Growth</CardTitle>
          </CardHeader>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics?.revenueStats || []}>
                <defs>
                  <linearGradient id="colorAdminRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorAdminRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Global Security Board */}
        <GlassCard className="p-6">
          <CardTitle className="mb-6 text-lg flex items-center gap-2"><ShieldAlert className="text-red-500" /> Security Log</CardTitle>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="h-10 w-10 rounded-full flex-shrink-0 bg-red-500/10 flex items-center justify-center">
                  <UserX size={18} className="text-red-500" />
                </div>
                <div>
                  <p className="text-xs font-bold dark:text-slate-200">Account Flagged</p>
                  <p className="text-[10px] text-slate-500">Unusual login attempt from New York, USA</p>
                  <p className="text-[9px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">2 MINS AGO</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full h-10 text-xs font-bold border-slate-200 dark:border-slate-800 mt-2">View Full Security Audit</Button>
          </div>
        </GlassCard>
      </div>

      {/* 5. Recent Rides Oversight */}
      <GlassCard className="overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <CardTitle className="text-xl">System Ride Log</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input placeholder="Search ride ID..." className="pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 ring-primary-500/20" />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs font-bold text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/30">
              <tr>
                <th className="px-6 py-4">Ride ID</th>
                <th className="px-6 py-4">Rider</th>
                <th className="px-6 py-4">Driver</th>
                <th className="px-6 py-4">Fare</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rides?.items?.map((ride: any) => (
                <tr key={ride._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-primary-600 font-bold uppercase">{ride._id.slice(-6)}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold">{ride.rider?.name}</div>
                    <div className="text-[10px] text-slate-500">{ride.rider?.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    {ride.driver ? (
                      <>
                        <div className="font-bold">{ride.driver.name}</div>
                        <div className="text-[10px] text-slate-500">{ride.driver.vehicleDetails?.plateNumber}</div>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400">UNASSIGNED</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600">${ride.fare}</td>
                  <td className="px-6 py-4">
                    <Badge variant={ride.status === 'COMPLETED' ? 'success' : 'secondary'} className="rounded-lg">
                      {ride.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      <ArrowUpRight size={18} className="text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
