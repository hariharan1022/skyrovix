-- Expand task_number constraint from 5 to 12 tasks per domain
-- Run this in your Supabase SQL Editor

ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS tasks_task_number_check;
ALTER TABLE public.tasks ADD CONSTRAINT tasks_task_number_check CHECK (task_number BETWEEN 0 AND 12);
