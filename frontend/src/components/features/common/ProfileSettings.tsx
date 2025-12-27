import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RootState } from '../../../store/store';
import { updateUser } from '../../../store/slices/authSlice';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { User, Mail, Phone, Car, Shield, Camera, Lock, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export const ProfileSettings = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '+1 (555) 123-4567',
      // Driver specific defaults (mock data)
      vehicleMake: 'Toyota',
      vehicleModel: 'Camry',
      licensePlate: 'ABC-1234',
    }
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      dispatch(updateUser({ name: data.name, phone: data.phone }));
      setIsLoading(false);
      toast.success('Profile updated successfully!');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-4 mb-8">
        <div className="relative group cursor-pointer">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h1>
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <span className="capitalize">{user?.role} Account</span>
            <span>•</span>
            <span className="text-green-500 font-medium">Verified</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={20} className="text-primary-500" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    icon={<User size={18} />}
                    {...register('name', { required: 'Name is required' })}
                    error={errors.name?.message as string}
                  />
                  <Input
                    label="Phone Number"
                    icon={<Phone size={18} />}
                    {...register('phone', { required: 'Phone is required' })}
                    error={errors.phone?.message as string}
                  />
                </div>
                <Input
                  label="Email Address"
                  icon={<Mail size={18} />}
                  disabled
                  className="bg-gray-50 dark:bg-slate-900/50 cursor-not-allowed"
                  {...register('email')}
                />

                <div className="flex justify-end">
                  <Button type="submit" isLoading={isLoading} className="w-full sm:w-auto">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Vehicle Information (Driver Only) */}
          {user?.role === 'driver' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car size={20} className="text-primary-500" />
                  Vehicle Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input label="Vehicle Make" {...register('vehicleMake')} />
                  <Input label="Vehicle Model" {...register('vehicleModel')} />
                  <Input label="License Plate" {...register('licensePlate')} />
                  <div className="flex items-end">
                    <Button variant="outline" className="w-full">Upload Documents</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Security & Settings */}
        <div className="space-y-8">
          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} className="text-red-500" />
                Safety Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Trusted Contacts</h4>
                <p className="text-xs text-slate-500">
                  These contacts will be notified when you use the SOS button.
                </p>
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20">
                  <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center text-red-600 dark:text-red-200 font-bold text-xs">
                    M
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Mom</p>
                    <p className="text-xs text-slate-500">+1 (555) 000-0000</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-dashed border-2">
                  + Add Trusted Contact
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock size={20} className="text-primary-500" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Lock className="mr-2 h-4 w-4" /> Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200">
                Delete Account
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary-500 to-primary-700 text-white border-none">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Velox Pro</h3>
              <p className="text-primary-100 text-sm mb-4">
                Upgrade to Pro to get priority support and lower service fees.
              </p>
              <Button className="w-full bg-white text-primary-600 hover:bg-gray-100 border-none">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
