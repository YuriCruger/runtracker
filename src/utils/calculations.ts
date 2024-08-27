import { LatLng } from "react-native-maps";

type CoordinateProps = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

export function calculatePacePerKm(elapsedTime: number, totalDistance: number) {
  if (totalDistance === 0) return 0;

  const pace = elapsedTime / 60 / totalDistance;
  return pace;
}

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

    totalDistance += calculateGeographicalDistance(lat1, lon1, lat2, lon2);
  }

  return totalDistance;
}

export function calculateGeographicalDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  // Radius of Earth in km
  const R = 6371;

  // Convert latitude and longitude from degrees to radians
  const lat1Rad = lat1 * (Math.PI / 180);
  const lon1Rad = lon1 * (Math.PI / 180);
  const lat2Rad = lat2 * (Math.PI / 180);
  const lon2Rad = lon2 * (Math.PI / 180);

  // Difference in coordinates
  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;

  // calculateGeographicalDistance formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}
