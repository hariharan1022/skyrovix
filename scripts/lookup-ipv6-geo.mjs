try {
  const res = await fetch("https://ipinfo.io/2406:da1a:314:7102:b0ec:428f:b386:6691/json");
  const json = await res.json();
  console.log("IP Info from ipinfo.io:", json);
} catch (e) {
  console.error("Failed:", e.message);
}
process.exit(0);
