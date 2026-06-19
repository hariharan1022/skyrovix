import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Target,
} from "lucide-react";

type Task = {
  id: string;
  task_number: number;
  title: string;
  description: string;
  resources: string | null;
};

type Submission = {
  id: string;
  task_id: string;
  status: string;
  github_url: string | null;
  deployed_url: string | null;
  notes: string | null;
  feedback: string | null;
};

type TaskStatus = "completed" | "ongoing" | "pending";

function getTaskStatus(submission: Submission | undefined): TaskStatus {
  if (!submission) return "pending";
  if (submission.status === "approved") return "completed";
  return "ongoing";
}

const borderColor: Record<TaskStatus, string> = {
  completed: "border-l-green-500",
  ongoing: "border-l-blue-500",
  pending: "border-l-orange-500",
};

const statusBadge: Record<TaskStatus, { label: string; className: string }> = {
  completed: { label: "Completed", className: "bg-green-100 text-green-700 border-green-200" },
  ongoing: { label: "In Progress", className: "bg-blue-100 text-blue-700 border-blue-200" },
  pending: { label: "Pending", className: "bg-orange-100 text-orange-700 border-orange-200" },
};

const DEFAULT_FEATURES: Record<number, string[]> = {
  1: [
    "Frontend UI with responsive design",
    "User authentication & profile",
    "Core CRUD operations",
    "Database integration",
  ],
  2: [
    "API development & integration",
    "Data validation & error handling",
    "State management",
    "Deployment setup",
  ],
  3: [
    "Advanced UI/UX patterns",
    "Performance optimization",
    "Testing & debugging",
    "Documentation",
  ],
};

const DEFAULT_OUTCOMES: Record<number, string> = {
  1: "Build a solid foundation in full-stack development with hands-on experience in frontend and backend integration.",
  2: "Master API design patterns and learn to build scalable, maintainable web applications.",
  3: "Develop production-ready skills including optimization, testing, and professional deployment workflows.",
};

function computeDueDate(taskNumber: number): string {
  const d = new Date();
  d.setDate(d.getDate() + taskNumber * 7);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function parseResources(resources: string | null): {
  features?: string[];
  outcome?: string;
  dueDate?: string;
} {
  if (!resources) return {};
  try {
    const parsed = JSON.parse(resources);
    return {
      features: Array.isArray(parsed.features) ? parsed.features : undefined,
      outcome: typeof parsed.outcome === "string" ? parsed.outcome : undefined,
      dueDate: typeof parsed.dueDate === "string" ? parsed.dueDate : undefined,
    };
  } catch {
    return {};
  }
}

function extractFeatures(title: string, taskNumber: number): string[] {
  const lower = title.toLowerCase();
  const features: string[] = [];
  if (/ui|frontend|interface|design/.test(lower))
    features.push("Frontend UI with responsive design");
  if (/api|backend|server/.test(lower)) features.push("Backend API development");
  if (/auth|login|user/.test(lower)) features.push("User authentication & authorization");
  if (/database|db|data/.test(lower)) features.push("Database schema design & queries");
  if (/deploy|host|ci|cd/.test(lower)) features.push("Deployment & CI/CD setup");
  if (/test|debug|quality/.test(lower)) features.push("Testing & debugging");
  if (/responsive|mobile/.test(lower)) features.push("Responsive design for all devices");
  if (features.length === 0)
    features.push(...(DEFAULT_FEATURES[taskNumber] ?? DEFAULT_FEATURES[1]));
  return features.slice(0, 4);
}

function extractOutcome(title: string, taskNumber: number, description: string): string {
  const outcomes: string[] = [];
  const lower = title.toLowerCase();
  const desc = description.toLowerCase();
  if (/api|backend/.test(lower) || /api/.test(desc))
    outcomes.push("Design and consume RESTful APIs effectively.");
  if (/ui|frontend/.test(lower))
    outcomes.push("Build responsive, accessible user interfaces with modern frameworks.");
  if (/auth/.test(lower))
    outcomes.push("Implement secure authentication and role-based access control.");
  if (/database/.test(lower))
    outcomes.push("Design efficient database schemas and write optimized queries.");
  if (/deploy/.test(lower))
    outcomes.push("Deploy applications to production with proper CI/CD pipelines.");
  if (outcomes.length === 0) outcomes.push(DEFAULT_OUTCOMES[taskNumber] ?? DEFAULT_OUTCOMES[1]);
  return outcomes.join(" ");
}

export function TasksSection({
  tasks,
  submissions,
  appId,
  onChange,
}: {
  tasks: Task[];
  submissions: Submission[];
  appId: string;
  onChange: () => void;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {tasks.map((task, i) => {
        const sub = submissions.find((s) => s.task_id === task.id);
        const prevDone =
          i === 0 || submissions.find((s) => s.task_id === tasks[i - 1].id)?.status === "approved";
        return (
          <TaskCard
            key={task.id}
            task={task}
            submission={sub}
            appId={appId}
            unlocked={!!prevDone}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
}

function TaskCard({
  task,
  submission,
  appId,
  unlocked,
  onChange,
}: {
  task: Task;
  submission: Submission | undefined;
  appId: string;
  unlocked: boolean;
  onChange: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const status = getTaskStatus(submission);
  const parsed = parseResources(task.resources);
  const features = parsed.features ?? extractFeatures(task.title, task.task_number);
  const outcome = parsed.outcome ?? extractOutcome(task.title, task.task_number, task.description);
  const dueDate = parsed.dueDate ?? computeDueDate(task.task_number);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      application_id: appId,
      task_id: task.id,
      github_url: String(fd.get("github_url")),
      deployed_url: String(fd.get("deployed_url")),
      notes: String(fd.get("notes")),
      status: "pending" as const,
    };
    const { error } = submission
      ? await supabase
          .from("submissions")
          .update({ ...payload, submitted_at: new Date().toISOString() })
          .eq("id", submission.id)
      : await supabase.from("submissions").insert(payload);
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Submission sent for review");
    setOpen(false);
    onChange();
  };

  return (
    <Card
      className={`group relative flex flex-col overflow-hidden rounded-2xl border-l-4 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
        borderColor[status]
      } ${!unlocked ? "opacity-50 pointer-events-none" : ""}`}
    >
      {/* Header: Task Number + Status */}
      <div className="flex items-start justify-between px-5 pt-5">
        <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-sm font-bold text-white shadow-sm">
          {task.task_number}
        </div>
        <Badge
          variant="outline"
          className={`rounded-full border px-3 py-1 text-xs font-medium ${statusBadge[status].className}`}
        >
          {status === "completed" && <CheckCircle2 className="mr-1 size-3" />}
          {status === "ongoing" && <Clock className="mr-1 size-3" />}
          {status === "pending" && <AlertCircle className="mr-1 size-3" />}
          {statusBadge[status].label}
        </Badge>
      </div>

      {/* Due Date */}
      <div className="mt-3 flex items-center gap-1.5 px-5 text-xs text-muted-foreground">
        <CalendarDays className="size-3.5" />
        <span>Due: {dueDate}</span>
      </div>

      {/* Title */}
      <h3 className="mt-3 line-clamp-2 px-5 text-lg font-bold leading-snug">{task.title}</h3>

      {/* Description */}
      <p className="mt-2 line-clamp-3 px-5 text-sm text-muted-foreground">{task.description}</p>

      {/* Key Features */}
      <div className="mt-4 px-5">
        <h4 className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wide">
          <BookOpen className="size-3" /> Key Features
        </h4>
        <ul className="mt-2 space-y-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="mt-1 size-1 shrink-0 rounded-full bg-blue-500" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Expected Outcome */}
      <div className="mt-4 px-5">
        <h4 className="flex items-center gap-1.5 text-xs font-semibold text-green-600 uppercase tracking-wide">
          <Target className="size-3" /> Expected Outcome
        </h4>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{outcome}</p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer / Action Area */}
      <div className="mt-5 border-t border-border/50 px-5 py-4">
        {status === "completed" ? (
          <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            <CheckCircle2 className="size-5 shrink-0 text-green-500" />
            <span>Completed Successfully</span>
          </div>
        ) : !unlocked ? (
          <p className="text-center text-xs text-muted-foreground">
            Complete the previous task to unlock.
          </p>
        ) : (
          <div className="space-y-3">
            {submission?.status === "rejected" && submission.feedback && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                <p className="mb-1 font-semibold">Feedback</p>
                {submission.feedback}
              </div>
            )}
            <Button
              onClick={() => setOpen(!open)}
              className="w-full"
              variant={status === "ongoing" ? "outline" : "default"}
            >
              {status === "ongoing" ? (
                <>
                  <ArrowRight className="mr-1.5 size-4" /> Continue
                </>
              ) : (
                <>
                  <ExternalLink className="mr-1.5 size-4" /> Submit Task
                </>
              )}
            </Button>
            {open && (
              <form
                onSubmit={handleSubmit}
                className="space-y-3 rounded-xl border border-border/60 bg-muted/30 p-4"
              >
                <div>
                  <Label className="text-xs">GitHub URL</Label>
                  <Input
                    name="github_url"
                    type="url"
                    size={9}
                    className="mt-1 h-9 text-sm"
                    defaultValue={submission?.github_url ?? ""}
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs">Live / Demo URL</Label>
                  <Input
                    name="deployed_url"
                    type="url"
                    size={9}
                    className="mt-1 h-9 text-sm"
                    defaultValue={submission?.deployed_url ?? ""}
                  />
                </div>
                <div>
                  <Label className="text-xs">Notes</Label>
                  <Textarea
                    name="notes"
                    rows={3}
                    className="mt-1 text-sm"
                    defaultValue={submission?.notes ?? ""}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full brand-gradient text-white border-0"
                >
                  {loading ? "Submitting…" : "Submit for Review"}
                </Button>
              </form>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
