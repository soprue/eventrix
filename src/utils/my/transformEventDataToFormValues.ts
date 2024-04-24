import { Timestamp } from 'firebase/firestore';

import { EventType } from '@/types/event';
import { EventFormValues } from '@/types/form';

// 이벤트 데이터를 폼 데이터로 변환하는 함수
export default function transformEventDataToFormValues(
  eventData: EventType,
): EventFormValues {
  return {
    organizerUID: eventData.organizerUID,
    thumbnail: eventData.thumbnail, // Blob 형태로 변환 필요할 경우 별도 로직 구현
    name: eventData.name,
    startDate: eventData.startDateTime.toDate(),
    startTime: formatTime(eventData.startDateTime),
    endDate: eventData.endDateTime.toDate(),
    endTime: formatTime(eventData.endDateTime),
    category: eventData.category,
    location: eventData.location,
    registrationStartDate: eventData.registrationStart.toDate(),
    registrationStartTime: formatTime(eventData.registrationStart),
    registrationEndDate: eventData.registrationEnd.toDate(),
    registrationEndTime: formatTime(eventData.registrationEnd),
    description: eventData.description,
    tickets: eventData.ticketOptions.map(ticket => ({
      id: ticket.id,
      name: ticket.optionName,
      price: ticket.price,
      quantity: ticket.scheduledCount,
    })),
  };
}

// 시간을 'HH:mm' 형식으로 변환
function formatTime(date: Timestamp): string {
  const d = date.toDate() as Date;
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}
