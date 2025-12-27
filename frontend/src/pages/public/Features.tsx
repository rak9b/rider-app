import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Car, Smartphone, ShieldCheck, CreditCard, Clock, Map,
  MapPin, Zap, UserCheck, BarChart3, Bell, Headphones,
  Award, Globe, Lock, TrendingUp, Users, CheckCircle2,
  Sparkles, Rocket, Target, Heart, Star, Activity, ArrowRight
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import { Badge } from '../../components/ui/Badge';

import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  desc: string;
  color?: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, desc, color = 'primary', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const colorMap: Record<string, { bg: string; text: string; glow: string }> = {
    primary: { bg: 'bg-primary-500/10', text: 'text-primary-600', glow: 'group-hover:shadow-primary-500/50' },
    violet: { bg: 'bg-violet-500/10', text: 'text-violet-600', glow: 'group-hover:shadow-violet-500/50' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-600', glow: 'group-hover:shadow-blue-500/50' },
    green: { bg: 'bg-green-500/10', text: 'text-green-600', glow: 'group-hover:shadow-green-500/50' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-600', glow: 'group-hover:shadow-orange-500/50' },
    pink: { bg: 'bg-pink-500/10', text: 'text-pink-600', glow: 'group-hover:shadow-pink-500/50' },
  };

  const colors = colorMap[color] || colorMap.primary;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      <GlassCard className={`group relative p-8 border-slate-200/50 dark:border-slate-800/50 hover:-translate-y-3 transition-all duration-500 overflow-hidden ${colors.glow} hover:shadow-2xl`}>
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon with animated glow */}
        <motion.div
          className={`relative h-16 w-16 rounded-2xl ${colors.bg} flex items-center justify-center ${colors.text} mb-6`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Icon size={32} strokeWidth={2} />
          <div className={`absolute inset-0 ${colors.bg} blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500`} />
        </motion.div>

        <h3 className="text-xl font-bold dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {desc}
        </p>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-500/5 to-transparent rounded-bl-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </GlassCard>
    </motion.div>
  );
};

const StatCard: React.FC<{ value: string; label: string; icon: React.ElementType; delay?: number }> = ({ value, label, icon: Icon, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.5, delay }}
      className="text-center group"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-white" size={32} />
      </div>
      <h3 className="text-5xl font-black text-white mb-2">{value}</h3>
      <p className="text-white/80 font-medium">{label}</p>
    </motion.div>
  );
};

export const Features = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="bg-slate-50 dark:bg-slate-950 min-h-screen overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary-500/20 blur-[150px] rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-500/20 blur-[150px] rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          style={{ opacity, scale }}
          className="relative max-w-7xl mx-auto px-4 text-center"
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center mb-8"
          >
            <Badge className="bg-primary-500/10 text-primary-600 dark:text-primary-400 px-6 py-2 rounded-full border-primary-500/20 uppercase font-black tracking-widest text-xs">
              <Sparkles size={14} className="mr-2" />
              Premium Features
            </Badge>
          </motion.div>

          {/* Main Title with Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]"
          >
            Powering Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-violet-600 to-pink-600 animate-gradient">
              Daily Drive
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-inter leading-relaxed mb-12"
          >
            Explore the cutting-edge technology and user-centric features that make Rider App the
            <span className="font-bold text-primary-600"> industry leader</span> in urban mobility solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/register">
              <Button size="lg" className="px-10 rounded-2xl shadow-xl shadow-primary-500/30 group">
                Get Started Free
                <Rocket className="ml-2 h-5 w-5 group-hover:translate-y-[-2px] transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="px-10 rounded-2xl glass">
                Schedule Demo
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Core Features Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold dark:text-white mb-4">
              Everything You Need, <span className="text-primary-600">All in One Place</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Built with cutting-edge technology to deliver the smoothest ride experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Map}
              title="Real-Time GPS Tracking"
              desc="Watch your ride arrive with military-grade GPS precision and live traffic updates powered by AI algorithms."
              color="primary"
              delay={0}
            />
            <FeatureCard
              icon={CreditCard}
              title="Multi-Payment Gateway"
              desc="Seamlessly pay via card, digital wallet, or cash. Bank-level encryption ensures your transactions are always safe."
              color="blue"
              delay={0.1}
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Advanced Safety Protocol"
              desc="Verified drivers, live trip sharing, SOS button, and 24/7 emergency response team for your peace of mind."
              color="green"
              delay={0.2}
            />
            <FeatureCard
              icon={Clock}
              title="Smart Scheduling AI"
              desc="Plan trips in advance with our intelligent algorithm ensuring your driver arrives exactly when you need them."
              color="violet"
              delay={0.3}
            />
            <FeatureCard
              icon={Zap}
              title="Lightning Match Engine"
              desc="Get matched with the nearest driver in under 10 seconds. Minimal waiting, maximum efficiency with our quantum matching."
              color="orange"
              delay={0.4}
            />
            <FeatureCard
              icon={Headphones}
              title="24/7 Concierge Support"
              desc="Real humans available round the clock via chat, phone, or email to help with any queries or issues."
              color="pink"
              delay={0.5}
            />
            <FeatureCard
              icon={Lock}
              title="Enterprise-Grade Security"
              desc="End-to-end encryption, secure data storage, and compliance with global privacy standards (GDPR, CCPA)."
              color="blue"
              delay={0}
            />
            <FeatureCard
              icon={Globe}
              title="Global Coverage"
              desc="Available in 50+ countries and 200+ cities worldwide. Same premium experience, anywhere you go."
              color="green"
              delay={0.1}
            />
            <FeatureCard
              icon={Award}
              title="Loyalty Rewards Program"
              desc="Earn points on every ride, unlock exclusive perks, priority support, and discounts on future trips."
              color="primary"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Role-Specific Features */}
      <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-[0.02]">
          <div className="absolute inset-0 bg-telegram-pattern" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="space-y-32">
            {/* For Riders */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <div className="space-y-8">
                <Badge className="bg-primary-500/10 text-primary-600 px-5 py-2 rounded-full border-primary-500/20 uppercase font-black tracking-widest text-xs">
                  <Users size={14} className="mr-2 inline" />
                  For Riders
                </Badge>
                <h2 className="text-5xl font-black dark:text-white leading-tight">
                  Seamless Journeys,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-violet-600">
                    Every Single Time
                  </span>
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Experience the future of transportation with features designed around your comfort, safety, and convenience.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, title: 'Smart Pickup Suggestions', desc: 'AI-powered location recommendations for the most convenient spot.' },
                    { icon: UserCheck, title: 'Premium Fleet Selection', desc: 'Choose from economy, comfort, premium, or luxury vehicles.' },
                    { icon: Star, title: 'Rate & Review', desc: 'Share your experience and help maintain service quality.' },
                    { icon: Target, title: 'Favorite Locations', desc: 'Save your frequent destinations for one-tap booking.' }
                  ].map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-5 group"
                    >
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-500/10 to-violet-500/10 flex items-center justify-center text-primary-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <f.icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold dark:text-white text-lg mb-1">{f.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -inset-8 bg-gradient-to-r from-primary-500/30 to-violet-500/30 blur-3xl rounded-full" />
                <img
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1200"
                  className="relative rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800 hover:scale-[1.02] transition-transform duration-500"
                  alt="Rider Experience"
                />
                {/* Floating Stats */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6"
                >
                  <GlassCard className="p-4 flex items-center gap-3 border-white/50 dark:border-slate-700/50">
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <CheckCircle2 className="text-green-600 h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500">Completed Rides</p>
                      <p className="text-lg font-black dark:text-white">10M+</p>
                    </div>
                  </GlassCard>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* For Drivers */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative order-2 lg:order-1"
              >
                <div className="absolute -inset-8 bg-gradient-to-r from-orange-500/30 to-pink-500/30 blur-3xl rounded-full" />
                <img
                  src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1200"
                  className="relative rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800 hover:scale-[1.02] transition-transform duration-500"
                  alt="Driver Experience"
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -top-6 -right-6"
                >
                  <GlassCard className="p-4 flex items-center gap-3 border-white/50 dark:border-slate-700/50">
                    <div className="bg-primary-500/20 p-2 rounded-lg">
                      <TrendingUp className="text-primary-600 h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500">Avg. Earnings</p>
                      <p className="text-lg font-black dark:text-white">$2,500/mo</p>
                    </div>
                  </GlassCard>
                </motion.div>
              </motion.div>

              <div className="space-y-8 order-1 lg:order-2">
                <Badge className="bg-orange-500/10 text-orange-600 px-5 py-2 rounded-full border-orange-500/20 uppercase font-black tracking-widest text-xs">
                  <Car size={14} className="mr-2 inline" />
                  For Drivers
                </Badge>
                <h2 className="text-5xl font-black dark:text-white leading-tight">
                  Drive Smart,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600">
                    Earn More
                  </span>
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Maximize your earnings with our intelligent routing, flexible scheduling, and transparent payment system.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: TrendingUp, title: 'Dynamic Pricing', desc: 'Earn more during peak hours with surge pricing and bonuses.' },
                    { icon: Activity, title: 'Real-Time Analytics', desc: 'Track your earnings, trips, and ratings in a beautiful dashboard.' },
                    { icon: Heart, title: 'Driver Benefits', desc: 'Health insurance, accident coverage, and retirement plans.' },
                    { icon: Smartphone, title: 'Easy Navigation', desc: 'Built-in GPS with optimized routes to save time and fuel.' }
                  ].map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-5 group"
                    >
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500/10 to-pink-500/10 flex items-center justify-center text-orange-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <f.icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold dark:text-white text-lg mb-1">{f.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* For Management/Admin */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <div className="space-y-8">
                <Badge className="bg-violet-500/10 text-violet-600 px-5 py-2 rounded-full border-violet-500/20 uppercase font-black tracking-widest text-xs">
                  <BarChart3 size={14} className="mr-2 inline" />
                  For Management
                </Badge>
                <h2 className="text-5xl font-black dark:text-white leading-tight">
                  Complete Control,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
                    Total Visibility
                  </span>
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Manage your entire fleet operation from a single, powerful dashboard with real-time insights.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: BarChart3, title: 'Deep Analytics', desc: 'Track performance, revenue, user growth, and trends with beautiful visualizations.' },
                    { icon: Bell, title: 'Live Monitoring', desc: 'Get instant alerts for system issues, safety concerns, or anomalies.' },
                    { icon: Users, title: 'Team Management', desc: 'Manage drivers, riders, and support staff with role-based access control.' },
                    { icon: Target, title: 'Goal Tracking', desc: 'Set KPIs and monitor progress with automated reporting.' }
                  ].map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-5 group"
                    >
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 flex items-center justify-center text-violet-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <f.icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold dark:text-white text-lg mb-1">{f.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -inset-8 bg-gradient-to-r from-violet-500/30 to-purple-500/30 blur-3xl rounded-full" />
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
                  className="relative rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800 hover:scale-[1.02] transition-transform duration-500"
                  alt="Admin Dashboard"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-violet-600 to-purple-700 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
            transition={{ duration: 18, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Trusted by Millions Worldwide
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Join the revolution and experience the future of transportation
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <StatCard value="10M+" label="Active Riders" icon={Users} delay={0} />
            <StatCard value="50K+" label="Pro Drivers" icon={Car} delay={0.1} />
            <StatCard value="200+" label="Global Cities" icon={Globe} delay={0.2} />
            <StatCard value="4.9/5" label="Average Rating" icon={Star} delay={0.3} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-500/10 mb-8">
              <Rocket className="text-primary-600" size={40} />
            </div>
            <h2 className="text-5xl md:text-6xl font-black dark:text-white mb-6">
              Ready to Experience<br />the Future?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join over 10 million people who travel with Rider App every day. Your journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="h-16 px-12 rounded-2xl text-lg shadow-xl shadow-primary-500/30 group">
                  Download App Now
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="h-16 px-12 rounded-2xl text-lg glass">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
