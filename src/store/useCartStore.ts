import { TicketValues } from '@/types/form';
import { create } from 'zustand';

type State = {
  cartItems: TicketValues[];
};

interface Action {
  addToCart: (item: TicketValues) => void;
}

export const useCartStore = create<State & Action>(set => ({
  cartItems: [],
  addToCart: item =>
    set(state => {
      const existingItem = state.cartItems.find(
        cartItem => cartItem.id === item.id,
      );
      if (existingItem) {
        return { ...state };
      } else {
        return { cartItems: [...state.cartItems, item] };
      }
    }),
}));
