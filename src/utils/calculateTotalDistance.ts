import { LatLng } from "react-native-maps";
import { haversine } from "./haversine";

export function calculateTotalDistance(coordinates: LatLng[]) {
  let totalDistance = 0;

  if (coordinates.length < 2) {
    return totalDistance;
  }

  for (let i = 1; i < coordinates.length; i++) {
    const { latitude: lat1, longitude: lon1 } = coordinates[i - 1];
    const { latitude: lat2, longitude: lon2 } = coordinates[i];

    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
      continue;
    }

    totalDistance += haversine(lat1, lon1, lat2, lon2);
  }

  return totalDistance;
}
