import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, XCircle, Search, Clock, GraduationCap, Award, ShieldCheck, ScanLine, Sparkles, ArrowRight } from "lucide-react";
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

    // 1. Try internship certificate lookup
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

    // 2. Try course certificate lookup
    const { data: courseCert, error: courseCertErr } = await supabase
      .from("course_certificates")
      .select("certificate_id, score, issued_at, enrollment_id")
      .eq("certificate_id", trimmed)
      .maybeSingle();

    if (courseCert && !courseCertErr) {
      const { data: enroll } = await supabase
        .from("enrollments")
        .select("user_id, course_id")
        .eq("id", courseCert.enrollment_id)
        .maybeSingle();

      if (enroll) {
        const { data: course } = await supabase
          .from("courses")
          .select("name, domain")
          .eq("id", enroll.course_id)
          .maybeSingle();
        
        const { data: prof } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", enroll.user_id)
          .maybeSingle();

        if (course && prof) {
          return setResult({
            state: "found",
            type: "course",
            data: {
              full_name: prof.full_name ?? "Student",
              domain: course.domain,
              course_name: course.name,
              score: courseCert.score,
              cert_id: courseCert.certificate_id,
              issued_at: courseCert.issued_at,
              status: "completed"
            }
          });
        }
      }
    }

    // 3. Try project certificate lookup
    const { data: projCert, error: projCertErr } = await (supabase as any)
      .from("project_certificates")
      .select("cert_id, participant_name, project_title, industry, final_score, issued_at")
      .eq("cert_id", trimmed)
      .maybeSingle();

    if (projCert && !projCertErr) {
      return setResult({
        state: "found",
        type: "project",
        data: {
          full_name: projCert.participant_name,
          domain: projCert.industry,
          project_title: projCert.project_title,
          score: Number(projCert.final_score),
          cert_id: projCert.cert_id,
          issued_at: projCert.issued_at,
          status: "approved"
        }
      });
    }

    // 4. Try intern ID lookup (old system)
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
    <div className="w-full">
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
          <div className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 mb-1">
              <ScanLine className="size-5 text-[#07284a] dark:text-[#60a5fa]" />
              <p className="text-sm font-semibold">Enter Certificate ID or Intern ID</p>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Example: <span className="font-mono font-medium text-foreground">SKX-2026-XXXX</span> or <span className="font-mono font-medium text-foreground">SKX-CERT-2026-XXXXX</span></p>
            <form onSubmit={verify} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. SKX-2026-XXXX" className="w-full pl-9" />
              </div>
              <Button type="submit" className="w-full sm:w-auto bg-[#07284a] text-white border-0 hover:bg-[#0d3b66]"><Search className="size-4" /> Verify</Button>
            </form>
          </div>
        </FadeUp>

        {result.state === "loading" && (
          <FadeUp y={10} duration={0.4}>
            <div className="mt-6 rounded-2xl border border-border/50 bg-card p-6 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-muted" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-1/3 rounded bg-muted" />
                  <div className="h-3 w-1/2 rounded bg-muted" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {[1,2,3,4].map(i => <div key={i} className="h-3 w-full rounded bg-muted" />)}
              </div>
            </div>
          </FadeUp>
        )}

        {result.state === "found" && result.type === "internship" && (() => {
          const d = result.data;
          const hasCert = !!d.cert_id;
          return (
            <FadeUp y={10} duration={0.4}>
              <div className={`mt-6 rounded-2xl border bg-card p-6 sm:p-8 shadow-sm ${hasCert ? "border-green-200/60 dark:border-green-900/40" : "border-amber-200/60 dark:border-amber-900/40"}`}>
                {/* Header */}
                <div className="flex items-center gap-4 pb-5 border-b border-border/40">
                  <div className={`grid size-14 shrink-0 place-items-center rounded-2xl ${hasCert ? "bg-green-50 dark:bg-green-950/30" : "bg-amber-50 dark:bg-amber-950/30"}`}>
                    {hasCert ? <CheckCircle2 className="size-7 text-green-500" /> : <Clock className="size-7 text-amber-500" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold">{hasCert ? "Verified ✓" : "Internship Found"}</h2>
                      {hasCert && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-950/30 px-2.5 py-0.5 text-[10px] font-semibold text-green-700 dark:text-green-400 border border-green-200/60 dark:border-green-900/40">
                          <ShieldCheck className="size-3" /> Authentic
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {hasCert ? "This certificate is authentic and issued by Skyrovix." : "This intern exists — certificate not yet issued."}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-5 space-y-0 divide-y divide-border/40 text-sm">
                  <Row k="Full Name" v={d.full_name} />
                  <Row k="Domain" v={getDomain(d.domain)?.name ?? d.domain} />
                  <Row k="Intern ID" v={<span className="font-mono">{d.intern_id}</span>} />
                  <Row k="Status" v={
                    <Badge variant={d.status === "approved" ? "default" : d.status === "rejected" ? "destructive" : "secondary"} className="capitalize">
                      {d.status}
                    </Badge>
                  } />
                  {d.cert_id && <Row k="Certificate ID" v={<span className="font-mono text-green-600 dark:text-green-400">{d.cert_id}</span>} />}
                  {d.issued_at && <Row k="Issued On" v={new Date(d.issued_at).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })} />}
                </div>

                {/* Footer trust badge */}
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#f8fafc] dark:bg-[#0f172a] px-4 py-3 text-xs text-muted-foreground">
                  <Award className="size-4 text-[#07284a] dark:text-[#60a5fa]" />
                  <span>Digitally verified by Skyrovix — MSME-registered IT company (UDYAM-TN-17-0076606)</span>
                </div>
              </div>
            </FadeUp>
          );
        })()}

        {result.state === "found" && result.type === "course" && (() => {
          const d = result.data;
          return (
            <FadeUp y={10} duration={0.4}>
              <div className="mt-6 rounded-2xl border border-green-200/60 dark:border-green-900/40 bg-card p-6 sm:p-8 shadow-sm">
                {/* Header */}
                <div className="flex items-center gap-4 pb-5 border-b border-border/40">
                  <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-green-50 dark:bg-green-950/30">
                    <CheckCircle2 className="size-7 text-green-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold">Verified ✓</h2>
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-950/30 px-2.5 py-0.5 text-[10px] font-semibold text-green-700 dark:text-green-400 border border-green-200/60 dark:border-green-900/40">
                        <ShieldCheck className="size-3" /> Authentic
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This course completion certificate is authentic and issued by Skyrovix.
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-5 space-y-0 divide-y divide-border/40 text-sm">
                  <Row k="Student Name" v={d.full_name} />
                  <Row k="Course Completed" v={d.course_name} />
                  <Row k="Final Exam Score" v={d.score !== undefined ? `${d.score}%` : "Passed"} />
                  <Row k="Certificate ID" v={<span className="font-mono text-green-600 dark:text-green-400">{d.cert_id}</span>} />
                  {d.issued_at && <Row k="Issued On" v={new Date(d.issued_at).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })} />}
                </div>

                {/* Footer trust badge */}
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#f8fafc] dark:bg-[#0f172a] px-4 py-3 text-xs text-muted-foreground">
                  <Award className="size-4 text-[#07284a] dark:text-[#60a5fa]" />
                  <span>Digitally verified by Skyrovix — MSME-registered IT company (UDYAM-TN-17-0076606)</span>
                </div>
              </div>
            </FadeUp>
          );
        })()}

        {result.state === "found" && result.type === "project" && (() => {
          const d = result.data;
          return (
            <FadeUp y={10} duration={0.4}>
              <div className="mt-6 rounded-2xl border border-green-200/60 dark:border-green-900/40 bg-card p-6 sm:p-8 shadow-sm">
                {/* Header */}
                <div className="flex items-center gap-4 pb-5 border-b border-border/40">
                  <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-green-50 dark:bg-green-950/30">
                    <CheckCircle2 className="size-7 text-green-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold">Verified ✓</h2>
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-950/30 px-2.5 py-0.5 text-[10px] font-semibold text-green-700 dark:text-green-400 border border-green-200/60 dark:border-green-900/40">
                        <ShieldCheck className="size-3" /> Authentic
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This real-world project challenge certificate is authentic and issued by Skyrovix.
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-5 space-y-0 divide-y divide-border/40 text-sm">
                  <Row k="Participant Name" v={d.full_name} />
                  <Row k="Project Completed" v={d.project_title} />
                  <Row k="Industry Track" v={d.domain} />
                  <Row k="Evaluation Score" v={d.score !== undefined ? `${d.score}/100` : "Passed"} />
                  <Row k="Certificate ID" v={<span className="font-mono text-green-600 dark:text-green-400">{d.cert_id}</span>} />
                  {d.issued_at && <Row k="Issued On" v={new Date(d.issued_at).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })} />}
                </div>

                {/* Footer trust badge */}
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#f8fafc] dark:bg-[#0f172a] px-4 py-3 text-xs text-muted-foreground">
                  <Award className="size-4 text-[#07284a] dark:text-[#60a5fa]" />
                  <span>Digitally verified by Skyrovix — MSME-registered IT company (UDYAM-TN-17-0076606)</span>
                </div>
              </div>
            </FadeUp>
          );
        })()}

        {result.state === "notfound" && (
          <FadeUp y={10} duration={0.4}>
            <div className="mt-6 rounded-2xl border border-red-200/60 dark:border-red-900/40 bg-card p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-red-50 dark:bg-red-950/30">
                  <XCircle className="size-7 text-red-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Not Found</h2>
                  <p className="text-sm text-muted-foreground">No certificate or intern matches this ID.</p>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 p-4 text-sm text-muted-foreground">
                <p className="font-semibold text-amber-800 dark:text-amber-300">Did you mean to?</p>
                <ul className="mt-1.5 space-y-1 list-disc list-inside text-xs">
                  <li>Check your Certificate ID or Intern ID for typos</li>
                  <li>Try searching with just the number (e.g. <span className="font-mono">2026-XXXX</span>)</li>
                  <li>Contact us at <a href="mailto:skyrovix@gmail.com" className="text-[#07284a] dark:text-[#60a5fa] underline">skyrovix@gmail.com</a> for assistance</li>
                </ul>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#f8fafc] dark:bg-[#0f172a] px-4 py-3 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-[#07284a] dark:text-[#60a5fa]" />
                <span>All Skyrovix certificates are QR-verified and tamper-proof.</span>
              </div>
            </div>
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
