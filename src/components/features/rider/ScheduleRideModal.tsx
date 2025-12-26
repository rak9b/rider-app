import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Calendar, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface ScheduleRideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleRideModal = ({ isOpen, onClose }: ScheduleRideModalProps) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSchedule = () => {
    if (!date || !time) {
      toast.error('Please select both date and time');
      return;
    }
    toast.success(`Ride scheduled for ${date} at ${time}`, {
      icon: '📅',
      duration: 4000,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule a Ride">
      <div className="space-y-6 pt-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Book a ride up to 30 days in advance. We'll ensure a driver is ready for you.
        </p>
        
        <div className="space-y-4">
          <Input 
            label="Select Date" 
            type="date" 
            icon={<Calendar size={18} />}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
          <Input 
            label="Select Time" 
            type="time" 
            icon={<Clock size={18} />}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            <strong>Note:</strong> Cancellation is free up to 1 hour before the scheduled pickup time.
          </p>
        </div>

        <Button onClick={handleSchedule} className="w-full h-12 text-lg">
          Confirm Schedule
        </Button>
      </div>
    </Modal>
  );
};
