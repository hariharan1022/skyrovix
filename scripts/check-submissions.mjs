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

const { data: subs, error } = await supabase
  .from("submissions")
  .select("id, application_id, task_id, status, submitted_at, applications(full_name), tasks(task_number)");

if (error) {
  console.error("Error fetching submissions:", error.message);
  process.exit(1);
}

console.log(`Total Submissions: ${subs.length}`);
const counts = {};
for (const s of subs) {
  const key = `${s.application_id}-${s.task_id}`;
  if (!counts[key]) counts[key] = [];
  counts[key].push(s);
}

let duplicates = 0;
for (const [key, list] of Object.entries(counts)) {
  if (list.length > 1) {
    console.log(`Key [${key}] (${list[0].applications?.full_name} - Task ${list[0].tasks?.task_number}): Has ${list.length} duplicates.`);
    duplicates += (list.length - 1);
  }
}

console.log(`Total duplicate rows found: ${duplicates}`);
process.exit(0);
