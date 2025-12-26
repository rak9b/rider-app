import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { CheckSquare, Fuel, FileCheck, Car, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

interface OnlineChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const OnlineChecklistModal = ({ isOpen, onClose, onConfirm }: OnlineChecklistModalProps) => {
  const [checks, setChecks] = useState({
    mask: false,
    fuel: false,
    clean: false,
    docs: false
  });

  const allChecked = Object.values(checks).every(Boolean);

  const handleConfirm = () => {
    if (allChecked) {
      onConfirm();
      onClose();
      // Reset for next time
      setChecks({ mask: false, fuel: false, clean: false, docs: false });
    } else {
      toast.error("Please complete all safety checks");
    }
  };

  const CheckItem = ({ id, label, icon: Icon, checked, onChange }: any) => (
    <div 
      onClick={() => onChange(!checked)}
      className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
        checked 
          ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
          : 'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800'
      }`}
    >
      <div className={`p-2 rounded-full mr-4 ${
        checked ? 'bg-green-100 dark:bg-green-900/40 text-green-600' : 'bg-gray-100 dark:bg-slate-700 text-gray-500'
      }`}>
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <h4 className={`font-bold text-sm ${checked ? 'text-green-800 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
          {label}
        </h4>
      </div>
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
        checked ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 dark:border-gray-600'
      }`}>
        {checked && <CheckSquare size={14} />}
      </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Safety Checklist">
      <div className="space-y-6">
        <div className="text-center mb-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Before going online, please verify that you meet all safety and quality standards.
          </p>
        </div>

        <div className="space-y-3">
          <CheckItem 
            id="clean" 
            label="Vehicle is clean and sanitized" 
            icon={Car} 
            checked={checks.clean} 
            onChange={(val: boolean) => setChecks({...checks, clean: val})} 
          />
          <CheckItem 
            id="fuel" 
            label="Sufficient fuel/charge for trips" 
            icon={Fuel} 
            checked={checks.fuel} 
            onChange={(val: boolean) => setChecks({...checks, fuel: val})} 
          />
          <CheckItem 
            id="docs" 
            label="License & Insurance documents carried" 
            icon={FileCheck} 
            checked={checks.docs} 
            onChange={(val: boolean) => setChecks({...checks, docs: val})} 
          />
          <CheckItem 
            id="mask" 
            label="I am healthy and fit to drive" 
            icon={ShieldCheck} 
            checked={checks.mask} 
            onChange={(val: boolean) => setChecks({...checks, mask: val})} 
          />
        </div>

        <Button 
          onClick={handleConfirm} 
          className="w-full h-12 text-lg" 
          disabled={!allChecked}
        >
          Confirm & Go Online
        </Button>
      </div>
    </Modal>
  );
};
