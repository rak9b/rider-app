import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Phone, Share2, X, Bell } from 'lucide-react';
import { Button } from './Button';
import GlassCard from './GlassCard';
import toast from 'react-hot-toast';
import { cn } from '../../lib/utils';

interface SOSButtonProps {
    rideId?: string;
    currentLocation?: { lat: number; lng: number };
}

const SOSButton = ({ rideId, currentLocation }: SOSButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleAction = (action: string) => {
        toast.success(`${action} triggered successfully!`);
        // In a real app, this would call an API or use window.location.href = 'tel:...'
        if (action === 'Call Police') {
            // window.location.href = 'tel:911'; 
        }
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-72"
                    >
                        <GlassCard className="p-6 border-red-500/30 bg-red-50/90 dark:bg-red-900/20 shadow-2xl shadow-red-500/20">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-red-700 dark:text-red-400 font-bold flex items-center gap-2">
                                    <AlertCircle size={20} /> Emergency SOS
                                </h3>
                                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <Button
                                    variant="danger"
                                    className="w-full justify-start gap-4 rounded-xl h-12"
                                    onClick={() => handleAction('Call Police')}
                                >
                                    <Phone size={18} /> Call Police (911)
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-4 rounded-xl h-12 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                                    onClick={() => handleAction('Notify Emergency Contacts')}
                                >
                                    <Bell size={18} /> Notify Contacts
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-4 rounded-xl h-12 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                                    onClick={() => handleAction('Share Live Location')}
                                >
                                    <Share2 size={18} /> Share Live Location
                                </Button>
                            </div>

                            <p className="mt-4 text-[10px] text-red-600/60 dark:text-red-400/60 text-center font-medium">
                                Standard call rates may apply. Your location will be shared with emergency services.
                            </p>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "h-16 w-16 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300",
                    isOpen ? "bg-slate-800 text-white" : "bg-red-600 text-white animate-pulse"
                )}
            >
                {isOpen ? <X size={28} /> : <AlertCircle size={28} />}
            </motion.button>
        </div>
    );
};

export default SOSButton;
