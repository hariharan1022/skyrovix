import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  connectionString: 'postgresql://postgres:123harimahesh@db.eesiuqeswydlmwhecrcy.supabase.co:5432/postgres',
});

try {
  await client.connect();
  console.log("Connected to PostgreSQL.");

  console.log("Adding submissions and applications to supabase_realtime publication...");
  // Use ALTER PUBLICATION ADD TABLE. If already added, it might throw, so let's handle errors or check first.
  await client.query("ALTER PUBLICATION supabase_realtime ADD TABLE submissions, applications;");
  console.log("Added successfully!");

} catch (e) {
  if (e.message.includes("already exists") || e.message.includes("is already a member")) {
    console.log("Tables were already added or partially added.");
  } else {
    console.error("Error executing query:", e.message);
  }
} finally {
  // Let's verify
  const { rows } = await client.query(`
    SELECT tablename FROM pg_publication_tables WHERE pubname = 'supabase_realtime'
  `);
  console.log('\nAll tables in supabase_realtime:');
  for (const t of rows) {
    console.log(`  ${t.tablename}`);
  }

  await client.end();
}
