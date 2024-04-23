export default function formatTimeForDisplay(timeString: string) {
  const [hours, minutes] = timeString.split(':');
  const hourNumber = parseInt(hours, 10);
  const period = hourNumber < 12 ? '오전' : '오후';
  const formattedHour = hourNumber % 12 === 0 ? 12 : hourNumber % 12; // 12시간제로 변환
  return `${period} ${String(formattedHour).padStart(2, '0')}:${minutes.padStart(2, '0')}`;
}
