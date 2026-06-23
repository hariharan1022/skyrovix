import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/_navbar-layout")({
  component: () => (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  ),
});
