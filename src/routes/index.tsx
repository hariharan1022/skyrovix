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
import { ArrowRight, Award, FileCheck, Rocket, ShieldCheck, GraduationCap, IndianRupee } from "lucide-react";
import { HeroVisual } from "@/components/HeroVisual";
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
      <section className="relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#FFFFFF_0%,#F8F7FF_40%,#EEF2FF_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[image:radial-gradient(#7C3AED10_1px,transparent_0)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        <div className="absolute -top-48 left-1/2 -z-10 size-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-transparent blur-[150px]" />
        <div className="absolute -bottom-64 left-1/4 -z-10 size-[600px] rounded-full bg-gradient-to-tr from-purple-400/15 via-blue-400/10 to-transparent blur-[130px]" />
        <div className="absolute right-0 top-1/3 -z-10 size-[500px] rounded-full bg-gradient-to-bl from-fuchsia-400/10 via-transparent to-transparent blur-[120px]" />
        <div className="absolute left-0 top-1/2 -z-10 size-[300px] rounded-full bg-blue-400/10 blur-[100px]" />

        {/* Floating gradient circles */}
        <div className="absolute left-[15%] top-[20%] -z-10 size-32 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl" />
        <div className="absolute right-[20%] top-[10%] -z-10 size-40 rounded-full bg-gradient-to-br from-purple-400/20 to-fuchsia-400/20 blur-3xl" />
        <div className="absolute bottom-[30%] right-[10%] -z-10 size-24 rounded-full bg-gradient-to-br from-blue-400/15 to-cyan-400/15 blur-3xl" />

        {/* Wave shape at bottom */}
        <div className="absolute bottom-0 left-0 -z-10 h-32 w-full bg-[linear-gradient(to_top,#F8F7FF,transparent)]" />

        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-16 md:grid-cols-2">
            {/* LEFT */}
            <div className="text-center md:text-left">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/70 px-4 py-1.5 text-xs text-gray-600 shadow-sm backdrop-blur">
                <ShieldCheck className="size-3.5 text-blue-600" /> MSME Registered · Skyrovix IT Solutions
              </div>

              <h1 className="font-display text-5xl font-bold tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
                Learn by building.<br />
                <span className="brand-text-blue">Get certified.</span>
              </h1>

              <div className="mt-6 h-8">
                <p className="text-lg text-gray-600">
                  Build in{" "}
                  <TypingText
                    texts={["Full Stack Development", "Data Science", "Cyber Security", "UI/UX Design"]}
                  />
                </p>
              </div>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-gray-500">
                Task-based virtual internships — apply in minutes, get an instant offer letter and
                ID card, complete real-world projects, and earn a QR-verified certificate.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link to="/auth">
                  <Button size="lg" className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:shadow-xl hover:shadow-blue-600/30 hover:scale-105 active:scale-95 glow-blue">
                    Start your internship <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
                <Link to="/domains">
                  <Button size="lg" variant="outline" className="rounded-xl border-2 border-purple-200 bg-white px-8 py-6 text-base font-semibold text-gray-700 shadow-sm transition hover:border-purple-300 hover:bg-purple-50/50 hover:shadow-md">
                    Browse domains
                  </Button>
                </Link>
              </div>

              <div className="mt-14 flex items-center gap-10 md:justify-start">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">10</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400">Domains</div>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">50+</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400">Projects</div>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">100%</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400">Online</div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="hidden md:block">
              <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                <HeroVisual />
              </div>
            </div>
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

function TypingText({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (display.length < current.length) {
        timer = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 50);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (display.length > 0) {
        timer = setTimeout(() => setDisplay(display.slice(0, -1)), 25);
      } else {
        setIsDeleting(false);
        setIndex((i) => (i + 1) % texts.length);
      }
    }

    return () => clearTimeout(timer);
  }, [display, isDeleting, index, texts]);

  return (
    <span className="font-semibold text-blue-600">
      {display}
      <span className="ml-0.5 animate-pulse text-blue-400">|</span>
    </span>
  );
}
