import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, LayoutDashboard, Shield, Menu, X, BookOpen, ListChecks, Award, User, Home, Briefcase, Mail, BadgeCheck, Info, Moon, Sparkles, Code2, Share2, HelpCircle, Package, CreditCard, MessageSquare } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/domains", label: "Internship", icon: Briefcase },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: Mail },
  { to: "/verify-certificate", label: "Verify", icon: BadgeCheck },
] as const;

const DASHBOARD_ITEMS = [
  { to: "/dashboard", label: "My Tasks", icon: ListChecks, search: { tab: "tasks" } },
  { to: "/dashboard", label: "My Internships", icon: Briefcase, search: { tab: "internships" } },
  { to: "/dashboard", label: "Payment", icon: CreditCard, search: { tab: "payment" } },
  { to: "/dashboard", label: "Certificates", icon: Award, search: { tab: "certificates" } },
  { to: "/dashboard", label: "Profile", icon: User, search: { tab: "profile" } },
  { to: "/review", label: "Review", icon: MessageSquare },
] as const;

export function Navbar() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const router = useRouterState();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const pathname = router.location.pathname;
  const currentTab = (router.location.search as Record<string, string | undefined>)?.tab;
  const isDashboardPage = pathname === "/dashboard" || pathname.startsWith("/review");
  const itemsToRender = isDashboardPage ? DASHBOARD_ITEMS : NAV;

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  const goTo = (to: string, search?: Record<string, string>) => {
    navigate({ to, search });
    setOpen(false);
  };

  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b ${
          scrolled 
            ? "bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-gray-200/80 dark:border-slate-800/80 shadow-sm"
            : "bg-white dark:bg-[#0f172a] border-gray-150 dark:border-slate-850"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between gap-4 w-full">
          <Link to="/" className="shrink-0 animate-fade-in" onClick={() => setOpen(false)}>
             <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex flex-1 items-stretch justify-center gap-4 xl:gap-6 min-w-0 h-full">
            {itemsToRender.map((n) => {
              const isActive = isDashboardPage
                ? (n.search?.tab ? currentTab === n.search.tab : !currentTab)
                : (n.to === "/" ? pathname === "/" : pathname.startsWith(n.to));
              const Icon = n.icon;
              return (
                <Link
                  key={n.label}
                  to={n.to}
                  search={"search" in n ? n.search : undefined}
                  activeOptions={{ exact: n.to === "/" }}
                  className={`relative whitespace-nowrap px-1 text-xs xl:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 h-full ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-blue-600 dark:after:bg-blue-400 font-bold"
                      : "text-gray-600 dark:text-slate-350 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <Icon className="size-4 shrink-0 text-muted-foreground" />
                  <span>{n.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 xl:gap-3 shrink-0">
            {user ? (
              <>
                <button onClick={() => setDark(!dark)}
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-slate-700 size-9 text-gray-700 dark:text-slate-350 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
                  {dark ? <Sparkles className="size-4" /> : <Moon className="size-4" />}
                </button>
                {isAdmin && (
                  <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex text-muted-foreground hover:text-foreground rounded-xl h-9 w-9 p-0 xl:w-auto xl:px-3 text-xs gap-1.5" title="Admin Panel">
                    <Link to="/admin">
                      <Shield className="size-4" />
                      <span className="hidden xl:inline">Admin</span>
                    </Link>
                  </Button>
                )}
                {/* Share with Friends */}
                <button
                  onClick={() => {
                    const url = window.location.origin;
                    if (navigator.share) {
                      navigator.share({ title: "Skyrovix Internship", text: "Check out this internship platform!", url });
                    } else {
                      navigator.clipboard.writeText(url);
                      toast.success("Link copied to clipboard!");
                    }
                  }}
                  className="hidden md:inline-flex items-center justify-center rounded-xl h-9 w-9 xl:w-auto xl:px-3 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-[#07284a]/5 dark:hover:bg-white/5 gap-1.5 transition-all"
                  title="Share"
                >
                  <Share2 className="size-4 text-violet-500" />
                  <span className="hidden xl:inline">Share</span>
                </button>

                {/* Logout */}
                <button
                  onClick={signOut}
                  className="hidden md:inline-flex items-center justify-center rounded-xl h-9 w-9 xl:w-auto xl:px-3 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 gap-1.5 transition-all"
                  title="Logout"
                >
                  <LogOut className="size-4" />
                  <span className="hidden xl:inline">Logout</span>
                </button>

                {/* User avatar */}
                <div className="hidden md:inline-flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  <span className="flex items-center justify-center size-7 rounded-full bg-[#07284a]/10 dark:bg-white/10 text-xs font-bold text-[#07284a] dark:text-white shrink-0">
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </span>
                  <span className="max-w-[70px] truncate hidden 2xl:inline">{user.email?.split("@")[0]}</span>
                </div>
              </>
            ) : (
              <>
                <button onClick={() => setDark(!dark)}
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-slate-700 size-9 text-gray-700 dark:text-slate-350 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
                  {dark ? <Sparkles className="size-4" /> : <Moon className="size-4" />}
                </button>
                <Button asChild size="sm" className="rounded-xl h-10 px-5 text-sm font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 flex items-center gap-1.5">
                  <Link to="/auth"><User className="size-4 shrink-0" />Login / Register</Link>
                </Button>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex xl:hidden items-center justify-center size-9 rounded-xl border border-border hover:bg-[#07284a]/5 dark:hover:bg-white/5 transition-all touch-target"
              aria-label="Toggle menu"
            >
              <span className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`}>
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile backdrop */}
      {open && <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm xl:hidden" onClick={() => setOpen(false)} />}

      {/* Mobile Menu */}
      {open && (
        <div
          ref={menuRef}
          className="fixed left-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 mt-2 rounded-2xl border border-border/60 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl shadow-xl overflow-hidden xl:hidden"
          style={{
            top: scrolled ? "calc(2.5rem + 6px)" : "calc(3.25rem + 6px)",
            animation: "fade-in-down 0.2s ease-out forwards",
          }}
        >
          <div className="flex flex-col gap-1 p-3">
            {user ? (
              <>
                <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 mb-2">
                  <span className="text-xs text-muted-foreground truncate max-w-[200px]">{user?.email}</span>
                  <button onClick={() => setDark(!dark)}
                    className="flex items-center justify-center size-8 rounded-lg hover:bg-[#07284a]/5 dark:hover:bg-white/5 transition-all">
                    {dark ? <Sparkles className="size-4" /> : <Moon className="size-4" />}
                  </button>
                </div>
                {itemsToRender.map((item, i) => {
                  const Icon = item.icon;
                  const active = isDashboardPage
                    ? (item.search?.tab ? currentTab === item.search.tab : !currentTab)
                    : (item.to === "/" ? pathname === "/" : pathname.startsWith(item.to));
                  return (
                    <button key={item.label} onClick={() => goTo(item.to, "search" in item ? item.search : undefined)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all w-full text-left ${
                        active
                          ? "bg-[#07284a]/8 dark:bg-white/10 text-[#07284a] dark:text-white font-bold"
                          : "text-muted-foreground hover:text-foreground hover:bg-[#07284a]/5 dark:hover:bg-white/5"
                      }`}
                      style={{ opacity: 0, animation: `fade-in-up 0.25s ease-out ${0.03 * i}s forwards` }}
                    >
                      <Icon className="size-4 shrink-0" />{item.label}
                    </button>
                  );
                })}
                <div className="my-2 border-t border-border" style={{ opacity: 0, animation: `fade-in-up 0.25s ease-out ${0.33}s forwards` }} />
                {isAdmin && (
                  <Link to="/admin" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-[#07284a]/5 dark:hover:bg-white/5 transition-all"
                    style={{ opacity: 0, animation: `fade-in-up 0.25s ease-out 0.36s forwards` }}>
                    <Shield className="size-4" /> Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    setOpen(false);
                    const url = window.location.origin;
                    if (navigator.share) {
                      navigator.share({ title: "Skyrovix Internship", text: "Check out this internship platform!", url });
                    } else {
                      navigator.clipboard.writeText(url);
                      toast.success("Link copied to clipboard!");
                    }
                  }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-[#07284a]/5 dark:hover:bg-white/5 transition-all w-full text-left"
                  style={{ opacity: 0, animation: `fade-in-up 0.25s ease-out 0.36s forwards` }}
                >
                  <Share2 className="size-4 shrink-0 text-violet-500" /> Share with Friends
                </button>
                <button onClick={() => { signOut(); setOpen(false); }} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-[#07284a]/5 dark:hover:bg-white/5 transition-all w-full text-left"
                  style={{ opacity: 0, animation: `fade-in-up 0.25s ease-out 0.39s forwards` }}>
                  <LogOut className="size-4" /> Sign out
                </button>
              </>
            ) : (
              <>
                {NAV.map((n, i) => {
                  const Icon = n.icon;
                  const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
                  return (
                    <button key={n.to} onClick={() => goTo(n.to)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all w-full text-left ${
                        active
                          ? "bg-[#07284a]/8 dark:bg-white/10 text-[#07284a] dark:text-white"
                          : "text-muted-foreground hover:text-foreground hover:bg-[#07284a]/5 dark:hover:bg-white/5"
                      }`}
                      style={{ opacity: 0, animation: `fade-in-up 0.25s ease-out ${0.03 * i}s forwards` }}
                    >
                      <Icon className="size-4 shrink-0" />{n.label}
                    </button>
                  );
                })}
                <div className="my-2 border-t border-border" />
                <Link to="/auth" onClick={() => setOpen(false)} className="mt-1 rounded-xl bg-[#07284a] px-4 py-3.5 text-center text-sm font-medium text-white">
                  Sign in to get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
