import { EventType } from '@/types/Event';
import { Timestamp } from 'firebase/firestore';

export function calculateEventStatus(event: EventType) {
  const now = new Date();
  const startDateTime = toDate(event.startDateTime);
  const endDateTime = toDate(event.endDateTime);
  const registrationStart = toDate(event.registrationStart);
  const registrationEnd = toDate(event.registrationEnd);
  const totalTickets = event.ticketOptions.reduce(
    (sum, option) => sum + option.scheduledCount,
    0,
  );
  const soldTickets = event.ticketOptions.reduce(
    (sum, option) => sum + option.soldCount,
    0,
  );

  if (now < registrationStart) {
    return '모집 준비';
  }
  if (now >= registrationStart && now <= registrationEnd) {
    if (soldTickets < totalTickets) {
      return '모집 진행';
    }
    return '모집 마감';
  }
  if (now > registrationEnd) {
    return '모집 마감';
  }
  if (now >= startDateTime && now <= endDateTime) {
    return '행사 진행';
  }
  if (now > endDateTime) {
    return '행사 종료';
  }
  return '상태 확인 필요';
}

function toDate(date: Date | Timestamp): Date {
  if (date instanceof Date) {
    return date;
  } else {
    return date.toDate();
  }
}
