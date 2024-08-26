import { storageLocationsDelete, storageLocationsSave } from "@/libs";
import {
  Accuracy,
  hasStartedLocationUpdatesAsync,
  LocationObject,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from "expo-location";
import * as TaskManager from "expo-task-manager";

type MyTaskData = {
  locations?: Array<LocationObject>;
};

const LOCATION_TASK_NAME = "background-location-task";

TaskManager.defineTask<MyTaskData>(
  LOCATION_TASK_NAME,
  async ({ data, error }) => {
    try {
      if (error) {
        throw error;
      }

      if (!data?.locations || data.locations.length === 0) {
        throw new Error("No location data available");
      }

      const { coords, timestamp } = data.locations[0];

      const currentLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        timestamp,
      };

      await storageLocationsSave(currentLocation);
    } catch (error) {
      console.error(error);
      await storageLocationsDelete();
    }
  }
);

export async function startLocationTask() {
  try {
    const hasStarted = await hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

    if (hasStarted) {
      await stopLocationTask();
    }

    await startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Accuracy.Highest,
      distanceInterval: 1,
      timeInterval: 1000,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function stopLocationTask() {
  try {
    const hasStarted = await hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

    if (hasStarted) {
      await stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    }
  } catch (error) {
    console.error(error);
  }
}
