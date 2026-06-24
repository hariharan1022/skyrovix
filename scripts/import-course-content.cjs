const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('ERROR: SUPABASE_SERVICE_ROLE_KEY not set in .env');
  console.error('Add it to .env: SUPABASE_SERVICE_ROLE_KEY=your_key_here');
  console.error('Get it from: Supabase Dashboard → Settings → API → service_role key');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const DIR_TO_SLUG = {
  python: 'python',
  java: 'java',
  html: 'html',
  css: 'css',
  javascript: 'javascript',
  php: 'php',
  mysql: 'mysql',
  django: 'django',
  numpy: 'numpy',
  pandas: 'pandas',
  scipy: 'scipy',
  matplotlib: 'matplotlib',
};

const COURSE_META = {
  python: { name: 'Python', icon: 'Code2', domain: 'python', difficulty: 'Beginner', duration_weeks: 10, description: 'Learn Python programming from basics to advanced' },
  java: { name: 'Java', icon: 'Monitor', domain: 'java', difficulty: 'Intermediate', duration_weeks: 10, description: 'Master Java development with OOP and data structures' },
  html: { name: 'HTML', icon: 'Code2', domain: 'html', difficulty: 'Beginner', duration_weeks: 6, description: 'Build web pages with HTML5 from scratch' },
  css: { name: 'CSS', icon: 'Palette', domain: 'css', difficulty: 'Intermediate', duration_weeks: 8, description: 'Style beautiful responsive websites with CSS' },
  javascript: { name: 'JavaScript', icon: 'Brain', domain: 'javascript', difficulty: 'Intermediate', duration_weeks: 10, description: 'Learn JavaScript for dynamic web applications' },
  php: { name: 'PHP', icon: 'Server', domain: 'php', difficulty: 'Intermediate', duration_weeks: 8, description: 'Build dynamic web applications with PHP' },
  mysql: { name: 'MySQL', icon: 'Database', domain: 'mysql', difficulty: 'Intermediate', duration_weeks: 6, description: 'Master database queries with MySQL' },
  django: { name: 'Django', icon: 'Server', domain: 'django', difficulty: 'Intermediate', duration_weeks: 8, description: 'Build robust web apps with Django framework' },
  numpy: { name: 'NumPy', icon: 'BarChart3', domain: 'numpy', difficulty: 'Intermediate', duration_weeks: 4, description: 'Scientific computing with NumPy arrays' },
  pandas: { name: 'Pandas', icon: 'BarChart3', domain: 'pandas', difficulty: 'Intermediate', duration_weeks: 6, description: 'Data analysis with Pandas DataFrames' },
  scipy: { name: 'SciPy', icon: 'BarChart3', domain: 'scipy', difficulty: 'Advanced', duration_weeks: 4, description: 'Advanced scientific computing with SciPy' },
  matplotlib: { name: 'Matplotlib', icon: 'BarChart3', domain: 'matplotlib', difficulty: 'Intermediate', duration_weeks: 4, description: 'Data visualization with Matplotlib' },
};

const CONTENT_DIR = path.resolve(__dirname, '..', 'course-content');

function extractCodeExample(content) {
  const match = content.match(/```[\w]*\n([\s\S]*?)```/);
  return match ? match[1].trim() : null;
}

function extractKeyPoints(content) {
  const points = [];
  const lines = content.split('\n');
  let inKeyConcepts = false;
  for (const line of lines) {
    if (line.includes('🧠 Key Concepts')) { inKeyConcepts = true; continue; }
    if (inKeyConcepts && line.startsWith('## ')) break;
    if (inKeyConcepts && line.match(/^- \*\*(.+?)\*\*/)) {
      const m = line.match(/- \*\*(.+?)\*\*/);
      if (m) points.push(m[1].trim());
    }
    if (inKeyConcepts && line.match(/^- /) && !line.match(/^- \*\*/)) {
      points.push(line.replace(/^- /, '').trim());
    }
  }
  return points.length > 0 ? points.slice(0, 10) : ['Learn the fundamentals', 'Practice with examples'];
}

function parseTopicNumber(filename) {
  const m = filename.match(/^(\d+)_/);
  return m ? parseInt(m[1]) : null;
}

function parseTopicTitle(content) {
  const m = content.match(/^## \d+\.\s*(.+)$/m);
  return m ? m[1].trim() : 'Untitled Topic';
}

async function ensureCourse(slug, meta, topicCount) {
  const { data: existing } = await supabase.from('courses').select('id').eq('slug', slug).single();
  if (existing) {
    console.log(`  Course "${slug}" exists (id: ${existing.id}), updating total_topics → ${topicCount}`);
    await supabase.from('courses').update({ total_topics: topicCount, name: meta.name }).eq('id', existing.id);
    return existing.id;
  }
  const { data, error } = await supabase.from('courses').insert({
    slug,
    name: meta.name,
    short_description: meta.description,
    icon: meta.icon,
    domain: meta.domain,
    difficulty: meta.difficulty,
    duration_weeks: meta.duration_weeks,
    total_topics: topicCount,
    is_published: true,
  }).select('id').single();
  if (error) { console.error(`  ERROR creating course "${slug}":`, error); return null; }
  console.log(`  Created course "${slug}" (id: ${data.id})`);
  return data.id;
}

async function importCourse(dirName, slug) {
  const dir = path.join(CONTENT_DIR, dirName);
  if (!fs.existsSync(dir)) { console.log(`SKIP: directory ${dirName} not found`); return; }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();
  console.log(`\n=== ${dirName} → "${slug}" (${files.length} topics) ===`);

  const meta = COURSE_META[slug];
  const courseId = await ensureCourse(slug, meta, files.length);
  if (!courseId) return;

  // Delete existing topics for this course and re-insert
  const { error: delErr } = await supabase.from('course_topics').delete().eq('course_id', courseId);
  if (delErr) { console.error(`  ERROR deleting old topics:`, delErr); return; }

  let success = 0;
  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const orderIndex = parseTopicNumber(file);
    const title = parseTopicTitle(content);
    const codeExample = extractCodeExample(content);
    const keyPoints = extractKeyPoints(content);
    const contentMd = content;

    if (orderIndex === null) {
      console.warn(`  WARN: could not parse number from ${file}, skipping`);
      continue;
    }

    const { error } = await supabase.from('course_topics').insert({
      course_id: courseId,
      order_index: orderIndex,
      title,
      content_md: contentMd,
      code_example: codeExample,
      key_points: keyPoints,
    });

    if (error) {
      console.error(`  ERROR inserting ${file}:`, error.message);
    } else {
      success++;
    }
  }

  console.log(`  Done: ${success}/${files.length} topics imported for "${slug}"`);
}

(async () => {
  console.log('=== COURSE CONTENT IMPORT SCRIPT ===\n');

  for (const [dirName, slug] of Object.entries(DIR_TO_SLUG)) {
    await importCourse(dirName, slug);
  }

  console.log('\n=== VERIFICATION ===');
  const { data: courses } = await supabase.from('courses').select('slug, name, total_topics').order('slug');
  for (const c of courses) {
    const { count } = await supabase.from('course_topics').select('*', { count: 'exact', head: true }).eq('course_id', c.id);
    console.log(`  ${c.slug}: ${c.total_topics} declared, ${count} actual topics in DB`);
  }

  console.log('\n=== DONE ===');
})().catch(console.error);
