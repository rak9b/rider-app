import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const stories = [
  { id: 1, title: '50% Off', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=200', viewed: false },
  { id: 2, title: 'Safety', img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=200', viewed: false },
  { id: 3, title: 'New Cities', img: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=200', viewed: true },
  { id: 4, title: 'Premium', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=200', viewed: true },
  { id: 5, title: 'Eco Ride', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=200', viewed: false },
];

export const Stories = () => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {/* Add Story Button */}
      <div className="flex flex-col items-center gap-2 cursor-pointer group min-w-[72px]">
        <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center group-hover:border-primary-500 transition-colors">
          <Plus className="text-gray-400 group-hover:text-primary-500" />
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center text-white border-2 border-white dark:border-slate-900">
            <Plus size={12} />
          </div>
        </div>
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Add Story</span>
      </div>

      {stories.map((story) => (
        <motion.div 
          key={story.id}
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center gap-2 cursor-pointer min-w-[72px]"
        >
          <div className={`p-[2px] rounded-full ${story.viewed ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500'}`}>
            <div className="p-[2px] bg-white dark:bg-slate-900 rounded-full">
              <img 
                src={story.img} 
                alt={story.title} 
                className="w-14 h-14 rounded-full object-cover"
              />
            </div>
          </div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate w-full text-center">
            {story.title}
          </span>
        </motion.div>
      ))}
    </div>
  );
};
