import { EventType } from '@/types/event';
import { EventFormValues } from '@/types/form';
import formatTime from '../formatTime';

/**
 * Firestore에서 가져온 이벤트 데이터를 폼 입력 값으로 변환합니다.
 *
 * 이 함수는 Firestore 이벤트 문서의 데이터를 UI 폼에서 사용할 수 있는 형식으로 매핑합니다.
 * 이 과정에서 일부 데이터는 추가적인 변환을 거쳐 처리됩니다 (예: Timestamp를 Date 객체로).
 *
 * @param {EventType} eventData - Firestore에서 가져온 이벤트 데이터.
 * @returns {EventFormValues} 폼 입력에 사용될 데이터 객체.
 *
 * @example
 * const formData = transformEventDataToFormValues(eventData);
 * console.log(formData);
 */
export default function transformEventDataToFormValues(
  eventData: EventType,
): EventFormValues {
  return {
    organizerUID: eventData.organizerUID,
    thumbnail: eventData.thumbnail, // Blob 형태로 변환 필요할 경우 별도 로직 구현
    smallThumbnail: eventData.smallThumbnail,
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
