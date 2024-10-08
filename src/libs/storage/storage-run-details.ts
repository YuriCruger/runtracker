import AsyncStorage from "@react-native-async-storage/async-storage";

const RUN_DETAILS_STORAGE = "@run-tracker:run-details";

export type RunDetails = {
  elapsedTime: string;
  distance: string;
  pace: string;
};

export async function storageRunDetailsSave(runDetails: RunDetails) {
  await AsyncStorage.setItem(RUN_DETAILS_STORAGE, JSON.stringify(runDetails));
}

export async function storageRunDetailsGet() {
  const storage = await AsyncStorage.getItem(RUN_DETAILS_STORAGE);

  const data: RunDetails = storage ? JSON.parse(storage) : [];

  return data;
}

export async function storageRunDetailsDelete() {
  await AsyncStorage.removeItem(RUN_DETAILS_STORAGE);
}
