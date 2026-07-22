import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import { ALL_DOMAINS_TASKS, LINKEDIN_TASK } from "../src/lib/tasks-data";

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

if (!supabaseUrl || !serviceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

const allowedSlugs = ["fullstack", "python", "java", "mernstack", "meanstack", "aiml", "datascience", "uiux", "cybersecurity"];

console.log("Cleaning existing tasks for allowed domains...");
// Delete existing tasks for the 9 active domains
const { error: deleteErr } = await supabase
  .from("tasks")
  .delete()
  .in("domain", allowedSlugs);

if (deleteErr) {
  console.error("Delete of existing tasks failed:", deleteErr.message);
  process.exit(1);
}
console.log("Existing tasks cleaned.");

console.log("Seeding tasks for 9 domains...");
for (const slug of allowedSlugs) {
  const domainTasksData = ALL_DOMAINS_TASKS.find((d) => d.slug === slug);
  if (!domainTasksData) {
    console.warn(`No task data defined in tasks-data.ts for domain: ${slug}`);
    continue;
  }

  const tasksToInsert = [];

  // Add Task 0 (LinkedIn Task)
  tasksToInsert.push({
    domain: slug,
    task_number: 0,
    title: LINKEDIN_TASK.title,
    description: LINKEDIN_TASK.description,
    resources: null
  });

  // Add Tasks 1-12
  for (const t of domainTasksData.tasks) {
    tasksToInsert.push({
      domain: slug,
      task_number: t.taskNumber,
      title: t.title,
      description: t.description,
      resources: t.resources || null
    });
  }

  console.log(`Inserting ${tasksToInsert.length} tasks for domain [${slug}]...`);
  const { error: insertErr } = await supabase.from("tasks").insert(tasksToInsert);
  if (insertErr) {
    console.error(`Failed to insert tasks for ${slug}:`, insertErr.message);
  } else {
    console.log(`Successfully seeded ${slug} tasks.`);
  }
}

console.log("Seeding completed successfully!");
process.exit(0);
