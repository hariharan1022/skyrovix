import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { WebPageJsonLd } from "@/components/JsonLd";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Skyrovix Data Protection" },
      { name: "description", content: "Skyrovix privacy policy. Learn how we collect, use, and protect your personal information including name, email, phone, college details, and payment data. Last updated July 2026." },
      { name: "keywords", content: "skyrovix privacy policy, data protection, internship data collection, personal information policy" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Skyrovix" },
      { property: "og:title", content: "Privacy Policy — Skyrovix" },
      { property: "og:description", content: "Skyrovix privacy policy explaining how we collect, use, and protect your personal data for internship services." },
      { property: "og:url", content: "https://skyrovix.online/privacy" },
      { property: "og:image", content: "https://skyrovix.online/og-default.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Privacy Policy — Skyrovix" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@skyrovix" },
      { name: "twitter:title", content: "Privacy Policy — Skyrovix" },
      { name: "twitter:description", content: "Skyrovix privacy policy explaining how we collect, use, and protect your personal data." },
      { name: "twitter:image", content: "https://skyrovix.online/og-default.png" },
      { rel: "canonical", href: "https://skyrovix.online/privacy" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <WebPageJsonLd
        title="Privacy Policy — Skyrovix"
        description="Skyrovix privacy policy. Learn how we collect, use, and protect your personal information."
        url="https://skyrovix.online/privacy"
      />
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3" /> Back</Link>
        <h1 className="mt-6 text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <Section title="1. Information We Collect">
            We collect personal information you provide when applying for an internship, including your name, email, phone number, college details, and profile photo. We also collect payment information (UTR number, payment screenshot) for certification processing.
          </Section>
          <Section title="2. How We Use Your Information">
            Your information is used to process your internship application, issue offer letters and ID cards, track task submissions, generate certificates, and communicate with you regarding your internship status.
          </Section>
          <Section title="3. Data Storage & Security">
            Your data is stored securely on Supabase servers. We implement industry-standard security measures to protect your personal information. Profile photos and payment screenshots are stored in encrypted storage buckets with signed URL access.
          </Section>
          <Section title="4. Data Sharing">
            We do not sell, trade, or share your personal information with third parties except as required to process your internship (e.g., generating PDF documents) or as required by law.
          </Section>
          <Section title="5. Your Rights">
            You can request access to, correction of, or deletion of your personal data at any time by contacting us at skyrovix@gmail.com.
          </Section>
          <Section title="6. Cookies">
            We use essential cookies for authentication and session management. No tracking or advertising cookies are used.
          </Section>
          <Section title="7. Contact">
            For privacy-related inquiries, email us at skyrovix@gmail.com.
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 font-semibold text-foreground">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
