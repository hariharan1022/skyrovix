import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import {
  Clock, ChevronLeft, ChevronRight, Flag, XCircle, Trophy,
} from "lucide-react";

export const Route = createFileRoute("/courses/$slug/quiz")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/auth" });
  },
  head: ({ params }) => ({ meta: [{ title: `Final Quiz — ${params.slug} — Skyrovix` }] }),
  component: QuizPage,
});

type Q = { id: string; question: string; options: string[]; correct_index: number; marks: number };

function QuizPage() {
  const { slug } = Route.useParams();
  const { user } = useAuth();
  // navigation handled via <Link>
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [result, setResult] = useState<{ score: number; total: number; passed: boolean; certId?: string } | null>(null);
  const submitRef = useRef(false);

  const { data: course } = useQuery({
    queryKey: ["course", slug],
    queryFn: async () => {
      const { data } = await supabase.from("courses").select("*").eq("slug", slug).maybeSingle();
      return data;
    },
  });

  const { data: enrollment } = useQuery({
    queryKey: ["enrollment", course?.id, user?.id],
    enabled: !!course && !!user,
    queryFn: async () => {
      const { data } = await supabase.from("enrollments").select("*")
        .eq("course_id", course!.id).eq("user_id", user!.id).maybeSingle();
      return data;
    },
  });

  const { data: questions } = useQuery({
    queryKey: ["quiz-questions", course?.id],
    enabled: !!course,
    queryFn: async () => {
      const { data } = await supabase.from("course_quiz_questions")
        .select("id, question, options, correct_index, marks").eq("course_id", course!.id).order("order_index");
      return (data ?? []) as Q[];
    },
  });

  useEffect(() => {
    if (!course) return;
    setSecondsLeft(course.quiz_duration_min * 60);
  }, [course]);

  useEffect(() => {
    if (secondsLeft === null || result) return;
    if (secondsLeft <= 0) {
      handleSubmit();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => (s ?? 0) - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, result]);

  const total = useMemo(() => (questions ?? []).reduce((s, q) => s + q.marks, 0), [questions]);

  const handleSubmit = async () => {
    if (submitRef.current || !questions || !enrollment || !course) return;
    submitRef.current = true;
    let score = 0;
    for (const q of questions) if (answers[q.id] === q.correct_index) score += q.marks;
    const passed = score >= course.pass_marks;
    const { data: att, error } = await supabase.from("quiz_attempts").insert({
      enrollment_id: enrollment.id, score, total, passed, answers, submitted_at: new Date().toISOString(),
    }).select().maybeSingle();
    if (error) { toast.error(error.message); submitRef.current = false; return; }

    let certId: string | undefined;
    if (passed) {
      await supabase.from("enrollments").update({ status: "completed", completed_at: new Date().toISOString(), progress_percent: 100 }).eq("id", enrollment.id);
      const year = new Date().getFullYear();
      certId = `SKY-${course.slug.toUpperCase().slice(0, 4)}-${year}-${String(Math.floor(100000 + Math.random() * 900000))}`;
      const hash = crypto.randomUUID().replace(/-/g, "").slice(0, 32);
      await supabase.from("course_certificates").insert({
        enrollment_id: enrollment.id, certificate_id: certId, verification_hash: hash, score,
      });
    }
    setResult({ score, total, passed, certId });
  };

  if (!course || !questions) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">Loading quiz…</main>
        <Footer />
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <p className="text-muted-foreground">Quiz questions not configured yet.</p>
          <Button asChild className="mt-4"><Link to="/courses/$slug" params={{ slug }}>Back to course</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  if (result) return <ResultView result={result} course={course} slug={slug} />;

  const q = questions[current];
  const mm = String(Math.floor((secondsLeft ?? 0) / 60)).padStart(2, "0");
  const ss = String((secondsLeft ?? 0) % 60).padStart(2, "0");
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <h1 className="truncate font-display text-xl font-bold sm:text-2xl">{course.name} — Final Quiz</h1>
            <p className="text-sm text-muted-foreground">Answered {answeredCount} / {questions.length} · {marked.size} marked</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 font-mono text-lg font-bold">
            <Clock className="size-5 text-primary" />{mm}:{ss}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="secondary">Question {current + 1} / {questions.length}</Badge>
                <Button size="sm" variant={marked.has(q.id) ? "default" : "outline"} onClick={() => {
                  const next = new Set(marked);
                  next.has(q.id) ? next.delete(q.id) : next.add(q.id);
                  setMarked(next);
                }}>
                  <Flag className="mr-1 size-4" />{marked.has(q.id) ? "Unmark" : "Mark for review"}
                </Button>
              </div>
              <CardTitle className="mt-2 text-lg">{q.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {q.options.map((opt, i) => {
                const selected = answers[q.id] === i;
                return (
                  <button
                    key={i}
                    onClick={() => setAnswers({ ...answers, [q.id]: i })}
                    className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition ${
                      selected ? "border-primary bg-accent/60 ring-1 ring-primary" : "border-border hover:bg-secondary"
                    }`}
                  >
                    <span className="mr-2 inline-flex size-6 items-center justify-center rounded-md bg-secondary font-semibold">{String.fromCharCode(65 + i)}</span>
                    {opt}
                  </button>
                );
              })}

              <div className="flex flex-wrap items-center justify-between gap-2 pt-4">
                <Button variant="outline" size="sm" disabled={current === 0} onClick={() => setCurrent((c) => Math.max(0, c - 1))}>
                  <ChevronLeft className="mr-1 size-4" />Previous
                </Button>
                {current < questions.length - 1 ? (
                  <Button size="sm" onClick={() => setCurrent((c) => c + 1)} className="brand-gradient text-white border-0">
                    Next<ChevronRight className="ml-1 size-4" />
                  </Button>
                ) : (
                  <Button size="sm" onClick={handleSubmit} className="bg-emerald-600 text-white hover:bg-emerald-700">Submit Quiz</Button>
                )}
              </div>
            </CardContent>
          </Card>

          <aside className="rounded-xl border border-border bg-card p-3">
            <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Question Map</p>
            <div className="grid grid-cols-5 gap-1.5">
              {questions.map((qq, i) => {
                const isCurrent = i === current;
                const answered = qq.id in answers;
                const isMarked = marked.has(qq.id);
                return (
                  <button
                    key={qq.id}
                    onClick={() => setCurrent(i)}
                    className={`grid h-9 w-full place-items-center rounded-md text-xs font-semibold transition ${
                      isCurrent ? "ring-2 ring-primary" : ""
                    } ${
                      isMarked ? "bg-amber-100 text-amber-900" : answered ? "bg-emerald-100 text-emerald-900" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <Button size="sm" className="mt-4 w-full bg-emerald-600 text-white hover:bg-emerald-700" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ResultView({ result, course, slug }: { result: { score: number; total: number; passed: boolean; certId?: string }; course: any; slug: string }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-16">
        <Card>
          <CardContent className="space-y-5 pt-8 text-center">
            <div className={`mx-auto grid size-20 place-items-center rounded-full ${result.passed ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
              {result.passed ? <Trophy className="size-10" /> : <XCircle className="size-10" />}
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">{result.passed ? "Congratulations!" : "Keep going"}</h1>
              <p className="mt-1 text-muted-foreground">
                {result.passed ? "You passed the final quiz." : "You did not reach the pass mark this time."}
              </p>
            </div>
            <div className="mx-auto inline-flex flex-col items-center rounded-xl border border-border bg-secondary/40 px-8 py-4">
              <span className="text-xs uppercase text-muted-foreground">Your score</span>
              <span className="font-display text-5xl font-bold">{result.score} <span className="text-2xl text-muted-foreground">/ {result.total}</span></span>
              <Badge className={`mt-2 ${result.passed ? "bg-emerald-600 hover:bg-emerald-600" : "bg-red-600 hover:bg-red-600"}`}>
                {result.passed ? "PASSED" : "FAILED"}
              </Badge>
            </div>

            {result.passed && result.certId && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Certificate ID</p>
                <p className="font-mono text-lg font-bold">{result.certId}</p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <Button asChild className="brand-gradient text-white border-0">
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/verify-certificate">Verify Certificate</Link>
                  </Button>
                </div>
              </div>
            )}
            {!result.passed && (
              <Button asChild variant="outline">
                <Link to="/courses/$slug" params={{ slug }}>Back to course</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
