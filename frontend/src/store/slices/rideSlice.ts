import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const DEFAULT_DRIVER: Driver = {
  id: '507f1f77bcf86cd799439012',
  name: 'Mike Driver',
  rating: 4.9,
  vehicle: 'Toyota Camry 2022',
  plate: 'ABC-1234',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  phone: '+1 (555) 200-0002',
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
    driverFound: (state, action: PayloadAction<Driver | undefined>) => {
      state.status = 'accepted';
      state.driver = action.payload || DEFAULT_DRIVER;
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
