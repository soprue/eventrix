import { Timestamp } from 'firebase/firestore';

export interface LikedEvent {
  id: string;
  eventId: string;
  userId: string;
  likedAt: Timestamp;
}
