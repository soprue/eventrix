import { Timestamp } from 'firebase/firestore/lite';
import { EventType } from './event';

export interface PurchaseTicketType extends EventType {
  id?: string;
  buyerUID: string;
  buyerNickname?: string;
  buyerPhone?: string;
  eventUID: string;
  orderUID: string;
  ticketOptionName: string;
  quantity: number;
  ticketPrice: number;
  ticketStatus: string;
  purchaseDate: Timestamp;
}
