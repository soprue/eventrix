import { Category } from '@constants/categories';

export interface Event {
  uid: string;
  organizerUID: string;
  thumbnail: string;
  name: string;
  category: Category;
  startDateTime: string;
  endDateTime: string;
  registrationStart: string;
  registrationEnd: string;
  locationName: string;
  locationAddress: string;
  description: string;
  likesCount: number;
  ticketOptions: {
    optionName: string;
    price: number;
    maxPurchaseLimit: number;
    scheduledCount: number;
    soldCount: number;
  }[];
  eventCreationDate: string;
}
