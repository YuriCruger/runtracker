import { BSON, Object, ObjectSchema } from "realm";
import { CoordsSchemaProps } from "./Coords";
import { LocationSchemaProps } from "./Location";

type GenerateProps = {
  user_id: string;
  run_time: string;
  run_pace: string;
  run_distance: string;
  location: LocationSchemaProps;
  coords: CoordsSchemaProps[];
};

export class Historic extends Object<Historic> {
  _id!: object;
  user_id!: string;
  run_time!: string;
  run_pace!: string;
  run_distance!: string;
  location!: LocationSchemaProps;
  coords!: CoordsSchemaProps[];
  created_at!: Date;
  updated_at!: Date;

  static generate({
    user_id,
    run_time,
    run_pace,
    run_distance,
    location,
    coords,
  }: GenerateProps) {
    return {
      _id: new BSON.UUID(),
      user_id,
      run_time,
      run_pace,
      run_distance,
      location,
      coords,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  static schema: ObjectSchema = {
    name: "Historic",
    primaryKey: "_id",

    properties: {
      _id: "uuid",
      user_id: {
        type: "string",
        indexed: true,
      },
      run_time: "string",
      run_pace: "string",
      run_distance: "string",
      location: "Location",
      coords: {
        type: "list",
        objectType: "Coords",
      },
      created_at: "date",
      updated_at: "date",
    },
  };
}
