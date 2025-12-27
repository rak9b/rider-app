import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion, useInView } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Mail, Phone, MapPin, Send, MessageSquare, Clock,
  CheckCircle2, Globe, Linkedin, Twitter, Facebook,
  Instagram, Youtube, ArrowRight, Sparkles, Heart,
  Users, Briefcase, HelpCircle, ChevronDown, Building
} from 'lucide-react';
import toast from 'react-hot-toast';
import GlassCard from '../../components/ui/GlassCard';
import { Badge } from '../../components/ui/Badge';

interface ContactCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  color: string;
  bgColor: string;
  href?: string;
  delay?: number;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon: Icon,
  title,
  value,
  color,
  bgColor,
  href,
  delay = 0
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const CardContent = (
    <GlassCard className="group p-6 border-slate-200/50 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer h-full">
      <div className="flex items-start gap-5">
        <div className={`p-4 rounded-2xl ${bgColor} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={color} size={28} strokeWidth={2} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{title}</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white font-inter group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {value}
          </p>
        </div>
        {href && (
          <ArrowRight className="text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" size={20} />
        )}
      </div>
    </GlassCard>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
          {CardContent}
        </a>
      ) : (
        CardContent
      )}
    </motion.div>
  );
};

const FAQItem: React.FC<{ question: string; answer: string; index: number }> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <GlassCard
        className="border-slate-200/50 dark:border-slate-800/50 overflow-hidden cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="p-6 flex items-center justify-between">
          <h3 className="text-lg font-bold dark:text-white pr-4">{question}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="text-primary-600 flex-shrink-0" size={24} />
          </motion.div>
        </div>
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
            {answer}
          </p>
        </motion.div>
      </GlassCard>
    </motion.div>
  );
};

const OfficeCard: React.FC<{ city: string; address: string; image: string; delay?: number }> = ({
  city,
  address,
  image,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden rounded-3xl"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={city}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Building size={20} />
            <h3 className="text-2xl font-bold">{city}</h3>
          </div>
          <p className="text-white/80 text-sm">{address}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success('Message sent successfully! Our team will reach out shortly.', {
      icon: '🎉',
      duration: 5000,
    });
    setSubmitted(true);
    reset();

    setTimeout(() => setSubmitted(false), 3000);
  };

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600', label: 'Facebook' },
    { icon: Twitter, href: '#', color: 'hover:text-sky-500', label: 'Twitter' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-700', label: 'LinkedIn' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600', label: 'Instagram' },
    { icon: Youtube, href: '#', color: 'hover:text-red-600', label: 'YouTube' },
  ];

  const faqData = [
    {
      question: 'How quickly can I expect a response?',
      answer: 'Our support team typically responds within 2-4 hours during business hours. For urgent matters, please call our 24/7 hotline.'
    },
    {
      question: 'Do you offer enterprise solutions?',
      answer: 'Yes! We offer customized enterprise solutions for businesses of all sizes. Contact our sales team to discuss your specific needs.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, digital wallets (Apple Pay, Google Pay), and bank transfers for enterprise accounts.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use bank-level encryption and are fully compliant with GDPR, CCPA, and other global privacy standards.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-primary-500/10 blur-[150px] rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[10%] w-[600px] h-[600px] bg-violet-500/10 blur-[150px] rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center mb-8"
            >
              <Badge className="bg-primary-500/10 text-primary-600 dark:text-primary-400 px-6 py-2 rounded-full border-primary-500/20 uppercase font-black tracking-widest text-xs">
                <MessageSquare size={14} className="mr-2" />
                Get in Touch
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]"
            >
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-violet-600 to-pink-600">Connect</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-inter leading-relaxed"
            >
              Have a question, feedback, or partnership opportunity? Our dedicated team is here to help you 24/7.
            </motion.p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <ContactCard
              icon={Mail}
              title="Email Support"
              value="support@riderapp.com"
              color="text-blue-600"
              bgColor="bg-blue-500/10"
              href="mailto:support@riderapp.com"
              delay={0}
            />
            <ContactCard
              icon={Phone}
              title="24/7 Hotline"
              value="+1 (800) 555-RIDER"
              color="text-green-600"
              bgColor="bg-green-500/10"
              href="tel:+18005557433"
              delay={0.1}
            />
            <ContactCard
              icon={MapPin}
              title="Global HQ"
              value="San Francisco, CA"
              color="text-red-600"
              bgColor="bg-red-500/10"
              delay={0.2}
            />
            <ContactCard
              icon={Clock}
              title="Office Hours"
              value="Mon-Fri, 9AM-6PM PST"
              color="text-violet-600"
              bgColor="bg-violet-500/10"
              delay={0.3}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl font-bold dark:text-white mb-6 flex items-center gap-3">
                  <Users className="text-primary-500" />
                  Quick Links
                </h2>
                <div className="space-y-4">
                  <GlassCard className="p-6 border-slate-200/50 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-all group cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-primary-500/10">
                          <Users className="text-primary-600" size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold dark:text-white">Become a Rider</h3>
                          <p className="text-sm text-slate-500">Start your journey</p>
                        </div>
                      </div>
                      <ArrowRight className="text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6 border-slate-200/50 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-all group cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-orange-500/10">
                          <Briefcase className="text-orange-600" size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold dark:text-white">Drive with Us</h3>
                          <p className="text-sm text-slate-500">Earn on your terms</p>
                        </div>
                      </div>
                      <ArrowRight className="text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6 border-slate-200/50 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-all group cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-violet-500/10">
                          <Briefcase className="text-violet-600" size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold dark:text-white">Enterprise Solutions</h3>
                          <p className="text-sm text-slate-500">For businesses</p>
                        </div>
                      </div>
                      <ArrowRight className="text-slate-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </GlassCard>
                </div>
              </motion.div>

              {/* Partnership CTA */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <GlassCard className="p-8 bg-gradient-to-br from-primary-600 to-violet-700 text-white border-0 relative overflow-hidden">
                  <div className="absolute top-0 right-0 opacity-10">
                    <Heart size={120} />
                  </div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 mb-4">
                      <Sparkles className="text-white" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Partner with Rider</h3>
                    <p className="opacity-90 mb-6 text-sm leading-relaxed">
                      Interested in becoming a business partner or joining our driver network? Let's build the future together.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 h-12 rounded-xl font-bold"
                    >
                      Visit Partners Portal
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-lg font-bold dark:text-white mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center w-12 h-12 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 ${social.color} transition-colors`}
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <GlassCard className="p-8 md:p-12 border-slate-200/50 dark:border-slate-800/50 shadow-2xl relative overflow-hidden">
                {/* Success State Overlay */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-white dark:bg-slate-900 z-50 flex items-center justify-center backdrop-blur-sm"
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 mb-6"
                      >
                        <CheckCircle2 className="text-green-600" size={48} />
                      </motion.div>
                      <h3 className="text-3xl font-bold dark:text-white mb-2">Message Sent!</h3>
                      <p className="text-slate-600 dark:text-slate-400">We'll get back to you shortly.</p>
                    </div>
                  </motion.div>
                )}

                <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-3">Send a Message</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-10">
                  Fill out the form below and our team will respond within 24 hours.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Input
                        label="Full Name"
                        placeholder="John Doe"
                        className="h-14 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:border-primary-500 transition-colors"
                        {...register('name', { required: 'Name is required' })}
                        error={errors.name?.message as string}
                      />
                    </div>
                    <div>
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        className="h-14 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:border-primary-500 transition-colors"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                        })}
                        error={errors.email?.message as string}
                      />
                    </div>
                  </div>

                  <div>
                    <Input
                      label="Phone Number (Optional)"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="h-14 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:border-primary-500 transition-colors"
                      {...register('phone')}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Subject
                    </label>
                    <select
                      {...register('subject', { required: 'Please select a subject' })}
                      className="w-full h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 outline-none focus:ring-2 ring-primary-500/20 text-slate-900 dark:text-white font-medium transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Account Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">Partnership Proposal</option>
                      <option value="feedback">Product Feedback</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="text-xs text-red-500 font-bold mt-1">
                        {errors.subject.message as string}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Your Message
                    </label>
                    <textarea
                      rows={6}
                      className="w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-4 outline-none focus:ring-2 ring-primary-500/20 text-slate-900 dark:text-white font-medium resize-none transition-all"
                      placeholder="Tell us how we can help you today..."
                      {...register('message', {
                        required: 'Message cannot be empty',
                        minLength: { value: 10, message: 'Message must be at least 10 characters' }
                      })}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 font-bold mt-1">
                        {errors.message.message as string}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary-500/30 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-3"
                        >
                          <Globe className="h-6 w-6" />
                        </motion.div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-3 h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-slate-900 relative">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 mb-6">
              <HelpCircle className="text-primary-600" size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold dark:text-white mb-4">
              Our <span className="text-primary-600">Global Offices</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Visit us at any of our locations worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <OfficeCard
              city="San Francisco"
              address="77 Innovation Way, CA 94103"
              image="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=800"
              delay={0}
            />
            <OfficeCard
              city="New York"
              address="123 Broadway St, NY 10001"
              image="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800"
              delay={0.1}
            />
            <OfficeCard
              city="London"
              address="45 Tech Square, EC2A 4DN"
              image="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-violet-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join millions of satisfied riders and drivers. Download the app today and get 50% off your first ride!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="h-16 px-12 rounded-2xl text-lg bg-white text-primary-600 hover:bg-slate-50 shadow-xl group"
              >
                Download App
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-16 px-12 rounded-2xl text-lg bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
