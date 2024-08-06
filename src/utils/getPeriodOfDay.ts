import { convertToTimeZone } from "./convertToTimeZone";

export function getPeriodOfDay(date: Date): string {
  const dateInTimeZone = convertToTimeZone(date);

  const hours = dateInTimeZone.getHours();
  if (hours >= 5 && hours < 12) return "Corrida matinal";
  if (hours >= 12 && hours < 18) return "Corrida vespertina";
  return "Corrida noturna";
}
