import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { EVALUATION_CRITERIA, generateProjectCertId } from "@/lib/constants";
import { Loader2, Github, Globe, FileText, CheckCircle2, XCircle } from "lucide-react";
import { downloadPdfBlob } from "@/components/project-pdf-docs";

export function ProjectSubmissionsSection() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState("");

  const fetch = async () => {
    const { data } = await supabase
      .from("project_submissions" as any)
      .select("*, project_challenges!inner(title, project_id, industry, technologies)")
      .order("created_at", { ascending: false });
    if (data) {
      const userIds = [...new Set(data.map((s: any) => s.user_id))];
      const { data: profiles } = await supabase.from("profiles" as any).select("id, full_name").in("id", userIds);
      const profileMap = new Map((profiles ?? []).map((p: any) => [p.id, p]));
      setSubmissions(data.map((s: any) => ({ ...s, profiles: profileMap.get(s.user_id) ?? {} })));
    }
    setLoading(false);
  };
  useEffect(() => { fetch(); }, []);

  const openEvaluation = async (sub: any) => {
    setSelected(sub);
    setFeedback(sub.evaluations?.[0]?.feedback ?? "");
    // Load existing scores
    const { data } = await supabase.from("project_evaluations" as any).select("*").eq("submission_id", sub.id).maybeSingle();
    if (data) {
      const initial: Record<string, number> = {};
      EVALUATION_CRITERIA.forEach((c) => { initial[c.key] = data[c.key] ?? 0; });
      setScores(initial);
      setFeedback(data.feedback ?? "");
    } else {
      const initial: Record<string, number> = {};
      EVALUATION_CRITERIA.forEach((c) => { initial[c.key] = 0; });
      setScores(initial);
    }
  };

  const submitEvaluation = async () => {
    if (!selected) return;
    setSaving(true);

    const total = EVALUATION_CRITERIA.reduce((sum, c) => sum + (scores[c.key] ?? 0), 0);
    const finalScore = Math.round((total / 110) * 100);

    const evalPayload: Record<string, any> = { submission_id: selected.id };
    EVALUATION_CRITERIA.forEach((c) => { evalPayload[c.key] = scores[c.key] ?? 0; });
    evalPayload.feedback = feedback;

    const { error: evalErr } = await supabase.from("project_evaluations" as any).upsert(evalPayload);
    if (evalErr) { toast.error("Evaluation save failed: " + evalErr.message); setSaving(false); return; }

    const { error: subErr } = await supabase
      .from("project_submissions" as any)
      .update({ status: "approved", final_score: finalScore, evaluated_at: new Date().toISOString() })
      .eq("id", selected.id);
    if (subErr) { toast.error("Update failed: " + subErr.message); setSaving(false); return; }

    // Generate certificate
    const project = selected.project_challenges;
    const certId = generateProjectCertId();
    const { error: certErr } = await supabase.from("project_certificates" as any).insert({
      cert_id: certId,
      submission_id: selected.id,
      user_id: selected.user_id,
      project_id: selected.project_id,
      participant_name: selected.profiles?.full_name ?? selected.user_id,
      project_title: project?.title ?? "",
      industry: project?.industry ?? "",
      technologies: project?.technologies ?? [],
      final_score: finalScore,
    });
    if (certErr) toast.error("Certificate generation failed: " + certErr.message);

    toast.success(`Evaluated — Score: ${finalScore}/100`);
    setSaving(false);
    setSelected(null);
    fetch();
  };

  const rejectSubmission = async () => {
    if (!selected) return;
    setSaving(true);
    await supabase.from("project_submissions" as any).update({ status: "rejected" }).eq("id", selected.id);
    toast.success("Submission rejected");
    setSaving(false);
    setSelected(null);
    fetch();
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="size-6 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Project Submissions ({submissions.length})</h2>

      {submissions.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No submissions yet.</p>}

      <div className="space-y-3">
        {submissions.map((sub) => (
          <Card key={sub.id} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">{sub.project_challenges?.title ?? "Unknown Project"}</h4>
                    <Badge variant={
                      sub.status === "approved" ? "default" :
                      sub.status === "rejected" ? "destructive" : "secondary"
                    } className="text-[10px] px-2">{sub.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    User: {sub.profiles?.full_name ?? sub.user_id?.slice(0, 8) ?? "—"}
                  </p>
                  {sub.final_score != null && (
                    <p className="text-xs font-semibold mt-1">Score: {sub.final_score}/100</p>
                  )}
                </div>
                <div className="flex gap-1.5 shrink-0">
                  {sub.github_url && (
                    <a href={sub.github_url} target="_blank" rel="noreferrer">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Github className="size-3.5" /></Button>
                    </a>
                  )}
                  {sub.demo_url && (
                    <a href={sub.demo_url} target="_blank" rel="noreferrer">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Globe className="size-3.5" /></Button>
                    </a>
                  )}
                  {sub.doc_url && (
                    <a href={sub.doc_url} target="_blank" rel="noreferrer">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><FileText className="size-3.5" /></Button>
                    </a>
                  )}
                  <Button size="sm" variant="outline" className="h-7 text-xs rounded-lg" onClick={() => openEvaluation(sub)}>
                    Evaluate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Evaluation Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setSelected(null)}>
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border/50 bg-white dark:bg-[#1E293B] shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Evaluate Submission</h3>
              <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setSelected(null)}>Close</Button>
            </div>

            <div className="text-sm mb-4">
              <p className="font-medium">{selected.project_challenges?.title}</p>
              {selected.github_url && (
                <a href={selected.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-[#07284a] dark:text-blue-400 hover:underline mr-3">
                  <Github className="size-3" /> GitHub
                </a>
              )}
              {selected.demo_url && (
                <a href={selected.demo_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-[#07284a] dark:text-blue-400 hover:underline mr-3">
                  <Globe className="size-3" /> Demo
                </a>
              )}
              {selected.doc_url && (
                <a href={selected.doc_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-[#07284a] dark:text-blue-400 hover:underline">
                  <FileText className="size-3" /> Doc
                </a>
              )}
            </div>

            <div className="space-y-3 mb-4">
              {EVALUATION_CRITERIA.map((c) => (
                <div key={c.key} className="flex items-center gap-3">
                  <span className="text-xs flex-1">{c.label}</span>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={scores[c.key] ?? 0}
                    onChange={(e) => setScores({ ...scores, [c.key]: Number(e.target.value) })}
                    className="w-24"
                  />
                  <span className="text-xs font-mono w-6 text-right">{scores[c.key] ?? 0}</span>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <Label>Feedback</Label>
              <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={3} className="mt-1" />
            </div>

            <div className="text-right text-sm font-semibold mb-4">
              Total Score: {Math.round((EVALUATION_CRITERIA.reduce((s, c) => s + (scores[c.key] ?? 0), 0) / 110) * 100)}/100
            </div>

            <div className="flex gap-3">
              <Button onClick={submitEvaluation} disabled={saving} className="brand-gradient text-white border-0 rounded-xl flex-1">
                {saving ? <Loader2 className="size-4 animate-spin mr-1" /> : <CheckCircle2 className="size-4 mr-1" />}
                Approve & Issue Certificate
              </Button>
              <Button onClick={rejectSubmission} disabled={saving} variant="destructive" className="rounded-xl">
                <XCircle className="size-4 mr-1" /> Reject
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
