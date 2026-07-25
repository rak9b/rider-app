import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { SOSButton } from '../features/common/SOSButton';
import { ChatWidget } from '../features/common/ChatWidget';
import { AIChatbot } from '../features/common/AIChatbot';

export const DashboardLayout = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Handle Blocked/Suspended Users
  if (user?.status === 'blocked' || user?.status === 'suspended') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-gray-100 dark:border-white/5">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
            <span className="text-3xl">🚫</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Account Suspended</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your account has been {user.status}. Please contact support to resolve this issue.
          </p>
          <a href="mailto:support@velox.com" className="text-primary-500 hover:text-primary-600 font-medium">
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <div className="flex max-w-[1600px] w-full mx-auto px-2 sm:px-4 lg:px-6">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>

      {/* Floating Actions */}
      {(user?.role === 'rider' || user?.role === 'driver') && (
        <>
          <SOSButton />
          <ChatWidget />
          <AIChatbot />
        </>
      )}
    </div>
  );
};
