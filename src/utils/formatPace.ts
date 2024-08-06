export const formatPace = (pace: number) => {
  const minutes = Math.floor(pace);
  const seconds = Math.round((pace % 1) * 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
