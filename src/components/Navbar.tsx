import { Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, LayoutDashboard, Shield } from "lucide-react";

export function Navbar() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/"><Logo /></Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link to="/domains" className="hover:text-foreground transition">Domains</Link>
          <Link to="/verify-certificate" className="hover:text-foreground transition">Verify Certificate</Link>
          <a href="/#how" className="hover:text-foreground transition">How it works</a>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {isAdmin && (
                <Button asChild variant="ghost" size="sm"><Link to="/admin"><Shield className="mr-1 size-4" />Admin</Link></Button>
              )}
              <Button asChild variant="secondary" size="sm"><Link to="/dashboard"><LayoutDashboard className="mr-1 size-4" />Dashboard</Link></Button>
              <Button onClick={signOut} variant="ghost" size="icon" aria-label="Sign out"><LogOut className="size-4" /></Button>
            </>
          ) : (
            <Button asChild className="brand-gradient text-white border-0"><Link to="/auth">Sign in</Link></Button>
          )}
        </div>
      </div>
    </header>
  );
}
