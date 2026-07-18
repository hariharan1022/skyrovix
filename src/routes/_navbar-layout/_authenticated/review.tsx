import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useSubmitReview, useUserReview } from "@/lib/reviews";
import { getDomain } from "@/lib/constants";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import {
  Star, Loader2, CheckCircle2, MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/_navbar-layout/_authenticated/review")({
  head: () => ({ meta: [{ title: "Write a Review — Skyrovix" }] }),
  component: ReviewPage,
});

function ReviewPage() {
  const { user } = useAuth();

  const { data: appsList } = useQuery({
    queryKey: ["my-applications", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase.from("applications").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      return data ?? [];
    },
    enabled: !!user,
  });

  const app = appsList?.find((a) => a.status === "ongoing" || a.status === "approved") ?? appsList?.[0] ?? null;
  const domain = app ? getDomain(app.domain) : null;

  if (!app) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] dark:from-[#0B1120] dark:to-[#0F172A]">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="rounded-3xl border border-dashed border-border/50 bg-white/40 p-12 backdrop-blur-xl dark:bg-slate-900/40">
            <MessageSquare className="size-12 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-base font-bold text-foreground">No Internship Yet</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">Apply for an internship first, then come back to leave a review.</p>
          </div>
        </div>
      </div>
    );
  }

  return <ReviewForm app={app} domain={domain} user={user} />;
}

function ReviewForm({ app, domain, user }: { app: any; domain: any; user: any }) {
  const { data: existingReview, isLoading: reviewLoading } = useUserReview("internship", app.domain, user?.id);
  const submitReview = useSubmitReview();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setContent(existingReview.content);
      setTitle(existingReview.title ?? "");
    }
  }, [existingReview]);

  const handleSubmit = async () => {
    if (!rating) { toast.error("Please select a rating"); return; }
    if (!content.trim()) { toast.error("Please write your review"); return; }
    submitReview.mutate(
      { target_type: "internship", target_id: app.domain, rating, title: title || undefined, content },
      { onSuccess: () => toast.success(existingReview ? "Review updated!" : "Review submitted!") },
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] dark:from-[#0B1120] dark:to-[#0F172A]">
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#07284a]/8 via-[#07284a]/3 to-blue-400/8 p-8 sm:p-12 mb-6">
          <div className="absolute -right-24 -top-24 size-64 rounded-full bg-[#07284a]/15 blur-[120px]" />
          <div className="absolute -bottom-16 -left-16 size-48 rounded-full bg-blue-400/10 blur-[100px]" />
          <div className="relative flex items-start gap-6">
            <div className="hidden sm:grid size-16 shrink-0 place-items-center rounded-2xl brand-gradient text-white shadow-lg shadow-[#07284a]/20">
              <MessageSquare className="size-8" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-display">Write a Review</h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground/80 leading-relaxed">Share your internship experience and help other students.</p>
            </div>
          </div>
        </div>

        {reviewLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="rounded-3xl border border-border/40 bg-white/60 p-6 sm:p-8 backdrop-blur-xl dark:bg-slate-900/60 dark:border-white/5 space-y-6">
            {/* Domain Info */}
            <div className="flex items-center gap-4 pb-4 border-b border-border/40">
              <div className={`grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${domain?.color ?? "from-[#07284a] to-blue-600"} text-white shadow-md`}>
                <span className="text-xl font-bold">{domain?.icon ?? "?"}</span>
              </div>
              <div>
                <p className="font-display text-lg font-bold">{domain?.name ?? app.domain}</p>
                <p className="text-xs text-muted-foreground">{app.intern_id}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Rating</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="transition-all duration-150 hover:scale-110"
                  >
                    <Star className={`size-8 sm:size-9 ${star <= (hoverRating || rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="review-title" className="text-sm font-semibold">Title <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <Input id="review-title" placeholder="Summarize your experience" value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-xl" />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="review-content" className="text-sm font-semibold">Your Review</Label>
              <textarea
                id="review-content"
                placeholder="Tell us about your internship experience..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex min-h-[140px] w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <p className="text-xs text-muted-foreground">{content.length}/500</p>
            </div>

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              disabled={submitReview.isPending}
              className="brand-gradient text-white border-0 rounded-2xl px-8 h-11 font-semibold shadow-md w-full sm:w-auto"
            >
              {submitReview.isPending ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              {existingReview ? "Update Review" : "Submit Review"}
            </Button>

            {existingReview && (
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-500" />
                {existingReview.status === "approved" ? "Your review is published." : "Your review is pending approval."}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
