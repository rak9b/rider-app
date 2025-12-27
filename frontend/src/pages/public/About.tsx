import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Globe, Award, Target, Zap, Heart } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';

const TeamMember = ({ name, role, img }: { name: string; role: string; img: string }) => (
  <GlassCard className="group overflow-hidden border-slate-200/50 dark:border-slate-800/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2">
    <div className="relative overflow-hidden h-64">
      <img src={img} alt={name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
        <div className="flex gap-4">
          {/* Social Icons Placeholder */}
          <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-primary-500 transition-colors"><Zap size={14} /></div>
        </div>
      </div>
    </div>
    <div className="p-6 text-center">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{name}</h3>
      <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-widest">{role}</p>
    </div>
  </GlassCard>
);

export const About = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary-500/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-violet-500/10 blur-[150px] rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white mb-8">
              We're Redefining <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-violet-600">Human Mobility</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-inter">
              Rider App isn't just a platform; it's a movement. We bridge the gap between where you are and where you want to be, with safety and elegance at every turn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Philosophy / Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-violet-500 rounded-[3rem] blur-2xl opacity-10 animate-pulse" />
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200"
                alt="Collaboration"
                className="relative rounded-[2.5rem] shadow-2xl z-10 border-8 border-white dark:border-slate-800"
              />
              <div className="absolute -bottom-8 -right-8 z-20 hidden md:block">
                <GlassCard className="p-8 border-slate-200">
                  <p className="text-4xl font-black text-primary-600">10y+</p>
                  <p className="text-xs font-bold text-slate-500 uppercase">of Innovation</p>
                </GlassCard>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">Driven by a <span className="text-primary-600 underline decoration-primary-500/30 underline-offset-8">Single Mission</span></h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Founded in 2024, our journey began with a simple question: How can we make travel feel like more than just a commute? Today, we are a global leader in urban mobility, serving millions of happy riders across the globe.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Target, title: 'Our Goal', desc: 'Zero emissions by 2030.' },
                  { icon: Heart, title: 'Our Core', desc: 'Putting riders and drivers first.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center flex-shrink-0 text-primary-500">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold dark:text-white uppercase text-sm tracking-wider">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Banner */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: Shield, label: 'Safety Rating', val: '4.9/5' },
              { icon: Globe, label: 'Cities Worldwide', val: '150+' },
              { icon: Users, label: 'Active Drivers', val: '100k+' },
              { icon: Award, label: 'Awards Won', val: '25+' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="space-y-4"
              >
                <div className="inline-flex p-4 bg-white/5 rounded-3xl text-primary-400 mb-2">
                  <stat.icon size={32} />
                </div>
                <div className="text-4xl font-black text-white">{stat.val}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black dark:text-white mb-6">Our Visionaries</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Meet the team that's building the future of urban transportation.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember name="Alex Riviera" role="CEO & Founder" img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" />
            <TeamMember name="Elena Zhang" role="Chief Technology Officer" img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800" />
            <TeamMember name="Marcus Thorne" role="Head of Product" img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800" />
            <TeamMember name="Sofia Varga" role="Head of Strategy" img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" />
          </div>
        </div>
      </section>

      {/* 5. Join CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black dark:text-white mb-10 leading-tight">Be Part of the <span className="text-primary-600">Movement.</span></h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="h-16 px-10 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg hover:scale-105 transition-transform">Join the Team</button>
            <button className="h-16 px-10 rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Contact Press</button>
          </div>
        </div>
      </section>
    </div>
  );
};
