import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Globe, Award } from 'lucide-react';
import { faker } from '@faker-js/faker';

const TeamMember = ({ name, role, img }: { name: string; role: string; img: string }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-all duration-300">
    <div className="aspect-w-3 aspect-h-4">
      <img src={img} alt={name} className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>
    <div className="p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
      <p className="text-primary-600 dark:text-primary-400 font-medium">{role}</p>
    </div>
  </div>
);

export const About = () => {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      {/* Hero */}
      <div className="relative bg-primary-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            We Move the World
          </motion.h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-primary-100">
            Velox is more than just a ride-hailing app. We are a technology company connecting the physical and digital worlds to make movement accessible to everyone.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Founded in 2024, Velox started with a simple idea: What if you could request a ride from your phone? Today, we're reimagining how people and things move.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              We are committed to safety, sustainability, and providing economic opportunities for millions of drivers worldwide.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: Shield, label: 'Safety First', val: '100%' },
              { icon: Globe, label: 'Cities', val: '500+' },
              { icon: Users, label: 'Drivers', val: '2M+' },
              { icon: Award, label: 'Rating', val: '4.8' },
            ].map((stat, i) => (
              <div key={i} className="bg-gray-50 dark:bg-slate-800 p-6 rounded-2xl text-center">
                <stat.icon className="mx-auto h-8 w-8 text-primary-600 mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.val}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-gray-50 dark:bg-slate-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">Meet Our Leadership</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember name="Alex Morgan" role="CEO & Founder" img="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" />
            <TeamMember name="Sarah Chen" role="Chief Technology Officer" img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" />
            <TeamMember name="David Kim" role="Head of Operations" img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800" />
            <TeamMember name="Emily Davis" role="Head of Product" img="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800" />
          </div>
        </div>
      </div>
    </div>
  );
};
