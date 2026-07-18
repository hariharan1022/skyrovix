import pg from 'pg';
const { Client } = pg;
const c = new Client('postgresql://postgres:123harimahesh@db.eesiuqeswydlmwhecrcy.supabase.co:5432/postgres');
await c.connect();

// Direct pg_catalog query for all FKs from public tables
const allFks = await c.query(`
  SELECT
    con.conname AS constraint_name,
    ns1.nspname AS source_schema,
    t1.relname AS source_table,
    a1.attname AS source_column,
    ns2.nspname AS target_schema,
    t2.relname AS target_table,
    a2.attname AS target_column,
    CASE con.confdeltype
      WHEN 'c' THEN 'CASCADE'
      WHEN 'a' THEN 'NO ACTION'
      WHEN 'r' THEN 'RESTRICT'
      WHEN 'n' THEN 'SET NULL'
      WHEN 'd' THEN 'SET DEFAULT'
    END AS delete_rule
  FROM pg_constraint con
  JOIN pg_class t1 ON con.conrelid = t1.oid
  JOIN pg_namespace ns1 ON t1.relnamespace = ns1.oid
  JOIN pg_class t2 ON con.confrelid = t2.oid
  JOIN pg_namespace ns2 ON t2.relnamespace = ns2.oid
  JOIN pg_attribute a1 ON a1.attrelid = t1.oid AND a1.attnum = con.conkey[1]
  JOIN pg_attribute a2 ON a2.attrelid = t2.oid AND a2.attnum = con.confkey[1]
  WHERE con.contype = 'f'
    AND ns1.nspname = 'public'
    AND t1.relname IN ('applications', 'profiles', 'user_roles')
  ORDER BY t1.relname, con.conname
`);
console.log('=== ALL FK CONSTRAINTS (public) ===');
allFks.rows.forEach(fk => {
  console.log(`  ${fk.source_schema}.${fk.source_table}.${fk.source_column} -> ${fk.target_schema}.${fk.target_table}.${fk.target_column} [${fk.delete_rule}]`);
});

// Check what user_id columns reference
const appFK = await c.query(`
  SELECT
    con.conname,
    ns2.nspname AS target_schema,
    t2.relname AS target_table
  FROM pg_constraint con
  JOIN pg_class t1 ON con.conrelid = t1.oid
  JOIN pg_namespace ns1 ON t1.relnamespace = ns1.oid
  JOIN pg_class t2 ON con.confrelid = t2.oid
  JOIN pg_namespace ns2 ON t2.relnamespace = ns2.oid
  WHERE con.contype = 'f'
    AND ns1.nspname = 'public'
    AND t1.relname = 'applications'
`);
console.log('\n=== Detailed FK for applications ===');
appFK.rows.forEach(fk => console.log(`  ${fk.conname} -> ${fk.target_schema}.${fk.target_table}`));

await c.end();
