import PocketBase from "pocketbase";
import { TypedPocketBase } from "../pocketbase-types";

const pb = new PocketBase(
  "https://data.irelandelections.com",
) as TypedPocketBase;

export const getAllElections = async () => {
  return await pb.collection("elections").getFullList({
    sort: "-created",
  });
};

export const getAllCounts = async () => {
  return pb.collection("counts").getFullList({
    sort: "-created",
  });
};
