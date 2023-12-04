import { hookstate } from "@hookstate/core";

const selectedDay = hookstate<Date | null>(null);
const selectedTime = hookstate("");

export const reservationStates = {
  selectedDay,
  selectedTime,
};
