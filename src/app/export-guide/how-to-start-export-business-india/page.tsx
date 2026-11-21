import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, absoluteUrl } from "@/lib/seo-config";
import { generateArticleSchema, generateBreadcrumbsSchema } from "@/lib/seo-schema";
import {
  CheckCircle2,
  FileCheck2,
  Building2,
  ArrowRight,
  ShieldCheck,
  Scale,
  ExternalLink,
  BookOpen,
  Calendar,
  AlertCircle,
  HelpCircle,
  Download
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to Start an Export Business in India (2026 Step-by-Step Guide)",
  description:
    "Complete legal & operational roadmap for Indian exporters: Entity setup, DGFT IEC registration, GST LUT filing, AD Code ICEGATE registration, RCMC, sampling, and finding verified international buyers.",
  alternates: {
    canonical: "/export-guide/how-to-start-export-business-india",
  },
};

export default function StartExportBusinessGuide() {
  const url = "/export-guide/how-to-start-export-business-india";
  const datePublished = "2026-01-15";
  const dateModified = "2026-11-21";

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Export Guide", url: "/export-guide/how-to-start-export-business-india" },
    { name: "How to Start an Export Business in India", url },
  ];

  const citations = [
    "https://www.dgft.gov.in (Directorate General of Foreign Trade - FTP 2023)",
    "https://www.icegate.gov.in (Central Board of Indirect Taxes and Customs)",
    "https://www.gst.gov.in (GST Council - Circular 125/44/2019-GST on Zero-Rated Supplies)",
    "https://www.rbi.org.in (RBI Master Direction on Export of Goods and Services)",
  ];

  const articleSchema = generateArticleSchema({
    title: "How to Start an Export Business in India (Complete Compliance Roadmap)",
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

      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-[#AEB8D6] flex items-center gap-2">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <span className="text-[#8FB0FF]">Export Guides</span>
          <span>/</span>
          <span className="text-white truncate">How to Start an Export Business</span>
        </nav>

        {/* Title Header */}
        <header className="space-y-4 border-b border-[#ECE6DC]/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30 uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Pillar Compliance Guide · Trade Setup</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-white leading-tight">
            How to Start an Export Business in India:{" "}
            <span className="text-[#FF5A12]">The Complete Operational Roadmap</span>
          </h1>

          <p className="text-base text-[#C9D2EE] leading-relaxed">
            Starting an export firm from India requires more than just finding an overseas lead. From obtaining your 10-digit DGFT Import Export Code (IEC) to ICEGATE AD Code registration and GST Letter of Undertaking (LUT) zero-rating, here is the verified, step-by-step roadmap.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#AEB8D6] pt-2">
            <span>Author: <strong>ShipCargo Compliance Team</strong></span>
            <span>•</span>
            <span>Reviewed by: <strong>Licensed Customs Broker (CHA)</strong></span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">Last verified: 21 November 2026</span>
          </div>
        </header>

        {/* Executive Summary / Quick Takeaways */}
        <div className="p-6 rounded-3xl bg-[#0A1636]/90 border-2 border-[#1E3E7E] space-y-3">
          <h2 className="text-lg font-bold font-headline text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#FF5A12]" />
            Key Milestones at a Glance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#ECE6DC]/90">
            <div className="p-3 rounded-xl bg-[#13285A]/70 border border-[#ECE6DC]/10">
              <span className="font-bold text-white block mb-0.5">1. Incorporation &amp; IEC</span>
              <span>Register Private Ltd or LLP + obtain DGFT IEC linked to PAN.</span>
            </div>
            <div className="p-3 rounded-xl bg-[#13285A]/70 border border-[#ECE6DC]/10">
              <span className="font-bold text-white block mb-0.5">2. GST &amp; LUT Exemption</span>
              <span>File Form GST RFD-11 annually to export without paying IGST upfront.</span>
            </div>
            <div className="p-3 rounded-xl bg-[#13285A]/70 border border-[#ECE6DC]/10">
              <span className="font-bold text-white block mb-0.5">3. Bank AD Code Registration</span>
              <span>Register 14-digit Authorised Dealer code on ICEGATE for Customs port clearance.</span>
            </div>
            <div className="p-3 rounded-xl bg-[#13285A]/70 border border-[#ECE6DC]/10">
              <span className="font-bold text-white block mb-0.5">4. RCMC Council Membership</span>
              <span>Join Spices Board, APEDA, or FIEO to access RoDTEP incentives.</span>
            </div>
          </div>
        </div>

        {/* Step-by-Step Sections */}
        <section className="space-y-8 text-sm leading-relaxed text-[#ECE6DC]/90">
          
          {/* Step 1 */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold font-headline text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-[#FF5A12] text-[#13285A] flex items-center justify-center font-mono font-bold text-sm">1</span>
              Entity Registration &amp; PAN Setup
            </h2>
            <p>
              Under Chapter 1 of the Foreign Trade Policy (FTP 2023), any individual or business entity wishing to export commercial consignments must operate under a formal tax identity.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#C9D2EE]">
              <li><strong>Recommended Structure:</strong> A Private Limited Company or Limited Liability Partnership (LLP) provides distinct legal entity status and liability separation when executing international LC sales contracts.</li>
              <li><strong>Current Account:</strong> Open a dedicated export-import current account with an Authorized Dealer (AD Category-I) bank licensed by the Reserve Bank of India (RBI).</li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold font-headline text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-[#FF5A12] text-[#13285A] flex items-center justify-center font-mono font-bold text-sm">2</span>
              Obtaining Your Import Export Code (IEC) from DGFT
            </h2>
            <p>
              The Import Export Code is a mandatory 10-digit number issued electronically by the Directorate General of Foreign Trade (DGFT), Ministry of Commerce. Since 2021, the IEC is identical to your business entity&apos;s Permanent Account Number (PAN).
            </p>
            <div className="p-4 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/10 text-xs space-y-2">
              <span className="font-bold text-white block">Official Application Protocol:</span>
              <p>Apply online via the DGFT Portal (<a href="https://www.dgft.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#FF5A12] hover:underline font-mono">www.dgft.gov.in</a>). Statutory fee: ₹500. Annual update window: April–June every year.</p>
              <Link href="/export-guide/iec-registration-dgft-guide" className="inline-flex items-center gap-1 text-[#8FB0FF] font-semibold hover:underline">
                Read our dedicated DGFT IEC registration step-by-step walkthrough ➔
              </Link>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold font-headline text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-[#FF5A12] text-[#13285A] flex items-center justify-center font-mono font-bold text-sm">3</span>
              GST Registration &amp; Letter of Undertaking (LUT)
            </h2>
            <p>
              Under Section 16 of the Central Goods and Services Tax (CGST) Act, 2017, all exports of goods and services are treated as &quot;Zero-Rated Supplies&quot;. Exporters have two options:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
              <div className="p-4 rounded-2xl bg-[#0A1636]/80 border border-emerald-500/30 space-y-1">
                <span className="font-bold text-emerald-400 block text-sm">Option A: Export Under LUT (Recommended)</span>
                <p>File Form GST RFD-11 on the GST portal before export. Zero IGST is payable at the time of shipping. Preserves operating working capital.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-1">
                <span className="font-bold text-white block text-sm">Option B: Export With IGST Payment</span>
                <p>Pay full IGST on the invoice at customs clearance, then claim an automatic refund through ICEGATE Customs integration.</p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold font-headline text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-[#FF5A12] text-[#13285A] flex items-center justify-center font-mono font-bold text-sm">4</span>
              AD Code Registration on ICEGATE
            </h2>
            <p>
              An Authorised Dealer (AD) Code is a 14-digit numeric code given by your current account bank. You cannot generate an electronic Shipping Bill at any Indian seaport (e.g. Mundra, JNPT, Chennai) or air cargo complex without registering this AD code on the Customs ICEGATE portal (<a href="https://www.icegate.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#FF5A12] hover:underline font-mono">www.icegate.gov.in</a>).
            </p>
          </div>

          {/* Step 5 */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold font-headline text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-[#FF5A12] text-[#13285A] flex items-center justify-center font-mono font-bold text-sm">5</span>
              RCMC Registration with Export Promotion Councils
            </h2>
            <p>
              Under paragraph 2.55 of the Foreign Trade Policy, securing a Registration-Cum-Membership Certificate (RCMC) from your relevant Export Promotion Council (EPC) or Commodity Board is mandatory if you want to claim export incentives (such as RoDTEP, RoSCTL, or EPCG authorization).
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#C9D2EE]">
              <li><strong>Spices:</strong> Spices Board of India (<a href="https://www.indianspices.com" target="_blank" rel="noopener noreferrer" className="text-[#FF5A12] hover:underline">indianspices.com</a>)</li>
              <li><strong>Agro Products &amp; Basmati Rice:</strong> APEDA (<a href="https://apeda.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#FF5A12] hover:underline">apeda.gov.in</a>)</li>
              <li><strong>Engineering Goods:</strong> EEPC India (<a href="https://www.eepcindia.org" target="_blank" rel="noopener noreferrer" className="text-[#FF5A12] hover:underline">eepcindia.org</a>)</li>
              <li><strong>Pharmaceuticals:</strong> Pharmexcil (<a href="https://pharmexcil.com" target="_blank" rel="noopener noreferrer" className="text-[#FF5A12] hover:underline">pharmexcil.com</a>)</li>
            </ul>
          </div>

          {/* Worked Example */}
          <div className="p-6 rounded-3xl bg-[#091530] border-2 border-[#1E3E7E] space-y-3">
            <h3 className="text-lg font-bold font-headline text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#FF5A12]" />
              Worked Commercial Example: 50 MT Dried Red Chillies to Dubai
            </h3>
            <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">
              Suppose an exporter in Guntur, Andhra Pradesh receives an inquiry for 50 MT (2x40&apos; HC FCL) of S17 Teja Dried Red Chillies from a Dubai buyer:
            </p>
            <div className="p-4 rounded-2xl bg-[#0A1636] border border-[#ECE6DC]/10 font-mono text-xs space-y-1.5 text-[#ECE6DC]">
              <div className="flex justify-between"><span>Product &amp; HS Code:</span><b>Dried Red Chillies (HS 0904.21)</b></div>
              <div className="flex justify-between"><span>Domestic Ex-Factory Cost:</span><b>₹2,10,000 / MT</b></div>
              <div className="flex justify-between"><span>Inland Freight to JNPT:</span><b>₹8,500 / MT</b></div>
              <div className="flex justify-between"><span>Customs Clearance &amp; Port Dwell:</span><b>₹3,200 / MT</b></div>
              <div className="flex justify-between"><span>Ocean Freight to Jebel Ali:</span><b>$1,820 / 40&apos; HC (~₹3,000/MT)</b></div>
              <div className="flex justify-between border-t border-[#ECE6DC]/15 pt-1.5 text-[#FF5A12]">
                <span>Total CIF Jebel Ali Price:</span>
                <b>$2,760 / MT</b>
              </div>
            </div>
            <p className="text-xs text-[#AEB8D6]">
              With ShipCargo&apos;s live freight bidding, carriers compete down the ocean leg, reducing container costs by $150–$300 per box while lab COA certificates are permanently recorded in the Document Room.
            </p>
          </div>

        </section>

        {/* Call to Action: Next Step into ShipCargo */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#10224D] via-[#13285A] to-[#1E3E7E] border-2 border-[#FF5A12]/40 text-center space-y-4 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-headline text-white">
            Ready to quote live export inquiries?
          </h2>
          <p className="text-xs sm:text-sm text-[#C9D2EE] max-w-xl mx-auto">
            Browse open demand posted by verified international buyers, send lab-approved samples, and let carriers bid live to move your cargo.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/signup/exporter"
              className="px-6 py-3 rounded-2xl bg-[#FF5A12] hover:bg-[#E04800] text-white font-bold text-sm shadow-lg shadow-[#FF5A12]/40 transition-all cursor-pointer"
            >
              Register as an Exporter Free
            </Link>
            <Link
              href="/find-demand"
              className="px-6 py-3 rounded-2xl bg-[#0A1636] hover:bg-[#071026] text-[#ECE6DC] border border-[#ECE6DC]/20 font-bold text-sm transition-all cursor-pointer"
            >
              Explore Country Demand Radar
            </Link>
          </div>
        </section>

        {/* Verification Citations Footer */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 space-y-1">
          <div>Primary Statutory Sources:</div>
          <ul className="list-disc pl-5 space-y-0.5">
            {citations.map((cite, i) => (
              <li key={i}>{cite}</li>
            ))}
          </ul>
        </footer>

      </div>
    </article>
  );
}
