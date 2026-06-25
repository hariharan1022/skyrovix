import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useReviews, useUserReview, useSubmitReview, useDeleteReview, computeStats, type ReviewWithProfile } from "@/lib/reviews";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, Pencil, Trash2, MessageSquare, Loader2 } from "lucide-react";
import { Reveal } from "@/components/motion";
import { toast } from "sonner";

function StarPicker({ value, onChange, size = "md" }: { value: number; onChange: (v: number) => void; size?: "sm" | "md" }) {
  const s = size === "sm" ? "size-4" : "size-6";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onChange(star)} className="p-0.5 transition-transform hover:scale-110">
          <Star className={`${s} ${star <= value ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`} />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewWithProfile }) {
  const name = review.profiles?.full_name ?? "Anonymous";
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const avatarUrl = review.profiles?.photo_url;
  const date = new Date(review.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <Card className="bg-white/60 dark:bg-[#0f172a]/60 border-border/50">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Avatar className="size-9">
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="size-full object-cover rounded-full" />
              ) : (
                <AvatarFallback className="text-[10px] bg-[#07284a]/10 dark:bg-[#1d4ed8]/10 text-[#07284a] dark:text-[#60a5fa]">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="text-sm font-medium">{name}</p>
              <p className="text-[11px] text-muted-foreground">{date}</p>
            </div>
          </div>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`size-3.5 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/20"}`} />
            ))}
          </div>
        </div>
        {review.title && <p className="text-sm font-semibold">{review.title}</p>}
        <p className="text-sm text-muted-foreground">{review.content}</p>
      </CardContent>
    </Card>
  );
}

function ReviewForm({ targetType, targetId, existingReview, onDone }: {
  targetType: "course" | "internship";
  targetId: string;
  existingReview?: { rating: number; title: string | null; content: string } | null;
  onDone: () => void;
}) {
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [title, setTitle] = useState(existingReview?.title ?? "");
  const [content, setContent] = useState(existingReview?.content ?? "");
  const submitReview = useSubmitReview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) { toast.error("Please select a star rating"); return; }
    if (!content.trim()) { toast.error("Please write your review"); return; }
    try {
      await submitReview.mutateAsync({ target_type: targetType, target_id: targetId, rating, title: title.trim() || undefined, content: content.trim() });
      toast.success(existingReview ? "Review updated!" : "Review submitted!");
      onDone();
    } catch (err: any) {
      toast.error(err.message || "Failed to submit review");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1.5 block">Rating</label>
        <StarPicker value={rating} onChange={setRating} />
      </div>
      <div>
        <label className="text-sm font-medium mb-1.5 block">Title (optional)</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience"
          className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1.5 block">Your Review</label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your experience with this course..."
          rows={4}
          required
        />
      </div>
      <div className="flex gap-3 pt-1">
        <Button type="submit" disabled={submitReview.isPending} className="gap-2">
          {submitReview.isPending && <Loader2 className="size-4 animate-spin" />}
          {existingReview ? "Update Review" : "Submit Review"}
        </Button>
        <Button type="button" variant="outline" onClick={onDone}>Cancel</Button>
      </div>
    </form>
  );
}

function RatingDistribution({ stats }: { stats: ReturnType<typeof computeStats> }) {
  const maxCount = Math.max(...Object.values(stats.distribution), 1);
  return (
    <div className="space-y-1.5">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = stats.distribution[star] ?? 0;
        const pct = (count / maxCount) * 100;
        return (
          <div key={star} className="flex items-center gap-2 text-xs">
            <span className="w-3 text-right text-muted-foreground">{star}★</span>
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${pct}%` }} />
            </div>
            <span className="w-6 text-right text-muted-foreground">{count}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function ReviewSection({ targetType, targetId }: { targetType: "course" | "internship"; targetId: string }) {
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: reviews = [], isLoading } = useReviews(targetType, targetId);
  const { data: userReview } = useUserReview(targetType, targetId, user?.id);
  const deleteReview = useDeleteReview();

  const stats = computeStats(reviews);

  const { data: isEnrolled = false } = useQuery({
    queryKey: ["review-eligibility", targetType, targetId, user?.id],
    enabled: !!user,
    queryFn: async () => {
      if (targetType === "course") {
        const { data } = await supabase
          .from("enrollments")
          .select("id")
          .eq("user_id", user!.id)
          .eq("course_id", targetId)
          .maybeSingle();
        return !!data;
      }
      const { data } = await supabase
        .from("applications")
        .select("id")
        .eq("user_id", user!.id)
        .eq("domain", targetId)
        .maybeSingle();
      return !!data;
    },
  });

  const handleDelete = async () => {
    if (!userReview) return;
    if (!confirm("Delete your review?")) return;
    try {
      await deleteReview.mutateAsync(userReview.id);
      toast.success("Review deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    }
  };

  return (
    <Reveal>
      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 rounded-xl bg-[#07284a]/10 dark:bg-[#1d4ed8]/10 flex items-center justify-center">
          <MessageSquare className="size-5 text-[#07284a] dark:text-[#60a5fa]" />
        </div>
        <h2 className="text-2xl font-bold">Reviews</h2>
      </div>

      {/* Rating Summary */}
      <Card className="bg-white/60 dark:bg-[#0f172a]/60 border-border/50 mb-8">
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-[1fr_auto] gap-6 items-start">
            <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-1">
              <span className="text-4xl font-bold">{stats.average > 0 ? stats.average : "—"}</span>
              <div className="flex gap-0.5">
                {stats.average > 0 && Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`size-4 ${i < Math.round(stats.average) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{stats.total} review{stats.total !== 1 ? "s" : ""}</p>
            </div>
            <div className="min-w-[200px] w-full sm:w-auto">
              <RatingDistribution stats={stats} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Write / Edit Review */}
      {user ? (
        isEnrolled ? (
          <div className="mb-8">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant={userReview ? "outline" : "default"} className="gap-2">
                  {userReview ? <><Pencil className="size-4" /> Edit Your Review</> : <><Star className="size-4" /> Write a Review</>}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                  <DialogTitle>{userReview ? "Edit Your Review" : "Write a Review"}</DialogTitle>
                </DialogHeader>
                <ReviewForm
                  targetType={targetType}
                  targetId={targetId}
                  existingReview={userReview ? { rating: userReview.rating, title: userReview.title, content: userReview.content } : null}
                  onDone={() => setDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
            {userReview && (
              <Button variant="ghost" size="sm" className="ml-2 text-destructive gap-1.5" onClick={handleDelete} disabled={deleteReview.isPending}>
                <Trash2 className="size-3.5" /> Delete
              </Button>
            )}
          </div>
        ) : (
          <div className="mb-8">
            <Button variant="outline" className="gap-2" disabled>
              <Star className="size-4" /> Enroll to Review
            </Button>
          </div>
        )
      ) : (
        <div className="mb-8">
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/auth"><Star className="size-4" /> Sign in to Review</Link>
          </Button>
        </div>
      )}

      <Separator className="mb-8" />

      {/* Review List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 space-y-3">
          <MessageSquare className="size-10 mx-auto text-muted-foreground/40" />
          <p className="text-muted-foreground">Be the first learner to review this {targetType}.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </Reveal>
  );
}
