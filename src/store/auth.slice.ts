import { StateCreator } from 'zustand';

export interface AuthSlice {
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  clearAuthSlice: () => void;
}

const initialState = {
  isAuthenticated: false,
};

export const createAuthSlice: StateCreator<AuthSlice> = (set, get) => ({
  ...initialState,
  setAuthenticated: (isAuthenticated) => {
    set({ isAuthenticated });
  },
  clearAuthSlice: () => {
    set({ ...initialState });
  },
});
