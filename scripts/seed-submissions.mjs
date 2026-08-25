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

console.log("Clearing all submissions first...");
await supabase.from("submissions").delete().neq("id", "00000000-0000-0000-0000-000000000000");

console.log("Fetching applications...");
const { data: apps, error: appsErr } = await supabase.from("applications").select("id, domain, full_name");
if (appsErr || !apps || apps.length === 0) {
  console.log("No applications found to seed submissions for.");
  process.exit(0);
}

// Only select up to 3 applications to keep the dashboard clean and free of noise/duplicates
const selectedApps = apps.slice(0, 3);
console.log(`Seeding clean submissions for ${selectedApps.length} applications.`);

for (const app of selectedApps) {
  console.log(`Seeding submissions for ${app.full_name} (${app.domain})...`);
  const { data: tasks } = await supabase
    .from("tasks")
    .select("id, task_number")
    .eq("domain", app.domain)
    .order("task_number", { ascending: true });

  if (!tasks || tasks.length === 0) continue;

  const task0 = tasks.find(t => t.task_number === 0);
  const task1 = tasks.find(t => t.task_number === 1);

  const subs = [];
  if (task0) {
    // Approved task 0
    subs.push({
      application_id: app.id,
      task_id: task0.id,
      github_url: "https://github.com/demo/internship",
      deployed_url: "https://linkedin.com/post/demo",
      notes: "Here is my LinkedIn post showcasing my Skyrovix offer letter!",
      status: "approved",
      submitted_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      reviewed_at: new Date().toISOString(),
    });
  }

  if (task1) {
    // Pending review task 1
    subs.push({
      application_id: app.id,
      task_id: task1.id,
      github_url: "https://github.com/demo/portfolio-website",
      deployed_url: "https://portfolio-demo.vercel.app",
      notes: "Finished Task 1: Personal Portfolio Website build with responsive design.",
      status: "pending",
      submitted_at: new Date().toISOString(),
    });
  }

  if (subs.length > 0) {
    await supabase.from("submissions").insert(subs);
  }
}

console.log("Clean seeding completed successfully!");
process.exit(0);
