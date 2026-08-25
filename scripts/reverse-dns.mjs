import dns from "dns/promises";

try {
  const result = await dns.reverse("2406:da1a:314:7102:b0ec:428f:b386:6691");
  console.log("Reverse DNS lookup:", result);
} catch (e) {
  console.log("Reverse DNS lookup failed:", e.message);
}
process.exit(0);
