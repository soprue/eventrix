const calculateEndTimeOptions = (startDate: Date, startTime: string) => {
  if (!startDate || !startTime) {
    return [];
  }

  const options = [];
  const startHours = parseInt(startTime.split(':')[0], 10);
  const startMinutes = parseInt(startTime.split(':')[1], 10);
  const startDateObj = new Date(startDate);
  startDateObj.setHours(startHours, startMinutes, 0, 0);

  for (let hour = startHours; hour < 24; hour++) {
    for (const minute of [0, 30]) {
      const dateOption = new Date(startDateObj);
      dateOption.setHours(hour, minute, 0);
      if (dateOption >= startDateObj) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        const ampm = hour < 12 ? '오전' : '오후';
        options.push({
          value: timeString,
          label: `${ampm} ${displayHour}시 ${minute}분`,
        });
      }
    }
  }
  return options;
};

export default calculateEndTimeOptions;
