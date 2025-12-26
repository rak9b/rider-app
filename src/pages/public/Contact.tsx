import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    toast.success('Message sent successfully! We will get back to you soon.');
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Have questions? We'd love to hear from you.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6 lg:col-span-1">
            {[
              { icon: Mail, title: 'Email', content: 'support@velox.com', desc: 'Our friendly team is here to help.' },
              { icon: MapPin, title: 'Office', content: '123 Innovation Dr, Tech City', desc: 'Come say hello at our HQ.' },
              { icon: Phone, title: 'Phone', content: '+1 (555) 000-0000', desc: 'Mon-Fri from 8am to 5pm.' },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-lg text-primary-600 dark:text-primary-400">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{item.title}</h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">{item.content}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    placeholder="John"
                    {...register('firstName', { required: 'Required' })}
                    error={errors.firstName?.message as string}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Doe"
                    {...register('lastName', { required: 'Required' })}
                    error={errors.lastName?.message as string}
                  />
                </div>
                
                <Input
                  label="Email"
                  type="email"
                  placeholder="john@example.com"
                  {...register('email', { 
                    required: 'Required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                  })}
                  error={errors.email?.message as string}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <textarea
                    rows={6}
                    className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                    placeholder="How can we help you?"
                    {...register('message', { required: 'Message is required' })}
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message as string}</p>}
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
