import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Car } from 'lucide-react';
import toast from 'react-hot-toast';

export const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully! Please login.");
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-black text-white p-2 rounded-lg">
            <Car size={32} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">I want to be a</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="cursor-pointer">
                  <input 
                    type="radio" 
                    value="rider" 
                    className="peer sr-only"
                    defaultChecked
                    {...register("role")}
                  />
                  <div className="rounded-md border border-gray-300 px-3 py-2 text-center hover:bg-gray-50 peer-checked:border-black peer-checked:bg-black peer-checked:text-white transition-all">
                    Rider
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input 
                    type="radio" 
                    value="driver" 
                    className="peer sr-only"
                    {...register("role")}
                  />
                  <div className="rounded-md border border-gray-300 px-3 py-2 text-center hover:bg-gray-50 peer-checked:border-black peer-checked:bg-black peer-checked:text-white transition-all">
                    Driver
                  </div>
                </label>
              </div>
            </div>

            <Input
              label="Full Name"
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message as string}
            />

            <Input
              label="Email address"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              error={errors.email?.message as string}
            />

            <Input
              label="Phone Number"
              type="tel"
              {...register('phone', { required: 'Phone is required' })}
              error={errors.phone?.message as string}
            />

            <Input
              label="Password"
              type="password"
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 8, message: "Must be at least 8 characters" }
              })}
              error={errors.password?.message as string}
            />

            <Input
              label="Confirm Password"
              type="password"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || "Passwords do not match"
              })}
              error={errors.confirmPassword?.message as string}
            />

            <div>
              <Button type="submit" className="w-full" isLoading={isLoading}>
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
