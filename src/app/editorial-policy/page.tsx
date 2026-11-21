import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, absoluteUrl } from "@/lib/seo-config";
import { generateArticleSchema, generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { ShieldCheck, CheckCircle2, FileText, ExternalLink, Scale, Clock, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial & Regulatory Verification Policy",
  description:
    "Standards, fact-checking guidelines, and official statutory sources (DGFT, CBIC, GST, RBI) for all export documentation published by ShipCargo.",
  alternates: {
    canonical: "/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Editorial Policy", url: "/editorial-policy" },
  ];

  const breadcrumbsSchema = generateBreadcrumbsSchema(breadcrumbs);

  return (
    <main className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-3 border-b border-[#ECE6DC]/15 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30 uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Standards &amp; Governance</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-white">
            Editorial &amp; Regulatory Verification Policy
          </h1>

          <p className="text-sm sm:text-base text-[#C9D2EE] leading-relaxed">
            Every trade compliance guide, documentation checklist, and export procedure published by ShipCargo is independently verified against official Indian and international statutory portals.
          </p>

          <div className="flex items-center gap-4 text-xs font-mono text-[#AEB8D6] pt-2">
            <span>Author: ShipCargo Trade Compliance Desk</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">Last verified: 21 November 2026</span>
          </div>
        </div>

        {/* Section 1: Verification Hierarchy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-headline text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#FF5A12]" />
            1. Primary Statutory Authorities
          </h2>
          <p className="text-sm leading-relaxed text-[#ECE6DC]/90">
            ShipCargo does not rely on secondary blogs, unsourced forum posts, or unverified hearsay. Compliance directives are checked directly against notifications published by the following bodies:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {[
              {
                authority: "Directorate General of Foreign Trade (DGFT)",
                domain: "Foreign Trade Policy (FTP 2023), IEC Rules, RCMC & RoDTEP Schedules",
                source: "https://www.dgft.gov.in",
              },
              {
                authority: "Central Board of Indirect Taxes & Customs (CBIC)",
                domain: "Customs Act 1962, ICEGATE e-SANCHIT, Shipping Bill Filing & Duty Drawback",
                source: "https://www.icegate.gov.in",
              },
              {
                authority: "Goods and Services Tax (GST) Council",
                domain: "CGST Section 16 (Zero-Rated Exports), Letter of Undertaking (LUT) & Form RFD-01",
                source: "https://www.gst.gov.in",
              },
              {
                authority: "Reserve Bank of India (RBI)",
                domain: "FEMA Export Regulations, EDPMS Inward Remittance Reconciliation & IRM / e-BRC",
                source: "https://www.rbi.org.in",
              },
            ].map((auth, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/10 space-y-1.5">
                <div className="font-bold text-white text-sm">{auth.authority}</div>
                <div className="text-xs text-[#AEB8D6]">{auth.domain}</div>
                <a
                  href={auth.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-[#FF5A12] hover:underline pt-1"
                >
                  <span>{auth.source}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Zero Plagiarism & Anti-Spam Commitment */}
        <section className="space-y-3 p-6 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15">
          <h2 className="text-xl font-bold font-headline text-white">2. Anti-Spam &amp; User-First Commitment</h2>
          <p className="text-xs sm:text-sm text-[#C9D2EE] leading-relaxed">
            We adhere strictly to Google Search Quality Guidelines:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-[#ECE6DC]/90">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF5A12] shrink-0 mt-0.5" />
              <span><strong>No Programmatic Scaled Content:</strong> We do not mass-produce templated city/keyword variants with thin, spun text. Every published page answers a distinct trade question.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF5A12] shrink-0 mt-0.5" />
              <span><strong>No Fabricated Testimonials:</strong> We never invent fake exporter reviews, false ratings, or synthetic trade volumes. Missing factual parameters are marked explicitly as placeholders until legally validated.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF5A12] shrink-0 mt-0.5" />
              <span><strong>Strict UGC Moderation Gate:</strong> Public exporter profiles and buyer requirements are never automatically indexed. They must pass identity verification and quality thresholds before being included in search sitemaps.</span>
            </li>
          </ul>
        </section>

        {/* Section 3: Corrections & Inquiries */}
        <section className="space-y-2 text-xs sm:text-sm text-[#AEB8D6] border-t border-[#ECE6DC]/15 pt-6">
          <h3 className="font-bold text-white">Corrections &amp; Trade Inquiries</h3>
          <p>
            If you notice a statutory discrepancy or regulatory update (such as changes to RoDTEP tariff lines or GST notification amendments), notify our compliance desk at{" "}
            <a href="mailto:compliance@shipcargo.in" className="text-[#FF5A12] hover:underline font-mono">
              compliance@shipcargo.in
            </a>
            . Corrections are reviewed within 48 business hours.
          </p>
        </section>

      </div>
    </main>
  );
}
