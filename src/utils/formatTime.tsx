import { Timestamp } from 'firebase/firestore';

/**
 * 주어진 Timestamp 객체에서 시간을 'HH:mm' 형식의 문자열로 변환합니다.
 *
 * 이 함수는 Firestore의 Timestamp 객체를 받아 해당 시간을 'HH:mm' 형식으로 포맷팅합니다.
 * 결과는 주로 UI 상에서 시간을 표시할 때 사용됩니다.
 *
 * @param {Timestamp} date - Firebase Firestore의 Timestamp 객체.
 * @returns {string} 'HH:mm' 포맷의 시간 문자열.
 *
 * @example
 * const timeString = formatTime(timestamp);
 * console.log(timeString); // 예: "14:45"
 */
export default function formatTime(date: Timestamp): string {
  const d = date.toDate(); // Timestamp를 JavaScript의 Date 객체로 변환
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}
