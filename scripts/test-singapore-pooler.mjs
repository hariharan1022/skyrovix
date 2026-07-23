import pkg from "pg";
const { Client } = pkg;

const configs = [
  { port: 6543, host: "aws-0-ap-southeast-1.pooler.supabase.com" },
  { port: 5432, host: "aws-0-ap-southeast-1.pooler.supabase.com" }
];

for (const config of configs) {
  console.log(`Testing Singapore pooler at host [${config.host}] on port [${config.port}]...`);
  
  const client = new Client({
    user: 'postgres.eesiuqeswydlmwhecrcy',
    host: config.host,
    database: 'postgres',
    password: '123harimahesh',
    port: config.port,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
  });

  try {
    await client.connect();
    console.log("Connected successfully!");
    const { rows } = await client.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public' LIMIT 2");
    console.log("Success! Table list sample:", rows);
    await client.end();
    break;
  } catch (e) {
    console.log(`Failed for port [${config.port}]: ${e.message}`);
  } finally {
    try {
      await client.end();
    } catch (err) {}
  }
}
process.exit(0);
