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

// We can query the public schema tables using the postgrest API if we have access,
// or we can just try to fetch from all known tables.
const knownTables = [
  "profiles", "user_roles", "applications", "tasks", "submissions", "payments",
  "certificates", "courses", "course_topics", "course_tasks", "course_quiz_questions",
  "enrollments", "lesson_progress", "course_task_submissions", "quiz_attempts",
  "course_certificates", "topic_quiz_questions", "topic_quiz_attempts", "bookmarks",
  "notes", "achievement_definitions", "achievements", "leaderboard", "submission_history"
];

console.log("Checking row counts for all tables...");
for (const table of knownTables) {
  try {
    const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true });
    if (error) {
      // ignore table not found
    } else {
      if (count > 0) {
        console.log(`Table [${table}]: Row Count = ${count}`);
      }
    }
  } catch (e) {}
}

process.exit(0);
