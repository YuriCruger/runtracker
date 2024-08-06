import { useRef } from "react";
import MapView, {
  MapViewProps,
  LatLng,
  PROVIDER_GOOGLE,
  Polyline,
  Marker,
} from "react-native-maps";
import { theme } from "@/theme";
import { SneakerMove } from "phosphor-react-native";

type Props = MapViewProps & {
  coordinates: LatLng[];
  hasStarted?: boolean;
};

export function Map({ coordinates, hasStarted = false }: Props) {
  const mapRef = useRef<MapView>(null);

  const lastCoordinate = coordinates[coordinates.length - 1];
  const startCoordinate = coordinates[0];

  function getRegionForCoordinates(coords: LatLng[]) {
    if (coords.length === 0) return undefined;

    const latitudes = coords.map((coord) => coord.latitude);
    const longitudes = coords.map((coord) => coord.longitude);

    const latitudeMin = Math.min(...latitudes);
    const latitudeMax = Math.max(...latitudes);
    const longitudeMin = Math.min(...longitudes);
    const longitudeMax = Math.max(...longitudes);

    const latitudeDelta = latitudeMax - latitudeMin;
    const longitudeDelta = longitudeMax - longitudeMin;

    const extraPadding = 0.004;

    return {
      latitude: latitudeMin + latitudeDelta / 2,
      longitude: longitudeMin + longitudeDelta / 2,
      latitudeDelta: latitudeDelta + extraPadding,
      longitudeDelta: longitudeDelta + extraPadding,
    };
  }

  async function onMapLoaded() {
    if (coordinates.length > 1) {
      const region = getRegionForCoordinates(coordinates);
      if (region) {
        mapRef.current?.animateToRegion(region, 1000);
      }
    }
  }

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={{ width: "100%", flex: 1 }}
      region={
        coordinates.length > 1
          ? getRegionForCoordinates(coordinates)
          : {
              latitude: lastCoordinate.latitude,
              longitude: lastCoordinate.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }
      }
      onMapLoaded={onMapLoaded}
    >
      {!hasStarted && startCoordinate && (
        <Marker identifier="departure" coordinate={startCoordinate}>
          <SneakerMove
            size={32}
            color={theme.COLORS.BRAND_LIGHT}
            weight="fill"
          />
        </Marker>
      )}

      {coordinates.length > 1 && (
        <Polyline
          coordinates={coordinates}
          strokeColor={theme.COLORS.BRAND_LIGHT}
          strokeWidth={5}
        />
      )}
    </MapView>
  );
}
