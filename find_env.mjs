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
          if (content.includes("VITE_SUPABASE_URL=") || content.includes("SUPABASE_URL=")) {
            console.log("MATCH IN:", fullPath);
            const lines = content.split("\n");
            for (const line of lines) {
              if (line.includes("SUPABASE_URL") || line.includes("SUPABASE_PUBLISHABLE_KEY") || line.includes("SUPABASE_ANON_KEY") || line.includes("SUPABASE_SERVICE_ROLE_KEY")) {
                console.log("  ", line.trim().slice(0, 200));
              }
            }
          }
        } catch (e) {}
      }
    }
  } catch (e) {}
}

searchDir(brainDir);
