import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { ImporterRequirementSimulator } from "@/components/importer-requirement-simulator";
import {
  Globe2,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FlaskConical,
  FileCheck2,
  Boxes,
  Lock,
  Scale
} from "lucide-react";

export const metadata: Metadata = {
  title: "For Importers & Global Buyers | Direct Sourcing from India | ShipCargo",
  description:
    "Source directly from verified Indian factories and mills. Post requirements, receive lab-tested samples, and lock in transparent container freight with zero intermediary markups.",
  alternates: {
    canonical: "https://www.shipcargo.in/for-importers"
  }
};

export default function ForImportersPage() {
  const breadcrumbSchema = generateBreadcrumbsSchema([
    { name: "Home", item: "https://www.shipcargo.in" },
    { name: "For Importers", item: "https://www.shipcargo.in/for-importers" }
  ]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Direct Sourcing and Verified Supplier Matching from India",
    "provider": {
      "@type": "Organization",
      "name": "ShipCargo",
      "url": "https://www.shipcargo.in"
    },
    "serviceType": "B2B Trade Facilitation & Document Verification",
    "areaServed": "Global",
    "description":
      "Digital sourcing platform enabling international buyers to procure agricultural, textile, engineering, and chemical commodities directly from verified Indian manufacturers with tamper-evident lab testing and reverse freight bidding."
  };

  return (
    <main className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="max-w-5xl mx-auto space-y-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-[#AEB8D6] flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#ECE6DC] font-semibold">For Importers</span>
        </nav>

        {/* 1. HERO SECTION */}
        <div className="space-y-6 border-b border-[#ECE6DC]/15 pb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Direct Sourcing for Global Procurement Leaders</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-headline tracking-tight text-white leading-tight">
            Direct Sourcing from India,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A12] via-[#FF8544] to-[#FFAE7A]">
              Certified Quality &amp; Zero Broker Cuts
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#AEB8D6] leading-relaxed max-w-3xl">
            Post your commodity or manufactured goods requirement. Receive verified factory quotes, 
            courier-dispatched laboratory samples, and locked-in ocean container rates in one synchronized workspace.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              href="/signup/exporter"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-headline font-bold text-white bg-gradient-to-b from-[#FF6B2B] via-[#FF5A12] to-[#E04800] shadow-lg shadow-[#FF5A12]/35 hover:-translate-y-0.5 transition-all"
            >
              <Building2 className="w-5 h-5" />
              <span>Post an Import Requirement</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-headline font-bold text-[#13285A] bg-[#ECE6DC] hover:bg-white shadow-md transition-all"
            >
              <span>How Ecosystem Works</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-[#AEB8D6]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified Indian Exporters (IEC &amp; RCMC Validated)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Tamper-Evident Document Room</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Upfront Platform Fees</span>
            </div>
          </div>
        </div>

        {/* 2. THE 4-STAGE IMPORTER JOURNEY */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF5A12] font-bold">
              Predictable Cross-Border Procurement
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              How Global Buyers Source on ShipCargo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
              <span className="font-mono text-2xl font-bold text-[#FF5A12]">01</span>
              <h3 className="text-lg font-bold text-white">Post Requirement</h3>
              <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
                Specify product, HS code, target volume (FCL/LCL), delivery window, and payment structure (LC / advance).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
              <span className="font-mono text-2xl font-bold text-[#FF5A12]">02</span>
              <h3 className="text-lg font-bold text-white">Receive Quotes &amp; Sample</h3>
              <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
                Verified Indian manufacturers submit factory pricing and air-freight physical production samples for testing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
              <span className="font-mono text-2xl font-bold text-[#FF5A12]">03</span>
              <h3 className="text-lg font-bold text-white">Lab Approval in Document Room</h3>
              <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
                Test reports and Certificate of Analysis (COA) are permanently signed off in the tamper-evident Document Room.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
              <span className="font-mono text-2xl font-bold text-[#FF5A12]">04</span>
              <h3 className="text-lg font-bold text-white">Live Freight &amp; Delivery</h3>
              <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
                Once sample is approved, carriers bid live for the container booking. Milestone updates track vessel loading to final arrival.
              </p>
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE SOURCING CONSOLE */}
        <ImporterRequirementSimulator />

        {/* 4. WHY GLOBAL BUYERS CHOOSE SHIPCARGO */}
        <div className="p-8 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-6">
          <h2 className="text-2xl font-bold text-white">
            Why Traditional Sourcing from India Fails — And How ShipCargo Fixes It
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="p-5 rounded-2xl bg-[#13285A]/60 border border-red-500/20 space-y-2">
              <span className="text-xs font-mono font-bold text-red-400 uppercase">The WhatsApp &amp; Broker Problem</span>
              <h3 className="text-base font-bold text-white">Unverified Agents &amp; Spec Drift</h3>
              <p className="text-xs text-[#AEB8D6] leading-relaxed">
                Third-party middlemen add 4–8% markups without taking inventory risk. Samples sent often differ from actual production batches, causing costly port rejections.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#13285A]/60 border border-emerald-500/20 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">The ShipCargo Standard</span>
              <h3 className="text-base font-bold text-white">Direct Mills + Document Room</h3>
              <p className="text-xs text-[#AEB8D6] leading-relaxed">
                You contract directly with audited manufacturers. Sample approvals form binding contractual baselines, with lab COAs logged on an immutable audit trail.
              </p>
            </div>
          </div>
        </div>

        {/* 5. FREQUENTLY ASKED QUESTIONS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions by Importers</h2>
          <div className="space-y-3 text-sm">
            <div className="p-5 rounded-2xl bg-[#0A1636]/70 border border-[#ECE6DC]/10 space-y-2">
              <h3 className="text-base font-bold text-white">How does ShipCargo verify Indian exporters?</h3>
              <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
                Every exporter on ShipCargo must provide a verified 10-digit Importer-Exporter Code (IEC) validated against DGFT databases, 
                an active GSTIN with valid zero-rating LUT, and membership in relevant Export Promotion Councils (e.g., Spices Board, APEDA, TEXPROCIL, EEPC).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A1636]/70 border border-[#ECE6DC]/10 space-y-2">
              <h3 className="text-base font-bold text-white">Are international buyers charged any platform fees?</h3>
              <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
                No. Posting requirements, receiving manufacturer quotations, and reviewing sample certificates in the Document Room is 100% free for verified global importers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A1636]/70 border border-[#ECE6DC]/10 space-y-2">
              <h3 className="text-base font-bold text-white">What payment structures are supported?</h3>
              <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
                ShipCargo supports standard international trade payment mechanisms, including Irrevocable Letters of Credit (LC at sight), 
                Documentary Collections (DP/DA), and advance telegraphic transfers (T/T), fully compliant with RBI FEMA guidelines.
              </p>
            </div>
          </div>
        </div>

        {/* Verification Footer */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 flex flex-col sm:flex-row justify-between gap-2">
          <span>Aligned with ICC Incoterms 2020 &amp; UCP 600 Letter of Credit rules</span>
          <span>Last verified: 21 November 2026</span>
        </footer>
      </div>
    </main>
  );
}
