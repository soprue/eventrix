import { Timestamp } from 'firebase/firestore';
import { EventType } from './event';

export interface PurchaseTicketType extends EventType {
  id?: string;
  buyerUID: string;
  eventUID: string;
  orderUID: string;
  ticketOptionName: string;
  quantity: number;
  ticketPrice: number;
  ticketStatus: string;
  purchaseDate: Timestamp;
}
