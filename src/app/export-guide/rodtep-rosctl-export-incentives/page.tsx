import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/seo-config";
import { generateArticleSchema, generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { CheckCircle2, ArrowRight, ShieldCheck, Scale, Award, FileSpreadsheet, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "RoDTEP & RoSCTL Export Incentives Guide 2026 | Rates & Scrip Process",
  description:
    "Comprehensive guide to RoDTEP and RoSCTL export benefit schemes. Learn how to claim electronic duty scrips on ICEGATE, eligible items, rates, and ledger transfer rules.",
  alternates: {
    canonical: "/export-guide/rodtep-rosctl-export-incentives",
  },
};

export default function RodtepRosctlGuide() {
  const url = "/export-guide/rodtep-rosctl-export-incentives";
  const datePublished = "2026-02-10";
  const dateModified = "2026-11-21";

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Export Guide", url: "/export-guide/how-to-start-export-business-india" },
    { name: "RoDTEP & RoSCTL Incentives", url },
  ];

  const citations = [
    "DGFT Notification No. 76/2021-Customs & Notification No. 70/2024",
    "CBIC Circular No. 23/2021-Customs (Electronic Duty Credit Ledger Regulations)",
    "Foreign Trade Policy (FTP 2023), Chapter 4 (Duty Remission Schemes)",
  ];

  const articleSchema = generateArticleSchema({
    title: "RoDTEP & RoSCTL Export Incentives Guide: Eligibility, Rates & ICEGATE Scrip Process",
    description: metadata.description as string,
    url,
    datePublished,
    dateModified,
    citations,
  });

  return (
    <article className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbsSchema(breadcrumbs)) }}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-[#AEB8D6] flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/export-guide/how-to-start-export-business-india" className="hover:text-white transition-colors">Export Guide</Link>
          <span>/</span>
          <span className="text-white font-medium">RoDTEP &amp; RoSCTL Guide</span>
        </nav>

        {/* Article Header */}
        <header className="space-y-3 border-b border-[#ECE6DC]/15 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30 uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>Export Duty Remission &amp; Incentives</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-headline text-white leading-tight">
            RoDTEP &amp; RoSCTL Export Schemes: Step-by-Step Claim &amp; ICEGATE Scrip Guide
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#AEB8D6]">
            <span>Author: ShipCargo Trade Advisory</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">Last verified: 21 November 2026</span>
            <span>•</span>
            <span>FTP 2023 Compliant</span>
          </div>
        </header>

        {/* Content Body */}
        <section className="space-y-8 text-sm leading-relaxed text-[#ECE6DC]/90">
          
          <div className="p-5 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
            <h2 className="font-bold text-white text-base flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#FF5A12]" />
              Executive Summary for Exporters
            </h2>
            <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
              India&apos;s Foreign Trade Policy strictly adheres to the principle that <em>&quot;taxes and duties should not be exported with goods.&quot;</em> The <strong>RoDTEP</strong> (Remission of Duties and Taxes on Exported Products) and <strong>RoSCTL</strong> (Rebate of State and Central Taxes and Levies) schemes reimburse previously unrefunded central, state, and municipal levies incurred throughout the manufacturing and logistics chain.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-headline text-white">
              1. Understanding RoDTEP vs. RoSCTL
            </h2>
            <p>
              Both schemes issue benefits as <strong>freely transferable electronic duty credit scrips</strong> registered in the exporter&apos;s ICEGATE ledger. However, they cater to distinct tariff schedules:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#13285A]/70 border border-[#ECE6DC]/15 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-base">RoDTEP Scheme</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF5A12]/20 text-[#FF5A12] font-bold">Broad Coverage</span>
                </div>
                <p className="text-xs text-[#AEB8D6] leading-relaxed">
                  Administered by the Department of Commerce (DGFT) &amp; CBIC. Covers over 10,000+ tariff lines across agriculture, chemicals, plastics, metals, machinery, and automotive components.
                </p>
                <div className="text-xs text-emerald-400 font-mono">
                  Average Rates: 0.5% – 4.3% of FOB value
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#13285A]/70 border border-[#ECE6DC]/15 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-base">RoSCTL Scheme</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">Apparel &amp; Made-Ups</span>
                </div>
                <p className="text-xs text-[#AEB8D6] leading-relaxed">
                  Administered by Ministry of Textiles. Exclusively applies to HS Chapters 61 (Apparel/Clothing Knitted), 62 (Apparel Not Knitted), and 63 (Other Made-Up Textile Articles).
                </p>
                <div className="text-xs text-blue-300 font-mono">
                  Average Rates: Up to 6.05% for apparel
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-headline text-white">
              2. What Embedded Taxes Are Reimbursed?
            </h2>
            <p>
              Standard GST Input Tax Credit (ITC) covers CGST, SGST, and IGST paid on raw materials. However, many embedded local and central levies remained un-refunded prior to RoDTEP:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#C9D2EE]">
              <li className="p-3.5 rounded-xl bg-[#0A1636]/60 border border-[#ECE6DC]/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Electricity Duty:</strong> State taxes on power consumed during raw material processing and factory assembly.</span>
              </li>
              <li className="p-3.5 rounded-xl bg-[#0A1636]/60 border border-[#ECE6DC]/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Fuel Taxes (VAT &amp; Excise):</strong> Taxes on diesel and petrol consumed during freight transportation and captive power generation.</span>
              </li>
              <li className="p-3.5 rounded-xl bg-[#0A1636]/60 border border-[#ECE6DC]/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Mandi Tax &amp; APMC Levies:</strong> Agricultural market cess paid during agricultural procurement.</span>
              </li>
              <li className="p-3.5 rounded-xl bg-[#0A1636]/60 border border-[#ECE6DC]/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Stamp Duty:</strong> Stamp duty paid on export financing agreements, bills of exchange, and port gate passes.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-headline text-white">
              3. Step-by-Step Claim Process on ICEGATE
            </h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#0A1636]/90 border border-[#ECE6DC]/10 space-y-1.5">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-[#FF5A12] text-white flex items-center justify-center text-xs font-mono">1</span>
                  <span>Mandatory Declaration in Shipping Bill (Checklist Stage)</span>
                </div>
                <p className="text-xs text-[#AEB8D6] pl-8">
                  During shipping bill filing via your Customs Broker (CHA) or direct ICEGATE portal, you <strong>must flag item-level declaration</strong> as <code className="text-[#FF5A12] bg-[#FF5A12]/10 px-1 py-0.5 rounded font-mono font-bold">RODTEPY</code> (or <code className="text-blue-300 bg-blue-500/10 px-1 py-0.5 rounded font-mono font-bold">ROSCTLY</code>). If marked &apos;N&apos;, the benefit is forfeited and cannot be claimed post-shipment without high-level administrative intervention.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0A1636]/90 border border-[#ECE6DC]/10 space-y-1.5">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-[#FF5A12] text-white flex items-center justify-center text-xs font-mono">2</span>
                  <span>Export General Manifest (EGM) Filing &amp; Scroll Generation</span>
                </div>
                <p className="text-xs text-[#AEB8D6] pl-8">
                  Once the vessel sails and the carrier logs the EGM at the gateway port (e.g., JNPT or Mundra), the Customs Electronic Data Interchange (EDI) automatically processes the eligible claims and batches them into a <strong>Duty Credit Scroll</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0A1636]/90 border border-[#ECE6DC]/10 space-y-1.5">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-[#FF5A12] text-white flex items-center justify-center text-xs font-mono">3</span>
                  <span>Electronic Ledger Scrip Creation</span>
                </div>
                <p className="text-xs text-[#AEB8D6] pl-8">
                  Log in to your ICEGATE portal using your Class 3 Digital Signature Certificate (DSC). Navigate to <strong>Services &gt; Duty Credit Scrips</strong>. Select the scrolls generated for your IEC and click <em>&apos;Generate Scrip&apos;</em>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0A1636]/90 border border-[#ECE6DC]/10 space-y-1.5">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-[#FF5A12] text-white flex items-center justify-center text-xs font-mono">4</span>
                  <span>Utilization or Cash Monetization (Transfer)</span>
                </div>
                <p className="text-xs text-[#AEB8D6] pl-8">
                  Scrips are valid for <strong>12 months</strong> from generation. You can either use them to pay Basic Customs Duty (BCD) on imported machinery/raw materials, or transfer them electronically to any other importer in India through ICEGATE ledger transfer for instant liquidity.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-amber-200">
              <span className="font-bold text-amber-300">Crucial Compliance Requirement:</span>
              <p>
                In accordance with CBIC Circular 23/2021, scrip generation is conditional upon actual realization of export proceeds within the RBI FEMA stipulated deadline (ordinarily 9 months from export invoice date). Defaulting in foreign exchange realization leads to automated recovery with interest.
              </p>
            </div>
          </div>

          {/* ShipCargo Integration CTA */}
          <div className="p-6 rounded-3xl bg-[#0A1636] border border-[#ECE6DC]/15 text-center space-y-3">
            <h3 className="text-base font-bold text-white">Optimize Freight Margins Alongside Government Remissions</h3>
            <p className="text-xs text-[#AEB8D6] max-w-xl mx-auto">
              Combine your RoDTEP/RoSCTL margins with real-time ocean freight cost reduction via ShipCargo live reverse bidding.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/tools/freight-rate-calculator"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white font-bold text-xs shadow-md transition-all"
              >
                <span>Calculate Target Freight Savings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/find-demand"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#13285A] border border-[#ECE6DC]/20 hover:border-[#ECE6DC]/40 text-white font-bold text-xs transition-all"
              >
                <span>Browse Global Buyer Demand</span>
              </Link>
            </div>
          </div>

          {/* Statutory References */}
          <footer className="pt-6 border-t border-[#ECE6DC]/10 text-xs font-mono text-[#AEB8D6]/80 space-y-1.5">
            <div className="font-bold text-white">Official Sources &amp; Legal Citations:</div>
            <ul className="list-disc list-inside space-y-1">
              <li>CBIC Circular No. 23/2021-Customs (Electronic Duty Credit Ledger Regulations)</li>
              <li>DGFT Notification No. 76/2021-Customs &amp; Notification No. 70/2024</li>
              <li>Foreign Trade Policy (FTP 2023), Directorate General of Foreign Trade (DGFT)</li>
            </ul>
          </footer>

        </section>
      </div>
    </article>
  );
}
