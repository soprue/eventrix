import { Timestamp } from 'firebase/firestore/lite';

export interface LikedEvent {
  id: string;
  eventId: string;
  userId: string;
  likedAt: Timestamp;
}
