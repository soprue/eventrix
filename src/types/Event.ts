import { Category } from '@constants/categories';
import { Timestamp } from 'firebase/firestore';

export interface EventType {
  uid?: string;
  organizerUID: string;
  thumbnail: string | File;
  name: string;
  category: Category;
  startDateTime: Date | Timestamp;
  endDateTime: Date | Timestamp;
  registrationStart: Date | Timestamp;
  registrationEnd: Date | Timestamp;
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
  status?: string;
}
