import { EventType } from '@/types/event';

/**
 * 이벤트 객체를 기반으로 현재의 이벤트 상태를 계산합니다.
 *
 * @param {EventType} event - 이벤트 객체, 각 이벤트의 시작, 종료, 등록 시작 및 종료 시간, 그리고 티켓 옵션 정보를 포함.
 * @returns {string} 이벤트의 현재 상태를 나타내는 문자열. 가능한 값은 '모집 준비', '모집 진행', '모집 마감', '행사 진행', '행사 종료', '상태 확인 필요'입니다.
 *
 * @description
 * 이 함수는 다음과 같은 로직을 사용하여 이벤트의 상태를 결정합니다:
 * - 현재 날짜가 이벤트의 등록 시작일 이전인 경우 '모집 준비'.
 * - 현재 날짜가 등록 기간 중이고 아직 모든 티켓이 팔리지 않은 경우 '모집 진행'.
 * - 등록 기간이 끝났거나 모든 티켓이 팔린 경우 '모집 마감'.
 * - 이벤트 기간 중인 경우 '행사 진행'.
 * - 이벤트가 종료된 경우 '행사 종료'.
 * - 기타 상황에서는 '상태 확인 필요'.
 *
 * 이 로직은 이벤트의 등록 및 진행 상황을 정확하게 반영하여 사용자에게 적절한 정보를 제공합니다.
 */
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
  if (now >= startDateTime && now <= endDateTime) {
    return '행사 진행';
  }
  if (now > endDateTime) {
    return '행사 종료';
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
  return '상태 확인 필요';
}
