import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Briefcase, Calendar, Code, Target, Search, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { FadeUp } from "@/components/motion";

// Fallback project challenges list in case database is empty or down
const LOCAL_PROJECTS = [
  {
    id: "proj1-fallback",
    project_id: "PRJ-2026-001",
    title: "Smart Inventory Management System",
    industry: "Retail & E-Commerce",
    difficulty: "intermediate",
    business_background: "A mid-sized retail chain with 50+ stores struggles with manual inventory tracking. Stockouts cost ₹2Cr/month in lost revenue, and excess inventory ties up ₹5Cr in working capital. They need a real-time system.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis"],
    submission_deadline: "2026-09-30T23:59:59Z"
  },
  {
    id: "proj2-fallback",
    project_id: "PRJ-2026-002",
    title: "Telemedicine Consultation Platform",
    industry: "Healthcare",
    difficulty: "advanced",
    business_background: "Rural India faces a severe shortage of specialists. A healthcare startup wants to build a telemedicine platform connecting rural patients with specialists via secure video consultation.",
    technologies: ["Next.js", "WebRTC", "Node.js", "PostgreSQL", "Docker", "AES-256"],
    submission_deadline: "2026-10-15T23:59:59Z"
  },
  {
    id: "proj3-fallback",
    project_id: "PRJ-2026-003",
    title: "AI-Powered Resume Screener & Job Matcher",
    industry: "HR Technology",
    difficulty: "expert",
    business_background: "A growing recruitment agency processes 5,000+ resumes weekly. They spend 70% of their time manually screening. They need an AI system that automatically parses resumes and extracts key skills.",
    technologies: ["Python", "FastAPI", "React", "PostgreSQL", "pgvector", "Docker", "Kubernetes", "BERT/LLM"],
    submission_deadline: "2026-11-01T23:59:59Z"
  },
  {
    id: "proj4-fallback",
    project_id: "PRJ-2026-004",
    title: "Community Food Waste Reduction Platform",
    industry: "Social Impact & Sustainability",
    difficulty: "beginner",
    business_background: "India wastes 67 million tonnes of food annually while 190 million people go hungry. Local caterers discard edible surplus. A nonprofit wants to connect food donors with verified NGOs.",
    technologies: ["React", "Tailwind CSS", "Node.js", "PostgreSQL", "Mapbox", "Firebase"],
    submission_deadline: "2026-08-30T23:59:59Z"
  },
  {
    id: "proj5-fallback",
    project_id: "PRJ-2026-005",
    title: "Cryptocurrency Portfolio Tracker & Alert System",
    industry: "Fintech",
    difficulty: "intermediate",
    business_background: "Retail crypto investors in India lack a unified platform to track portfolios across multiple exchanges. They need a dashboard that aggregates portfolio data, showing real-time P&L and cost basis.",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "WebSocket", "Chart.js"],
    submission_deadline: "2026-09-15T23:59:59Z"
  },
  {
    id: "proj6-fallback",
    project_id: "PRJ-2026-006",
    title: "Smart Classroom Engagement Analytics",
    industry: "Education Technology",
    difficulty: "advanced",
    business_background: "A chain of coaching institutes in Tamil Nadu with 10,000+ students reports that 40% of students disengage during online classes. They need computer vision webcam analysis for attention scores.",
    technologies: ["Python", "OpenCV", "TensorFlow", "React", "Node.js", "WebSocket"],
    submission_deadline: "2026-09-20T23:59:59Z"
  }
];

export const Route = createFileRoute("/_navbar-layout/projects/")({
  head: () => ({
    meta: [
      { title: "Real-World Project Challenges | Portfolio-Grade Portals | Skyrovix" },
      { name: "description", content: "Build real-world developer projects requested by businesses. Gain hands-on evaluation, expert scoring metrics, and downloadable verified completion certificates." },
      { name: "keywords", content: "developer projects, portfolio projects, react projects, python projects, database projects, portfolio builder, skyrovix projects" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Real-World Project Challenges — Skyrovix" },
      { property: "og:description", content: "Apply for and build industry challenges in FinTech, Healthcare, E-Commerce, and AI/ML tracks." },
    ],
  }),
  component: ProjectsIndexPage,
});

function ProjectsIndexPage() {
  const [search, setSearch] = useState("");

  // 1. Fetch published project challenges
  const { data: dbProjects, isLoading, isError } = useQuery({
    queryKey: ["project-challenges-list"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("project_challenges")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const projects = dbProjects && dbProjects.length > 0 ? dbProjects : LOCAL_PROJECTS;

  // Filter projects by title, industry, or tech stack
  const filteredProjects = projects.filter((p: any) => {
    const q = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.industry.toLowerCase().includes(q) ||
      p.technologies.some((tech: string) => tech.toLowerCase().includes(q))
    );
  });

  return (
    <div className="w-full min-h-screen bg-background text-foreground pb-20">
      
      {/* Header section */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-20 border-b border-border/20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 to-[#07284a]/50 mix-blend-multiply" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5">
          <FadeUp>
            <Badge className="bg-blue-500 text-white rounded-lg text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 border-0">
              Real-World Challenges
            </Badge>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Project Challenges
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300">
              Step out of tutorial-hell and build production-ready projects derived directly from industry business requirements. Submit your solution for expert evaluation and certs.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Search Input bar */}
      <div className="max-w-xl mx-auto px-4 relative z-20 -mt-6">
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border/50 bg-white/70 dark:bg-[#0f172a]/70 backdrop-blur-md">
          <Search className="absolute left-4 top-3.5 size-4 text-muted-foreground/60" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, industry, or tech stack..."
            className="h-12 border-0 pl-11 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-sm"
          />
        </div>
      </div>

      {/* Grid container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <Card key={n} className="rounded-2xl border border-border/40 p-5 animate-pulse bg-muted/10 h-72">
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded w-1/4" />
                  <div className="h-8 bg-muted rounded w-3/4" />
                  <div className="h-16 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20 max-w-sm mx-auto space-y-3">
            <AlertCircle className="size-10 text-destructive mx-auto" />
            <p className="text-sm font-semibold text-destructive">Failed to fetch project challenges. Please reload.</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border/50 rounded-3xl">
            <Target className="size-12 mx-auto text-muted-foreground/35 mb-2" />
            <p className="text-sm font-semibold text-muted-foreground">No projects matching "{search}" were found.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((p: any) => {
              const date = p.submission_deadline
                ? new Date(p.submission_deadline).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                : "Open Enrollment";

              // Difficulty level styling
              const diff = p.difficulty.toLowerCase();
              const diffCol =
                diff === "beginner"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20"
                  : diff === "intermediate"
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20"
                  : diff === "advanced"
                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/20"
                  : "bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-purple-500/20";

              return (
                <Card
                  key={p.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-white/60 dark:bg-[#0f172a]/60 backdrop-blur-md hover:shadow-xl hover:border-blue-500/30 transition-all duration-300"
                >
                  <CardContent className="p-6 space-y-4">
                    {/* Header line */}
                    <div className="flex items-center justify-between gap-2">
                      <Badge className={`rounded-lg px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ring-1 ${diffCol}`}>
                        {diff}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
                        <Briefcase className="size-3.5" />
                        {p.industry}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-extrabold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {p.title}
                    </h3>

                    {/* Background preview */}
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {p.business_background}
                    </p>

                    {/* Technologies list */}
                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        <Code className="size-3.5" /> Tech Stack
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {p.technologies.slice(0, 3).map((tech: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="bg-muted/50 text-muted-foreground border-0 text-[10px] px-2 py-0.5 rounded font-medium">
                            {tech}
                          </Badge>
                        ))}
                        {p.technologies.length > 3 && (
                          <Badge variant="secondary" className="bg-muted/50 text-muted-foreground border-0 text-[10px] px-2 py-0.5 rounded font-medium">
                            +{p.technologies.length - 3} More
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>

                  {/* Footer Actions */}
                  <div className="p-6 border-t border-border/30 bg-muted/10 grid grid-cols-2 gap-3">
                    <Button asChild variant="outline" className="rounded-xl text-xs h-10 border-border/50 bg-white hover:bg-muted/85">
                      <Link to="/projects/$id" params={{ id: p.id }}>
                        View Details
                      </Link>
                    </Button>
                    <Button asChild className="rounded-xl text-xs h-10 brand-gradient text-white border-0 font-semibold shadow hover:opacity-95">
                      <Link to="/projects/$id/submit" params={{ id: p.id }}>
                        Submit Solution
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
