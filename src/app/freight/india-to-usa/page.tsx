import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { Ship, Clock, Anchor, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Ocean Freight India to USA | New York, Savannah, Los Angeles Shipping Lines",
  description:
    "Guide to ocean freight from India (Nhava Sheva/Mundra) to USA East Coast & West Coast. Transit times, ISF 10+2 compliance, AMS filing, and live carrier bidding.",
  alternates: {
    canonical: "https://www.shipcargo.in/freight/india-to-usa"
  }
};

export default function FreightIndiaToUSAPage() {
  const breadcrumbSchema = generateBreadcrumbsSchema([
    { name: "Home", item: "https://www.shipcargo.in" },
    { name: "Freight Corridors", item: "https://www.shipcargo.in/freight/india-to-dubai" },
    { name: "India to USA", item: "https://www.shipcargo.in/freight/india-to-usa" }
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
          <span className="text-[#ECE6DC] font-semibold">India → USA</span>
        </nav>

        {/* Header */}
        <div className="space-y-4 border-b border-[#ECE6DC]/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30">
            Trans-Atlantic & Trans-Pacific Corridors
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-headline tracking-tight text-white">
            Ocean Freight: India to United States (USA)
          </h1>
          <p className="text-lg text-[#AEB8D6] leading-relaxed">
            The United States is India&apos;s largest single-country export destination. Main containerized cargo flows connect 
            Indian gateway ports to US East Coast gateways (New York/New Jersey, Savannah, Norfolk) and West Coast hubs (Los Angeles/Long Beach).
          </p>
        </div>

        {/* Port Pairs & Transit times */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-2">
            <Clock className="w-6 h-6 text-[#FF5A12]" />
            <h3 className="text-base font-bold text-white">East Coast (USEC)</h3>
            <p className="text-xs text-[#AEB8D6]">Direct services to NYC / Savannah: 26–32 days. Routing via Mediterranean / Atlantic.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-2">
            <Clock className="w-6 h-6 text-[#FF5A12]" />
            <h3 className="text-base font-bold text-white">West Coast (USWC)</h3>
            <p className="text-xs text-[#AEB8D6]">Los Angeles / Oakland: 28–36 days. Routing via Singapore transshipment / Pacific.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-2">
            <Anchor className="w-6 h-6 text-[#FF5A12]" />
            <h3 className="text-base font-bold text-white">Origin Hubs</h3>
            <p className="text-xs text-[#AEB8D6]">Nhava Sheva (JNPT), Mundra (MUN), Chennai (MAA), Hazira (HZR).</p>
          </div>
        </div>

        {/* US CBP Compliance Checklist */}
        <div className="p-6 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-4">
          <h2 className="text-xl font-bold text-white">Mandatory US Customs & Border Protection (CBP) Rules</h2>
          <div className="space-y-3 text-sm text-[#AEB8D6]">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>ISF 10+2 Filing:</strong> Importer Security Filing must be submitted to US Customs at least 24 hours prior to loading at the Indian seaport. Failure risks \$5,000 penalties per violation.</li>
              <li><strong>AMS (Automated Manifest System):</strong> Ocean carriers lodge complete container manifests electronically with US CBP.</li>
              <li><strong>FDA Registration & Prior Notice:</strong> All food, spices, and agricultural shipments must transmit Prior Notice of Imported Food to the US FDA before vessel arrival.</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#18367A] to-[#0A1636] border border-[#FF5A12]/30">
          <div>
            <h4 className="text-lg font-bold text-white">Bidding on USA Container Freight?</h4>
            <p className="text-xs text-[#AEB8D6]">Post 20&apos; or 40&apos; HC container requirements and let FMC-licensed carriers compete live.</p>
          </div>
          <Link
            href="/find-demand"
            className="px-5 py-3 rounded-xl bg-[#FF5A12] text-white font-bold text-xs hover:bg-[#E04800] transition-all shadow-md shrink-0"
          >
            Find USA Freight Demand ➔
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 flex flex-col sm:flex-row justify-between gap-2">
          <span>Sources: US Customs and Border Protection (CBP), US Federal Maritime Commission (FMC)</span>
          <span>Last verified: 21 November 2026</span>
        </footer>
      </div>
    </main>
  );
}
