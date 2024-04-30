import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { CartItemType } from '@/types/cart';

type State = {
  cartItems: CartItemType[];
};

interface Action {
  addToCart: (item: CartItemType) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<State & Action>()(
  persist(
    set => ({
      cartItems: [],
      addToCart: item =>
        set(state => {
          const existingItem = state.cartItems.find(
            cartItem => cartItem.ticketId === item.ticketId,
          );
          if (existingItem) {
            return {
              cartItems: state.cartItems.map(cartItem =>
                cartItem.ticketId === item.ticketId
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem,
              ),
            };
          } else {
            return { cartItems: [...state.cartItems, item] };
          }
        }),
      updateItemQuantity: (itemId, quantity) =>
        set(state => ({
          cartItems: state.cartItems.map(item =>
            item.ticketId === itemId ? { ...item, quantity } : item,
          ),
        })),
      removeFromCart: itemId =>
        set(state => ({
          cartItems: state.cartItems.filter(item => item.ticketId !== itemId),
        })),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
