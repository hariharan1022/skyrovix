import { createFileRoute, redirect, Link, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Github, Globe, FileText, Video, MessageSquare, Loader2, Upload, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/_navbar-layout/_authenticated/projects/$id/submit")({
  beforeLoad: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw redirect({ to: "/auth" });
  },
  head: () => [{ title: "Submit Solution — Skyrovix" }],
  component: ProjectSubmitPage,
});

function ProjectSubmitPage() {
  const { id } = useParams({ from: "/_navbar-layout/_authenticated/projects/$id/submit" });
  const { user } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [existing, setExisting] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: p } = await supabase
        .from("project_challenges" as any)
        .select("*")
        .eq("project_id", id)
        .maybeSingle();
      setProject(p);
      if (p && user) {
        const { data: sub } = await supabase
          .from("project_submissions" as any)
          .select("*")
          .eq("project_id", p.id)
          .eq("user_id", user.id)
          .maybeSingle();
        if (sub) setExisting(sub);
      }
      setLoading(false);
    };
    fetch();
  }, [id, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);

    const docFile = fd.get("doc") as File;
    let docUrl = existing?.doc_url || null;

    if (docFile?.size) {
      const path = `${user?.id}/project-docs/${crypto.randomUUID()}.pdf`;
      const { error: upErr } = await supabase.storage.from("project-submissions").upload(path, docFile);
      if (upErr) { toast.error("Document upload failed: " + upErr.message); setSaving(false); return; }
      const { data: { publicUrl } } = supabase.storage.from("project-submissions").getPublicUrl(path);
      docUrl = publicUrl;
    }

    const payload = {
      project_id: project.id,
      user_id: user!.id,
      github_url: (fd.get("github") as string) || "",
      demo_url: (fd.get("demo") as string) || null,
      doc_url: docUrl,
      video_url: (fd.get("video") as string) || null,
      notes: (fd.get("notes") as string) || null,
      status: "pending",
    };

    if (existing) {
      const { error } = await supabase.from("project_submissions" as any).update(payload).eq("id", existing.id);
      if (error) { toast.error("Update failed: " + error.message); setSaving(false); return; }
      toast.success("Submission updated");
    } else {
      const { error } = await supabase.from("project_submissions" as any).insert(payload);
      if (error) { toast.error("Submit failed: " + error.message); setSaving(false); return; }
      toast.success("Solution submitted!");
    }

    setSaving(false);
    window.location.href = "/projects/" + id;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Project not found</p>
        <Button asChild variant="outline" className="rounded-xl">
          <Link to="/projects">Back</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] dark:from-[#0B1120] dark:to-[#0F172A]">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <Link
          to="/projects/$id"
          params={{ id }}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition"
        >
          <ArrowLeft className="size-3.5" /> {project.title}
        </Link>

        <div className="rounded-2xl border border-border/40 bg-white/70 dark:bg-[#1E293B]/70 backdrop-blur-xl p-6 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-1">Submit Your Solution</h1>
          <p className="text-sm text-muted-foreground mb-6">
            {existing ? "Update your existing submission" : "Provide your project details below"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label>GitHub Repository *</Label>
              <div className="relative mt-1">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input name="github" defaultValue={existing?.github_url ?? ""} placeholder="https://github.com/..." className="pl-10" required />
              </div>
            </div>

            <div>
              <Label>Live Demo URL</Label>
              <div className="relative mt-1">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input name="demo" defaultValue={existing?.demo_url ?? ""} placeholder="https://..." className="pl-10" />
              </div>
            </div>

            <div>
              <Label>Project Documentation (PDF)</Label>
              <div className="relative mt-1">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input name="doc" type="file" accept=".pdf" className="pl-10" />
              </div>
              {existing?.doc_url && <p className="mt-1 text-xs text-muted-foreground">Leave empty to keep existing</p>}
            </div>

            <div>
              <Label>Demo Video URL (Optional)</Label>
              <div className="relative mt-1">
                <Video className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input name="video" defaultValue={existing?.video_url ?? ""} placeholder="https://youtube.com/..." className="pl-10" />
              </div>
            </div>

            <div>
              <Label>Additional Notes</Label>
              <div className="relative mt-1">
                <MessageSquare className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Textarea name="notes" defaultValue={existing?.notes ?? ""} placeholder="Any notes for the reviewer..." rows={3} className="pl-10" />
              </div>
            </div>

            <Button type="submit" disabled={saving} className="w-full brand-gradient text-white border-0 rounded-xl h-11">
              {saving ? <Loader2 className="size-4 animate-spin mr-2" /> : <Upload className="size-4 mr-2" />}
              {existing ? "Update Submission" : "Submit Solution"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
