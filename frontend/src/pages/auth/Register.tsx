import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Car, Mail, Lock, User, Phone, ArrowRight, ShieldCheck, Github } from 'lucide-react';
import toast from 'react-hot-toast';
import GlassCard from '../../components/ui/GlassCard';
import { motion } from 'framer-motion';
import { useRegisterMutation } from '../../store/api/apiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';

const registerSchema = z.object({
  role: z.enum(['rider', 'driver']),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'rider' }
  });
  const [registerUser, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const result = await registerUser(data).unwrap();
      dispatch(setCredentials(result));
      toast.success("Account created successfully!");
      navigate(`/dashboard/${result.user.role}`);
    } catch (err: any) {
      toast.error(err.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* 1. Left Side: Brand Visuals (Identical to Login for consistency) */}
      <div className="hidden lg:flex relative bg-slate-900 overflow-hidden flex-col justify-between p-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-primary-600/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[80%] h-[80%] bg-violet-600/20 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 text-white">
            <div className="bg-primary-500 p-2 rounded-xl h-10 w-10 flex items-center justify-center shadow-lg shadow-primary-500/50">
              <Car size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter">RiderApp</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl font-black text-white leading-tight"
          >
            Join The <br />
            <span className="text-primary-500">Revolution.</span>
          </motion.h2>
          <p className="text-slate-400 text-xl font-medium max-w-md">Create an account today and experience the new standard in urban transportation.</p>
        </div>

        <div className="relative z-10">
          <div className="flex -space-x-4 mb-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-12 w-12 rounded-full border-4 border-slate-900 bg-slate-700 flex items-center justify-center text-xs font-bold text-white z-${10 - i}`}>
                U{i}
              </div>
            ))}
            <div className="h-12 w-12 rounded-full border-4 border-slate-900 bg-primary-600 flex items-center justify-center text-xs font-bold text-white z-0">
              +1M
            </div>
          </div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Join our growing community</p>
        </div>
      </div>

      {/* 2. Right Side: Registration Form */}
      <div className="flex items-center justify-center p-8 relative overflow-y-auto">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black dark:text-white mb-2">Create Account</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Already a member? <Link to="/login" className="text-primary-600 font-bold hover:underline">Log in now</Link></p>
          </div>

          <GlassCard className="p-8 md:p-10 border-slate-200/50 dark:border-slate-800/50 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* Role Selection */}
              <div className="grid grid-cols-2 gap-4 p-1 bg-slate-100 dark:bg-slate-900/50 rounded-2xl">
                {['rider', 'driver'].map((role) => (
                  <label key={role} className="cursor-pointer">
                    <input
                      type="radio"
                      value={role}
                      className="peer sr-only"
                      defaultChecked={role === 'rider'}
                      {...register("role")}
                    />
                    <div className="rounded-xl py-2.5 text-center font-bold text-sm text-slate-500 dark:text-slate-400 peer-checked:bg-white dark:peer-checked:bg-slate-800 peer-checked:text-primary-600 peer-checked:shadow-sm transition-all capitalize">
                      {role}
                    </div>
                  </label>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  className="h-12 rounded-2xl bg-white/50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-sm"
                  icon={<User className="text-slate-400" size={16} />}
                  {...register('name')}
                  error={errors.name?.message as string}
                />
                <Input
                  label="Phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="h-12 rounded-2xl bg-white/50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-sm"
                  icon={<Phone className="text-slate-400" size={16} />}
                  {...register('phone')}
                  error={errors.phone?.message as string}
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="name@company.com"
                className="h-12 rounded-2xl bg-white/50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-sm"
                icon={<Mail className="text-slate-400" size={16} />}
                {...register('email')}
                error={errors.email?.message as string}
              />

              <div className="grid md:grid-cols-2 gap-5">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 rounded-2xl bg-white/50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-sm"
                  icon={<Lock className="text-slate-400" size={16} />}
                  {...register('password')}
                  error={errors.password?.message as string}
                />
                <Input
                  label="Confirm"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 rounded-2xl bg-white/50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-sm"
                  icon={<Lock className="text-slate-400" size={16} />}
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message as string}
                />
              </div>

              <Button type="submit" size="lg" className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary-500/20 group mt-4" isLoading={isLoading}>
                Create Account <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={14} className="text-green-500" />
              By signing up, you agree to our <a href="#" className="underline hover:text-primary-600">Terms</a> and <a href="#" className="underline hover:text-primary-600">Privacy Policy</a>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
