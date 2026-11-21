import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbsSchema, generateArticleSchema } from "@/lib/seo-schema";
import { Scale, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Incoterms 2020 Guide for Indian Exporters | FOB, CIF, EXW Compared",
  description:
    "Plain-English guide to Incoterms 2020 for Indian exporters: compare FOB, CIF, CFR, EXW, and DAP. Learn where risk transfers, who pays freight, and insurance responsibilities.",
  alternates: {
    canonical: "https://www.shipcargo.in/export-guide/incoterms-2020-exporters-guide"
  }
};

export default function IncotermsGuidePage() {
  const breadcrumbSchema = generateBreadcrumbsSchema([
    { name: "Home", item: "https://www.shipcargo.in" },
    { name: "Export Guide", item: "https://www.shipcargo.in/export-guide/how-to-start-export-business-india" },
    { name: "Incoterms 2020 Guide", item: "https://www.shipcargo.in/export-guide/incoterms-2020-exporters-guide" }
  ]);

  const articleSchema = generateArticleSchema({
    headline: "Incoterms 2020 Guide for Indian Exporters: FOB vs CIF vs EXW",
    description: "Learn how Incoterms 2020 determine risk, ocean freight payments, and customs responsibilities for containerized exports from India.",
    url: "https://www.shipcargo.in/export-guide/incoterms-2020-exporters-guide",
    datePublished: "2026-01-20T00:00:00Z",
    dateModified: "2026-11-21T00:00:00Z"
  });

  return (
    <main className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-[#AEB8D6] flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/export-guide/how-to-start-export-business-india" className="hover:text-white transition-colors">Export Guide</Link>
          <span>/</span>
          <span className="text-[#ECE6DC] font-semibold">Incoterms 2020</span>
        </nav>

        {/* Title */}
        <div className="space-y-4 border-b border-[#ECE6DC]/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30">
            ICC 2020 Trade Rules
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-headline tracking-tight text-white">
            Incoterms 2020: The Exporter&apos;s Practical Guide
          </h1>
          <p className="text-lg text-[#AEB8D6] leading-relaxed">
            Incoterms (International Commercial Terms) published by the International Chamber of Commerce (ICC) define 
            exactly where delivery occurs, who contracts carriage, who pays ocean freight, and when risk passes from the seller to the buyer.
          </p>
        </div>

        {/* Comparison Matrix */}
        <div className="p-6 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-4">
          <h2 className="text-xl font-bold text-white">Common Incoterms in Indian Maritime Exports</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#13285A] text-white font-mono uppercase text-xs border-b border-[#ECE6DC]/20">
                <tr>
                  <th className="p-3">Term</th>
                  <th className="p-3">Risk Transfer Point</th>
                  <th className="p-3">Who Pays Ocean Freight?</th>
                  <th className="p-3">Marine Insurance</th>
                  <th className="p-3">Best Suited For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECE6DC]/10 text-[#AEB8D6]">
                <tr>
                  <td className="p-3 font-bold text-[#FF5A12]">FOB (Free on Board)</td>
                  <td className="p-3">When goods are on board vessel at Indian port</td>
                  <td className="p-3 font-semibold text-white">Buyer (Freight Collect)</td>
                  <td className="p-3">Buyer arranges</td>
                  <td className="p-3">Buyers who have global shipping line contracts</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-emerald-400">CIF (Cost, Insurance & Freight)</td>
                  <td className="p-3">When goods are on board vessel (same as FOB)</td>
                  <td className="p-3 font-semibold text-white">Exporter (Prepaid)</td>
                  <td className="p-3">Exporter provides minimum Institute Cargo Clause C</td>
                  <td className="p-3">Exporters using ShipCargo reverse bidding for freight margin</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-blue-400">CFR (Cost & Freight)</td>
                  <td className="p-3">When goods are on board vessel at Indian port</td>
                  <td className="p-3 font-semibold text-white">Exporter (Prepaid)</td>
                  <td className="p-3">Buyer arranges insurance</td>
                  <td className="p-3">Destination markets with mandatory local insurance rules</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-amber-400">EXW (Ex Works)</td>
                  <td className="p-3">At exporter&apos;s factory gate</td>
                  <td className="p-3 font-semibold text-white">Buyer</td>
                  <td className="p-3">Buyer arranges all transit</td>
                  <td className="p-3">Caution: Exporter lacks control over Indian export shipping bill</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Why CIF + ShipCargo Gives Exporters Higher Margins */}
        <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
          <h3 className="text-xl font-bold text-white">Strategic Tip: Why Indian Exporters Win on CIF</h3>
          <p className="text-sm text-[#AEB8D6] leading-relaxed">
            When you quote international buyers on <strong>CIF</strong> rather than FOB, you control the ocean freight booking. 
            By hosting the confirmed shipment on ShipCargo&apos;s live reverse bidding console, verified carriers compete down the container rate. 
            The exporter retains the logistics savings directly in their bottom-line export margin while providing the buyer with landed reliability.
          </p>
        </div>

        {/* Navigation to Glossary and Pricing */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#18367A] to-[#0A1636] border border-[#FF5A12]/30">
          <div>
            <h4 className="text-base font-bold text-white">Want to understand more trade terms?</h4>
            <p className="text-xs text-[#AEB8D6]">Browse our comprehensive dictionary covering LEO, EDPMS, RCMC, and AD Codes.</p>
          </div>
          <Link
            href="/glossary"
            className="px-4 py-2 rounded-xl bg-[#FF5A12] text-white font-bold text-xs hover:bg-[#E04800] transition-all"
          >
            Visit Trade Glossary ➔
          </Link>
        </div>

        {/* Regulatory Footer */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 flex flex-col sm:flex-row justify-between gap-2">
          <span>Official standard: International Chamber of Commerce (ICC) Incoterms 2020 Rules</span>
          <span>Last verified: 21 November 2026</span>
        </footer>
      </div>
    </main>
  );
}
