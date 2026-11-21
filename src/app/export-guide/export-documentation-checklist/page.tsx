import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbsSchema, generateArticleSchema } from "@/lib/seo-schema";
import { CheckSquare, FileText, ArrowRight, ShieldCheck, Download, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Mandatory Export Documentation Checklist India | CBIC & DGFT Requirements",
  description:
    "Complete checklist of mandatory export documents from India: Commercial Invoice, Packing List, Shipping Bill (ICEGATE), Bill of Lading, Certificate of Origin, and e-BRC.",
  alternates: {
    canonical: "https://www.shipcargo.in/export-guide/export-documentation-checklist"
  }
};

export default function ExportDocumentationChecklistPage() {
  const breadcrumbSchema = generateBreadcrumbsSchema([
    { name: "Home", item: "https://www.shipcargo.in" },
    { name: "Export Guide", item: "https://www.shipcargo.in/export-guide/how-to-start-export-business-india" },
    { name: "Export Documentation Checklist", item: "https://www.shipcargo.in/export-guide/export-documentation-checklist" }
  ]);

  const articleSchema = generateArticleSchema({
    headline: "Mandatory Export Documentation Checklist for Indian Exporters",
    description: "Statutory checklist of pre-shipment and post-shipment export documents required by CBIC, ICEGATE, DGFT, and RBI.",
    url: "https://www.shipcargo.in/export-guide/export-documentation-checklist",
    datePublished: "2026-01-15T00:00:00Z",
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
          <span className="text-[#ECE6DC] font-semibold">Documentation Checklist</span>
        </nav>

        {/* Title */}
        <div className="space-y-4 border-b border-[#ECE6DC]/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30">
            CBIC & ICEGATE Regulatory Guide
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-headline tracking-tight text-white">
            Mandatory Export Documentation Checklist from India
          </h1>
          <p className="text-lg text-[#AEB8D6] leading-relaxed">
            As mandated under CBIC Circular No. 40/2017-Customs and Foreign Trade Policy (FTP 2023), Indian customs clearance 
            requires only 3 mandatory commercial documents, supplemented by statutory regulatory certificates for foreign exchange realization.
          </p>
        </div>

        {/* The 3 Core Commercial Documents */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-[#FF5A12]" />
            <span>The 3 Mandatory Customs Documents (CBIC)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-2">
              <span className="text-xs font-mono text-[#FF5A12] font-bold">Document 1</span>
              <h3 className="text-lg font-bold text-white">Bill of Lading / Airway Bill</h3>
              <p className="text-xs text-[#AEB8D6]">Title document issued by carrier proving goods loaded on vessel/aircraft.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-2">
              <span className="text-xs font-mono text-[#FF5A12] font-bold">Document 2</span>
              <h3 className="text-lg font-bold text-white">Commercial Invoice cum Packing List</h3>
              <p className="text-xs text-[#AEB8D6]">Itemized values, HS codes, gross/net weights, and box counts.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-2">
              <span className="text-xs font-mono text-[#FF5A12] font-bold">Document 3</span>
              <h3 className="text-lg font-bold text-white">Shipping Bill (ICEGATE)</h3>
              <p className="text-xs text-[#AEB8D6]">Customs declaration filed electronically on ICEGATE for LEO clearance.</p>
            </div>
          </div>
        </div>

        {/* Full Lifecycle Table */}
        <div className="p-6 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-4">
          <h3 className="text-xl font-bold text-white">Full Pre-Shipment & Post-Shipment Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#13285A] text-white font-mono uppercase text-xs border-b border-[#ECE6DC]/20">
                <tr>
                  <th className="p-3">Stage</th>
                  <th className="p-3">Document</th>
                  <th className="p-3">Issuing Authority</th>
                  <th className="p-3">Statutory Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECE6DC]/10 text-[#AEB8D6]">
                <tr>
                  <td className="p-3 font-semibold text-white">Pre-Shipment</td>
                  <td className="p-3 font-medium text-white">Proforma Invoice / Purchase Order</td>
                  <td className="p-3">Exporter & Buyer</td>
                  <td className="p-3">Contractual basis for advance remittance or Letter of Credit</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Pre-Shipment</td>
                  <td className="p-3 font-medium text-white">GST LUT (Form GST RFD-11)</td>
                  <td className="p-3">GST Portal</td>
                  <td className="p-3">Zero-rated export without payment of IGST</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Customs Gate</td>
                  <td className="p-3 font-medium text-white">Shipping Bill (LEO Copy)</td>
                  <td className="p-3">Customs (ICEGATE)</td>
                  <td className="p-3">Proof of export clearance from Indian customs</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Transit</td>
                  <td className="p-3 font-medium text-white">Marine Cargo Insurance Certificate</td>
                  <td className="p-3">IRDAI-approved Underwriter</td>
                  <td className="p-3">Risk transfer under CIF/CIP terms</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Post-Shipment</td>
                  <td className="p-3 font-medium text-white">Certificate of Origin (COO)</td>
                  <td className="p-3">DGFT Trade Portal / Chamber</td>
                  <td className="p-3">Preferential duty access under FTA/CEPA</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Realization</td>
                  <td className="p-3 font-medium text-white">e-BRC / FIRC / EDPMS Closure</td>
                  <td className="p-3">Authorized Dealer Bank</td>
                  <td className="p-3">Foreign exchange realization closure (FEMA 1999)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Link to Document Room */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#18367A] to-[#0A1636] border border-[#FF5A12]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-bold text-white">Keep all documents in one tamper-evident room</h4>
            <p className="text-xs text-[#AEB8D6]">Eliminate lost WhatsApp attachments with the ShipCargo Document Room.</p>
          </div>
          <Link
            href="/document-room"
            className="px-4 py-2.5 rounded-xl bg-[#FF5A12] text-white font-bold text-xs hover:bg-[#E04800] transition-all shrink-0"
          >
            Explore Document Room ➔
          </Link>
        </div>

        {/* Regulatory Footer */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 flex flex-col sm:flex-row justify-between gap-2">
          <span>Official sources: CBIC Circular 40/2017, DGFT FTP 2023, RBI Master Direction on Export Realization</span>
          <span>Last verified: 21 November 2026</span>
        </footer>
      </div>
    </main>
  );
}
