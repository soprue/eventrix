import { Timestamp } from 'firebase/firestore/lite';

/**
 * 단일 타임스탬프를 사용하여 날짜와 시간을 형식화된 문자열로 반환합니다.
 *
 * @param {Timestamp} timestamp - 날짜와 시간을 포함하는 Timestamp 객체.
 * @returns {string} 형식화된 날짜와 시간 문자열.
 */
export default function formatSingleTimestamp(timestamp: Timestamp): string {
  const date = timestamp.toDate();

  // 날짜와 시간을 포함하는 포맷터
  const dateTimeFormatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return dateTimeFormatter.format(date);
}
