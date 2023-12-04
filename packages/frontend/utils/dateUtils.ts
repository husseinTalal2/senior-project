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
