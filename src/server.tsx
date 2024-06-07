import { Layout } from "./shared/Layout";
import { serveStatic } from "hono/cloudflare-workers";
// @ts-expect-error - cloudflare
import manifest from "__STATIC_CONTENT_MANIFEST";
import { app } from "./app";
import { name } from "drizzle-orm";

app.get("/static/*", serveStatic({ root: "./", manifest }));

const results = {
  kanturk: {
    name: "Kanturk",
    url: "https://docs.google.com/spreadsheets/d/1dZXrrreBzXJldDQeAOknviItV0w0YmAC_Y4Ektn1_-Y/edit#gid=282497095",
    path: "kanturk",
  },
  mallow: {
    name: "Mallow",
    url: "https://docs.google.com/spreadsheets/d/1szI_6aqCn4g2p_-WZtRJzrltyR5XH6_k/edit?usp=sharing&ouid=102172067420936397998&rtpof=true&sd=true",
    path: "mallow",
  },
  bandon: {
    name: "Bandon Kinsale",
    url: "https://docs.google.com/spreadsheets/d/1dH1soes_hLZjBt1vn0UiHBLwY3MjN6KB/edit?usp=sharing&ouid=102172067420936397998&rtpof=true&sd=true",
    path: "bandon",
  },
  bantry: {
    name: "Bantry - West Cork",
    url: "https://docs.google.com/spreadsheets/d/17LiXhte1K0snD1i2g73kKgseK3ti2O4E/edit?usp=sharing&ouid=102172067420936397998&rtpof=true&sd=true",
    path: "bantry",
  },
  skibbereen: {
    name: "Skibbereen",
    path: "skibbereen",
    url: "https://docs.google.com/spreadsheets/d/1QjdBonEMvLiIb0KQF3tcfg7v0lE3PaZZ/edit?usp=sharing&ouid=102172067420936397998&rtpof=true&sd=true",
  },
  fermoy: {
    name: "Fermoy",
    path: "fermoy",
    url: "https://docs.google.com/spreadsheets/d/1rfSUytLELYMlFB36wDOhUSBkQZwf00t8/edit?usp=sharing&ouid=102172067420936397998&rtpof=true&sd=true",
  },
  macroom: {
    name: "Macroom",
    path: "macroom",
    url: "https://docs.google.com/spreadsheets/d/1CHpjrT3tzvQd2jvGrScTgdgwlOMavcaR/edit?usp=sharing&ouid=102172067420936397998&rtpof=true&sd=true",
  },
  carrigaline: {
    name: "Carrigaline",
    path: "carrigaline",
    url: "https://docs.google.com/spreadsheets/d/1zeoVKTFdv4GTEq4qMHCez_1K_T05AmSE/edit?usp=sharing&ouid=102172067420936397998&rtpof=true&sd=true",
  },
  midleton: {
    name: "Midleton",
    path: "midleton",
    url: "https://docs.google.com/spreadsheets/d/1i7u-6WTNrfhEo6D6FhOCz04mPHorcedS/edit?usp=sharing&ouid=102172067420936397998&rtpof=true&sd=true",
  },
  cobh: {
    name: "Cobh",
    path: "cobh",
    url: "https://docs.google.com/spreadsheets/d/1lxMpbiYQh38IFf35zCH11k69NYzZTUJu/edit?usp=sharing&ouid=102172067420936397998&rtpof=true&sd=true",
  },
};

app.get("/", (c) => {
  return c.html(
    <Layout>
      <div class="flex justify-center p-4">
        <div class="max-w-[720px]">
          <h1 class="py-3 text-3xl font-bold">Cork Tally Results</h1>
          <div class="flex flex-col gap-3">
            {Object.values(results).map((result) => (
              <a
                class="btn btn-sm underline"
                href={result.path}
                target="_blank"
              >
                {result.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>,
  );
});

app.get("/:location", (c) => {
  const location = c.req.param("location") as keyof typeof results;
  const result = results[location];
  return c.redirect(result.url);
});

export default app;
