import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Search, Filter, MoreVertical, Shield, User, Car, Ban, CheckCircle } from 'lucide-react';
import { faker } from '@faker-js/faker';
import toast from 'react-hot-toast';

const generateUsers = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['rider', 'driver']),
    status: faker.helpers.arrayElement(['active', 'suspended', 'pending']),
    rating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
    joined: faker.date.past().toLocaleDateString(),
    trips: faker.number.int({ min: 0, max: 500 }),
    avatar: faker.image.avatar(),
  }));
};

export const AdminUsers = () => {
  const [users, setUsers] = useState(generateUsers(15));
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const handleAction = (id: string, action: string) => {
    toast.success(`User ${action} successfully`);
    if (action === 'suspended') {
      setUsers(users.map(u => u.id === id ? { ...u, status: 'suspended' } : u));
    } else if (action === 'activated') {
      setUsers(users.map(u => u.id === id ? { ...u, status: 'active' } : u));
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                          user.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || user.role === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage riders, drivers, and permissions.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.success('Exporting CSV...')}>Export CSV</Button>
          <Button>Add User</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row gap-4 justify-between pb-6">
          <div className="flex gap-2">
            <Button 
              variant={filter === 'all' ? 'primary' : 'ghost'} 
              onClick={() => setFilter('all')}
              size="sm"
            >
              All Users
            </Button>
            <Button 
              variant={filter === 'rider' ? 'primary' : 'ghost'} 
              onClick={() => setFilter('rider')}
              size="sm"
            >
              Riders
            </Button>
            <Button 
              variant={filter === 'driver' ? 'primary' : 'ghost'} 
              onClick={() => setFilter('driver')}
              size="sm"
            >
              Drivers
            </Button>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-slate-800 text-xs uppercase text-gray-500 font-semibold">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Trips</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt="" className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {user.role === 'driver' ? <Car size={16} className="text-blue-500" /> : <User size={16} className="text-purple-500" />}
                        <span className="capitalize">{user.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={
                        user.status === 'active' ? 'success' : 
                        user.status === 'suspended' ? 'danger' : 'warning'
                      }>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="font-bold">{user.rating}</span>
                        <span className="text-yellow-400">★</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{user.trips}</td>
                    <td className="px-6 py-4 text-gray-500">{user.joined}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {user.status === 'active' ? (
                          <button 
                            onClick={() => handleAction(user.id, 'suspended')}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Suspend User"
                          >
                            <Ban size={18} />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleAction(user.id, 'activated')}
                            className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title="Activate User"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                        <button className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
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
