import { createRealmContext } from "@realm/react";

import { OpenRealmBehaviorConfiguration, OpenRealmBehaviorType } from "realm";

import { Historic } from "./schemas/Historic";
import { Coords } from "./schemas/Coords";

const realmAccessBehavior: OpenRealmBehaviorConfiguration = {
  type: OpenRealmBehaviorType.OpenImmediately,
};

export const syncConfig: any = {
  flexible: true,
  newRealmFileBehavior: realmAccessBehavior,
  existingRealmFileBehavior: realmAccessBehavior,
};

export const {
  RealmProvider,
  useRealm, // Acesso direto à instância do Realm para operações CRUD
  useObject, // Acesso reativo a um objeto específico no Realm
  useQuery, // Acesso reativo a uma coleção de objetos de um tipo específico no Realm
} = createRealmContext({
  schema: [Historic, Coords],
  schemaVersion: 0,
});
