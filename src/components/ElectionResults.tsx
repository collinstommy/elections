import { FC } from "hono/jsx";
import {
  CountsResponse,
  ElectionsResponse,
  TypedPocketBase,
} from "../../pocketbase-types";

export const ElectionResults: FC<{
  elections: ElectionsResponse[];
  counts: CountsResponse[];
}> = ({ elections, counts }) => {
  return (
    <div class="flex flex-col gap-3">
      {counts.map((count) => (
        <a class="btn btn-sm underline" href={count.slug} target="_blank">
          {count.location}
        </a>
      ))}
    </div>
  );
};
