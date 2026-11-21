import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { Scale, FileText, CheckCircle2, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | ShipCargo Trade & Auction Rules",
  description:
    "Review the ShipCargo Terms of Service: rules for exporters, global importers, reverse freight auctions, sample testing verification, Document Room records, and carrier SLA enforcement.",
  alternates: {
    canonical: "https://www.shipcargo.in/terms"
  }
};

export default function TermsPage() {
  const breadcrumbSchema = generateBreadcrumbsSchema([
    { name: "Home", item: "https://www.shipcargo.in" },
    { name: "Terms of Service", item: "https://www.shipcargo.in/terms" }
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
          <span className="text-[#ECE6DC] font-semibold">Terms of Service</span>
        </nav>

        {/* Header */}
        <div className="space-y-3 border-b border-[#ECE6DC]/15 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30">
            Legal Terms & Platform Rules
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-headline tracking-tight text-white">
            ShipCargo Terms of Service & Auction Governance
          </h1>
          <p className="text-sm font-mono text-[#AEB8D6]">
            Effective Date: 1 January 2026 · Last verified: 21 November 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm sm:text-base text-[#ECE6DC]/90 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#FF5A12]" />
              <span>1. Agreement to Terms & Eligibility</span>
            </h2>
            <p>
              By accessing or using ShipCargo (&ldquo;Platform&rdquo;), you represent and warrant that you are registering on behalf of a validly 
              incorporated corporate entity, registered partnership, or authorized sole proprietorship with a valid tax registration (GSTIN in India or local business EIN/VAT registration abroad).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#FF5A12]" />
              <span>2. Exporter Responsibilities & Sample Commitments</span>
            </h2>
            <p>
              Exporters agree to supply accurate descriptions, technical specifications, and laboratory test parameters for all product listings. 
              When an international buyer requests a sample:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#AEB8D6]">
              <li>Samples dispatched must be drawn from the identical commercial batch or crop offered in the commercial transaction.</li>
              <li>Approved sample test parameters recorded in the Document Room constitute binding contractual baselines for final shipment dispatch.</li>
              <li>Discrepancies exceeding agreed contract tolerances authorize the buyer to reject cargo under standard Incoterms 2020 provisions.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#FF5A12]" />
              <span>3. Live Freight Reverse Auction Governance</span>
            </h2>
            <p>
              ShipCargo operates a live reverse-bidding console for confirmed export shipments:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#AEB8D6]">
              <li><strong>Binding Carrier Bids:</strong> Every bid submitted by a verified freight carrier or shipping line is an irrevocable commercial offer for the specified equipment type, vessel cut-off, and origin-destination port pair.</li>
              <li><strong>Zero Hidden Surcharges:</strong> Carrier bids are all-inclusive of ocean freight, bunker adjustment factors (BAF), currency adjustment factors (CAF), and terminal handling charges (THC) at origin, unless explicitly itemized prior to auction closure.</li>
              <li><strong>Carrier Fee:</strong> The winning carrier is invoiced a transparent platform success fee of 1.5% to 3.0% upon bill of lading generation, as detailed in our <Link href="/pricing" className="text-[#FF5A12] underline">Pricing Policy</Link>.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#FF5A12]" />
              <span>4. Document Room & Non-Repudiation</span>
            </h2>
            <p>
              Digital sign-offs in the ShipCargo Document Room carry full legal validity under Section 4 and Section 5 of the Information Technology Act, 2000. 
              Audit logs, timestamps, hash fingerprints, and buyer approvals recorded within the Document Room may not be retroactively repudiated by either counterparty.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Governing Law & Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of India. Any commercial dispute arising between counterparties that cannot be amicably settled 
              within thirty (30) days shall be referred to arbitration in accordance with the Arbitration and Conciliation Act, 1996, with the seat 
              of arbitration at [PLACEHOLDER: Designated Legal Jurisdiction, e.g., Mumbai, Maharashtra / New Delhi].
            </p>
          </section>
        </div>

        {/* Verification Footer */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 flex flex-col sm:flex-row justify-between gap-2">
          <span>Platform Governance Standard: ICC 2020 & IT Act, 2000</span>
          <span>Last verified: 21 November 2026</span>
        </footer>
      </div>
    </main>
  );
}
