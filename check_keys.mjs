import pg from 'pg';
const { Client } = pg;
const c = new Client('postgresql://postgres:123harimahesh@db.eesiuqeswydlmwhecrcy.supabase.co:5432/postgres');
await c.connect();

console.log('--- Checking vault.secrets ---');
try {
  const r = await c.query('SELECT * FROM vault.secrets');
  console.log(r.rows);
} catch (e) {
  console.log('vault error:', e.message);
}

console.log('--- Checking pg_settings ---');
try {
  const r = await c.query("SELECT name, setting FROM pg_settings WHERE name LIKE '%jwt%' OR name LIKE '%auth%' OR name LIKE '%secret%'");
  console.log(r.rows);
} catch (e) {
  console.log('pg_settings error:', e.message);
}

console.log('--- Checking auth tables ---');
try {
  const r = await c.query("SELECT table_name FROM information_schema.tables WHERE table_schema='auth'");
  console.log(r.rows.map(x => x.table_name));
} catch (e) {
  console.log('auth tables error:', e.message);
}

await c.end();
