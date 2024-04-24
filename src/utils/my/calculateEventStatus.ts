import { EventType } from '@/types/event';

export default function calculateEventStatus(event: EventType) {
  const now = new Date();
  const startDateTime = event.startDateTime.toDate();
  const endDateTime = event.endDateTime.toDate();
  const registrationStart = event.registrationStart.toDate();
  const registrationEnd = event.registrationEnd.toDate();
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
