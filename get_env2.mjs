import fs from "fs";
import path from "path";

const brainDir = "C:\\Users\\HARIHARAN S\\.gemini\\antigravity-ide\\brain";

function searchDir(dir) {
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        searchDir(fullPath);
      } else if (file.endsWith(".jsonl") || file.endsWith(".log") || file.endsWith(".txt") || file === ".env" || file.endsWith(".md")) {
        try {
          const content = fs.readFileSync(fullPath, "utf-8");
          if (content.includes("eesiuqeswydlmwhecrcy")) {
            const lines = content.split("\n");
            for (const line of lines) {
              if (line.includes("eyJ") || line.includes("sb_") || line.includes("SUPABASE") || line.includes("VITE_")) {
                console.log("MATCH IN:", fullPath);
                console.log("  ", line.trim().slice(0, 300));
              }
            }
          }
        } catch (e) {}
      }
    }
  } catch (e) {}
}

searchDir(brainDir);
