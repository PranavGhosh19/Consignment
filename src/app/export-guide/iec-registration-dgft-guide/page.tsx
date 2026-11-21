import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, absoluteUrl } from "@/lib/seo-config";
import { generateArticleSchema, generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { CheckCircle2, FileCheck2, ArrowRight, ShieldCheck, Scale, ExternalLink, AlertCircle, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "IEC Registration Online Guide (DGFT Portal Step-by-Step 2026)",
  description:
    "How to apply for an Import Export Code (IEC) on dgft.gov.in. Required documents, fees, digital signature (DSC/Aadhaar OTP), and annual renewal rules.",
  alternates: {
    canonical: "/export-guide/iec-registration-dgft-guide",
  },
};

export default function IecRegistrationGuide() {
  const url = "/export-guide/iec-registration-dgft-guide";
  const datePublished = "2026-01-20";
  const dateModified = "2026-11-21";

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Export Guide", url: "/export-guide/how-to-start-export-business-india" },
    { name: "IEC Registration DGFT Guide", url },
  ];

  const citations = [
    "https://www.dgft.gov.in (DGFT Online Services - IEC Application)",
    "Foreign Trade Policy (FTP 2023), Chapter 1 (General Provisions)",
  ];

  const articleSchema = generateArticleSchema({
    title: "IEC Registration Online Guide: DGFT Application Step-by-Step",
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
          <span className="text-white">IEC Registration Guide</span>
        </nav>

        <header className="space-y-3 border-b border-[#ECE6DC]/15 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30 uppercase">
            <span>DGFT Compliance</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-headline text-white">
            IEC Registration on DGFT: Step-by-Step Application Guide
          </h1>

          <div className="flex items-center gap-3 text-xs font-mono text-[#AEB8D6]">
            <span>Author: ShipCargo Compliance Desk</span>
            <span>•</span>
            <span className="text-emerald-400">Last verified: 21 November 2026</span>
          </div>
        </header>

        <section className="space-y-6 text-sm leading-relaxed text-[#ECE6DC]/90">
          <p>
            An Import Export Code (IEC) is a 10-digit identification code issued by the Directorate General of Foreign Trade (DGFT). Since 2020, DGFT has integrated the IEC with the applicant entity&apos;s Permanent Account Number (PAN). Commercial Customs clearance at any Indian port is impossible without an active IEC.
          </p>

          <h2 className="text-xl font-bold font-headline text-white">Mandatory Checklist for DGFT IEC Application</h2>
          <div className="p-5 rounded-2xl bg-[#0A1636]/85 border border-[#ECE6DC]/15 space-y-2 text-xs">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5A12]" /><span>Entity PAN Card (Proprietorship, Partnership, LLP, or Pvt Ltd)</span></div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5A12]" /><span>Cancelled Cheque or Bank Certificate of the Current Account</span></div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5A12]" /><span>Proof of Business Premises (Electricity bill, Lease deed, or Rent agreement)</span></div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5A12]" /><span>Active Aadhaar-linked Mobile/Email or Class 2/3 Digital Signature Certificate (DSC)</span></div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF5A12]" /><span>Online statutory fee of ₹500 paid via Bharatkosh payment gateway</span></div>
          </div>

          <h2 className="text-xl font-bold font-headline text-white">The Annual IEC Renewal Rule</h2>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed space-y-1">
            <strong>Critical Statutory Requirement:</strong>
            <p>Under DGFT Trade Notice No. 18/2021-2022, every IEC holder must confirm or update their IEC details annually between <strong>April 1st and June 30th</strong>, even if there are no changes. Failure to do so deactivates the IEC in the ICEGATE customs database, immediately halting container clearance.</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0A1636] border border-[#ECE6DC]/15 text-center space-y-3">
            <h3 className="text-base font-bold text-white">Already have your active IEC?</h3>
            <p className="text-xs text-[#AEB8D6]">Connect your IEC to the ShipCargo ecosystem to access international demand and live carrier freight bidding.</p>
            <Link
              href="/signup/exporter"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white font-bold text-xs shadow-md transition-all"
            >
              <span>Onboard Your Exporter Entity</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </article>
  );
}
