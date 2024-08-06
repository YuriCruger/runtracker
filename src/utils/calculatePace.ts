export function calculatePacePerKm(elapsedTime: number, totalDistance: number) {
  if (totalDistance === 0) return 0;

  const pace = elapsedTime / 60 / totalDistance;
  return pace;
}
