import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { COMPANY } from "@/lib/constants";
import { ShieldCheck, Target, Users, Award, Sparkles, ArrowRight } from "lucide-react";
import founderPhoto from "@/assets/founder.jpeg";
import cofounderPhoto from "@/assets/co founder.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Skyrovix IT Solutions" },
      { name: "description", content: "Learn about Skyrovix IT Solutions, our mission, founders, and the task-based internship platform." },
      { property: "og:title", content: "About Skyrovix" },
      { property: "og:description", content: "MSME-registered IT solutions company building real-world internship experiences for students." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Target, title: "Real Skills", desc: "Every task mirrors industry work — no toy projects." },
  { icon: ShieldCheck, title: "Verifiable", desc: "Every certificate carries a unique ID and QR for instant verification." },
  { icon: Users, title: "Student-First", desc: "Built for learners, with mentorship-style task reviews." },
  { icon: Award, title: "Recognised", desc: "Issued by an MSME-registered IT company." },
];

const FOUNDER_SKILLS = ["React.js", "TypeScript", "Node.js", "UI/UX", "Firebase", "Tailwind CSS", "Next.js", "Supabase"];
const COFOUNDER_SKILLS = ["Business Strategy", "Operations", "Growth", "Marketing", "Team Building", "Partnerships"];

function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="mx-auto max-w-5xl px-4 pt-16 pb-12 sm:pt-24">
          <p className="text-sm font-medium text-primary">About us</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            We help students <span className="brand-text">build real things</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {COMPANY.name} is an MSME-registered IT services company. We run a task-based
            virtual internship program that helps students gain genuine, portfolio-grade
            experience — not just a certificate.
          </p>
        </section>

        {/* Values Section */}
        <section className="mx-auto max-w-5xl px-4 py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <v.icon className="size-5 text-primary" />
                </div>
                <h3 className="mt-3 font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="mx-auto max-w-5xl px-4 py-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Our Mission</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            The gap between college coursework and the work students actually do on day one
            of a real job is huge. We close that gap with structured, mentor-reviewed
            internship tracks across 10 in-demand technology domains. Apply in minutes, get
            an offer letter and ID card instantly, ship 5 tasks, and walk away with a
            verifiable certificate you can share with recruiters.
          </p>
        </section>

        {/* ─── Leadership Section ─── */}
        <section className="w-full py-16 sm:py-24">
          <div className="text-center mb-16 px-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Sparkles className="size-3.5" />
              Leadership
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              The minds behind <span className="brand-text">Skyrovix</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Driven by a shared passion for bridging the gap between education and industry.
            </p>
          </div>

          {/* ─── FOUNDER — Full-Width Light Hero ─── */}
          <div className="relative mb-10 overflow-hidden border-y border-border/40">
            {/* Light gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#07284a]/5 via-blue-50/60 to-transparent" />
            <div className="absolute -top-32 -right-32 size-80 rounded-full bg-[#07284a]/10 blur-3xl animate-pulse" />
            <div className="absolute -bottom-24 -left-24 size-64 rounded-full bg-blue-200/25 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
            <div className="absolute top-1/2 left-1/3 size-48 rounded-full bg-[#07284a]/8 blur-3xl animate-pulse" style={{ animationDelay: "3s" }} />

            <div className="relative mx-auto grid gap-0 lg:grid-cols-5">
              {/* Photo Column */}
              <div className="relative lg:col-span-2 flex items-end justify-center lg:justify-end">
                <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-none">
                  {/* Glow behind photo */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-3/4 w-4/5 rounded-full bg-[#07284a]/10 blur-3xl" />
                  <img
                    src={founderPhoto}
                    alt={COMPANY.founder.name}
                    className="relative z-10 mx-auto h-[340px] sm:h-[400px] lg:h-[460px] w-auto object-cover object-top"
                    style={{ maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)" }}
                  />
                  {/* Floating badge */}
                  <div className="absolute bottom-12 left-4 z-20 flex items-center gap-3 rounded-2xl border border-[#07284a]/20 bg-white/70 p-3 pr-5 backdrop-blur-xl shadow-xl">
                    <div className="flex size-10 items-center justify-center rounded-xl brand-gradient text-white text-sm font-bold">
                      CEO
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{COMPANY.founder.name}</p>
                      <p className="text-xs text-muted-foreground">B.Tech IT · Mount Zion College</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className="relative lg:col-span-3 flex flex-col justify-center p-8 sm:p-10 lg:p-14">
                <p className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#07284a]/30 bg-[#07284a]/10 px-3 py-1 text-xs font-semibold tracking-widest text-[#07284a] uppercase">
                  Founder &amp; CEO
                </p>
                <h3 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {COMPANY.founder.name}
                </h3>

                <div className="mt-5 flex items-start gap-3">
                  <div className="mt-1 h-12 w-0.5 rounded-full bg-gradient-to-b from-[#07284a] to-transparent shrink-0" />
                  <p className="text-base text-muted-foreground italic leading-relaxed sm:text-lg">
                    "Bridging high-speed code with cinematic design — from the 3rd Year of B.Tech IT at Mount Zion College of Engineering and Technology."
                  </p>
                </div>

                <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xl">
                  A passionate entrepreneur, web developer, and technology enthusiast. As the Founder &amp; CEO of Skyrovix, he leads initiatives focused on website development, digital solutions, e-commerce services, professional training programs, and internship opportunities.
                </p>

                {/* Skills */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {FOUNDER_SKILLS.map((skill) => (
                    <span key={skill} className="rounded-lg border border-[#07284a]/20 bg-white/60 px-3 py-1.5 text-xs font-medium text-[#07284a] backdrop-blur-sm transition-all hover:bg-[#07284a]/10 hover:border-[#07284a]/30 hover:shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ─── CO-FOUNDER — Full-Width Light Card ─── */}
          <div className="relative overflow-hidden border-y border-border/40">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/60 to-cyan-50/40" />
            <div className="absolute -top-20 -right-20 size-60 rounded-full bg-emerald-200/30 blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -left-20 size-48 rounded-full bg-teal-200/25 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

            <div className="relative mx-auto grid gap-0 lg:grid-cols-5">
              {/* Content Column — comes first on large screens */}
              <div className="relative lg:col-span-3 flex flex-col justify-center p-8 sm:p-10 lg:p-14 order-2 lg:order-1">
                <p className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-300/40 bg-emerald-100/60 px-3 py-1 text-xs font-semibold tracking-widest text-emerald-700 uppercase">
                  Co-Founder
                </p>
                <h3 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {COMPANY.cofounder.name}
                </h3>

                <div className="mt-5 flex items-start gap-3">
                  <div className="mt-1 h-12 w-0.5 rounded-full bg-gradient-to-b from-emerald-500 to-transparent shrink-0" />
                  <p className="text-base text-muted-foreground italic leading-relaxed sm:text-lg">
                    "Building the operational backbone of Skyrovix — ensuring every student gets a seamless, world-class experience."
                  </p>
                </div>

                <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xl">
                  As Co-Founder, he drives the strategic vision and operational excellence behind Skyrovix. From team management to partnerships, he ensures every initiative runs with precision and purpose.
                </p>

                {/* Skills */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {COFOUNDER_SKILLS.map((skill) => (
                    <span key={skill} className="rounded-lg border border-emerald-200/60 bg-white/60 px-3 py-1.5 text-xs font-medium text-emerald-700 backdrop-blur-sm transition-all hover:bg-emerald-100 hover:border-emerald-300 hover:shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Photo Column */}
              <div className="relative lg:col-span-2 flex items-end justify-center lg:justify-start order-1 lg:order-2">
                <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-none">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-3/4 w-4/5 rounded-full bg-emerald-300/20 blur-3xl" />
                  <img
                    src={cofounderPhoto}
                    alt={COMPANY.cofounder.name}
                    className="relative z-10 mx-auto h-[340px] sm:h-[400px] lg:h-[460px] w-auto object-cover object-top"
                    style={{ maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)" }}
                  />
                  {/* Floating badge */}
                  <div className="absolute bottom-12 right-4 z-20 flex items-center gap-3 rounded-2xl border border-emerald-200/60 bg-white/70 p-3 pr-5 backdrop-blur-xl shadow-xl">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-bold">
                      COF
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{COMPANY.cofounder.name}</p>
                      <p className="text-xs text-muted-foreground">Co-Founder · Skyrovix</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA after leadership */}
          <div className="mt-16 text-center px-4">
            <p className="text-muted-foreground mb-6">Want to be part of the Skyrovix journey?</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="/domains" className="group inline-flex items-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg glow transition-transform hover:scale-105 active:scale-95">
                Browse Internships
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent">
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
