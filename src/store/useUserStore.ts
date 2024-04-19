import create from 'zustand';
import { persist } from 'zustand/middleware';

import { UserType } from '@/types/User';

type State = {
  user: UserType | null;
};

interface Action {
  setUser: (user: UserType | null) => void;
}

export const useUserStore = create<State & Action>()(
  persist(
    (set) => {
      const store = {
        user: null,
        setUser: (user: UserType | null) => set(() => ({ user })),
      };
      return store;
    },
    {
      name: 'user-store',
      getStorage: () => localStorage,
    },
  ),
);
