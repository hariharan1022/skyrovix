import pg from 'pg';
const { Client } = pg;
const c = new Client('postgresql://postgres:123harimahesh@db.eesiuqeswydlmwhecrcy.supabase.co:5432/postgres');
await c.connect();

// Check if login_sessions exists
const exists = await c.query("SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='login_sessions'");
if (exists.rows.length === 0) {
  console.log('Creating login_sessions table...');
  await c.query(`
    CREATE TABLE public.login_sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      intern_id TEXT,
      student_name TEXT,
      email TEXT,
      domain TEXT,
      college TEXT,
      login_time TIMESTAMPTZ NOT NULL DEFAULT now(),
      logout_time TIMESTAMPTZ,
      last_active TIMESTAMPTZ NOT NULL DEFAULT now(),
      status TEXT NOT NULL DEFAULT 'online',
      ip_address TEXT,
      device TEXT,
      browser TEXT,
      os TEXT,
      country TEXT,
      state TEXT,
      city TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  await c.query('ALTER TABLE public.login_sessions ENABLE ROW LEVEL SECURITY');
  await c.query('GRANT SELECT, INSERT, UPDATE ON public.login_sessions TO authenticated');
  await c.query('GRANT ALL ON public.login_sessions TO service_role');
  console.log('login_sessions table created');
} else {
  console.log('login_sessions table already exists');
}

// Check RLS policies
const policies = await c.query("SELECT policyname FROM pg_policies WHERE schemaname='public' AND tablename='login_sessions'");
if (policies.rows.length === 0) {
  console.log('Creating RLS policies for login_sessions...');
  // Admins can see all sessions
  await c.query(`
    DROP POLICY IF EXISTS "Admins view all login sessions" ON public.login_sessions;
    CREATE POLICY "Admins view all login sessions" ON public.login_sessions
      FOR SELECT TO authenticated
      USING (has_role(auth.uid(), 'admin'::app_role));
  `);
  // Users can see their own sessions
  await c.query(`
    DROP POLICY IF EXISTS "Users view own sessions" ON public.login_sessions;
    CREATE POLICY "Users view own sessions" ON public.login_sessions
      FOR SELECT TO authenticated
      USING (student_id = auth.uid());
  `);
  // Users can insert their own sessions
  await c.query(`
    DROP POLICY IF EXISTS "Users insert own sessions" ON public.login_sessions;
    CREATE POLICY "Users insert own sessions" ON public.login_sessions
      FOR INSERT TO authenticated
      WITH CHECK (student_id = auth.uid());
  `);
  // Users can update their own sessions
  await c.query(`
    DROP POLICY IF EXISTS "Users update own sessions" ON public.login_sessions;
    CREATE POLICY "Users update own sessions" ON public.login_sessions
      FOR UPDATE TO authenticated
      USING (student_id = auth.uid())
      WITH CHECK (student_id = auth.uid());
  `);
  console.log('RLS policies created');
} else {
  console.log('RLS policies already exist');
}

// Enable real-time for login_sessions
try {
  await c.query("ALTER PUBLICATION supabase_realtime ADD TABLE public.login_sessions");
  console.log('login_sessions added to real-time publication');
} catch (e) {
  console.log('Real-time publication note:', e.message);
}

// Check submission_status distribution
const dist = await c.query("SELECT submission_status, COUNT(*) FROM public.applications GROUP BY submission_status ORDER BY submission_status");
console.log('\nSubmission status distribution:');
dist.rows.forEach(r => console.log(`  ${r.submission_status}: ${r.count}`));

// Check if applications table has the right columns
const cols = await c.query("SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='applications' ORDER BY ordinal_position");
const colNames = cols.rows.map(r => r.column_name);
console.log('\nRequired submission workflow columns present:');
['submission_status','submitted_at','verified','verified_by','verified_at','rejection_reason','certificate_generated','certificate_generated_at'].forEach(cn => {
  console.log(`  ${colNames.includes(cn) ? '✓' : '✗'} ${cn}`);
});

await c.end();
