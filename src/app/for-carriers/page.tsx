import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { CarrierBiddingSimulator } from "@/components/carrier-bidding-simulator";
import {
  Ship,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Truck,
  Anchor,
  Clock,
  Radio,
  Building2,
  Lock
} from "lucide-react";

export const metadata: Metadata = {
  title: "For Freight Carriers & Shipping Lines | Live Container Freight Auctions | ShipCargo",
  description:
    "Bid on confirmed, ready-to-load containerized export cargo from verified Indian shippers. Fill vessel capacity on arterial trade corridors with zero sales acquisition friction.",
  alternates: {
    canonical: "https://www.shipcargo.in/for-carriers"
  }
};

export default function ForCarriersPage() {
  const breadcrumbSchema = generateBreadcrumbsSchema([
    { name: "Home", item: "https://www.shipcargo.in" },
    { name: "For Carriers", item: "https://www.shipcargo.in/for-carriers" }
  ]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Live Ocean Freight Bidding & Cargo Dispatch Platform",
    "provider": {
      "@type": "Organization",
      "name": "ShipCargo",
      "url": "https://www.shipcargo.in"
    },
    "serviceType": "Ocean Freight Logistics Marketplace",
    "areaServed": "Global",
    "description":
      "Digital marketplace allowing ocean container carriers, NVOCCs, and freight forwarders to bid on verified, sample-approved export container cargo from Indian seaports with guaranteed settlement milestones."
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
          <span className="text-[#ECE6DC] font-semibold">For Carriers</span>
        </nav>

        {/* 1. HERO SECTION */}
        <div className="space-y-6 border-b border-[#ECE6DC]/15 pb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30">
            <Anchor className="w-3.5 h-3.5" />
            <span>For Shipping Lines, NVOCCs &amp; Freight Forwarders</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-headline tracking-tight text-white leading-tight">
            Fill Vessel Capacity with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A12] via-[#FF8544] to-[#FFAE7A]">
              Confirmed, Ready-to-Load Export Cargo
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#AEB8D6] leading-relaxed max-w-3xl">
            Stop chasing speculative inquiries and unconfirmed price checks. Every shipment on ShipCargo represents 
            a contracted export order with buyer-approved samples, locked commodity specifications, and guaranteed loading windows.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              href="/signup/carrier"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-headline font-bold text-white bg-gradient-to-b from-[#FF6B2B] via-[#FF5A12] to-[#E04800] shadow-lg shadow-[#FF5A12]/35 hover:-translate-y-0.5 transition-all"
            >
              <Ship className="w-5 h-5" />
              <span>Register as Verified Carrier</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/find-demand"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-headline font-bold text-[#13285A] bg-[#ECE6DC] hover:bg-white shadow-md transition-all"
            >
              <Radio className="w-4 h-4 text-[#FF5A12]" />
              <span>View Live Trade Radar</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-[#AEB8D6]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Confirmed Shippers with Active IEC</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Cold Calling &amp; Customer Acquisition Overhead</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Guaranteed B/L Settlement Workflow</span>
            </div>
          </div>
        </div>

        {/* 2. THREE KEY BENEFITS FOR CARRIERS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
            <Clock className="w-8 h-8 text-[#FF5A12]" />
            <h3 className="text-xl font-bold text-white">Zero Phantoms or Price Chasers</h3>
            <p className="text-sm text-[#AEB8D6] leading-relaxed">
              Every shipment goes live only after the buyer has completed and logged physical sample approvals in the Document Room.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
            <Anchor className="w-8 h-8 text-[#FF5A12]" />
            <h3 className="text-xl font-bold text-white">Arterial Indian Gateways</h3>
            <p className="text-sm text-[#AEB8D6] leading-relaxed">
              Access container volume out of Nhava Sheva (JNPT), Mundra (MUN), Chennai (MAA), Kolkata (CCU), and Pipavav.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
            <Lock className="w-8 h-8 text-[#FF5A12]" />
            <h3 className="text-xl font-bold text-white">Transparent Success Pricing</h3>
            <p className="text-sm text-[#AEB8D6] leading-relaxed">
              No subscription fee to join or bid. Carriers pay a modest 1.5% to 3.0% platform fee only on shipments successfully awarded and loaded.
            </p>
          </div>
        </div>

        {/* 3. LIVE BIDDING SIMULATOR */}
        <CarrierBiddingSimulator />

        {/* 4. CARRIER ONBOARDING & COMPLIANCE REQUIREMENTS */}
        <div className="p-8 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-6">
          <h2 className="text-2xl font-bold text-white">Carrier Onboarding &amp; SLA Requirements</h2>
          <p className="text-sm sm:text-base text-[#AEB8D6] leading-relaxed">
            To ensure reliability for our exporting community, all logistics vendors, ocean shipping lines, and multi-modal transport operators 
            must meet statutory verification criteria:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white">FMC / MTO Licensing</h4>
                <p className="text-xs text-[#AEB8D6]">Federal Maritime Commission license or Indian Directorate General of Shipping MTO registration.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white">Active GSTIN Verification</h4>
                <p className="text-xs text-[#AEB8D6]">Registered logistics entity with valid tax filings and PAN verification.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white">All-In Rate Integrity</h4>
                <p className="text-xs text-[#AEB8D6]">Carrier bids must be all-inclusive of ocean freight, BAF, CAF, and origin THC unless itemized beforehand.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white">Milestone Telemetry Updates</h4>
                <p className="text-xs text-[#AEB8D6]">Prompt submission of Container Yard (CY) gate-in, vessel departure, and electronic Bill of Lading (e-B/L).</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. FREQUENTLY ASKED QUESTIONS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions by Carriers</h2>
          <div className="space-y-3 text-sm">
            <div className="p-5 rounded-2xl bg-[#0A1636]/70 border border-[#ECE6DC]/10 space-y-2">
              <h3 className="text-base font-bold text-white">How does reverse bidding work on ShipCargo?</h3>
              <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
                When a confirmed export shipment is published, verified carriers submit all-in container freight quotes. 
                Each carrier can monitor their ranking and submit lower bids before auction closure. The shipper awards the booking based on price, transit time, and carrier track record.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A1636]/70 border border-[#ECE6DC]/10 space-y-2">
              <h3 className="text-base font-bold text-white">How and when are carriers paid?</h3>
              <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
                Payment milestones are linked to verified milestones: booking confirmation, vessel gate-in, and Bill of Lading issuance in the Document Room. 
                Settlements are released directly via bank wire per agreed contractual terms.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A1636]/70 border border-[#ECE6DC]/10 space-y-2">
              <h3 className="text-base font-bold text-white">Are there penalties for rolled containers?</h3>
              <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
                Carriers guarantee vessel space on awarded bookings. In the rare event of carrier-initiated container rolling, 
                the carrier is required to place the container on the next immediate sailing without additional detention or storage charges to the shipper.
              </p>
            </div>
          </div>
        </div>

        {/* Verification Footer */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 flex flex-col sm:flex-row justify-between gap-2">
          <span>Standards: FMC ocean transportation intermediary rules &amp; Multimodal Transportation of Goods Act, 1993</span>
          <span>Last verified: 21 November 2026</span>
        </footer>
      </div>
    </main>
  );
}
