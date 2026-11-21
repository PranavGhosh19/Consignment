import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, absoluteUrl } from "@/lib/seo-config";
import { generateArticleSchema, generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { CheckCircle2, ArrowRight, ShieldCheck, Scale, ExternalLink, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "GST for Exporters & Letter of Undertaking (LUT Rules 2026)",
  description:
    "How to export from India without paying IGST under LUT (Form GST RFD-11). Eligibility rules, GST refund process (Form RFD-01), and CBIC circulars.",
  alternates: {
    canonical: "/export-guide/gst-lut-export-refund-rules",
  },
};

export default function GstLutGuide() {
  const url = "/export-guide/gst-lut-export-refund-rules";
  const datePublished = "2026-01-25";
  const dateModified = "2026-11-21";

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Export Guide", url: "/export-guide/how-to-start-export-business-india" },
    { name: "GST LUT Export Rules", url },
  ];

  const citations = [
    "CGST Act 2017, Section 16 (Zero-Rated Supplies)",
    "CBIC Master Circular No. 125/44/2019-GST (Comprehensive Electronic Refund Process)",
  ];

  const articleSchema = generateArticleSchema({
    title: "GST for Exporters & Letter of Undertaking (LUT Rules & Refund Process)",
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
        
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-[#AEB8D6] flex items-center gap-2">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/export-guide/how-to-start-export-business-india" className="hover:text-white">Export Guide</Link>
          <span>/</span>
          <span className="text-white">GST LUT Guide</span>
        </nav>

        <header className="space-y-3 border-b border-[#ECE6DC]/15 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30 uppercase">
            <span>Taxation &amp; Zero-Rating</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-headline text-white">
            GST on Exports: How to Export Without IGST Under Letter of Undertaking (LUT)
          </h1>

          <div className="flex items-center gap-3 text-xs font-mono text-[#AEB8D6]">
            <span>Author: ShipCargo Compliance Desk</span>
            <span>•</span>
            <span className="text-emerald-400">Last verified: 21 November 2026</span>
          </div>
        </header>

        <section className="space-y-6 text-sm leading-relaxed text-[#ECE6DC]/90">
          <p>
            Under Section 16 of the Integrated Goods and Services Tax (IGST) Act, 2017, export of goods or services from India is classified as a <strong>Zero-Rated Supply</strong>. This means no tax is levied on the output goods sold to overseas buyers.
          </p>

          <h2 className="text-xl font-bold font-headline text-white">What is a Letter of Undertaking (LUT)?</h2>
          <p>
            An LUT (filed under Form GST RFD-11 on the GST portal) is a legal document where the registered exporter promises to complete the export and realize foreign exchange within the timeline stipulated by the RBI (ordinarily 9 months from the date of the export invoice).
          </p>

          <div className="p-5 rounded-2xl bg-[#0A1636]/85 border border-[#ECE6DC]/15 space-y-3">
            <h3 className="font-bold text-white text-base">Key Benefits of Filing an LUT:</h3>
            <ul className="space-y-2 text-xs text-[#C9D2EE]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>No Working Capital Blockage:</strong> You don&apos;t need to deposit 18% or 12% IGST upfront at the time of customs clearance.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Input Tax Credit (ITC) Refund:</strong> You can claim a full refund of unutilized ITC paid on raw materials, packaging, and freight services under Form GST RFD-01.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Annual Validity:</strong> One LUT filed on <code className="text-[#FF5A12]">www.gst.gov.in</code> is valid for the entire financial year (1st April to 31st March).</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-[#0A1636] border border-[#ECE6DC]/15 text-center space-y-3">
            <h3 className="text-base font-bold text-white">Have your LUT filed and ready to quote?</h3>
            <p className="text-xs text-[#AEB8D6]">Browse open international demand requisitions on ShipCargo with zero broker markups.</p>
            <Link
              href="/find-demand"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white font-bold text-xs shadow-md transition-all"
            >
              <span>Explore Active Buyer Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </article>
  );
}
