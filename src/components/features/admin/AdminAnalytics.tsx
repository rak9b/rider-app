import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Clock, Map } from 'lucide-react';

const data = [
  { name: 'Mon', rides: 400, revenue: 2400 },
  { name: 'Tue', rides: 300, revenue: 1398 },
  { name: 'Wed', rides: 200, revenue: 9800 },
  { name: 'Thu', rides: 278, revenue: 3908 },
  { name: 'Fri', rides: 189, revenue: 4800 },
  { name: 'Sat', rides: 239, revenue: 3800 },
  { name: 'Sun', rides: 349, revenue: 4300 },
];

const pieData = [
  { name: 'Completed', value: 400, color: '#10B981' },
  { name: 'Cancelled', value: 50, color: '#EF4444' },
  { name: 'No Show', value: 30, color: '#F59E0B' },
];

export const AdminAnalytics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Advanced Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400">Deep dive into platform performance.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Avg. Wait Time', value: '3.2m', icon: Clock, color: 'text-blue-500' },
          { label: 'Active Regions', value: '12', icon: Map, color: 'text-green-500' },
          { label: 'New Users', value: '+124', icon: Users, color: 'text-purple-500' },
          { label: 'Growth Rate', value: '18%', icon: TrendingUp, color: 'text-orange-500' },
        ].map((kpi, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{kpi.label}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{kpi.value}</h3>
              </div>
              <div className={`p-3 rounded-full bg-gray-50 dark:bg-slate-800 ${kpi.color}`}>
                <kpi.icon size={24} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue vs Rides</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRides" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="rides" stroke="#82ca9d" fillOpacity={1} fill="url(#colorRides)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Ride Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 w-full text-center text-xs mt-4">
              {pieData.map((entry) => (
                <div key={entry.name}>
                  <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: entry.color }} />
                  <span className="text-gray-500">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
