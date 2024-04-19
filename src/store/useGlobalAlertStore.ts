import create from 'zustand';

interface State {
  isOpen: boolean;
  title: string;
  description: string;
  openAlert: (title: string, description: string) => void;
  closeAlert: () => void;
}

export const useGlobalAlertStore = create<State>((set) => ({
  isOpen: false,
  title: '',
  description: '',
  openAlert: (title, description) => set({ isOpen: true, title, description }),
  closeAlert: () => set({ isOpen: false }),
}));
