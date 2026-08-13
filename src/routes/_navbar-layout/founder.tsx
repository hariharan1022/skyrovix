import { createFileRoute } from "@tanstack/react-router";
import { FounderProfileView } from "@/components/FounderProfileView";

export const Route = createFileRoute("/_navbar-layout/founder")({
  head: () => ({
    meta: [
      { title: "Hariharan S | Founder & CEO of Skyrovix | Executive Profile" },
      { name: "description", content: "Hariharan S is the Founder and CEO of Skyrovix IT Solutions, leading virtual skill development, MSME-registered internships, and code-sandbox learning ecosystems." },
      { name: "keywords", content: "Hariharan S, Skyrovix Founder, Hariharan Skyrovix, Hariharan S CEO, virtual internship founder, India skill development leadership, Skyrovix CEO profile" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "profile" },
      { property: "og:title", content: "Hariharan S — Founder & CEO of Skyrovix" },
      { property: "og:description", content: "Leading the next generation of project-based virtual learning programs for students in India." },
      { property: "og:url", content: "https://founder.skyrovix.online" },
      { property: "og:image", content: "https://skyrovix.online/founder.jpeg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Hariharan S — Founder & CEO of Skyrovix" },
      { name: "twitter:description", content: "Leading the next generation of project-based virtual learning programs for students in India." },
      { rel: "canonical", href: "https://founder.skyrovix.online" },
    ],
  }),
  component: FounderProfileView,
});
