# Courses & LMS — Implementation Plan

A full LMS would be a multi-week build. I'll ship a focused, premium MVP in this turn that covers the entire student journey end-to-end, then we can layer admin authoring and richer content in follow-ups.

## What ships now

### Database (Lovable Cloud)
New tables (all RLS-enabled, admin-managed, student-readable):

- `courses` — slug, name, description, icon, total_topics, total_tasks, quiz_marks, pass_marks, duration_weeks, difficulty, domain
- `course_topics` — course_id, order_index, title, content_md, code_example, key_points[]
- `course_tasks` — course_id, task_number, title, description, requirements, due_days
- `course_quiz_questions` — course_id, question, options jsonb, correct_index, type, marks
- `enrollments` — user_id, course_id, status (enrolled / in_progress / completed), progress_percent, current_topic_id, started_at, completed_at
- `lesson_progress` — enrollment_id, topic_id, completed_at
- `course_task_submissions` — enrollment_id, task_id, project_url, file_path, status, feedback
- `quiz_attempts` — enrollment_id, score, total, passed, started_at, submitted_at, answers jsonb
- `course_certificates` — enrollment_id, certificate_id (SKY-{DOMAIN}-YYYY-NNNNNN), verification_hash, score, issued_at

Plus a `course-task-files` private storage bucket and seed data for one Full Stack Development course (12 topics, 5 tasks, 10 sample quiz questions) so the flow is demonstrable immediately.

### Routes (all responsive, light theme, no emojis)

- `/courses` — modern card grid (icon, name, description, topics/tasks/quiz/duration/difficulty, progress bar, Enroll / Continue button)
- `/courses/$slug` — course details + W3Schools-style left sidebar with topics, lesson content area (theory, code block, key points), Previous/Next buttons, auto-saved progress, "Important Tasks" section unlocked after all lessons, quiz unlocked after all 5 tasks submitted
- `/courses/$slug/quiz` — timed quiz runner (60 min, prev/next, mark for review, auto-submit)
- `/courses/$slug/result` — pass/fail screen, score, certificate download (PDF) when passed; retake after 24h when failed
- `/verify-certificate` — already exists; extended to look up `course_certificates` too

### Components
- `CourseCard`, `LessonSidebar`, `LessonViewer`, `TaskList`, `QuizRunner`, `QuizResult`, `CourseCertificateDoc` (react-pdf, brand-themed with QR for `/verify-certificate?id=...`)

### Navbar
Add "Courses" link.

## Explicitly out of scope this turn (follow-ups)
- Full admin authoring UI for courses/topics/quiz (data can be seeded via migrations for now; admin task-approval reuses existing admin panel pattern in a later turn).
- Tab-switching prevention, randomized question shuffling per attempt, glassmorphism dark-mode polish.
- Additional course catalogs beyond the Full Stack seed (easy to add once schema is approved).

## Technical notes
- Progress auto-saves via a debounced server fn on lesson scroll/next.
- Quiz scoring is server-side in a `createServerFn` to prevent client tampering.
- Certificate PDF reuses the existing `@react-pdf/renderer` setup in `src/components/pdf-docs.tsx`.
- All new public-schema tables get explicit `GRANT` + RLS policies (student reads own rows, admin via `has_role`).

Approve and I'll build it.
