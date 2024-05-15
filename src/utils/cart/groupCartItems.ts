import { CartGroupType, CartItemType } from '@/types/cart';

/**
 * 장바구니 항목을 이벤트 ID에 따라 그룹화합니다.
 *
 * @param {CartItemType[]} cartItems - 그룹화할 장바구니 항목 목록입니다.
 * @returns {CartGroupType[]} 이벤트 ID에 따라 그룹화된 장바구니 항목의 배열입니다. 각 그룹은 고유한 이벤트 ID를 가지며,
 * 그룹 내에는 해당 이벤트에 속하는 티켓들이 배열로 저장됩니다.
 */
export default function groupCartItems(
  cartItems: CartItemType[],
): CartGroupType[] {
  return cartItems.reduce<CartGroupType[]>((acc, item) => {
    let group = acc.find(g => g.eventId === item.eventId);

    if (!group) {
      group = {
        eventId: item.eventId,
        eventName: item.eventName,
        tickets: [],
      };
      acc.push(group);
    }

    group.tickets.push({
      eventId: item.eventId,
      eventName: item.eventName,
      ticketId: item.ticketId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    });
    return acc;
  }, []);
}
