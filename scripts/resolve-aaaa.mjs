import dns from "dns/promises";

try {
  const result = await dns.resolve6("db.eesiuqeswydlmwhecrcy.supabase.co");
  console.log("AAAA records:", result);
} catch (e) {
  console.log("AAAA lookup failed:", e.message);
}

try {
  // Let's resolve the CNAME
  const cname = await dns.resolveCname("db.eesiuqeswydlmwhecrcy.supabase.co");
  console.log("CNAME:", cname);
} catch (e) {
  console.log("CNAME lookup failed:", e.message);
}
process.exit(0);
