import { Object } from "realm";

export type LocationSchemaProps = {
  city: string;
  state: string;
};

export class Location extends Object<Location> {
  city!: string;
  state!: string;

  static generate({ city, state }: LocationSchemaProps) {
    return {
      city,
      state,
    };
  }

  static schema = {
    name: "Location",
    embedded: true,
    properties: {
      city: "string",
      state: "string",
    },
  };
}
