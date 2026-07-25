import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Search, MoreVertical, User, Car, Ban, CheckCircle, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: 'rider' | 'driver' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  rating: number;
  joined: string;
  trips: number;
  avatar: string;
}

const INITIAL_USERS: PlatformUser[] = [
  {
    id: '507f1f77bcf86cd799439011',
    name: 'John Rider',
    email: 'rider@riderapp.com',
    role: 'rider',
    status: 'active',
    rating: 4.8,
    joined: '2026-01-15',
    trips: 42,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '507f1f77bcf86cd799439012',
    name: 'Mike Driver',
    email: 'driver@riderapp.com',
    role: 'driver',
    status: 'active',
    rating: 4.9,
    joined: '2026-02-01',
    trips: 156,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '507f1f77bcf86cd799439013',
    name: 'Admin User',
    email: 'admin@riderapp.com',
    role: 'admin',
    status: 'active',
    rating: 5.0,
    joined: '2025-11-10',
    trips: 0,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '507f1f77bcf86cd799439014',
    name: 'Sarah Rider',
    email: 'sarah.rider@riderapp.com',
    role: 'rider',
    status: 'active',
    rating: 4.7,
    joined: '2026-03-12',
    trips: 18,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '507f1f77bcf86cd799439015',
    name: 'Tom Driver',
    email: 'tom.driver@riderapp.com',
    role: 'driver',
    status: 'suspended',
    rating: 4.2,
    joined: '2026-04-05',
    trips: 89,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  },
];

export const AdminUsers = () => {
  const [users, setUsers] = useState<PlatformUser[]>(INITIAL_USERS);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'rider' | 'driver'>('rider');

  const handleAction = (id: string, action: string) => {
    toast.success(`User ${action} successfully`);
    if (action === 'suspended') {
      setUsers(users.map(u => u.id === id ? { ...u, status: 'suspended' } : u));
    } else if (action === 'activated') {
      setUsers(users.map(u => u.id === id ? { ...u, status: 'active' } : u));
    }
  };

  // BUG-021: Functional Add User handler
  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      toast.error('Please provide both name and email');
      return;
    }
    const newUser: PlatformUser = {
      id: `user-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      status: 'active',
      rating: 5.0,
      joined: new Date().toISOString().split('T')[0],
      trips: 0,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    };
    setUsers([newUser, ...users]);
    toast.success(`User ${newUserName} created successfully!`);
    setNewUserName('');
    setNewUserEmail('');
    setIsAddUserOpen(false);
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
          <Button onClick={() => setIsAddUserOpen(true)} className="flex items-center gap-2">
            <Plus size={18} /> Add User
          </Button>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl max-w-md w-full border border-gray-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add New User</h3>
            <form onSubmit={handleAddUserSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 text-gray-900 dark:text-white border-gray-300 dark:border-slate-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 text-gray-900 dark:text-white border-gray-300 dark:border-slate-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Role</label>
                <select 
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 text-gray-900 dark:text-white border-gray-300 dark:border-slate-700"
                >
                  <option value="rider">Rider</option>
                  <option value="driver">Driver</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
                <Button type="submit">Create User</Button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                        <img src={user.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
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
