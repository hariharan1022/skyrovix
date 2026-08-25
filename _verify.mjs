import pg from 'pg';
const { Client } = pg;
const c = new Client('postgresql://postgres:123harimahesh@db.eesiuqeswydlmwhecrcy.supabase.co:5432/postgres');
await c.connect();

// Check column defaults
const r = await c.query("SELECT column_name, column_default FROM information_schema.columns WHERE table_schema='public' AND table_name='applications' AND column_name IN ('submission_status','certificate_generated','verified')");
console.log('Column defaults:');
r.rows.forEach(row => console.log('  ' + row.column_name + ' -> ' + row.column_default));

// Check RLS policies on key tables
const pol = await c.query("SELECT tablename, policyname, cmd, qual FROM pg_policies WHERE schemaname='public' AND tablename IN ('applications','submissions','payments','certificates') ORDER BY tablename");
console.log('\nRLS Policies:');
pol.rows.forEach(p => console.log('  ' + p.tablename + ': ' + p.policyname + ' (' + p.cmd + ')'));

// Check if function exists
const fn = await c.query("SELECT proname, prosrc FROM pg_proc WHERE proname IN ('handle_new_user','has_role','touch_updated_at','ensure_linkedin_task') ORDER BY proname");
console.log('\nFunctions:');
fn.rows.forEach(f => console.log('  ' + f.proname + (f.prosrc ? ' (exists)' : '')));

await c.end();
