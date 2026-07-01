import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Shield, CheckCircle2, XCircle, Loader2, ArrowLeft } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export const Route = createFileRoute("/verify-award")({
  head: () => [{ title: "Verify Award — Skyrovix" }],
  component: VerifyAwardPage,
});

function VerifyAwardPage() {
  const search = useSearch({ from: "/verify-award" });
  const [award, setAward] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const certId = (search as any)?.certId ?? "";

  useEffect(() => {
    if (!certId) { setLoading(false); setError("No certificate ID provided"); return; }
    supabase
      .from("project_awards" as any)
      .select("*")
      .eq("award_id", certId)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setAward(data);
        else setError("Award not found");
        setLoading(false);
      });
  }, [certId]);

  const verifyUrl = typeof window !== "undefined" ? `${window.location.origin}/verify-award?certId=${certId}` : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] dark:from-[#0B1120] dark:to-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition">
          <ArrowLeft className="size-3.5" /> Back to Home
        </Link>

        <div className="rounded-2xl border border-border/40 bg-white/70 dark:bg-[#1E293B]/70 backdrop-blur-xl p-6 sm:p-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 dark:bg-amber-900/30 px-4 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400 mb-4">
            <Shield className="size-3.5" /> Award Verification
          </div>

          {loading ? (
            <div className="py-12"><Loader2 className="size-8 animate-spin mx-auto text-muted-foreground" /></div>
          ) : error ? (
            <div className="py-8">
              <XCircle className="size-12 mx-auto mb-3 text-rose-400" />
              <p className="font-semibold text-rose-600 dark:text-rose-400">{error}</p>
              <p className="text-xs text-muted-foreground mt-2">This award ID could not be verified.</p>
            </div>
          ) : award ? (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-4 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" /> Verified
              </div>

              <Award className="size-12 mx-auto text-amber-500" />
              <div>
                <h1 className="text-lg font-bold">{award.participant_name}</h1>
                <p className="text-sm text-muted-foreground">{award.project_title}</p>
              </div>

              <div className="flex justify-center gap-3 flex-wrap">
                <Badge variant="outline" className="text-xs px-3 py-1">{award.rank}</Badge>
                <Badge variant="outline" className="text-xs px-3 py-1">{award.award_category}</Badge>
                <Badge variant="outline" className="text-xs px-3 py-1">Score: {award.final_score}/100</Badge>
              </div>

              <p className="text-[10px] text-muted-foreground font-mono">Award ID: {award.award_id}</p>
              <p className="text-[10px] text-muted-foreground">Issued: {new Date(award.issue_date).toLocaleDateString()}</p>

              <div className="flex justify-center pt-2">
                <div className="p-2 bg-white rounded-xl border">
                  <QRCodeSVG value={verifyUrl} size={80} />
                </div>
              </div>
              <p className="text-[9px] text-muted-foreground">Scan to verify this award</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
