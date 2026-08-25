import { execSync } from "child_process";

try {
  // Let's run vercel env pull to a file
  execSync("npx vercel env pull .env.prod.vercel --environment production", { stdio: "inherit" });
  console.log("Successfully pulled production env variables.");
} catch (e) {
  console.error(e);
}
process.exit(0);
