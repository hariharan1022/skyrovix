import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { generateAwardId, AWARD_CATEGORIES } from "@/lib/constants";
import { Loader2, Award, Download, Trash2 } from "lucide-react";
import { ProjectAwardCert, downloadPdf } from "@/components/project-pdf-docs";

export function ProjectAwardsSection() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [awards, setAwards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedSub, setSelectedSub] = useState<string>("");
  const [rank, setRank] = useState("Top 1");
  const [category, setCategory] = useState("Outstanding Performance");

  const fetch = async () => {
    const [subsRes, awdsRes] = await Promise.all([
      supabase.from("project_submissions" as any)
        .select("*, project_challenges!inner(title, project_id, industry, technologies)")
        .eq("status", "approved")
        .order("final_score", { ascending: false }),
      supabase.from("project_awards" as any).select("*, project_submissions!inner(project_challenges!inner(title))").order("created_at", { ascending: false }),
    ]);
    if (subsRes.data) setSubmissions(subsRes.data);
    if (awdsRes.data) setAwards(awdsRes.data);
    setLoading(false);
  };
  useEffect(() => { fetch(); }, []);

  const createAward = async () => {
    if (!selectedSub) { toast.error("Select a submission"); return; }
    setSaving(true);

    const sub = submissions.find((s) => s.id === selectedSub);
    if (!sub) return;

    const awardId = generateAwardId();
    const { error } = await supabase.from("project_awards" as any).insert({
      award_id: awardId,
      user_id: sub.user_id,
      submission_id: sub.id,
      participant_name: sub.profiles?.full_name ?? sub.user_id,
      project_title: sub.project_challenges?.title ?? "",
      rank,
      final_score: sub.final_score,
      award_category: category,
    });

    if (error) { toast.error("Award creation failed: " + error.message); setSaving(false); return; }
    toast.success("Award created");
    setSaving(false);
    setSelectedSub("");
    fetch();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this award?")) return;
    await supabase.from("project_awards" as any).delete().eq("id", id);
    toast.success("Award deleted");
    fetch();
  };

  const downloadAwardPdf = async (award: any) => {
    const doc = (
      <ProjectAwardCert
        participantName={award.participant_name}
        projectTitle={award.project_title}
        rank={award.rank}
        finalScore={award.final_score}
        awardCategory={award.award_category}
        certId={award.award_id}
        issueDate={new Date(award.issue_date).toLocaleDateString()}
        evaluationUrl={`${window.location.origin}/verify-award?certId=${award.award_id}`}
      />
    );
    await downloadPdf(doc, `${award.award_id}.pdf`);
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="size-6 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Best Performer Awards</h2>

      <Card>
        <CardHeader><CardTitle className="text-base">Create Award</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Approved Submission</Label>
            <select
              value={selectedSub}
              onChange={(e) => setSelectedSub(e.target.value)}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm mt-1"
            >
              <option value="">Select a submission…</option>
              {submissions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.project_challenges?.title} — Score: {s.final_score}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Rank</Label>
              <select value={rank} onChange={(e) => setRank(e.target.value)} className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm mt-1">
                {["Top 1", "Top 3", "Top 5", "Top 10"].map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <Label>Category</Label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm mt-1">
                {AWARD_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <Button onClick={createAward} disabled={saving} className="brand-gradient text-white border-0 rounded-xl">
            {saving ? <Loader2 className="size-4 animate-spin mr-1" /> : <Award className="size-4 mr-1" />}
            Issue Award
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {awards.map((a) => (
          <Card key={a.id} className="border-amber-400/40">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="size-4 text-amber-500" />
                    <span className="font-mono text-xs text-muted-foreground">{a.award_id}</span>
                    <Badge variant="outline" className="text-[10px] px-2 text-amber-600 border-amber-300">{a.rank}</Badge>
                    <Badge variant="outline" className="text-[10px] px-2">{a.award_category}</Badge>
                  </div>
                  <p className="text-sm font-medium">{a.participant_name}</p>
                  <p className="text-xs text-muted-foreground">{a.project_title} · Score: {a.final_score}/100</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Button size="sm" variant="outline" className="h-7 text-xs rounded-lg" onClick={() => downloadAwardPdf(a)}>
                    <Download className="size-3 mr-1" /> PDF
                  </Button>
                  <Button size="sm" variant="destructive" className="h-7 text-xs rounded-lg" onClick={() => remove(a.id)}>
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {awards.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No awards issued yet.</p>}
      </div>
    </div>
  );
}
