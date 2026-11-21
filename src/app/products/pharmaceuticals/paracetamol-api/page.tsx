import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbsSchema, generateProductCatalogSchema } from "@/lib/seo-schema";
import { Pill, ShieldCheck, CheckCircle2, ArrowRight, FileCheck, FlaskConical, Box, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Paracetamol API (Acetaminophen) Export from India | HS 29222933 Specifications",
  description:
    "Source high-purity Paracetamol API (IP/BP/USP/Ph.Eur) from WHO-GMP certified Indian bulk drug manufacturers. COA verification, open-part DMF, and live freight bidding.",
  alternates: {
    canonical: "/products/pharmaceuticals/paracetamol-api",
  },
};

export default function ParacetamolApiProductPage() {
  const url = "/products/pharmaceuticals/paracetamol-api";

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/find-demand" },
    { name: "Pharmaceuticals", url: "/find-demand?q=pharmaceuticals" },
    { name: "Paracetamol API", url },
  ];

  const productSchema = generateProductCatalogSchema({
    name: "Paracetamol API (Acetaminophen Bulk Drug)",
    description:
      "Pharma-grade Paracetamol Active Pharmaceutical Ingredient (CAS 103-90-2) conforming to IP/BP/USP/Ph.Eur standards. Sourced from WHO-GMP inspected manufacturing facilities in India.",
    url,
    hsCode: "29222933",
    category: "Pharmaceutical Bulk Drugs & Active Ingredients",
    countryOfOrigin: "IN",
  });

  return (
    <main className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbsSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-[#AEB8D6] flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/find-demand" className="text-[#AEB8D6] hover:text-white transition-colors">Products</Link>
          <span>/</span>
          <span className="text-[#AEB8D6]">Pharmaceuticals</span>
          <span>/</span>
          <span className="text-[#ECE6DC] font-semibold">Paracetamol API</span>
        </nav>

        {/* Header */}
        <div className="space-y-4 border-b border-[#ECE6DC]/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30">
            <Pill className="w-3.5 h-3.5" />
            <span>HS Code: 2922.29.33 · CAS 103-90-2 · WHO-GMP Certified</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-headline tracking-tight text-white">
            Paracetamol API (Acetaminophen) Export Sourcing
          </h1>
          <p className="text-lg text-[#AEB8D6] leading-relaxed">
            Direct export sourcing from verified bulk drug manufacturing clusters in Hyderabad (Telangana), Ankleshwar (Gujarat), and Tarapur (Maharashtra). Batch Certificate of Analysis (COA), DMF dossiers, and tamper-proof Document Room escrow releases.
          </p>
        </div>

        {/* Specifications Matrix */}
        <div className="p-6 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-[#FF5A12]" />
            <span>Chemical &amp; Pharmacopoeia Specifications</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#13285A]/60 border border-[#ECE6DC]/10 flex justify-between items-center">
              <span className="text-[#AEB8D6]">Pharmacopoeia Standards</span>
              <span className="font-mono font-bold text-white">IP / BP / USP / Ph.Eur / JP</span>
            </div>
            <div className="p-4 rounded-xl bg-[#13285A]/60 border border-[#ECE6DC]/10 flex justify-between items-center">
              <span className="text-[#AEB8D6]">Assay (Purity, Anhydrous)</span>
              <span className="font-mono font-bold text-white">99.0% – 101.0%</span>
            </div>
            <div className="p-4 rounded-xl bg-[#13285A]/60 border border-[#ECE6DC]/10 flex justify-between items-center">
              <span className="text-[#AEB8D6]">Physical Appearance</span>
              <span className="font-mono font-bold text-white">White Crystalline Powder</span>
            </div>
            <div className="p-4 rounded-xl bg-[#13285A]/60 border border-[#ECE6DC]/10 flex justify-between items-center">
              <span className="text-[#AEB8D6]">Melting Range</span>
              <span className="font-mono font-bold text-white">168.0°C – 172.0°C</span>
            </div>
            <div className="p-4 rounded-xl bg-[#13285A]/60 border border-[#ECE6DC]/10 flex justify-between items-center">
              <span className="text-[#AEB8D6]">Loss on Drying / Moisture</span>
              <span className="font-mono font-bold text-white">Max 0.50% (Karl Fischer)</span>
            </div>
            <div className="p-4 rounded-xl bg-[#13285A]/60 border border-[#ECE6DC]/10 flex justify-between items-center">
              <span className="text-[#AEB8D6]">Free 4-Aminophenol (Impurity K)</span>
              <span className="font-mono font-bold text-white">NMT 50 ppm (0.005%)</span>
            </div>
            <div className="p-4 rounded-xl bg-[#13285A]/60 border border-[#ECE6DC]/10 flex justify-between items-center">
              <span className="text-[#AEB8D6]">Residue on Ignition (Sulfated Ash)</span>
              <span className="font-mono font-bold text-white">Max 0.10%</span>
            </div>
            <div className="p-4 rounded-xl bg-[#13285A]/60 border border-[#ECE6DC]/10 flex justify-between items-center">
              <span className="text-[#AEB8D6]">Heavy Metals</span>
              <span className="font-mono font-bold text-white">NMT 10 ppm</span>
            </div>
            <div className="p-4 rounded-xl bg-[#13285A]/60 border border-[#ECE6DC]/10 flex justify-between items-center">
              <span className="text-[#AEB8D6]">Related Substances (Total Impurities)</span>
              <span className="font-mono font-bold text-white">NMT 0.50%</span>
            </div>
            <div className="p-4 rounded-xl bg-[#13285A]/60 border border-[#ECE6DC]/10 flex justify-between items-center">
              <span className="text-[#AEB8D6]">Physical Granulation Variants</span>
              <span className="font-mono font-bold text-white">Powder / Micronized / DC 90%</span>
            </div>
          </div>
        </div>

        {/* Regulatory & Packaging Protocols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Plant Compliance &amp; Regulatory Filings</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-[#AEB8D6]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>WHO-GMP &amp; CDSCO:</strong> Valid drug manufacturing license issued by state FDAs and CDSCO India.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Written Confirmation (WC):</strong> Issued by CDSCO under Directive 2011/62/EU for all EU member destination shipments.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Technical Dossier Support:</strong> CTD/eCTD format Drug Master File (DMF Open Part) available for regulatory filings.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Stability Studies:</strong> Long-term (25°C/60% RH) and accelerated (40°C/75% RH) ICH Q1A data available.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Box className="w-5 h-5 text-[#FF5A12]" />
              <span>Export Packaging &amp; Ocean Loadability</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-[#AEB8D6]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5A12] shrink-0 mt-0.5" />
                <span><strong>Primary Packaging:</strong> 25 kg UN-approved fiber drums with dual pharma-grade polyethylene inner liners, heat sealed with silica pouches.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5A12] shrink-0 mt-0.5" />
                <span><strong>Bulk Packaging:</strong> 500 kg or 1000 kg moisture-barrier polypropylene Jumbo Big Bags on heat-treated ISPM-15 wooden pallets.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5A12] shrink-0 mt-0.5" />
                <span><strong>20&apos; FCL Loadability:</strong> 18.0 Metric Tons (720 drums palletized &amp; stretch-wrapped) or 20.0 MT floor loaded.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5A12] shrink-0 mt-0.5" />
                <span><strong>Gateway Ocean Ports:</strong> Direct sea-freight dispatch from JNPT Nhava Sheva (Mumbai), Mundra, or Visakhapatnam.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quality Workflow */}
        <div className="p-6 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#FF5A12]" />
            <span>ShipCargo 4-Stage Sourcing &amp; Quality Workflow</span>
          </h3>
          <div className="space-y-3 text-xs sm:text-sm text-[#AEB8D6]">
            <p>
              1. <strong>Technical Dossier &amp; COA Pre-Check:</strong> Exporter uploads batch Certificate of Analysis, residual solvent test data, and manufacturing facility licenses to the secure Document Room.
            </p>
            <p>
              2. <strong>Analytical Pre-Shipment Sample Dispatch:</strong> Manufacturer dispatches a 100g – 250g laboratory sample under sealed temperature-logged chain of custody to the buyer&apos;s testing facility.
            </p>
            <p>
              3. <strong>Document Room Sign-Off &amp; Live Freight Auction:</strong> Once analytical approval is recorded, the export shipment is released for reverse freight bidding among certified FMC/MTO carriers.
            </p>
            <p>
              4. <strong>Let Export Order (LEO) &amp; Payment Settlement:</strong> Commercial invoice, packing list, Certificate of Origin, and ICEGATE LEO are shared electronically for seamless LC / Escrow release.
            </p>
          </div>
        </div>

        {/* Sourcing CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#18367A] to-[#0A1636] border border-[#FF5A12]/30">
          <div>
            <h4 className="text-lg font-bold text-white">Source Paracetamol API from Certified Indian Manufacturers</h4>
            <p className="text-xs text-[#AEB8D6]">Post procurement requirements or participate in active international bulk drug inquiries.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/for-importers"
              className="px-5 py-3 rounded-xl bg-[#FF5A12] text-white font-bold text-xs hover:bg-[#E04800] transition-all shadow-md"
            >
              Post Sourcing RFP ➔
            </Link>
            <Link
              href="/find-demand"
              className="px-5 py-3 rounded-xl bg-[#13285A] border border-[#ECE6DC]/20 text-white font-bold text-xs hover:border-[#ECE6DC]/40 transition-all"
            >
              Browse Demand Radar
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 flex flex-col sm:flex-row justify-between gap-2">
          <span>Standards: Indian Pharmacopoeia (IPC), United States Pharmacopeia (USP), European Pharmacopoeia (Ph.Eur)</span>
          <span>Last verified: 21 November 2026</span>
        </footer>

      </div>
    </main>
  );
}
