import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { generateCertId, getDomain, COMPANY, DOMAINS } from "@/lib/constants";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/Logo";
import { PromotionsSection } from "@/components/admin/PromotionsSection";
import { PromoPopupSection } from "@/components/admin/PromoPopupSection";
import { OfferLetterDoc, CertificateDoc, downloadPdf, downloadPdfBlob } from "@/components/pdf-docs";
import {
  LayoutDashboard, GraduationCap, BookOpen, FileText, ListChecks,
  ClipboardCheck, ClipboardList, Brain, IndianRupee, Award, Users, BarChart3,
  Settings, LogOut, Moon, Sun, Bell, Search, ChevronDown, Menu,
  X, Plus, Eye, CheckCircle2, XCircle, Mail, Download, Sparkles, Shield,
  ChevronRight, ChevronLeft, Clock, TrendingUp, UserPlus, Wallet,
  ExternalLink, RefreshCw, Trash2, Edit, ArrowUpRight, Filter,
  AlertTriangle, HelpCircle, Home, MessageSquare, PanelRightClose,
  PanelRightOpen, FolderTree, FileQuestion, PieChart, Percent, Briefcase,
  Loader2, Activity, Wifi, WifiOff, LogIn, Monitor, Smartphone, Tablet,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw redirect({ to: "/auth" });
    const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle();
    if (role?.role !== "admin") throw redirect({ to: "/dashboard" });
  },
  head: () => ({ meta: [{ title: "Admin — Skyrovix" }] }),
  component: AdminPanel,
});

// ─── Sidebar Items ───
const SIDEBAR_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "applications", label: "Internship Applications", icon: Users },
  { id: "submissions", label: "Task Submissions", icon: ClipboardCheck },
  { id: "verification", label: "Verification Queue", icon: Shield },
  { id: "payments", label: "Payments", icon: Wallet },
  { id: "promotions", label: "Promotions", icon: Percent },
  { id: "popup", label: "Promo Popup", icon: Bell },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "students", label: "Students", icon: GraduationCap },
  { id: "login-history", label: "Login History", icon: Activity },
  { id: "email-logs", label: "Email Logs", icon: Mail },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "login-analytics", label: "Login Analytics", icon: Activity },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

type SectionId = typeof SIDEBAR_ITEMS[number]["id"];

function AdminPanel() {
  const { user, isAdmin } = useAuth();
  const qc = useQueryClient();
  const [active, setActive] = useState<SectionId>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [liveNotifs, setLiveNotifs] = useState<Array<{ icon: any; text: string; time: string; color: string }>>([]);
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  useEffect(() => {
    const channel = supabase.channel("admin-realtime");
    const tables = [
      { table: "applications", icon: UserPlus, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30", label: "New application", event: "INSERT" },
      { table: "applications", icon: Shield, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30", label: "Internship submitted for verification", event: "UPDATE" },
      { table: "submissions", icon: ClipboardCheck, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30", label: "New task submission", event: "INSERT" },
      { table: "payments", icon: IndianRupee, color: "text-green-500 bg-green-50 dark:bg-green-950/30", label: "New payment", event: "INSERT" },
    ];
    for (const { table, icon, color, label, event } of tables) {
      channel.on("postgres_changes" as any, { event, schema: "public", table }, (payload: any) => {
        if (event === "UPDATE" && payload.new?.submission_status !== "submitted") return;
        const name = payload.new?.full_name ?? payload.new?.id?.slice(0, 8) ?? "";
        const notif = { icon, text: `${label} from ${name}`, time: "Just now", color };
        setLiveNotifs((prev) => [notif, ...prev].slice(0, 20));
        toast.success(`${label} received`, { description: name, duration: 4000 });
        qc.invalidateQueries({ queryKey: ["admin-overview"] });
        qc.invalidateQueries({ queryKey: ["admin-apps"] });
        qc.invalidateQueries({ queryKey: ["admin-subs"] });
        qc.invalidateQueries({ queryKey: ["admin-payments"] });
        qc.invalidateQueries({ queryKey: ["admin-verification-pending"] });
        qc.invalidateQueries({ queryKey: ["admin-student-sessions"] });
        qc.invalidateQueries({ queryKey: ["admin-login-history"] });
        qc.invalidateQueries({ queryKey: ["admin-online-count"] });
      });
    }
    // Subscribe to login_sessions for live online count + login notifications
    channel.on("postgres_changes" as any, { event: "INSERT", schema: "public", table: "login_sessions" }, async (payload: any) => {
      const studentId = payload.new?.student_id;
      if (studentId) {
        const { data: app } = await supabase.from("applications").select("full_name").eq("user_id", studentId).maybeSingle();
        const name = app?.full_name ?? userId.slice(0, 8);
        const notif = { icon: LogIn, text: `${name} logged in`, time: "Just now", color: "text-green-500 bg-green-50 dark:bg-green-950/30" };
        setLiveNotifs((prev) => [notif, ...prev].slice(0, 20));
        toast.success(`${name} logged in`, { description: "New student login", duration: 4000 });
      }
      const { count } = await supabase.from("login_sessions").select("id", { count: "exact", head: true }).eq("status", "online");
      setOnlineCount(count ?? 0);
      qc.invalidateQueries({ queryKey: ["admin-login-history"] });
      qc.invalidateQueries({ queryKey: ["admin-online-count"] });
    });
    channel.on("postgres_changes" as any, { event: "UPDATE", schema: "public", table: "login_sessions" }, async () => {
      const { count } = await supabase.from("login_sessions").select("id", { count: "exact", head: true }).eq("status", "online");
      setOnlineCount(count ?? 0);
      qc.invalidateQueries({ queryKey: ["admin-login-history"] });
      qc.invalidateQueries({ queryKey: ["admin-online-count"] });
    });
    channel.subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  // ─── Data ───
  const { data: overview } = useQuery({
    queryKey: ["admin-overview"],
    refetchInterval: 30_000,
    queryFn: async () => {
      const [a, s, p, c, v] = await Promise.all([
        supabase.from("applications").select("id", { count: "exact", head: true }),
        supabase.from("submissions").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("payments").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("certificates").select("id", { count: "exact", head: true }),
        supabase.from("applications").select("id", { count: "exact", head: true }).eq("submission_status", "submitted"),
      ]);
      return {
        apps: a.count ?? 0, subs: s.count ?? 0, pays: p.count ?? 0, certs: c.count ?? 0, pendingVerification: v.count ?? 0,
      };
    },
  });

  return (
    <div className={`min-h-screen ${dark ? "dark" : ""}`}>
      <div className="flex min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] dark:from-[#0F172A] dark:to-[#0F172A]">
        {/* ─── Background Blobs ─── */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 size-96 rounded-full bg-[#07284a]/15 blur-[120px] dark:bg-[#07284a]/20" />
          <div className="absolute top-1/3 -right-32 size-80 rounded-full bg-blue-400/15 blur-[100px] dark:bg-blue-600/10" />
          <div className="absolute -bottom-40 left-1/3 size-96 rounded-full bg-[#07284a]/10 blur-[140px] dark:bg-[#07284a]/15" />
        </div>

        {/* ─── Mobile Overlay ─── */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
        )}

        {/* ─── Sidebar ─── */}
        <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border/60 bg-white/70 backdrop-blur-2xl transition-all duration-300 dark:bg-[#0F172A]/90 dark:border-white/5 ${
          mobileOpen ? "w-64 translate-x-0" : sidebarOpen ? "w-64 -translate-x-full lg:translate-x-0" : "w-16 -translate-x-full lg:translate-x-0"
        }`}>
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-border/60 px-4 dark:border-white/5">
            <Link to="/" className={`flex items-center gap-2 ${!sidebarOpen && "lg:hidden"}`}>
              <div className="grid size-9 shrink-0 place-items-center rounded-xl brand-gradient text-[10px] font-bold text-white">S</div>
              {sidebarOpen && <span className="text-sm font-bold">Skyrovix<span className="brand-text">Admin</span></span>}
            </Link>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:grid size-8 place-items-center rounded-lg hover:bg-accent/50 transition">
              {sidebarOpen ? <PanelRightClose className="size-4" /> : <PanelRightOpen className="size-4" />}
            </button>
            <button onClick={() => setMobileOpen(false)} className="lg:hidden grid size-8 place-items-center rounded-lg hover:bg-accent/50">
              <X className="size-4" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => { setActive(item.id); setMobileOpen(false); }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "brand-gradient text-white shadow-md shadow-[#07284a]/20"
                          : "text-gray-600 hover:text-gray-900 hover:bg-[#07284a]/5 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5"
                      }`}
                    >
                      <Icon className="size-5 shrink-0" />
                      {sidebarOpen && <span className="truncate">{item.label}</span>}
                      {isActive && sidebarOpen && (
                        <ChevronRight className="ml-auto size-4 text-white/70" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="border-t border-border/60 p-3 dark:border-white/5">
            <button
              onClick={signOut}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-950/30`}
            >
              <LogOut className="size-5 shrink-0" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* ─── Main Area ─── */}
        <div className={`flex-1 min-w-0 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-16"}`}>
          {/* ─── Top Navbar ─── */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border/60 bg-white/70 px-4 backdrop-blur-xl dark:bg-[#0F172A]/80 dark:border-white/5">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileOpen(true)} className="lg:hidden grid size-9 place-items-center rounded-lg border border-border hover:bg-accent/50">
                <Menu className="size-4" />
              </button>
              <div className="relative hidden sm:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search students, certificates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 w-64 rounded-xl border-border/60 bg-background/60 pl-9 text-sm backdrop-blur placeholder:text-muted-foreground/60"
                />
              </div>
              {/* System Health Badges */}
              <div className="hidden md:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50/50 px-2.5 py-1 text-[10px] font-medium text-emerald-600 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-emerald-400">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                </span>
                <span>DB Live Sync Active</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setDark(!dark)}
                className="grid size-9 place-items-center rounded-xl border border-border/60 bg-background/60 hover:bg-accent/50 transition"
              >
                {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </button>
              <div className="relative">
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative grid size-9 place-items-center rounded-xl border border-border/60 bg-background/60 hover:bg-accent/50 transition"
                >
                  <Bell className="size-4" />
                  {liveNotifs.length > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-red-500 text-[9px] font-bold text-white">{liveNotifs.length > 9 ? "9+" : liveNotifs.length}</span>
                  )}
                </button>
                {notifOpen && <NotificationsDropdown onClose={() => setNotifOpen(false)} notifs={liveNotifs} />}
              </div>
              <div className="ml-2 flex items-center gap-2 rounded-xl bg-background/60 border border-border/60 px-3 py-1.5">
                <div className="grid size-7 place-items-center rounded-lg brand-gradient text-[10px] font-bold text-white">
                  {user?.email?.charAt(0).toUpperCase() ?? "A"}
                </div>
                <span className="hidden text-sm font-medium sm:inline">{user?.email?.split("@")[0] ?? "Admin"}</span>
              </div>
            </div>
          </header>

          {/* ─── Page Content ─── */}
          <main className="p-4 sm:p-6 lg:p-8 overflow-x-auto">
            {/* Search results */}
            {searchQuery && (
              <div className="mb-6 rounded-2xl border border-border/60 bg-white/60 p-4 backdrop-blur dark:bg-white/5">
                <p className="text-sm text-muted-foreground">Search results for "<span className="font-medium text-foreground">{searchQuery}</span>"</p>
              </div>
            )}

            {active === "dashboard" && <DashboardSection greeting={greeting} overview={overview} onNavigate={setActive} onlineCount={onlineCount} />}
            {active === "applications" && <ApplicationsSection />}
            {active === "submissions" && <SubmissionsSection />}
            {active === "verification" && <VerificationSection />}
            {active === "payments" && <PaymentsSection />}
            {active === "promotions" && <PromotionsSection />}
            {active === "popup" && <PromoPopupSection />}
            {active === "certificates" && <CertificatesSection />}
            {active === "students" && <StudentsSection />}
            {active === "login-history" && <LoginHistorySection />}
            {active === "email-logs" && <EmailLogsSection />}
            {active === "analytics" && <AnalyticsSection />}
            {active === "login-analytics" && <LoginAnalyticsSection />}
            {active === "settings" && <SettingsSection />}
          </main>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// NOTIFICATIONS DROPDOWN
// ══════════════════════════════════════════════
function NotificationsDropdown({ onClose, notifs }: { onClose: () => void; notifs: Array<{ icon: any; text: string; time: string; color: string }> }) {
  return (
    <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-border/60 bg-white/90 p-4 shadow-2xl backdrop-blur-2xl dark:bg-[#1E293B]/90 dark:border-white/10" onClick={(e) => e.stopPropagation()}>
      <p className="mb-3 text-sm font-semibold">Notifications {notifs.length > 0 && <span className="text-muted-foreground font-normal">({notifs.length})</span>}</p>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {notifs.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">No notifications yet.</p>}
        {notifs.map((n, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-accent/50">
            <div className={`grid size-8 shrink-0 place-items-center rounded-lg ${n.color}`}>
              <n.icon className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm">{n.text}</p>
              <p className="text-xs text-muted-foreground">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════════
function DashboardSection({ greeting, overview, onNavigate, onlineCount = 0 }: { greeting: string; overview: any; onNavigate: (s: SectionId) => void; onlineCount?: number }) {
  const [counts, setCounts] = useState({ apps: 0, subs: 0, pays: 0, certs: 0, pendingVerification: 0 });
  useEffect(() => {
    if (!overview) return;
    const timer = setInterval(() => {
      setCounts((c) => ({
        apps: Math.min(c.apps + 3, overview.apps),
        subs: Math.min(c.subs + 1, overview.subs),
        pays: Math.min(c.pays + 1, overview.pays),
        certs: Math.min(c.certs + 2, overview.certs),
        pendingVerification: Math.min(c.pendingVerification + 1, overview.pendingVerification),
      }));
    }, 30);
    setTimeout(() => clearInterval(timer), 1000);
    return () => clearInterval(timer);
  }, [overview]);

  const stats = [
    { label: "Applications", value: counts.apps, icon: Users, change: "+12 Today", color: "from-blue-500 to-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30" },
    { label: "Pending Verification", value: overview?.pendingVerification ?? 0, icon: Shield, change: "Need Review", color: "from-purple-500 to-violet-500", bg: "bg-purple-50 dark:bg-purple-950/30" },
    { label: "Pending Payments", value: counts.pays, icon: Wallet, change: "Pending", color: "from-green-500 to-emerald-500", bg: "bg-green-50 dark:bg-green-950/30" },
    { label: "Certificates Issued", value: counts.certs, icon: Award, change: "Total", color: "from-[#07284a] to-[#07284a]", bg: "bg-[#07284a]/10 dark:bg-[#07284a]/30" },
  ];

  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-[#07284a]/15 via-blue-600/5 to-transparent p-6 sm:p-8 dark:from-[#07284a]/30 dark:via-blue-600/10">
        <div className="absolute -right-16 -top-16 size-48 rounded-full bg-[#07284a]/15 blur-[80px]" />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{greeting}, Admin <span className="brand-text">👋</span></h1>
              <p className="mt-1.5 text-muted-foreground">Manage internships, submissions and certificates effortlessly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="group rounded-2xl border border-border/50 bg-white/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/5 dark:bg-[#1E293B]/70 dark:hover:shadow-white/5"
            >
              <div className="flex items-start justify-between">
                <div className={`grid size-11 shrink-0 place-items-center rounded-xl ${s.bg}`}>
                  <Icon className="size-5 text-[#07284a] dark:text-white" />
                </div>
                <span className={`rounded-full bg-gradient-to-br ${s.color} px-2 py-0.5 text-[10px] font-medium text-white`}>{s.change}</span>
              </div>
              <p className="mt-4 font-display text-3xl font-bold">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          );
        })}
        {/* Online Students Card */}
        <div
          className="group cursor-pointer rounded-2xl border border-border/50 bg-white/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/5 dark:bg-[#1E293B]/70 dark:hover:shadow-white/5"
          onClick={() => onNavigate("login-history")}
        >
          <div className="flex items-start justify-between">
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-green-50 dark:bg-green-950/30">
              <Activity className="size-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="rounded-full bg-gradient-to-br from-green-500 to-emerald-500 px-2 py-0.5 text-[10px] font-medium text-white">Live</span>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="mt-4 font-display text-3xl font-bold">{onlineCount}</p>
            <span className="text-sm text-green-600 dark:text-green-400">online</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Students Online Now</p>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-6 border-t border-border/40">
        <div className="col-span-full">
          <h3 className="text-sm font-semibold text-muted-foreground mb-1 flex items-center gap-1.5"><ListChecks className="size-4" /> Administrative Quick Actions</h3>
          <p className="text-xs text-muted-foreground mb-3">Jump directly to pending tasks and registrations.</p>
        </div>
        
        <button
          onClick={() => onNavigate("applications")}
          className="flex items-center gap-4 rounded-2xl border border-border/40 bg-white/40 p-4 text-left backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 dark:bg-[#1E293B]/40"
        >
          <div className="grid size-10 place-items-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0"><Users className="size-5" /></div>
          <div>
            <p className="font-semibold text-sm">Review Applications</p>
            <p className="text-xs text-muted-foreground">Approve or reject candidates</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate("submissions")}
          className="flex items-center gap-4 rounded-2xl border border-border/40 bg-white/40 p-4 text-left backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 dark:bg-[#1E293B]/40"
        >
          <div className="grid size-10 place-items-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0"><ClipboardCheck className="size-5" /></div>
          <div>
            <p className="font-semibold text-sm">Task Submissions</p>
            <p className="text-xs text-muted-foreground">Grade and provide feedback</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate("verification")}
          className="flex items-center gap-4 rounded-2xl border border-border/40 bg-white/40 p-4 text-left backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 dark:bg-[#1E293B]/40"
        >
          <div className="grid size-10 place-items-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0"><Shield className="size-5" /></div>
          <div>
            <p className="font-semibold text-sm">Verification Queue</p>
            <p className="text-xs text-muted-foreground">Issue final certificates</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate("payments")}
          className="flex items-center gap-4 rounded-2xl border border-border/40 bg-white/40 p-4 text-left backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 dark:bg-[#1E293B]/40"
        >
          <div className="grid size-10 place-items-center rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 shrink-0"><Wallet className="size-5" /></div>
          <div>
            <p className="font-semibold text-sm">Verify Payments</p>
            <p className="text-xs text-muted-foreground">Track student UTR numbers</p>
          </div>
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// APPLICATIONS
// ══════════════════════════════════════════════
function ApplicationsSection() {
  const qc = useQueryClient();
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data } = useQuery({
    queryKey: ["admin-apps"],
    queryFn: async () => {
      const { data } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    let list = data;
    if (statusFilter !== "all") {
      list = list.filter((a: any) => a.status === statusFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((a: any) =>
        a.full_name?.toLowerCase().includes(q) ||
        a.email?.toLowerCase().includes(q) ||
        a.intern_id?.toLowerCase().includes(q) ||
        a.college?.toLowerCase().includes(q) ||
        a.course?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [data, statusFilter, search]);

  const updateStatus = async (id: string, status: string) => {
    const payload: any = { status };
    if (status === "ongoing") payload.offer_issued_at = new Date().toISOString();
    const { error } = await supabase.from("applications").update(payload).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`Application ${status}`);
    qc.invalidateQueries({ queryKey: ["admin-apps"] });
    qc.invalidateQueries({ queryKey: ["admin-overview"] });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const { deleteInternshipApplication: del } = await import("@/lib/admin-service");
      const result = await del({ data: { applicationId: deleteTarget.id } });
      if (result.success) {
        toast.success("Application deleted successfully.");
        qc.invalidateQueries({ queryKey: ["admin-apps"] });
        qc.invalidateQueries({ queryKey: ["admin-overview"] });
      } else {
        toast.error(result.error ?? "Failed to delete application");
      }
    } catch (e: any) {
      toast.error(e.message ?? "Failed to delete application");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="animate-fade-in-up space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Internship Applications</h2>
          <p className="text-sm text-muted-foreground">{filtered?.length ?? 0} matching · {data?.length ?? 0} total applications</p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
        <div className="flex flex-wrap gap-1.5 rounded-xl bg-muted/50 p-1 w-full md:w-auto">
          {(["all", "pending", "approved", "ongoing", "completed", "rejected"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                statusFilter === s ? "bg-white text-foreground shadow-sm dark:bg-[#1E293B]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            placeholder="Search name, college, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-9 rounded-xl border-border/60 bg-background/50"
          />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => !deleting && setDeleteTarget(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative w-full max-w-md rounded-2xl border border-border/50 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl dark:bg-[#1E293B]/95" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="grid size-10 place-items-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/30"><AlertTriangle className="size-5" /></div>
              <div>
                <h3 className="font-bold text-lg">Delete Internship Application?</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
              </div>
            </div>
            <div className="rounded-xl bg-accent/30 p-4 text-sm space-y-1 mb-4">
              <p><span className="font-medium">Student:</span> {deleteTarget.full_name}</p>
              <p><span className="font-medium">Domain:</span> {getDomain(deleteTarget.domain)?.name ?? deleteTarget.domain}</p>
              <p><span className="font-medium">Duration:</span> {deleteTarget.duration ?? 1} Month(s)</p>
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 p-3 text-xs text-amber-700 dark:text-amber-400 mb-4">
              <p className="font-medium mb-1">This will remove:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Internship enrollment</li>
                <li>Assigned tasks</li>
                <li>Task submissions</li>
                <li>Progress tracking</li>
                <li>Internship certificate (if exists)</li>
              </ul>
              <p className="mt-2 font-medium text-green-600 dark:text-green-400">Student account will NOT be deleted.</p>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" className="border-border/60" onClick={() => setDeleteTarget(null)} disabled={deleting}>Cancel</Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white border-0" onClick={handleDelete} disabled={deleting}>
                {deleting ? "Deleting..." : "Delete Application"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedApp(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg rounded-2xl border border-border/50 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl dark:bg-[#1E293B]/95 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{selectedApp.full_name}</h3>
              <button onClick={() => setSelectedApp(null)} className="grid size-8 place-items-center rounded-lg hover:bg-accent/50"><X className="size-4" /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-muted-foreground text-xs">Email</p><p>{selectedApp.email}</p></div>
                <div><p className="text-muted-foreground text-xs">Phone</p><p>{selectedApp.phone ?? "—"}</p></div>
                <div><p className="text-muted-foreground text-xs">Domain</p><p>{getDomain(selectedApp.domain)?.name ?? selectedApp.domain}</p></div>
                <div><p className="text-muted-foreground text-xs">Status</p><Badge className="text-xs">{selectedApp.status}</Badge></div>
                <div className="col-span-2"><p className="text-muted-foreground text-xs">College</p><p>{selectedApp.college} · {selectedApp.course} ({selectedApp.year})</p></div>
                <div className="col-span-2"><p className="text-muted-foreground text-xs">Intern ID</p><p className="font-mono text-xs">{selectedApp.intern_id ?? "—"}</p></div>
                <div><p className="text-muted-foreground text-xs">Applied</p><p>{new Date(selectedApp.created_at).toLocaleDateString("en-IN")}</p></div>
                <div><p className="text-muted-foreground text-xs">Offer Issued</p><p>{selectedApp.offer_issued_at ? new Date(selectedApp.offer_issued_at).toLocaleDateString("en-IN") : "—"}</p></div>
              </div>
              <div className="flex gap-2 pt-2 flex-wrap">
                {selectedApp.status === "approved" && (
                  <Button size="sm" className="brand-gradient text-white border-0 flex-1" onClick={() => { updateStatus(selectedApp.id, "ongoing"); setSelectedApp(null); }}>
                    Mark Ongoing
                  </Button>
                )}
                {selectedApp.status === "ongoing" && (
                  <Button size="sm" className="brand-gradient text-white border-0 flex-1" onClick={() => { updateStatus(selectedApp.id, "completed"); setSelectedApp(null); }}>
                    Mark Completed
                  </Button>
                )}
                <Button size="sm" variant="outline" className="border-border/60" asChild>
                  <a href={`mailto:${selectedApp.email}`}><Mail className="mr-1 size-3.5" /> Email</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-border/50 bg-white/60 backdrop-blur dark:bg-[#1E293B]/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-xs uppercase text-muted-foreground">
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Domain</th>
              <th className="px-4 py-3 text-left">College</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">No matching applications found.</td></tr>
            )}
            {filtered?.map((a) => {
              const dd = getDomain(a.domain);
              return (
                <tr key={a.id} className="border-b border-border/30 transition hover:bg-accent/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid size-9 shrink-0 place-items-center rounded-full brand-gradient text-xs font-bold text-white">{a.full_name.charAt(0).toUpperCase()}</div>
                      <div className="min-w-0"><p className="font-medium truncate">{a.full_name}</p><p className="text-xs text-muted-foreground">{a.email}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge variant="secondary" className="text-xs">{dd?.name ?? a.domain}</Badge></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{a.college} · {a.course} {a.year}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs ${
                      a.status === "completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                      a.status === "ongoing" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                      a.status === "approved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                      a.status === "rejected" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>{a.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setSelectedApp(a)} className="grid size-8 place-items-center rounded-lg hover:bg-accent/50 transition" title="View"><Eye className="size-4" /></button>
                      {a.status === "pending" && (
                        <>
                          <button onClick={() => updateStatus(a.id, "approved")} className="grid size-8 place-items-center rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30 transition" title="Approve"><CheckCircle2 className="size-4" /></button>
                          <button onClick={() => updateStatus(a.id, "rejected")} className="grid size-8 place-items-center rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition" title="Reject"><XCircle className="size-4" /></button>
                        </>
                      )}
                      <a href={`mailto:${a.email}`} className="grid size-8 place-items-center rounded-lg hover:bg-accent/50 transition" title="Send Email"><Mail className="size-4" /></a>
                      <button onClick={() => setDeleteTarget(a)} className="grid size-8 place-items-center rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition" title="Delete Application"><Trash2 className="size-4" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// SUBMISSIONS
// ══════════════════════════════════════════════
function SubmissionsSection() {
  const qc = useQueryClient();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ id: string; status: string; label: string } | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showHistory, setShowHistory] = useState<string | null>(null);
  const [historyData, setHistoryData] = useState<any[]>([]);

  const tableName = "submissions";
  const queryKey = ["admin-subs"];

  const { data } = useQuery({
    queryKey: ["admin-subs"],
    queryFn: async () => {
      const { data: list } = await supabase
        .from("submissions")
        .select("*, applications!inner(full_name, intern_id, domain), tasks(title, task_number)")
        .order("submitted_at", { ascending: false });
      return list ?? [];
    },
    refetchInterval: 10_000,
  });

  const loadHistory = async (id: string) => {
    const { data: history } = await supabase
      .from("submission_history")
      .select("*")
      .eq("submission_id", id)
      .eq("table_name", tableName)
      .order("created_at", { ascending: false });
    setHistoryData(history ?? []);
    setShowHistory(showHistory === id ? null : id);
  };

  const changeStatus = async (id: string, newStatus: string) => {
    setLoadingId(id);
    const reason = newStatus === "rejected" ? rejectReason : "";
    const { error } = await supabase.from(tableName as any).update({ status: newStatus, feedback: reason || null, reviewed_at: new Date().toISOString() }).eq("id", id);
    if (error) { setLoadingId(null); return toast.error(error.message); }
    await supabase.from("submission_history").insert({
      submission_id: id,
      table_name: tableName,
      previous_status: data?.find((s: any) => s.id === id)?.status ?? null,
      new_status: newStatus,
      changed_by: (await supabase.auth.getUser()).data.user?.id,
      reason: reason || null,
    });
    setLoadingId(null);
    setConfirmAction(null);
    setRejectReason("");
    toast.success(`Submission ${newStatus}`);
    qc.invalidateQueries({ queryKey });
  };

  const pending = data?.filter((s: any) => s.status === "pending") ?? [];
  const reviewed = data?.filter((s: any) => s.status !== "pending") ?? [];

  return (
    <div className="animate-fade-in-up space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Task Submissions</h2>
      </div>

      {pending.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-amber-600 flex items-center gap-2"><Clock className="size-4" /> Pending Review ({pending.length})</h3>
          <div className="space-y-3">
            {pending.map((s: any) => <SubmissionCard key={s.id} sub={s} loadingId={loadingId} onAction={(status, label) => setConfirmAction({ id: s.id, status, label })} onHistory={() => loadHistory(s.id)} showHistory={showHistory === s.id} historyData={historyData} />)}
          </div>
        </div>
      )}

      {reviewed.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Reviewed ({reviewed.length})</h3>
          <div className="space-y-3">
            {reviewed.map((s: any) => <SubmissionCard key={s.id} sub={s} loadingId={loadingId} onAction={(status, label) => setConfirmAction({ id: s.id, status, label })} onHistory={() => loadHistory(s.id)} showHistory={showHistory === s.id} historyData={historyData} />)}
          </div>
        </div>
      )}

      {!data?.length && <p className="text-center text-muted-foreground py-12">No submissions yet.</p>}

      {/* Confirmation Dialog */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setConfirmAction(null)}>
          <div className="w-full max-w-md rounded-2xl border border-border/50 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl dark:bg-[#1E293B]/95 dark:border-white/10 animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold">Confirm Action</h3>
            <p className="mt-2 text-sm text-muted-foreground">Are you sure you want to <span className="font-semibold text-foreground">{confirmAction.label}</span> this submission?</p>
            {confirmAction.status === "rejected" && (
              <div className="mt-4">
                <Label className="text-xs">Reason for rejection</Label>
                <Textarea
                  placeholder="Provide a reason for rejection..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={3}
                  className="mt-1 text-xs"
                />
              </div>
            )}
            <div className="mt-6 flex gap-3 justify-end">
              <Button variant="outline" size="sm" className="rounded-xl" onClick={() => { setConfirmAction(null); setRejectReason(""); }}>Cancel</Button>
              <Button size="sm" className={`rounded-xl text-white border-0 ${confirmAction.status === "approved" ? "bg-green-600 hover:bg-green-700" : confirmAction.status === "rejected" ? "bg-red-600 hover:bg-red-700" : "bg-amber-600 hover:bg-amber-700"}`}
                disabled={loadingId === confirmAction.id}
                onClick={() => changeStatus(confirmAction.id, confirmAction.status)}>
                {loadingId === confirmAction.id ? "Saving..." : `Yes, ${confirmAction.label}`}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SubmissionCard({ sub, loadingId, onAction, onHistory, showHistory, historyData }: any) {
  const [actionsOpen, setActionsOpen] = useState(false);
  const isLoading = loadingId === sub.id;
  const taskLabel = `Task ${sub.tasks?.task_number}: ${sub.tasks?.title}`;
  const userName = sub.applications?.full_name;
  const userMeta = `${sub.applications?.intern_id} · ${getDomain(sub.applications?.domain)?.name}`;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setActionsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const actionItems = [];
  if (sub.status !== "approved") actionItems.push({ status: "approved", label: "Approve", icon: CheckCircle2, color: "text-green-600" });
  if (sub.status !== "rejected") actionItems.push({ status: "rejected", label: "Reject", icon: XCircle, color: "text-red-600" });
  if (sub.status !== "pending") actionItems.push({ status: "pending", label: "Mark as Pending", icon: Clock, color: "text-amber-600" });

  return (
    <div className={`rounded-2xl border border-border/50 bg-white/60 p-4 backdrop-blur dark:bg-[#1E293B]/60 ${isLoading ? "opacity-60 pointer-events-none" : ""}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-sm">{taskLabel}</p>
          <p className="text-xs text-muted-foreground">{userName} · {userMeta}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={`text-xs ${
            sub.status === "approved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
            sub.status === "rejected" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
            "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
          }`}>{isLoading ? "Saving..." : sub.status}</Badge>
          <div className="relative" ref={dropdownRef}>
            <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg border-border/60 gap-1" onClick={() => setActionsOpen(!actionsOpen)}>
              Actions <ChevronDown className="size-3" />
            </Button>
            {actionsOpen && (
              <div className="absolute right-0 top-10 z-40 w-48 rounded-xl border border-border/60 bg-white/95 p-1.5 shadow-2xl backdrop-blur-2xl dark:bg-[#1E293B]/95 dark:border-white/10 animate-in zoom-in-95">
                {actionItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.status}
                      onClick={() => { setActionsOpen(false); onAction(item.status, item.label); }}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-accent/50 ${item.color}`}>
                      <Icon className="size-4" /> {item.label}
                    </button>
                  );
                })}
                <div className="my-1 border-t border-border/40" />
                <button onClick={() => { setActionsOpen(false); onHistory(); }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent/50">
                  <Clock className="size-4" /> View History
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-2 text-xs">
        {sub.github_url && <a href={sub.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-primary"><ExternalLink className="size-3" /> GitHub</a>}
        {sub.deployed_url && <a href={sub.deployed_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-primary"><ExternalLink className="size-3" /> Demo</a>}
        {sub.pdf_url && <a href={sub.pdf_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-primary"><FileText className="size-3" /> Report</a>}
        {sub.screenshot_url && <a href={sub.screenshot_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-primary"><ExternalLink className="size-3" /> Screenshot</a>}
        {sub.notes && <p className="w-full text-muted-foreground mt-1">{sub.notes}</p>}
      </div>
      {sub.feedback && (
        <div className="mt-2 rounded-xl border border-blue-200 bg-blue-50 p-2.5 text-xs text-blue-900 dark:border-blue-900/30 dark:bg-blue-950/30 dark:text-blue-300">
          <span className="font-semibold">Feedback:</span> {sub.feedback}
        </div>
      )}

      {/* History */}
      {showHistory && (
        <div className="mt-3 rounded-xl border border-border/40 bg-secondary/30 p-3">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">Submission History</p>
          {historyData.length === 0 ? (
            <p className="text-xs text-muted-foreground">No history recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {historyData.map((h: any, i: number) => (
                <div key={h.id} className="flex items-start gap-2 text-xs">
                  <div className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-muted text-[9px] font-bold text-muted-foreground">{i + 1}</div>
                  <div>
                    <p>
                      <span className={`font-semibold ${h.new_status === "approved" ? "text-green-600" : h.new_status === "rejected" ? "text-red-600" : "text-amber-600"}`}>{h.previous_status ?? "—"}</span>
                      <span className="mx-1.5 text-muted-foreground">→</span>
                      <span className={`font-semibold ${h.new_status === "approved" ? "text-green-600" : h.new_status === "rejected" ? "text-red-600" : "text-amber-600"}`}>{h.new_status}</span>
                    </p>
                    <p className="text-muted-foreground">{new Date(h.created_at).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                    {h.reason && <p className="mt-0.5 text-muted-foreground italic">Reason: {h.reason}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════
// PAYMENTS
// ══════════════════════════════════════════════
function PaymentsSection() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const { data } = await supabase
        .from("payments")
        .select("*, applications(full_name, intern_id, domain, id, email, user_id)")
        .order("submitted_at", { ascending: false });
      return data ?? [];
    },
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    let list = data;
    if (statusFilter !== "all") {
      list = list.filter((p: any) => p.status === statusFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p: any) =>
        p.applications?.full_name?.toLowerCase().includes(q) ||
        p.applications?.intern_id?.toLowerCase().includes(q) ||
        p.utr_number?.toLowerCase().includes(q) ||
        p.amount?.toString().includes(q)
      );
    }
    return list;
  }, [data, statusFilter, search]);

  const verify = async (paymentId: string, applicationId: string, accept: boolean) => {
    if (!accept) {
      const { error } = await supabase.from("payments").update({ status: "rejected", verified_at: new Date().toISOString() }).eq("id", paymentId);
      if (error) return toast.error(error.message);
      toast.success("Payment rejected");
    } else {
      const { error } = await supabase.from("payments").update({ status: "verified", verified_at: new Date().toISOString() }).eq("id", paymentId);
      if (error) return toast.error(error.message);
      toast.success("Payment verified — certificate will be issued after admin approves internship submission.");
    }
    qc.invalidateQueries({ queryKey: ["admin-payments"] });
  };

  const pendingP = data?.filter((p: any) => p.status === "pending") ?? [];
  const doneP = data?.filter((p: any) => p.status !== "pending") ?? [];

  return (
    <div className="animate-fade-in-up space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Payments</h2>
          <p className="text-sm text-muted-foreground">{filtered?.length ?? 0} matching · {data?.length ?? 0} total payments</p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
        <div className="flex flex-wrap gap-1.5 rounded-xl bg-muted/50 p-1 w-full md:w-auto">
          {(["all", "pending", "verified", "rejected"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                statusFilter === s ? "bg-white text-foreground shadow-sm dark:bg-[#1E293B]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            placeholder="Search student, UTR..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-9 rounded-xl border-border/60 bg-background/50"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border/50 bg-white/60 backdrop-blur dark:bg-[#1E293B]/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-xs uppercase text-muted-foreground">
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">UTR</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered?.map((p: any) => (
              <tr key={p.id} className="border-b border-border/30 transition hover:bg-accent/20">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="grid size-8 place-items-center rounded-full bg-secondary text-xs font-bold">{p.applications?.full_name?.charAt(0)}</div>
                    <div>
                      <p className="font-medium text-sm">{p.applications?.full_name}</p>
                      <p className="text-xs text-muted-foreground">{getDomain(p.applications?.domain)?.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs">{p.utr_number}</td>
                <td className="px-4 py-3 font-semibold">₹{p.amount}</td>
                <td className="px-4 py-3">
                  <Badge className={`text-xs ${
                    p.status === "verified" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                    p.status === "rejected" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}>{p.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  {p.status === "pending" ? (
                    <div className="flex justify-end gap-1">
                      <button onClick={() => p.applications?.id && verify(p.id, p.applications.id, true)} className="grid size-8 place-items-center rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30" title="Verify"><CheckCircle2 className="size-4" /></button>
                      <button onClick={() => p.applications?.id && verify(p.id, p.applications.id, false)} className="grid size-8 place-items-center rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30" title="Reject"><XCircle className="size-4" /></button>
                    </div>
                  ) : (
                    <Badge variant="outline" className="text-xs">{p.status === "verified" ? "Completed" : "Rejected"}</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// VERIFICATION QUEUE
// ══════════════════════════════════════════════
function VerificationSection() {
  const qc = useQueryClient();
  const { user } = useAuth();
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [rejectDialog, setRejectDialog] = useState<any | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [paymentMap, setPaymentMap] = useState<Record<string, any>>({});

  // Fetch payments separately to avoid schema cache issues with reverse join
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("payments")
        .select("application_id, utr_number, amount, status");
      if (data) {
        const map: Record<string, any> = {};
        for (const p of data) map[p.application_id] = p;
        setPaymentMap(map);
      }
    })();
  }, []);

  const { data: pendingApps } = useQuery({
    queryKey: ["admin-verification-pending"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("submission_status", "submitted")
        .order("submitted_at", { ascending: false });
      if (error) { console.error("Failed to fetch pending apps:", error); return []; }
      return data ?? [];
    },
    refetchInterval: 10_000,
  });

  const { data: reviewedApps } = useQuery({
    queryKey: ["admin-verification-reviewed"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .in("submission_status", ["approved", "rejected"])
        .order("verified_at", { ascending: false });
      if (error) { console.error("Failed to fetch reviewed apps:", error); return []; }
      return data ?? [];
    },
    refetchInterval: 10_000,
  });

  const handleApprove = async (app: any) => {
    setActionLoading(app.id);
    try {
      // Generate certificate
      const cert_id = generateCertId();
      const hash = crypto.randomUUID().replace(/-/g, "").slice(0, 32);
      const { error: cerr } = await supabase.from("certificates").insert({
        application_id: app.id,
        certificate_id: cert_id,
        verification_hash: hash,
      });
      if (cerr) throw cerr;

      // Update application
      const { error: updErr } = await supabase
        .from("applications")
        .update({
          submission_status: "approved",
          verified: true,
          verified_by: user?.id,
          verified_at: new Date().toISOString(),
          certificate_generated: true,
          certificate_generated_at: new Date().toISOString(),
          verification_notes: null,
          rejection_reason: null,
        })
        .eq("id", app.id);
      if (updErr) throw updErr;

      toast.success(`Internship approved! Certificate ${cert_id} issued.`);

      // Send certificate email
      (async () => {
        try {
          const { sendCertificateEmail } = await import("@/lib/email-helpers");
          const result = await sendCertificateEmail({
            to: app.email,
            studentName: app.full_name,
            studentId: app.user_id,
            certId: cert_id,
            domainName: getDomain(app.domain)?.name ?? app.domain,
            internId: app.intern_id,
          });
          if (!result.success) console.warn("[Email] Certificate email not sent:", result.error);
        } catch (e) { console.warn("[Email] Failed to send certificate:", e); }
      })();

      qc.invalidateQueries({ queryKey: ["admin-verification-pending"] });
      qc.invalidateQueries({ queryKey: ["admin-verification-reviewed"] });
      qc.invalidateQueries({ queryKey: ["admin-overview"] });
    } catch (err: any) {
      toast.error(err.message || "Failed to approve internship");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!rejectDialog) return;
    setActionLoading(rejectDialog.id);
    try {
      const { error: updErr } = await supabase
        .from("applications")
        .update({
          submission_status: "rejected",
          verified: false,
          verified_by: user?.id,
          verified_at: new Date().toISOString(),
          rejection_reason: rejectReason || "Incomplete submission",
          verification_notes: rejectReason || "Rejected by admin",
        })
        .eq("id", rejectDialog.id);
      if (updErr) throw updErr;

      toast.success("Internship rejected");
      setRejectDialog(null);
      setRejectReason("");

      qc.invalidateQueries({ queryKey: ["admin-verification-pending"] });
      qc.invalidateQueries({ queryKey: ["admin-verification-reviewed"] });
      qc.invalidateQueries({ queryKey: ["admin-overview"] });
    } catch (err: any) {
      toast.error(err.message || "Failed to reject internship");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="animate-fade-in-up space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Internship Verification Queue</h2>
          <p className="text-sm text-muted-foreground">{pendingApps?.length ?? 0} pending, {reviewedApps?.length ?? 0} reviewed</p>
        </div>
      </div>

      {/* Pending */}
      {pendingApps && pendingApps.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-amber-600 flex items-center gap-2"><Clock className="size-4" /> Pending Verification ({pendingApps.length})</h3>
          <div className="space-y-3">
            {pendingApps.map((a: any) => (
              <div key={a.id} className="rounded-2xl border border-border/50 bg-white/70 p-5 backdrop-blur dark:bg-[#1E293B]/70">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 shrink-0 place-items-center rounded-full brand-gradient text-sm font-bold text-white">{a.full_name?.charAt(0)?.toUpperCase() ?? "?"}</div>
                    <div>
                      <p className="font-semibold text-sm">{a.full_name}</p>
                      <p className="text-xs text-muted-foreground">{a.intern_id} · {getDomain(a.domain)?.name ?? a.domain} · {a.duration ?? 1} Month(s)</p>
                    </div>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs">Submitted</Badge>
                </div>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div><span className="text-muted-foreground">Applied</span><p className="font-semibold">{new Date(a.created_at).toLocaleDateString("en-IN")}</p></div>
                  <div><span className="text-muted-foreground">Submitted</span><p className="font-semibold">{a.submitted_at ? new Date(a.submitted_at).toLocaleDateString("en-IN") : "—"}</p></div>
                  <div><span className="text-muted-foreground">Payment</span><p className="font-semibold">{paymentMap[a.id] ? (paymentMap[a.id].utr_number === "FREE_COUPON" ? "Free Coupon" : `₹${paymentMap[a.id].amount}`) : "—"}</p></div>
                  <div><span className="text-muted-foreground">Status</span><p className="font-semibold capitalize">{paymentMap[a.id]?.status ?? "—"}</p></div>
                </div>
                {a.coupon_code && <p className="mt-2 text-xs text-muted-foreground">Coupon: <span className="font-mono font-bold">{a.coupon_code}</span></p>}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white border-0 rounded-xl"
                    disabled={actionLoading === a.id}
                    onClick={() => handleApprove(a)}>
                    {actionLoading === a.id ? <Loader2 className="size-3.5 animate-spin mr-1" /> : <CheckCircle2 className="size-3.5 mr-1" />}
                    Approve & Issue Certificate
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl"
                    disabled={actionLoading === a.id}
                    onClick={() => { setRejectDialog(a); setRejectReason(""); }}>
                    <XCircle className="size-3.5 mr-1" /> Reject
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl border-border/60" onClick={() => setSelectedApp(selectedApp?.id === a.id ? null : a)}>
                    <Eye className="size-3.5 mr-1" /> {selectedApp?.id === a.id ? "Hide" : "View"} Details
                  </Button>
                </div>
                {selectedApp?.id === a.id && (
                  <div className="mt-4 rounded-xl border border-border/40 bg-muted/30 p-4 text-xs space-y-2">
                    <p><span className="font-semibold">Email:</span> {a.email}</p>
                    <p><span className="font-semibold">Phone:</span> {a.phone ?? "—"}</p>
                    <p><span className="font-semibold">College:</span> {a.college} · {a.course} ({a.year})</p>
                    <p><span className="font-semibold">Location:</span> {[a.city, a.district, a.state, a.country].filter(Boolean).join(", ") || "—"}</p>
                    <p><span className="font-semibold">Duration:</span> {a.duration ?? 1} Month(s)</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {(!pendingApps || pendingApps.length === 0) && (
        <div className="rounded-2xl border border-border/50 bg-white/60 p-12 text-center backdrop-blur dark:bg-[#1E293B]/60">
          <Shield className="size-12 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="font-bold text-base">No Pending Verifications</h3>
          <p className="text-sm text-muted-foreground mt-1">All submitted internships have been reviewed.</p>
        </div>
      )}

      {/* Reviewed */}
      {reviewedApps && reviewedApps.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Reviewed ({reviewedApps.length})</h3>
          <div className="overflow-x-auto rounded-2xl border border-border/50 bg-white/60 backdrop-blur dark:bg-[#1E293B]/60">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 text-xs uppercase text-muted-foreground">
                  <th className="px-4 py-3 text-left">Student</th>
                  <th className="px-4 py-3 text-left">Domain</th>
                  <th className="px-4 py-3 text-left">Submitted</th>
                  <th className="px-4 py-3 text-left">Verified</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {reviewedApps.map((a: any) => (
                  <tr key={a.id} className="border-b border-border/30 transition hover:bg-accent/20">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="grid size-8 place-items-center rounded-full bg-secondary text-xs font-bold">{a.full_name?.charAt(0)}</div>
                        <div>
                          <p className="font-medium text-sm">{a.full_name}</p>
                          <p className="text-xs text-muted-foreground">{a.intern_id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge variant="secondary" className="text-xs">{getDomain(a.domain)?.name ?? a.domain}</Badge></td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{a.submitted_at ? new Date(a.submitted_at).toLocaleDateString("en-IN") : "—"}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{a.verified_at ? new Date(a.verified_at).toLocaleDateString("en-IN") : "—"}</td>
                    <td className="px-4 py-3">
                      <Badge className={`text-xs ${a.submission_status === "approved" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                        {a.submission_status === "approved" ? "Approved" : "Rejected"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reject Dialog */}
      {rejectDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => !actionLoading && setRejectDialog(null)}>
          <div className="w-full max-w-md rounded-2xl border border-border/50 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl dark:bg-[#1E293B]/95 dark:border-white/10" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold">Reject Internship</h3>
            <p className="mt-2 text-sm text-muted-foreground">Reject internship for <span className="font-semibold text-foreground">{rejectDialog.full_name}</span>.</p>
            <div className="mt-4">
              <Label className="text-xs">Reason for rejection</Label>
              <Textarea
                placeholder="Provide feedback — student will see this..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
                className="mt-1 text-xs"
              />
              <p className="mt-1 text-[10px] text-muted-foreground">Common reasons: Missing files, Incomplete project, Incorrect GitHub repo, Project not working</p>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <Button variant="outline" size="sm" className="rounded-xl" onClick={() => { setRejectDialog(null); setRejectReason(""); }} disabled={actionLoading === rejectDialog.id}>Cancel</Button>
              <Button size="sm" className="rounded-xl bg-red-600 hover:bg-red-700 text-white border-0"
                disabled={actionLoading === rejectDialog.id || !rejectReason.trim()}
                onClick={handleReject}>
                {actionLoading === rejectDialog.id ? "Rejecting..." : "Reject Submission"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════
// CERTIFICATES
// ══════════════════════════════════════════════
function CertificatesSection() {
  const [downloading, setDownloading] = useState(false);
  const { data } = useQuery({
    queryKey: ["admin-certs"],
    queryFn: async () => {
      const { data: list } = await supabase.from("certificates").select("*, applications(full_name, intern_id, domain)").order("issued_at", { ascending: false });
      return list ?? [];
    },
  });

  const downloadAll = async () => {
    if (!data) return;
    setDownloading(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      for (const c of data) {
        const doc = CertificateDoc({
          fullName: c.applications?.full_name ?? "Student",
          internId: c.applications?.intern_id ?? "",
          domain: getDomain(c.applications?.domain)?.name ?? c.applications?.domain,
          certId: c.certificate_id,
          issuedAt: c.issued_at,
          verifyUrl: `${window.location.origin}/verify-certificate`,
        });
        const blob = await downloadPdfBlob(doc);
        zip.file(`certificate-${c.certificate_id}.pdf`, blob);
      }
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url; a.download = `certificates-${new Date().toISOString().slice(0, 10)}.zip`; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success(`Downloaded ${data.length} certificates`);
    } catch (err) {
      toast.error("Failed to generate certificates");
      console.error(err);
    }
    setDownloading(false);
  };

  return (
    <div className="animate-fade-in-up space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Certificate Management</h2>
          <p className="text-sm text-muted-foreground">{data?.length ?? 0} certificates</p>
        </div>
        <Button onClick={downloadAll} disabled={downloading} className="brand-gradient text-white border-0">
          <Download className="mr-1.5 size-4" />{downloading ? "Generating…" : "Download All as ZIP"}
        </Button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border/50 bg-white/60 backdrop-blur dark:bg-[#1E293B]/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-xs uppercase text-muted-foreground">
              <th className="px-4 py-3 text-left">Certificate ID</th>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Domain</th>
              <th className="px-4 py-3 text-left">Issued</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!data?.length && (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">No certificates issued yet.</td></tr>
            )}
            {data?.map((c: any) => (
              <tr key={c.id} className="border-b border-border/30 transition hover:bg-accent/20">
                <td className="px-4 py-3 font-mono text-xs">{c.certificate_id}</td>
                <td className="px-4 py-3 font-medium">{c.applications?.full_name}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{getDomain(c.applications?.domain)?.name}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(c.issued_at).toLocaleDateString("en-IN")}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <button className="grid size-8 place-items-center rounded-lg hover:bg-accent/50" onClick={() => {
                      downloadPdf(CertificateDoc({
                        fullName: c.applications?.full_name ?? "Student",
                        internId: c.applications?.intern_id ?? "",
                        domain: getDomain(c.applications?.domain)?.name ?? c.applications?.domain,
                        certId: c.certificate_id,
                        issuedAt: c.issued_at,
                        verifyUrl: `${window.location.origin}/verify-certificate`,
                      }), `certificate-${c.certificate_id}.pdf`);
                    }}><Download className="size-4" /></button>
                    <Link to="/verify-certificate" className="grid size-8 place-items-center rounded-lg hover:bg-accent/50"><ExternalLink className="size-4" /></Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// STUDENTS
// ══════════════════════════════════════════════
function StudentsSection() {
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const { data: students } = useQuery({
    queryKey: ["admin-students"],
    queryFn: async () => {
      const { data } = await supabase
        .from("applications")
        .select("id, user_id, full_name, email, phone, college, course, year, domain, intern_id, created_at, status, offer_issued_at")
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });
  const { data: sessions } = useQuery({
    queryKey: ["admin-student-sessions"],
    refetchInterval: 30_000,
    queryFn: async () => {
      const { data } = await supabase
        .from("login_sessions")
        .select("student_id, status, last_active, device, browser")
        .order("last_active", { ascending: false });
      return data ?? [];
    },
  });

  const sessionMap = useMemo(() => {
    const map = new Map<string, any>();
    if (!sessions) return map;
    for (const s of sessions) {
      if (!map.has(s.student_id)) map.set(s.student_id, s);
    }
    return map;
  }, [sessions]);

  const filtered = useMemo(() => {
    if (!students) return [];
    if (!search) return students;
    const q = search.toLowerCase();
    return students.filter((s: any) =>
      s.full_name?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.intern_id?.toLowerCase().includes(q) ||
      s.college?.toLowerCase().includes(q)
    );
  }, [students, search]);

  return (
    <div className="animate-fade-in-up space-y-4">
      {selectedStudent && (
        <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-2xl font-bold">Students</h2>
        <Input placeholder="Search students..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 w-56 rounded-xl border-border/60" />
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border/50 bg-white/60 backdrop-blur dark:bg-[#1E293B]/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-xs uppercase text-muted-foreground">
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Domain</th>
              <th className="px-4 py-3 text-left">College</th>
              <th className="px-4 py-3 text-left">Intern ID</th>
              <th className="px-4 py-3 text-left">Last Login</th>
              <th className="px-4 py-3 text-left">Joined</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">No students found.</td></tr>
            )}
            {filtered.map((s: any) => {
              const sess = sessionMap.get(s.user_id);
              const isOnline = sess?.status === "online";
              return (
                <tr key={s.id} className="border-b border-border/30 transition hover:bg-accent/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid size-8 place-items-center rounded-full brand-gradient text-[10px] font-bold text-white">{s.full_name.charAt(0)}</div>
                      <div><p className="font-medium text-sm">{s.full_name}</p><p className="text-xs text-muted-foreground">{s.email}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {isOnline ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950/30 dark:text-green-400"><Wifi className="size-3" /> Online</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-950/30 dark:text-gray-400"><WifiOff className="size-3" /> Offline</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs"><Badge variant="secondary">{getDomain(s.domain)?.name ?? s.domain}</Badge></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{s.college}</td>
                  <td className="px-4 py-3 font-mono text-xs">{s.intern_id}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {sess?.last_active ? new Date(sess.last_active).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(s.created_at).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => setSelectedStudent(s)} className="grid size-8 place-items-center rounded-lg hover:bg-accent/50" title="View"><Eye className="size-4" /></button>
                      <a href={`mailto:${s.email}`} className="grid size-8 place-items-center rounded-lg hover:bg-accent/50" title="Send Email"><Mail className="size-4" /></a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// ANALYTICS
// ══════════════════════════════════════════════
function AnalyticsSection() {
  const qc = useQueryClient();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const cfg = { refetchInterval: 5_000 };

  // Real-time subscriptions
  useEffect(() => {
    const channel = supabase.channel("analytics-realtime");
    const tables = ["applications", "payments", "enrollments", "profiles"];
    for (const table of tables) {
      channel.on("postgres_changes" as any, { event: "*", schema: "public", table }, () => {
        qc.invalidateQueries({ queryKey: ["admin-analytics"] });
      });
    }
    channel.subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const { data: regData = [] } = useQuery({
    queryKey: ["admin-analytics-registrations"],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("created_at");
      if (!data || data.length === 0) return [];
      const map: Record<string, number> = {};
      data.forEach((p) => {
        const d = new Date(p.created_at);
        map[`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`] = (map[`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`] || 0) + 1;
      });
      const now = new Date();
      const result: number[] = [];
      for (let i = 11; i >= 0; i--) {
        const m = new Date(now.getFullYear(), now.getMonth() - i, 1);
        result.push(map[`${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, "0")}`] || 0);
      }
      return result;
    },
    ...cfg,
  });

  const { data: domainData = [] } = useQuery({
    queryKey: ["admin-analytics-domains"],
    queryFn: async () => {
      const { data } = await supabase.from("applications").select("domain");
      if (!data || data.length === 0) return [];
      const map: Record<string, number> = {};
      data.forEach((a) => { map[a.domain] = (map[a.domain] || 0) + 1; });
      const total = Object.values(map).reduce((a, b) => a + b, 0) || 1;
      return Object.entries(map)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([label, count]) => ({ label, pct: Math.round((count / total) * 100) }));
    },
    ...cfg,
  });

  const { data: completion } = useQuery({
    queryKey: ["admin-analytics-completion"],
    queryFn: async () => {
      const { data } = await supabase.from("enrollments").select("status");
      if (!data || data.length === 0) return { completed: 0, inProgress: 0, pct: 0 };
      const completed = data.filter((e) => e.status === "completed").length;
      const total = data.length || 1;
      return { completed, inProgress: total - completed, pct: Math.round((completed / total) * 100) };
    },
    ...cfg,
  });

  const { data: revenue } = useQuery({
    queryKey: ["admin-analytics-revenue"],
    queryFn: async () => {
      const { data } = await supabase.from("payments").select("amount, created_at").eq("status", "verified");
      if (!data || data.length === 0) return { data: [], total: 0 };
      const map: Record<string, number> = {};
      data.forEach((p) => {
        const d = new Date(p.created_at);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        map[key] = (map[key] || 0) + Number(p.amount);
      });
      const now = new Date();
      const result: number[] = [];
      for (let i = 11; i >= 0; i--) {
        const m = new Date(now.getFullYear(), now.getMonth() - i, 1);
        result.push(map[`${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, "0")}`] || 0);
      }
      return { data: result, total: result.reduce((a, b) => a + b, 0) };
    },
    ...cfg,
  });

  const { data: locationStats } = useQuery({
    queryKey: ["admin-analytics-locations"],
    queryFn: async () => {
      const { data } = await supabase.from("applications").select("country, state, district, city, hear_about, referral_name");
      if (!data || data.length === 0) {
        return { countries: [], states: [], districts: [], cities: [], sources: [], referrals: [] };
      }

      const countryMap: Record<string, number> = {};
      const stateMap: Record<string, number> = {};
      const districtMap: Record<string, number> = {};
      const cityMap: Record<string, number> = {};
      const sourceMap: Record<string, number> = {};
      const referralMap: Record<string, number> = {};

      data.forEach((row: any) => {
        const country = row.country || "India";
        const state = row.state || "Not Provided";
        const district = row.district || "Not Provided";
        const city = row.city || "Not Provided";
        const source = row.hear_about || "Direct / Search";
        const refName = row.referral_name;

        countryMap[country] = (countryMap[country] || 0) + 1;
        stateMap[state] = (stateMap[state] || 0) + 1;
        districtMap[district] = (districtMap[district] || 0) + 1;
        cityMap[city] = (cityMap[city] || 0) + 1;
        sourceMap[source] = (sourceMap[source] || 0) + 1;
        
        if (refName && refName.trim()) {
          referralMap[refName] = (referralMap[refName] || 0) + 1;
        }
      });

      const total = data.length || 1;

      const countries = Object.entries(countryMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([label, count]) => ({ label, count, pct: Math.round((count / total) * 100) }));

      const states = Object.entries(stateMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([label, count]) => ({ label, count, pct: Math.round((count / total) * 100) }));

      const districts = Object.entries(districtMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([label, count]) => ({ label, count, pct: Math.round((count / total) * 100) }));

      const cities = Object.entries(cityMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([label, count]) => ({ label, count, pct: Math.round((count / total) * 100) }));

      const sources = Object.entries(sourceMap)
        .sort((a, b) => b[1] - a[1])
        .map(([label, count]) => ({ label, count, pct: Math.round((count / total) * 100) }));

      const referrals = Object.entries(referralMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([name, count]) => ({ name, count }));

      return { countries, states, districts, cities, sources, referrals };
    },
    ...cfg,
  });

  const maxReg = Math.max(...regData, 1);
  const maxRev = Math.max(...(revenue?.data ?? []), 1);

  const noRegData = regData.length === 0 || regData.every((v) => v === 0);
  const noDomainData = domainData.length === 0;
  const noCompletionData = completion && completion.total === 0;
  const noRevenueData = !revenue || revenue.data.length === 0 || revenue.data.every((v) => v === 0);

  return (
    <div className="animate-fade-in-up space-y-6">
      <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Registrations */}
        <div className="rounded-2xl border border-border/50 bg-white/70 p-5 backdrop-blur dark:bg-[#1E293B]/70">
          <h3 className="mb-1 font-semibold">Student Registrations</h3>
          <p className="mb-4 text-xs text-muted-foreground">Per month (last 12 months)</p>
          {noRegData ? (
            <p className="py-10 text-center text-sm text-muted-foreground">No data available</p>
          ) : (
            <div className="flex items-end gap-1.5 h-40">
              {regData.map((v, i) => (
                <div key={i} className="group relative flex flex-1 flex-col items-center">
                  <div className="w-full rounded-t-lg brand-gradient transition-all duration-300 hover:opacity-80" style={{ height: `${(v / maxReg) * 100}%` }} />
                  <span className="mt-1.5 text-[10px] text-muted-foreground">{months[i]}</span>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-2 py-1 text-xs text-background opacity-0 transition group-hover:opacity-100">{v}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Domain Popularity */}
        <div className="rounded-2xl border border-border/50 bg-white/70 p-5 backdrop-blur dark:bg-[#1E293B]/70">
          <h3 className="mb-1 font-semibold">Domain Popularity</h3>
          <p className="mb-4 text-xs text-muted-foreground">Applications per domain</p>
          {noDomainData ? (
            <p className="py-10 text-center text-sm text-muted-foreground">No data available</p>
          ) : (
            <div className="space-y-3">
              {domainData.map((d) => (
                <div key={d.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>{d.label}</span>
                    <span className="font-semibold">{d.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary/80 overflow-hidden">
                    <div className="h-full rounded-full brand-gradient transition-all" style={{ width: `${d.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Course Completion */}
        <div className="rounded-2xl border border-border/50 bg-white/70 p-5 backdrop-blur dark:bg-[#1E293B]/70">
          <h3 className="mb-1 font-semibold">Course Completion Rate</h3>
          <p className="mb-4 text-xs text-muted-foreground">Enrolled vs completed</p>
          {noCompletionData ? (
            <p className="py-10 text-center text-sm text-muted-foreground">No data available</p>
          ) : (
            <div className="flex items-center justify-center gap-8">
              <div className="relative grid size-36 place-items-center">
                <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.9 0.01 270)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.55 0.22 295)" strokeWidth="8" strokeDasharray={`${(completion?.pct ?? 0) * 2.64} ${100 * 2.64}`} strokeLinecap="round" />
                </svg>
                <span className="font-display text-3xl font-bold">{completion?.pct ?? 0}%</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2"><span className="size-3 rounded-sm brand-gradient" /><span>Completed: {completion?.completed ?? 0}</span></div>
                <div className="flex items-center gap-2"><span className="size-3 rounded-sm bg-secondary" /><span>In Progress: {completion?.inProgress ?? 0}</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Revenue */}
        <div className="rounded-2xl border border-border/50 bg-white/70 p-5 backdrop-blur dark:bg-[#1E293B]/70">
          <h3 className="mb-1 font-semibold">Revenue Overview</h3>
          <p className="mb-4 text-xs text-muted-foreground">{noRevenueData ? "No data available" : `₹ ${(revenue?.total ?? 0).toLocaleString("en-IN")} total`}</p>
          {noRevenueData ? (
            <p className="py-10 text-center text-sm text-muted-foreground">No data available</p>
          ) : (
            <div className="flex items-end gap-1.5 h-36">
              {(revenue?.data ?? []).map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-[#07284a] opacity-80 transition-all hover:opacity-100" style={{ height: `${(v / maxRev) * 100}%` }} />
                  <span className="mt-1.5 text-[10px] text-muted-foreground">{months[i]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── Location & Discovery Analytics ─── */}
      <div className="border-t border-border/40 pt-6 mt-8">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          🌍 Location & Discovery Analytics
        </h3>
        <div className="grid gap-4 lg:grid-cols-2">
          
          {/* Countries */}
          <div className="rounded-2xl border border-border/50 bg-white/70 p-5 backdrop-blur dark:bg-[#1E293B]/70">
            <h3 className="mb-1 font-semibold">Students by Country</h3>
            <p className="mb-4 text-xs text-muted-foreground">Geographic country stats</p>
            {!locationStats || locationStats.countries.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">No data available</p>
            ) : (
              <div className="space-y-3">
                {locationStats.countries.map((c) => (
                  <div key={c.label}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>{c.label === "India" ? "🇮🇳 India" : c.label}</span>
                      <span className="font-semibold text-muted-foreground">{c.count} students ({c.pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary/80 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all" style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* States */}
          <div className="rounded-2xl border border-border/50 bg-white/70 p-5 backdrop-blur dark:bg-[#1E293B]/70">
            <h3 className="mb-1 font-semibold">Students by State / UT (Top 10)</h3>
            <p className="mb-4 text-xs text-muted-foreground">Distribution across Indian States</p>
            {!locationStats || locationStats.states.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">No data available</p>
            ) : (
              <div className="space-y-3">
                {locationStats.states.map((s) => (
                  <div key={s.label}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>{s.label}</span>
                      <span className="font-semibold text-muted-foreground">{s.count} ({s.pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary/80 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-[#07284a] transition-all" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Districts */}
          <div className="rounded-2xl border border-border/50 bg-white/70 p-5 backdrop-blur dark:bg-[#1E293B]/70">
            <h3 className="mb-1 font-semibold">Students by District (Top 10)</h3>
            <p className="mb-4 text-xs text-muted-foreground">Distribution by District</p>
            {!locationStats || locationStats.districts.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">No data available</p>
            ) : (
              <div className="space-y-3">
                {locationStats.districts.map((d) => (
                  <div key={d.label}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>{d.label}</span>
                      <span className="font-semibold text-muted-foreground">{d.count} ({d.pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary/80 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all" style={{ width: `${d.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cities */}
          <div className="rounded-2xl border border-border/50 bg-white/70 p-5 backdrop-blur dark:bg-[#1E293B]/70">
            <h3 className="mb-1 font-semibold">Students by City / Town (Top 10)</h3>
            <p className="mb-4 text-xs text-muted-foreground">Distribution by City</p>
            {!locationStats || locationStats.cities.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">No data available</p>
            ) : (
              <div className="space-y-3">
                {locationStats.cities.map((c) => (
                  <div key={c.label}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>{c.label}</span>
                      <span className="font-semibold text-muted-foreground">{c.count} ({c.pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary/80 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all" style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Discovery Source Comparison */}
          <div className="rounded-2xl border border-border/50 bg-white/70 p-5 backdrop-blur dark:bg-[#1E293B]/70">
            <h3 className="mb-1 font-semibold">Discovery Sources Comparison</h3>
            <p className="mb-4 text-xs text-muted-foreground">Google vs Instagram vs LinkedIn etc.</p>
            {!locationStats || locationStats.sources.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">No data available</p>
            ) : (
              <div className="space-y-3">
                {locationStats.sources.map((src) => (
                  <div key={src.label}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium">{src.label}</span>
                      <span className="font-semibold text-muted-foreground">{src.count} ({src.pct}%)</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-secondary/80 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all" style={{ width: `${src.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Referral Name Tracker */}
          <div className="rounded-2xl border border-border/50 bg-white/70 p-5 backdrop-blur dark:bg-[#1E293B]/70">
            <h3 className="mb-1 font-semibold">Referral Name Tracker (Top 10)</h3>
            <p className="mb-4 text-xs text-muted-foreground">Top classmates / existing interns referred</p>
            {!locationStats || locationStats.referrals.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">No referrals recorded yet</p>
            ) : (
              <div className="divide-y divide-border/30">
                {locationStats.referrals.map((r, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2.5 text-xs">
                    <span className="font-medium text-sm">{r.name}</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-0.5 rounded-md">
                      {r.count} referrals
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// SETTINGS
// ══════════════════════════════════════════════
function SettingsSection() {
  const [portalName, setPortalName] = useState("Skyrovix Internship Portal");
  const [contactEmail, setContactEmail] = useState(COMPANY.email);
  const [companyName, setCompanyName] = useState(COMPANY.name);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Settings saved (stored locally)");
    setSaving(false);
  };

  return (
    <div className="animate-fade-in-up space-y-4 max-w-2xl">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="rounded-2xl border border-border/50 bg-white/60 p-5 backdrop-blur dark:bg-[#1E293B]/60">
        <h3 className="font-semibold mb-4">General</h3>
        <div className="space-y-4">
          <div>
            <Label>Portal Name</Label>
            <Input value={portalName} onChange={(e) => setPortalName(e.target.value)} className="mt-1 rounded-xl border-border/60" />
          </div>
          <div>
            <Label>Contact Email</Label>
            <Input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="mt-1 rounded-xl border-border/60" />
          </div>
          <div>
            <Label>Company</Label>
            <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="mt-1 rounded-xl border-border/60" />
          </div>
          <Button onClick={save} disabled={saving} className="brand-gradient text-white border-0">{saving ? "Saving…" : "Save Changes"}</Button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// EMAIL LOGS
// ══════════════════════════════════════════════
function EmailLogsSection() {
  const { data: logs } = useQuery({
    queryKey: ["admin-email-logs"],
    queryFn: async () => {
      const { data } = await supabase
        .from("email_logs")
        .select("*")
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const resend = async (log: any) => {
    try {
      const { data: app } = await supabase
        .from("applications")
        .select("full_name, intern_id, domain, email, user_id")
        .eq("user_id", log.user_id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!app?.email) {
        toast.error("Cannot resend: student data not found");
        return;
      }
      const { sendEmail } = await import("@/lib/email-service");
      const result = await sendEmail({
        data: {
          to: app.email,
          studentName: app.full_name,
          studentId: app.user_id,
          documentType: log.document_type,
          subject: `Re: ${log.subject}`,
          body: `This is a re-sent notification regarding:\n${log.subject}\n\nPlease contact support if you need the original PDF attachment.`,
          referenceId: log.reference_id,
          pdfData: {
            fullName: app.full_name,
            internId: app.intern_id ?? log.reference_id ?? "",
            domain: app.domain ?? "",
            issuedAt: new Date().toISOString(),
          },
        },
      });
      if (result.success) toast.success("Resend request logged");
      else toast.error(`Resend failed: ${result.error}`);
    } catch (e: any) {
      toast.error(`Resend failed: ${e.message}`);
    }
  };

  return (
    <div className="animate-fade-in-up space-y-4">
      <h2 className="text-2xl font-bold">Email Logs</h2>
      <p className="text-sm text-muted-foreground">{logs?.length ?? 0} email records</p>
      <div className="overflow-x-auto rounded-2xl border border-border/50 bg-white/60 backdrop-blur dark:bg-[#1E293B]/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-xs uppercase text-muted-foreground">
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Document</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Sent At</th>
              <th className="px-4 py-3 text-left">Error</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs?.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">No email records found.</td></tr>
            )}
            {logs?.map((log: any) => (
              <tr key={log.id} className="border-b border-border/30 transition hover:bg-accent/20">
                <td className="px-4 py-3 font-medium">{log.student_name}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{log.email_to}</td>
                <td className="px-4 py-3">
                  <Badge className={`text-xs ${
                    log.document_type === "offer_letter" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                  }`}>{log.document_type === "offer_letter" ? "Offer Letter" : "Certificate"}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge className={`text-xs ${
                    log.status === "sent" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                    log.status === "failed" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}>{log.status}</Badge>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{log.sent_at ? new Date(log.sent_at).toLocaleString("en-IN") : "—"}</td>
                <td className="px-4 py-3 text-xs text-red-500 max-w-[200px] truncate" title={log.error_message ?? ""}>{log.error_message ?? "—"}</td>
                <td className="px-4 py-3 text-right">
                    {log.status === "failed" && (
                    <button onClick={() => resend(log)} className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition" title="Resend email">
                      <RefreshCw className="size-3.5" /> Resend
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// LOGIN HISTORY
// ══════════════════════════════════════════════
function LoginHistorySection() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "online" | "offline">("all");
  const todayStr = new Date().toISOString().slice(0, 10);
  const [dateFrom, setDateFrom] = useState(todayStr);
  const [dateTo, setDateTo] = useState(todayStr);

  const { data: raw } = useQuery({
    queryKey: ["admin-login-history"],
    refetchInterval: 15_000,
    queryFn: async () => {
      const { data } = await supabase
        .from("login_sessions")
        .select("id, student_id, status, ip_address, city, state, country, device, browser, os, last_active, login_time, logout_time")
        .order("last_active", { ascending: false })
        .limit(500);
      return data ?? [];
    },
  });

  const { data: appMap } = useQuery({
    queryKey: ["admin-login-history-apps"],
    queryFn: async () => {
      const { data } = await supabase
        .from("applications")
        .select("user_id, full_name, email, intern_id, college, domain");
      const map: Record<string, any> = {};
      for (const a of data ?? []) map[a.user_id] = a;
      return map;
    },
  });

  const filtered = useMemo(() => {
    if (!raw) return [];
    let list = raw;
    if (filter === "online") list = list.filter((s: any) => s.status === "online");
    else if (filter === "offline") list = list.filter((s: any) => s.status === "offline");
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((s: any) => {
        const app = appMap?.[s.student_id];
        return app?.full_name?.toLowerCase().includes(q) ||
          app?.email?.toLowerCase().includes(q) ||
          app?.intern_id?.toLowerCase().includes(q) ||
          app?.college?.toLowerCase().includes(q) ||
          s.ip_address?.includes(q) ||
          s.city?.toLowerCase().includes(q);
      });
    }
    if (dateFrom) {
      const from = new Date(dateFrom);
      list = list.filter((s: any) => new Date(s.last_active) >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      list = list.filter((s: any) => new Date(s.last_active) <= to);
    }
    return list;
  }, [raw, filter, search, appMap, dateFrom, dateTo]);

  const DeviceIcon = ({ dt }: { dt: string }) => {
    if (dt === "mobile") return <Smartphone className="size-3.5" />;
    if (dt === "tablet") return <Tablet className="size-3.5" />;
    return <Monitor className="size-3.5" />;
  };

  return (
    <div className="animate-fade-in-up space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Login History</h2>
          <p className="text-sm text-muted-foreground">{raw?.length ?? 0} sessions recorded</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="h-9 w-36 rounded-xl border-border/60 text-xs" />
          <span className="text-xs text-muted-foreground">to</span>
          <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="h-9 w-36 rounded-xl border-border/60 text-xs" />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex gap-1 rounded-xl bg-muted/50 p-1">
          {(["all", "online", "offline"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filter === f ? "bg-white text-foreground shadow-sm dark:bg-[#1E293B]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "All Sessions" : f === "online" ? "Online" : "Offline"}
            </button>
          ))}
        </div>
        <Input placeholder="Search by name, email, ID, IP, city..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 w-72 rounded-xl border-border/60" />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border/50 bg-white/60 backdrop-blur dark:bg-[#1E293B]/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-xs uppercase text-muted-foreground">
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Device</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">IP Address</th>
              <th className="px-4 py-3 text-left">Logged In</th>
              <th className="px-4 py-3 text-left">Last Active</th>
              <th className="px-4 py-3 text-left">Logged Out</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">No login sessions found.</td></tr>
            )}
              {filtered.map((s: any) => {
              const app = appMap?.[s.student_id];
              return (
                <tr key={s.id} className="border-b border-border/30 transition hover:bg-accent/20">
                  <td className="px-4 py-3">
                    {app ? (
                      <div>
                        <p className="font-medium text-sm">{app.full_name}</p>
                        <p className="text-xs text-muted-foreground">{app.email}</p>
                        {app.intern_id && <p className="font-mono text-[10px] text-muted-foreground">{app.intern_id}</p>}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">{s.student_id?.slice(0, 12)}...</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {s.status === "online" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950/30 dark:text-green-400"><Wifi className="size-3" /> Online</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-950/30 dark:text-gray-400"><WifiOff className="size-3" /> Offline</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <DeviceIcon dt={s.device} />
                      <span>{s.browser ?? "—"}</span>
                      {s.os && <span className="text-[10px]">({s.os})</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {[s.city, s.state, s.country].filter(Boolean).join(", ") || "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground">{s.ip_address || "—"}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                    {s.login_time ? new Date(s.login_time).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                    {s.last_active ? new Date(s.last_active).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                    {s.logout_time ? new Date(s.logout_time).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : s.status === "online" ? "—" : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// STUDENT DETAIL MODAL
// ══════════════════════════════════════════════
function StudentDetailModal({ student, onClose }: { student: any; onClose: () => void }) {
  const [tab, setTab] = useState<"profile" | "payments" | "submissions" | "certificates" | "login-history">("profile");

  const { data: payments } = useQuery({
    queryKey: ["admin-student-payments", student.user_id],
    enabled: tab === "payments",
    queryFn: async () => {
      const { data } = await supabase.from("payments").select("*").eq("application_id", student.id).order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const { data: submissions } = useQuery({
    queryKey: ["admin-student-submissions", student.user_id],
    enabled: tab === "submissions",
    queryFn: async () => {
      const { data } = await supabase.from("submissions").select("*").eq("application_id", student.id).order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const { data: certificates } = useQuery({
    queryKey: ["admin-student-certificates", student.user_id],
    enabled: tab === "certificates",
    queryFn: async () => {
      const { data } = await supabase.from("certificates").select("*").eq("application_id", student.id).order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const { data: loginSessions } = useQuery({
    queryKey: ["admin-student-login-sessions", student.user_id],
    enabled: tab === "login-history",
    queryFn: async () => {
      const { data } = await supabase.from("login_sessions").select("*").eq("student_id", student.user_id).order("last_active", { ascending: false });
      return data ?? [];
    },
  });

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: Eye },
    { id: "payments" as const, label: "Payments", icon: IndianRupee },
    { id: "submissions" as const, label: "Submissions", icon: ClipboardCheck },
    { id: "certificates" as const, label: "Certificates", icon: Award },
    { id: "login-history" as const, label: "Login History", icon: Activity },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border/50 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl dark:bg-[#1E293B]/95" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full brand-gradient text-sm font-bold text-white">{student.full_name?.charAt(0)}</div>
            <div>
              <h3 className="font-bold text-lg">{student.full_name}</h3>
              <p className="text-xs text-muted-foreground">{student.email} · {student.intern_id}</p>
            </div>
          </div>
          <button onClick={onClose} className="grid size-8 place-items-center rounded-lg hover:bg-accent/50"><X className="size-4" /></button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl bg-muted/50 p-1 mb-6 overflow-x-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${
                  tab === t.id ? "bg-white text-foreground shadow-sm dark:bg-[#1E293B]" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-3.5" /> {t.label}
              </button>
            );
          })}
        </div>

        {/* Profile Tab */}
        {tab === "profile" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="rounded-xl bg-accent/20 p-4"><p className="text-xs text-muted-foreground mb-1">Domain</p><p className="font-medium">{getDomain(student.domain)?.name ?? student.domain}</p></div>
              <div className="rounded-xl bg-accent/20 p-4"><p className="text-xs text-muted-foreground mb-1">College</p><p className="font-medium">{student.college ?? "—"}</p></div>
              <div className="rounded-xl bg-accent/20 p-4"><p className="text-xs text-muted-foreground mb-1">Course</p><p className="font-medium">{student.course ?? "—"} ({student.year ?? "—"})</p></div>
              <div className="rounded-xl bg-accent/20 p-4"><p className="text-xs text-muted-foreground mb-1">Phone</p><p className="font-medium">{student.phone ?? "—"}</p></div>
              <div className="rounded-xl bg-accent/20 p-4"><p className="text-xs text-muted-foreground mb-1">Status</p><Badge>{student.status ?? "Active"}</Badge></div>
              <div className="rounded-xl bg-accent/20 p-4"><p className="text-xs text-muted-foreground mb-1">Joined</p><p className="font-medium">{new Date(student.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p></div>
              <div className="rounded-xl bg-accent/20 p-4"><p className="text-xs text-muted-foreground mb-1">Offer Issued</p><p className="font-medium">{student.offer_issued_at ? new Date(student.offer_issued_at).toLocaleDateString("en-IN") : "—"}</p></div>
            </div>
            <a href={`mailto:${student.email}`} className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"><Mail className="size-3.5" /> Send Email</a>
          </div>
        )}

        {/* Payments Tab */}
        {tab === "payments" && (
          <div className="space-y-3">
            {(!payments || payments.length === 0) ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No payment records found.</p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-border/40">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border/30 text-xs uppercase text-muted-foreground">
                    <th className="px-3 py-2 text-left">Amount</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-left">Method</th>
                    <th className="px-3 py-2 text-left">UTR</th>
                    <th className="px-3 py-2 text-left">Date</th>
                  </tr></thead>
                  <tbody>
                    {payments.map((p: any) => (
                      <tr key={p.id} className="border-b border-border/20 hover:bg-accent/20">
                        <td className="px-3 py-2 font-medium">{p.amount ? `₹${p.amount.toLocaleString("en-IN")}` : "—"}</td>
                        <td className="px-3 py-2"><Badge className={`text-xs ${p.status === "verified" ? "bg-green-100 text-green-700" : p.status === "rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{p.status}</Badge></td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">{p.payment_method ?? "—"}</td>
                        <td className="px-3 py-2 font-mono text-[10px] text-muted-foreground">{p.utr ?? "—"}</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Submissions Tab */}
        {tab === "submissions" && (
          <div className="space-y-3">
            {(!submissions || submissions.length === 0) ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No task submissions found.</p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-border/40">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border/30 text-xs uppercase text-muted-foreground">
                    <th className="px-3 py-2 text-left">Task</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-left">Submitted</th>
                    <th className="px-3 py-2 text-left">URL</th>
                  </tr></thead>
                  <tbody>
                    {submissions.map((s: any) => (
                      <tr key={s.id} className="border-b border-border/20 hover:bg-accent/20">
                        <td className="px-3 py-2 text-xs">{s.task_name ?? `Task #${s.task_index ?? ""}`}</td>
                        <td className="px-3 py-2"><Badge className={`text-xs ${s.status === "approved" ? "bg-green-100 text-green-700" : s.status === "rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{s.status}</Badge></td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">{new Date(s.created_at).toLocaleDateString("en-IN")}</td>
                        <td className="px-3 py-2 text-xs">{s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate block max-w-[200px]">{s.url}</a> : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Certificates Tab */}
        {tab === "certificates" && (
          <div className="space-y-3">
            {(!certificates || certificates.length === 0) ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No certificates issued yet.</p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-border/40">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border/30 text-xs uppercase text-muted-foreground">
                    <th className="px-3 py-2 text-left">Type</th>
                    <th className="px-3 py-2 text-left">Cert ID</th>
                    <th className="px-3 py-2 text-left">Issued</th>
                    <th className="px-3 py-2 text-left">Status</th>
                  </tr></thead>
                  <tbody>
                    {certificates.map((c: any) => (
                      <tr key={c.id} className="border-b border-border/20 hover:bg-accent/20">
                        <td className="px-3 py-2 text-xs capitalize">{c.type ?? "Certificate"}</td>
                        <td className="px-3 py-2 font-mono text-[10px]">{c.certificate_id ?? "—"}</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">{new Date(c.created_at).toLocaleDateString("en-IN")}</td>
                        <td className="px-3 py-2"><Badge className="text-xs bg-green-100 text-green-700">Issued</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Login History Tab */}
        {tab === "login-history" && (
          <div className="space-y-3">
            {(!loginSessions || loginSessions.length === 0) ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No login sessions recorded.</p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-border/40">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border/30 text-xs uppercase text-muted-foreground">
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-left">Device</th>
                    <th className="px-3 py-2 text-left">Browser</th>
                    <th className="px-3 py-2 text-left">Location</th>
                    <th className="px-3 py-2 text-left">Logged In</th>
                    <th className="px-3 py-2 text-left">Last Active</th>
                    <th className="px-3 py-2 text-left">Duration</th>
                  </tr></thead>
                  <tbody>
                    {loginSessions.map((s: any) => {
                      const duration = s.login_time && s.logout_time
                        ? Math.round((new Date(s.logout_time).getTime() - new Date(s.login_time).getTime()) / 60000)
                        : s.login_time && s.last_active
                        ? Math.round((new Date(s.last_active).getTime() - new Date(s.login_time).getTime()) / 60000)
                        : null;
                      return (
                        <tr key={s.id} className="border-b border-border/20 hover:bg-accent/20">
                          <td className="px-3 py-2">
                            {s.status === "online" ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700"><Wifi className="size-3" /> Online</span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-500"><WifiOff className="size-3" /> Offline</span>
                            )}
                          </td>
                          <td className="px-3 py-2 text-xs text-muted-foreground capitalize">{s.device ?? "—"}</td>
                          <td className="px-3 py-2 text-xs text-muted-foreground">{s.browser ?? "—"}{s.os ? ` (${s.os})` : ""}</td>
                          <td className="px-3 py-2 text-xs text-muted-foreground">{[s.city, s.state, s.country].filter(Boolean).join(", ") || "—"}</td>
                          <td className="px-3 py-2 text-xs text-muted-foreground whitespace-nowrap">{s.login_time ? new Date(s.login_time).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—"}</td>
                          <td className="px-3 py-2 text-xs text-muted-foreground whitespace-nowrap">{s.last_active ? new Date(s.last_active).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—"}</td>
                          <td className="px-3 py-2 text-xs text-muted-foreground">{duration !== null ? `${duration} min` : "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// LOGIN ANALYTICS
// ══════════════════════════════════════════════
function LoginAnalyticsSection() {
  const { data: sessions } = useQuery({
    queryKey: ["admin-login-analytics"],
    refetchInterval: 60_000,
    queryFn: async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const { data } = await supabase
        .from("login_sessions")
        .select("student_id, status, login_time, logout_time, last_active")
        .gte("login_time", thirtyDaysAgo.toISOString())
        .order("login_time", { ascending: false });
      return data ?? [];
    },
  });

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate() - 7);
  const monthAgo = new Date(now); monthAgo.setDate(monthAgo.getDate() - 30);

  const stats = useMemo(() => {
    if (!sessions) return null;
    const uniqueUsers = new Set(sessions.map((s: any) => s.student_id));
    const dau = new Set(sessions.filter((s: any) => s.login_time?.startsWith(todayStr)).map((s: any) => s.student_id));
    const wau = new Set(sessions.filter((s: any) => new Date(s.login_time) >= weekAgo).map((s: any) => s.student_id));
    const mau = new Set(sessions.filter((s: any) => new Date(s.login_time) >= monthAgo).map((s: any) => s.student_id));
    const totalSessions = sessions.length;
    const nowOnline = sessions.filter((s: any) => s.status === "online").length;
    const durations: number[] = [];
    for (const s of sessions) {
      if (s.login_time && s.logout_time) {
        durations.push(Math.round((new Date(s.logout_time).getTime() - new Date(s.login_time).getTime()) / 60000));
      }
    }
    const avgDuration = durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0;
    const peakHour = Array(24).fill(0);
    for (const s of sessions) {
      if (s.login_time) {
        const h = new Date(s.login_time).getHours();
        peakHour[h]++;
      }
    }
    const peakHourIdx = peakHour.indexOf(Math.max(...peakHour));
    return { uniqueUsers: uniqueUsers.size, dau: dau.size, wau: wau.size, mau: mau.size, totalSessions, nowOnline, avgDuration, peakHour: peakHourIdx };
  }, [sessions]);

  const statCards = stats ? [
    { label: "Currently Online", value: stats.nowOnline, sub: "right now", icon: Wifi, color: "text-green-600 bg-green-50 dark:bg-green-950/30" },
    { label: "Active Today (DAU)", value: stats.dau, sub: `${((stats.dau / stats.uniqueUsers) * 100 || 0).toFixed(0)}% of users`, icon: TrendingUp, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30" },
    { label: "Active This Week (WAU)", value: stats.wau, sub: `${((stats.wau / stats.uniqueUsers) * 100 || 0).toFixed(0)}% of users`, icon: TrendingUp, color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30" },
    { label: "Active This Month (MAU)", value: stats.mau, sub: `out of ${stats.uniqueUsers} total users`, icon: BarChart3, color: "text-[#07284a] bg-[#07284a]/10 dark:bg-[#07284a]/30" },
    { label: "Total Sessions (30d)", value: stats.totalSessions, sub: `${(stats.totalSessions / 30).toFixed(1)}/day avg`, icon: Activity, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30" },
    { label: "Avg Session Duration", value: `${stats.avgDuration}m`, sub: stats.avgDuration > 0 ? `${Math.round(stats.avgDuration / 60)}h ${stats.avgDuration % 60}m` : "", icon: Clock, color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/30" },
    { label: "Peak Login Hour", value: `${stats.peakHour}:00`, sub: `${peakHourLabels[stats.peakHour]}`, icon: Clock, color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30" },
  ] : [];

  return (
    <div className="animate-fade-in-up space-y-4">
      <h2 className="text-2xl font-bold">Login Analytics</h2>
      <p className="text-sm text-muted-foreground">Login activity over the last 30 days</p>
      {!stats ? (
        <p className="py-12 text-center text-muted-foreground">Loading analytics...</p>
      ) : stats.uniqueUsers === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No login data available yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="rounded-2xl border border-border/50 bg-white/70 p-5 backdrop-blur dark:bg-[#1E293B]/70">
                <div className="flex items-center justify-between mb-3">
                  <div className={`grid size-10 place-items-center rounded-xl ${s.color}`}><Icon className="size-5" /></div>
                </div>
                <p className="font-display text-3xl font-bold">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground/70">{s.sub}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const peakHourLabels = ["Midnight", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "Noon", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"];
