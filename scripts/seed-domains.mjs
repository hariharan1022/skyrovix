import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in environment");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const domains = [
  { slug: "mernstack", name: "MERN Stack Development", short_description: "MongoDB, Express, React, Node.js — build full-stack apps end-to-end.", icon: "Globe", domain: "mernstack", difficulty: "Intermediate", duration_weeks: 8 },
  { slug: "meanstack", name: "MEAN Stack Development", short_description: "MongoDB, Express, Angular, Node.js — build full-stack apps with Angular.", icon: "Layers", domain: "meanstack", difficulty: "Intermediate", duration_weeks: 8 },
];

for (const d of domains) {
  const { data: existing } = await supabase.from("courses").select("id").eq("slug", d.slug).maybeSingle();
  if (existing) {
    console.log(`Skipping ${d.slug} — already exists`);
    continue;
  }
  const { error } = await supabase.from("courses").insert({
    ...d,
    total_topics: 0,
    total_tasks: 0,
    quiz_marks: 100,
    pass_marks: 60,
    quiz_duration_min: 60,
    is_published: true,
  });
  if (error) {
    console.error(`Failed to insert ${d.slug}:`, error.message);
  } else {
    console.log(`Inserted ${d.slug}`);
  }
}

console.log("Done");
