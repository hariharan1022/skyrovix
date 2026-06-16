import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DOMAINS, generateInternId } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { ArrowRight, Award, FileCheck, Rocket, ShieldCheck, GraduationCap, IndianRupee, FileText, CreditCard } from "lucide-react";
import logo from "@/assets/logo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Skyrovix Internship Portal — Task-based virtual internships" },
      { name: "description", content: "Apply, complete 5 hands-on tasks, get a verified certificate. Internships in Full Stack, AI/ML, UI/UX, Cyber Security and more." },
      { property: "og:title", content: "Skyrovix Internship Portal" },
      { property: "og:description", content: "Task-based virtual internships with offer letters, digital ID cards, and verified certificates." },
    ],
  }),
  component: Landing,
});

const STEPS = [
  { icon: Rocket, title: "Apply", desc: "Pick a domain and submit your details." },
  { icon: FileCheck, title: "Offer + ID", desc: "Instant offer letter & digital ID card." },
  { icon: GraduationCap, title: "5 Tasks", desc: "Build real, portfolio-grade projects." },
  { icon: IndianRupee, title: "Payment", desc: "Pay ₹100 certification fee via GPay." },
  { icon: Award, title: "Certificate", desc: "Verified certificate with QR code." },
];

function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applyDomain, setApplyDomain] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const submitApplication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!applyDomain) return;
    const fd = new FormData(e.currentTarget);
    setApplying(true);
    try {
      let currentUser = user;
      if (!currentUser) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: String(fd.get("email")),
          password: String(fd.get("password")),
          options: { data: { full_name: String(fd.get("full_name")) } },
        });
        if (signUpError) throw signUpError;
        currentUser = signUpData.user;
        if (!currentUser) throw new Error("Account creation failed");
      }

      let photo_url: string | null = null;
      if (photoFile && currentUser) {
        const ext = photoFile.name.split(".").pop();
        const path = `${currentUser.id}/${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage.from("profile-photos").upload(path, photoFile, { upsert: true });
        if (!upErr) {
          const { data: signed } = await supabase.storage.from("profile-photos").createSignedUrl(path, 60 * 60 * 24 * 365);
          photo_url = signed?.signedUrl ?? null;
        }
      }

      const intern_id = generateInternId();
      const payload = {
        user_id: currentUser.id,
        domain: applyDomain,
        intern_id,
        full_name: String(fd.get("full_name")),
        email: currentUser.email ?? "",
        phone: String(fd.get("phone")),
        college: String(fd.get("college")),
        course: String(fd.get("course")),
        year: String(fd.get("year")),
        photo_url,
        status: "approved" as const,
      };
      const { error: insertError } = await supabase.from("applications").insert(payload);
      if (insertError) throw insertError;

      await supabase.from("profiles").upsert({
        id: currentUser.id,
        full_name: payload.full_name,
        phone: payload.phone,
        college: payload.college,
        course: payload.course,
        year: payload.year,
        photo_url,
      });

      toast.success("Application submitted! Your internship has started.");
      setApplyDomain(null);
      if (user) navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.55_0.22_295/0.08),transparent_70%),radial-gradient(ellipse_at_bottom_left,oklch(0.50_0.20_285/0.06),transparent_60%),radial-gradient(ellipse_at_bottom_right,oklch(0.38_0.16_270/0.05),transparent_60%)]" />
        <div className="absolute inset-0 -z-10 bg-[image:radial-gradient(oklch(0.55_0.22_295/0.08)_1px,transparent_0)] bg-[size:24px_24px]" />
        <div className="absolute -top-48 left-1/4 -z-10 size-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-32 right-1/4 -z-10 size-[400px] rounded-full bg-purple-400/15 blur-[100px]" />
        <div className="absolute left-1/3 top-1/3 -z-10 size-[300px] rounded-full bg-indigo-400/10 blur-[80px]" />
        <div className="mx-auto max-w-4xl px-4 pt-20 pb-24 text-center md:pt-28">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
            <ShieldCheck className="size-3.5 text-primary" /> MSME Registered · Skyrovix IT Solutions
          </div>
          <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Learn by building.<br />
            <span className="brand-text">Get certified.</span>
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Build in{" "}
            <RotatingText
              texts={["Full Stack", "AI/ML", "Cyber Security", "UI/UX", "Data Science"]}
            />
            .
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Task-based virtual internships — apply in minutes, get an instant offer letter and
            ID card, complete 5 real-world projects, and earn a QR-verified certificate.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="brand-gradient text-white border-0 glow">
              <Link to="/auth">Start your internship <ArrowRight className="ml-1 size-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/domains">Browse domains</Link>
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-xs text-muted-foreground">
            <Stat n="10" label="Domains" />
            <Stat n="50+" label="Projects" />
            <Stat n="100%" label="Online" />
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">How it works</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">A simple 5-step journey from application to certification.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <div key={i} className="group relative rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur transition hover:border-primary/60 hover:bg-card/80">
              <div className="absolute -top-3 left-5 grid size-7 place-items-center rounded-full brand-gradient text-xs font-bold text-white">{i + 1}</div>
              <s.icon className="mt-3 size-6 text-primary" />
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DOMAINS */}
      <section id="domains" className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Choose your domain</h2>
            <p className="mt-2 text-muted-foreground">10 industry-aligned tracks. Each ships with a 5-task curriculum.</p>
          </div>
          <Button asChild variant="ghost" className="hidden md:inline-flex"><Link to="/domains">View all <ArrowRight className="ml-1 size-4" /></Link></Button>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.slice(0, 6).map((d) => (
            <button key={d.slug} onClick={() => setApplyDomain(d.slug)} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 text-left transition hover:-translate-y-1 hover:border-primary/60">
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${d.color} opacity-0 transition group-hover:opacity-10`} />
              <div className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br ${d.color} text-sm font-bold text-white`}>{d.icon}</div>
              <h3 className="mt-4 font-semibold">{d.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d.description}</p>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">Apply now <ArrowRight className="ml-1 size-4 transition group-hover:translate-x-1" /></div>
            </button>
          ))}
        </div>
      </section>

      {/* Apply Dialog */}
      <Dialog open={!!applyDomain} onOpenChange={(o) => { if (!o) { setApplyDomain(null); setPhotoFile(null); } }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Apply for {applyDomain && DOMAINS.find((d) => d.slug === applyDomain)?.name}</DialogTitle>
            <DialogDescription>Fill in your details. You'll get your offer letter and ID card instantly.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitApplication} className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label>Full Name</Label>
              <Input name="full_name" defaultValue={user?.user_metadata?.full_name ?? ""} required />
            </div>
            <div>
              <Label>Email</Label>
              <Input name="email" type="email" defaultValue={user?.email ?? ""} required={!user} disabled={!!user} />
            </div>
            {!user && (
              <div>
                <Label>Password</Label>
                <Input name="password" type="password" minLength={6} required={!user} />
              </div>
            )}
            <div>
              <Label>Phone</Label>
              <Input name="phone" type="tel" required />
            </div>
            <div>
              <Label>College / University</Label>
              <Input name="college" required />
            </div>
            <div>
              <Label>Course / Branch</Label>
              <Input name="course" required />
            </div>
            <div>
              <Label>Year</Label>
              <Input name="year" placeholder="e.g. 3rd year" required />
            </div>
            <div>
              <Label>Profile Photo</Label>
              <Input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)} />
            </div>
            <Button type="submit" className="md:col-span-2 brand-gradient text-white border-0" disabled={applying}>
              {applying ? "Submitting…" : "Submit Application"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 brand-gradient p-10 text-center text-white">
          <img src={logo} alt="" className="absolute right-6 top-6 size-20 opacity-20" />
          <h2 className="text-3xl font-bold md:text-4xl">Ready to build something real?</h2>
          <p className="mt-3 text-white/80">Get your offer letter in seconds. No application fee — pay only ₹100 at certification.</p>
          <Button asChild size="lg" variant="secondary" className="mt-6">
            <Link to="/auth">Apply now <ArrowRight className="ml-1 size-4" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function RotatingText({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % texts.length), 2200);
    return () => clearInterval(t);
  }, [texts.length]);
  return (
    <span key={index} className="brand-text font-semibold animate-in fade-in slide-in-from-bottom-1 duration-300">
      {texts[index]}
    </span>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-foreground">{n}</div>
      <div className="uppercase tracking-wider">{label}</div>
    </div>
  );
}
