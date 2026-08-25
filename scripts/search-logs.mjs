import fs from "fs";
import path from "path";

const logDir = "C:\\Users\\HARIHARAN S\\.gemini\\antigravity-ide\\brain\\42050aa0-e358-4758-a5ba-eab0154222eb\\.system_generated\\logs";

try {
  const files = fs.readdirSync(logDir);
  for (const file of files) {
    if (file.endsWith(".jsonl") || file.endsWith(".log")) {
      const content = fs.readFileSync(path.join(logDir, file), "utf-8");
      if (content.includes("submissions") && content.includes("github_url")) {
        console.log(`Found submissions print in log file: ${file}`);
        // Let's print the line containing it
        const lines = content.split("\n");
        for (const line of lines) {
          if (line.includes("github_url")) {
            console.log(line.slice(0, 1000));
          }
        }
      }
    }
  }
} catch (e) {
  console.error(e);
}
