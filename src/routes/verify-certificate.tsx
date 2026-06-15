import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, XCircle, Search } from "lucide-react";
import { getDomain } from "@/lib/constants";
import seal from "@/assets/seal.jpg";

export const Route = createFileRoute("/verify-certificate")({
  head: () => ({ meta: [{ title: "Verify Certificate — Skyrovix" }, { name: "description", content: "Verify the authenticity of a Skyrovix internship certificate by ID." }] }),
  component: VerifyPage,
});

type Result =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "found"; data: { full_name: string; domain: string; intern_id: string; cert_id: string; issued_at: string } }
  | { state: "notfound" };

function VerifyPage() {
  const [id, setId] = useState("");
  const [result, setResult] = useState<Result>({ state: "idle" });

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim()) return;
    setResult({ state: "loading" });
    const { data } = await supabase
      .from("certificates")
      .select("certificate_id, issued_at, applications(full_name, domain, intern_id)")
      .eq("certificate_id", id.trim())
      .maybeSingle();
    if (!data || !data.applications) return setResult({ state: "notfound" });
    setResult({
      state: "found",
      data: {
        full_name: (data.applications as { full_name: string }).full_name,
        domain: (data.applications as { domain: string }).domain,
        intern_id: (data.applications as { intern_id: string }).intern_id,
        cert_id: data.certificate_id,
        issued_at: data.issued_at,
      },
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-4xl font-bold">Verify <span className="brand-text">Certificate</span></h1>
        <p className="mt-3 text-muted-foreground">Enter a Skyrovix Certificate ID to verify its authenticity.</p>

        <form onSubmit={verify} className="mt-8 flex gap-2">
          <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="SKX-CERT-2026-XXXXX" />
          <Button type="submit" className="brand-gradient text-white border-0"><Search className="size-4" /> Verify</Button>
        </form>

        {result.state === "loading" && <p className="mt-6 text-muted-foreground">Checking…</p>}

        {result.state === "found" && (
          <Card className="mt-8 border-primary/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-8 text-green-500" />
                <div>
                  <CardTitle>Verified ✓</CardTitle>
                  <p className="text-sm text-muted-foreground">This certificate is authentic.</p>
                </div>
                <img src={seal} alt="Seal" className="ml-auto size-16 opacity-90" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Row k="Name" v={result.data.full_name} />
              <Row k="Domain" v={getDomain(result.data.domain)?.name ?? result.data.domain} />
              <Row k="Intern ID" v={result.data.intern_id} />
              <Row k="Certificate ID" v={result.data.cert_id} />
              <Row k="Issued" v={new Date(result.data.issued_at).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })} />
            </CardContent>
          </Card>
        )}

        {result.state === "notfound" && (
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
        )}
      </main>
      <Footer />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-border/40 py-2">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
