import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Card number must be 16 digits').max(19, 'Invalid card number'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Expiry format must be MM/YY'),
  cvc: z.string().min(3, 'CVC must be 3-4 digits').max(4, 'Invalid CVC'),
  name: z.string().min(2, 'Cardholder name is required'),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  onSuccess: () => void;
}

export const PaymentModal = ({ isOpen, onClose, amount, onSuccess }: PaymentModalProps) => {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      expiry: '',
      cvc: '',
      name: '',
    },
  });

  const onSubmit = (data: PaymentFormData) => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
        onClose();
        setStep('details');
        reset();
      }, 2000);
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Secure Payment">
      <AnimatePresence mode="wait">
        {step === 'details' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl flex justify-between items-center">
              <span className="text-gray-500">Total Amount</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">${amount}</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    {...register('cardNumber')}
                    placeholder="4532 0000 0000 0000"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Expiry Date</label>
                  <input
                    {...register('expiry')}
                    placeholder="12/28"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                  {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">CVC</label>
                  <input
                    type="password"
                    {...register('cvc')}
                    placeholder="123"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                  {errors.cvc && <p className="text-xs text-red-500 mt-1">{errors.cvc.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Cardholder Name</label>
                <input
                  {...register('name')}
                  placeholder="John Doe"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              <div className="flex items-center text-xs text-gray-500 gap-2 justify-center pt-2">
                <Lock size={12} />
                Payments secured by Stripe 256-bit encryption
              </div>

              <Button type="submit" className="w-full h-12 text-lg bg-[#635BFF] hover:bg-[#534be0] text-white">
                Pay ${amount}
              </Button>
            </form>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 space-y-4"
          >
            <div className="w-16 h-16 border-4 border-[#635BFF] border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 dark:text-gray-300 font-medium">Processing Payment...</p>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 space-y-4"
          >
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Payment Successful!</h3>
            <p className="text-gray-500">Your ride has been confirmed.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};
