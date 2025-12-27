import React from 'react';
import { motion } from 'framer-motion';
import {
  Car, Smartphone, ShieldCheck, CreditCard, Clock, Map,
  MapPin, Zap, UserCheck, BarChart3, Bell, Headphones
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
  <GlassCard className="p-8 border-slate-200/50 dark:border-slate-800/50 hover:-translate-y-2 transition-all duration-300">
    <div className="h-14 w-14 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-600 mb-6">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold dark:text-white mb-3">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
  </GlassCard>
);

export const Features = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-8"
          >
            Powering Your <span className="text-primary-600">Daily Drive</span>
          </motion.h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-500 dark:text-slate-400 font-inter">
            Explore the advanced technology and user-centric features that make Rider App the industry leader in urban mobility solutions.
          </p>
        </div>
      </section>

      {/* 2. Main Feature Grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Map}
              title="Live Real-time Tracking"
              desc="Watch your ride arrive in real-time with high-precision GPS tracking and live traffic updates."
            />
            <FeatureCard
              icon={CreditCard}
              title="Multi-channel Payments"
              desc="Seamlessly pay via card, digital wallet, or cash. Safe, secure, and encrypted transactions."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Zero-Compromise Safety"
              desc="Verified drivers, live trip sharing, and a 24/7 dedicated emergency SOS response team."
            />
            <FeatureCard
              icon={Clock}
              title="Smart Scheduling"
              desc="Plan your trips in advance. Our smart algorithm ensures your driver is there exactly when you need them."
            />
            <FeatureCard
              icon={Zap}
              title="Lightning Fast Dispatch"
              desc="Get matched with the nearest available driver in under 15 seconds. Minimal waiting, maximum efficiency."
            />
            <FeatureCard
              icon={Headphones}
              title="24/7 Concierge Support"
              desc="Real humans are available round the clock to help with any queries or issues you might encounter."
            />
          </div>
        </div>
      </section>

      {/* 3. Role-specific deep dives */}
      <section className="py-24 bg-white dark:bg-slate-900 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-32">
            {/* Rider Deep Dive */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <Badge variant="secondary" className="bg-primary-500/10 text-primary-600 px-4 py-1.5 rounded-full border-primary-500/20 uppercase font-black tracking-widest text-[10px]">For Riders</Badge>
                <h2 className="text-4xl font-bold dark:text-white">Seamless Journeys, <br />Every Single Time.</h2>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, title: 'Smart Pickup', desc: 'Auto-suggestion for the most convenient pickup spot.' },
                    { icon: UserCheck, title: 'Premium Fleet', desc: 'Choose from various vehicle tiers based on your needs.' }
                  ].map((f, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary-500 flex-shrink-0"><f.icon size={20} /></div>
                      <div>
                        <h4 className="font-bold dark:text-white">{f.title}</h4>
                        <p className="text-sm text-slate-500">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-primary-500/20 blur-3xl rounded-full" />
                <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1200" className="relative rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800" alt="Rider App" />
              </div>
            </div>

            {/* Admin Deep Dive */}
            <div className="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
              <div className="lg:order-2 space-y-8">
                <Badge variant="secondary" className="bg-violet-500/10 text-violet-600 px-4 py-1.5 rounded-full border-violet-500/20 uppercase font-black tracking-widest text-[10px]">For Management</Badge>
                <h2 className="text-4xl font-bold dark:text-white">Full Control over <br />Your Fleet Operations.</h2>
                <div className="space-y-6">
                  {[
                    { icon: BarChart3, title: 'Deep Analytics', desc: 'Track performance, revenue, and user growth with ease.' },
                    { icon: Bell, title: 'Live Monitoring', desc: 'Get instant alerts for any system or safety abnormalities.' }
                  ].map((f, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-violet-500 flex-shrink-0"><f.icon size={20} /></div>
                      <div>
                        <h4 className="font-bold dark:text-white">{f.title}</h4>
                        <p className="text-sm text-slate-500">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:order-1 relative">
                <div className="absolute -inset-4 bg-violet-500/20 blur-3xl rounded-full" />
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" className="relative rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800" alt="Admin Dashboard" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black dark:text-white mb-8">Ready to experience the future?</h2>
          <p className="text-xl text-slate-500 mb-10">Join over 1 million people who travel with Rider App every day.</p>
          <button className="h-16 px-12 rounded-2xl bg-primary-600 text-white font-bold text-lg shadow-xl shadow-primary-500/20 hover:scale-105 transition-transform">Download App Now</button>
        </div>
      </section>
    </div>
  );
};
