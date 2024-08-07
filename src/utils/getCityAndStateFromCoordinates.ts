import { reverseGeocodeAsync } from "expo-location";
import { LatLng } from "react-native-maps";
import { LocationSchemaProps } from "@/libs/realm/schemas/Location";

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
