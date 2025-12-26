import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { driverFound, updateStatus, resetRide } from '../../../store/slices/rideSlice';
import { Card, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Phone, MessageCircle, Shield, MapPin, Navigation, Car, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { RatingModal } from '../common/RatingModal';
import { SplitFareModal } from './SplitFareModal';
import { CancellationModal } from '../common/CancellationModal';

export const ActiveRideCard = () => {
  const dispatch = useDispatch();
  const { status, driver, eta, progress, pickup, destination, fare } = useSelector((state: RootState) => state.ride);
  const [showRating, setShowRating] = useState(false);
  const [showSplitFare, setShowSplitFare] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  // Simulate Ride Progress
  useEffect(() => {
    if (status === 'searching') {
      const timer = setTimeout(() => dispatch(driverFound()), 3000);
      return () => clearTimeout(timer);
    }
    
    if (status === 'accepted') {
      const timer = setTimeout(() => {
        dispatch(updateStatus({ status: 'arriving', progress: 30, eta: 2 }));
      }, 4000);
      return () => clearTimeout(timer);
    }

    if (status === 'arriving') {
      const timer = setTimeout(() => {
        dispatch(updateStatus({ status: 'in-progress', progress: 50, eta: 15 }));
      }, 4000);
      return () => clearTimeout(timer);
    }

    if (status === 'in-progress') {
      const interval = setInterval(() => {
        if (progress < 100) {
          dispatch(updateStatus({ status: 'in-progress', progress: progress + 10, eta: Math.max(1, eta - 1) }));
        } else {
          dispatch(updateStatus({ status: 'completed', progress: 100, eta: 0 }));
          setShowRating(true);
          clearInterval(interval);
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [status, progress, dispatch, eta]);

  if (status === 'idle') return null;

  return (
    <>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-0 left-0 right-0 z-30 p-4 md:p-6 pointer-events-none"
      >
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <Card className="shadow-2xl border-t-4 border-primary-500 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
            <CardContent className="p-0">
              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-gray-100 dark:bg-slate-800">
                <motion.div 
                  className="h-full bg-primary-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="p-6">
                {/* Status Header */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      {status === 'searching' && <span className="animate-pulse">Finding your driver...</span>}
                      {status === 'accepted' && 'Driver Found!'}
                      {status === 'arriving' && 'Driver is arriving'}
                      {status === 'in-progress' && 'Heading to destination'}
                      {status === 'completed' && 'You have arrived!'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {status === 'searching' ? 'Connecting to nearby cars' : `${eta} mins away • Est. arrival ${new Date(Date.now() + eta * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}
                    </p>
                  </div>
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-2 rounded-full">
                    {status === 'searching' ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600" /> : <Navigation className="text-primary-600" />}
                  </div>
                </div>

                {/* Driver Info (if found) */}
                {driver && (
                  <div className="flex items-center gap-4 mb-6 bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                    <img src={driver.avatar} alt={driver.name} className="h-12 w-12 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 dark:text-white">{driver.name}</h4>
                      <div className="flex items-center text-xs text-gray-500 gap-2">
                        <span className="bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-slate-700 font-mono">{driver.plate}</span>
                        <span>• {driver.vehicle}</span>
                        <span className="text-yellow-500">★ {driver.rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="rounded-full w-10 h-10 p-0"><MessageCircle size={18} /></Button>
                      <Button size="sm" className="rounded-full w-10 h-10 p-0"><Phone size={18} /></Button>
                    </div>
                  </div>
                )}

                {/* Route Info */}
                <div className="space-y-3 relative">
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-slate-700 -z-10" />
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-white dark:bg-slate-900 border-2 border-green-500 flex items-center justify-center z-10">
                      <div className="h-2 w-2 bg-green-500 rounded-full" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{pickup}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-white dark:bg-slate-900 border-2 border-red-500 flex items-center justify-center z-10">
                      <MapPin size={12} className="text-red-500" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{destination}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  {status === 'completed' ? (
                    <Button className="w-full" onClick={() => { setShowRating(true); }}>
                      Complete Ride
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setShowSplitFare(true)}
                      >
                        <Share2 className="mr-2 h-4 w-4" /> Split Fare
                      </Button>
                      <Button 
                        variant="danger" 
                        className="flex-1"
                        onClick={() => setShowCancel(true)}
                      >
                        Cancel Ride
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <RatingModal 
        isOpen={showRating} 
        onClose={() => { 
          setShowRating(false); 
          dispatch(resetRide()); 
        }} 
        driverName={driver?.name || 'Driver'} 
      />
      
      <SplitFareModal
        isOpen={showSplitFare}
        onClose={() => setShowSplitFare(false)}
      />

      <CancellationModal
        isOpen={showCancel}
        onClose={() => setShowCancel(false)}
        onConfirm={() => dispatch(resetRide())}
      />
    </>
  );
};
