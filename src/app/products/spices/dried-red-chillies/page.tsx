import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, absoluteUrl } from "@/lib/seo-config";
import { generateProductCatalogSchema, generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { CheckCircle2, FileCheck2, Building2, ArrowRight, ShieldCheck, Scale, ExternalLink, Ship, Package, FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "Export Dried Red Chillies from India (Teja S17 Specs, HS 0904.21)",
  description:
    "Direct sourcing specifications for Indian Dried Red Chillies (Teja, S17, Sanam, Byadgi). HS Code 0904.21, Spices Board sampling protocols, Aflatoxin limits, packaging, and registered exporters.",
  alternates: {
    canonical: "/products/spices/dried-red-chillies",
  },
};

export default function DriedRedChilliesProductPage() {
  const url = "/products/spices/dried-red-chillies";
  const hsCode = "0904.21.10";

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "Spices", url: "/products/spices" },
    { name: "Dried Red Chillies", url },
  ];

  const productSchema = generateProductCatalogSchema({
    name: "Indian Dried Red Chillies (Teja / S17 / Sanam)",
    description: metadata.description as string,
    url,
    hsCode,
    category: "Agricultural Commodities > Spices",
  });

  return (
    <main className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbsSchema(breadcrumbs)) }}
      />

      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-[#AEB8D6] flex items-center gap-2">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-[#8FB0FF]">Products</span>
          <span>/</span>
          <span className="text-[#8FB0FF]">Spices</span>
          <span>/</span>
          <span className="text-white">Dried Red Chillies</span>
        </nav>

        {/* Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#ECE6DC]/15 pb-8">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30 uppercase">
              <span>Origin: Guntur &amp; Warangal, India</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-white leading-tight">
              Indian Dried Red Chillies{" "}
              <span className="text-[#FF5A12] block sm:inline">(Teja / S17 / Sanam)</span>
            </h1>

            <p className="text-sm sm:text-base text-[#C9D2EE] leading-relaxed">
              India produces over 45% of the world&apos;s dried chillies. Known for high capsaicin heat, rich red ASTA color, and strict compliance with Spices Board quality testing for overseas markets.
            </p>

            {/* Quick Sourcing Tags */}
            <div className="flex flex-wrap gap-2 text-xs font-mono pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-[#0A1636] border border-[#ECE6DC]/10 text-white">HS Code: <b>0904.21.10</b></span>
              <span className="px-2.5 py-1 rounded-lg bg-[#0A1636] border border-[#ECE6DC]/10 text-white">Peak Crop: <b>Jan – April</b></span>
              <span className="px-2.5 py-1 rounded-lg bg-[#0A1636] border border-[#ECE6DC]/10 text-white">Standard Order: <b>14 MT (20&apos; FCL) / 28 MT (40&apos; HC)</b></span>
            </div>
          </div>

          {/* Sourcing Action Card (No login required) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0A1636]/90 border-2 border-[#1E3E7E] space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold font-headline text-white">Source Directly from Verified Indian Exporters</h2>
            <p className="text-xs text-[#AEB8D6]">
              Request certified pre-shipment samples or submit your destination port specs for competitive container bids.
            </p>
            <div className="space-y-2.5 pt-1">
              <Link
                href="/find-demand"
                className="w-full py-3 rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white font-bold text-xs font-headline flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <FlaskConical className="w-4 h-4" />
                <span>Request a Tested Sample</span>
              </Link>
              <Link
                href="/tools/freight-rate-calculator"
                className="w-full py-3 rounded-xl bg-[#13285A] hover:bg-[#1C3A7E] text-white border border-[#ECE6DC]/20 font-bold text-xs font-headline flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Ship className="w-4 h-4 text-[#FF5A12]" />
                <span>Estimate Container Freight Rates</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Detailed Technical Specifications Grid */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-headline text-white">Grading &amp; Quality Parameters</h2>
          <div className="rounded-2xl bg-[#0A1636]/85 border border-[#ECE6DC]/15 overflow-hidden">
            <table className="w-full text-xs font-mono text-left">
              <thead className="bg-[#13285A] text-[#AEB8D6] uppercase tracking-wider border-b border-[#ECE6DC]/10">
                <tr>
                  <th className="p-3.5">Parameter</th>
                  <th className="p-3.5">Teja / S17 (High Heat)</th>
                  <th className="p-3.5">S334 / Sanam (Medium Heat)</th>
                  <th className="p-3.5">Byadgi (High Color)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECE6DC]/10 text-[#ECE6DC]">
                <tr>
                  <td className="p-3.5 font-bold text-white">Capsaicin (SHU)</td>
                  <td className="p-3.5 text-[#FF5A12] font-semibold">65,000 – 90,000 SHU</td>
                  <td className="p-3.5">25,000 – 40,000 SHU</td>
                  <td className="p-3.5">10,000 – 25,000 SHU</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">ASTA Color Value</td>
                  <td className="p-3.5">50 – 70 ASTA</td>
                  <td className="p-3.5">60 – 80 ASTA</td>
                  <td className="p-3.5 text-emerald-400 font-semibold">120 – 160 ASTA</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Moisture Content</td>
                  <td className="p-3.5">&lt; 11.0% Max</td>
                  <td className="p-3.5">&lt; 11.0% Max</td>
                  <td className="p-3.5">&lt; 11.5% Max</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Aflatoxin (B1+B2+G1+G2)</td>
                  <td className="p-3.5">&lt; 5.0 ppb (EU / US Compliant)</td>
                  <td className="p-3.5">&lt; 5.0 ppb</td>
                  <td className="p-3.5">&lt; 5.0 ppb</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Stem Options</td>
                  <td className="p-3.5">Stemless or With Stem</td>
                  <td className="p-3.5">Stemless or With Stem</td>
                  <td className="p-3.5">Stemless or With Stem</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Spices Board Mandatory Protocols */}
        <section className="p-6 rounded-3xl bg-[#0A1636]/90 border border-[#ECE6DC]/15 space-y-3">
          <h2 className="text-xl font-bold font-headline text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#FF5A12]" />
            Spices Board Mandatory Testing &amp; Sampling
          </h2>
          <p className="text-xs sm:text-sm text-[#C9D2EE] leading-relaxed">
            Under Spices Board of India circulars, export consignments destined for the European Union, United States, Japan, and the Middle East are subject to mandatory lab sampling before loading. Test parameters include:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#ECE6DC]">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span>Aflatoxin B1 and Total Aflatoxins (HPLC/LC-MS)</span></li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span>Sudan I–IV dye testing (Strictly Negative)</span></li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span>Pesticide residue screen (Triazophos, Chlorpyrifos)</span></li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span>Microbiological analysis (Salmonella, E. coli Nil)</span></li>
          </ul>
        </section>

        {/* Shipping Corridors & Packaging */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-headline text-white">Packaging &amp; Ocean Logistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/10 space-y-1">
              <span className="font-bold text-white block text-sm">Packaging Formats</span>
              <p className="text-[#AEB8D6]">25kg or 50kg Jute bags, New PP bags, or craft paper bags with silica gel pouches to prevent container moisture condensation.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/10 space-y-1">
              <span className="font-bold text-white block text-sm">Primary Ports of Origin</span>
              <p className="text-[#AEB8D6]">JNPT (Nhava Sheva - BOM), Mundra (MUN), and Chennai (MAA). Inland ICD drayage from Hyderabad and Guntur.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/10 space-y-1">
              <span className="font-bold text-white block text-sm">Key Trade Corridors</span>
              <Link href="/freight/india-to-dubai" className="text-[#FF5A12] hover:underline block pt-0.5">
                India to Dubai (Jebel Ali) · 4-5 Transit Days ➔
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
