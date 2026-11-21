import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/seo-config";
import { generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { BookOpen, Search, ArrowRight, ShieldCheck, Scale, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "International Trade & Logistics Glossary | ShipCargo",
  description:
    "Comprehensive dictionary of Indian and international export terms: LEO, EDPMS, RCMC, LUT, Bill of Lading, AD Code, APEDA, FCL/LCL, and Incoterms.",
  alternates: {
    canonical: "/glossary",
  },
};

const GLOSSARY_TERMS = [
  {
    term: "AD Code (Authorised Dealer Code)",
    category: "Banking & Customs",
    definition:
      "A 14-digit alphanumeric code issued by an exporter's bank. It must be registered at every Indian customs port (via ICEGATE) before an electronic Shipping Bill can be generated.",
  },
  {
    term: "Bill of Lading (B/L)",
    category: "Shipping Documents",
    definition:
      "A legal document issued by an ocean carrier to acknowledge receipt of cargo for shipment. It serves as a receipt, a contract of carriage, and a document of title.",
  },
  {
    term: "EDPMS (Export Data Processing and Monitoring System)",
    category: "RBI Compliance",
    definition:
      "An automated IT system implemented by the Reserve Bank of India to track export transactions, customs shipping bills, and the realization of foreign inward remittances.",
  },
  {
    term: "e-BRC (Electronic Bank Realisation Certificate)",
    category: "Banking & DGFT",
    definition:
      "A digital certificate issued by banks confirming that payment for an export consignment has been received in foreign currency. Mandatory for claiming RoDTEP incentives.",
  },
  {
    term: "LEO (Let Export Order)",
    category: "Customs Clearance",
    definition:
      "The final regulatory clearance issued by Indian Customs (under Section 51 of the Customs Act) permitting the carrier to load the cargo onto the vessel or aircraft.",
  },
  {
    term: "LUT (Letter of Undertaking)",
    category: "GST Compliance",
    definition:
      "A statutory declaration filed under Form GST RFD-11 allowing registered Indian exporters to export goods and services without paying Integrated GST (IGST) upfront.",
  },
  {
    term: "RCMC (Registration-Cum-Membership Certificate)",
    category: "DGFT Incentives",
    definition:
      "A certificate issued by an Export Promotion Council (e.g., Spices Board, APEDA, EEPC) confirming the exporter is a registered member. Required to claim government export subsidies.",
  },
  {
    term: "RoDTEP (Remission of Duties and Taxes on Exported Products)",
    category: "Government Schemes",
    definition:
      "A rebate scheme by the Ministry of Commerce reimbursing embedded central, state, and local taxes on exports that were previously unrefunded, replacing the MEIS scheme.",
  },
];

export default function GlossaryPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Trade Glossary", url: "/glossary" },
  ];

  return (
    <main className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbsSchema(breadcrumbs)) }}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        
        <header className="space-y-3 border-b border-[#ECE6DC]/15 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30 uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Reference Dictionary</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-headline text-white">
            International Trade &amp; Export Glossary
          </h1>

          <p className="text-xs sm:text-sm text-[#C9D2EE] leading-relaxed">
            Clear definitions of essential statutory, customs, banking, and ocean freight terms for Indian exporters and overseas buyers.
          </p>
        </header>

        {/* Terms List */}
        <div className="space-y-4">
          {GLOSSARY_TERMS.map((item, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#0A1636]/85 border border-[#ECE6DC]/10 space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-base font-bold font-headline text-white">{item.term}</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#13285A] text-[#8FB0FF] border border-[#ECE6DC]/10">
                  {item.category}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#C9D2EE] leading-relaxed">
                {item.definition}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
