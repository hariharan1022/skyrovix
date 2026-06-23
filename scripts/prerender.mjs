import { mkdirSync, writeFileSync, cpSync, existsSync, rmSync } from "fs";
import { join, resolve, dirname } from "path";

const DIST = resolve("dist");
const CLIENT = join(DIST, "client");
const OUT = join(DIST, "gh-pages");

const ROUTES = [
  "/", "/about", "/auth", "/contact", "/courses", "/domains",
  "/privacy", "/terms", "/verify-certificate",
];

async function main() {
  // 1. Copy client assets
  console.log("Copying client assets...");
  if (existsSync(OUT)) rmSync(OUT, { recursive: true });
  cpSync(CLIENT, OUT, { recursive: true, force: true });

  // 2. Load the server handler
  console.log("Loading SSR server...");
  const serverPath = join(DIST, "server", "server.js");
  const normalizedPath = serverPath.replace(/\\/g, "/");
  const serverUrl = normalizedPath.startsWith("/") ? `file://${normalizedPath}` : `file:///${normalizedPath}`;
  const { default: serverHandler } = await import(serverUrl);

  // 3. Prerender each route (follow redirects)
  async function fetchHtml(urlStr, maxRedirects = 5) {
    let req = new Request(urlStr);
    for (let i = 0; i < maxRedirects; i++) {
      const res = await serverHandler.fetch(req, {}, {});
      if (res.status >= 300 && res.status < 400 && res.headers.has("location")) {
        const loc = new URL(res.headers.get("location"), urlStr);
        req = new Request(loc.href);
        continue;
      }
      return res;
    }
    throw new Error("Too many redirects");
  }

  for (const route of ROUTES) {
    const url = `http://localhost:4321${route}`;
    console.log(`  Prerendering ${route}...`);
    try {
      const res = await fetchHtml(url);
      const html = await res.text();

      const filePath = route === "/" ? "/index.html" : `${route}/index.html`;
      const fullPath = join(OUT, filePath);
      mkdirSync(dirname(fullPath), { recursive: true });
      writeFileSync(fullPath, html);
      console.log(`    ✓ ${filePath} (${html.length} bytes)`);
    } catch (err) {
      console.error(`    ✗ ${route}: ${err.message}`);
    }
  }

  // 4. 404.html fallback for SPA routing
  writeFileSync(join(OUT, "404.html"), `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Task Manager</title><script>sessionStorage.redirect=location.pathname;location.href="/-Task_Manager/";</script></head><body></body></html>`);

  console.log("\n✅ Prerender complete:", OUT);
}

main().catch((err) => { console.error(err); process.exit(1); });
