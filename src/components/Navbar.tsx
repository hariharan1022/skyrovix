import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, LayoutDashboard, Shield, Menu, X, GraduationCap, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/domains", label: "Internship" },
  { to: "/courses", label: "Courses" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/verify-certificate", label: "Verify" },
] as const;

export function Navbar() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const router = useRouterState();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pathname = router.location.pathname;

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-[0_1px_3px_0_rgb(0_0_0/0.06)]"
          : "bg-background/50 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium lg:flex">
          {NAV.map((n) => {
            const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className={`relative rounded-lg px-3 py-2 transition-all duration-200 ${
                  active
                    ? "text-foreground bg-accent/60"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                }`}
              >
                {n.label}
                {active && (
                  <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full brand-gradient" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              {isAdmin && (
                <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
                  <Link to="/admin"><Shield className="mr-1.5 size-4" />Admin</Link>
                </Button>
              )}
              <Button asChild variant="secondary" size="sm" className="hidden sm:inline-flex">
                <Link to="/dashboard"><LayoutDashboard className="mr-1.5 size-4" />Dashboard</Link>
              </Button>
              <Button onClick={signOut} variant="ghost" size="icon" aria-label="Sign out" className="text-muted-foreground hover:text-foreground">
                <LogOut className="size-4" />
              </Button>
            </>
          ) : (
            <Button asChild size="sm" className="brand-gradient text-white border-0 shadow-lg shadow-primary/25 hidden sm:inline-flex">
              <Link to="/auth">Sign in</Link>
            </Button>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-lg border border-border lg:hidden transition hover:bg-accent"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-fade-in-down border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 text-sm">
            {NAV.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 transition ${
                    active
                      ? "bg-accent/60 text-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent/30 hover:text-foreground"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
            <div className="my-2 border-t border-border" />
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-accent/30 hover:text-foreground">
                  <LayoutDashboard className="size-4" /> Dashboard
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-accent/30 hover:text-foreground">
                    <Shield className="size-4" /> Admin
                  </Link>
                )}
                <button onClick={() => { signOut(); setOpen(false); }} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-accent/30 hover:text-foreground">
                  <LogOut className="size-4" /> Sign out
                </button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)} className="mt-1 rounded-lg brand-gradient px-3 py-3 text-center font-medium text-white">
                Sign in to get started
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
