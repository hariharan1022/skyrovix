try {
  const res = await fetch("https://eesiuqeswydlmwhecrcy.supabase.co/rest/v1/", {
    headers: {
      "apikey": "sb_publishable_JmgNLyUxydSwLicQurPmuA_htKDVvn2"
    }
  });
  console.log("Headers:");
  res.headers.forEach((v, k) => {
    console.log(`  ${k}: ${v}`);
  });
} catch (e) {
  console.error(e.message);
}
process.exit(0);
