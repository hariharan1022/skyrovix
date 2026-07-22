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

console.log("Clearing all records from submissions table...");
const { error } = await supabase.from("submissions").delete().neq("id", "00000000-0000-0000-0000-000000000000");

if (error) {
  console.error("Failed to clear submissions:", error.message);
  process.exit(1);
}

console.log("Submissions cleared successfully!");
process.exit(0);
