import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// Mock Base Query to simulate Node.js + Express Backend
const mockBaseQuery = async (args: any) => {
  const { url, method, body } = args;
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Mock Responses
  if (url === '/auth/login') {
    return { 
      data: { 
        user: { 
          id: '1', 
          name: 'Demo User', 
          email: body.email, 
          role: body.email.includes('driver') ? 'driver' : body.email.includes('admin') ? 'admin' : 'rider',
          status: 'active',
          isOnline: true
        }, 
        token: 'mock-jwt-token' 
      } 
    };
  }

  if (url === '/rides/estimate') {
    return {
      data: {
        fare: faker.finance.amount({ min: 15, max: 50, dec: 2 }),
        distance: '5.2 km',
        duration: '18 mins'
      }
    };
  }

  if (url === '/driver/stats') {
    return {
      data: [
        { name: 'Mon', value: 120 },
        { name: 'Tue', value: 150 },
        { name: 'Wed', value: 180 },
        { name: 'Thu', value: 140 },
        { name: 'Fri', value: 250 },
        { name: 'Sat', value: 300 },
        { name: 'Sun', value: 280 },
      ]
    };
  }

  return { data: {} };
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: mockBaseQuery,
  tagTypes: ['User', 'Ride', 'Driver'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getRideEstimate: builder.mutation({
      query: (details) => ({
        url: '/rides/estimate',
        method: 'POST',
        body: details,
      }),
    }),
    getDriverStats: builder.query({
      query: () => ({ url: '/driver/stats' }),
    }),
  }),
});

export const { useLoginMutation, useGetRideEstimateMutation, useGetDriverStatsQuery } = apiSlice;
