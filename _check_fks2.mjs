import pg from 'pg';
const { Client } = pg;
const c = new Client('postgresql://postgres:123harimahesh@db.eesiuqeswydlmwhecrcy.supabase.co:5432/postgres');
await c.connect();

// Check the applications -> auth.users FK constraint
const fks = await c.query(`
  SELECT
    tc.constraint_name,
    tc.table_schema AS source_schema,
    tc.table_name AS source_table,
    kcu.column_name AS source_column,
    ccu.table_schema AS target_schema,
    ccu.table_name AS target_table,
    ccu.column_name AS target_column,
    rc.delete_rule
  FROM information_schema.table_constraints tc
  JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
  JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
  JOIN information_schema.referential_constraints rc ON tc.constraint_name = rc.constraint_name
  WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_name = 'applications'
    AND tc.table_schema = 'public'
`);
console.log('=== FK constraints on applications table ===');
fks.rows.forEach(fk => {
  console.log(`  ${fk.source_schema}.${fk.source_table}.${fk.source_column} -> ${fk.target_schema}.${fk.target_table}.${fk.target_column} [${fk.delete_rule}]`);
});

// Also check the user_roles FK
const fks2 = await c.query(`
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
    AND tc.table_name IN ('user_roles', 'profiles')
    AND tc.table_schema = 'public'
`);
console.log('\n=== FK constraints on user_roles and profiles ===');
fks2.rows.forEach(fk => {
  console.log(`  ${fk.source_table}.${fk.source_column} -> ${fk.target_table}.${fk.target_column} [${fk.delete_rule}]`);
});

// Check auth schema tables
const userFks = await c.query(`
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
    AND tc.table_schema = 'auth'
    AND tc.table_name = 'users'
`);
console.log('\n=== FK on auth.users ===');
userFks.rows.forEach(fk => {
  console.log(`  ${fk.source_table}.${fk.source_column} -> ${fk.target_table}.${fk.target_column} [${fk.delete_rule}]`);
});

await c.end();
