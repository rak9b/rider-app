import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface CancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const REASONS = [
  "Driver is taking too long",
  "Driver asked to cancel",
  "I changed my plans",
  "Booked by mistake",
  "Found a better route",
  "Other"
];

export const CancellationModal = ({ isOpen, onClose, onConfirm }: CancellationModalProps) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = () => {
    if (!selectedReason) {
      toast.error("Please select a reason");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onConfirm();
      toast.success("Ride cancelled successfully");
      onClose();
      setSelectedReason('');
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cancel Ride">
      <div className="space-y-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl flex gap-3 border border-yellow-100 dark:border-yellow-900/30">
          <AlertCircle className="text-yellow-600 dark:text-yellow-500 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-bold text-yellow-800 dark:text-yellow-400 text-sm">Cancellation Fee</h4>
            <p className="text-xs text-yellow-700 dark:text-yellow-500 mt-1">
              A fee of $5.00 may apply if the driver has already arrived or is close to pickup.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Why are you cancelling?</p>
          <div className="space-y-2">
            {REASONS.map((reason) => (
              <label 
                key={reason}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedReason === reason 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
              >
                <input 
                  type="radio" 
                  name="cancelReason" 
                  className="sr-only"
                  checked={selectedReason === reason}
                  onChange={() => setSelectedReason(reason)}
                />
                <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                  selectedReason === reason ? 'border-red-500' : 'border-gray-400'
                }`}>
                  {selectedReason === reason && <div className="w-2 h-2 rounded-full bg-red-500" />}
                </div>
                <span className={`text-sm ${selectedReason === reason ? 'text-red-700 dark:text-red-400 font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                  {reason}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose} className="flex-1">Keep Ride</Button>
          <Button 
            variant="danger" 
            onClick={handleConfirm} 
            disabled={!selectedReason || isSubmitting}
            isLoading={isSubmitting}
            className="flex-1"
          >
            Cancel Ride
          </Button>
        </div>
      </div>
    </Modal>
  );
};
