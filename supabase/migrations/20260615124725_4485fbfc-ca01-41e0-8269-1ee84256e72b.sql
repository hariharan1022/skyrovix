
-- ============ ENUMS ============
CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TYPE public.application_status AS ENUM ('pending', 'approved');
CREATE TYPE public.submission_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.payment_status AS ENUM ('pending', 'verified', 'rejected');

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  college TEXT,
  course TEXT,
  year TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ============ USER ROLES ============
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- ============ APPLICATIONS ============
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  status public.application_status NOT NULL DEFAULT 'approved',
  intern_id TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  college TEXT,
  course TEXT,
  year TEXT,
  photo_url TEXT,
  offer_issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.applications TO authenticated;
GRANT ALL ON public.applications TO service_role;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- ============ TASKS ============
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT NOT NULL,
  task_number INT NOT NULL CHECK (task_number BETWEEN 1 AND 5),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  resources TEXT,
  UNIQUE (domain, task_number)
);
GRANT SELECT ON public.tasks TO authenticated, anon;
GRANT ALL ON public.tasks TO service_role;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tasks are public" ON public.tasks FOR SELECT TO anon, authenticated USING (true);

-- ============ SUBMISSIONS ============
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  github_url TEXT,
  deployed_url TEXT,
  notes TEXT,
  status public.submission_status NOT NULL DEFAULT 'pending',
  feedback TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  UNIQUE (application_id, task_id)
);
GRANT SELECT, INSERT, UPDATE ON public.submissions TO authenticated;
GRANT ALL ON public.submissions TO service_role;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- ============ PAYMENTS ============
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE UNIQUE,
  utr_number TEXT NOT NULL,
  screenshot_url TEXT,
  amount NUMERIC NOT NULL DEFAULT 100,
  status public.payment_status NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  verified_at TIMESTAMPTZ
);
GRANT SELECT, INSERT, UPDATE ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- ============ CERTIFICATES ============
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE UNIQUE,
  certificate_id TEXT NOT NULL UNIQUE,
  verification_hash TEXT NOT NULL,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.certificates TO authenticated, anon;
GRANT INSERT, UPDATE ON public.certificates TO authenticated;
GRANT ALL ON public.certificates TO service_role;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Certificates are publicly verifiable" ON public.certificates FOR SELECT TO anon, authenticated USING (true);

-- ============ POLICIES ============
-- profiles
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- user_roles
CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- applications
CREATE POLICY "Users view own applications" ON public.applications FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users create own applications" ON public.applications FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins update applications" ON public.applications FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- submissions
CREATE POLICY "Users view own submissions" ON public.submissions FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.applications a WHERE a.id = submissions.application_id AND a.user_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "Users insert own submissions" ON public.submissions FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.applications a WHERE a.id = submissions.application_id AND a.user_id = auth.uid())
);
CREATE POLICY "Users update own pending submissions" ON public.submissions FOR UPDATE TO authenticated USING (
  (EXISTS (SELECT 1 FROM public.applications a WHERE a.id = submissions.application_id AND a.user_id = auth.uid()) AND status = 'pending')
  OR public.has_role(auth.uid(), 'admin')
);

-- payments
CREATE POLICY "Users view own payments" ON public.payments FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.applications a WHERE a.id = payments.application_id AND a.user_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "Users insert own payments" ON public.payments FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.applications a WHERE a.id = payments.application_id AND a.user_id = auth.uid())
);
CREATE POLICY "Admins update payments" ON public.payments FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- certificates
CREATE POLICY "Authenticated can insert certificates" ON public.certificates FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ TRIGGERS ============
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)));

  IF NEW.email = 'hariharan@skyrovix.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ SEED TASKS ============
INSERT INTO public.tasks (domain, task_number, title, description, resources) VALUES
-- Full Stack
('fullstack', 1, 'Personal Portfolio Website', 'Build a responsive personal portfolio with React + Tailwind. Include Home, About, Projects, Contact.', 'MDN, React docs'),
('fullstack', 2, 'REST API with CRUD', 'Build a Node.js/Express API with full CRUD on a "tasks" resource. Use MongoDB or PostgreSQL.', 'Express docs'),
('fullstack', 3, 'Authentication System', 'Add JWT or session-based auth (signup/login/logout) to your API + a React frontend.', ''),
('fullstack', 4, 'Real-time Chat App', 'Build a real-time chat with Socket.io or Supabase Realtime.', ''),
('fullstack', 5, 'Full Stack Capstone', 'Design + ship a full stack product of your choice (e.g. blog, task manager, e-commerce). Deploy live.', ''),
-- Frontend
('frontend', 1, 'Landing Page Clone', 'Pixel-perfect responsive clone of any modern SaaS landing page.', ''),
('frontend', 2, 'Component Library', 'Build 8 reusable accessible components (Button, Modal, Tabs, Toast, etc.) with Tailwind.', ''),
('frontend', 3, 'Dashboard UI', 'Build an analytics dashboard with charts (Recharts/Chart.js), filters, dark mode.', ''),
('frontend', 4, 'Animated Web App', 'Use Framer Motion to build an interactive animated UI (e.g. onboarding flow, product showcase).', ''),
('frontend', 5, 'Frontend Capstone', 'Ship a polished frontend product. Lighthouse score ≥ 90.', ''),
-- Backend
('backend', 1, 'REST API Basics', 'Build a Node/Express API with CRUD + validation + error handling.', ''),
('backend', 2, 'Database Design', 'Design a normalized relational schema for an e-commerce store. Implement migrations.', ''),
('backend', 3, 'Authentication & Authorization', 'Implement JWT auth + role-based access control.', ''),
('backend', 4, 'File Uploads & Email', 'Add S3/Cloudinary uploads + transactional email (SendGrid/Resend).', ''),
('backend', 5, 'Backend Capstone', 'Ship a production-grade backend with tests, docs (Swagger/Postman) and deployment.', ''),
-- Data Science
('datascience', 1, 'Exploratory Data Analysis', 'Pick a Kaggle dataset, do EDA with pandas + matplotlib/seaborn. Submit notebook.', ''),
('datascience', 2, 'Data Cleaning Pipeline', 'Build a reproducible cleaning pipeline for a messy dataset.', ''),
('datascience', 3, 'Predictive Model', 'Train + evaluate a regression or classification model. Report metrics.', ''),
('datascience', 4, 'Dashboard / Visualization', 'Build an interactive dashboard with Streamlit or Plotly Dash.', ''),
('datascience', 5, 'DS Capstone', 'End-to-end DS project: data → model → deployed app or report.', ''),
-- AI/ML
('aiml', 1, 'ML Fundamentals', 'Implement linear regression + logistic regression from scratch in NumPy.', ''),
('aiml', 2, 'Classification Project', 'Train a classifier (sklearn) on a real dataset. Report confusion matrix + F1.', ''),
('aiml', 3, 'Neural Network', 'Build an image classifier with PyTorch or TensorFlow.', ''),
('aiml', 4, 'LLM Application', 'Build an app using OpenAI / Gemini APIs (e.g. chatbot, summarizer, RAG).', ''),
('aiml', 5, 'AI/ML Capstone', 'Ship an ML model behind a web UI. Document the pipeline.', ''),
-- UI/UX
('uiux', 1, 'Design Research', 'Pick a problem, do user interviews/surveys, document personas + journey map.', ''),
('uiux', 2, 'Wireframes', 'Low-fi wireframes for a mobile app (5+ screens) in Figma.', ''),
('uiux', 3, 'High-Fidelity Mockups', 'High-fidelity Figma mockups with proper design system (colors, type, components).', ''),
('uiux', 4, 'Interactive Prototype', 'Clickable Figma prototype with micro-interactions.', ''),
('uiux', 5, 'UX Capstone', 'Full case study (research → wireframes → mockups → prototype → usability test).', ''),
-- Python
('python', 1, 'Python Basics Project', 'CLI tool of your choice (e.g. todo, currency converter, file organizer).', ''),
('python', 2, 'Web Scraper', 'Scrape a website with requests + BeautifulSoup or Playwright; save to CSV.', ''),
('python', 3, 'Flask/FastAPI App', 'Build a small web API with FastAPI.', ''),
('python', 4, 'Automation Script', 'Automate a real-world task (email, file processing, reports).', ''),
('python', 5, 'Python Capstone', 'Ship a Python project (web app, data tool, or library) with tests.', ''),
-- Java
('java', 1, 'Java Fundamentals', 'OOP project: design a Library Management System (classes, inheritance, interfaces).', ''),
('java', 2, 'Collections & Streams', 'Build a data-processing app using Streams, Lambdas, Collections.', ''),
('java', 3, 'Spring Boot REST API', 'Build a REST API with Spring Boot + JPA + PostgreSQL.', ''),
('java', 4, 'Authentication', 'Add JWT auth to your Spring Boot API.', ''),
('java', 5, 'Java Capstone', 'Ship a full Spring Boot backend, deployed with documentation.', ''),
-- Cyber Security
('cybersecurity', 1, 'CIA Triad & Recon', 'Write a report on Confidentiality/Integrity/Availability + perform OSINT on a target you own.', ''),
('cybersecurity', 2, 'Network Scanning', 'Use Nmap to scan + document open ports + services on a lab machine.', ''),
('cybersecurity', 3, 'Web Vulnerability Lab', 'Solve OWASP Juice Shop / DVWA challenges (SQLi, XSS, CSRF). Submit writeups.', ''),
('cybersecurity', 4, 'Password Cracking & Hashing', 'Use Hashcat/John on test hashes; explain salting + KDFs.', ''),
('cybersecurity', 5, 'CyberSec Capstone', 'Full pentest report on a vulnerable VM (HackTheBox/TryHackMe).', ''),
-- Digital Marketing
('digitalmarketing', 1, 'SEO Audit', 'Run a full SEO audit on a website (keywords, on-page, backlinks). Submit report.', ''),
('digitalmarketing', 2, 'Social Media Strategy', '30-day content calendar for a brand of your choice (Instagram + LinkedIn).', ''),
('digitalmarketing', 3, 'Google Ads Campaign', 'Plan a Google Ads campaign (keywords, ad copy, budget, KPIs).', ''),
('digitalmarketing', 4, 'Email Marketing', 'Design a 5-email drip campaign + landing page.', ''),
('digitalmarketing', 5, 'DM Capstone', 'Real campaign for a small business / portfolio site with measurable results.', '');
