export type CartItemType = {
  eventId: string;
  eventName: string;
  ticketId: string;
  name: string;
  price: number;
  quantity: number;
};

export type CartGroupType = {
  eventId: string;
  eventName: string;
  tickets: CartItemType[];
};
