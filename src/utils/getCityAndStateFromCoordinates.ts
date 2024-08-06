import { reverseGeocodeAsync } from "expo-location";
import { LatLng } from "react-native-maps";

export type CityAndStateResponse = {
  city: string | null;
  state: string | null;
};

export async function getCityAndStateFromCoordinates({
  latitude,
  longitude,
}: LatLng): Promise<CityAndStateResponse | undefined> {
  try {
    const response = await reverseGeocodeAsync({ latitude, longitude });

    return { city: response[0].subregion, state: response[0].region };
  } catch (error) {
    console.log(error);
  }
}
