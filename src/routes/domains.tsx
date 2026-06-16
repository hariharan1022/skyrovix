import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DOMAINS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/domains")({
  head: () => ({ meta: [{ title: "Internship Domains — Skyrovix" }, { name: "description", content: "Browse 10 internship domains: Full Stack, Frontend, Backend, Data Science, AI/ML, UI/UX, Python, Java, Cyber Security, Digital Marketing." }] }),
  component: DomainsPage,
});

function DomainsPage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-4xl font-bold md:text-5xl">All <span className="brand-text">Domains</span></h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Each domain offers a 5-task curriculum designed to build real, portfolio-ready skills.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((d) => (
            <Link key={d.slug} to="/domains/$slug" params={{ slug: d.slug }} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 transition hover:-translate-y-1 hover:border-primary/60">
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${d.color} opacity-0 transition group-hover:opacity-10`} />
              <div className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br ${d.color} text-sm font-bold text-white`}>{d.icon}</div>
              <h3 className="mt-4 font-semibold">{d.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d.description}</p>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">View tasks <ArrowRight className="ml-1 size-4 transition group-hover:translate-x-1" /></div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
