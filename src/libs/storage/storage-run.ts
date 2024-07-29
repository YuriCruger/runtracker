import AsyncStorage from "@react-native-async-storage/async-storage";

const RUN_STORAGE = "@run-tracker:run";

export async function storageRunSave({ data }: any) {
  await AsyncStorage.setItem(RUN_STORAGE, JSON.stringify(data));
}

export async function storageRunGet() {
  const response = await AsyncStorage.getItem(RUN_STORAGE);

  const data = response ? JSON.parse(response) : {};

  return data;
}

export async function storageRunDelete() {
  await AsyncStorage.removeItem(RUN_STORAGE);
}
