import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { ExporterSavingsCalculator } from "@/components/exporter-savings-calculator";
import {
  Ship,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileCheck2,
  Boxes,
  Lock,
  Zap,
  Building2,
  Globe2
} from "lucide-react";

export const metadata: Metadata = {
  title: "For Indian Exporters & Shippers | Live Freight Reverse Bidding | ShipCargo",
  description:
    "Stop overpaying for ocean freight. Post approved export cargo for live carrier reverse bidding. Cut freight costs by 15–22% and manage shipping bills and BRCs in one tamper-evident Document Room.",
  alternates: {
    canonical: "https://www.shipcargo.in/for-exporters"
  }
};

export default function ForExportersPage() {
  const breadcrumbSchema = generateBreadcrumbsSchema([
    { name: "Home", item: "https://www.shipcargo.in" },
    { name: "For Exporters", item: "https://www.shipcargo.in/for-exporters" }
  ]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Live Reverse Freight Auction & Export Documentation Management",
    "provider": {
      "@type": "Organization",
      "name": "ShipCargo",
      "url": "https://www.shipcargo.in"
    },
    "serviceType": "Container Freight Procurement & Trade Execution",
    "areaServed": "India",
    "description":
      "Digital reverse auction platform enabling Indian exporters to obtain competitive container freight rates through live carrier bidding, with integrated Document Room for sample approvals and customs shipping bill management."
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
          <span className="text-[#ECE6DC] font-semibold">For Exporters</span>
        </nav>

        {/* 1. HERO SECTION */}
        <div className="space-y-6 border-b border-[#ECE6DC]/15 pb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30">
            <Ship className="w-3.5 h-3.5" />
            <span>Built for Indian Manufacturers &amp; Merchant Exporters</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-headline tracking-tight text-white leading-tight">
            Stop Overpaying Freight Forwarders.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A12] via-[#FF8544] to-[#FFAE7A]">
              Let Carriers Compete Live for Your Cargo.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#AEB8D6] leading-relaxed max-w-3xl">
            When you win international orders on CIF terms, don&apos;t leave freight margins on the table. 
            Once your buyer approves the sample, post the shipment on ShipCargo. Top shipping lines and verified NVOCCs 
            bid down container rates in a transparent reverse auction.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              href="/signup/exporter"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-headline font-bold text-white bg-gradient-to-b from-[#FF6B2B] via-[#FF5A12] to-[#E04800] shadow-lg shadow-[#FF5A12]/35 hover:-translate-y-0.5 transition-all"
            >
              <Boxes className="w-5 h-5" />
              <span>List a Shipment (Free)</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/find-demand"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-headline font-bold text-[#13285A] bg-[#ECE6DC] hover:bg-white shadow-md transition-all"
            >
              <Globe2 className="w-5 h-5 text-[#FF5A12]" />
              <span>Explore Global Demands</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-[#AEB8D6]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>₹0 Listing Fees for Shippers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>15%–22% Average Freight Reduction</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>All-In Binding Carrier Quotes</span>
            </div>
          </div>
        </div>

        {/* 2. THE 4-STAGE EXPORTER WORKFLOW */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF5A12] font-bold">
              Step-by-Step Execution
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              From Buyer Inquiry to Bill of Lading
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
              <span className="font-mono text-2xl font-bold text-[#FF5A12]">01</span>
              <h3 className="text-lg font-bold text-white">Find Buyer Demand</h3>
              <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
                Filter verified inquiries by country, HS code, and volume. Quote factory FOB or landed CIF pricing directly to buyers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
              <span className="font-mono text-2xl font-bold text-[#FF5A12]">02</span>
              <h3 className="text-lg font-bold text-white">Send Courier Sample</h3>
              <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
                Air-freight sealed production samples. Upload lab Certificate of Analysis (COA) directly into the Document Room.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
              <span className="font-mono text-2xl font-bold text-[#FF5A12]">03</span>
              <h3 className="text-lg font-bold text-white">Buyer Approval Locked</h3>
              <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
                Buyer tests and formally logs approval. An immutable record locks specs, preventing arbitrary quality disputes later.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
              <span className="font-mono text-2xl font-bold text-[#FF5A12]">04</span>
              <h3 className="text-lg font-bold text-white">Live Reverse Bidding</h3>
              <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
                Post the ready cargo. Verified carriers bid downward. Award the booking to the lowest qualified carrier and keep the margin.
              </p>
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE SAVINGS CALCULATOR */}
        <ExporterSavingsCalculator />

        {/* 4. DOCUMENT ROOM FOR EXPORTERS */}
        <div className="p-8 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-6">
          <h2 className="text-2xl font-bold text-white">
            Replace Disorganized WhatsApp Chats with Tamper-Evident Records
          </h2>
          <p className="text-sm sm:text-base text-[#AEB8D6] leading-relaxed">
            In international trade, missing proof of sample approval or altered packing lists cause delayed bank remittances and costly customs demurrage. 
            The ShipCargo Document Room stores all trade records in one secure, non-repudiable vault:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#13285A]/50 border border-[#ECE6DC]/10 space-y-2">
              <FileCheck2 className="w-5 h-5 text-[#FF5A12]" />
              <h4 className="text-sm font-bold text-white">Sample &amp; Lab Reports</h4>
              <p className="text-xs text-[#AEB8D6]">COA, phytosanitary certificates, and buyer approval sign-offs with timestamps.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#13285A]/50 border border-[#ECE6DC]/10 space-y-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Customs Documents</h4>
              <p className="text-xs text-[#AEB8D6]">Shipping Bill (LEO copy), Commercial Invoice, and Packing List in one place.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#13285A]/50 border border-[#ECE6DC]/10 space-y-2">
              <Lock className="w-5 h-5 text-blue-400" />
              <h4 className="text-sm font-bold text-white">EDPMS &amp; e-BRC Realization</h4>
              <p className="text-xs text-[#AEB8D6]">Structured document history ready for authorized dealer bank foreign exchange closure.</p>
            </div>
          </div>
        </div>

        {/* 5. FREQUENTLY ASKED QUESTIONS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions by Exporters</h2>
          <div className="space-y-3 text-sm">
            <div className="p-5 rounded-2xl bg-[#0A1636]/70 border border-[#ECE6DC]/10 space-y-2">
              <h3 className="text-base font-bold text-white">How much does it cost to list a shipment for bidding?</h3>
              <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
                Listing export cargo is 100% free for verified Indian shippers. We do not charge subscription fees or per-listing costs. 
                Carriers pay a modest platform fee on successfully won and executed freight contracts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A1636]/70 border border-[#ECE6DC]/10 space-y-2">
              <h3 className="text-base font-bold text-white">Can I choose which carrier wins the shipment?</h3>
              <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
                Yes. While reverse bidding surfaces the most competitive market rate, the exporter retains full authority to evaluate carrier transit times, 
                free detention days at destination, and carrier performance ratings before awarding the booking.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A1636]/70 border border-[#ECE6DC]/10 space-y-2">
              <h3 className="text-base font-bold text-white">Do I need an active IEC to register?</h3>
              <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
                Yes. To protect the integrity of our network, all exporters must provide an active 10-digit Importer-Exporter Code (IEC) issued by DGFT, 
                along with an active GSTIN.
              </p>
            </div>
          </div>
        </div>

        {/* Verification Footer */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 flex flex-col sm:flex-row justify-between gap-2">
          <span>Compliant with DGFT Foreign Trade Policy (FTP 2023) &amp; CBIC ICEGATE standards</span>
          <span>Last verified: 21 November 2026</span>
        </footer>
      </div>
    </main>
  );
}
