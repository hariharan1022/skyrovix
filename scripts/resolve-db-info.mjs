import dns from "dns/promises";

try {
  // Let's resolve the CNAME of the database pooler or check the direct connection IP
  const lookup = await dns.lookup("db.eesiuqeswydlmwhecrcy.supabase.co", { all: true });
  console.log("Lookup result:", lookup);
} catch (e) {
  console.log("Lookup failed:", e.message);
}

try {
  // Let's resolve eesiuqeswydlmwhecrcy.supabase.co
  const lookupAPI = await dns.lookup("eesiuqeswydlmwhecrcy.supabase.co", { all: true });
  console.log("API Lookup result:", lookupAPI);
} catch (e) {
  console.log("API Lookup failed:", e.message);
}
process.exit(0);
