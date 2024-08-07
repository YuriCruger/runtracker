import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCATIONS_STORAGE = "@run-tracker:locations";

type LocationProps = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

export async function storageLocationsGet() {
  const storage = await AsyncStorage.getItem(LOCATIONS_STORAGE);

  const data: LocationProps[] = storage ? JSON.parse(storage) : [];

  return data;
}

export async function storageLocationsSave(newLocation: LocationProps) {
  const storage = await storageLocationsGet();

  storage.push(newLocation);

  await AsyncStorage.setItem(LOCATIONS_STORAGE, JSON.stringify(storage));
}

export async function storageLocationsDelete() {
  await AsyncStorage.removeItem(LOCATIONS_STORAGE);
}
