import { FC } from "hono/jsx";
import { CountsResponse, ElectionsResponse } from "../../pocketbase-types";
import { ElectionResults } from "./ElectionResults";
import { Layout } from "../shared/Layout";

export const Main: FC<{
  elections: ElectionsResponse[];
  counts: CountsResponse[];
  footer?: JSX.Element;
}> = ({ elections, counts, footer }) => {
  return (
    <Layout>
      <div class="flex justify-center p-4">
        <div class="max-w-[720px]">
          <h1 class="py-3 pb-4 text-3xl font-bold">Cork Tally Results</h1>
          <ElectionResults elections={elections} counts={counts} />
          {footer}
        </div>
      </div>
    </Layout>
  );
};
