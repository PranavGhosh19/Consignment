import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { ShieldCheck, Lock, EyeOff, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | ShipCargo Data Protection & Trade Confidentiality",
  description:
    "Read the ShipCargo Privacy Policy: how we handle trade data, document encryption, exporter business records, importer requirement summaries, and statutory ICEGATE/DGFT compliance.",
  alternates: {
    canonical: "https://www.shipcargo.in/privacy"
  }
};

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = generateBreadcrumbsSchema([
    { name: "Home", item: "https://www.shipcargo.in" },
    { name: "Privacy Policy", item: "https://www.shipcargo.in/privacy" }
  ]);

  return (
    <main className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-[#AEB8D6] flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#ECE6DC] font-semibold">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="space-y-3 border-b border-[#ECE6DC]/15 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30">
            Legal & Data Protection
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-headline tracking-tight text-white">
            Privacy & Trade Data Protection Policy
          </h1>
          <p className="text-sm font-mono text-[#AEB8D6]">
            Effective Date: 1 January 2026 · Last verified: 21 November 2026
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-sm sm:text-base text-[#ECE6DC]/90 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#FF5A12]" />
              <span>1. Overview and Scope</span>
            </h2>
            <p>
              ShipCargo (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the digital trade platform located at https://www.shipcargo.in. 
              This Privacy Policy explains how we collect, process, store, and safeguard trade credentials, business profiles, and documentation 
              provided by exporters, importers, freight carriers, and partner inspection laboratories.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#FF5A12]" />
              <span>2. Trade Data Confidentiality & Non-Disclosure</span>
            </h2>
            <p>
              Cross-border commerce relies heavily on competitive commercial confidentiality. We implement strict safeguards:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#AEB8D6]">
              <li><strong>Anonymized Public Demand:</strong> Publicly visible trade demands display only generic product categories, volume bands, destination countries, and compliance specifications. Importer identity, pricing ceilings, and sensitive buyer records are never broadcast publicly.</li>
              <li><strong>Document Room Access Controls:</strong> Inspection reports, certificates of analysis (COA), bills of lading, and shipping bills uploaded to the Document Room are accessible exclusively to authenticated contract counterparties (the specific exporter, verified importer, and contracted carrier).</li>
              <li><strong>Zero Sale of Trade Intelligence:</strong> We never sell, monetize, or license your proprietary supplier relationships, client lists, or commercial invoices to third-party data aggregators.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#FF5A12]" />
              <span>3. Statutory Verification & Regulatory Disclosures</span>
            </h2>
            <p>
              To maintain trade integrity, reduce customs fraud, and prevent unauthorized transactions, ShipCargo verifies business credentials against official government portals:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#AEB8D6]">
              <li>Importer-Exporter Code (IEC) status via the Directorate General of Foreign Trade (DGFT).</li>
              <li>Goods and Services Tax Identification Number (GSTIN) verification and active LUT status via the GST Portal.</li>
              <li>FMC / MTO licensing for ocean freight forwarders and multi-modal transport operators.</li>
              <li>Mandatory disclosures required under Indian Customs Act, 1962, Foreign Exchange Management Act (FEMA), and Prevention of Money Laundering Act (PMLA).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-[#FF5A12]" />
              <span>4. Data Retention & Document Storage</span>
            </h2>
            <p>
              In accordance with Reserve Bank of India (RBI) master directions on export realization and CBIC guidelines, export documentation 
              (including Shipping Bills, e-BRC / FIRC records, and contracts) is retained in encrypted cloud archives for a mandatory period 
              of 5 years following export completion, after which records may be scheduled for cryptographic deletion upon request.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Grievance Officer & Contact</h2>
            <p>
              In accordance with Information Technology Act, 2000 and Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021:
            </p>
            <div className="p-4 rounded-xl bg-[#0A1636]/60 border border-[#ECE6DC]/10 font-mono text-xs text-[#AEB8D6] space-y-1">
              <p>Grievance Officer: [PLACEHOLDER: Name of Grievance Officer]</p>
              <p>Email: grievance@shipcargo.in · CC: privacy@shipcargo.in</p>
              <p>Address: [PLACEHOLDER: Registered Corporate Office, City, State, PIN]</p>
              <p>Response Time: Statutory acknowledgment within 24 hours; resolution within 15 days.</p>
            </div>
          </section>
        </div>

        {/* Verification Footer */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 flex flex-col sm:flex-row justify-between gap-2">
          <span>Compliant with Indian IT Act, 2000 & DPDP Act, 2023 guidelines</span>
          <span>Last verified: 21 November 2026</span>
        </footer>
      </div>
    </main>
  );
}
