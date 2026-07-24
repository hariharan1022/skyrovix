import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DOMAINS, COMPANY, DURATIONS, durationConfig, generateInternId } from "@/lib/constants";
import { ApplicationFormDialog } from "@/components/ApplicationFormDialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useRecentReviews, computeStats } from "@/lib/reviews";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { AuroraBackground } from "@/components/AuroraBackground";
import { FadeUp, Reveal, ScaleIn, FadeIn } from "@/components/motion";
import {
  BookOpen, Layers, Monitor, Server, BarChart3, Brain, Palette,
  Code2, Shield, TrendingUp, ArrowRight, Award, FileCheck, Rocket,
  ShieldCheck, GraduationCap, IndianRupee, HelpCircle, Trophy,
  Sparkles, ChevronRight, CheckCircle2, Quote, Star,
  ArrowUpRight, Globe, Zap, Users, Target, HeartHandshake,
  Clock, MessageSquare, Briefcase, Laptop, Building2,
  Loader2, Play, FileText, Cloud, LayoutGrid,
} from "lucide-react";
import { MobileFloatingIcons } from "@/components/MobileFloatingIcons";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQ_DATA } from "@/lib/seo";
import founderPhoto from "@/assets/founder.jpeg";
import cofounderPhoto from "@/assets/co founder.jpeg";
import heroTeamImage from "@/assets/hero section team img.png";
import gcetjLogo from "../../assets/college-logo/thanjavur.png";
import srustiLogo from "../../assets/college-logo/SRUSTI-removebg-preview.png";
import snistLogo from "../../assets/college-logo/Sreenidhi.png";
import mzcetLogo from "../../assets/college-logo/mzcet-logo__1_-removebg-preview.png";
import annaLogo from "../../assets/college-logo/anna.png";
import srrcLogo from "../../assets/college-logo/sri raja.png";

const COURSE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Layers, Monitor, Server, BarChart3, Brain, Palette, Code2, Shield, TrendingUp,
};

export const Route = createFileRoute("/_navbar-layout/")({
  head: () => ({
    meta: [
      { title: "Skyrovix | Virtual Internship with Certificate & Real Projects" },
      { name: "description", content: "Skyrovix is a virtual internship platform offering hands-on projects, offer letters, certificates, and mentor support in Full Stack, AI, Python, Data Science, Cyber Security, Cloud, UI/UX, and more." },
      { name: "keywords", content: "Skyrovix Internship, Skyrovix Virtual Internship, Skyrovix IT Solutions Internship, online internship India, virtual internship with certificate, remote internship for students, project based internship, full stack development internship, Python internship, Java internship, AI internship, machine learning internship, data science internship, cyber security internship, cloud computing internship, React internship, MERN stack internship, UI UX internship, graphic design internship, internship with offer letter, internship with certificate, internship with real projects, internship for college students, engineering internship, computer science internship, free internship, work from home internship, summer internship 2026, internship program India, best virtual internship for engineering students, online internship with certificate and offer letter, internship with QR verified certificate, internship for CSE students, internship for IT students, web development internship India" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Skyrovix" },
      { property: "og:title", content: "Skyrovix: Virtual Internship with Certificate & Real Projects | Skyrovix" },
      { property: "og:description", content: "Skyrovix is a virtual internship platform with hands-on projects, offer letters, and certificates in Full Stack, AI, Python, Data Science, Cyber Security, Cloud, UI/UX & more." },
      { property: "og:url", content: "https://skyrovix.online/" },
      { property: "og:image", content: "https://skyrovix.online/og-default.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Skyrovix Virtual Internship with Certificate & Real Projects" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@skyrovix" },
      { name: "twitter:title", content: "Skyrovix: Virtual Internship with Certificate & Real Projects | Skyrovix" },
      { name: "twitter:description", content: "Skyrovix virtual internship platform — hands-on projects, offer letters, and certificates in Full Stack, AI, Python, Data Science, Cyber Security & more." },
      { name: "twitter:image", content: "https://skyrovix.online/og-default.png" },
      { name: "twitter:image:alt", content: "Skyrovix Virtual Internship with Certificate & Real Projects" },
      { rel: "canonical", href: "https://skyrovix.online/" },
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



  return (
    <div className="min-h-screen">
      <FAQJsonLd faqs={FAQ_DATA} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "https://skyrovix.online/" }]} />
      {/* ─── HERO ─── */}
      <AuroraBackground>
        <section className="relative min-h-[92vh] pt-16 pb-20 flex items-center justify-center overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

              {/* Left Column: Hero Text Content */}
              <FadeUp y={20} duration={0.8} delay={0.1} className="lg:col-span-7 flex flex-col items-start text-left">

                {/* Internship Platform Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-950/20 px-4 py-2 text-xs font-bold text-blue-700 dark:text-blue-300 shadow-sm backdrop-blur-md">
                  <span>🎓 INDIA'S MOST PRACTICAL VIRTUAL INTERNSHIP PLATFORM</span>
                </div>

                {/* Primary Heading */}
                <h1 className="font-display text-4xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1] text-left">
                  Build Skills.<br />
                  Gain Experience.<br />
                  <span className="text-blue-600 dark:text-blue-400">Get Certified.</span>
                </h1>

                {/* Sub-headline description */}
                <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed text-left">
                  Skyrovix Internship Program helps students and professionals work on real-world projects, gain practical skills, and receive industry-recognized certificates.
                </p>

                {/* Checkbox checklist items */}
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 max-w-lg w-full">
                  {[
                    { label: "Real-world Projects", icon: Code2, color: "text-blue-600" },
                    { label: "Mentor Guidance", icon: Users, color: "text-blue-600" },
                    { label: "Certificate & LOR", icon: FileText, color: "text-blue-600" },
                    { label: "100% Remote", icon: Globe, color: "text-blue-600" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="size-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Buttons Row */}
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                  <Link to="/auth" search={{ redirect: undefined }} className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white border-0 px-8 py-6 text-base font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                      Explore Internships <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </Link>
                  <a href="#how-it-works" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-xl border-2 border-border px-8 py-6 text-base font-semibold shadow-sm hover:border-blue-600/30 hover:bg-blue-50/5 dark:hover:bg-blue-950/10 active:scale-95 transition-all flex items-center justify-center gap-2 bg-white dark:bg-slate-900">
                      <div className="size-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600"><Play className="size-3 fill-current ml-0.5" /></div>
                      How It Works
                    </Button>
                  </a>
                </div>

                {/* Coupon banner */}
                <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-orange-500/20 max-w-xl w-full flex items-center justify-between gap-4 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-600"><Sparkles className="size-5" /></div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-orange-700 dark:text-orange-400">FIRST100 COUPON</p>
                      <p className="text-xs text-muted-foreground">First 100 students get internship for FREE!</p>
                    </div>
                  </div>
                  <button onClick={() => setApplyDomain(DOMAINS[0]?.slug)} className="whitespace-nowrap px-4 py-2 rounded-xl bg-[#07284a] text-white text-xs font-bold shadow-md hover:bg-[#07284a]/90 transition-all">
                    Use Code: FIRST100
                  </button>
                </div>

              </FadeUp>

              {/* Right Column: Dynamic Graphic & Stats overlay */}
              <ScaleIn delay={0.2} className="lg:col-span-5 flex flex-col items-center relative w-full lg:mt-0 mt-16">

                {/* SVG Curve Background & Doodles */}
                <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-visible">
                  <svg viewBox="0 0 500 400" className="absolute inset-0 w-full h-full text-blue-400/40 dark:text-blue-500/25" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="archGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" className="stop-color-light-start dark:stop-color-dark-start" stopOpacity="0.9" />
                        <stop offset="100%" className="stop-color-light-end dark:stop-color-dark-end" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    <style>{`
                      .stop-color-light-start { stop-color: #bfdbfe; }
                      .stop-color-light-end { stop-color: #eff6ff; }
                      .dark .stop-color-dark-start { stop-color: #1e3a8a; }
                      .dark .stop-color-dark-end { stop-color: #020617; }
                    `}</style>
                    {/* Clean curve filled arch (Taller & broader curve) */}
                    <path d="M-220,480 C10,-120 490,-120 720,480 Z" fill="url(#archGradient)" />
                    {/* Dashed outer line */}
                    <path d="M-220,470 C10,-140 490,-140 720,470" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6,6" className="opacity-40" />
                  </svg>

                  {/* Paper Plane SVG */}
                  <svg viewBox="0 0 24 24" className="absolute top-[5%] left-[3%] size-8 text-blue-500/60 dark:text-blue-400/40 -rotate-12 animate-float">
                    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                  {/* Left Arrow Doodle */}
                  <svg viewBox="0 0 100 100" className="absolute top-[48%] left-[-45px] size-14 text-blue-400/50 dark:text-blue-500/35 -rotate-45">
                    <path d="M10,80 Q50,40 90,80" fill="none" stroke="currentColor" strokeWidth="1.8" strokeDasharray="4,4" />
                    <path d="M80,65 L90,80 L75,80" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>

                  {/* Right Loop Doodle */}
                  <svg viewBox="0 0 100 100" className="absolute top-[35%] right-[-35px] size-14 text-blue-400/50 dark:text-blue-500/35 rotate-12">
                    <path d="M10,20 C40,40 65,10 85,55" fill="none" stroke="currentColor" strokeWidth="1.8" strokeDasharray="4,4" />
                    <path d="M72,42 L85,55 L90,40" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </div>

                {/* Student team image - rendered directly as transparent PNG (Scaled up for larger presence) */}
                <img
                  src={heroTeamImage}
                  alt="Skyrovix Interns"
                  className="relative z-10 w-[105%] max-w-[550px] lg:scale-110 lg:translate-y-4 h-auto object-contain select-none pointer-events-none"
                />

                {/* Floating Badge Cards */}
                {/* Real-world Projects */}
                <div className="absolute top-[28%] -left-12 sm:-left-20 lg:-left-28 bg-white dark:bg-[#0f172a] border border-border/70 rounded-2xl p-3 shadow-xl backdrop-blur-md flex items-center gap-3 z-20 hover:scale-105 transition-transform duration-300">
                  <div className="size-9 rounded-xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 font-bold"><Code2 className="size-4.5" /></div>
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Real-world Projects</span>
                </div>

                {/* Industry Recognized Certificate */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0f172a] border border-border/70 rounded-2xl p-3 shadow-xl backdrop-blur-md flex items-center gap-3 z-20 hover:scale-105 transition-transform duration-300 whitespace-nowrap">
                  <div className="size-9 rounded-xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 font-bold"><GraduationCap className="size-4.5" /></div>
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200 font-sans">Industry Recognized Certificate</span>
                </div>

                {/* Internship Completion Letter */}
                <div className="absolute top-[22%] -right-12 sm:-right-20 lg:-right-28 bg-white dark:bg-[#0f172a] border border-border/70 rounded-2xl p-3 shadow-xl backdrop-blur-md flex items-center gap-3 z-20 hover:scale-105 transition-transform duration-300">
                  <div className="size-9 rounded-xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 font-bold"><FileText className="size-4.5" /></div>
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Internship Offer Letter</span>
                </div>

                {/* Mentor Support */}
                <div className="absolute bottom-[28%] -right-12 sm:-right-20 lg:-right-28 bg-white dark:bg-[#0f172a] border border-border/70 rounded-2xl p-3 shadow-xl backdrop-blur-md flex items-center gap-3 z-20 hover:scale-105 transition-transform duration-300">
                  <div className="size-9 rounded-xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 font-bold"><Users className="size-4.5" /></div>
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200">task-based internship</span>
                </div>

                {/* Overlaid Statistics Card (overlapping the bottom of the card) */}
                <div className="relative z-20 w-full -mt-6 bg-white dark:bg-[#0f172a] rounded-[28px] border border-border/70 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] grid grid-cols-4 gap-2 max-w-2xl">

                  {/* Students Enrolled */}
                  <div className="text-center border-r border-slate-100 dark:border-slate-800/80 last:border-none px-1 sm:px-2 flex flex-col items-center justify-center">
                    <div className="size-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 mb-2.5">
                      <Users className="size-5" />
                    </div>
                    <div className="text-base sm:text-xl md:text-2xl font-extrabold text-[#07284a] dark:text-slate-100 leading-tight tracking-tight">10,000+</div>
                    <div className="mt-1 text-[9px] sm:text-[11px] text-muted-foreground font-bold leading-tight">Students Enrolled</div>
                  </div>

                  {/* Internship Domains */}
                  <div className="text-center border-r border-slate-100 dark:border-slate-800/80 last:border-none px-1 sm:px-2 flex flex-col items-center justify-center">
                    <div className="size-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 mb-2.5">
                      <Briefcase className="size-5" />
                    </div>
                    <div className="text-base sm:text-xl md:text-2xl font-extrabold text-[#07284a] dark:text-slate-100 leading-tight tracking-tight">10+</div>
                    <div className="mt-1 text-[9px] sm:text-[11px] text-muted-foreground font-bold leading-tight">Internship Domains</div>
                  </div>

                  {/* Projects Available */}
                  <div className="text-center border-r border-slate-100 dark:border-slate-800/80 last:border-none px-1 sm:px-2 flex flex-col items-center justify-center">
                    <div className="size-10 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 mb-2.5">
                      <Code2 className="size-5" />
                    </div>
                    <div className="text-base sm:text-xl md:text-2xl font-extrabold text-[#07284a] dark:text-slate-100 leading-tight tracking-tight">360+</div>
                    <div className="mt-1 text-[9px] sm:text-[11px] text-muted-foreground font-bold leading-tight">Projects Available</div>
                  </div>

                  {/* Average Rating */}
                  <div className="text-center last:border-none px-1 sm:px-2 flex flex-col items-center justify-center">
                    <div className="size-10 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-500 mb-2.5">
                      <Star className="size-5 fill-amber-500" />
                    </div>
                    <div className="text-base sm:text-xl md:text-2xl font-extrabold text-[#07284a] dark:text-slate-100 leading-tight tracking-tight">4.9/5</div>
                    <div className="mt-1 text-[9px] sm:text-[11px] text-muted-foreground font-bold leading-tight">Average Rating</div>
                  </div>

                </div>

              </ScaleIn>
            </div>
          </div>
        </section>
      </AuroraBackground>

      {/* ─── TRUSTED BY COLLEGES ─── */}
      <Reveal delay={0.1}>
        <section className="border-b border-border/30 bg-white/50 dark:bg-slate-950/10 py-8 sm:py-10 relative z-10">
          <div className="mx-auto max-w-7xl px-4 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Title */}
            <div className="text-center lg:text-left shrink-0 max-w-[260px]">
              <p className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 leading-tight">
                Trusted by students from leading colleges across India
              </p>
            </div>

            {/* Right Logos Container */}
            <div className="flex flex-col gap-6 w-full lg:max-w-4xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                {[
                  {
                    name: "Anna University",
                    shortName: "Anna University",
                    location: "Chennai",
                    image: annaLogo,
                  },
                  {
                    name: "Government College, Thanjavur",
                    shortName: "Government College of Engineering",
                    location: "Thanjavur",
                    image: gcetjLogo,
                  },
                  {
                    name: "Sreenidhi Institute, Telangana",
                    shortName: "Sreenidhi Institute of Science & Technology",
                    location: "Telangana",
                    image: snistLogo,
                  },
                  {
                    name: "Sri Raaja Raajan College, Tamil Nadu",
                    shortName: "Sri Raaja Raajan College of Engineering & Technology",
                    location: "Tamil Nadu",
                    image: srrcLogo,
                  },
                  {
                    name: "Mount Zion College, Pudukkottai",
                    shortName: "Mount Zion College of Engineering & Technology",
                    location: "Pudukkottai",
                    image: mzcetLogo,
                  },
                  {
                    name: "Srusti Academy, Odisha",
                    shortName: "Srusti Academy of Management and Technology",
                    location: "Odisha",
                    image: srustiLogo,
                  }
                ].map((uni) => (
                  <div key={uni.name} className="flex items-start gap-3 transition-all duration-350 hover:scale-[1.02] cursor-default opacity-95 hover:opacity-100">
                    {uni.image ? (
                      <img src={uni.image} alt={uni.name} className="h-10 w-10 object-contain shrink-0 mt-0.5 dark:brightness-110" />
                    ) : (
                      <div className="size-10 rounded-lg flex items-center justify-center border shadow-sm shrink-0">
                        {/* Fallback */}
                      </div>
                    )}
                    <div className="flex flex-col text-left justify-start">
                      <span className="text-xs sm:text-[13px] font-extrabold tracking-tight text-slate-800 dark:text-slate-200 leading-tight max-w-[180px] sm:max-w-[220px] block">
                        {uni.shortName}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 block">
                        {uni.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center lg:justify-end text-xs sm:text-[13px] font-extrabold text-blue-600 dark:text-blue-400 mt-2">
                <span className="whitespace-nowrap">
                  ... and more than colleges across India
                </span>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ─── COMPACT ABOUT ─── */}
      <section className="py-20 sm:py-24 overflow-hidden relative z-10">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="relative rounded-3xl border border-border/60 bg-gradient-to-br from-blue-500/5 via-white/50 to-transparent dark:from-blue-950/10 dark:via-[#0f172a]/30 p-8 sm:p-12 backdrop-blur-md shadow-lg">
              <div className="absolute -top-20 -right-20 size-60 rounded-full bg-blue-500/5 blur-3xl" />
              <div className="relative grid items-center gap-8 sm:grid-cols-2">
                <div>
                  <p className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-bold tracking-widest text-[#07284a] dark:text-blue-400 uppercase mb-5">About Skyrovix</p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">
                    MSME-registered. <span className="brand-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Student-built.</span>
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                    Skyrovix runs a task-based virtual internship program across 10+ domains. Apply free, get
                    an instant offer letter and ID card, complete 120+ real projects, earn a QR-verified
                    certificate.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "10+", label: "Domains", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50/50 dark:bg-violet-950/20" },
                    { value: "120+", label: "Projects", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50/50 dark:bg-emerald-950/20" },
                    { value: "100%", label: "Online", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50/50 dark:bg-blue-950/20" },
                    { value: "₹100", label: "Cert fee", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50/50 dark:bg-amber-950/20" },
                  ].map((s) => (
                    <div key={s.label} className="group rounded-2xl border border-slate-200/50 dark:border-slate-800/60 bg-white/70 dark:bg-[#0f172a]/70 p-4 text-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                      <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                      <div className="text-[11px] text-muted-foreground font-bold mt-1 uppercase tracking-wider">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="border-y border-border/40 bg-[#f8fafc]/50 dark:bg-[#020617]/40 py-20 sm:py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-xs font-semibold rounded-full border border-border/60 uppercase tracking-widest text-[#07284a] dark:text-blue-400 bg-blue-500/5">How it works</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white">Your journey to certification</h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground font-medium">A simple 5-step journey from application to certification.</p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.08}>
                <div className="group relative rounded-2xl border border-border/50 bg-white/70 dark:bg-[#0f172a]/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)] hover:border-blue-500/25 hover:bg-white dark:hover:bg-[#0f172a]">
                  <div className="absolute -top-3 left-6 grid size-7 place-items-center rounded-full bg-[#07284a] dark:bg-blue-600 text-xs font-extrabold text-white shadow-md ring-4 ring-blue-500/10 transition-transform duration-300 group-hover:scale-110">{i + 1}</div>
                  <div className="size-11 rounded-2xl bg-blue-50/70 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 mb-4 mt-1">
                    <s.icon className="size-5 transition-transform duration-500 group-hover:rotate-12" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-[15px]">{s.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-normal font-medium">{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY SKYROVIX ─── */}
      <section className="py-20 sm:py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-xs font-semibold rounded-full border border-border/60 uppercase tracking-widest text-[#07284a] dark:text-blue-400 bg-blue-500/5">Why Skyrovix</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white">Built differently</h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground font-medium">Everything you need to launch your career — in one platform.</p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Briefcase, title: "Real Projects", desc: "Build portfolio-grade work, not toy assignments. Every task ships production-quality code.", bg: "bg-violet-50/80 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400" },
              { icon: MessageSquare, title: "Mentor Reviews", desc: "Get detailed feedback on every submission. Revise, improve, and ship better work.", bg: "bg-emerald-50/80 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400" },
              { icon: Clock, title: "Self-Paced", desc: "Learn on your schedule. Finish in 2 weeks or take 2 months — it's up to you.", bg: "bg-amber-50/80 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400" },
              { icon: Award, title: "Verified Certificate", desc: "Every certificate has a unique ID and QR code. Share it with recruiters instantly.", bg: "bg-purple-50/80 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400" },
              { icon: ShieldCheck, title: "MSME Registered", desc: "Issued by a registered IT company. Adds real weight to your resume and LinkedIn.", bg: "bg-red-50/80 dark:bg-red-950/20 text-red-600 dark:text-red-400" },
              { icon: IndianRupee, title: "No Hidden Fees", desc: "Apply and start for free. Pay only ₹100 at certification — no strings attached.", bg: "bg-blue-50/80 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400" },
            ].map((b, i) => (
              <FadeUp key={b.title} delay={0.1 + i * 0.08}>
                <div className="group rounded-2xl border border-border/50 bg-white/70 dark:bg-[#0f172a]/70 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)] hover:border-blue-500/25 hover:bg-white dark:hover:bg-[#0f172a]">
                  <div className={`grid size-11 place-items-center rounded-2xl ${b.bg} transition-all duration-300 group-hover:scale-110 shadow-sm`}>
                    <b.icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-[15px]">{b.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-normal font-medium">{b.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DOMAINS ─── */}
      <section className="border-y border-border/40 bg-[#f8fafc]/50 dark:bg-[#020617]/40 py-20 sm:py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-xs font-semibold rounded-full border border-border/60 uppercase tracking-widest text-[#07284a] dark:text-blue-400 bg-blue-500/5">Domains</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white flex items-center justify-center gap-4">
                <span className="text-blue-500/30 text-2xl font-light">\\</span>
                Explore Internship Domains
                <span className="text-blue-500/30 text-2xl font-light">//</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground font-medium">Select a track to launch your professional task-based curriculum.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { slug: "fullstack", name: "Full Stack Development", count: "12 Projects", icon: Code2, bg: "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400" },
              { slug: "datascience", name: "Data Science & Analytics", count: "12 Projects", icon: BarChart3, bg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400" },
              { slug: "aiml", name: "Artificial Intelligence", count: "12 Projects", icon: Brain, bg: "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400" },
              { slug: "mernstack", name: "Cloud Computing", count: "12 Projects", icon: Cloud, bg: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400" },
              { slug: "cybersecurity", name: "Cyber Security", count: "12 Projects", icon: Shield, bg: "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400" },
              { slug: "uiux", name: "UI/UX Design", count: "12 Projects", icon: Palette, bg: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400" },
              { slug: "all", name: "View All Domains", count: "30+ Domains", icon: LayoutGrid, bg: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400", isLink: true },
            ].map((d, i) => {
              const CardIcon = d.icon;
              const cardContent = (
                <div className="flex flex-col items-center text-center p-5 h-full">
                  <div className={`size-12 rounded-2xl flex items-center justify-center shadow-sm ${d.bg} transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md`}>
                    <CardIcon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{d.name}</h3>
                  <p className="mt-2 text-[10px] sm:text-xs text-muted-foreground font-semibold">{d.count}</p>
                </div>
              );

              if (d.isLink) {
                return (
                  <FadeUp key={i} delay={0.05 * i}>
                    <Link
                      to="/domains"
                      search={{ apply: undefined }}
                      className="group block h-full rounded-2xl border border-border/50 bg-white/70 dark:bg-[#0f172a]/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-blue-500/20 hover:bg-white dark:hover:bg-[#0f172a]"
                    >
                      {cardContent}
                    </Link>
                  </FadeUp>
                );
              }

              return (
                <FadeUp key={i} delay={0.05 * i}>
                  <button
                    onClick={() => setApplyDomain(d.slug)}
                    className="group w-full h-full text-left rounded-2xl border border-border/50 bg-white/70 dark:bg-[#0f172a]/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-blue-500/20 hover:bg-white dark:hover:bg-[#0f172a]"
                  >
                    {cardContent}
                  </button>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── STATS BANNER ─── */}
      <section className="border-y border-border/40 bg-[#f8fafc]/50 dark:bg-[#020617]/50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Briefcase, value: "25+", label: "Internship Domains", desc: "Industry-aligned tracks" },
              { icon: Code2, value: "300+", label: "Projects", desc: "Hands-on real-world projects" },
              { icon: Award, value: "1500+", label: "Verified Certificates", desc: "QR-code shareable credentials" },
            ].map((stat, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="group relative rounded-2xl border border-border/50 bg-white/60 dark:bg-[#0f172a]/60 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-500/20 hover:bg-white dark:hover:bg-[#0f172a]">
                  <div className="mx-auto grid size-12 place-items-center rounded-xl bg-[#07284a]/10 dark:bg-[#07284a]/20 text-[#07284a] dark:text-[#60a5fa] transition-all duration-300 group-hover:bg-[#07284a] group-hover:text-white group-hover:scale-110 mb-4">
                    <stat.icon className="size-5" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold brand-text transition-transform duration-300 group-hover:scale-105">{stat.value}</div>
                  <div className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{stat.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{stat.desc}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-xs font-medium rounded-full border border-border/60">Testimonials</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">What students say</h2>
              <p className="mt-3 text-muted-foreground">Hear from interns who've been through the program.</p>
            </div>
          </Reveal>
          <ReviewsGrid />
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="border-y border-border/40 bg-[#f8fafc]/50 dark:bg-[#020617]/50 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-xs font-medium rounded-full border border-border/60">FAQ</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
              <p className="mt-3 text-muted-foreground">Everything you need to know about the Skyrovix internship program.</p>
            </div>
          </Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <AccordionItem value={`faq-${i}`} className="rounded-2xl border border-border/50 bg-white/60 dark:bg-[#0f172a]/60 px-5 sm:px-6 transition-all hover:border-border">
                  <AccordionTrigger className="py-4 text-left text-sm sm:text-base font-medium hover:no-underline">{item.q}</AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-[#07284a]/20 bg-gradient-to-br from-[#07284a] via-[#0d3b66] to-[#1d4ed8] p-8 sm:p-12 md:p-16 text-center text-white shadow-2xl shadow-[#07284a]/25">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
              <div className="absolute -right-20 -top-20 size-80 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 size-60 rounded-full bg-white/5 blur-3xl" />
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Ready to build something real?</h2>
                <p className="mt-3 text-sm sm:text-base text-white/80 max-w-lg mx-auto">Get your offer letter in seconds. No application fee — pay only ₹100 at certification.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button asChild size="lg" className="rounded-xl bg-white text-[#07284a] hover:bg-white/90 border-0 shadow-lg font-semibold h-12 px-8 btn-premium hover:btn-premium-hover active:btn-premium-active">
                    <Link to="/auth" search={{ redirect: undefined }}>Apply now <ArrowRight className="ml-1.5 size-4" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-xl bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:text-white h-12 px-8 btn-premium active:btn-premium-active">
                    <Link to="/domains" search={{ apply: undefined }}>Explore courses</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── APPLY DIALOG ─── */}
      <ApplicationFormDialog
        open={!!applyDomain}
        onOpenChange={(o) => { if (!o) setApplyDomain(null); }}
        defaultDomain={applyDomain ?? undefined}
      />
    </div>
  );
}

const FAQ_ITEMS = [
  { q: "What is the Skyrovix internship program?", a: "It is a task-based virtual internship where you complete 5 real-world projects in your chosen domain. You get an instant offer letter, digital ID card, mentor reviews, and a verified certificate with QR code upon completion." },
  { q: "Is there any application fee?", a: "No. Applying and receiving the offer letter and ID card is completely free. A ₹100 certification fee is payable only after completing all 5 tasks, just before the certificate is issued." },
  { q: "How long does the internship take?", a: "The internship is self-paced. Most students complete it in 2–4 weeks, but you can finish faster or take more time depending on your schedule." },
  { q: "What domains are available?", a: "We offer 25+ domains including Full Stack Development, Frontend, Backend, Data Science, AI & ML, UI/UX Design, Python, Java, Cyber Security, Digital Marketing, and many more." },
  { q: "Will I get an offer letter and ID card?", a: "Yes. Immediately after applying, you receive an instant offer letter and a digital ID card with your name, domain, intern ID, and a QR code." },
  { q: "Is the certificate verifiable?", a: "Yes. Every certificate has a unique ID and QR code. Employers can verify its authenticity on our Verify Certificate page." },
  { q: "Who reviews my task submissions?", a: "Each task is reviewed by our mentor team. You'll receive feedback and can resubmit if needed. A task is marked approved once it meets the required standards." },
  { q: "Do I get a certificate if I don't complete all tasks?", a: "The certificate is issued only after you complete and get approval on all 5 tasks and pay the ₹100 certification fee." },
];

const FEATURED_REVIEWS = [
  { id: "featured-1", rating: 5, content: "The Skyrovix Virtual Internship gave me practical experience through real-world tasks. The structured learning path, quick support, and verified certificate made it an excellent learning experience.", name: "Vishal R", role: "Full Stack Development Intern" },
  { id: "featured-2", rating: 5, content: "I improved my AI and prompt engineering skills significantly during this internship. The tasks were well designed, and the verification process made the certificate more valuable.", name: "Gandhi Rajan", role: "Prompt Engineering Intern" },
  { id: "featured-3", rating: 5, content: "The internship provided hands-on assignments that helped me understand real cybersecurity concepts. I highly recommend Skyrovix to students looking for practical learning.", name: "Rohit", role: "Cyber Security Intern" },
  { id: "featured-4", rating: 5, content: "I enjoyed completing the project-based tasks. The dashboard, offer letter, and certificate verification system were smooth and professional.", name: "Sivaraman", role: "Python Development Intern" },
  { id: "featured-5", rating: 5, content: "The internship helped me strengthen both frontend and backend development skills. The learning experience was organized, and the admin verification process ensured quality.", name: "Manikandan", role: "Full Stack Development Intern" },
  { id: "featured-6", rating: 5, content: "Skyrovix provides an excellent platform for students to gain industry-oriented experience. The practical projects and mentor feedback were extremely helpful.", name: "Sharik", role: "AI & Machine Learning Intern" },
];

function ReviewCard({ name, role, content, rating, index }: { name: string; role: string; content: string; rating: number; index: number }) {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <FadeUp delay={0.1 + index * 0.1}>
      <div className="group rounded-2xl border border-border/50 bg-white/60 dark:bg-[#0f172a]/60 p-6 transition-all card-elevated hover:card-elevated-hover">
        <div className="flex gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, si) => (
            <Star key={si} className={`size-4 ${si < rating ? "text-amber-400" : "text-muted-foreground/20"}`} fill={si < rating ? "currentColor" : "none"} />
          ))}
        </div>
        <Quote className="size-5 text-[#07284a]/20 dark:text-[#60a5fa]/20 mb-2" />
        <p className="text-sm text-muted-foreground leading-relaxed italic">&ldquo;{content}&rdquo;</p>
        <div className="mt-4 pt-4 border-t border-border/40 flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarFallback className="text-[9px] bg-[#07284a]/10 dark:bg-[#1d4ed8]/10 text-[#07284a] dark:text-[#60a5fa]">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-[11px] text-muted-foreground">{role}</p>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

function ReviewsGrid() {
  const { data: reviews = [], isLoading } = useRecentReviews(6);
  const stats = computeStats(reviews);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const totalReviews = stats.total + FEATURED_REVIEWS.length;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-center gap-6 text-center">
        {stats.total > 0 && (
          <>
            <div>
              <span className="text-3xl font-bold">{stats.average}</span>
              <div className="flex gap-0.5 mt-1 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`size-4 ${i < Math.round(stats.average) ? "text-amber-400" : "text-muted-foreground/30"}`} fill={i < Math.round(stats.average) ? "currentColor" : "none"} />
                ))}
              </div>
            </div>
            <div className="h-8 w-px bg-border" />
          </>
        )}
        <div className="text-sm text-muted-foreground">
          <span className="text-2xl font-bold text-foreground">{totalReviews}</span><br />
          review{totalReviews !== 1 ? "s" : ""}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_REVIEWS.map((r, i) => (
          <ReviewCard key={r.id} name={r.name} role={r.role} content={r.content} rating={r.rating} index={i} />
        ))}
      </div>
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
    <span className="font-semibold brand-text">
      {display}
      <span className="ml-0.5 animate-pulse">|</span>
    </span>
  );
}
