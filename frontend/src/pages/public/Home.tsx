import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { TiltCard } from '../../components/ui/TiltCard';
import GlassCard from '../../components/ui/GlassCard';
import {
  ArrowRight, Shield, Clock, CreditCard, MapPin,
  Smartphone, Zap, Car, CheckCircle, Star, Users, Gift
} from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const Home = () => {
  return (
    <div className="overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-primary-500/10 text-primary-600 dark:text-primary-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-primary-500/20">
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
                </span>
                <span>Now Serving 50+ Cities Globally</span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
                Your Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-violet-600">Ride Experience</span> Reimagined.
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-xl">
                Experience the safest, fastest, and most comfortable way to get around. Professional drivers, lightning-fast estimates, and seamless payments.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto px-10 rounded-2xl shadow-xl shadow-primary-500/20 group">
                    Start Your Journey <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 rounded-2xl glass border-slate-200 dark:border-slate-800">
                    See Features
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 animate-float">
                <img
                  src="/images/hero_car.png"
                  alt="Future of Transport"
                  className="w-full h-auto drop-shadow-[0_35px_35px_rgba(139,92,246,0.3)] rounded-3xl"
                />
              </div>

              {/* Floating Stat Card */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 z-20"
              >
                <GlassCard className="p-4 flex items-center gap-4">
                  <div className="bg-green-500/20 p-2 rounded-xl">
                    <Shield className="text-green-600 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Safety Level</p>
                    <p className="text-sm font-bold dark:text-white">99.9% Secure</p>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. How It Works Section */}
      <section className="py-24 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold dark:text-white mb-4">How it Works</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Three simple steps to your next destination. Easy, fast, and reliable.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Book in Seconds", desc: "Enter your destination and choose your preferred ride type with instant pricing.", icon: <Smartphone /> },
              { step: "02", title: "Track Your Driver", desc: "Watch your driver's real-time progress on the map as they head to your location.", icon: <MapPin /> },
              { step: "03", title: "Enjoy Your Ride", desc: "Arrive safely and pay seamlessly via your preferred secure payment method.", icon: <Car /> }
            ].map((s, i) => (
              <div key={i} className="relative group text-center">
                <div className="mb-6 inline-flex items-center justify-center p-5 rounded-3xl bg-primary-500/10 text-primary-600 group-hover:scale-110 transition-transform duration-300">
                  {React.cloneElement(s.icon as React.ReactElement<any>, { size: 32 })}
                </div>
                <h3 className="text-xl font-bold dark:text-white mb-3">{s.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{s.desc}</p>
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-8xl font-black text-slate-100 dark:text-slate-800 -z-10">{s.step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Service Highlights */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-6">
                <TiltCard className="p-1">
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl h-full">
                    <Zap className="text-yellow-500 mb-4" />
                    <h4 className="font-bold mb-2 dark:text-white">Rapid Dispatch</h4>
                    <p className="text-sm text-slate-500">AI-powered driver matching system.</p>
                  </div>
                </TiltCard>
                <TiltCard className="p-1 mt-8">
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl h-full">
                    <CreditCard className="text-primary-500 mb-4" />
                    <h4 className="font-bold mb-2 dark:text-white">Cashless Pay</h4>
                    <p className="text-sm text-slate-500">Fast and secure digital transactions.</p>
                  </div>
                </TiltCard>
                <TiltCard className="p-1 -mt-8">
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl h-full">
                    <Shield className="text-green-500 mb-4" />
                    <h4 className="font-bold mb-2 dark:text-white">Safety First</h4>
                    <p className="text-sm text-slate-500">Verified drivers and live trip info.</p>
                  </div>
                </TiltCard>
                <TiltCard className="p-1">
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl h-full">
                    <Clock className="text-violet-500 mb-4" />
                    <h4 className="font-bold mb-2 dark:text-white">24/7 Support</h4>
                    <p className="text-sm text-slate-500">We're here to help anytime, anywhere.</p>
                  </div>
                </TiltCard>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-bold dark:text-white mb-6">Service <span className="text-primary-600">Highlights</span></h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                We've built Rider App with one goal: to make transportation as seamless as breathing. Our technology layer ensures you never have to worry about reliability again.
              </p>
              <ul className="space-y-4">
                {['Verified Driver Network', 'Zero Hidden Fees', 'Live Ride Tracking', 'Multiple Vehicle Categories'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                    <CheckCircle className="text-primary-500 h-5 w-5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-600/5 blur-[150px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Users Say</h2>
            <div className="flex justify-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "John Doe", role: "Daily Commuter", quote: "The most reliable ride app I've ever used. Drivers are professional and on time." },
              { name: "Sarah Smith", role: "Business Traveler", quote: "Priceless for my business trips. The premium options are top-notch." },
              { name: "Mike Ross", role: "Frequent Rider", quote: "Seamless payments and great loyalty rewards. Highly recommended!" }
            ].map((t, i) => (
              <GlassCard key={i} className="p-8 border-white/10">
                <p className="text-slate-300 italic mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold">{t.name}</h5>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Special Offers / Promotions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-violet-600 to-primary-600 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-white/10">
              <Gift size={200} />
            </div>
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">50% OFF Your First Ride!</h2>
                <p className="text-xl text-white/80 mb-8">Use code <span className="bg-white/20 px-3 py-1 rounded-lg font-mono">NEWSTART2024</span> at checkout.</p>
                <Link to="/register">
                  <Button variant="secondary" size="lg" className="rounded-2xl px-12 h-14 bg-white text-primary-600 hover:bg-slate-50 transition-colors">
                    Claim Offer Now
                  </Button>
                </Link>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="text-white flex items-center gap-10">
                  <div className="text-center">
                    <p className="text-4xl font-bold">1M+</p>
                    <p className="text-sm opacity-80">Riders</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold">50k+</p>
                    <p className="text-sm opacity-80">Drivers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold">4.9/5</p>
                    <p className="text-sm opacity-80">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contact / CTA Prompts */}
      <section className="py-24 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Users className="mx-auto text-primary-600 h-16 w-16 mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold dark:text-white mb-6">Ready to join the revolution?</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10">
              Join thousands of others who have already chosen a better way to travel.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register?role=driver">
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl w-full sm:w-auto">Become a Driver</Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost" size="lg" className="h-14 px-8 rounded-2xl w-full sm:w-auto">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
