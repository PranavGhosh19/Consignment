import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbsSchema, generateProductCatalogSchema } from "@/lib/seo-schema";
import { Wheat, ShieldCheck, CheckCircle2, ArrowRight, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "1121 Steam Basmati Rice Export from India | HS 10063020 Specifications",
  description:
    "Source 1121 Steam Basmati Rice from verified Indian millers. Grain length 8.35mm+, APEDA compliance, AGMARK grade, lab test certificates, and live freight bidding.",
  alternates: {
    canonical: "https://www.shipcargo.in/products/grains/1121-steam-basmati-rice"
  }
};

export default function BasmatiRiceProductPage() {
  const breadcrumbSchema = generateBreadcrumbsSchema([
    { name: "Home", item: "https://www.shipcargo.in" },
    { name: "Products", item: "https://www.shipcargo.in/products/spices/dried-red-chillies" },
    { name: "1121 Steam Basmati Rice", item: "https://www.shipcargo.in/products/grains/1121-steam-basmati-rice" }
  ]);

  const productSchema = generateProductCatalogSchema({
    name: "1121 Steam Basmati Rice (Export Grade)",
    description: "Extra-long slender grain 1121 Steam Basmati Rice with minimum average grain length of 8.35mm, moisture below 12.5%, and APEDA non-GMO certification.",
    image: "https://www.shipcargo.in/cargo-ship.png",
    sku: "AGRI-GRAIN-1121-STEAM"
  });

  return (
    <main className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
          <span className="text-[#AEB8D6]">Agricultural Exports</span>
          <span>/</span>
          <span className="text-[#ECE6DC] font-semibold">1121 Steam Basmati Rice</span>
        </nav>

        {/* Header */}
        <div className="space-y-4 border-b border-[#ECE6DC]/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30">
            HS Code: 10063020 · APEDA Regulated
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-headline tracking-tight text-white">
            1121 Steam Basmati Rice Export Sourcing
          </h1>
          <p className="text-lg text-[#AEB8D6] leading-relaxed">
            Direct mill sourcing from Punjab and Haryana basmati belts. Verified milling certificates, pesticide residue lab tests, 
            and tamper-evident Document Room sample approvals.
          </p>
        </div>

        {/* Specifications Matrix */}
        <div className="p-6 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Wheat className="w-5 h-5 text-[#FF5A12]" />
            <span>Export Technical Specifications (FSSAI & APEDA Standard)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#13285A]/60 border border-[#ECE6DC]/10 flex justify-between">
              <span className="text-[#AEB8D6]">Average Grain Length (Raw)</span>
              <span className="font-mono font-bold text-white">8.35 mm – 8.40 mm min</span>
            </div>
            <div className="p-4 rounded-xl bg-[#13285A]/60 border border-[#ECE6DC]/10 flex justify-between">
              <span className="text-[#AEB8D6]">Moisture Content</span>
              <span className="font-mono font-bold text-white">Max 12.5%</span>
            </div>
            <div className="p-4 rounded-xl bg-[#13285A]/60 border border-[#ECE6DC]/10 flex justify-between">
              <span className="text-[#AEB8D6]">Broken Grains (2/3 basis)</span>
              <span className="font-mono font-bold text-white">Max 1.0%</span>
            </div>
            <div className="p-4 rounded-xl bg-[#13285A]/60 border border-[#ECE6DC]/10 flex justify-between">
              <span className="text-[#AEB8D6]">Elongation Ratio</span>
              <span className="font-mono font-bold text-white">2.0x – 2.5x cooked</span>
            </div>
            <div className="p-4 rounded-xl bg-[#13285A]/60 border border-[#ECE6DC]/10 flex justify-between">
              <span className="text-[#AEB8D6]">Damaged / Discolored Grains</span>
              <span className="font-mono font-bold text-white">Max 0.5%</span>
            </div>
            <div className="p-4 rounded-xl bg-[#13285A]/60 border border-[#ECE6DC]/10 flex justify-between">
              <span className="text-[#AEB8D6]">Purity / Admixture</span>
              <span className="font-mono font-bold text-white">95% min purity</span>
            </div>
          </div>
        </div>

        {/* Quality Workflow */}
        <div className="p-6 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-4">
          <h3 className="text-xl font-bold text-white">ShipCargo Sourcing & Testing Process</h3>
          <div className="space-y-3 text-sm text-[#AEB8D6]">
            <p>
              1. <strong>Sample Dispatch:</strong> Exporter sends sealed 500g mill sample to international buyer via DHL/FedEx.
            </p>
            <p>
              2. <strong>Lab Analysis Upload:</strong> DNA purity and Tricyclazole pesticide tests uploaded directly to Document Room.
            </p>
            <p>
              3. <strong>Approval Lock:</strong> Importer logs electronic approval. Once approved, freight goes to live carrier bidding.
            </p>
          </div>
        </div>

        {/* Sourcing CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#18367A] to-[#0A1636] border border-[#FF5A12]/30">
          <div>
            <h4 className="text-lg font-bold text-white">Need 1121 Basmati Rice quotations?</h4>
            <p className="text-xs text-[#AEB8D6]">Explore active buyer demands and register as a verified grain exporter.</p>
          </div>
          <Link
            href="/find-demand"
            className="px-5 py-3 rounded-xl bg-[#FF5A12] text-white font-bold text-xs hover:bg-[#E04800] transition-all shadow-md shrink-0"
          >
            Inspect Grain Demands ➔
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 flex flex-col sm:flex-row justify-between gap-2">
          <span>Sources: APEDA Basmati Export Development Foundation (BEDF), AGMARK Standards, FSSAI</span>
          <span>Last verified: 21 November 2026</span>
        </footer>
      </div>
    </main>
  );
}
