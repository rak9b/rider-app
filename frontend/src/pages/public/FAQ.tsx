import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../../components/ui/GlassCard';

const faqs = [
  { q: "How do I become a driver?", a: "Signing up is easy! Just click 'Get Started', select 'Driver' as your role, and upload the required documents (License, Vehicle Insurance, etc). Our team will verify your account within 48 hours." },
  { q: "What payment methods are accepted?", a: "We support a wide range of payment options including all major Credit/Debit cards (Visa, Mastercard, Amex), Digital Wallets (Apple Pay, Google Pay), and in-app Rider Wallet credits." },
  { q: "How safe is Rider App?", a: "Safety is at our core. Every trip is tracked via GPS, and we have a 24/7 incident response team. You can also use the in-app SOS button to instantly alert local authorities and your emergency contacts." },
  { q: "Can I schedule a ride in advance?", a: "Absolutely! You can use our 'Schedule' feature to book a ride from 30 minutes up to 30 days in advance. Perfect for airport runs and important meetings." },
  { q: "How are fares calculated?", a: "Fares are based on a base rate, distance traveled, and time taken. During periods of very high demand, dynamic pricing may occur, but you will always see the fixed estimate before booking." },
  { q: "What is the SOS button?", a: "The SOS button is an emergency feature available during active rides. It allows you to quickly call the police, notify your emergency contacts, and share your live location with professional support." },
];

export const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqs.filter(f =>
    f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-32 px-4 relative overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary-500/5 blur-[120px] rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
              Common <span className="text-primary-600">Questions.</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-inter max-w-2xl mx-auto">
              Everything you need to know about our platform, security features, and how to get the most out of your journey.
            </p>
          </motion.div>

          <div className="mt-12 max-w-xl mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            <input
              type="text"
              placeholder="Search for answers (e.g. 'Safety', 'Payment')..."
              className="w-full pl-12 pr-6 py-5 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xl focus:ring-4 ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-medium"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <GlassCard
              key={index}
              className="border-slate-200/50 dark:border-slate-800/50 overflow-hidden"
            >
              <button
                className="w-full px-8 py-6 text-left flex justify-between items-center group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${openIndex === index ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                    <HelpCircle size={18} />
                  </div>
                  <span className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">{faq.q}</span>
                </div>
                <ChevronDown
                  className={`h-6 w-6 text-slate-400 transition-transform duration-500 ${openIndex === index ? 'rotate-180 text-primary-500' : ''}`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 pl-20 text-slate-600 dark:text-slate-400 leading-relaxed font-inter border-t border-slate-50 dark:border-slate-800 pt-6">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-20 bg-white/50 dark:bg-slate-900/50 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
              <HelpCircle size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 font-bold">We couldn't find any results for "{searchTerm}"</p>
              <button onClick={() => setSearchTerm('')} className="mt-4 text-primary-500 font-bold hover:underline">Clear search</button>
            </div>
          )}
        </div>

        <div className="mt-20">
          <GlassCard className="p-8 bg-primary-600 text-white border-0 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <MessageCircle size={32} />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold">Still have questions?</h3>
                <p className="opacity-80">Our support team is ready to help you personally.</p>
              </div>
            </div>
            <button className="h-14 px-10 rounded-2xl bg-white text-primary-600 font-bold shadow-xl hover:scale-105 transition-transform">Live Chat Now</button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
