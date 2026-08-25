import pg from 'pg';
const { Client } = pg;
const c = new Client('postgresql://postgres:123harimahesh@db.eesiuqeswydlmwhecrcy.supabase.co:5432/postgres');
await c.connect();

// Check FK constraints on applications
const fks = await c.query(`
  SELECT
    tc.constraint_name,
    tc.table_name AS source_table,
    kcu.column_name AS source_column,
    ccu.table_name AS target_table,
    ccu.column_name AS target_column,
    rc.delete_rule
  FROM information_schema.table_constraints tc
  JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
  JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
  JOIN information_schema.referential_constraints rc ON tc.constraint_name = rc.constraint_name
  WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_schema = 'public'
  ORDER BY tc.table_name, tc.constraint_name
`);
console.log('=== FOREIGN KEY CONSTRAINTS (public) ===');
fks.rows.forEach(fk => {
  console.log(`  ${fk.source_table}.${fk.source_column} -> ${fk.target_table}.${fk.target_column} [${fk.delete_rule}]`);
});

// Check triggers
const triggers = await c.query(`
  SELECT trigger_name, event_manipulation, event_object_table, action_statement
  FROM information_schema.triggers
  WHERE trigger_schema = 'public'
  ORDER BY event_object_table, trigger_name
`);
console.log('\n=== TRIGGERS (public) ===');
if (triggers.rows.length === 0) console.log('  No triggers found');
triggers.rows.forEach(t => console.log(`  ${t.event_object_table}: ${t.trigger_name} (${t.event_manipulation})`));

// Check RLS policies on applications
const policies = await c.query(`
  SELECT policyname, cmd, qual, with_check
  FROM pg_policies
  WHERE schemaname = 'public' AND tablename = 'applications'
`);
console.log('\n=== RLS POLICIES (applications) ===');
policies.rows.forEach(p => {
  console.log(`  ${p.policyname} (${p.cmd}):`);
  if (p.qual) console.log(`    USING: ${p.qual.substring(0, 200)}`);
  if (p.with_check) console.log(`    CHECK: ${p.with_check.substring(0, 200)}`);
});

await c.end();
