import pg from 'pg';

const { Client } = pg;
const CONN = 'postgresql://postgres:123harimahesh@db.eesiuqeswydlmwhecrcy.supabase.co:5432/postgres';

async function query(client, sql) {
  try {
    const r = await client.query(sql);
    return r;
  } catch (e) {
    console.error('  SQL Error:', e.message);
    return null;
  }
}

async function main() {
  const client = new Client(CONN);
  await client.connect();
  console.log('Connected to Supabase PostgreSQL');

  // --- TABLE INVENTORY ---
  const tables = await client.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
  );
  console.log('\n=== PUBLIC TABLES ===');
  tables.rows.forEach(t => console.log('  - ' + t.table_name));
  const tableNames = new Set(tables.rows.map(t => t.table_name));

  // --- ENUM INVENTORY ---
  const enums = await client.query(
    "SELECT t.typname, e.enumlabel FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid ORDER BY t.typname, e.enumsortorder"
  );
  console.log('\n=== ENUMS ===');
  let lastEnum = '';
  enums.rows.forEach(r => {
    if (r.typname !== lastEnum) { console.log('  ' + r.typname + ':'); lastEnum = r.typname; }
    console.log('    - ' + r.enumlabel);
  });
  const enumNames = new Set(enums.rows.map(r => r.typname));

  // --- APPLICATIONS COLUMN INVENTORY ---
  const appCols = await client.query(
    "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'applications' ORDER BY ordinal_position"
  );
  console.log('\n=== APPLICATIONS COLUMNS ===');
  const appColNames = new Set();
  appCols.rows.forEach(c => { appColNames.add(c.column_name); console.log('  - ' + c.column_name + ' (' + c.data_type + ')'); });

  // --- APPLY MIGRATIONS ---

  // 1. Ensure ENUM types exist
  if (!enumNames.has('app_role')) {
    console.log('\n--- Creating app_role enum ---');
    await client.query("CREATE TYPE public.app_role AS ENUM ('admin', 'user')");
  }
  if (!enumNames.has('application_status')) {
    console.log('\n--- Creating application_status enum ---');
    await client.query("CREATE TYPE public.application_status AS ENUM ('pending', 'approved')");
  } else {
    // Add 'ongoing' and 'completed' if missing
    for (const val of ['ongoing', 'completed']) {
      const chk = await client.query("SELECT 1 FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid WHERE t.typname = 'application_status' AND e.enumlabel = $1", [val]);
      if (chk.rows.length === 0) {
        console.log('  Adding application_status value: ' + val);
        await client.query("ALTER TYPE public.application_status ADD VALUE '" + val + "' AFTER 'approved'");
      }
    }
  }
  if (!enumNames.has('submission_status')) {
    console.log('\n--- Creating submission_status enum ---');
    await client.query("CREATE TYPE public.submission_status AS ENUM ('pending', 'approved', 'rejected')");
  }
  if (!enumNames.has('payment_status')) {
    console.log('\n--- Creating payment_status enum ---');
    await client.query("CREATE TYPE public.payment_status AS ENUM ('pending', 'verified', 'rejected')");
  }

  // 2. Ensure core tables exist
  if (!tableNames.has('profiles')) {
    console.log('\n--- Creating profiles table ---');
    await client.query(`
      CREATE TABLE public.profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        full_name TEXT, email TEXT, phone TEXT, college TEXT, course TEXT, year TEXT, photo_url TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);
    await client.query('ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY');
  }

  if (!tableNames.has('user_roles')) {
    console.log('\n--- Creating user_roles table ---');
    await client.query(`
      CREATE TABLE public.user_roles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        role public.app_role NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (user_id, role)
      )
    `);
    await client.query('ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY');
  }

  if (!tableNames.has('applications')) {
    console.log('\n--- Creating applications table ---');
    await client.query(`
      CREATE TABLE public.applications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        domain TEXT NOT NULL,
        status public.application_status NOT NULL DEFAULT 'approved',
        intern_id TEXT NOT NULL UNIQUE,
        full_name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, college TEXT, course TEXT, year TEXT, photo_url TEXT,
        offer_issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);
    await client.query('ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY');
  }

  // 3. ADD MISSING APPLICATIONS COLUMNS (city/location + submission workflow)
  const additionalCols = {
    'country': 'TEXT', 'state': 'TEXT', 'district': 'TEXT', 'city': 'TEXT',
    'pincode': 'TEXT', 'hear_about': 'TEXT', 'referral_name': 'TEXT',
    'submission_status': "TEXT DEFAULT 'in_progress'",
    'submitted_at': 'TIMESTAMPTZ', 'verified': 'BOOLEAN DEFAULT false',
    'verified_by': 'UUID', 'verified_at': 'TIMESTAMPTZ',
    'verification_notes': 'TEXT', 'rejection_reason': 'TEXT',
    'certificate_generated': 'BOOLEAN DEFAULT false',
    'certificate_generated_at': 'TIMESTAMPTZ'
  };

  for (const [col, def] of Object.entries(additionalCols)) {
    if (!appColNames.has(col)) {
      console.log('  Adding column: applications.' + col + ' ' + def);
      await client.query('ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS ' + col + ' ' + def);
    }
  }

  // 4. Ensure remaining tables exist
  const tableDefs = [
    {
      name: 'tasks',
      sql: `CREATE TABLE IF NOT EXISTS public.tasks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        domain TEXT NOT NULL, task_number INT NOT NULL CHECK (task_number BETWEEN 0 AND 5),
        title TEXT NOT NULL, description TEXT NOT NULL, resources TEXT,
        UNIQUE (domain, task_number)
      )`
    },
    {
      name: 'submissions',
      sql: `CREATE TABLE IF NOT EXISTS public.submissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
        task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
        github_url TEXT, deployed_url TEXT, notes TEXT,
        status public.submission_status NOT NULL DEFAULT 'pending',
        feedback TEXT, submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(), reviewed_at TIMESTAMPTZ,
        pdf_url TEXT, screenshot_url TEXT,
        UNIQUE (application_id, task_id)
      )`
    },
    {
      name: 'payments',
      sql: `CREATE TABLE IF NOT EXISTS public.payments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE UNIQUE,
        utr_number TEXT NOT NULL, screenshot_url TEXT, amount NUMERIC NOT NULL DEFAULT 100,
        status public.payment_status NOT NULL DEFAULT 'pending',
        submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(), verified_at TIMESTAMPTZ
      )`
    },
    {
      name: 'certificates',
      sql: `CREATE TABLE IF NOT EXISTS public.certificates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE UNIQUE,
        certificate_id TEXT NOT NULL UNIQUE, verification_hash TEXT NOT NULL,
        issued_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )`
    },
    {
      name: 'courses',
      sql: `CREATE TABLE IF NOT EXISTS public.courses (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text UNIQUE NOT NULL,
        name text NOT NULL, short_description text NOT NULL, icon text NOT NULL DEFAULT 'BookOpen',
        domain text NOT NULL, total_topics int NOT NULL DEFAULT 0, total_tasks int NOT NULL DEFAULT 5,
        quiz_marks int NOT NULL DEFAULT 100, pass_marks int NOT NULL DEFAULT 60,
        quiz_duration_min int NOT NULL DEFAULT 60, duration_weeks int NOT NULL DEFAULT 8,
        difficulty text NOT NULL DEFAULT 'Intermediate', is_published boolean NOT NULL DEFAULT true,
        created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
      )`
    },
    {
      name: 'course_topics',
      sql: `CREATE TABLE IF NOT EXISTS public.course_topics (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
        order_index int NOT NULL, title text NOT NULL, content_md text NOT NULL DEFAULT '',
        code_example text, key_points text[] NOT NULL DEFAULT '{}',
        created_at timestamptz NOT NULL DEFAULT now(),
        UNIQUE (course_id, order_index)
      )`
    },
    {
      name: 'course_tasks',
      sql: `CREATE TABLE IF NOT EXISTS public.course_tasks (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
        task_number int NOT NULL, title text NOT NULL, description text NOT NULL,
        requirements text NOT NULL DEFAULT '', due_days int NOT NULL DEFAULT 7,
        created_at timestamptz NOT NULL DEFAULT now(),
        UNIQUE (course_id, task_number)
      )`
    },
    {
      name: 'course_quiz_questions',
      sql: `CREATE TABLE IF NOT EXISTS public.course_quiz_questions (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
        order_index int NOT NULL, question text NOT NULL,
        options jsonb NOT NULL, correct_index int NOT NULL,
        question_type text NOT NULL DEFAULT 'mcq', marks int NOT NULL DEFAULT 2, explanation text,
        created_at timestamptz NOT NULL DEFAULT now()
      )`
    },
    {
      name: 'enrollments',
      sql: `CREATE TABLE IF NOT EXISTS public.enrollments (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
        status text NOT NULL DEFAULT 'enrolled', progress_percent int NOT NULL DEFAULT 0,
        current_topic_id uuid REFERENCES public.course_topics(id) ON DELETE SET NULL,
        started_at timestamptz NOT NULL DEFAULT now(), completed_at timestamptz,
        created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
        UNIQUE (user_id, course_id)
      )`
    },
    {
      name: 'lesson_progress',
      sql: `CREATE TABLE IF NOT EXISTS public.lesson_progress (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        enrollment_id uuid NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
        topic_id uuid NOT NULL REFERENCES public.course_topics(id) ON DELETE CASCADE,
        completed_at timestamptz NOT NULL DEFAULT now(),
        UNIQUE (enrollment_id, topic_id)
      )`
    },
    {
      name: 'course_task_submissions',
      sql: `CREATE TABLE IF NOT EXISTS public.course_task_submissions (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        enrollment_id uuid NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
        task_id uuid NOT NULL REFERENCES public.course_tasks(id) ON DELETE CASCADE,
        project_url text, file_path text, notes text,
        status text NOT NULL DEFAULT 'pending', feedback text,
        submitted_at timestamptz NOT NULL DEFAULT now(), reviewed_at timestamptz,
        UNIQUE (enrollment_id, task_id)
      )`
    },
    {
      name: 'quiz_attempts',
      sql: `CREATE TABLE IF NOT EXISTS public.quiz_attempts (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        enrollment_id uuid NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
        score int NOT NULL DEFAULT 0, total int NOT NULL DEFAULT 100,
        passed boolean NOT NULL DEFAULT false, answers jsonb NOT NULL DEFAULT '{}'::jsonb,
        started_at timestamptz NOT NULL DEFAULT now(), submitted_at timestamptz
      )`
    },
    {
      name: 'course_certificates',
      sql: `CREATE TABLE IF NOT EXISTS public.course_certificates (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        enrollment_id uuid NOT NULL UNIQUE REFERENCES public.enrollments(id) ON DELETE CASCADE,
        certificate_id text NOT NULL UNIQUE, verification_hash text NOT NULL UNIQUE,
        score int NOT NULL, issued_at timestamptz NOT NULL DEFAULT now()
      )`
    },
    {
      name: 'topic_quiz_questions',
      sql: `CREATE TABLE IF NOT EXISTS public.topic_quiz_questions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        topic_id UUID NOT NULL REFERENCES public.course_topics(id) ON DELETE CASCADE,
        question TEXT NOT NULL, options JSONB NOT NULL, correct_index INT NOT NULL,
        explanation TEXT, order_index INT NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )`
    },
    {
      name: 'topic_quiz_attempts',
      sql: `CREATE TABLE IF NOT EXISTS public.topic_quiz_attempts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        enrollment_id UUID NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
        topic_id UUID NOT NULL REFERENCES public.course_topics(id) ON DELETE CASCADE,
        answers JSONB NOT NULL DEFAULT '{}'::jsonb, score INT NOT NULL DEFAULT 0,
        total INT NOT NULL DEFAULT 5, passed BOOLEAN NOT NULL DEFAULT false,
        attempted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (enrollment_id, topic_id)
      )`
    },
    {
      name: 'bookmarks',
      sql: `CREATE TABLE IF NOT EXISTS public.bookmarks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        topic_id UUID NOT NULL REFERENCES public.course_topics(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (user_id, topic_id)
      )`
    },
    {
      name: 'notes',
      sql: `CREATE TABLE IF NOT EXISTS public.notes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        topic_id UUID NOT NULL REFERENCES public.course_topics(id) ON DELETE CASCADE,
        content TEXT NOT NULL DEFAULT '', updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (user_id, topic_id)
      )`
    },
    {
      name: 'achievement_definitions',
      sql: `CREATE TABLE IF NOT EXISTS public.achievement_definitions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        key TEXT UNIQUE NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL,
        icon TEXT NOT NULL DEFAULT 'Trophy', created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )`
    },
    {
      name: 'achievements',
      sql: `CREATE TABLE IF NOT EXISTS public.achievements (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        achievement_id UUID NOT NULL REFERENCES public.achievement_definitions(id) ON DELETE CASCADE,
        earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (user_id, achievement_id)
      )`
    },
    {
      name: 'leaderboard',
      sql: `CREATE TABLE IF NOT EXISTS public.leaderboard (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
        score INT NOT NULL DEFAULT 0, total INT NOT NULL DEFAULT 100,
        quiz_attempt_id UUID REFERENCES public.quiz_attempts(id) ON DELETE SET NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (user_id, course_id)
      )`
    }
  ];

  for (const td of tableDefs) {
    if (!tableNames.has(td.name)) {
      console.log('\n--- Creating ' + td.name + ' table ---');
      await client.query(td.sql);
      await client.query('ALTER TABLE public.' + td.name + ' ENABLE ROW LEVEL SECURITY');
    }
  }

  // 5. ADD completed_at column to applications
  const hasCompletedAt = await client.query(
    "SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='applications' AND column_name='completed_at'"
  );
  if (hasCompletedAt.rows.length === 0) {
    console.log('\n--- Adding applications.completed_at ---');
    await client.query('ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ');
  }

  // 6. Verify all columns were added
  console.log('\n=== VERIFICATION ===');
  const verifyCols = await client.query(
    "SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'applications' ORDER BY ordinal_position"
  );
  console.log('applications columns after migration:');
  verifyCols.rows.forEach(c => console.log('  - ' + c.column_name + ' (' + c.data_type + ')'));

  // Verify additional key tables exist
  const verifyTables = ['profiles', 'user_roles', 'applications', 'tasks', 'submissions', 'payments', 'certificates',
    'courses', 'course_topics', 'course_tasks', 'course_quiz_questions', 'enrollments', 'lesson_progress',
    'course_task_submissions', 'quiz_attempts', 'course_certificates', 'topic_quiz_questions', 'topic_quiz_attempts',
    'bookmarks', 'notes', 'achievement_definitions', 'achievements', 'leaderboard'];
  for (const tn of verifyTables) {
    const chk = await client.query("SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name=$1", [tn]);
    console.log((chk.rows.length > 0 ? '  ✓' : '  ✗') + ' ' + tn);
  }

  // 7. Verify RLS is enabled
  console.log('\n=== RLS STATUS ===');
  const rls = await client.query("SELECT tablename, rowsecurity FROM pg_tables INNER JOIN pg_class ON pg_tables.tablename = pg_class.relname WHERE schemaname='public' AND pg_class.relkind='r' ORDER BY tablename");
  rls.rows.forEach(r => console.log('  ' + (r.rowsecurity ? '✓' : '✗') + ' ' + r.tablename));

  await client.end();
  console.log('\nMigration complete!');
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
