import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, absoluteUrl } from "@/lib/seo-config";
import { generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { ShieldCheck, CheckCircle2, Lock, FileCheck2, ArrowRight, Eye, Server, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Document Room | Tamper-Evident Trade Documentation Vault",
  description:
    "Centralize test reports, certificates of analysis (COA), bills of lading, and buyer sample approvals in one cryptographically verified workspace. No lost WhatsApp threads.",
  alternates: {
    canonical: "/document-room",
  },
};

export default function DocumentRoomPublicPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Document Room", url: "/document-room" },
  ];

  return (
    <main className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbsSchema(breadcrumbs)) }}
      />

      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30 uppercase">
            <Lock className="w-3.5 h-3.5" />
            <span>Digital Vault &amp; Smart Archival</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-white leading-tight">
            One Document Room for every shipment.{" "}
            <span className="text-[#FF5A12]">Never lose an approval on WhatsApp.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#C9D2EE] leading-relaxed">
            International trade collapses when lab reports, packing lists, and sample sign-offs get scattered across messaging apps. ShipCargo anchors every milestone to a permanent, multi-party record.
          </p>

          <div className="pt-2">
            <Link
              href="/signup/exporter"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF5A12] hover:bg-[#E04800] text-white font-bold text-sm shadow-lg shadow-[#FF5A12]/30 transition-all cursor-pointer"
            >
              <span>Create Free Exporter Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Pillars of the Document Room */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "1. Sample Testing & Lab COA Vault",
              desc: "Store NABL-accredited test reports (moisture, pesticide residue, purity) linked directly to the sample batch ID before physical container loading.",
              icon: FileCheck2,
            },
            {
              title: "2. Immutable Buyer Approvals",
              desc: "Overseas importers sign off digitally. Once approved, the specification freeze prevents retroactive quality claims or arbitrary payment deductions.",
              icon: ShieldCheck,
            },
            {
              title: "3. Customs & Shipping Bill Sync",
              desc: "Maintain all ICEGATE e-SANCHIT uploads, Let Export Orders (LEO), and final Master Bills of Lading (MBL) in one timestamped dossier.",
              icon: Server,
            },
            {
              title: "4. Multi-Party Access Control",
              desc: "Grant scoped permissions to your customs broker, freight forwarder, inspection agency, and buyer without leaking commercial margins.",
              icon: Eye,
            },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-3xl bg-[#0A1636]/85 border border-[#ECE6DC]/15 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FF5A12]/15 text-[#FF5A12] flex items-center justify-center">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-headline text-white">{item.title}</h3>
              <p className="text-xs sm:text-sm text-[#C9D2EE] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Audit Trail Walkthrough */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1636]/90 border border-[#ECE6DC]/20 space-y-4">
          <h2 className="text-2xl font-bold font-headline text-white">How the Document Room Protects Both Parties</h2>
          <div className="space-y-3 text-xs sm:text-sm text-[#ECE6DC]/90">
            <div className="flex items-start gap-3">
              <span className="font-mono font-bold text-[#FF5A12] text-base">01.</span>
              <p><strong>Requirement Established:</strong> Importer sets strict technical specifications and incoterms (e.g. CIF Jebel Ali, Moisture &lt; 11%).</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono font-bold text-[#FF5A12] text-base">02.</span>
              <p><strong>Sample Verification:</strong> Exporter uploads certified COA and courier tracking number into the Document Room for review.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono font-bold text-[#FF5A12] text-base">03.</span>
              <p><strong>Digital Sign-off:</strong> The buyer clicks &quot;Approve Sample&quot;, locking the commercial baseline and triggering freight bidding.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono font-bold text-[#FF5A12] text-base">04.</span>
              <p><strong>Carrier Delivery:</strong> Carrier uploads electronic Proof of Delivery (ePOD) and signed Bill of Lading, releasing bank documentation.</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
