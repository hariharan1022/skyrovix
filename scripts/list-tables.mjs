import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  user: 'postgres',
  host: 'aws-0-us-east-1.pooler.supabase.com',
  database: 'postgres',
  password: '123harimahesh',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

try {
  await client.connect();
  console.log("Connected to Supabase database successfully!");

  const { rows } = await client.query(`
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname = 'public'
    ORDER BY tablename
  `);

  console.log("Tables in public schema:");
  for (const r of rows) {
    console.log(`  - ${r.tablename}`);
  }
} catch (err) {
  console.error("Database connection failed:", err.message);
} finally {
  await client.end();
}
process.exit(0);
