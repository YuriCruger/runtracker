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
