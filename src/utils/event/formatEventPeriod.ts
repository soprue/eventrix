import { Timestamp } from 'firebase/firestore/lite';

/**
 * 두 타임스탬프를 사용하여 이벤트의 시작과 종료 시간을 형식화된 문자열로 반환합니다.
 *
 * 이 함수는 두 날짜가 같은 날인지 다른 날인지에 따라 다르게 형식화하여 문자열을 반환합니다.
 * 같은 날인 경우, 날짜 한 번과 시간 범위를 반환합니다.
 * 다른 날인 경우, 시작 날짜와 시간, 종료 날짜와 시간을 포함하는 문자열을 반환합니다.
 *
 * @param {Timestamp} startTimestamp - 이벤트의 시작 시간을 포함하는 Timestamp 객체.
 * @param {Timestamp} endTimestamp - 이벤트의 종료 시간을 포함하는 Timestamp 객체.
 * @returns {string} 형식화된 이벤트 시간 문자열. 각 날짜와 시간을 포함합니다.
 *
 * @example
 * const startTimestamp = new Timestamp(...); // 이벤트 시작 Timestamp
 * const endTimestamp = new Timestamp(...); // 이벤트 종료 Timestamp
 * const eventTime = formatEventPeriod(startTimestamp, endTimestamp);
 * console.log(eventTime); // "2024년 04월 15일 (월) 오전 9:00 - 2024년 04월 16일 (화) 오후 5:00"
 */
export default function formatEventPeriod(
  startTimestamp: Timestamp,
  endTimestamp: Timestamp,
): string {
  const startDate = startTimestamp.toDate();
  const endDate = endTimestamp.toDate();

  // 날짜 포맷터
  const fullDateFormatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  // 시간 포맷터
  const timeFormatter = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const formattedStartDate = fullDateFormatter.format(startDate);
  const formattedStartTime = timeFormatter.format(startDate);

  const partialDateFormatter = new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
  const formattedEndDate = partialDateFormatter.format(endDate);
  const formattedEndTime = timeFormatter.format(endDate);
  return `${formattedStartDate} ${formattedStartTime} - ${formattedEndDate} ${formattedEndTime}`;
}
