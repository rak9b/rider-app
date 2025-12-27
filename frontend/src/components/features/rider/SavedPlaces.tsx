import React from 'react';
import { Home, Briefcase, MapPin, Plus } from 'lucide-react';
import { Card, CardContent } from '../../ui/Card';

export const SavedPlaces = ({ onSelect }: { onSelect: (address: string) => void }) => {
  const places = [
    { name: 'Home', address: '123 Main St, Apt 4B', icon: Home, color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' },
    { name: 'Work', address: 'Tech Plaza, Suite 500', icon: Briefcase, color: 'text-orange-500 bg-orange-100 dark:bg-orange-900/30' },
    { name: 'Gym', address: 'FitLife Center, Downtown', icon: MapPin, color: 'text-green-500 bg-green-100 dark:bg-green-900/30' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {places.map((place) => (
        <Card 
          key={place.name} 
          className="cursor-pointer hover:border-primary-500 transition-colors group border-transparent shadow-sm"
          onClick={() => onSelect(place.address)}
        >
          <CardContent className="p-4 flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl ${place.color} group-hover:scale-110 transition-transform`}>
              <place.icon size={18} />
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-gray-900 dark:text-white text-sm">{place.name}</h4>
              <p className="text-xs text-gray-500 truncate">{place.address}</p>
            </div>
          </CardContent>
        </Card>
      ))}
      <Card className="cursor-pointer border-dashed border-2 border-gray-200 dark:border-slate-700 hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-white/5 transition-all shadow-none bg-transparent">
        <CardContent className="p-4 flex items-center justify-center h-full text-gray-500 hover:text-primary-500">
          <Plus size={20} className="mr-2" />
          <span className="text-sm font-medium">Add Place</span>
        </CardContent>
      </Card>
    </div>
  );
};
