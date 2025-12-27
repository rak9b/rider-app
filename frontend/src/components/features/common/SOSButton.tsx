import React, { useState } from 'react';
import { AlertTriangle, Phone, Share2, ShieldAlert } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Modal } from '../../ui/Modal';
import toast from 'react-hot-toast';

export const SOSButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmergencyAction = (action: string) => {
    // In a real app, this would integrate with navigator.geolocation
    // and backend services (Twilio/EmailJS)
    toast.success(`${action} initiated. Help is on the way!`, {
      icon: '🚨',
      duration: 5000,
    });
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all hover:scale-110 animate-pulse"
        aria-label="Emergency SOS"
      >
        <ShieldAlert size={28} />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="EMERGENCY SOS">
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-100 p-4 rounded-lg mb-4">
            <p className="text-red-800 text-sm font-medium text-center">
              This will notify emergency services and your trusted contacts with your live location.
            </p>
          </div>
          
          <Button 
            variant="danger" 
            className="w-full h-14 text-lg font-bold"
            onClick={() => handleEmergencyAction('Police Alert')}
          >
            <AlertTriangle className="mr-2" />
            CALL POLICE (911)
          </Button>

          <Button 
            variant="outline" 
            className="w-full h-12 border-red-200 text-red-700 hover:bg-red-50"
            onClick={() => handleEmergencyAction('Emergency Contacts Notified')}
          >
            <Phone className="mr-2" />
            Notify Emergency Contacts
          </Button>

          <Button 
            variant="outline" 
            className="w-full h-12"
            onClick={() => handleEmergencyAction('Live Location Shared')}
          >
            <Share2 className="mr-2" />
            Share Live Location
          </Button>
        </div>
      </Modal>
    </>
  );
};
