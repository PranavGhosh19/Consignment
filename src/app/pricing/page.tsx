import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/seo-config";
import { generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Sparkles, Building2, Truck, Ship } from "lucide-react";

export const metadata: Metadata = {
  title: "Transparent Platform Pricing | Exporters, Importers & Carriers",
  description:
    "Zero hidden fees. Global importers source free. Exporters post shipments free. Verified carriers bid with low transparent transaction success commissions.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Pricing", url: "/pricing" },
  ];

  return (
    <main className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbsSchema(breadcrumbs)) }}
      />

      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30 uppercase">
            <span>Fair &amp; Transparent Pricing</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-white">
            Simple, transparent trade pricing.
          </h1>

          <p className="text-xs sm:text-sm text-[#C9D2EE] leading-relaxed">
            No subscription paywalls to browse demand or post requirements. We align platform success with executed shipments.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Importers */}
          <div className="p-6 rounded-3xl bg-[#0A1636]/85 border border-[#ECE6DC]/15 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#8FB0FF] uppercase">Global Importers</span>
                <span className="p-1.5 rounded-xl bg-[#5E7FD8]/20 text-[#8FB0FF]"><Globe2 className="w-4 h-4" /></span>
              </div>
              <div>
                <span className="text-3xl font-extrabold font-mono text-white">Free</span>
                <span className="text-xs text-[#AEB8D6] block">100% Free Forever</span>
              </div>
              <ul className="space-y-2 text-xs text-[#ECE6DC]/90">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /><span>Post commodity requirements</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /><span>Receive verified factory quotes</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /><span>Document Room access &amp; lab COAs</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /><span>Dedicated account manager</span></li>
              </ul>
            </div>
            <Link
              href="/signup/exporter"
              className="w-full py-2.5 rounded-xl bg-[#ECE6DC] hover:bg-white text-[#13285A] font-bold text-center text-xs block transition-all"
            >
              Post an Import Need
            </Link>
          </div>

          {/* Exporters */}
          <div className="p-6 rounded-3xl bg-[#0A1636]/95 border-2 border-[#FF5A12] flex flex-col justify-between space-y-6 relative shadow-2xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#FF5A12] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
              Most Popular
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#FF5A12] uppercase">Indian Exporters</span>
                <span className="p-1.5 rounded-xl bg-[#FF5A12]/20 text-[#FF5A12]"><Building2 className="w-4 h-4" /></span>
              </div>
              <div>
                <span className="text-3xl font-extrabold font-mono text-white">₹0</span>
                <span className="text-xs text-[#AEB8D6] block">Zero subscription / No listing fee</span>
              </div>
              <ul className="space-y-2 text-xs text-[#ECE6DC]/90">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A12] shrink-0 mt-0.5" /><span>Respond to overseas demand</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A12] shrink-0 mt-0.5" /><span>Send certified samples to buyers</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A12] shrink-0 mt-0.5" /><span>Post shipments for live carrier bidding</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A12] shrink-0 mt-0.5" /><span>Lock 8–18% lower ocean freight</span></li>
              </ul>
            </div>
            <Link
              href="/signup/exporter"
              className="w-full py-2.5 rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white font-bold text-center text-xs block shadow-md transition-all"
            >
              Register as Exporter
            </Link>
          </div>

          {/* Carriers */}
          <div className="p-6 rounded-3xl bg-[#0A1636]/85 border border-[#ECE6DC]/15 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#8FB0FF] uppercase">Carriers &amp; Vendors</span>
                <span className="p-1.5 rounded-xl bg-[#5E7FD8]/20 text-[#8FB0FF]"><Ship className="w-4 h-4" /></span>
              </div>
              <div>
                <span className="text-3xl font-extrabold font-mono text-white">[1.5–3%]</span>
                <span className="text-xs text-[#AEB8D6] block">Success fee on awarded freight moves only</span>
              </div>
              <ul className="space-y-2 text-xs text-[#ECE6DC]/90">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /><span>Bid on confirmed exporter loads</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /><span>Zero bidding cost if you don&apos;t win</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /><span>Instant ePOD &amp; milestone payment releases</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /><span>Verified shipper payment guarantee</span></li>
              </ul>
            </div>
            <Link
              href="/signup/carrier"
              className="w-full py-2.5 rounded-xl bg-[#ECE6DC] hover:bg-white text-[#13285A] font-bold text-center text-xs block transition-all"
            >
              Access Carrier Bidding
            </Link>
          </div>

        </div>

        {/* Note on Transparency */}
        <div className="text-center text-xs text-[#AEB8D6]">
          <span>All fees are exclusive of applicable Indian GST. Last verified: 21 November 2026.</span>
        </div>

      </div>
    </main>
  );
}

function Globe2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
    </svg>
  );
}
