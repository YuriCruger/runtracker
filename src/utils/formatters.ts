import { isToday, isYesterday, format } from "date-fns";
import { convertToTimeZone } from "./convertToTimeZone";

export const formatDate = (date: Date) => {
  const dateInTimeZone = convertToTimeZone(date);

  if (isToday(dateInTimeZone)) {
    return `Hoje às ${format(dateInTimeZone, "HH:mm")}`;
  } else if (isYesterday(dateInTimeZone)) {
    return `Ontem às ${format(dateInTimeZone, "HH:mm")}`;
  } else {
    return `${format(dateInTimeZone, "dd [de] MMMM [às] HH:mm")}`;
  }
};

export const formatPace = (pace: number) => {
  const minutes = Math.floor(pace);
  const seconds = Math.round((pace % 1) * 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
