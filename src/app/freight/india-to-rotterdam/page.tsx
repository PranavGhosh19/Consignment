import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { Ship, Clock, Anchor, ShieldCheck, ArrowRight, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Ocean Freight India to Rotterdam, Netherlands | Transit Times & Shipping Lines",
  description:
    "Complete corridor guide for ocean freight from Nhava Sheva (BOM) & Mundra (MUN) to Rotterdam (RTM). Transit times, EU customs compliance, and live carrier bidding.",
  alternates: {
    canonical: "https://www.shipcargo.in/freight/india-to-rotterdam"
  }
};

export default function FreightIndiaToRotterdamPage() {
  const breadcrumbSchema = generateBreadcrumbsSchema([
    { name: "Home", item: "https://www.shipcargo.in" },
    { name: "Freight Corridors", item: "https://www.shipcargo.in/freight/india-to-dubai" },
    { name: "India to Rotterdam", item: "https://www.shipcargo.in/freight/india-to-rotterdam" }
  ]);

  return (
    <main className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-[#AEB8D6] flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#AEB8D6]">Freight Corridors</span>
          <span>/</span>
          <span className="text-[#ECE6DC] font-semibold">India → Rotterdam</span>
        </nav>

        {/* Header */}
        <div className="space-y-4 border-b border-[#ECE6DC]/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30">
            Arterial EU Trade Corridor
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-headline tracking-tight text-white">
            Ocean Freight: India to Rotterdam (RTM), Netherlands
          </h1>
          <p className="text-lg text-[#AEB8D6] leading-relaxed">
            The Port of Rotterdam is Europe&apos;s largest seaport and the primary gateway for Indian exports into Western and Northern Europe. 
            Direct container vessel services operate weekly from Nhava Sheva (JNPT) and Mundra Port.
          </p>
        </div>

        {/* Transit & Port Pairs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-2">
            <Clock className="w-6 h-6 text-[#FF5A12]" />
            <h3 className="text-base font-bold text-white">Transit Times</h3>
            <p className="text-xs text-[#AEB8D6]">Direct: 22–26 days (via Suez / Mediterranean) · Cape routing: 32–38 days.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-2">
            <Anchor className="w-6 h-6 text-[#FF5A12]" />
            <h3 className="text-base font-bold text-white">Origin Seaports</h3>
            <p className="text-xs text-[#AEB8D6]">Nhava Sheva (JNPT), Mundra (MUN), Chennai (MAA), Pipavav (PAV).</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-2">
            <Ship className="w-6 h-6 text-[#FF5A12]" />
            <h3 className="text-base font-bold text-white">Active Carriers</h3>
            <p className="text-xs text-[#AEB8D6]">Maersk (AE1/AE7), MSC (Lion), CMA CGM (FAL), Hapag-Lloyd.</p>
          </div>
        </div>

        {/* EU Import Requirements */}
        <div className="p-6 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-4">
          <h2 className="text-xl font-bold text-white">Mandatory European Union Import Standards</h2>
          <div className="space-y-3 text-sm text-[#AEB8D6]">
            <p>
              Shipments entering the European Union via the Port of Rotterdam must satisfy strict community regulations:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Import Control System 2 (ICS2):</strong> Complete Entry Summary Declarations (ENS) must be lodged electronically prior to vessel loading.</li>
              <li><strong>Phytosanitary & Eurofins Lab Tests:</strong> Food and agricultural items (spices, basmati rice, seeds) require accredited testing for maximum residue limits (MRLs) and aflatoxins.</li>
              <li><strong>CBAM Compliance:</strong> Carbon Border Adjustment Mechanism (CBAM) reporting requirements apply to steel, aluminium, and fertilizer exports.</li>
            </ul>
          </div>
        </div>

        {/* CTA to Bid */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#18367A] to-[#0A1636] border border-[#FF5A12]/30">
          <div>
            <h4 className="text-lg font-bold text-white">Have a shipment to Rotterdam?</h4>
            <p className="text-xs text-[#AEB8D6]">Post container details on ShipCargo and let carriers compete live on freight rates.</p>
          </div>
          <Link
            href="/find-demand"
            className="px-5 py-3 rounded-xl bg-[#FF5A12] text-white font-bold text-xs hover:bg-[#E04800] transition-all shadow-md shrink-0"
          >
            Post Shipment for Live Bidding ➔
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 flex flex-col sm:flex-row justify-between gap-2">
          <span>Sources: Port of Rotterdam Authority, European Commission DG TAXUD, Indian Ports Association</span>
          <span>Last verified: 21 November 2026</span>
        </footer>
      </div>
    </main>
  );
}
