import type { ReactNode } from "react";

const PARTICLES = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  size: 1 + (i % 4) * 1.1,
  x: ((i * 41 + 7) % 100),
  y: ((i * 59 + 11) % 100),
  delay: (i % 10) * 1.3,
  duration: 9 + (i % 8) * 2.6,
  opacity: 0.25 + (i % 5) * 0.1,
}));

const ORBS = [
  { w: "clamp(650px, 90vw, 1100px)", h: "clamp(450px, 60vh, 750px)", top: "-10%", left: "50%", tx: "-50%", anim: "animate-aurora", bg: "var(--aurora-orb-1)" },
  { w: "clamp(380px, 60vw, 800px)", h: "clamp(330px, 50vh, 650px)", top: "auto", bottom: "-6%", left: "-6%", anim: "animate-aurora-2", bg: "var(--aurora-orb-2)" },
  { w: "clamp(330px, 50vw, 700px)", h: "clamp(280px, 45vh, 650px)", top: "6%", right: "-5%", anim: "animate-aurora-3", bg: "var(--aurora-orb-3)" },
  { w: "clamp(260px, 40vw, 550px)", h: "clamp(260px, 40vw, 550px)", top: "15%", left: "28%", anim: "animate-aurora-drift", bg: "var(--aurora-orb-4)" },
  { w: "clamp(190px, 30vw, 400px)", h: "clamp(190px, 30vw, 400px)", top: "48%", left: "62%", anim: "animate-aurora-pulse", bg: "var(--aurora-orb-5)" },
  { w: "clamp(170px, 26vw, 350px)", h: "clamp(170px, 26vw, 350px)", bottom: "8%", right: "18%", anim: "animate-blob-drift", bg: "var(--aurora-orb-6)" },
];

export function AuroraBackground({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} style={{ isolation: "isolate" }}>

      {/* ── Base solid background (light/dark adaptive) ── */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: -20,
          background: "var(--aurora-bg)",
        }}
      />

      {/* ── Subtle radial vignette brightening center ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: -19,
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(56,139,253,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Dot grid overlay (uses CSS variables to adjust lines) ── */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: -18,
          backgroundImage: "var(--aurora-grid)",
          backgroundSize: "52px 52px",
          opacity: 0.35,
        }}
      />

      {/* ── Diagonal shimmer lines ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: -17,
          backgroundImage: `
            repeating-linear-gradient(
              -55deg,
              transparent,
              transparent 80px,
              rgba(56,139,253,0.015) 80px,
              rgba(56,139,253,0.015) 82px
            )
          `,
        }}
      />

      {/* ── All aurora orbs ── */}
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className={`absolute pointer-events-none ${orb.anim}`}
          style={{
            zIndex: -15,
            width: orb.w,
            height: orb.h,
            top: orb.top,
            bottom: (orb as any).bottom,
            left: (orb as any).left,
            right: (orb as any).right,
            transform: orb.tx ? `translateX(${orb.tx})` : undefined,
            background: orb.bg,
            filter: "blur(60px)",
          }}
        />
      ))}

      {/* ── Spotlight beam ── */}
      <div
        className="pointer-events-none absolute inset-0 animate-spotlight"
        style={{
          zIndex: -14,
          background: "var(--aurora-spotlight)",
        }}
      />

      {/* ── Sweeping diagonal beam ── */}
      <div
        className="pointer-events-none absolute inset-0 animate-beam-scan"
        style={{
          zIndex: -14,
          background: "var(--aurora-beam)",
        }}
      />

      {/* ── Pulsing rings ── */}
      {[
        { size: 320, x: 12, y: 18, delay: 0 },
        { size: 250, x: 80, y: 62, delay: 1.8 },
        { size: 190, x: 52, y: 75, delay: 3.5 },
      ].map((ring, idx) => (
        <div
          key={idx}
          className="pointer-events-none absolute rounded-full animate-ring-pulse"
          style={{
            zIndex: -13,
            width: ring.size,
            height: ring.size,
            left: `${ring.x}%`,
            top: `${ring.y}%`,
            transform: "translate(-50%, -50%)",
            animationDelay: `${ring.delay}s`,
            border: "1px solid var(--ring-border)",
            boxShadow: "0 0 20px var(--ring-shadow)",
          }}
        />
      ))}

      {/* ── Floating star particles ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: -12 }}>
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              backgroundColor: "var(--particle-color)",
              boxShadow:
                p.size > 2.5
                  ? "0 0 8px rgba(56,139,253,0.15)"
                  : "none",
              animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Noise texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: -11,
          opacity: 0.015,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          zIndex: -10,
          background: "linear-gradient(to bottom, transparent, var(--background))",
        }}
      />

      {/* Content */}
      <div className="relative" style={{ zIndex: 0 }}>
        {children}
      </div>
    </div>
  );
}
