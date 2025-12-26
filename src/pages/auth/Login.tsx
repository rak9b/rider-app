import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setCredentials } from '../../store/slices/authSlice';
import { useLoginMutation } from '../../store/api/apiSlice';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Car, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      toast.success(`Welcome back, ${result.user.name}!`);
      navigate(`/dashboard/${result.user.role}`);
    } catch (err) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative z-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-primary-600 text-white p-3 rounded-2xl shadow-lg shadow-primary-500/30">
            <Car size={32} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to Velox
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-800 py-8 px-4 shadow-2xl dark:shadow-black/50 sm:rounded-2xl sm:px-10 border border-gray-100 dark:border-slate-700/50 backdrop-blur-xl">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email address"
              type="email"
              icon={<Mail size={18} />}
              {...register('email', { required: 'Email is required' })}
              error={errors.email?.message as string}
            />

            <Input
              label="Password"
              type="password"
              icon={<Lock size={18} />}
              {...register('password', { required: 'Password is required' })}
              error={errors.password?.message as string}
            />

            <Button type="submit" className="w-full h-11 text-lg" isLoading={isLoading}>
              Sign in
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-gray-500">
                  Demo Accounts
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
               {['rider', 'driver', 'admin'].map((role) => (
                 <button
                   key={role}
                   onClick={() => onSubmit({ email: `${role}@test.com`, password: 'password' })}
                   className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-slate-700/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-gray-200 dark:border-slate-700 rounded-xl transition-all duration-200 group"
                 >
                    <span className="text-xs font-bold uppercase text-gray-500 group-hover:text-primary-600 mb-1">{role}</span>
                    <span className="text-[10px] text-gray-400">Click to Login</span>
                 </button>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
