/**
 * 주어진 24시간 형식의 시간 문자열을 12시간 형식으로 변환합니다.
 *
 * @param {string} timeString 24시간 형식("HH:mm")의 시간 문자열.
 * @returns {string} 12시간 형식("오전/오후 hh:mm")으로 변환된 시간 문자열.
 *
 * @example
 * formatTimeTo12HourClock("13:20"); // "오후 01:20"
 * formatTimeTo12HourClock("02:05"); // "오전 02:05"
 */
export default function formatTimeTo12HourClock(timeString: string) {
  const [hours, minutes] = timeString.split(':');
  const hourNumber = parseInt(hours, 10);
  const period = hourNumber < 12 ? '오전' : '오후';
  const formattedHour = hourNumber % 12 === 0 ? 12 : hourNumber % 12; // 12시간제로 변환
  return `${period} ${String(formattedHour).padStart(2, '0')}:${minutes.padStart(2, '0')}`;
}
