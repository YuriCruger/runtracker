import { reverseGeocodeAsync } from "expo-location";
import { LatLng } from "react-native-maps";
import { LocationSchemaProps } from "@/libs";
import { convertToTimeZone } from "./convertToTimeZone";

export async function getCityAndStateFromCoordinates({
  latitude,
  longitude,
}: LatLng): Promise<LocationSchemaProps> {
  try {
    const response = await reverseGeocodeAsync({ latitude, longitude });

    const city = response[0].subregion || "Unknown City";
    const state = response[0].region || "Unknown State";

    return { city, state };
  } catch (error) {
    console.log(error);
    return { city: "Unknown City", state: "Unknown State" };
  }
}

export function getPeriodOfDay(date: Date): string {
  const dateInTimeZone = convertToTimeZone(date);

  const hours = dateInTimeZone.getHours();
  if (hours >= 5 && hours < 12) return "Corrida matinal";
  if (hours >= 12 && hours < 18) return "Corrida vespertina";
  return "Corrida noturna";
}
