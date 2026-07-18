import { Client } from 'pg';
const client = new Client({
  connectionString: 'postgresql://postgres:123harimahesh@db.eesiuqeswydlmwhecrcy.supabase.co:5432/postgres',
});
await client.connect();

// Check realtime publications
const { rows: pubs } = await client.query(`
  SELECT pubname, puballtables, pubinsert, pubupdate, pubdelete, pubtruncate
  FROM pg_publication
  ORDER BY pubname
`);
console.log('Publications:');
for (const p of pubs) {
  console.log(`  ${p.pubname}: all_tables=${p.puballtables} insert=${p.pubinsert} update=${p.pubupdate} delete=${p.pubdelete}`);
}

// Check which tables are in each publication
const { rows: pubTables } = await client.query(`
  SELECT p.pubname, t.schemaname, t.tablename
  FROM pg_publication p
  JOIN pg_publication_tables t ON p.pubname = t.pubname
  WHERE t.tablename = 'login_sessions'
  ORDER BY p.pubname
`);
console.log('\nlogin_sessions in publications:');
for (const t of pubTables) {
  console.log(`  ${t.pubname}.${t.schemaname}.${t.tablename}`);
}

// List ALL tables in supabase_realtime
const { rows: rt } = await client.query(`
  SELECT tablename FROM pg_publication_tables WHERE pubname = 'supabase_realtime'
`);
console.log('\nAll tables in supabase_realtime:');
for (const t of rt) {
  console.log(`  ${t.tablename}`);
}

await client.end();
