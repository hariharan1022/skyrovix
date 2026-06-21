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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen, Layers, Monitor, Server, BarChart3, Brain, Palette,
  Code2, Shield, TrendingUp, ArrowRight, Award, FileCheck, Rocket,
  ShieldCheck, GraduationCap, IndianRupee, HelpCircle, ListChecks, Trophy,
  Sparkles, Star, Users, Zap, ChevronRight, CheckCircle2, Quote,
} from "lucide-react";
import { HeroVisual } from "@/components/HeroVisual";
import logo from "@/assets/logo.jpg";

const COURSE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Layers, Monitor, Server, BarChart3, Brain, Palette, Code2, Shield, TrendingUp,
};

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

const DOMAIN_COLORS: Record<string, string> = {
  fullstack: "from-blue-600 to-purple-600",
  frontend: "from-sky-500 to-blue-600",
  backend: "from-emerald-500 to-teal-600",
  datascience: "from-orange-500 to-red-500",
  aiml: "from-violet-500 to-purple-600",
  uiux: "from-pink-500 to-rose-500",
  python: "from-blue-500 to-cyan-500",
  cybersecurity: "from-red-500 to-rose-600",
  digitalmarketing: "from-amber-500 to-orange-500",
};

function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applyDomain, setApplyDomain] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const { data: courses } = useQuery({
    queryKey: ["home-courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, slug, name, short_description, icon, domain, total_topics, total_tasks, quiz_marks, duration_weeks, difficulty")
        .eq("is_published", true)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

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
      <section className="relative overflow-hidden pb-16 pt-16 md:pb-28 md:pt-20">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#FFFFFF_0%,#F8F7FF_40%,#EEF2FF_100%)]" />
        <div className="absolute inset-0 -z-10 hero-grid" />
        <div className="absolute -top-48 left-1/2 -z-10 size-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-transparent blur-[150px]" />
        <div className="absolute -bottom-64 left-1/4 -z-10 size-[600px] rounded-full bg-gradient-to-tr from-purple-400/15 via-blue-400/10 to-transparent blur-[130px]" />
        <div className="absolute right-0 top-1/3 -z-10 size-[500px] rounded-full bg-gradient-to-bl from-fuchsia-400/10 via-transparent to-transparent blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div className="animate-fade-in-up text-center md:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-white/70 px-4 py-1.5 text-xs text-purple-700 shadow-sm backdrop-blur">
                <ShieldCheck className="size-3.5" /> MSME Registered · Skyrovix IT Solutions
              </div>

              <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                Learn by building.<br />
                <span className="brand-text">Get certified.</span>
              </h1>

              <div className="mt-4 h-8">
                <p className="text-lg text-muted-foreground">
                  Build in{" "}
                  <TypingText texts={["Full Stack Development", "Data Science", "Cyber Security", "UI/UX Design"]} />
                </p>
              </div>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                Task-based virtual internships — apply in minutes, get an instant offer letter and
                ID card, complete real-world projects, and earn a QR-verified certificate.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/auth">
                  <Button size="lg" className="brand-gradient text-white border-0 px-8 py-6 text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                    Start your internship <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
                <Link to="/domains">
                  <Button size="lg" variant="outline" className="rounded-xl border-2 border-border px-8 py-6 text-base font-semibold shadow-sm transition hover:border-primary/40 hover:bg-accent/30 hover:shadow-md">
                    Browse domains
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-8 md:justify-start">
                <div>
                  <div className="text-3xl font-bold">10</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Domains</div>
                </div>
                <div className="h-10 w-px bg-border" />
                <div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Projects</div>
                </div>
                <div className="h-10 w-px bg-border" />
                <div>
                  <div className="text-3xl font-bold">100%</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Online</div>
                </div>
              </div>
            </div>

            <div className="hidden animate-fade-in-up md:block" style={{ animationDelay: "0.2s" }}>
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="section-bg border-y border-border/40 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3 px-3 py-1">How it works</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">Your journey to certification</h2>
            <p className="mt-3 text-muted-foreground">A simple 5-step journey from application to certification.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <div key={i} className="group relative rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur transition-all card-hover hover:border-primary/40 hover:bg-card/80">
                <div className="absolute -top-3 left-5 grid size-7 place-items-center rounded-full brand-gradient text-xs font-bold text-white shadow-md">{i + 1}</div>
                <s.icon className="mt-3 size-6 text-primary" />
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOMAINS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3 px-3 py-1">Domains</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">Choose your internship domain</h2>
            <p className="mt-3 text-muted-foreground">10 industry-aligned tracks. Each ships with a 5-task curriculum.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DOMAINS.slice(0, 6).map((d) => (
              <button
                key={d.slug}
                onClick={() => setApplyDomain(d.slug)}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 text-left transition-all card-hover hover:border-primary/40 hover:shadow-xl"
              >
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${d.color} opacity-0 transition group-hover:opacity-10`} />
                <div className={`grid size-13 place-items-center rounded-xl bg-gradient-to-br ${d.color} text-lg font-bold text-white shadow-md`}>{d.icon}</div>
                <h3 className="mt-4 font-semibold text-lg">{d.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Apply now <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/domains">View all domains <ChevronRight className="ml-1 size-4" /></Link>
            </Button>
          </div>
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

      {/* COURSES */}
      <section className="section-bg border-y border-border/40 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3 px-3 py-1">Learning Paths</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">Explore Courses</h2>
            <p className="mt-3 text-muted-foreground">Topic-based learning paths with hands-on tasks and a final quiz.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses?.slice(0, 6).map((c) => {
              const Icon = COURSE_ICONS[c.icon] ?? BookOpen;
              return (
                <Card key={c.id} className="group overflow-hidden transition-all card-hover hover:shadow-xl">
                  <CardContent className="flex flex-col gap-4 pt-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid size-13 shrink-0 place-items-center rounded-2xl brand-gradient text-white shadow-lg shadow-primary/20">
                        <Icon className="size-6" />
                      </div>
                      <Badge variant="outline" className="shrink-0 text-xs">{c.difficulty}</Badge>
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-xl font-bold leading-tight">{c.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{c.short_description}</p>
                    </div>
                    <dl className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-secondary/30 p-3.5 text-xs">
                      <div className="flex flex-col"><dt className="text-muted-foreground">Topics</dt><dd className="font-bold">{c.total_topics}</dd></div>
                      <div className="flex flex-col"><dt className="text-muted-foreground">Tasks</dt><dd className="font-bold">{c.total_tasks}</dd></div>
                      <div className="flex flex-col"><dt className="text-muted-foreground">Quiz</dt><dd className="font-bold">{c.quiz_marks} Marks</dd></div>
                      <div className="flex flex-col"><dt className="text-muted-foreground">Duration</dt><dd className="font-bold">{c.duration_weeks} Weeks</dd></div>
                    </dl>
                    <Button asChild className="brand-gradient text-white border-0">
                      <Link to="/courses/$slug" params={{ slug: c.slug }}>Learn More <ArrowRight className="ml-1 size-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/courses">View all courses <ChevronRight className="ml-1 size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3 px-3 py-1">FAQ</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-3 text-muted-foreground">Everything you need to know about the Skyrovix internship program.</p>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border/60 bg-card/40 px-6 transition hover:border-border">
                <AccordionTrigger className="py-4 text-left font-medium hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/40 brand-gradient p-12 text-center text-white shadow-2xl shadow-primary/20 md:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 size-48 rounded-full bg-white/5 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl font-bold md:text-4xl">Ready to build something real?</h2>
              <p className="mt-3 text-white/80 max-w-lg mx-auto">Get your offer letter in seconds. No application fee — pay only ₹100 at certification.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="bg-white text-purple-900 hover:bg-white/90 border-0 shadow-lg font-semibold">
                  <Link to="/auth">Apply now <ArrowRight className="ml-1 size-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white">
                  <Link to="/courses">Explore courses</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const FAQ_ITEMS = [
  { q: "What is the Skyrovix internship program?", a: "It is a task-based virtual internship where you complete 5 real-world projects in your chosen domain. You get an instant offer letter, digital ID card, mentor reviews, and a verified certificate with QR code upon completion." },
  { q: "Is there any application fee?", a: "No. Applying and receiving the offer letter and ID card is completely free. A ₹100 certification fee is payable only after completing all 5 tasks, just before the certificate is issued." },
  { q: "How long does the internship take?", a: "The internship is self-paced. Most students complete it in 2–4 weeks, but you can finish faster or take more time depending on your schedule." },
  { q: "What domains are available?", a: "We offer 10 domains: Full Stack Development, Frontend, Backend, Data Science, AI & ML, UI/UX Design, Python, Java, Cyber Security, and Digital Marketing." },
  { q: "Will I get an offer letter and ID card?", a: "Yes. Immediately after applying, you receive an instant offer letter and a digital ID card with your name, domain, intern ID, and a QR code." },
  { q: "Is the certificate verifiable?", a: "Yes. Every certificate has a unique ID and QR code. Employers can verify its authenticity on our Verify Certificate page." },
  { q: "Who reviews my task submissions?", a: "Each task is reviewed by our mentor team. You'll receive feedback and can resubmit if needed. A task is marked approved once it meets the required standards." },
  { q: "Do I get a certificate if I don't complete all tasks?", a: "The certificate is issued only after you complete and get approval on all 5 tasks and pay the ₹100 certification fee." },
];

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
    <span className="font-semibold brand-text">
      {display}
      <span className="ml-0.5 animate-pulse">|</span>
    </span>
  );
}
