ALTER TYPE public.application_status ADD VALUE 'ongoing' AFTER 'approved';
ALTER TYPE public.application_status ADD VALUE 'completed' AFTER 'ongoing';
ALTER TABLE public.applications ADD COLUMN completed_at TIMESTAMPTZ;
