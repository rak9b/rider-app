import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  onSuccess: () => void;
}

export const PaymentModal = ({ isOpen, onClose, amount, onSuccess }: PaymentModalProps) => {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
        onClose();
        setStep('details');
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

            <div className="space-y-4">
              <Input label="Card Number" placeholder="0000 0000 0000 0000" icon={<CreditCard size={18} />} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry Date" placeholder="MM/YY" />
                <Input label="CVC" placeholder="123" type="password" />
              </div>
              <Input label="Cardholder Name" placeholder="John Doe" />
            </div>

            <div className="flex items-center text-xs text-gray-500 gap-2 justify-center">
              <Lock size={12} />
              Payments secured by Stripe
            </div>

            <Button onClick={handlePay} className="w-full h-12 text-lg bg-[#635BFF] hover:bg-[#534be0] text-white">
              Pay ${amount}
            </Button>
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
