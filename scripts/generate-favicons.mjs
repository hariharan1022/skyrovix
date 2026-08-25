import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const srcLogo = path.resolve("src/assets/logo.png");
const pubDir = path.resolve("public");

if (!fs.existsSync(srcLogo)) {
  console.error("[favicon] src/assets/logo.png not found");
  process.exit(1);
}

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

async function main() {
  for (const { name, size } of sizes) {
    const out = path.join(pubDir, name);
    await sharp(srcLogo)
      .resize(size, size, { fit: "contain", background: { r: 7, g: 40, b: 74, alpha: 1 } })
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(out);
    const stat = fs.statSync(out);
    console.log(`[favicon] ${name} (${size}x${size}) — ${stat.size} bytes`);
  }

  const icoSizes = [16, 32, 48];
  const icoBuffers = [];
  for (const size of icoSizes) {
    const buf = await sharp(srcLogo)
      .resize(size, size, { fit: "contain", background: { r: 7, g: 40, b: 74, alpha: 1 } })
      .png()
      .toBuffer();
    icoBuffers.push({ size, data: buf });
  }

  const icoPath = path.join(pubDir, "favicon.ico");
  const icoModule = await import("ico-endec");
  const icoBuf = icoModule.default.encode(icoBuffers.map((b) => b.data));
  fs.writeFileSync(icoPath, icoBuf);
  const icoStat = fs.statSync(icoPath);
  console.log(`[favicon] favicon.ico — ${icoStat.size} bytes`);
}

main().catch((err) => {
  console.error("[favicon] Failed:", err);
  process.exit(1);
});
