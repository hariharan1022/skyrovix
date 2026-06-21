-- Allow task_number 0 for the LinkedIn post task
ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS tasks_task_number_check;
ALTER TABLE public.tasks ADD CONSTRAINT tasks_task_number_check CHECK (task_number BETWEEN 0 AND 5);
