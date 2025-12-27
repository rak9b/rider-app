import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Users as UsersIcon, Car, DollarSign, Activity,
  TrendingUp, ArrowUpRight, Search, Filter, Shield,
  UserX, CheckCircle, ShieldAlert, Zap, Eye,
  BarChart3, PieChart, Globe, MapPin, AlertTriangle,
  Clock, ChevronRight, Sparkles
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RePieChart, Pie, Cell
} from 'recharts';
import { AdminLiveMap } from '../../components/features/admin/AdminLiveMap';
import GlassCard from '../../components/ui/GlassCard';
import { useGetAdminAnalyticsQuery, useGetRidesQuery, useUpdateUserStatusMutation } from '../../store/api/apiSlice';
import toast from 'react-hot-toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
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

export const AdminDashboard = () => {
  const { data: analytics, isLoading: analyticsLoading } = useGetAdminAnalyticsQuery(undefined);
  const { data: rides } = useGetRidesQuery({ limit: 10 });
  const [updateStatus] = useUpdateUserStatusMutation();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const handleBlockUser = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    try {
      await updateStatus({ id: userId, status: newStatus }).unwrap();
      toast.success(`User successfully ${newStatus}`, {
        icon: newStatus === 'active' ? '✅' : '🚫',
      });
    } catch (err) {
      toast.error('Failed to update user status');
    }
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: analytics?.stats?.totalRevenue ? `$${(analytics.stats.totalRevenue / 1000).toFixed(1)}K` : '$0',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Active Drivers',
      value: analytics?.stats?.totalDrivers || '0',
      change: '+8.2%',
      icon: Car,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Total Riders',
      value: analytics?.stats?.totalRiders || '0',
      change: '+15.3%',
      icon: UsersIcon,
      color: 'text-violet-500',
      bg: 'bg-violet-500/10',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      title: 'Completed Rides',
      value: analytics?.stats?.completedRides || '0',
      change: '+23.1%',
      icon: Activity,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
      gradient: 'from-orange-500 to-red-600'
    },
  ];

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-10"
    >
      {/* Premium Header with Gradient */}
      <motion.div variants={itemVariants}>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-10 text-white shadow-2xl">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-telegram-pattern" />
          </div>

          {/* Animated Orbs */}
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md">
                    <Shield size={28} className="text-primary-400" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30"
                  >
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-bold text-green-300">SYSTEM OPTIMAL</span>
                  </motion.div>
                </div>

                <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                  Admin Command Center
                </h1>

                <p className="text-white/80 font-medium text-lg">
                  Monitor, manage, and optimize your platform in real-time
                </p>

                {/* Live Stats Row */}
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <Activity size={16} className="text-green-400" />
                    <span className="text-sm font-bold">
                      <span className="text-green-400">{analytics?.stats?.totalRiders || 0}</span> Active Users
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car size={16} className="text-blue-400" />
                    <span className="text-sm font-bold">
                      <span className="text-blue-400">{analytics?.stats?.totalDrivers || 0}</span> Online Drivers
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-yellow-400" />
                    <span className="text-sm font-bold">
                      <span className="text-yellow-400">12</span> Active Rides
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button className="bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-md rounded-xl h-11 px-6">
                  <Eye className="mr-2" size={18} />
                  Generate Report
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-md rounded-xl h-11 px-6">
                  <Filter size={18} className="mr-2" />
                  Global Filter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <GlassCard className="p-6 border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden group">
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      {stat.title}
                    </p>
                    <motion.h3
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-none"
                    >
                      {analyticsLoading ? (
                        <div className="h-10 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                      ) : (
                        stat.value
                      )}
                    </motion.h3>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`p-3 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className={stat.color} size={28} />
                  </motion.div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs font-bold text-green-600 bg-green-500/10 px-3 py-1.5 rounded-full">
                    <TrendingUp size={12} className="mr-1" />
                    {stat.change}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">vs last month</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Live Fleet Map */}
      <motion.div variants={itemVariants}>
        <GlassCard className="overflow-hidden border-slate-200/50 dark:border-slate-800/50">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-gradient-to-r from-slate-50/50 to-white/50 dark:from-slate-800/50 dark:to-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary-500/10">
                <Globe className="text-primary-600" size={20} />
              </div>
              <div>
                <h2 className="font-bold text-lg text-slate-900 dark:text-white">
                  Live Fleet Tracking
                </h2>
                <p className="text-xs text-slate-500">Real-time driver locations and activity</p>
              </div>
            </div>
            <Button size="sm" variant="ghost" className="text-primary-500 hover:bg-primary-500/10 rounded-xl">
              <Eye size={16} className="mr-2" />
              Fullscreen
            </Button>
          </div>
          <div className="h-[450px]">
            <AdminLiveMap />
          </div>
        </GlassCard>
      </motion.div>

      {/* Analytics & Security */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Revenue Analytics */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-6 md:p-8 border-slate-200/50 dark:border-slate-800/50">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-green-500/10">
                  <BarChart3 className="text-green-600" size={20} />
                </div>
                <div>
                  <CardTitle className="text-xl">Revenue Growth</CardTitle>
                  <p className="text-xs text-slate-500">Monthly performance overview</p>
                </div>
              </div>
              <div className="flex gap-2">
                {['week', 'month', 'year'].map(period => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedPeriod === period
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics?.revenueStats || []}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" opacity={0.1} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: 'none',
                      borderRadius: '16px',
                      color: '#fff',
                      padding: '12px 16px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#10B981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Security Log */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-6 border-slate-200/50 dark:border-slate-800/50 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-red-500/10">
                <ShieldAlert className="text-red-600" size={20} />
              </div>
              <div>
                <CardTitle className="text-lg">Security Alerts</CardTitle>
                <p className="text-xs text-slate-500">Recent activity log</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { type: 'warning', msg: 'Unusual login attempt', location: 'New York, USA', time: '2 mins ago' },
                { type: 'info', msg: 'Account verified', location: 'San Francisco, CA', time: '15 mins ago' },
                { type: 'success', msg: 'Password updated', location: 'Los Angeles, CA', time: '1 hour ago' },
                { type: 'warning', msg: 'Multiple failed logins', location: 'Chicago, IL', time: '2 hours ago' }
              ].map((alert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 cursor-pointer group"
                >
                  <div className={`h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center ${alert.type === 'warning' ? 'bg-red-500/10' :
                      alert.type === 'success' ? 'bg-green-500/10' : 'bg-blue-500/10'
                    }`}>
                    {alert.type === 'warning' ? <AlertTriangle size={18} className="text-red-500" /> :
                      alert.type === 'success' ? <CheckCircle size={18} className="text-green-500" /> :
                        <ShieldAlert size={18} className="text-blue-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold dark:text-slate-200 truncate">{alert.msg}</p>
                    <p className="text-[10px] text-slate-500 truncate">{alert.location}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock size={10} className="text-slate-400" />
                      <p className="text-[9px] text-slate-400 uppercase font-bold">{alert.time}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full h-10 text-xs font-bold border-slate-200 dark:border-slate-800 mt-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              View Full Security Audit
              <ChevronRight size={14} className="ml-2" />
            </Button>
          </GlassCard>
        </motion.div>
      </div>

      {/* Recent Rides Table */}
      <motion.div variants={itemVariants}>
        <GlassCard className="overflow-hidden border-slate-200/50 dark:border-slate-800/50">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-slate-50/50 to-white/50 dark:from-slate-800/50 dark:to-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-violet-500/10">
                <Activity className="text-violet-600" size={20} />
              </div>
              <div>
                <CardTitle className="text-xl">System Ride Log</CardTitle>
                <p className="text-xs text-slate-500">Recent platform activity</p>
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  placeholder="Search ride ID..."
                  className="pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 ring-primary-500/20 w-full md:w-64 font-medium"
                />
              </div>
              <Button variant="outline" className="rounded-xl border-slate-200 dark:border-slate-700">
                <Filter size={18} />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs font-bold text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/30">
                <tr>
                  <th className="px-6 py-4">Ride ID</th>
                  <th className="px-6 py-4">Rider</th>
                  <th className="px-6 py-4">Driver</th>
                  <th className="px-6 py-4">Route</th>
                  <th className="px-6 py-4">Fare</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <AnimatePresence>
                  {(rides?.items || []).map((ride: any, index: number) => (
                    <motion.tr
                      key={ride._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ backgroundColor: 'rgba(100, 116, 139, 0.05)' }}
                      className="transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 font-mono text-xs text-primary-600 font-bold uppercase">
                        #{ride._id.slice(-6)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs">
                            {ride.rider?.name?.charAt(0) || 'R'}
                          </div>
                          <div>
                            <div className="font-bold text-sm">{ride.rider?.name || 'Unknown'}</div>
                            <div className="text-[10px] text-slate-500">{ride.rider?.email || '—'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {ride.driver ? (
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-xs">
                              {ride.driver.name?.charAt(0) || 'D'}
                            </div>
                            <div>
                              <div className="font-bold text-sm">{ride.driver.name}</div>
                              <div className="text-[10px] text-slate-500">{ride.driver.vehicleDetails?.plateNumber || '—'}</div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium">UNASSIGNED</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <p className="text-xs font-bold truncate">Downtown → Airport</p>
                          <p className="text-[10px] text-slate-500">12.5 km • 25 min</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-green-600 text-base">${ride.fare || '0.00'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={ride.status === 'COMPLETED' ? 'success' : ride.status === 'ACTIVE' ? 'default' : 'secondary'}
                          className="rounded-lg font-bold"
                        >
                          {ride.status || 'PENDING'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors group"
                        >
                          <ArrowUpRight size={18} className="text-slate-400 group-hover:text-primary-600 transition-colors" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {(!rides?.items || rides.items.length === 0) && (
            <div className="text-center py-16">
              <Activity size={48} className="text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No rides found</p>
              <p className="text-sm text-slate-400 mt-1">Recent ride activity will appear here</p>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};
