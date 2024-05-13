import { expect } from '@jest/globals';

import { CartItemType } from '@/types/cart.ts';
import groupCartItems from '@utils/cart/groupCartItems';

describe('groupCartItems 유틸리티 함수 테스트', () => {
  it('빈 배열을 받으면 빈 배열을 반환한다.', () => {
    const cartItems: CartItemType[] = [];
    const groupedItems = groupCartItems(cartItems);
    expect(groupedItems).toEqual([]);
  });

  it('하나의 이벤트에 여러 티켓이 있는 경우 올바르게 그룹화되어야 한다', () => {
    const cartItems = [
      {
        eventId: 'event1',
        eventName: '이벤트1',
        ticketId: 't1',
        name: '일반석',
        price: 10000,
        quantity: 1,
      },
      {
        eventId: 'event1',
        eventName: '이벤트1',
        ticketId: 't2',
        name: 'VIP석',
        price: 20000,
        quantity: 2,
      },
    ];

    const expected = [
      {
        eventId: 'event1',
        eventName: '이벤트1',
        tickets: [
          {
            eventId: 'event1',
            eventName: '이벤트1',
            ticketId: 't1',
            name: '일반석',
            price: 10000,
            quantity: 1,
          },
          {
            eventId: 'event1',
            eventName: '이벤트1',
            ticketId: 't2',
            name: 'VIP석',
            price: 20000,
            quantity: 2,
          },
        ],
      },
    ];

    expect(groupCartItems(cartItems)).toEqual(expected);
  });

  it('다양한 이벤트의 티켓들이 입력되었을 때 올바르게 그룹화되어야 함', () => {
    const cartItems = [
      {
        eventId: 'event1',
        eventName: '이벤트1',
        ticketId: 't1',
        name: '일반석',
        price: 10000,
        quantity: 1,
      },
      {
        eventId: 'event2',
        eventName: '이벤트2',
        ticketId: 't2',
        name: '특별석',
        price: 15000,
        quantity: 2,
      },
    ];

    const expected = [
      {
        eventId: 'event1',
        eventName: '이벤트1',
        tickets: [
          {
            eventId: 'event1',
            eventName: '이벤트1',
            ticketId: 't1',
            name: '일반석',
            price: 10000,
            quantity: 1,
          },
        ],
      },
      {
        eventId: 'event2',
        eventName: '이벤트2',
        tickets: [
          {
            eventId: 'event2',
            eventName: '이벤트2',
            ticketId: 't2',
            name: '특별석',
            price: 15000,
            quantity: 2,
          },
        ],
      },
    ];

    expect(groupCartItems(cartItems)).toEqual(expected);
  });
});
