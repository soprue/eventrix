/**
 * 주어진 날짜와 시간 문자열을 결합하여 새로운 Date 객체를 생성합니다.
 *
 * 이 함수는 Date 객체로부터 날짜를 가져오고, 문자열 형식의 시간을 분리하여 해당 날짜에 적용합니다.
 * 이렇게 함으로써 날짜와 시간이 포함된 하나의 Date 객체를 반환할 수 있습니다.
 *
 * @param {Date} startDate - 기초 날짜 정보를 포함하는 Date 객체.
 * @param {string} startTime - 'HH:mm' 형식의 시간 문자열.
 * @returns {Date} 시작 날짜와 시간이 결합된 Date 객체.
 *
 * @example
 * const eventDate = new Date(2024, 3, 15); // 2024년 4월 15일
 * const eventTime = "09:30";
 * const fullEventDate = combineDateAndTime(eventDate, eventTime);
 * console.log(fullEventDate); // 2024년 4월 15일 오전 9시 30분을 나타내는 Date 객체 출력
 */
export default function combineDateAndTime(startDate: Date, startTime: string) {
  const resultDate = new Date(startDate.getTime());
  const [hours, minutes] = startTime.split(':').map(Number);

  resultDate.setHours(hours);
  resultDate.setMinutes(minutes);

  return resultDate;
}
