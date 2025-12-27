import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import GlassCard from '../../components/ui/GlassCard';
import { motion } from 'framer-motion';

export const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    toast.success('Message sent! Our support team will reach out shortly.');
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-500/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-500/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
              Let's <span className="text-primary-600">Connect.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-500 dark:text-slate-400 font-inter">
              Have a question, feedback, or just want to say hello? Our dedicated team is here to help you 24/7.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Details Panel */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold dark:text-white mb-8 flex items-center gap-3">
              <MessageSquare className="text-primary-500" /> Contact Details
            </h2>

            <div className="space-y-6">
              {[
                { icon: Mail, title: 'Email Support', val: 'support@riderapp.com', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { icon: Phone, title: '24/7 Hotline', val: '+1 (800) 555-RIDER', color: 'text-green-500', bg: 'bg-green-500/10' },
                { icon: MapPin, title: 'Global HQ', val: '77 Innovation Way, San Francisco, CA', color: 'text-red-500', bg: 'bg-red-500/10' },
                { icon: Clock, title: 'Office Hours', val: 'Mon - Fri, 9:00 AM - 6:00 PM', color: 'text-violet-500', bg: 'bg-violet-500/10' },
              ].map((item, i) => (
                <GlassCard key={i} className="p-6 flex items-center gap-6 border-slate-200/50 dark:border-slate-800/50 hover:bg-white/50 dark:hover:bg-slate-900/50 transition-colors">
                  <div className={`p-4 rounded-2xl ${item.bg}`}>
                    <item.icon className={item.color} size={24} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{item.title}</h3>
                    <p className="text-lg font-bold text-slate-900 dark:text-white font-inter">{item.val}</p>
                  </div>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="p-8 bg-gradient-to-br from-primary-600 to-violet-700 text-white border-0">
              <h3 className="text-xl font-bold mb-4">Partner with us?</h3>
              <p className="opacity-80 mb-6 text-sm leading-relaxed">Interested in becoming a business partner or joining our driver network? Let's build the future together.</p>
              <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 h-12">Visit Partners Portal</Button>
            </GlassCard>
          </div>

          {/* Contact Form Panel */}
          <GlassCard className="lg:col-span-3 p-8 md:p-12 border-slate-200/50 dark:border-slate-800/50 shadow-2xl">
            <h2 className="text-3xl font-bold dark:text-white mb-10">Send a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  className="h-14 rounded-2xl bg-white/50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                  {...register('name', { required: 'Name is required' })}
                  error={errors.name?.message as string}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  className="h-14 rounded-2xl bg-white/50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                  })}
                  error={errors.email?.message as string}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Subject</label>
                <select className="w-full h-14 rounded-2xl bg-white/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 outline-none focus:ring-2 ring-primary-500/20 text-slate-900 dark:text-white font-medium">
                  <option>General Inquiry</option>
                  <option>Account Support</option>
                  <option>Billing Question</option>
                  <option>Partnership Proposal</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Your Message</label>
                <textarea
                  rows={6}
                  className="w-full rounded-2xl bg-white/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-4 outline-none focus:ring-2 ring-primary-500/20 text-slate-900 dark:text-white font-medium resize-none"
                  placeholder="How can our magic help you today?"
                  {...register('message', { required: 'Message cannot be empty' })}
                ></textarea>
                {errors.message && <p className="text-xs text-red-500 font-bold">{errors.message.message as string}</p>}
              </div>

              <Button type="submit" size="lg" className="w-full h-16 rounded-2xl text-xl font-bold shadow-xl shadow-primary-500/20 group">
                <Send className="mr-3 h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Dispatch Message
              </Button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
