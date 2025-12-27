import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  LayoutDashboard,
  History,
  User,
  Settings,
  Car,
  Users,
  BarChart3,
  MapPin,
  Bell,
  FileText,
  AlertTriangle,
  Shield,
  Star
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const getLinks = () => {
    switch (user?.role) {
      case 'rider':
        return [
          { name: 'Book a Ride', path: '/dashboard/rider', icon: MapPin },
          { name: 'Ride History', path: '/dashboard/rider/history', icon: History },
          { name: 'Profile', path: '/dashboard/rider/profile', icon: User },
        ];
      case 'driver':
        return [
          { name: 'Dashboard', path: '/dashboard/driver', icon: LayoutDashboard },
          { name: 'Requests', path: '/dashboard/driver/requests', icon: Bell },
          { name: 'Earnings', path: '/dashboard/driver/earnings', icon: BarChart3 },
          { name: 'Documents', path: '/dashboard/driver/documents', icon: FileText },
          { name: 'History', path: '/dashboard/driver/history', icon: History },
          { name: 'Reviews', path: '/dashboard/driver/reviews', icon: Star },
          { name: 'Profile', path: '/dashboard/driver/profile', icon: User },
        ];
      case 'admin':
        return [
          { name: 'Overview', path: '/dashboard/admin', icon: LayoutDashboard },
          { name: 'Users', path: '/dashboard/admin/users', icon: Users },
          { name: 'Rides', path: '/dashboard/admin/rides', icon: Car },
          { name: 'Disputes', path: '/dashboard/admin/disputes', icon: AlertTriangle },
          { name: 'Analytics', path: '/dashboard/admin/analytics', icon: BarChart3 },
          { name: 'Settings', path: '/dashboard/admin/settings', icon: Settings },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="hidden lg:flex flex-col w-72 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-black/20 min-h-[calc(100vh-4rem)] transition-colors duration-300">
      <div className="flex-1 flex flex-col py-4">
        {/* User Profile Card */}
        <div className="px-2 mb-6">
          <div className="flex items-center p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer transition-colors group">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="ml-3 flex-1 overflow-hidden">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role} Account</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2 space-y-1">
          {getLinks().map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === `/dashboard/${user?.role}`}
              className={({ isActive }) =>
                cn(
                  'group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <link.icon
                    className={cn(
                      'mr-4 h-5 w-5 flex-shrink-0 transition-colors',
                      isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400'
                    )}
                    aria-hidden="true"
                  />
                  {link.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Premium Banner */}
        <div className="px-4 mt-auto mb-4">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-4 text-white relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} className="text-white" />
              <p className="text-xs font-bold text-white">Velox Premium</p>
            </div>
            <p className="text-xs text-white/90 mb-3 leading-relaxed">Unlock exclusive features and priority support.</p>
            <button className="text-xs bg-white text-primary-600 font-bold hover:bg-gray-50 transition-colors px-3 py-2 rounded-lg w-full text-center shadow-sm">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
