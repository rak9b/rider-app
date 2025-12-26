import React, { useState } from 'react';
import { Bell, Check, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'Welcome to Velox!',
    message: 'Get 50% off your first ride with code VELOX50.',
    type: 'success',
    time: '2m ago',
    read: false,
  },
  {
    id: '2',
    title: 'System Update',
    message: 'We have updated our privacy policy.',
    type: 'info',
    time: '1h ago',
    read: true,
  },
  {
    id: '3',
    title: 'Driver Tip',
    message: 'Don\'t forget to rate your last driver.',
    type: 'warning',
    time: '2h ago',
    read: true,
  },
];

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-dark-surface rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllRead}
                    className="text-xs text-primary-500 hover:text-primary-600 font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className={cn(
                        "p-4 border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors relative group",
                        !notif.read && "bg-blue-50/50 dark:bg-blue-900/10"
                      )}
                    >
                      <div className="flex gap-3">
                        <div className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                          notif.type === 'success' && "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
                          notif.type === 'info' && "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                          notif.type === 'warning' && "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
                        )}>
                          {notif.type === 'success' && <Check size={14} />}
                          {notif.type === 'info' && <Info size={14} />}
                          {notif.type === 'warning' && <AlertCircle size={14} />}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">
                            {notif.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                            {notif.message}
                          </p>
                          <span className="text-[10px] text-gray-400 mt-2 block">{notif.time}</span>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
                          className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-all"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="mx-auto h-8 w-8 mb-2 opacity-20" />
                    <p className="text-sm">No notifications yet</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
