import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, absoluteUrl } from "@/lib/seo-config";
import { generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { Ship, Clock, ArrowRight, ShieldCheck, CheckCircle2, Scale, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "India to Dubai Freight Corridors (Jebel Ali Transit Times & Rates)",
  description:
    "Ocean container shipping guide from Indian ports (JNPT, Mundra) to Dubai (Jebel Ali - DXB). 4–5 days transit time, direct feeder lines, customs documentation, and live bidding.",
  alternates: {
    canonical: "/freight/india-to-dubai",
  },
};

export default function IndiaToDubaiFreightPage() {
  const url = "/freight/india-to-dubai";
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Freight Corridors", url: "/freight" },
    { name: "India to Dubai", url },
  ];

  return (
    <main className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbsSchema(breadcrumbs)) }}
      />

      <div className="max-w-4xl mx-auto space-y-10">
        
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-[#AEB8D6] flex items-center gap-2">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-[#8FB0FF]">Freight Corridors</span>
          <span>/</span>
          <span className="text-white">India to Dubai</span>
        </nav>

        <header className="space-y-3 border-b border-[#ECE6DC]/15 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30 uppercase">
            <Ship className="w-3.5 h-3.5" />
            <span>High-Volume Ocean Trade Lane</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-white leading-tight">
            Shipping Cargo from India to Dubai{" "}
            <span className="text-[#FF5A12] block sm:inline">(Jebel Ali Port - DXB)</span>
          </h1>

          <p className="text-sm sm:text-base text-[#C9D2EE] leading-relaxed">
            The India-UAE corridor is India&apos;s second-largest trade route under the Comprehensive Economic Partnership Agreement (CEPA). Fast 4–5 day sea transit connects west coast Indian ports directly with Jebel Ali.
          </p>

          <div className="flex items-center gap-4 text-xs font-mono text-[#AEB8D6] pt-1">
            <span>Route: <strong>BOM / MUN → DXB</strong></span>
            <span>•</span>
            <span className="text-emerald-400">Direct Feeder: 4–5 Days</span>
          </div>
        </header>

        {/* Lane Specs Table */}
        <div className="rounded-2xl bg-[#0A1636]/90 border border-[#ECE6DC]/15 overflow-hidden">
          <table className="w-full text-xs font-mono text-left">
            <thead className="bg-[#13285A] text-[#AEB8D6] uppercase tracking-wider border-b border-[#ECE6DC]/10">
              <tr>
                <th className="p-3.5">Origin Port</th>
                <th className="p-3.5">Destination Port</th>
                <th className="p-3.5">Transit Time</th>
                <th className="p-3.5">Major Equipment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE6DC]/10 text-[#ECE6DC]">
              <tr>
                <td className="p-3.5 font-bold text-white">JNPT (Nhava Sheva)</td>
                <td className="p-3.5">Jebel Ali (DXB)</td>
                <td className="p-3.5 text-emerald-400 font-bold">4 Days Direct</td>
                <td className="p-3.5">20&apos; Dry, 40&apos; HC, 40&apos; Reefer</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Mundra Port (MUN)</td>
                <td className="p-3.5">Jebel Ali (DXB)</td>
                <td className="p-3.5 text-emerald-400 font-bold">5 Days Direct</td>
                <td className="p-3.5">20&apos; Dry, 40&apos; HC, Flexitanks</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Chennai Port (MAA)</td>
                <td className="p-3.5">Jebel Ali (DXB)</td>
                <td className="p-3.5">8–10 Days</td>
                <td className="p-3.5">40&apos; Reefer, 20&apos; Dry</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Documentation Required for UAE Customs */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-headline text-white">Mandatory Documentation for Dubai Customs</h2>
          <div className="p-5 rounded-3xl bg-[#0A1636]/85 border border-[#ECE6DC]/15 space-y-2 text-xs">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5A12]" /><span>Commercial Invoice &amp; Detailed Packing List</span></div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5A12]" /><span>Master Bill of Lading (Clean on Board)</span></div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5A12]" /><span>Certificate of Origin (COO under India-UAE CEPA for preferential tariff benefits)</span></div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5A12]" /><span>Phytosanitary / Health Certificate (for Agro, Spices, Food items)</span></div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5A12]" /><span>Dubai Municipality Halal Certificate (for processed foods)</span></div>
          </div>
        </section>

        {/* Live Bidding CTA */}
        <div className="p-6 rounded-3xl bg-[#091530] border-2 border-[#1E3E7E] text-center space-y-3">
          <h3 className="text-lg font-bold font-headline text-white">Moving cargo on the India–Dubai corridor?</h3>
          <p className="text-xs text-[#AEB8D6] max-w-md mx-auto">
            Post your shipment on ShipCargo and let licensed carriers bid live for your container loads.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              href="/signup/exporter"
              className="px-5 py-2.5 rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white font-bold text-xs shadow-md transition-all"
            >
              Post Shipment for Live Bidding
            </Link>
            <Link
              href="/find-demand"
              className="px-5 py-2.5 rounded-xl bg-[#13285A] text-[#ECE6DC] border border-[#ECE6DC]/20 font-bold text-xs transition-all"
            >
              View Dubai Buyer Demands
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
