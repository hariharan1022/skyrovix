import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  connectionString: 'postgresql://postgres:123harimahesh@db.eesiuqeswydlmwhecrcy.supabase.co:5432/postgres',
});

await client.connect();
console.log("Connected to database.");

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

await client.end();
process.exit(0);
