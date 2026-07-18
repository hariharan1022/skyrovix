import pg from 'pg';
const { Client } = pg;
const c = new Client('postgresql://postgres:123harimahesh@db.eesiuqeswydlmwhecrcy.supabase.co:5432/postgres');
await c.connect();

// Try to find the JWT secret from various possible locations
const queries = [
  "SELECT current_setting('app.settings.jwt_secret', true) as val",
  "SELECT current_setting('supabase.auth.jwt_secret', true) as val",
  "SHOW auth.jwt_secret",
  "SELECT setting FROM pg_settings WHERE name LIKE '%jwt%' OR name LIKE '%secret%'",
  "SELECT * FROM auth.config WHERE 1=1 LIMIT 5",
  "SELECT column_name, data_type FROM information_schema.columns WHERE table_schema='auth'",
];

for (const q of queries) {
  try {
    const r = await c.query(q);
    if (r.rows.length > 0) {
      console.log('Query: ' + q);
      console.log('Result: ' + JSON.stringify(r.rows, null, 2));
    }
  } catch (e) {
    // Silently skip failed queries
  }
}

// Check the auth schema tables
const authTables = await c.query("SELECT table_name FROM information_schema.tables WHERE table_schema='auth' ORDER BY table_name");
console.log('\nAuth tables:', authTables.rows.map(r => r.table_name).join(', '));

await c.end();
