import PocketBase from "pocketbase";
import { TypedPocketBase } from "../pocketbase-types";

function api() {
  return new PocketBase("https://data.irelandelections.com") as TypedPocketBase;
}

// a cache for each function with a ttl of 5 minutes
const cache = new Map<string, { data: any; expires: number }>();
const ttl = 5 * 60 * 1000;

async function cacheable<T>(promise: Promise<T>, key: string) {
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) {
    console.log("cache hit");
    return Promise.resolve(cached.data);
  }

  const data = await promise;
  cache.set(key, { data, expires: Date.now() + ttl });
  console.log("cache miss");
  return data;
}

export const getAllElections = async () => {
  return cacheable(
    api().collection("elections").getFullList({
      sort: "-created",
    }),
    "allElections",
  );
};

export const getRecentElection = async () => {
  return cacheable(
    api().collection("elections").getFirstListItem("", {
      sort: "-created",
    }),
    "recentElection",
  );
};

export const getCountsForElection = async (electionId: string) => {
  return cacheable(
    api()
      .collection("counts")
      .getFullList({
        filter: `election = '${electionId}'`,
      }),
    "countsForElection" + electionId,
  );
};

export const getAllCounts = async () => {
  return cacheable(
    api().collection("counts").getFullList({
      sort: "-created",
    }),
    "allCounts",
  );
};

export const resetCache = () => {
  cache.clear();
};
