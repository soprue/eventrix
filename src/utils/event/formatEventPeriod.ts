import { Timestamp } from 'firebase/firestore/lite';

/**
 * 시작 타임스탬프와 종료 타임스탬프를 기반으로 이벤트 기간을 포맷하여 반환합니다.
 * 파라미터로 전달되는 startTimestamp와 endTimestamp는 UTC+9(한국 표준시)에 해당하는 Timestamp 객체입니다.
 *
 * @param {Timestamp} startTimestamp - 이벤트의 시작 Timestamp, UTC+9
 * @param {Timestamp} endTimestamp - 이벤트의 종료 Timestamp, UTC+9
 * @returns {string} 포맷된 날짜와 시간을 포함하는 문자열
 *
 * @example
 * const startTimestamp = new Timestamp(...); // 이벤트 시작 Timestamp, UTC+9
 * const endTimestamp = new Timestamp(...); // 이벤트 종료 Timestamp, UTC+9
 * const eventTime = formatEventPeriod(startTimestamp, endTimestamp);
 * console.log(eventTime); // "2024년 4월 26일 금요일 오전 12:00 - 4월 26일 금요일 오전 12:00"
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
