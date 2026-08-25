-- =========================================================
-- SKYROVIX — Submission History + Rejection Reason
-- Run this in your Supabase SQL Editor
-- =========================================================

-- 1. Submission history table for both internship and course submissions
CREATE TABLE IF NOT EXISTS public.submission_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL,
  table_name TEXT NOT NULL,
  previous_status TEXT,
  new_status TEXT NOT NULL,
  changed_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.submission_history TO authenticated;
GRANT ALL ON public.submission_history TO service_role;
ALTER TABLE public.submission_history ENABLE ROW LEVEL SECURITY;

-- Admin can see all history
DROP POLICY IF EXISTS "Admin view submission history" ON public.submission_history;
CREATE POLICY "Admin view submission history" ON public.submission_history
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR EXISTS (
    SELECT 1 FROM public.submissions s
    WHERE s.id = submission_id AND table_name = 'submissions'
    AND EXISTS (SELECT 1 FROM public.applications a WHERE a.id = s.application_id AND a.user_id = auth.uid())
  ) OR EXISTS (
    SELECT 1 FROM public.course_task_submissions cs
    WHERE cs.id = submission_id AND table_name = 'course_task_submissions'
    AND EXISTS (SELECT 1 FROM public.enrollments e WHERE e.id = cs.enrollment_id AND e.user_id = auth.uid())
  ));

-- Users can insert their own resubmission history
DROP POLICY IF EXISTS "Users insert submission history" ON public.submission_history;
CREATE POLICY "Users insert submission history" ON public.submission_history
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = changed_by);

-- Grant usage for submission_status enum
GRANT USAGE ON TYPE public.submission_status TO authenticated;
