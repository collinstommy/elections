import { Layout } from "./shared/Layout";
import { serveStatic } from "hono/cloudflare-workers";
// @ts-expect-error - cloudflare
import manifest from "__STATIC_CONTENT_MANIFEST";
import { app } from "./app";

app.get("/static/*", serveStatic({ root: "./", manifest }));

app.get("/", (c) => {
  return c.html(
    <Layout>
      <div class="flex justify-center p-4">
        <div class="max-w-[720px]">
          <h1 class="py-3 text-3xl font-bold">Cork Tally Results</h1>
          <div class="flex flex-col gap-3">
            <a class="btn btn-sm underline" href="/kanturk">
              Kanturk
            </a>
          </div>
        </div>
      </div>
    </Layout>,
  );
});

app.get("/kanturk", (c) => {
  return c.redirect(
    "https://docs.google.com/spreadsheets/d/1dZXrrreBzXJldDQeAOknviItV0w0YmAC_Y4Ektn1_-Y/edit#gid=282497095",
  );
});

export default app;
