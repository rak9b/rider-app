import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { Thermometer, MessageSquare, Briefcase, Music } from 'lucide-react';
import { cn } from '../../../lib/utils';
import toast from 'react-hot-toast';

interface RidePreferencesProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RidePreferences = ({ isOpen, onClose }: RidePreferencesProps) => {
  const [preferences, setPreferences] = useState({
    temp: 'normal',
    chat: 'any',
    luggage: false,
    music: false
  });

  const handleSave = () => {
    toast.success('Preferences saved for your next ride!');
    onClose();
  };

  const Option = ({ icon: Icon, label, active, onClick }: any) => (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 gap-2",
        active 
          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300" 
          : "border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 text-gray-600 dark:text-gray-400"
      )}
    >
      <Icon size={24} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ride Preferences">
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-900 dark:text-white mb-3 block">Temperature</label>
          <div className="grid grid-cols-3 gap-3">
            <Option 
              icon={Thermometer} 
              label="Cool" 
              active={preferences.temp === 'cool'} 
              onClick={() => setPreferences({...preferences, temp: 'cool'})} 
            />
            <Option 
              icon={Thermometer} 
              label="Normal" 
              active={preferences.temp === 'normal'} 
              onClick={() => setPreferences({...preferences, temp: 'normal'})} 
            />
            <Option 
              icon={Thermometer} 
              label="Warm" 
              active={preferences.temp === 'warm'} 
              onClick={() => setPreferences({...preferences, temp: 'warm'})} 
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-900 dark:text-white mb-3 block">Conversation</label>
          <div className="grid grid-cols-3 gap-3">
            <Option 
              icon={MessageSquare} 
              label="Quiet" 
              active={preferences.chat === 'quiet'} 
              onClick={() => setPreferences({...preferences, chat: 'quiet'})} 
            />
            <Option 
              icon={MessageSquare} 
              label="Open to Chat" 
              active={preferences.chat === 'chatty'} 
              onClick={() => setPreferences({...preferences, chat: 'chatty'})} 
            />
            <Option 
              icon={MessageSquare} 
              label="No Preference" 
              active={preferences.chat === 'any'} 
              onClick={() => setPreferences({...preferences, chat: 'any'})} 
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-900 dark:text-white mb-3 block">Extras</label>
          <div className="grid grid-cols-2 gap-3">
            <Option 
              icon={Briefcase} 
              label="Luggage Help" 
              active={preferences.luggage} 
              onClick={() => setPreferences({...preferences, luggage: !preferences.luggage})} 
            />
            <Option 
              icon={Music} 
              label="My Music" 
              active={preferences.music} 
              onClick={() => setPreferences({...preferences, music: !preferences.music})} 
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">Save Preferences</Button>
      </div>
    </Modal>
  );
};
