import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbsSchema, generateArticleSchema } from "@/lib/seo-schema";
import { DollarSign, ShieldCheck, CheckCircle2, ArrowRight, Lock, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Export Payment Terms India | LC at Sight, Advance TT, DP/DA under FEMA",
  description:
    "Guide to international export payment mechanisms from India: Letter of Credit (LC at Sight / UCP 600), Advance Telegraphic Transfer (TT), and DP/DA collections under RBI FEMA regulations.",
  alternates: {
    canonical: "https://www.shipcargo.in/export-guide/export-payment-terms-lc-advance"
  }
};

export default function ExportPaymentTermsGuidePage() {
  const breadcrumbSchema = generateBreadcrumbsSchema([
    { name: "Home", item: "https://www.shipcargo.in" },
    { name: "Export Guide", item: "https://www.shipcargo.in/export-guide/how-to-start-export-business-india" },
    { name: "Payment Terms Guide", item: "https://www.shipcargo.in/export-guide/export-payment-terms-lc-advance" }
  ]);

  const articleSchema = generateArticleSchema({
    headline: "Export Payment Terms for Indian Exporters: LC at Sight, Advance TT & FEMA Rules",
    description: "Detailed regulatory guide on securing export proceeds, minimizing payment default risk, and meeting RBI EDPMS realization timelines.",
    url: "https://www.shipcargo.in/export-guide/export-payment-terms-lc-advance",
    datePublished: "2026-02-01T00:00:00Z",
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
          <span className="text-[#ECE6DC] font-semibold">Payment Terms</span>
        </nav>

        {/* Title */}
        <div className="space-y-4 border-b border-[#ECE6DC]/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30">
            RBI FEMA &amp; Trade Finance
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-headline tracking-tight text-white">
            Export Payment Terms: Securing Your Global Trade Receivables
          </h1>
          <p className="text-lg text-[#AEB8D6] leading-relaxed">
            Understanding payment structures is the cornerstone of risk management for Indian exporters. 
            Under the Foreign Exchange Management Act (FEMA 1999), all export proceeds must be realized within 
            9 months from the date of export, monitored through the RBI Export Data Processing and Monitoring System (EDPMS).
          </p>
        </div>

        {/* Payment Methods Comparison */}
        <div className="p-6 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#FF5A12]" />
            <span>4 Primary Payment Mechanisms Compared</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#13285A] text-white font-mono uppercase text-xs border-b border-[#ECE6DC]/20">
                <tr>
                  <th className="p-3">Payment Method</th>
                  <th className="p-3">Risk to Exporter</th>
                  <th className="p-3">Security Level</th>
                  <th className="p-3">Statutory Framework</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECE6DC]/10 text-[#AEB8D6]">
                <tr>
                  <td className="p-3 font-bold text-emerald-400">Advance Telegraphic Transfer (TT)</td>
                  <td className="p-3">Zero Risk (Funds in hand before vessel loading)</td>
                  <td className="p-3 font-semibold text-white">Highest</td>
                  <td className="p-3">FEMA Advance Remittance Rules</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-blue-400">Irrevocable LC at Sight</td>
                  <td className="p-3">Low (Issuing bank undertakes payment on clean documents)</td>
                  <td className="p-3 font-semibold text-white">High</td>
                  <td className="p-3">ICC UCP 600 Rules</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-amber-400">Documents Against Payment (DP)</td>
                  <td className="p-3">Moderate (Buyer must pay bank before taking title B/L)</td>
                  <td className="p-3 font-semibold text-white">Medium</td>
                  <td className="p-3">ICC URC 522 Collections</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-red-400">Documents Against Acceptance (DA)</td>
                  <td className="p-3">High (Buyer receives B/L on promising payment in 30–90 days)</td>
                  <td className="p-3 font-semibold text-white">Lowest</td>
                  <td className="p-3">Requires ECGC Credit Insurance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* EDPMS & e-BRC Realization Guidance */}
        <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
          <h3 className="text-xl font-bold text-white">How Bank Realization (e-BRC) Closes in EDPMS</h3>
          <p className="text-sm text-[#AEB8D6] leading-relaxed">
            When your overseas buyer pays via SWIFT wire into your bank account, your Authorized Dealer (AD) bank matches 
            the inward remittance with the Shipping Bill number in the RBI EDPMS portal. Once matched, the bank issues 
            an electronic Bank Realization Certificate (e-BRC). This e-BRC is mandatory to claim RoDTEP export incentives and DGFT duty scrips.
          </p>
        </div>

        {/* Link to Document Room */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#18367A] to-[#0A1636] border border-[#FF5A12]/30">
          <div>
            <h4 className="text-base font-bold text-white">Manage trade finance documents in one secure vault</h4>
            <p className="text-xs text-[#AEB8D6]">Keep LC drafts, SWIFT advices, and COAs permanently organized in the Document Room.</p>
          </div>
          <Link
            href="/document-room"
            className="px-4 py-2.5 rounded-xl bg-[#FF5A12] text-white font-bold text-xs hover:bg-[#E04800] transition-all shrink-0"
          >
            Open Document Room ➔
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 flex flex-col sm:flex-row justify-between gap-2">
          <span>Sources: RBI Master Direction on Export of Goods, ICC UCP 600, ECGC Credit Guidelines</span>
          <span>Last verified: 21 November 2026</span>
        </footer>
      </div>
    </main>
  );
}
