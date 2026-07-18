import { createFileRoute } from "@tanstack/react-router";
import { markStaleSessionsOffline } from "@/lib/login-tracker";

export const Route = createFileRoute("/api/cron/cleanup-sessions")({
  loader: async () => markStaleSessionsOffline(),
  component: () => {
    const data = Route.useLoaderData();
    return <pre>{JSON.stringify({ ok: true, ...data }, null, 2)}</pre>;
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
  }),
});
