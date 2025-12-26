import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'rider' | 'driver' | 'admin' | null;
export type UserStatus = 'active' | 'blocked' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  status: UserStatus;
  isOnline?: boolean; // For drivers
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    toggleOnlineStatus: (state) => {
      if (state.user && state.user.role === 'driver') {
        state.user.isOnline = !state.user.isOnline;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout, updateUser, toggleOnlineStatus } = authSlice.actions;
export default authSlice.reducer;
