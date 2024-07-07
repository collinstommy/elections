import { Layout } from "./shared/Layout";
import { serveStatic } from "hono/cloudflare-workers";
// @ts-expect-error - cloudflare
import manifest from "__STATIC_CONTENT_MANIFEST";
import { app } from "./app";
import {
  getAllCounts,
  getAllElections,
  getCountsForElection,
  getRecentElection,
} from "./api";
import { Main } from "./components/Main";

app.get("/static/*", serveStatic({ root: "./", manifest }));

app.get("/", async (c) => {
  const election = await getRecentElection();
  const countForElection = await getCountsForElection(election.id);

  return c.html(
    <Main
      elections={[election]}
      counts={countForElection}
      footer={
        <a href="/all" class="link">
          View past tallys
        </a>
      }
    />,
  );
});

app.get("/all", async (c) => {
  const elections = await getAllElections();
  const counts = await getAllCounts();

  return c.html(<Main elections={elections} counts={counts} />);
});

app.get("/favicon.ico", (c) => c.redirect("/static/favicon.ico"));

app.get("/:any", (c) => {
  return c.redirect("/");
});

export default app;
