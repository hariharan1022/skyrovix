import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, XCircle, Search, Clock, GraduationCap, Award, ShieldCheck } from "lucide-react";
import { getDomain } from "@/lib/constants";
import { AuroraBackground } from "@/components/AuroraBackground";
import { FadeUp } from "@/components/motion";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/JsonLd";

export const Route = createFileRoute("/verify-certificate")({
  head: () => ({
    meta: [
      { title: "Verify Skyrovix Certificate — Instant Online Certificate Verification" },
      { name: "description", content: "Verify the authenticity of a Skyrovix internship certificate online. Enter your certificate ID or intern ID to confirm authenticity instantly. QR-verified certificates for all domains." },
      { name: "keywords", content: "verify certificate, certificate verification, skyrovix certificate check, internship certificate verify, online certificate verification, QR verified certificate, skyrovix intern ID" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Skyrovix" },
      { property: "og:title", content: "Verify Skyrovix Certificate — Instant Online Verification" },
      { property: "og:description", content: "Verify your Skyrovix internship certificate online. Enter certificate ID or intern ID for instant QR-verified authenticity confirmation." },
      { property: "og:url", content: "https://skyrovix.online/verify-certificate" },
      { property: "og:image", content: "https://skyrovix.online/og-default.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Skyrovix Certificate Verification" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@skyrovix" },
      { name: "twitter:title", content: "Verify Skyrovix Certificate — Instant Online Verification" },
      { name: "twitter:description", content: "Verify your Skyrovix internship certificate online. Enter certificate ID or intern ID for instant authenticity check." },
      { name: "twitter:image", content: "https://skyrovix.online/og-default.png" },
      { name: "twitter:image:alt", content: "Skyrovix Certificate Verification" },
      { rel: "canonical", href: "https://skyrovix.online/verify-certificate" },
    ],
  }),
  component: VerifyPage,
});

type FoundData = {
  full_name: string; domain: string; intern_id?: string;
  status: string; cert_id?: string; issued_at?: string;
  // LMS fields
  course_name?: string; score?: number; verification_hash?: string;
  // Project fields
  project_title?: string;
};

type Result =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "found"; data: FoundData; type: "internship" | "course" | "project" }
  | { state: "notfound" };

function VerifyPage() {
  const [id, setId] = useState("");
  const [result, setResult] = useState<Result>({ state: "idle" });

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim()) return;
    setResult({ state: "loading" });

    const trimmed = id.trim();

    const { data: cert, error: oldCertErr } = await supabase
      .from("certificates")
      .select("certificate_id, issued_at, application_id")
      .eq("certificate_id", trimmed)
      .maybeSingle();

    if (cert && !oldCertErr) {
      const { data: app } = await supabase
        .from("applications")
        .select("full_name, domain, intern_id, status")
        .eq("id", cert.application_id)
        .maybeSingle();

      if (app) {
        return setResult({
          state: "found",
          type: "internship",
          data: { ...app, cert_id: cert.certificate_id, issued_at: cert.issued_at },
        });
      }
    }

    // 3. Try intern ID lookup (old system)
    const { data: app, error: appErr } = await supabase
      .from("applications")
      .select("full_name, domain, intern_id, status")
      .eq("intern_id", trimmed)
      .maybeSingle();

    if (app && !appErr) {
      return setResult({
        state: "found",
        type: "internship",
        data: { full_name: app.full_name, domain: app.domain, intern_id: app.intern_id, status: app.status },
      });
    }

    setResult({ state: "notfound" });
  };

  return (
    <div className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://skyrovix.online/" },
          { name: "Verify Certificate", url: "https://skyrovix.online/verify-certificate" },
        ]}
      />
      <WebPageJsonLd
        title="Verify Skyrovix Certificate — Instant Online Certificate Verification"
        description="Verify the authenticity of a Skyrovix internship certificate online. Enter your certificate ID or intern ID to confirm authenticity instantly."
        url="https://skyrovix.online/verify-certificate"
      />
      <Navbar />
      <AuroraBackground>
        <section className="relative pb-6 sm:pb-10 pt-8 sm:pt-16 md:pt-24">
          <div className="mx-auto max-w-2xl px-4">
            <FadeUp className="text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#07284a]/15 bg-white/60 dark:bg-[#0f172a]/60 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-medium text-[#07284a] dark:text-[#60a5fa] shadow-sm backdrop-blur">
                <ShieldCheck className="size-3 sm:size-3.5" /> Certificate Verification
              </div>
              <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                Verify <span className="brand-text">Certificate</span>
              </h1>
              <p className="mt-5 mx-auto max-w-xl text-sm sm:text-base text-muted-foreground">
                Enter a Certificate ID or Intern ID to verify authenticity.
              </p>
            </FadeUp>
          </div>
        </section>
      </AuroraBackground>
      <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <FadeUp delay={0.1}>
          <form onSubmit={verify} className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2">
            <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. SKX-2026-XXXX" className="w-full" />
            <Button type="submit" className="w-full sm:w-auto brand-gradient text-white border-0"><Search className="size-4" /> Verify</Button>
          </form>
        </FadeUp>

        {result.state === "loading" && (
          <FadeUp y={10} duration={0.4} className="mt-6 text-muted-foreground">Checking…</FadeUp>
        )}

        {result.state === "found" && result.type === "internship" && (() => {
          const d = result.data;
          const hasCert = !!d.cert_id;
          return (
            <FadeUp y={10} duration={0.4}>
              <Card className={`mt-8 ${hasCert ? "border-primary/40" : "border-amber-400/40"}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {hasCert ? <CheckCircle2 className="size-8 text-green-500" /> : <Clock className="size-8 text-amber-500" />}
                    <div>
                      <CardTitle>{hasCert ? "Verified ✓" : "Internship Found"}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {hasCert ? "This certificate is authentic." : "Certificate not yet issued."}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <Row k="Name" v={d.full_name} />
                  <Row k="Domain" v={getDomain(d.domain)?.name ?? d.domain} />
                  <Row k="Intern ID" v={d.intern_id} />
                  <Row k="Status" v={<Badge variant={d.status === "approved" ? "default" : d.status === "rejected" ? "destructive" : "secondary"}>{d.status}</Badge>} />
                  {d.cert_id && <Row k="Certificate ID" v={d.cert_id} />}
                  {d.issued_at && <Row k="Issued" v={new Date(d.issued_at).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })} />}
                </CardContent>
              </Card>
            </FadeUp>
          );
        })()}

        {result.state === "notfound" && (
          <FadeUp y={10} duration={0.4}>
            <Card className="mt-8 border-destructive/60">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <XCircle className="size-8 text-destructive" />
                  <div>
                    <CardTitle>Not Found</CardTitle>
                    <p className="text-sm text-muted-foreground">No certificate matches this ID.</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </FadeUp>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string | React.ReactNode }) {
  return (
    <div className="flex justify-between border-b border-border/40 py-2">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
