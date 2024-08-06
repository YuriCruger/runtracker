import { Object } from "realm";

export type CoordsSchemaProps = {
  latitude: number;
  longitude: number;
};

export class Coords extends Object<Coords> {
  latitude!: number;
  longitude!: number;

  static generate({ latitude, longitude }: CoordsSchemaProps) {
    return {
      latitude,
      longitude,
    };
  }

  static schema = {
    name: "Coords",
    embedded: true,
    properties: {
      latitude: "float",
      longitude: "float",
    },
  };
}
