import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Users, Car, DollarSign, Activity, TrendingUp, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { faker } from '@faker-js/faker';
import { AdminLiveMap } from '../../components/features/admin/AdminLiveMap';

// Mock Data for Analytics
const analyticsData = Array.from({ length: 12 }).map((_, i) => ({
  name: new Date(0, i).toLocaleString('default', { month: 'short' }),
  revenue: faker.number.int({ min: 10000, max: 50000 }),
  rides: faker.number.int({ min: 500, max: 2000 }),
}));

const users = Array.from({ length: 5 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(['rider', 'driver']),
  status: 'active',
  joined: faker.date.past().toLocaleDateString(),
}));

export const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Overview</h1>
          <p className="text-gray-500 dark:text-gray-400">System performance and user metrics.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="success" className="px-3 py-1 text-sm">System Healthy</Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: '$452,340', icon: DollarSign, color: 'bg-green-500', trend: '+12.5%' },
          { title: 'Active Drivers', value: '1,203', icon: Car, color: 'bg-blue-500', trend: '+5.2%' },
          { title: 'Total Users', value: '45,231', icon: Users, color: 'bg-purple-500', trend: '+8.1%' },
          { title: 'Active Rides', value: '342', icon: Activity, color: 'bg-orange-500', trend: '+2.4%' },
        ].map((stat, i) => (
          <Card key={i} className="border-0 shadow-lg dark:shadow-black/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                  <div className="flex items-center mt-2 text-green-500 text-xs font-bold">
                    <TrendingUp size={12} className="mr-1" /> {stat.trend}
                  </div>
                </div>
                <div className={`p-3 rounded-xl text-white shadow-lg ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Map Section - NEW */}
      <div className="grid grid-cols-1">
        <AdminLiveMap />
      </div>

      {/* Analytics Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg dark:shadow-black/20">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} stroke="#94a3b8" />
                <YAxis axisLine={false} tickLine={false} fontSize={12} stroke="#94a3b8" tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg dark:shadow-black/20">
          <CardHeader>
            <CardTitle>Ride Volume</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} stroke="#94a3b8" />
                <YAxis axisLine={false} tickLine={false} fontSize={12} stroke="#94a3b8" />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="rides" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users Table */}
      <Card className="border-0 shadow-lg dark:shadow-black/20 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-gray-50/50 dark:bg-slate-800/50">
          <CardTitle>Recent Registrations</CardTitle>
          <Button variant="outline" size="sm" className="text-xs">View All</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {users.map((user) => (
                  <tr key={user.id} className="bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold shadow-sm">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'driver' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-green-600 dark:text-green-400 font-medium text-xs">Active</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{user.joined}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-primary-500 transition-colors">
                        <ArrowUpRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
