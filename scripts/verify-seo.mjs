const baseUrl = process.argv[2] || "http://127.0.0.1:3015";

async function fetchText(path, options) {
  const response = await fetch(`${baseUrl}${path}`, options);
  return { response, html: await response.text() };
}

const sitemap = await fetchText("/sitemap.xml");
const urls = [...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
  match[1].replace("https://www.cordovaproperty.com", baseUrl),
);

const failed = [];
const metadataIssues = [];

for (let index = 0; index < urls.length; index += 16) {
  await Promise.all(
    urls.slice(index, index + 16).map(async (url) => {
      try {
        const response = await fetch(url);
        const html = await response.text();
        if (response.status !== 200) failed.push([url, response.status]);

        const checks = {
          canonical: /<link[^>]+rel=["']canonical["']/i.test(html),
          schema: /application\/ld\+json/i.test(html),
          title: /<title>[^<]+<\/title>/i.test(html),
          description: /<meta[^>]+name=["']description["']/i.test(html),
          h1: (html.match(/<h1\b/gi) || []).length,
        };

        if (
          !checks.canonical ||
          !checks.schema ||
          !checks.title ||
          !checks.description ||
          checks.h1 !== 1
        ) {
          metadataIssues.push([url, checks]);
        }
      } catch (error) {
        failed.push([url, error.message]);
      }
    }),
  );
}

const spotPaths = [
  "/robots.txt",
  "/llms.txt",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/holiday-homes",
  "/snagging-inspection",
  "/terms-of-service",
  "/privacy-policy",
  "/blog/page/2",
];
const spots = await Promise.all(
  spotPaths.map(async (path) => [path, (await fetch(`${baseUrl}${path}`)).status]),
);

const redirectPaths = ["/blog/test", "/blog-old", "/blog-list"];
const redirects = await Promise.all(
  redirectPaths.map(async (path) => {
    const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
    return [path, response.status, response.headers.get("location")];
  }),
);

const admin = await fetch(`${baseUrl}/admin/login`, { redirect: "manual" });

console.log(
  JSON.stringify(
    {
      sitemapUrls: urls.length,
      failed,
      metadataIssues,
      spots,
      redirects,
      adminRobots: admin.headers.get("x-robots-tag"),
    },
    null,
    2,
  ),
);

if (failed.length || metadataIssues.length) process.exitCode = 1;
