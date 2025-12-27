import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { setCredentials } from '../../store/slices/authSlice';
import { useLoginMutation } from '../../store/api/apiSlice';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Car, Mail, Lock, ArrowRight, ShieldCheck, Github } from 'lucide-react';
import toast from 'react-hot-toast';
import GlassCard from '../../components/ui/GlassCard';
import { motion } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema)
  });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const result = await login(data).unwrap();

      // Backend returns: { _id, name, email, role, status, phone, rating, isOnline, vehicleDetails, token }
      // Frontend expects: { user: {...}, token: string }
      const mappedResult = {
        user: {
          id: result._id,
          name: result.name,
          email: result.email,
          role: result.role,
          status: result.status,
          phone: result.phone,
          avatar: result.avatar,
          isOnline: result.isOnline,
        },
        token: result.token
      };

      dispatch(setCredentials(mappedResult));

      // Save to localStorage for persistence
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(mappedResult.user));

      toast.success(`Welcome back, ${result.name}!`, {
        icon: '👋',
        duration: 3000,
      });

      // Navigate to role-specific dashboard
      navigate(`/dashboard/${result.role}`);
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err?.data?.message || err?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage, {
        icon: '❌',
        duration: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* 1. Left Side: Brand Visuals */}
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
            The Smartest Way <br />
            To <span className="text-primary-500">Navigate</span> Your World.
          </motion.h2>
          <p className="text-slate-400 text-xl font-medium max-w-md">Experience the future of urban mobility with RiderApp's premium fleet and real-time tracking.</p>
        </div>

        <div className="relative z-10 flex gap-12">
          <div className="text-white">
            <p className="text-4xl font-black">1M+</p>
            <p className="text-xs uppercase font-bold text-slate-500 tracking-widest">Active Riders</p>
          </div>
          <div className="text-white">
            <p className="text-4xl font-black">4.9</p>
            <p className="text-xs uppercase font-bold text-slate-500 tracking-widest">App Store Rating</p>
          </div>
        </div>
      </div>

      {/* 2. Right Side: Auth Form */}
      <div className="flex items-center justify-center p-8 relative">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black dark:text-white mb-2">Welcome Back</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">New here? <Link to="/register" className="text-primary-600 font-bold hover:underline">Create an account</Link></p>
          </div>

          <GlassCard className="p-8 md:p-10 border-slate-200/50 dark:border-slate-800/50 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                placeholder="name@company.com"
                className="h-14 rounded-2xl bg-white/50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                icon={<Mail className="text-slate-400" size={18} />}
                {...register('email')}
                error={errors.email?.message as string}
              />

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Password</label>
                  <button type="button" className="text-xs font-bold text-primary-600 hover:underline">Forgot Password?</button>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-14 rounded-2xl bg-white/50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                  icon={<Lock className="text-slate-400" size={18} />}
                  {...register('password')}
                  error={errors.password?.message as string}
                />
              </div>

              <Button type="submit" size="lg" className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary-500/20 group" isLoading={isLoading}>
                Sign In <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
              <span className="text-[10px] uppercase font-black text-slate-400">Log In with</span>
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="h-12 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-2 font-bold text-sm text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <Github size={20} /> Github
              </button>
              <button className="h-12 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-2 font-bold text-sm text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                Google
              </button>
            </div>

            <div className="mt-8 p-4 bg-primary-500/5 rounded-2xl border border-primary-500/10 flex items-center gap-3">
              <ShieldCheck className="text-primary-500" size={20} />
              <p className="text-[10px] text-slate-500 leading-tight">Your data is secured with bank-grade AES-256 encryption and multi-factor authentication protocols.</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
