import { toZonedTime } from "date-fns-tz";

// const getTimeZone = () => {
//   return Intl.DateTimeFormat().resolvedOptions().timeZone;
// };
// TODO: Rever o userTimeZone com dispositivo fisico

export function convertToTimeZone(date: Date) {
  // const userTimeZone = getTimeZone();
  const brTimeZone = "America/Sao_Paulo";

  const dateInTimeZone = toZonedTime(date, brTimeZone);

  return dateInTimeZone;
}
