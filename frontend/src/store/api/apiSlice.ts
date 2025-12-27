import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Ride', 'Driver', 'Admin'],
  endpoints: (builder) => ({
    // Auth
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    // User Profile
    getProfile: builder.query({
      query: () => '/users/profile',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/users/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // Rides
    getRides: builder.query({
      query: (params) => ({
        url: '/rides',
        params,
      }),
      providesTags: ['Ride'],
    }),
    getRideEstimate: builder.mutation({
      query: (details) => ({
        url: '/rides/estimate',
        method: 'POST',
        body: details,
      }),
    }),
    requestRide: builder.mutation({
      query: (details) => ({
        url: '/rides/request',
        method: 'POST',
        body: details,
      }),
      invalidatesTags: ['Ride'],
    }),
    acceptRide: builder.mutation({
      query: (id) => ({
        url: `/rides/${id}/accept`,
        method: 'PUT',
      }),
      invalidatesTags: ['Ride', 'Driver'],
    }),
    updateRideStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/rides/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Ride', 'Driver'],
    }),

    // Driver/Admin Stats
    getDriverStats: builder.query({
      query: () => '/users/driver/stats',
      providesTags: ['Driver'],
    }),
    getAdminAnalytics: builder.query({
      query: () => '/users/admin/analytics',
      providesTags: ['Admin'],
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/users/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetRidesQuery,
  useGetRideEstimateMutation,
  useRequestRideMutation,
  useAcceptRideMutation,
  useUpdateRideStatusMutation,
  useGetDriverStatsQuery,
  useGetAdminAnalyticsQuery,
  useUpdateUserStatusMutation
} = apiSlice;
