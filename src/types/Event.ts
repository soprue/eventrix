import { Category } from '@constants/categories';

export interface EventType {
  uid?: string;
  organizerUID: string;
  thumbnail: string | File;
  name: string;
  category: Category;
  startDateTime: Date;
  endDateTime: Date;
  registrationStart: Date;
  registrationEnd: Date;
  location: string;
  description: string;
  likesCount: number;
  ticketOptions: {
    optionName: string;
    price: number;
    scheduledCount: number;
    soldCount: number;
  }[];
  eventCreationDate: Date;
}
