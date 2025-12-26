import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Input } from '../../components/ui/Input';

const faqs = [
  { q: "How do I become a driver?", a: "Signing up is easy! Just click 'Sign Up', select 'Driver' as your role, and upload the required documents. Once verified, you can start earning immediately." },
  { q: "What payment methods are accepted?", a: "We accept all major credit/debit cards, digital wallets (PayPal, Apple Pay), and cash payments in select regions." },
  { q: "Is Velox safe?", a: "Safety is our top priority. We have 24/7 support, real-time ride tracking, and an SOS emergency button in the app. All drivers undergo background checks." },
  { q: "Can I schedule a ride in advance?", a: "Yes! You can schedule a ride up to 30 days in advance using the 'Schedule Ride' feature on the booking screen." },
  { q: "How is the fare calculated?", a: "Fares are calculated based on distance, time, and current demand. You will always see an estimated fare before you confirm your booking." },
  { q: "What if I leave something in the car?", a: "You can contact your driver directly through the app within 24 hours of the trip, or contact our support team for assistance." },
];

export const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Everything you need to know about Velox.</p>
          
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden transition-all duration-200"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900 dark:text-white">{faq.q}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-primary-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              <div 
                className={`px-6 text-gray-600 dark:text-gray-300 transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {faq.a}
              </div>
            </div>
          ))}
          
          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No results found for "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
