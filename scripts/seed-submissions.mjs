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

if (!supabaseUrl || !serviceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

console.log("Fetching applications...");
const { data: apps, error: appsErr } = await supabase.from("applications").select("id, domain, full_name");
if (appsErr) {
  console.error("Failed to fetch applications:", appsErr.message);
  process.exit(1);
}

if (!apps || apps.length === 0) {
  console.warn("No applications found in the database. Creating a mock application first...");
  // Create a mock application to link submissions to
  const mockUserId = "00000000-0000-0000-0000-000000000000"; // placeholder or valid user id
  // Let's see if we can find any user in auth to associate with
  const { data: users } = await supabase.auth.admin.listUsers({ limit: 1 });
  const userId = users?.users?.[0]?.id || mockUserId;

  const mockApp = {
    user_id: userId,
    full_name: "John Doe (Demo Intern)",
    email: "demo.intern@skyrovix.online",
    phone: "9876543210",
    college: "Skyrovix Academy",
    course: "Computer Science",
    year: "Final Year",
    domain: "fullstack",
    status: "ongoing",
    intern_id: "SKX-2026-9999",
  };

  const { data: newApp, error: newAppErr } = await supabase.from("applications").insert(mockApp).select().single();
  if (newAppErr) {
    console.error("Failed to create mock application:", newAppErr.message);
    process.exit(1);
  }
  apps.push(newApp);
}

console.log(`Working with ${apps.length} applications.`);

for (const app of apps) {
  console.log(`Fetching tasks for domain: ${app.domain}...`);
  const { data: tasks, error: tasksErr } = await supabase
    .from("tasks")
    .select("id, task_number, title")
    .eq("domain", app.domain)
    .order("task_number", { ascending: true });

  if (tasksErr) {
    console.error(`Failed to fetch tasks for ${app.domain}:`, tasksErr.message);
    continue;
  }

  if (!tasks || tasks.length === 0) {
    console.warn(`No tasks found in database for domain ${app.domain}`);
    continue;
  }

  // Check if this application already has submissions
  const { data: existingSubs } = await supabase.from("submissions").select("id").eq("application_id", app.id);
  if (existingSubs && existingSubs.length > 0) {
    console.log(`Application for ${app.full_name} already has ${existingSubs.length} submissions. Skipping.`);
    continue;
  }

  // Create 2 mock submissions: Task 0 (approved) and Task 1 (pending)
  const task0 = tasks.find(t => t.task_number === 0);
  const task1 = tasks.find(t => t.task_number === 1);

  const subs = [];
  if (task0) {
    subs.push({
      application_id: app.id,
      task_id: task0.id,
      github_url: "https://github.com/demo/internship",
      deployed_url: "https://linkedin.com/post/demo",
      notes: "Here is my LinkedIn post showcasing the Skyrovix offer letter!",
      status: "approved",
      submitted_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      reviewed_at: new Date().toISOString(),
    });
  }

  if (task1) {
    subs.push({
      application_id: app.id,
      task_id: task1.id,
      github_url: "https://github.com/demo/portfolio-website",
      deployed_url: "https://portfolio-demo.vercel.app",
      notes: "Finished Task 1: Portfolio website with light/dark mode and responsive design.",
      status: "pending",
      submitted_at: new Date().toISOString(),
    });
  }

  if (subs.length > 0) {
    const { error: insErr } = await supabase.from("submissions").insert(subs);
    if (insErr) {
      console.error(`Failed to insert submissions for ${app.full_name}:`, insErr.message);
    } else {
      console.log(`Inserted ${subs.length} mock submissions for ${app.full_name} successfully.`);
    }
  }
}

console.log("Seeding completed!");
process.exit(0);
