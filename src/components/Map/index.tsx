import { theme } from "@/theme";
import { useRef } from "react";
import MapView, {
  MapViewProps,
  LatLng,
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
} from "react-native-maps";

type Props = MapViewProps & {
  coordinates: LatLng[];
};

export function Map({ coordinates }: Props) {
  const mapRef = useRef<MapView>(null);

  const lastCoordinate = coordinates[coordinates.length - 1];

  async function onMapLoaded() {
    if (coordinates.length > 1) {
      mapRef.current?.fitToSuppliedMarkers(["departure", "arrival"], {
        edgePadding: { top: 100, bottom: 100, right: 100, left: 100 },
      });
    }
  }

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={{ width: "100%", height: 300 }}
      region={{
        latitude: lastCoordinate.latitude,
        longitude: lastCoordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      onMapLoaded={onMapLoaded}
    >
      <Marker identifier="departure" coordinate={coordinates[0]} />

      {coordinates.length > 1 && (
        <Marker identifier="arrival" coordinate={lastCoordinate} />
      )}

      <Polyline
        coordinates={[...coordinates]}
        strokeColor={theme.COLORS.GRAY_700}
        strokeWidth={5}
      />
    </MapView>
  );
}
