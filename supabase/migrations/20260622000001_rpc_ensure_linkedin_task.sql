-- RPC: ensure the LinkedIn post task (task_number 0) exists for a given domain
-- and return its UUID. Uses SECURITY DEFINER so authenticated users can trigger
-- the INSERT even though they only have SELECT on the tasks table.
CREATE OR REPLACE FUNCTION public.ensure_linkedin_task(p_domain TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id UUID;
BEGIN
  -- Try to find existing task
  SELECT id INTO v_id
  FROM public.tasks
  WHERE domain = p_domain AND task_number = 0;

  -- If not found, create it
  IF v_id IS NULL THEN
    INSERT INTO public.tasks (domain, task_number, title, description)
    VALUES (
      p_domain,
      0,
      'Share Your Offer Letter on LinkedIn',
      'Post your Skyrovix offer letter on LinkedIn to celebrate your internship and inspire others.'
    )
    ON CONFLICT (domain, task_number) DO NOTHING
    RETURNING id INTO v_id;

    -- In case of a race condition (conflict), fetch it again
    IF v_id IS NULL THEN
      SELECT id INTO v_id
      FROM public.tasks
      WHERE domain = p_domain AND task_number = 0;
    END IF;
  END IF;

  RETURN v_id;
END;
$$;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.ensure_linkedin_task(TEXT) TO authenticated;

-- Also seed LinkedIn tasks for all existing domains right now
-- (in case this migration runs on the live DB)
ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS tasks_task_number_check;
ALTER TABLE public.tasks ADD CONSTRAINT tasks_task_number_check CHECK (task_number BETWEEN 0 AND 5);

INSERT INTO public.tasks (domain, task_number, title, description)
SELECT DISTINCT domain, 0,
  'Share Your Offer Letter on LinkedIn',
  'Post your Skyrovix offer letter on LinkedIn to celebrate your internship and inspire others.'
FROM public.tasks
WHERE domain IS NOT NULL AND task_number > 0
ON CONFLICT (domain, task_number) DO NOTHING;
