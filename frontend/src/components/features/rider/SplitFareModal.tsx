import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Users, Plus, X, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface SplitFareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SplitFareModal = ({ isOpen, onClose }: SplitFareModalProps) => {
  const [friends, setFriends] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addFriend = () => {
    if (input && input.includes('@')) {
      setFriends([...friends, input]);
      setInput('');
    } else {
      toast.error('Please enter a valid email');
    }
  };

  const removeFriend = (index: number) => {
    setFriends(friends.filter((_, i) => i !== index));
  };

  const handleSplit = () => {
    if (friends.length === 0) return;
    toast.success(`Fare split request sent to ${friends.length} friends!`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Split Fare">
      <div className="space-y-6">
        <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-xl flex items-center gap-3">
          <div className="bg-primary-100 dark:bg-primary-900/40 p-2 rounded-full">
            <Users className="text-primary-600 dark:text-primary-400" size={20} />
          </div>
          <div>
            <h4 className="font-bold text-primary-900 dark:text-primary-100">Share the cost</h4>
            <p className="text-xs text-primary-700 dark:text-primary-300">Split the total fare equally with your co-riders.</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Add Friends</label>
          <div className="flex gap-2">
            <Input 
              placeholder="Enter email address" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addFriend()}
            />
            <Button onClick={addFriend} variant="secondary">
              <Plus size={20} />
            </Button>
          </div>
        </div>

        {friends.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-gray-500">People to split with:</p>
            <div className="flex flex-wrap gap-2">
              {friends.map((friend, i) => (
                <div key={i} className="bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
                  <span>{friend}</span>
                  <button onClick={() => removeFriend(i)} className="text-gray-500 hover:text-red-500">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button onClick={handleSplit} className="w-full" disabled={friends.length === 0}>
          <Share2 className="mr-2 h-4 w-4" /> Send Requests
        </Button>
      </div>
    </Modal>
  );
};
