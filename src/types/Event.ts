import { Timestamp } from 'firebase/firestore';

import { Category } from '@constants/categories';

export interface EventType {
  uid?: string;
  organizerUID: string;
  thumbnail: string;
  name: string;
  category: Category;
  startDateTime: Timestamp;
  endDateTime: Timestamp;
  registrationStart: Timestamp;
  registrationEnd: Timestamp;
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
  eventCreationDate: Timestamp;
  status?: string;
}

export type FilterType = '카테고리' | '가격';
export type PriceFilterType = '전체' | '무료' | '유료';
