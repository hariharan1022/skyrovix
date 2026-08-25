import fs from "fs";

const content = fs.readFileSync("src/routes/admin.tsx", "utf-8");
const lines = content.split("\n");
lines.forEach((line, idx) => {
  if (line.includes("function DashboardSection")) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
process.exit(0);
