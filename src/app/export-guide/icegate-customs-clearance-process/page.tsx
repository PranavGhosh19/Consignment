import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbsSchema, generateArticleSchema } from "@/lib/seo-schema";
import { ShieldCheck, CheckCircle2, ArrowRight, FileCheck2, Building2, Anchor } from "lucide-react";

export const metadata: Metadata = {
  title: "ICEGATE Customs Clearance Guide | Shipping Bill to LEO Process",
  description:
    "Complete walkthrough of ICEGATE export customs clearance in India: Checklist filing, Shipping Bill generation, e-Sanchit uploads, goods inspection, and Let Export Order (LEO).",
  alternates: {
    canonical: "https://www.shipcargo.in/export-guide/icegate-customs-clearance-process"
  }
};

export default function IcegateClearanceGuidePage() {
  const breadcrumbSchema = generateBreadcrumbsSchema([
    { name: "Home", item: "https://www.shipcargo.in" },
    { name: "Export Guide", item: "https://www.shipcargo.in/export-guide/how-to-start-export-business-india" },
    { name: "ICEGATE Clearance Guide", item: "https://www.shipcargo.in/export-guide/icegate-customs-clearance-process" }
  ]);

  const articleSchema = generateArticleSchema({
    headline: "ICEGATE Export Customs Clearance: From Checklist to Let Export Order (LEO)",
    description: "Step-by-step statutory walkthrough for filing shipping bills on CBIC ICEGATE portal and securing customs LEO clearance.",
    url: "https://www.shipcargo.in/export-guide/icegate-customs-clearance-process",
    datePublished: "2026-02-05T00:00:00Z",
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
          <span className="text-[#ECE6DC] font-semibold">ICEGATE Customs Clearance</span>
        </nav>

        {/* Header */}
        <div className="space-y-4 border-b border-[#ECE6DC]/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30">
            CBIC &amp; Customs Portals
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-headline tracking-tight text-white">
            ICEGATE Customs Clearance: From Checklist to Let Export Order (LEO)
          </h1>
          <p className="text-lg text-[#AEB8D6] leading-relaxed">
            Every container leaving an Indian seaport or Inland Container Depot (ICD) must be processed 
            through the Indian Customs Electronic Gateway (ICEGATE). Here is the statutory clearance sequence under Section 50 of the Customs Act, 1962.
          </p>
        </div>

        {/* 5-Step ICEGATE Workflow */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">The 5 Sequential Clearance Milestones</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-2">
              <span className="font-mono text-base font-bold text-[#FF5A12]">Step 1</span>
              <h3 className="font-bold text-white">Checklist Filing</h3>
              <p className="text-xs text-[#AEB8D6]">CHA or exporter submits invoice, packing list, and LUT details on ICEGATE.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-2">
              <span className="font-mono text-base font-bold text-[#FF5A12]">Step 2</span>
              <h3 className="font-bold text-white">Shipping Bill Number</h3>
              <p className="text-xs text-[#AEB8D6]">Electronic Shipping Bill generated with 7-digit identifier and AD code.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-2">
              <span className="font-mono text-base font-bold text-[#FF5A12]">Step 3</span>
              <h3 className="font-bold text-white">e-Sanchit Upload</h3>
              <p className="text-xs text-[#AEB8D6]">Digitally signed PDF supporting documents uploaded to generate IRN codes.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-2">
              <span className="font-mono text-base font-bold text-[#FF5A12]">Step 4</span>
              <h3 className="font-bold text-white">Port Gate-In &amp; RMS</h3>
              <p className="text-xs text-[#AEB8D6]">Container arrives at dock. Risk Management System assigns Green Channel or examination.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-2">
              <span className="font-mono text-base font-bold text-emerald-400">Step 5</span>
              <h3 className="font-bold text-white">LEO Issued</h3>
              <p className="text-xs text-[#AEB8D6]">Customs officer grants Let Export Order. Container is authorized for vessel loading.</p>
            </div>
          </div>
        </div>

        {/* Why LEO is the Critical Pivot for Ocean Freight */}
        <div className="p-6 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
          <h3 className="text-xl font-bold text-white">Why LEO is the Critical Anchor for Freight</h3>
          <p className="text-sm text-[#AEB8D6] leading-relaxed">
            Without LEO, terminal operators will not load containers on the mother vessel, resulting in container roll-over and demurrage charges. 
            On ShipCargo, carriers coordinate dock gate-in telemetry directly through the live console to ensure clearance before the vessel cut-off time.
          </p>
        </div>

        {/* Footer */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 flex flex-col sm:flex-row justify-between gap-2">
          <span>Sources: CBIC ICEGATE Portal, Indian Customs Act 1962, National Single Window System (NSWS)</span>
          <span>Last verified: 21 November 2026</span>
        </footer>
      </div>
    </main>
  );
}
