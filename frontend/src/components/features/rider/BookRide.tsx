import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { startSearch } from '../../../store/slices/rideSlice';
import { MapPin, Navigation, Banknote, CreditCard, Wallet, Clock, Tag, SlidersHorizontal, Package, Car, User, Phone } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { PaymentModal } from '../payment/PaymentModal';
import { ScheduleRideModal } from './ScheduleRideModal';
import { RidePreferences } from './RidePreferences';
import { useGetRideEstimateMutation } from '../../../store/api/apiSlice';
import { SavedPlaces } from './SavedPlaces';
import toast from 'react-hot-toast';
import { cn } from '../../../lib/utils';

type ServiceType = 'ride' | 'package';

export const BookRide = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [getEstimate, { isLoading: isCalculating, data: estimateData }] = useGetRideEstimateMutation();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [serviceType, setServiceType] = useState<ServiceType>('ride');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
  const dispatch = useDispatch();
  
  const pickup = watch('pickup');
  const destination = watch('destination');
  const paymentMethod = watch('payment');

  // Trigger estimate when fields are filled
  React.useEffect(() => {
    if (pickup && destination && pickup.length > 3 && destination.length > 3) {
      const timer = setTimeout(() => {
        getEstimate({ pickup, destination });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [pickup, destination, getEstimate]);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'VELOX50') {
      setDiscount(0.5); // 50% discount
      toast.success('Promo code applied! 50% off.');
    } else {
      setDiscount(0);
      toast.error('Invalid promo code');
    }
  };

  const calculateFinalFare = () => {
    if (!estimateData) return '0.00';
    const baseFare = parseFloat(estimateData.fare);
    // Packages might be slightly more expensive
    const multiplier = serviceType === 'package' ? 1.2 : 1.0;
    const final = (baseFare * multiplier) * (1 - discount);
    return final.toFixed(2);
  };

  const handleBooking = (data: any) => {
    dispatch(startSearch({ 
      pickup: data.pickup, 
      destination: data.destination, 
      fare: calculateFinalFare() 
    }));
    const msg = serviceType === 'package' ? 'Searching for delivery partner...' : 'Looking for nearby drivers...';
    toast.success(msg);
  };

  const onSubmit = (data: any) => {
    if (data.payment === 'card') {
      setIsPaymentOpen(true);
    } else {
      handleBooking(data);
    }
  };

  const handleSavedPlaceSelect = (address: string) => {
    setValue('destination', address);
  };

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-1 space-y-6">
          <SavedPlaces onSelect={handleSavedPlaceSelect} />
          
          <Card className="h-full border-0 shadow-xl dark:shadow-black/20 overflow-visible">
            {/* Service Type Toggle */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 p-1 rounded-full shadow-lg border border-gray-100 dark:border-slate-700 flex gap-1 z-10">
              <button
                onClick={() => setServiceType('ride')}
                className={cn(
                  "flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all",
                  serviceType === 'ride' 
                    ? "bg-primary-500 text-white shadow-md" 
                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"
                )}
              >
                <Car size={16} /> Ride
              </button>
              <button
                onClick={() => setServiceType('package')}
                className={cn(
                  "flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all",
                  serviceType === 'package' 
                    ? "bg-primary-500 text-white shadow-md" 
                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"
                )}
              >
                <Package size={16} /> Send
              </button>
            </div>

            <CardHeader className="bg-primary-500 text-white rounded-t-2xl flex flex-row justify-between items-center pt-10">
              <CardTitle className="text-white">
                {serviceType === 'ride' ? 'Request a Ride' : 'Send a Package'}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20 h-8 px-2"
                onClick={() => setIsScheduleOpen(true)}
              >
                <Clock size={16} className="mr-1" /> Schedule
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <Input
                    placeholder="Pickup Location"
                    icon={<MapPin size={18} />}
                    {...register('pickup', { required: 'Required' })}
                    error={errors.pickup?.message as string}
                  />
                  
                  <Input
                    placeholder="Destination"
                    icon={<Navigation size={18} />}
                    {...register('destination', { required: 'Required' })}
                    error={errors.destination?.message as string}
                  />

                  {/* Package Specific Fields */}
                  {serviceType === 'package' && (
                    <div className="space-y-4 animate-in slide-in-from-top-4 fade-in duration-300 bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl border border-gray-100 dark:border-slate-700">
                      <h4 className="text-xs font-bold uppercase text-gray-500">Recipient Details</h4>
                      <Input
                        placeholder="Recipient Name"
                        icon={<User size={18} />}
                        className="bg-white dark:bg-slate-800"
                        {...register('recipientName', { required: serviceType === 'package' })}
                      />
                      <Input
                        placeholder="Recipient Phone"
                        type="tel"
                        icon={<Phone size={18} />}
                        className="bg-white dark:bg-slate-800"
                        {...register('recipientPhone', { required: serviceType === 'package' })}
                      />
                      <Input
                        placeholder="Package Description (e.g. Keys, Documents)"
                        icon={<Package size={18} />}
                        className="bg-white dark:bg-slate-800"
                        {...register('packageDesc')}
                      />
                    </div>
                  )}
                </div>

                {/* Vehicle Selection (Only for Ride) */}
                {serviceType === 'ride' && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle Type</label>
                      <button 
                        type="button" 
                        onClick={() => setIsPreferencesOpen(true)}
                        className="text-xs text-primary-500 font-medium flex items-center hover:text-primary-600"
                      >
                        <SlidersHorizontal size={14} className="mr-1" /> Preferences
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {['Standard', 'Premium', 'Van'].map((type) => (
                        <label key={type} className="cursor-pointer group">
                          <input
                            type="radio"
                            value={type.toLowerCase()}
                            className="peer sr-only"
                            defaultChecked={type === 'Standard'}
                            {...register('vehicleType')}
                          />
                          <div className="rounded-xl border border-gray-200 dark:border-slate-600 p-3 text-center hover:bg-gray-50 dark:hover:bg-slate-700 peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 peer-checked:text-primary-600 transition-all">
                            <span className="text-sm font-bold">{type}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'cash', icon: Banknote, label: 'Cash' },
                      { id: 'card', icon: CreditCard, label: 'Card' },
                      { id: 'wallet', icon: Wallet, label: 'Wallet' },
                    ].map((method) => (
                      <label key={method.id} className="cursor-pointer">
                        <input type="radio" value={method.id} className="peer sr-only" defaultChecked={method.id === 'cash'} {...register('payment')} />
                        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 dark:border-slate-600 p-3 hover:bg-gray-50 dark:hover:bg-slate-700 peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 peer-checked:text-primary-600 transition-all">
                          <method.icon size={20} className="mb-1" />
                          <span className="text-xs font-medium">{method.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Promo Code */}
                <div className="relative">
                  <Input 
                    placeholder="Promo Code (e.g. VELOX50)" 
                    icon={<Tag size={18} />}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="absolute right-2 top-1.5 text-xs bg-gray-900 dark:bg-white text-white dark:text-black px-3 py-1.5 rounded-lg font-bold hover:opacity-80 transition-opacity"
                  >
                    Apply
                  </button>
                </div>

                {/* Fare Estimate */}
                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl flex justify-between items-center border border-gray-100 dark:border-slate-700">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Estimated Fare</p>
                    {estimateData && <p className="text-xs text-primary-500">{estimateData.distance} • {estimateData.duration}</p>}
                  </div>
                  {isCalculating ? (
                    <span className="text-sm font-medium animate-pulse text-gray-400">Calculating...</span>
                  ) : (
                    <div className="text-right">
                      {discount > 0 && (
                        <span className="block text-xs text-gray-400 line-through">${estimateData ? (parseFloat(estimateData.fare) * (serviceType === 'package' ? 1.2 : 1)).toFixed(2) : '--'}</span>
                      )}
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {estimateData ? `$${calculateFinalFare()}` : '--'}
                      </span>
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full h-12 text-lg shadow-lg shadow-primary-500/30" disabled={!estimateData}>
                  {paymentMethod === 'card' ? 'Proceed to Pay' : (serviceType === 'package' ? 'Confirm Delivery' : 'Book Ride')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <Card className="h-full min-h-[500px] relative overflow-hidden bg-gray-100 dark:bg-slate-800 border-0">
             <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center glass p-8 rounded-2xl">
                   <MapPin className="h-12 w-12 text-primary-500 mx-auto mb-2" />
                   <p className="text-gray-900 dark:text-white font-bold text-lg">Live Map Integration</p>
                   <p className="text-sm text-gray-500">Google Maps / Mapbox API</p>
                </div>
             </div>
             {/* Simulated Map Background */}
             <div className="absolute inset-0 opacity-30 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.4241,37.78,14.25,0,60/600x600?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2xsN3F3OG0wMDc4MnB0Y2d4b3F4b3F4In0.example')] bg-cover bg-center grayscale"></div>
          </Card>
        </div>
      </div>

      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        amount={calculateFinalFare()} 
        onSuccess={() => {
          handleBooking({ pickup, destination });
        }}
      />

      <ScheduleRideModal 
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />

      <RidePreferences 
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
      />
    </>
  );
};
