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
  { to: "/dashboard", label: "Help", icon: HelpCircle, search: { tab: "help" } },
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
        className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl transition-all duration-300 ${
          scrolled ? "top-2" : ""
        }`}
      >
        <nav
          className={`relative flex h-12 sm:h-14 items-center justify-between gap-2 rounded-2xl border px-3 sm:px-5 transition-all duration-300 ${
            scrolled
              ? "bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              : "bg-white/50 dark:bg-[#0f172a]/50 backdrop-blur-md border-transparent"
          }`}
        >
          <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-0.5 min-w-0">
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
                  className={`whitespace-nowrap rounded-xl px-2.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[#07284a] dark:text-white bg-[#07284a]/8 dark:bg-white/10 font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-[#07284a]/5 dark:hover:bg-white/5"
                  }`}
                >
                  <Icon className="inline size-3.5 mr-1 -mt-0.5" />{n.label}
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            {user ? (
              <>
                <button onClick={() => setDark(!dark)}
                  className="hidden md:inline-flex items-center justify-center rounded-xl size-8 text-muted-foreground hover:text-foreground hover:bg-[#07284a]/5 dark:hover:bg-white/5 transition-all">
                  {dark ? <Sparkles className="size-3.5" /> : <Moon className="size-3.5" />}
                </button>
                {isAdmin && (
                  <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex text-muted-foreground hover:text-foreground rounded-xl h-8 px-2.5 text-xs gap-1">
                    <Link to="/admin"><Shield className="size-3.5" />Admin</Link>
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
                  className="hidden md:inline-flex items-center justify-center rounded-xl h-8 px-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-[#07284a]/5 dark:hover:bg-white/5 gap-1.5 transition-all"
                >
                  <Share2 className="size-3.5 text-violet-500" />
                  <span>Share</span>
                </button>

                {/* Logout */}
                <button
                  onClick={signOut}
                  className="hidden md:inline-flex items-center justify-center rounded-xl h-8 px-2.5 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 gap-1.5 transition-all"
                >
                  <LogOut className="size-3.5" />
                  <span>Logout</span>
                </button>

                {/* User avatar — display only, no dropdown */}
                <div className="hidden md:inline-flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  <span className="flex items-center justify-center size-6 rounded-full bg-[#07284a]/10 dark:bg-white/10 text-[11px] font-bold text-[#07284a] dark:text-white shrink-0">
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </span>
                  <span className="max-w-[80px] truncate">{user.email?.split("@")[0]}</span>
                </div>
              </>
            ) : (
              <>
                <button onClick={() => setDark(!dark)}
                  className="hidden md:inline-flex items-center justify-center rounded-xl size-8 text-muted-foreground hover:text-foreground hover:bg-[#07284a]/5 dark:hover:bg-white/5 transition-all">
                  {dark ? <Sparkles className="size-3.5" /> : <Moon className="size-3.5" />}
                </button>
                <Button asChild size="sm" className="hidden md:inline-flex rounded-xl h-8 px-3 text-xs bg-[#07284a] hover:bg-[#07284a]/90 text-white shadow-sm shadow-[#07284a]/20">
                  <Link to="/auth">Sign in</Link>
                </Button>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex lg:hidden items-center justify-center size-8 rounded-xl border border-border hover:bg-[#07284a]/5 dark:hover:bg-white/5 transition-all touch-target"
              aria-label="Toggle menu"
            >
              <span className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`}>
                {open ? <X className="size-3.5" /> : <Menu className="size-3.5" />}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile backdrop */}
      {open && <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />}

      {/* Mobile Menu */}
      {open && (
        <div
          ref={menuRef}
          className="fixed left-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 mt-2 rounded-2xl border border-border/60 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl shadow-xl overflow-hidden lg:hidden"
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
