import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { CartItemType } from '@/types/cart';

type State = {
  cartItems: CartItemType[];
};

interface Action {
  addToCart: (item: CartItemType) => void;
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
            // 이미 존재하는 티켓의 경우 수량만 업데이트
            return {
              cartItems: state.cartItems.map(cartItem =>
                cartItem.ticketId === item.ticketId
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem,
              ),
            };
          } else {
            // 새 티켓을 장바구니에 추가
            return { cartItems: [...state.cartItems, item] };
          }
        }),
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
