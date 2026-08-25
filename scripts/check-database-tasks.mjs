import { createClient } from "@supabase/supabase-js";
import fs from "fs";

try {
  const envContent = fs.readFileSync(".env", "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const parts = trimmed.split("=");
    const key = parts[0].trim().replace(/^export\s+/, "");
    let val = parts.slice(1).join("=").trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
} catch (e) {}

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceKey);

const allowedSlugs = ["fullstack", "python", "java", "mernstack", "meanstack", "aiml", "datascience", "uiux", "cybersecurity"];

const { data: tasks, error } = await supabase.from("tasks").select("domain, task_number, title");
if (error) {
  console.error("Error fetching tasks:", error.message);
  process.exit(1);
}

const counts = {};
allowedSlugs.forEach(s => counts[s] = []);

tasks.forEach(t => {
  if (t.domain in counts) {
    counts[t.domain].push(t.task_number);
  }
});

for (const [domain, numbers] of Object.entries(counts)) {
  numbers.sort((a, b) => a - b);
  console.log(`Domain [${domain}]: Count = ${numbers.length}, Task Numbers = [${numbers.join(", ")}]`);
}
process.exit(0);
