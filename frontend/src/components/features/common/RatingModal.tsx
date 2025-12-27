import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  driverName: string;
}

export const RatingModal = ({ isOpen, onClose, driverName }: RatingModalProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = () => {
    toast.success('Thank you for your feedback!');
    onClose();
    setRating(0);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rate Your Trip">
      <div className="text-center space-y-6 py-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">How was your ride with {driverName}?</h3>
          <p className="text-gray-500 text-sm">Your feedback helps us improve.</p>
        </div>

        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="transition-transform hover:scale-110 focus:outline-none"
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
            >
              <Star
                size={32}
                className={`${
                  star <= (hover || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                } transition-colors`}
              />
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <textarea
            className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-3 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
            placeholder="Add a comment (optional)..."
            rows={3}
          />
          <Button onClick={handleSubmit} className="w-full" disabled={rating === 0}>
            Submit Review
          </Button>
        </div>
      </div>
    </Modal>
  );
};
