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
  ticketOptions: TicketType[];
  eventCreationDate: Timestamp;
  status?: string;
}

export interface TicketType {
  id: string;
  optionName: string;
  price: number;
  scheduledCount: number;
  soldCount: number;
}

export type FilterType = '카테고리' | '가격';
export type PriceFilterType = '전체' | '무료' | '유료';
export type SortFilterType = '최신순' | '인기순';
