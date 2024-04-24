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
    id: string;
    optionName: string;
    price: number;
    scheduledCount: number;
    soldCount: number;
  }[];
  eventCreationDate: Date;
  status?: string;
}

export type FilterType = '카테고리' | '가격';
export type PriceFilterType = '전체' | '무료' | '유료';
