import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import {
  CheckCircle2, Circle, ChevronLeft, ChevronRight, Lock, ListChecks,
  Brain, BookOpen, Clock, Award, FileText, UploadCloud,
} from "lucide-react";

export const Route = createFileRoute("/courses/$slug")({
  ssr: false,
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} Course — Skyrovix` },
      { name: "description", content: "Topic-wise lessons, practical tasks, and a final quiz to earn your verified certificate." },
    ],
  }),
  component: CourseDetail,
});

function CourseDetail() {
  const { slug } = Route.useParams();
  const { user, loading: authLoading } = useAuth();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: topics } = useQuery({
    queryKey: ["course-topics", course?.id],
    enabled: !!course,
    queryFn: async () => {
      const { data } = await supabase.from("course_topics").select("*").eq("course_id", course!.id).order("order_index");
      return data ?? [];
    },
  });

  const { data: tasks } = useQuery({
    queryKey: ["course-tasks", course?.id],
    enabled: !!course,
    queryFn: async () => {
      const { data } = await supabase.from("course_tasks").select("*").eq("course_id", course!.id).order("task_number");
      return data ?? [];
    },
  });

  const { data: enrollment } = useQuery({
    queryKey: ["enrollment", course?.id, user?.id],
    enabled: !!course && !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("enrollments")
        .select("*")
        .eq("course_id", course!.id)
        .eq("user_id", user!.id)
        .maybeSingle();
      return data;
    },
  });

  const { data: progress } = useQuery({
    queryKey: ["lesson-progress", enrollment?.id],
    enabled: !!enrollment,
    queryFn: async () => {
      const { data } = await supabase.from("lesson_progress").select("topic_id").eq("enrollment_id", enrollment!.id);
      return new Set((data ?? []).map((r) => r.topic_id));
    },
  });

  const { data: submissions } = useQuery({
    queryKey: ["course-submissions", enrollment?.id],
    enabled: !!enrollment,
    queryFn: async () => {
      const { data } = await supabase.from("course_task_submissions").select("*").eq("enrollment_id", enrollment!.id);
      return data ?? [];
    },
  });

  const { data: attempts } = useQuery({
    queryKey: ["course-attempts", enrollment?.id],
    enabled: !!enrollment,
    queryFn: async () => {
      const { data } = await supabase.from("quiz_attempts").select("*").eq("enrollment_id", enrollment!.id).order("started_at", { ascending: false });
      return data ?? [];
    },
  });

  const enroll = async () => {
    if (!user) return navigate({ to: "/auth" });
    if (!course) return;
    const { error } = await supabase.from("enrollments").insert({ user_id: user.id, course_id: course.id, status: "in_progress" });
    if (error) return toast.error(error.message);
    toast.success(`Enrolled in ${course.name}`);
    qc.invalidateQueries({ queryKey: ["enrollment", course.id, user.id] });
    qc.invalidateQueries({ queryKey: ["my-enrollments", user.id] });
  };

  const completeTopic = async (topicId: string) => {
    if (!enrollment || !topics) return;
    const { error } = await supabase.from("lesson_progress").insert({ enrollment_id: enrollment.id, topic_id: topicId });
    if (error && !error.message.includes("duplicate")) return toast.error(error.message);
    const completedCount = (progress?.size ?? 0) + 1;
    const pct = Math.min(100, Math.round((completedCount / topics.length) * 100));
    await supabase.from("enrollments").update({ progress_percent: pct, current_topic_id: topicId }).eq("id", enrollment.id);
    qc.invalidateQueries({ queryKey: ["lesson-progress", enrollment.id] });
    qc.invalidateQueries({ queryKey: ["enrollment", course?.id, user?.id] });
    qc.invalidateQueries({ queryKey: ["my-enrollments", user?.id] });
  };

  if (isLoading || authLoading) return <Loading />;
  if (!course) return <NotFound />;

  const enrolled = !!enrollment;
  const currentTopic = topics?.[currentIdx];
  const completedCount = progress?.size ?? 0;
  const totalTopics = topics?.length ?? 0;
  const allLessonsDone = totalTopics > 0 && completedCount >= totalTopics;
  const approvedTasks = submissions?.filter((s) => s.status === "approved").length ?? 0;
  const submittedTasks = submissions?.length ?? 0;
  const allTasksDone = (tasks?.length ?? 0) > 0 && submittedTasks >= (tasks?.length ?? 0);
  const lastPassed = attempts?.find((a) => a.passed);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/courses"><ChevronLeft className="mr-1 size-4" />All Courses</Link>
          </Button>
          <Badge variant="outline">{course.difficulty}</Badge>
          <Badge variant="secondary">{course.duration_weeks} weeks</Badge>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="min-w-0">
            <h1 className="font-display text-3xl font-bold sm:text-4xl">{course.name}</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">{course.short_description}</p>
          </div>
          {enrolled ? (
            <div className="w-full max-w-sm space-y-1.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Your progress</span>
                <span className="font-semibold text-foreground">{enrollment.progress_percent}%</span>
              </div>
              <Progress value={enrollment.progress_percent} />
            </div>
          ) : (
            <Button onClick={enroll} className="brand-gradient text-white border-0">Enroll Now</Button>
          )}
        </div>

        <Tabs defaultValue="lessons" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="lessons"><BookOpen className="mr-1 size-4" />Lessons</TabsTrigger>
            <TabsTrigger value="tasks"><ListChecks className="mr-1 size-4" />Tasks</TabsTrigger>
            <TabsTrigger value="quiz"><Brain className="mr-1 size-4" />Quiz</TabsTrigger>
          </TabsList>

          {/* LESSONS */}
          <TabsContent value="lessons" className="mt-4">
            {!totalTopics ? (
              <Card><CardContent className="pt-6 text-muted-foreground">Lesson content is being prepared for this course. Check back soon.</CardContent></Card>
            ) : (
              <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                <aside className="rounded-xl border border-border bg-card p-2 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
                  <p className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">Topics</p>
                  <ul className="space-y-0.5">
                    {topics?.map((t, i) => {
                      const done = progress?.has(t.id);
                      const active = i === currentIdx;
                      return (
                        <li key={t.id}>
                          <button
                            onClick={() => setCurrentIdx(i)}
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
                              active ? "bg-accent text-accent-foreground font-medium" : "hover:bg-secondary"
                            }`}
                          >
                            {done ? (
                              <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                            ) : (
                              <Circle className="size-4 shrink-0 text-muted-foreground" />
                            )}
                            <span className="truncate">{i + 1}. {t.title}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </aside>

                <article className="min-w-0">
                  {currentTopic && (
                    <Card>
                      <CardHeader>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">Topic {currentIdx + 1} / {totalTopics}</Badge>
                          {progress?.has(currentTopic.id) && <Badge className="bg-emerald-600 hover:bg-emerald-600">Completed</Badge>}
                        </div>
                        <CardTitle className="mt-2 text-2xl">{currentTopic.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <p className="whitespace-pre-wrap leading-relaxed text-foreground/90">{currentTopic.content_md}</p>

                        {currentTopic.code_example && (
                          <div>
                            <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Code Example</p>
                            <pre className="overflow-x-auto rounded-lg border border-border bg-secondary/60 p-4 text-sm">
                              <code>{currentTopic.code_example}</code>
                            </pre>
                          </div>
                        )}

                        {currentTopic.key_points?.length ? (
                          <div className="rounded-lg border border-border bg-accent/40 p-4">
                            <p className="mb-2 text-xs font-semibold uppercase text-accent-foreground">Key Points</p>
                            <ul className="space-y-1.5 text-sm">
                              {currentTopic.key_points.map((kp: string, idx: number) => (
                                <li key={idx} className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-emerald-600" /><span>{kp}</span></li>
                              ))}
                            </ul>
                          </div>
                        ) : null}

                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                          <Button variant="outline" size="sm" disabled={currentIdx === 0} onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}>
                            <ChevronLeft className="mr-1 size-4" />Previous
                          </Button>
                          <div className="flex gap-2">
                            {enrolled && !progress?.has(currentTopic.id) && (
                              <Button size="sm" onClick={() => completeTopic(currentTopic.id)} className="brand-gradient text-white border-0">
                                Mark Complete
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant={progress?.has(currentTopic.id) ? "default" : "secondary"}
                              disabled={currentIdx >= totalTopics - 1}
                              onClick={() => setCurrentIdx((i) => Math.min(totalTopics - 1, i + 1))}
                            >
                              Next<ChevronRight className="ml-1 size-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </article>
              </div>
            )}
          </TabsContent>

          {/* TASKS */}
          <TabsContent value="tasks" className="mt-4">
            <TasksSection
              tasks={tasks ?? []}
              enrollment={enrollment}
              submissions={submissions ?? []}
              allLessonsDone={allLessonsDone}
              onEnroll={enroll}
              user={user}
              onChange={() => qc.invalidateQueries({ queryKey: ["course-submissions", enrollment?.id] })}
            />
          </TabsContent>

          {/* QUIZ */}
          <TabsContent value="quiz" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Brain className="size-5" />Final Quiz</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-4">
                  <QuizStat label="Questions" value="50" />
                  <QuizStat label="Total Marks" value={String(course.quiz_marks)} />
                  <QuizStat label="Pass Marks" value={String(course.pass_marks)} />
                  <QuizStat label="Duration" value={`${course.quiz_duration_min} min`} />
                </div>

                {lastPassed ? (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                    <p className="flex items-center gap-2 font-semibold"><Award className="size-5" />You passed with {lastPassed.score} / {lastPassed.total}</p>
                    <p className="mt-1 text-sm">Your certificate is ready in the dashboard.</p>
                  </div>
                ) : !enrolled ? (
                  <p className="flex items-center gap-2 text-muted-foreground"><Lock className="size-4" />Enroll first to unlock the quiz.</p>
                ) : !allTasksDone ? (
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Lock className="size-4" />Submit all {tasks?.length ?? 5} practical tasks to unlock the final quiz. ({submittedTasks}/{tasks?.length ?? 5} submitted)
                  </p>
                ) : (
                  <Button asChild className="brand-gradient text-white border-0">
                    <Link to="/courses/$slug/quiz" params={{ slug: course.slug }}>Start Final Quiz</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}

function QuizStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 p-3">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-bold">{value}</p>
    </div>
  );
}

function TasksSection({
  tasks, enrollment, submissions, allLessonsDone, onEnroll, user, onChange,
}: {
  tasks: any[]; enrollment: any; submissions: any[]; allLessonsDone: boolean;
  onEnroll: () => void; user: any; onChange: () => void;
}) {
  if (!user) return (
    <Card><CardContent className="pt-6 flex flex-wrap items-center justify-between gap-3">
      <p>Sign in to access practical tasks.</p>
      <Button asChild><Link to="/auth">Sign in</Link></Button>
    </CardContent></Card>
  );
  if (!enrollment) return (
    <Card><CardContent className="pt-6 flex flex-wrap items-center justify-between gap-3">
      <p>Enroll to unlock practical tasks.</p>
      <Button onClick={onEnroll} className="brand-gradient text-white border-0">Enroll Now</Button>
    </CardContent></Card>
  );
  if (!tasks.length) return (
    <Card><CardContent className="pt-6 text-muted-foreground">No tasks configured yet.</CardContent></Card>
  );

  return (
    <div className="space-y-4">
      {!allLessonsDone && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          Finish all lessons to get the most out of these practical tasks.
        </div>
      )}
      {tasks.map((t) => {
        const sub = submissions.find((s) => s.task_id === t.id);
        return <TaskRow key={t.id} task={t} sub={sub} enrollmentId={enrollment.id} onChange={onChange} />;
      })}
    </div>
  );
}

function TaskRow({ task, sub, enrollmentId, onChange }: { task: any; sub: any; enrollmentId: string; onChange: () => void }) {
  const [open, setOpen] = useState(!sub);
  const [projectUrl, setProjectUrl] = useState(sub?.project_url ?? "");
  const [notes, setNotes] = useState(sub?.notes ?? "");
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!projectUrl.trim()) return toast.error("Project URL is required");
    setSaving(true);
    const payload = { enrollment_id: enrollmentId, task_id: task.id, project_url: projectUrl, notes, status: "pending" };
    const { error } = sub
      ? await supabase.from("course_task_submissions").update(payload).eq("id", sub.id)
      : await supabase.from("course_task_submissions").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(sub ? "Submission updated" : "Submitted for review");
    onChange();
    setOpen(false);
  };

  const status = sub?.status ?? "not_started";
  const badge = status === "approved"
    ? <Badge className="bg-emerald-600 hover:bg-emerald-600">Completed</Badge>
    : status === "pending"
    ? <Badge variant="secondary">In Progress</Badge>
    : status === "rejected"
    ? <Badge variant="destructive">Needs Revision</Badge>
    : <Badge variant="outline">Pending</Badge>;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Task {task.task_number}</p>
            <CardTitle className="text-lg">{task.title}</CardTitle>
          </div>
          {badge}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p>{task.description}</p>
        {task.requirements && (
          <div className="rounded-lg border border-border bg-secondary/40 p-3">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Requirements</p>
            <p className="mt-1">{task.requirements}</p>
          </div>
        )}
        {sub?.feedback && (
          <div className="rounded-lg border border-border bg-accent/40 p-3">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Reviewer feedback</p>
            <p className="mt-1">{sub.feedback}</p>
          </div>
        )}

        {!open ? (
          <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
            <FileText className="mr-1 size-4" />{sub ? "Update submission" : "Submit project"}
          </Button>
        ) : (
          <div className="space-y-2 rounded-lg border border-border p-3">
            <Input placeholder="Project URL (GitHub / live demo)" value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} />
            <Textarea placeholder="Notes (optional)" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={submit} disabled={saving} className="brand-gradient text-white border-0">
                <UploadCloud className="mr-1 size-4" />{saving ? "Saving…" : "Submit"}
              </Button>
              {sub && <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Loading() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-20 text-center text-muted-foreground">Loading course…</main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Button asChild className="mt-4"><Link to="/courses">Browse all courses</Link></Button>
      </main>
      <Footer />
    </div>
  );
}
