import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PromotionalPopup } from "@/components/PromotionalPopup";

export const Route = createFileRoute("/_navbar-layout")({
  component: () => (
    <>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20 sm:pt-24">
          <Outlet />
        </main>
        <Footer />
      </div>
      <PromotionalPopup />
    </>
  ),
});
