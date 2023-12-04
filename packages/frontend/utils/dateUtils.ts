export function formatTime(dateString: string | undefined) {
  if (dateString) {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return formattedTime;
  }
}

export function formatShortDate(dateString: string | undefined) {
  if (dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      weekday: "short",
    });

    return formattedDate;
  }
}

export function setTimeFromString(dateObject: Date, timeString: string) {
  const [hours, minutes] = timeString
    .split(":")
    .map((x) => parseInt(x.slice(0, 2)));
  const isPM = timeString.toLowerCase().includes("pm");

  // Adjust hours for PM if needed
  if (isPM && hours !== 12) {
    dateObject.setHours(hours + 12);
  } else if (!isPM && hours === 12) {
    dateObject.setHours(0); // Midnight
  } else {
    dateObject.setHours(hours);
  }

  dateObject.setMinutes(minutes);

  return dateObject;
}

export function setAfterHour(date: Date) {
  console.log(date);

  date.setHours(date.getHours() + 1);
  console.log(date);
  return date;
}

interface DateObject {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

export function createDateFromObject(dateObject: DateObject) {
  // Extract properties from the input object
  const { year, month, day } = dateObject;

  // Construct a new Date object
  const generatedDate = new Date(year, month - 1, day); // Note: Months are 0-indexed in JavaScript Dates

  return generatedDate;
}
