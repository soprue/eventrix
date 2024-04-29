import { CartGroupType, CartItemType } from '@/types/cart';

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
