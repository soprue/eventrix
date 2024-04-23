export default function combineDateAndTime(startDate: Date, startTime: string) {
  const resultDate = new Date(startDate.getTime());
  const [hours, minutes] = startTime.split(':').map(Number);

  resultDate.setHours(hours);
  resultDate.setMinutes(minutes);

  return resultDate;
}
