// Generates SQL migration to insert tasks 6-12 for all 30 domains

const DOMAINS = [
  "fullstack", "frontend", "backend", "datascience", "aiml", "uiux",
  "python", "java", "cybersecurity", "digitalmarketing", "cprogramming",
  "cppprogramming", "mernstack", "meanstack", "dataanalytics",
  "machinelearning", "deeplearning", "generativeai", "promptengineering",
  "cloudcomputing", "ethicalhacking", "androiddevelopment",
  "flutterdevelopment", "reactnative", "graphicdesign", "motiongraphics",
  "videoediting", "animation", "threeddesign",
];

const TASKS = [
  { n: 6, title: "Advanced Feature Implementation", desc: "Implement advanced features with complex business logic and third-party integrations." },
  { n: 7, title: "API Development & Integration", desc: "Design and build RESTful APIs or integrate third-party services relevant to your domain." },
  { n: 8, title: "Database Design & Optimization", desc: "Design efficient schemas, write optimized queries, and implement indexing strategies." },
  { n: 9, title: "Performance Optimization", desc: "Profile and optimize your application for speed, scalability, and resource efficiency." },
  { n: 10, title: "Testing & Quality Assurance", desc: "Write unit and integration tests, perform QA, and ensure code quality standards." },
  { n: 11, title: "Deployment & DevOps", desc: "Set up CI/CD pipelines, containerize your application, and deploy to a cloud platform." },
  { n: 12, title: "Portfolio & Documentation", desc: "Create comprehensive documentation, record a demo, and prepare your portfolio showcase." },
];

let sql = `-- Insert tasks 6-12 for all 30 domains
-- Run this in Supabase SQL Editor

-- Drop old constraint
ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS tasks_task_number_check;

`;

for (const d of DOMAINS) {
  for (const t of TASKS) {
    const title = t.title.replace(/'/g, "''");
    const desc = t.desc.replace(/'/g, "''");
    sql += `INSERT INTO public.tasks (domain, task_number, title, description)\n`;
    sql += `  VALUES ('${d}', ${t.n}, '${title}', '${desc}')\n`;
    sql += `  ON CONFLICT (domain, task_number) DO NOTHING;\n`;
  }
}

sql += `\n-- Add expanded constraint
ALTER TABLE public.tasks ADD CONSTRAINT tasks_task_number_check CHECK (task_number BETWEEN 0 AND 12);
`;

console.log(sql);
