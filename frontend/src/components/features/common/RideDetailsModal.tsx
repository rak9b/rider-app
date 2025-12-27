import React from 'react';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { MapPin, Calendar, Clock, CreditCard, Download, Share2 } from 'lucide-react';

interface RideDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  ride: any;
}

export const RideDetailsModal = ({ isOpen, onClose, ride }: RideDetailsModalProps) => {
  if (!ride) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ride Details">
      <div className="space-y-6">
        {/* Map Placeholder */}
        <div className="h-40 bg-gray-100 dark:bg-slate-800 rounded-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-122.4194,37.7749,12,0,0/600x300?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2xsN3F3OG0wMDc4MnB0Y2d4b3F4b3F4In0.example')] bg-cover bg-center opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xs font-bold text-gray-500 bg-white/80 px-2 py-1 rounded">Route Map Visualization</p>
          </div>
        </div>

        {/* Route Info */}
        <div className="space-y-4 relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-slate-700 -z-10" />
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-white dark:bg-slate-900 border-2 border-green-500 flex items-center justify-center z-10">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Pickup</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{ride.pickup || '123 Main St'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-white dark:bg-slate-900 border-2 border-red-500 flex items-center justify-center z-10">
              <MapPin size={12} className="text-red-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Destination</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{ride.destination || '456 Market Ave'}</p>
            </div>
          </div>
        </div>

        {/* Driver Info */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
          <img src={ride.driverImg || 'https://i.pravatar.cc/150'} alt="Driver" className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 dark:text-white">{ride.driver || 'John Doe'}</h4>
            <p className="text-xs text-gray-500">Tesla Model 3 • ABC-1234</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-gray-900 dark:text-white">${ride.fare}</p>
            <p className="text-xs text-gray-500">Paid by Card</p>
          </div>
        </div>

        {/* Meta Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 border border-gray-100 dark:border-slate-700 rounded-lg">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Calendar size={14} /> <span className="text-xs">Date</span>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{ride.date}</p>
          </div>
          <div className="p-3 border border-gray-100 dark:border-slate-700 rounded-lg">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Clock size={14} /> <span className="text-xs">Time</span>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{ride.time}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            <Download className="mr-2 h-4 w-4" /> Receipt
          </Button>
          <Button variant="outline" className="flex-1">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </div>
    </Modal>
  );
};
