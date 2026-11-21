import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { ArrowRight, ShieldCheck, CheckCircle2, FileText, Globe2, Building2, Anchor } from "lucide-react";

export const metadata: Metadata = {
  title: "About ShipCargo | India's Trade & Freight Bidding Ecosystem",
  description:
    "Learn about ShipCargo: our mission to digitize cross-border commerce for Indian exporters, global importers, and verified freight carriers with tamper-evident documentation and live freight bidding.",
  alternates: {
    canonical: "https://www.shipcargo.in/about"
  }
};

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbsSchema([
    { name: "Home", item: "https://www.shipcargo.in" },
    { name: "About Us", item: "https://www.shipcargo.in/about" }
  ]);

  return (
    <main className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-[#AEB8D6] flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#ECE6DC] font-semibold">About Us</span>
        </nav>

        {/* Hero Section */}
        <div className="space-y-4 border-b border-[#ECE6DC]/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30">
            About ShipCargo
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-headline tracking-tight text-white">
            Bringing Transparency and Margin Power to Indian Exporters
          </h1>
          <p className="text-lg text-[#AEB8D6] leading-relaxed max-w-3xl">
            ShipCargo is built to replace fragmented WhatsApp groups and opaque freight markups with a verifiable, 
            tamper-evident trade ecosystem. We connect verified Indian suppliers with global buyers through structured requirements, 
            lab-tested sample approvals, and transparent live freight bidding.
          </p>
        </div>

        {/* Our Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
            <Globe2 className="w-8 h-8 text-[#FF5A12]" />
            <h3 className="text-xl font-bold text-white">Verified Global Demand</h3>
            <p className="text-sm text-[#AEB8D6] leading-relaxed">
              Importers post binding requirements with detailed specifications, target dates, and international payment structures.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
            <FileText className="w-8 h-8 text-[#FF5A12]" />
            <h3 className="text-xl font-bold text-white">Tamper-Evident Document Room</h3>
            <p className="text-sm text-[#AEB8D6] leading-relaxed">
              Every sample approval, lab certificate of analysis (COA), bill of lading, and shipping bill is permanently logged with non-repudiation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
            <Anchor className="w-8 h-8 text-[#FF5A12]" />
            <h3 className="text-xl font-bold text-white">Live Reverse Bidding</h3>
            <p className="text-sm text-[#AEB8D6] leading-relaxed">
              When cargo is ready, verified shipping lines and freight forwarders compete in real time, eliminating hidden intermediary cuts.
            </p>
          </div>
        </div>

        {/* Mission & Verification Standards */}
        <div className="p-8 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-6">
          <h2 className="text-2xl font-bold text-white">Our Statutory & Regulatory Commitment</h2>
          <p className="text-sm sm:text-base text-[#AEB8D6] leading-relaxed">
            International trade demands uncompromising statutory compliance. ShipCargo integrates verification checkpoints aligned with the 
            Directorate General of Foreign Trade (DGFT), Central Board of Indirect Taxes and Customs (CBIC / ICEGATE), GST Council, and the Reserve Bank of India (RBI).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white">IEC & RCMC Validation</h4>
                <p className="text-xs text-[#AEB8D6]">Real-time confirmation of Importer-Exporter Codes and Export Promotion Council registrations.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white">EDPMS & BRC Reconciliation</h4>
                <p className="text-xs text-[#AEB8D6]">Structured document workflows designed to ensure seamless export realization tracking.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white">GST RFD-11 LUT Verification</h4>
                <p className="text-xs text-[#AEB8D6]">Ensuring zero-rated exports without capital blockage in integrated GST refunds.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white">Authorized Carrier Checks</h4>
                <p className="text-xs text-[#AEB8D6]">All participating freight forwarders and NVOCCs maintain verified FMC or MTO registrations.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Company Registration Details */}
        <div className="p-6 rounded-2xl bg-[#0A1636]/50 border border-[#ECE6DC]/10 space-y-3 font-mono text-xs text-[#AEB8D6]">
          <div className="flex items-center gap-2 text-white font-bold">
            <Building2 className="w-4 h-4 text-[#FF5A12]" />
            <span>Corporate Information</span>
          </div>
          <p>Legal Entity: [PLACEHOLDER: Legal Business Name, e.g., ShipCargo Global Technologies Private Limited]</p>
          <p>CIN: [PLACEHOLDER: Corporate Identity Number]</p>
          <p>Registered Office: [PLACEHOLDER: Official Registered Office Address, City, State, PIN]</p>
          <p>Contact Email: support@shipcargo.in · Operational Hours: Mon–Fri, 09:30 – 18:30 IST</p>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 rounded-3xl bg-gradient-to-r from-[#18367A] to-[#0A1636] border border-[#FF5A12]/30">
          <div>
            <h3 className="text-xl font-bold text-white">Ready to trade or bid with confidence?</h3>
            <p className="text-sm text-[#AEB8D6]">Join thousands of verified Indian exporters and global logistics vendors today.</p>
          </div>
          <Link
            href="/find-demand"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF5A12] text-white font-bold text-sm hover:bg-[#E04800] transition-all shadow-lg shadow-[#FF5A12]/30 shrink-0"
          >
            <span>Explore Live Demand</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Verification Footer */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 flex flex-col sm:flex-row justify-between gap-2">
          <span>Editorial standard: ISO-aligned verification workflow</span>
          <span>Last verified: 21 November 2026</span>
        </footer>
      </div>
    </main>
  );
}
