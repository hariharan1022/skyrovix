import pkg from "pg";
const { Client } = pkg;

const passwords = ["123harimahesh", "[123harimahesh]"];

for (const pwd of passwords) {
  console.log(`Testing Mumbai pooler with password length ${pwd.length}...`);
  const client = new Client({
    user: 'postgres.eesiuqeswydlmwhecrcy',
    host: 'aws-0-ap-south-1.pooler.supabase.com',
    database: 'postgres',
    password: pwd,
    port: 6543,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
  });

  try {
    await client.connect();
    console.log(`Connected successfully with password: ${pwd}!`);
    const { rows } = await client.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public' LIMIT 2");
    console.log("Tables list sample:", rows);
    await client.end();
    break;
  } catch (e) {
    console.log(`Failed with password [${pwd}]: ${e.message}`);
  } finally {
    try {
      await client.end();
    } catch (err) {}
  }
}
process.exit(0);
