import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Building2, Sparkles, Search, Eye, Github } from "lucide-react";

export const Route = createFileRoute("/_navbar-layout/projects/")({
  head: () => [{ title: "Real-World Projects — Skyrovix" }],
  component: ProjectsPage,
});

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  advanced: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  expert: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

const DIFFICULTY_GRADIENTS: Record<string, string> = {
  beginner: "from-emerald-600 to-teal-700",
  intermediate: "from-amber-600 to-orange-700",
  advanced: "from-rose-600 to-pink-700",
  expert: "from-purple-600 to-indigo-700",
};

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=338&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=338&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=338&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=338&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=338&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=338&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=338&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=338&fit=crop&auto=format",
];

function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase
      .from("project_challenges" as any)
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setProjects(data);
        setLoading(false);
      });
  }, []);

  const filtered = projects.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.industry?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] dark:from-[#0B1120] dark:to-[#0F172A]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#07284a]/15 bg-white/60 dark:bg-[#0f172a]/60 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-medium text-[#07284a] dark:text-[#60a5fa] shadow-sm backdrop-blur mb-4">
            <Sparkles className="size-3 sm:size-3.5" /> Real-World Challenges
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
            Project <span className="brand-text">Challenges</span>
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-sm sm:text-base text-muted-foreground">
            Solve real industry problem statements. Build production-ready solutions. Get evaluated by experts.
          </p>
        </div>

        <div className="relative max-w-md mx-auto mb-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects or industry…"
            className="w-full h-11 rounded-xl border border-border/60 bg-white/70 dark:bg-[#1E293B]/70 pl-10 pr-4 text-sm backdrop-blur-sm outline-none focus:ring-2 focus:ring-[#07284a]/20"
          />
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-white/50 dark:bg-[#1E293B]/50 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Building2 className="size-12 mx-auto mb-4 opacity-30" />
            <p className="font-medium">No projects yet</p>
            <p className="text-sm">Check back soon for new challenges.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, idx) => {
              const imgIdx = idx % PROJECT_IMAGES.length;
              return (
              <div key={project.id} className="group block rounded-2xl border border-border/50 bg-white/60 dark:bg-[#0f172a]/60 backdrop-blur overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5">
                {/* Banner Image */}
                <Link to="/projects/$id" params={{ id: project.project_id }} className={`block relative h-36 overflow-hidden bg-gradient-to-br ${DIFFICULTY_GRADIENTS[project.difficulty] ?? "from-[#07284a] to-blue-900"}`}>
                  <img
                    src={PROJECT_IMAGES[imgIdx]}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    <Badge className={`text-[10px] px-2.5 py-1 border-0 ${DIFFICULTY_COLORS[project.difficulty] ?? "bg-white/20 text-white"}`}>
                      {project.difficulty}
                    </Badge>
                    <Badge className="bg-white/20 backdrop-blur text-white border-0 text-[10px] px-2.5 py-1">Challenge</Badge>
                  </div>
                </Link>
                {/* Content */}
                <div className="p-5 space-y-4">
                  <Link to="/projects/$id" params={{ id: project.project_id }}>
                    <h3 className="text-lg font-bold transition-colors hover:text-[#07284a] dark:hover:text-[#60a5fa] line-clamp-1">{project.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{project.business_background}</p>
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((t: string) => (
                        <span key={t} className="rounded-md bg-[#07284a]/8 dark:bg-white/10 px-2 py-0.5 text-[10px] font-medium text-[#07284a] dark:text-blue-300">
                          {t}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[10px] text-muted-foreground self-center">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Building2 className="size-3.5" />{project.industry}</span>
                    <span className="flex items-center gap-1"><Clock className="size-3.5" />{project.submission_deadline ? new Date(project.submission_deadline).toLocaleDateString() : "No deadline"}</span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button variant="outline" className="flex-1 h-10 rounded-xl text-sm gap-1.5 border-border/60" asChild>
                      <Link to="/projects/$id" params={{ id: project.project_id }}><Eye className="size-4" /> View Challenge</Link>
                    </Button>
                    <Button variant="outline" className="flex-1 h-10 rounded-xl text-sm gap-1.5 border-border/60" asChild>
                      <Link to="/projects/$id/submit" params={{ id: project.project_id }}><Github className="size-4" /> Submit</Link>
                    </Button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
