import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  ArrowLeft, Building2, Clock, Layers, CheckCircle2, Target, Code2, FileText,
  ListChecks, Award, ExternalLink, Github, Download, Loader2,
} from "lucide-react";
import { ProjectCompletionCert, downloadPdf } from "@/components/project-pdf-docs";

const DIFFICULTY_BADGE: Record<string, string> = {
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

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1200&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=600&fit=crop&auto=format",
];

export const Route = createFileRoute("/_navbar-layout/projects/$id")({
  head: () => [{ title: "Project — Skyrovix" }],
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { id } = useParams({ from: "/_navbar-layout/projects/$id" });
  const { user } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [submission, setSubmission] = useState<any>(null);
  const [certificate, setCertificate] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("project_challenges" as any)
        .select("*")
        .eq("project_id", id)
        .maybeSingle();
      if (data) setProject(data);

      if (data && user) {
        const [subRes, certRes, profileRes] = await Promise.all([
          supabase.from("project_submissions" as any).select("*").eq("project_id", data.id).eq("user_id", user.id).maybeSingle(),
          supabase.from("project_certificates" as any).select("*").eq("project_id", data.id).eq("user_id", user.id).maybeSingle(),
          supabase.from("profiles" as any).select("full_name").eq("id", user.id).maybeSingle(),
        ]);
        if (subRes.data) setSubmission(subRes.data);
        if (certRes.data) setCertificate(certRes.data);
        if (profileRes.data) setProfile(profileRes.data);
      }
      setLoading(false);
    };
    fetch();
  }, [id, user]);

  const downloadCert = async () => {
    if (!certificate || !project) return;
    const doc = (
      <ProjectCompletionCert
        participantName={profile?.full_name ?? user?.email ?? "Participant"}
        projectId={project.project_id}
        projectTitle={project.title}
        industry={project.industry}
        technologies={project.technologies ?? []}
        finalScore={certificate.final_score}
        certId={certificate.cert_id}
        completionDate={new Date(certificate.completion_date).toLocaleDateString()}
        evaluationUrl={`${window.location.origin}/verify-certificate?certId=${certificate.cert_id}`}
      />
    );
    await downloadPdf(doc, `${certificate.cert_id}.pdf`);
  };

  const handleApply = async () => {
    if (!project || !user) return;
    setApplying(true);
    const { error } = await supabase.from("project_submissions" as any).insert({
      project_id: project.id,
      user_id: user.id,
      status: "pending",
    });
    if (error) { toast.error("Apply failed: " + error.message); setApplying(false); return; }
    toast.success("Applied for challenge!");
    setSubmission({ project_id: project.id, user_id: user.id, status: "pending" } as any);
    setApplying(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] dark:from-[#0B1120] dark:to-[#0F172A]">
        <div className="size-8 rounded-full border-2 border-[#07284a]/20 border-t-[#07284a] animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] dark:from-[#0B1120] dark:to-[#0F172A]">
        <Building2 className="size-12 text-muted-foreground/30" />
        <p className="font-medium text-muted-foreground">Project not found</p>
        <Button asChild variant="outline" className="rounded-xl">
          <Link to="/projects"><ArrowLeft className="size-4 mr-1" /> Back</Link>
        </Button>
      </div>
    );
  }

  const heroIdx = (String(project.id).split("").reduce((a, b) => a + parseInt(b), 0) || 1) % HERO_IMAGES.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] dark:from-[#0B1120] dark:to-[#0F172A]">
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${DIFFICULTY_GRADIENTS[project.difficulty] ?? "from-[#07284a] to-blue-900"}`}>
          <img src={HERO_IMAGES[heroIdx]} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 pt-20 sm:pt-28 pb-12 sm:pb-16">
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-6 transition">
            <ArrowLeft className="size-4" /> All Projects
          </Link>
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className={`text-[10px] px-2.5 py-1 border-0 ${DIFFICULTY_BADGE[project.difficulty] ?? "bg-white/20 text-white"}`}>
                {project.difficulty}
              </Badge>
              <Badge className="bg-white/20 backdrop-blur text-white border-0 text-[10px] px-2.5 py-1">Project Challenge</Badge>
            </div>
            <div>
              <p className="text-sm text-white/50 font-mono mb-1">{project.project_id}</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">{project.title}</h1>
              <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl">{project.business_background}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70 mt-6">
              <span className="flex items-center gap-1.5"><Building2 className="size-4" /> {project.industry}</span>
              {project.submission_deadline && (
                <span className="flex items-center gap-1.5"><Clock className="size-4" /> Due {new Date(project.submission_deadline).toLocaleDateString()}</span>
              )}
              {project.technologies?.length > 0 && (
                <span className="flex items-center gap-1.5"><Layers className="size-4" /> {project.technologies.join(", ")}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
        <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-10">
          <div className="space-y-10">
            {/* Problem Statement */}
            <div>
              <SectionHeading icon={Target} title="Problem Statement" />
              <p className="text-muted-foreground leading-relaxed">{project.problem_statement}</p>
            </div>
            <Separator />

            {/* Requirements */}
            <div>
              <SectionHeading icon={ListChecks} title="Requirements" />
              <div className="grid gap-6 sm:grid-cols-2">
                {project.business_requirements?.length > 0 && (
                  <div className="p-4 rounded-xl bg-white/60 dark:bg-[#0f172a]/60 border border-border/50">
                    <h3 className="flex items-center gap-2 text-sm font-semibold mb-3"><CheckCircle2 className="size-4 text-emerald-500" /> Business Requirements</h3>
                    <ul className="space-y-2">
                      {project.business_requirements.map((r: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 size-1.5 rounded-full bg-[#07284a] shrink-0" />{r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.functional_requirements?.length > 0 && (
                  <div className="p-4 rounded-xl bg-white/60 dark:bg-[#0f172a]/60 border border-border/50">
                    <h3 className="flex items-center gap-2 text-sm font-semibold mb-3"><ListChecks className="size-4 text-blue-500" /> Functional Requirements</h3>
                    <ul className="space-y-2">
                      {project.functional_requirements.map((r: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 size-1.5 rounded-full bg-blue-500 shrink-0" />{r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="grid gap-6 sm:grid-cols-2 mt-6">
                {project.technical_requirements?.length > 0 && (
                  <div className="p-4 rounded-xl bg-white/60 dark:bg-[#0f172a]/60 border border-border/50">
                    <h3 className="flex items-center gap-2 text-sm font-semibold mb-3"><Code2 className="size-4 text-violet-500" /> Technical Requirements</h3>
                    <ul className="space-y-2">
                      {project.technical_requirements.map((r: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 size-1.5 rounded-full bg-violet-500 shrink-0" />{r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.expected_deliverables?.length > 0 && (
                  <div className="p-4 rounded-xl bg-white/60 dark:bg-[#0f172a]/60 border border-border/50">
                    <h3 className="flex items-center gap-2 text-sm font-semibold mb-3"><FileText className="size-4 text-emerald-500" /> Expected Deliverables</h3>
                    <ul className="space-y-2">
                      {project.expected_deliverables.map((r: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 size-1.5 rounded-full bg-emerald-500 shrink-0" />{r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <Separator />

            {/* Evaluation Criteria */}
            {project.evaluation_criteria?.length > 0 && (
              <>
                <div>
                  <SectionHeading icon={Award} title="Evaluation Criteria" />
                  <div className="flex flex-wrap gap-2">
                    {project.evaluation_criteria.map((c: string, i: number) => (
                      <Badge key={i} variant="outline" className="rounded-lg text-xs py-1">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Resources */}
            {project.resources && typeof project.resources === "object" && Array.isArray(project.resources) && project.resources.length > 0 && (
              <>
                <div>
                  <SectionHeading icon={ExternalLink} title="Resources" />
                  <ul className="space-y-2">
                    {project.resources.map((r: any, i: number) => (
                      <li key={i}>
                        <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#07284a] dark:text-blue-400 hover:underline">
                          <ExternalLink className="size-3.5" />{r.label ?? r.url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 mt-10 lg:mt-0">
            <Card className="bg-white/60 dark:bg-[#0f172a]/60 backdrop-blur border-border/50 sticky top-28">
              <CardContent className="p-6 space-y-6">
                <h3 className="font-bold text-lg">Participation</h3>
                {!user ? (
                  <Button asChild className="w-full brand-gradient text-white border-0 rounded-xl">
                    <Link to="/auth">Sign In to Apply</Link>
                  </Button>
                ) : !submission ? (
                  <Button onClick={handleApply} disabled={applying} className="w-full brand-gradient text-white border-0 rounded-xl">
                    {applying ? <Loader2 className="size-4 animate-spin mr-1.5" /> : null}
                    {applying ? "Applying..." : "Apply for Challenge"}
                  </Button>
                ) : !submission.github_url ? (
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      <CheckCircle2 className="size-4" />
                      Application Submitted
                    </div>
                    <Button asChild className="w-full brand-gradient text-white border-0 rounded-xl">
                      <Link to="/projects/$id/submit" params={{ id }}><Github className="size-4 mr-1.5" /> Submit Solution</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${
                      submission.status === "approved"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : submission.status === "rejected"
                        ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                      <CheckCircle2 className="size-4" />
                      {submission.status === "approved" ? "Approved" : submission.status === "rejected" ? "Rejected" : "Under Review"}
                    </div>
                    {submission.final_score != null && (
                      <p className="text-2xl font-bold text-center">{submission.final_score}/100</p>
                    )}
                    {certificate && (
                      <Button onClick={downloadCert} className="w-full brand-gradient text-white border-0 rounded-xl">
                        <Download className="size-4 mr-1.5" /> Download Certificate
                      </Button>
                    )}
                  </div>
                )}

                <Separator />

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Project Info</h4>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="size-8 rounded-lg bg-[#07284a]/10 dark:bg-[#1d4ed8]/10 flex items-center justify-center shrink-0">
                      <Building2 className="size-4 text-[#07284a] dark:text-[#60a5fa]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Industry</p>
                      <p className="text-sm font-medium">{project.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="size-8 rounded-lg bg-[#07284a]/10 dark:bg-[#1d4ed8]/10 flex items-center justify-center shrink-0">
                      <Award className="size-4 text-[#07284a] dark:text-[#60a5fa]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Difficulty</p>
                      <Badge className={`mt-0.5 text-[10px] px-2 py-0.5 ${DIFFICULTY_BADGE[project.difficulty] ?? ""}`}>{project.difficulty}</Badge>
                    </div>
                  </div>
                  {project.submission_deadline && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="size-8 rounded-lg bg-[#07284a]/10 dark:bg-[#1d4ed8]/10 flex items-center justify-center shrink-0">
                        <Clock className="size-4 text-[#07284a] dark:text-[#60a5fa]" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Deadline</p>
                        <p className="text-sm font-medium">{new Date(project.submission_deadline).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                  {project.technologies?.length > 0 && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="size-8 rounded-lg bg-[#07284a]/10 dark:bg-[#1d4ed8]/10 flex items-center justify-center shrink-0">
                        <Layers className="size-4 text-[#07284a] dark:text-[#60a5fa]" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Technologies</p>
                        <p className="text-sm font-medium">{project.technologies.join(", ")}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function SectionHeading({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="size-10 rounded-xl bg-[#07284a]/10 dark:bg-[#1d4ed8]/10 flex items-center justify-center">
        <Icon className="size-5 text-[#07284a] dark:text-[#60a5fa]" />
      </div>
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );
}