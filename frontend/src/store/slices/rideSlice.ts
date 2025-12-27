import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';

export type RideStatus = 'idle' | 'searching' | 'accepted' | 'arriving' | 'in-progress' | 'completed';

interface Driver {
  id: string;
  name: string;
  rating: number;
  vehicle: string;
  plate: string;
  avatar: string;
  phone: string;
}

interface RideState {
  status: RideStatus;
  pickup: string | null;
  destination: string | null;
  fare: string | null;
  driver: Driver | null;
  eta: number; // in minutes
  progress: number; // 0-100
}

const initialState: RideState = {
  status: 'idle',
  pickup: null,
  destination: null,
  fare: null,
  driver: null,
  eta: 0,
  progress: 0,
};

const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {
    startSearch: (state, action: PayloadAction<{ pickup: string; destination: string; fare: string }>) => {
      state.status = 'searching';
      state.pickup = action.payload.pickup;
      state.destination = action.payload.destination;
      state.fare = action.payload.fare;
      state.progress = 0;
    },
    driverFound: (state) => {
      state.status = 'accepted';
      state.driver = {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        rating: 4.9,
        vehicle: 'Tesla Model 3',
        plate: 'VLX-2024',
        avatar: faker.image.avatar(),
        phone: faker.phone.number(),
      };
      state.eta = 5;
      state.progress = 10;
    },
    updateStatus: (state, action: PayloadAction<{ status: RideStatus; progress: number; eta?: number }>) => {
      state.status = action.payload.status;
      state.progress = action.payload.progress;
      if (action.payload.eta !== undefined) state.eta = action.payload.eta;
    },
    resetRide: () => {
      return initialState;
    },
  },
});

export const { startSearch, driverFound, updateStatus, resetRide } = rideSlice.actions;
export default rideSlice.reducer;
