import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Simple manual dotenv parsing
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

const tables = ["submissions", "course_task_submissions", "submission_history"];

for (const table of tables) {
  const { data, error } = await supabase.from(table).select("count", { count: "exact", head: true });
  if (error) {
    console.log(`Table [${table}]: Error - ${error.message}`);
  } else {
    console.log(`Table [${table}]: Row Count = ${data ?? 0}`);
  }
}

// Let's also check if there are any other tables with "submission" in their name
// (Since we can't run PG queries directly without pg, we will just print these three)
process.exit(0);
