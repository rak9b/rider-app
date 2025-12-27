import React from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Star, ThumbsUp } from 'lucide-react';
import { faker } from '@faker-js/faker';

const generateReviews = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    rider: faker.person.fullName(),
    avatar: faker.image.avatar(),
    rating: faker.number.int({ min: 3, max: 5 }),
    comment: faker.lorem.sentence(),
    date: faker.date.recent().toLocaleDateString(),
    helpful: faker.number.int({ min: 0, max: 10 }),
  }));
};

export const DriverReviews = () => {
  const reviews = generateReviews(8);
  const averageRating = 4.8;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Reviews</h1>
          <p className="text-gray-500 dark:text-gray-400">See what riders are saying about you.</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-end gap-2">
            {averageRating} <Star className="text-yellow-400 fill-yellow-400" size={28} />
          </div>
          <p className="text-sm text-gray-500">Average Rating</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <Card key={review.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img src={review.avatar} alt={review.rider} className="w-10 h-10 rounded-full" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{review.rider}</h4>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                "{review.comment}"
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-gray-100 dark:border-slate-800 pt-3">
                <button className="flex items-center gap-1 hover:text-primary-500 transition-colors">
                  <ThumbsUp size={14} /> Helpful ({review.helpful})
                </button>
                <button className="hover:text-primary-500 transition-colors">
                  Report
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
