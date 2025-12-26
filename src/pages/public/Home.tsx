import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { TiltCard } from '../../components/ui/TiltCard';
import { ArrowRight, Shield, Clock, CreditCard, MapPin, Smartphone, Zap, Car } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-40 lg:pb-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium mb-6 border border-primary-100 dark:border-primary-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                <span>Live in 50+ Cities</span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8 leading-tight">
                Move <span className="text-gradient">Faster</span><br />
                Live Better.
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-lg">
                Experience the next generation of ride-hailing. Zero delays, premium comfort, and prices that make sense.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all hover:-translate-y-1">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg backdrop-blur-sm">
                    How it Works
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* 3D Hero Image Area */}
            <motion.div 
              initial={{ opacity: 0, x: 50, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative perspective-1000"
            >
              <TiltCard className="bg-gradient-to-br from-gray-900 to-black border-gray-800 p-2 rounded-[2.5rem] shadow-2xl shadow-blue-500/20 max-w-md mx-auto transform rotate-y-12">
                <div className="relative rounded-[2rem] overflow-hidden bg-gray-800 h-[600px] border-4 border-gray-900">
                  {/* Mock App Interface */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                    <div className="glass p-4 rounded-xl flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                        <Car className="text-white" />
                      </div>
                      <div>
                        <p className="text-white/60 text-xs">Driver Arriving</p>
                        <p className="text-white font-bold text-lg">2 mins away</p>
                      </div>
                      <div className="ml-auto">
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">On Time</span>
                      </div>
                    </div>
                    <Button className="w-full bg-white text-black hover:bg-gray-200">Contact Driver</Button>
                  </div>
                </div>
              </TiltCard>

              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 -left-10 glass p-4 rounded-2xl shadow-xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
                    <Shield className="text-green-600 dark:text-green-400 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Safety Status</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Verified & Secure</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-40 -right-10 glass p-4 rounded-2xl shadow-xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                    <Zap className="text-blue-600 dark:text-blue-400 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Avg. Pickup</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">3.5 Minutes</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid with Tilt Cards */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Why Velox?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Built for the modern commuter. We've reimagined every pixel of the ride-sharing experience.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8 text-white" />,
                title: "Bank-Grade Security",
                desc: "Every ride is tracked, insured, and verified. Your safety is non-negotiable.",
                color: "bg-gradient-to-br from-blue-500 to-blue-600"
              },
              {
                icon: <Clock className="h-8 w-8 text-white" />,
                title: "Lightning Fast",
                desc: "Our AI dispatch system predicts demand to ensure a car is always around the corner.",
                color: "bg-gradient-to-br from-purple-500 to-purple-600"
              },
              {
                icon: <CreditCard className="h-8 w-8 text-white" />,
                title: "Smart Payments",
                desc: "Split fares, pay with crypto, or use your digital wallet. Seamless and secure.",
                color: "bg-gradient-to-br from-pink-500 to-pink-600"
              }
            ].map((feature, idx) => (
              <TiltCard key={idx} className="h-full">
                <div className="p-8 h-full flex flex-col">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-8 ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">{feature.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
