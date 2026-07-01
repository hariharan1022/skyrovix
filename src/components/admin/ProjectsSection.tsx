import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { generateProjectId, PROJECT_DIFFICULTIES } from "@/lib/constants";
import { Plus, Trash2, EyeOff, Eye, Loader2, ExternalLink, Edit, X, Check, ChevronDown } from "lucide-react";

export function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [edit, setEdit] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetch = async () => {
    const { data } = await supabase.from("project_challenges" as any).select("*").order("created_at", { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  };
  useEffect(() => { fetch(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);

    const payload: Record<string, any> = {
      project_id: edit?.project_id ?? generateProjectId(),
      title: fd.get("title") || "",
      industry: fd.get("industry") || "",
      difficulty: fd.get("difficulty") || "intermediate",
      business_background: fd.get("business_background") || "",
      problem_statement: fd.get("problem_statement") || "",
      business_requirements: splitLines(fd.get("business_requirements") as string),
      functional_requirements: splitLines(fd.get("functional_requirements") as string),
      technical_requirements: splitLines(fd.get("technical_requirements") as string),
      expected_deliverables: splitLines(fd.get("expected_deliverables") as string),
      evaluation_criteria: splitLines(fd.get("evaluation_criteria") as string),
      technologies: splitLines(fd.get("technologies") as string),
      submission_deadline: fd.get("submission_deadline") || null,
      is_published: edit?.is_published ?? false,
    };

    try {
      if (edit) {
        const { error } = await supabase.from("project_challenges" as any).update(payload).eq("id", edit.id);
        if (error) throw error;
        toast.success("Project updated");
      } else {
        const { error } = await supabase.from("project_challenges" as any).insert(payload);
        if (error) throw error;
        toast.success("Project created");
      }
      setEdit(null);
      setShowForm(false);
      fetch();
    } catch (err: any) {
      toast.error(err.message);
    }
    setSaving(false);
  };

  const togglePublish = async (p: any) => {
    await supabase.from("project_challenges" as any).update({ is_published: !p.is_published }).eq("id", p.id);
    toast.success(p.is_published ? "Unpublished" : "Published");
    fetch();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("project_challenges" as any).delete().eq("id", id);
    toast.success("Deleted");
    fetch();
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="size-6 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Project Challenges ({projects.length})</h2>
        <Button onClick={() => { setEdit(null); setShowForm(!showForm); }} className="brand-gradient text-white border-0 rounded-xl h-9 text-xs">
          <Plus className="size-4 mr-1" />{showForm ? "Close" : "New Project"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle className="text-base">{edit ? "Edit Project" : "New Project"}</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={save} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title *</Label>
                  <Input name="title" defaultValue={edit?.title ?? ""} required />
                </div>
                <div>
                  <Label>Industry *</Label>
                  <Input name="industry" defaultValue={edit?.industry ?? ""} placeholder="e.g. Healthcare, Fintech" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Difficulty</Label>
                  <select name="difficulty" defaultValue={edit?.difficulty ?? "intermediate"} className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                    {PROJECT_DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Submission Deadline</Label>
                  <Input name="submission_deadline" type="date" defaultValue={edit?.submission_deadline?.split("T")[0] ?? ""} />
                </div>
              </div>
              <div>
                <Label>Business Background *</Label>
                <Textarea name="business_background" defaultValue={edit?.business_background ?? ""} rows={3} required />
              </div>
              <div>
                <Label>Real-World Problem Statement *</Label>
                <Textarea name="problem_statement" defaultValue={edit?.problem_statement ?? ""} rows={3} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Business Requirements (one per line)</Label>
                  <Textarea name="business_requirements" defaultValue={edit?.business_requirements?.join("\n") ?? ""} rows={4} />
                </div>
                <div>
                  <Label>Functional Requirements (one per line)</Label>
                  <Textarea name="functional_requirements" defaultValue={edit?.functional_requirements?.join("\n") ?? ""} rows={4} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Technical Requirements (one per line)</Label>
                  <Textarea name="technical_requirements" defaultValue={edit?.technical_requirements?.join("\n") ?? ""} rows={4} />
                </div>
                <div>
                  <Label>Expected Deliverables (one per line)</Label>
                  <Textarea name="expected_deliverables" defaultValue={edit?.expected_deliverables?.join("\n") ?? ""} rows={4} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Technologies (one per line)</Label>
                  <Textarea name="technologies" defaultValue={edit?.technologies?.join("\n") ?? ""} rows={3} />
                </div>
                <div>
                  <Label>Evaluation Criteria (one per line)</Label>
                  <Textarea name="evaluation_criteria" defaultValue={edit?.evaluation_criteria?.join("\n") ?? ""} rows={3} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={saving} className="brand-gradient text-white border-0 rounded-xl">
                  {saving ? <Loader2 className="size-4 animate-spin mr-1" /> : null}
                  {edit ? "Update" : "Create"} Project
                </Button>
                <Button type="button" variant="outline" className="rounded-xl" onClick={() => { setEdit(null); setShowForm(false); }}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {projects.map((p) => (
          <Card key={p.id} className={`border ${p.is_published ? "border-emerald-400/40" : "border-border/50"}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{p.project_id}</span>
                    <Badge variant={p.is_published ? "default" : "secondary"} className="text-[10px] px-2">
                      {p.is_published ? "Published" : "Draft"}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-2">{p.difficulty}</Badge>
                    <Badge variant="outline" className="text-[10px] px-2">{p.industry}</Badge>
                  </div>
                  <h4 className="font-medium text-sm">{p.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{p.business_background}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {p.technologies?.slice(0, 4).map((t: string) => (
                      <span key={t} className="rounded bg-[#07284a]/8 dark:bg-white/10 px-1.5 py-0.5 text-[10px]">{t}</span>
                    ))}
                    {p.technologies?.length > 4 && <span className="text-[10px] text-muted-foreground">+{p.technologies.length - 4}</span>}
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Button size="sm" variant="outline" className="h-7 text-xs rounded-lg" onClick={() => { setEdit(p); setShowForm(true); }}><Edit className="size-3" /></Button>
                  <Button size="sm" variant={p.is_published ? "secondary" : "default"} className="h-7 text-xs rounded-lg" onClick={() => togglePublish(p)}>
                    {p.is_published ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
                  </Button>
                  <Button size="sm" variant="destructive" className="h-7 text-xs rounded-lg" onClick={() => remove(p.id)}><Trash2 className="size-3" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {projects.length === 0 && <p className="text-center text-sm text-muted-foreground py-8">No projects yet.</p>}
      </div>
    </div>
  );
}

function splitLines(val: string): string[] {
  return val.split("\n").map((l) => l.trim()).filter(Boolean);
}
