import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import {
  BookOpen, Layers, Monitor, Server, BarChart3, Brain, Palette,
  Code2, Shield, TrendingUp, Clock, ListChecks, GraduationCap, Trophy,
} from "lucide-react";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Layers, Monitor, Server, BarChart3, Brain, Palette, Code2, Shield, TrendingUp,
};

export const Route = createFileRoute("/courses")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Courses & LMS — Skyrovix Internship Portal" },
      { name: "description", content: "Premium learning paths with topic-wise lessons, hands-on tasks, a final quiz and a verified certificate. Full Stack, Frontend, Backend, AI, UI/UX, and more." },
      { property: "og:title", content: "Skyrovix Courses — Learn, Build, Get Certified" },
      { property: "og:description", content: "Topic lessons, 5 hands-on tasks, final quiz, auto-generated certificate." },
    ],
  }),
  component: CoursesPage,
});

type CourseRow = {
  id: string; slug: string; name: string; short_description: string;
  icon: string; domain: string; total_topics: number; total_tasks: number;
  quiz_marks: number; duration_weeks: number; difficulty: string;
};

function CoursesPage() {
  const { user } = useAuth();

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, slug, name, short_description, icon, domain, total_topics, total_tasks, quiz_marks, duration_weeks, difficulty")
        .eq("is_published", true)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as CourseRow[];
    },
  });

  const { data: enrollments } = useQuery({
    queryKey: ["my-enrollments", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("enrollments")
        .select("course_id, progress_percent, status")
        .eq("user_id", user!.id);
      return data ?? [];
    },
  });

  const enrollMap = new Map(enrollments?.map((e) => [e.course_id, e]) ?? []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <Badge variant="secondary" className="mb-3">Learning Management System</Badge>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Courses & <span className="brand-text">Learning Paths</span>
          </h1>
          <p className="mt-4 text-balance text-muted-foreground sm:text-lg">
            Pick a domain, learn topic-by-topic, ship 5 real tasks, pass the final quiz, and earn a verified Skyrovix certificate.
          </p>
        </header>

        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <Stat icon={GraduationCap} title="Topic Lessons" body="Bite-sized, code-first explanations" />
          <Stat icon={ListChecks} title="5 Practical Tasks" body="Build portfolio-ready projects" />
          <Stat icon={Trophy} title="Verified Certificate" body="Auto-issued on passing the final quiz" />
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading courses…</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses?.map((c) => {
              const Icon = ICONS[c.icon] ?? BookOpen;
              const e = enrollMap.get(c.id);
              const enrolled = !!e;
              const completed = e?.status === "completed";
              return (
                <Card key={c.id} className="group relative overflow-hidden transition hover:shadow-xl hover:-translate-y-0.5">
                  <CardContent className="flex h-full flex-col gap-4 pt-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid size-12 shrink-0 place-items-center rounded-xl brand-gradient text-white shadow-md">
                        <Icon className="size-6" />
                      </div>
                      <Badge variant="outline" className="shrink-0">{c.difficulty}</Badge>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-xl font-semibold leading-tight">{c.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{c.short_description}</p>
                    </div>

                    <dl className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-secondary/40 p-3 text-xs">
                      <Meta label="Topics" value={c.total_topics} />
                      <Meta label="Tasks" value={c.total_tasks} />
                      <Meta label="Quiz" value={`${c.quiz_marks} Marks`} />
                      <Meta label="Duration" value={`${c.duration_weeks} Weeks`} />
                    </dl>

                    {enrolled && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span className="font-medium text-foreground">{e?.progress_percent ?? 0}%</span>
                        </div>
                        <Progress value={e?.progress_percent ?? 0} />
                      </div>
                    )}

                    <div className="mt-auto pt-2">
                      <Button asChild className={enrolled ? "" : "brand-gradient text-white border-0"} variant={enrolled ? "secondary" : "default"}>
                        <Link to="/courses/$slug" params={{ slug: c.slug }}>
                          {completed ? "Review Course" : enrolled ? "Continue Learning" : "Enroll Now"}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Stat({ icon: Icon, title, body }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 pt-6">
        <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-muted-foreground">{body}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Meta({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
