import { Logo } from "./Logo";
import msme from "@/assets/msme.png";
import { Link } from "@tanstack/react-router";
import { Linkedin, Instagram, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-border/50 bg-[#f8fafc] dark:bg-[#020617]" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <Logo />
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              A task-based virtual internship platform by Skyrovix — build real skills, earn a recognised certificate.
            </p>
            <nav aria-label="Social media links" className="flex items-center gap-2.5 pt-2">
              <a href="https://www.linkedin.com/company/skyrovix/" target="_blank" rel="noopener noreferrer" aria-label="Skyrovix on LinkedIn" className="grid size-9 place-items-center rounded-xl border border-border/60 bg-white/50 dark:bg-[#0f172a]/50 text-muted-foreground hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/5 transition-all">
                <Linkedin className="size-4" />
              </a>
              <a href="https://www.instagram.com/skyrovix?igsh=ZXY2ZXdxZTM5czNr" target="_blank" rel="noopener noreferrer" aria-label="Skyrovix on Instagram" className="grid size-9 place-items-center rounded-xl border border-border/60 bg-white/50 dark:bg-[#0f172a]/50 text-muted-foreground hover:text-[#E4405F] hover:border-[#E4405F]/30 hover:bg-[#E4405F]/5 transition-all">
                <Instagram className="size-4" />
              </a>
              <a href="https://whatsapp.com/channel/0029VbD67bgEFeXexEbYGI1f" target="_blank" rel="noopener noreferrer" aria-label="Skyrovix on WhatsApp" className="grid size-9 place-items-center rounded-xl border border-border/60 bg-white/50 dark:bg-[#0f172a]/50 text-muted-foreground hover:text-[#25D366] hover:border-[#25D366]/30 hover:bg-[#25D366]/5 transition-all">
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </nav>
          </div>

          {/* Platform */}
          <nav aria-label="Platform links">
            <h4 className="text-sm font-semibold mb-3">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/domains", label: "Internship Domains" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
                { to: "/verify-certificate", label: "Verify Certificate" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                    <ArrowUpRight className="size-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Contact</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:skyrovix@gmail.com" className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="size-3.5" /> skyrovix@gmail.com
                </a>
              </li>
              <li className="text-sm text-muted-foreground">India</li>
            </ul>
          </div>

          {/* MSME */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Registered with</h4>
            <div className="inline-flex items-center gap-3 rounded-2xl border border-border/60 bg-white/60 dark:bg-[#0f172a]/60 px-3 py-3 shadow-sm">
              <img src={msme} alt="MSME Government of India registration logo" className="h-10 w-auto object-contain" loading="lazy" />
              <div className="leading-tight">
                <p className="text-xs font-semibold text-foreground">MSME Registered</p>
                <p className="text-[10px] font-mono text-muted-foreground">UDYAM-TN-17-0076606</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:py-1">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Skyrovix. All rights reserved.
          </p>
          <nav aria-label="Legal links" className="flex items-center gap-4">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">Terms of Service</Link>
            <button onClick={scrollToTop} className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2" aria-label="Scroll back to top">Back to top</button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
