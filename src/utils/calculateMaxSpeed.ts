import { haversine } from "./haversine";

type CoordinateProps = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

export function calculateMaxSpeed(coordinates: CoordinateProps[]): string {
  console.log(coordinates);
  let maxSpeed = 0;

  for (let i = 1; i < coordinates.length; i++) {
    const dist = haversine(
      coordinates[i - 1].latitude,
      coordinates[i - 1].longitude,
      coordinates[i].latitude,
      coordinates[i].longitude
    );

    const timeDiff =
      (coordinates[i].timestamp - coordinates[i - 1].timestamp) / 3600000; // Convert to hours

    if (timeDiff > 0) {
      const speed = dist / timeDiff; // Speed in km/h
      if (speed > maxSpeed) {
        maxSpeed = speed;
      }
    }
  }

  return maxSpeed.toFixed(2).toString();
}
