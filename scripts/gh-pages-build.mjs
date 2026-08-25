import { readdirSync, readFileSync, writeFileSync, cpSync, mkdirSync, existsSync } from "fs";
import { join, resolve } from "path";

const distDir = resolve("dist");
const clientDir = join(distDir, "client");
const outDir = join(distDir, "gh-pages");

// Find the main CSS and JS entry
const assets = readdirSync(join(clientDir, "assets"));
const cssFile = assets.find((f) => f.startsWith("styles-") && f.endsWith(".css"));
const jsEntry = assets.find((f) => f.startsWith("index-") && f.endsWith(".js"));
const cssHref = cssFile ? `/assets/${cssFile}` : "";
const jsSrc = jsEntry ? `/assets/${jsEntry}` : "";

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Task Manager</title>
  ${cssHref ? `<link rel="stylesheet" href="${cssHref}" />` : ""}
  <script>window.__BASE__ = "/-Task_Manager/"</script>
</head>
<body>
  <div id="root"></div>
  ${jsSrc ? `<script type="module" src="${jsSrc}"></script>` : ""}
</body>
</html>`;

const notFound = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Task Manager</title></head>
<body><script>sessionStorage.redirect = location.pathname; location.href = "/-Task_Manager/";</script></body>
</html>`;

// Copy assets
if (existsSync(outDir)) {
  readdirSync(outDir).forEach((f) => {
    if (f !== "assets") {
      try { rmSync(join(outDir, f), { recursive: true }); } catch {}
    }
  });
}
cpSync(clientDir, outDir, { recursive: true, force: true });
writeFileSync(join(outDir, "index.html"), html);
writeFileSync(join(outDir, "404.html"), notFound);

console.log(`✅ Generated gh-pages output at: ${outDir}`);
console.log(`   JS: ${jsSrc}`);
console.log(`   CSS: ${cssHref}`);
