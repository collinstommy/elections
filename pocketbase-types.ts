/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from "pocketbase";
import type { RecordService } from "pocketbase";

export enum Collections {
  Counts = "counts",
  Elections = "elections",
  Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export type AuthSystemFields<T = never> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export enum CountsLocationOptions {
  "Kanturk" = "Kanturk",
  "Mallow" = "Mallow",
  "Bandon" = "Bandon",
  "Bantry" = "Bantry",
  "Skibbereen" = "Skibbereen",
  "Fermoy" = "Fermoy",
  "Macroom" = "Macroom",
  "Carrigaline" = "Carrigaline",
  "Midleton" = "Midleton",
  "Cobh" = "Cobh",
}
export type CountsRecord = {
  election?: RecordIdString;
  location?: CountsLocationOptions;
  slug?: string;
  url?: string;
};

export type ElectionsRecord = {
  date?: IsoDateString;
  label?: string;
  slug?: string;
};

export type UsersRecord = {
  avatar?: string;
  name?: string;
};

// Response types include system fields and match responses from the PocketBase API
export type CountsResponse<Texpand = unknown> = Required<CountsRecord> &
  BaseSystemFields<Texpand>;
export type ElectionsResponse<Texpand = unknown> = Required<ElectionsRecord> &
  BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> &
  AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  counts: CountsRecord;
  elections: ElectionsRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  counts: CountsResponse;
  elections: ElectionsResponse;
  users: UsersResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: "counts"): RecordService<CountsResponse>;
  collection(idOrName: "elections"): RecordService<ElectionsResponse>;
  collection(idOrName: "users"): RecordService<UsersResponse>;
};
