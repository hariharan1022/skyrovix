import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Simple manual dotenv parsing
try {
  const envContent = fs.readFileSync(".env", "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const parts = trimmed.split("=");
    const key = parts[0].trim().replace(/^export\s+/, "");
    let val = parts.slice(1).join("=").trim();
    // strip quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
} catch (e) {
  console.log("No .env found or failed to read .env:", e.message);
}

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

const allowedSlugs = ["fullstack", "python", "java", "mernstack", "meanstack", "aiml", "datascience", "uiux", "cybersecurity"];

const domains = [
  { slug: "fullstack", name: "Full Stack Development", domain: "fullstack", short_description: "End-to-end web apps with React, Node.js, and databases.", icon: "BookOpen" },
  { slug: "python", name: "Python Development", domain: "python", short_description: "Versatile Python for web, automation, and data.", icon: "BookOpen" },
  { slug: "java", name: "Java Development", domain: "java", short_description: "Enterprise-grade backends with Spring Boot.", icon: "BookOpen" },
  { slug: "mernstack", name: "MERN Stack Development", domain: "mernstack", short_description: "MongoDB, Express, React, Node.js full-stack apps.", icon: "BookOpen" },
  { slug: "meanstack", name: "MEAN Stack Development", domain: "meanstack", short_description: "MongoDB, Express, Angular, Node.js web apps.", icon: "BookOpen" },
  { slug: "aiml", name: "AI & Machine Learning", domain: "aiml", short_description: "Build intelligent systems with ML and LLMs.", icon: "BookOpen" },
  { slug: "datascience", name: "Data Science", domain: "datascience", short_description: "Turn raw data into actionable insights.", icon: "BookOpen" },
  { slug: "uiux", name: "UI UX Designer", domain: "uiux", short_description: "Human-centered design that delights users.", icon: "BookOpen" },
  { slug: "cybersecurity", name: "Cyber Security", domain: "cybersecurity", short_description: "Defend systems, hunt vulnerabilities.", icon: "BookOpen" },
];

console.log("Cleaning other courses...");
// Delete courses that are NOT in our allowed slugs list
const { error: deleteErr } = await supabase
  .from("courses")
  .delete()
  .not("slug", "in", `(${allowedSlugs.join(",")})`);

if (deleteErr) {
  console.warn("Delete of other courses failed (might have dependent enrollments):", deleteErr.message);
} else {
  console.log("Cleaned other courses successfully.");
}

console.log("Upserting internship domains...");
for (const d of domains) {
  const payload = {
    ...d,
    difficulty: "Intermediate",
    duration_weeks: 4,
    total_topics: 0,
    total_tasks: 0,
    quiz_marks: 100,
    pass_marks: 60,
    quiz_duration_min: 60,
    is_published: true,
  };

  const { error } = await supabase.from("courses").upsert(payload, { onConflict: "slug" });
  if (error) {
    console.error(`Failed to upsert ${d.slug}:`, error.message);
  } else {
    console.log(`Upserted ${d.slug} successfully.`);
  }
}

console.log("Done!");
process.exit(0);
