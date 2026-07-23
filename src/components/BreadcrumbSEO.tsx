import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

type Crumb = { name: string; href?: string };

export function BreadcrumbSEO({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <li>
          <Link to="/" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
            <Home className="size-3" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="size-3 shrink-0" />
            {item.href ? (
              <Link to={item.href as any} className="hover:text-foreground transition-colors">{item.name}</Link>
            ) : (
              <span className="text-foreground font-medium" aria-current="page">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
