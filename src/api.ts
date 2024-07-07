import PocketBase from "pocketbase";
import {
  CountsResponse,
  ElectionsResponse,
  TypedPocketBase,
} from "../pocketbase-types";

function api() {
  return new PocketBase("https://data.irelandelections.com") as TypedPocketBase;
}

export const getAllElections = async () => {
  return api().collection("elections").getFullList({
    sort: "-created",
  });
};

export const getRecentElection = async () => {
  return api().collection("elections").getFirstListItem("", {
    sort: "-created",
  });
};

export const getCountsForElection = async (electionId: string) => {
  console.log({ electionId });
  return api()
    .collection("counts")
    .getFullList({
      filter: `election = '${electionId}'`,
    });
};

export const getAllCounts = async () => {
  return api().collection("counts").getFullList({
    sort: "-created",
  });
};
