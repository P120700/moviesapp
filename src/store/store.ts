import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { mmkvStorage } from './storage';
import { StoreTypes } from './types';
import { createAuthSlice } from './auth.slice';

const persistConfig = {
  name: 'mobileapp-storage',
  storage: createJSONStorage(() => mmkvStorage),
  partialize: (state: StoreTypes) => ({
    isAuthenticated: state.isAuthenticated,
  }),
};

export const useStore = create<StoreTypes>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    persistConfig
  )
);
