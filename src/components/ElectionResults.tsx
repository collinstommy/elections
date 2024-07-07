import { FC } from "hono/jsx";
import { CountsResponse, ElectionsResponse } from "../../pocketbase-types";

const Count: FC<{ counts: CountsResponse[] }> = ({ counts }) => {
  return (
    <div class="flex flex-col gap-3">
      {counts.map((count) => (
        <a class="btn btn-sm btn-block" href={count.url} target="_blank">
          {count.location}
        </a>
      ))}
    </div>
  );
};

export const ElectionResults: FC<{
  elections: ElectionsResponse[];
  counts: CountsResponse[];
}> = ({ elections, counts }) => {
  return (
    <>
      {elections.map((election) => {
        const electionCounts = counts.filter(
          (count) => count.election === election.id,
        );
        return (
          <div class="flex flex-col gap-3 pb-7">
            <h2 class="text-2xl font-bold">{election.label}</h2>
            <Count counts={electionCounts} />
          </div>
        );
      })}
    </>
  );
};
