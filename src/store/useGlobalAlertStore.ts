import { create } from 'zustand';

type State = {
  isOpen: boolean;
  title: string;
  description: string;
};

interface Action {
  openAlert: (title: string, description: string) => void;
  closeAlert: () => void;
}

export const useGlobalAlertStore = create<State & Action>(set => ({
  isOpen: false,
  title: '',
  description: '',
  openAlert: (title, description) => set({ isOpen: true, title, description }),
  closeAlert: () => set({ isOpen: false }),
}));
