import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, SITE_CONFIG } from "@/lib/seo-config";
import { generateBreadcrumbsSchema } from "@/lib/seo-schema";
import { ContactInquiryForm } from "@/components/contact-inquiry-form";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Building2,
  FileText,
  UserCheck,
  ArrowRight,
  Headphones,
  Ship,
  Scale,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us & Export Advisory | Mr. Lijo Augustine | ShipCargo",
  description:
    "Connect directly with ShipCargo's Senior Export Advisor Mr. Lijo Augustine (+91 8089720725) and our dedicated trade desks for export guidance, live freight bidding, and customs clearance.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const url = "/contact";

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Contact Us", url },
  ];

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "ShipCargo Contact & Export Advisory Desk",
    description: metadata.description as string,
    url: absoluteUrl(url),
    mainEntity: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      legalName: SITE_CONFIG.legalName,
      url: SITE_CONFIG.url,
      telephone: "+91 8089720725",
      email: "advisory@shipcargo.in",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91 8089720725",
          contactType: "Export Advisor & Trade Specialist",
          availableLanguage: ["English", "Hindi", "Malayalam"],
          areaServed: ["IN", "AE", "US", "NL", "SA", "SG", "GB", "DE"],
        },
      ],
      employee: {
        "@type": "Person",
        name: "Mr. Lijo Augustine",
        jobTitle: "Export Advisor",
        telephone: "+91 8089720725",
        worksFor: {
          "@type": "Organization",
          name: SITE_CONFIG.name,
        },
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbsSchema(breadcrumbs)) }}
      />

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-[#AEB8D6] flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">Contact Us</span>
        </nav>

        {/* Hero Header */}
        <header className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30 uppercase">
            <Headphones className="w-4 h-4" />
            <span>Direct Trade &amp; Export Advisory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-headline text-white tracking-tight leading-tight">
            Get in Touch with Our Export Advisory Team
          </h1>

          <p className="text-base sm:text-lg text-[#AEB8D6] leading-relaxed">
            Need hands-on guidance on starting your export business, navigating customs on ICEGATE, or locking in the lowest container freight rates? Connect directly with our Senior Export Advisor.
          </p>
        </header>

        {/* FEATURED ADVISOR CARD: Mr. Lijo Augustine */}
        <section className="relative rounded-3xl bg-gradient-to-br from-[#1C3A7E] via-[#0A1636] to-[#081126] border-2 border-[#FF5A12]/40 p-6 sm:p-10 shadow-2xl overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5A12]/10 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8">
            
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FF5A12] text-white shadow-sm">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Dedicated Cross-Border Trade Advisor</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-headline text-white">
                  Mr. Lijo Augustine
                </h2>
                <p className="text-sm sm:text-base text-[#AEB8D6] font-medium pt-1">
                  Senior Export Advisor &amp; Global Trade Operations Specialist
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#ECE6DC]/90 leading-relaxed">
                Direct personal advisory for Indian manufacturers and exporters. Mr. Lijo Augustine assists with statutory DGFT export documentation, APEDA/Spices Board commodity compliance, tamper-evident Document Room management, and live freight reverse bidding strategies.
              </p>

              {/* Advisory Competencies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-[#C9D2EE]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>IEC &amp; DGFT Export Licensing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>APEDA / Spices Board / EPC Rules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ICEGATE Customs Shipping Bills</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Live Reverse Auction Freight Savings</span>
                </div>
              </div>
            </div>

            {/* Direct Connect Actions Box */}
            <div className="flex flex-col gap-3 p-5 sm:p-6 rounded-2xl bg-[#0A1636]/90 border border-[#ECE6DC]/15 lg:w-80 shrink-0 shadow-xl">
              <span className="text-xs font-mono text-[#AEB8D6] uppercase tracking-wider font-semibold">
                Direct Contact Channels
              </span>

              {/* Direct Phone Call Button */}
              <Link
                href="tel:+918089720725"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white transition-all shadow-md group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-white/80 block">Click to Call Directly</span>
                    <span className="text-sm font-mono font-bold text-white">+91 8089720725</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Direct WhatsApp Button */}
              <Link
                href="https://wa.me/918089720725?text=Hi%20Mr.%20Lijo,%20I%20am%20contacting%20you%20regarding%20export%20trade%20advisory%20on%20ShipCargo."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white transition-all shadow-md group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-white/90 block">WhatsApp Chat</span>
                    <span className="text-sm font-bold text-white">Chat on WhatsApp</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Direct Email */}
              <Link
                href="mailto:advisory@shipcargo.in"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#13285A]/80 hover:bg-[#13285A] border border-[#ECE6DC]/10 text-white transition-all text-xs"
              >
                <Mail className="w-4 h-4 text-[#FF5A12]" />
                <div className="truncate">
                  <span className="text-[10px] text-[#AEB8D6] block">Direct Email</span>
                  <span className="font-mono text-xs font-semibold text-white">advisory@shipcargo.in</span>
                </div>
              </Link>

              {/* Operating Hours */}
              <div className="pt-2 border-t border-[#ECE6DC]/10 flex items-center gap-2 text-[11px] font-mono text-[#AEB8D6]">
                <Clock className="w-3.5 h-3.5 text-[#FF5A12]" />
                <span>Mon – Sat: 09:00 AM – 07:00 PM IST</span>
              </div>
            </div>

          </div>
        </section>

        {/* Interactive Inquiry Form */}
        <section className="space-y-4">
          <ContactInquiryForm />
        </section>

        {/* Specialized Department Desks (3-Column Grid) */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold font-headline text-white">
              Specialized Trade &amp; Operational Desks
            </h2>
            <p className="text-xs text-[#AEB8D6]">
              Direct communication channels for specific platform inquiries and compliance verifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Desk 1: Exporters */}
            <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30 flex items-center justify-center">
                <Ship className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                Exporter &amp; Shipper Desk
              </h3>
              <p className="text-xs text-[#AEB8D6] leading-relaxed">
                For factory verification, sample dispatch coordination, and launching live reverse freight auctions.
              </p>
              <div className="pt-2 text-xs font-mono">
                <Link href="mailto:exporters@shipcargo.in" className="text-[#FF5A12] hover:underline flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>exporters@shipcargo.in</span>
                </Link>
              </div>
            </div>

            {/* Desk 2: Importers */}
            <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                Global Importer Procurement
              </h3>
              <p className="text-xs text-[#AEB8D6] leading-relaxed">
                Post purchase requisitions, request certified batch samples, and verify Indian mill credentials.
              </p>
              <div className="pt-2 text-xs font-mono">
                <Link href="mailto:importers@shipcargo.in" className="text-blue-400 hover:underline flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>importers@shipcargo.in</span>
                </Link>
              </div>
            </div>

            {/* Desk 3: Carriers */}
            <div className="p-6 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                Carrier &amp; Forwarder Operations
              </h3>
              <p className="text-xs text-[#AEB8D6] leading-relaxed">
                FMC/MTO licensing verification, container slot bidding onboarding, and SLA documentation.
              </p>
              <div className="pt-2 text-xs font-mono">
                <Link href="mailto:carriers@shipcargo.in" className="text-purple-400 hover:underline flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>carriers@shipcargo.in</span>
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Corporate Address & Statutory Disclosures */}
        <section className="p-6 rounded-3xl bg-[#0A1636]/60 border border-[#ECE6DC]/15 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ECE6DC]/10 pb-4">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-5 h-5 text-[#FF5A12]" />
              <h3 className="font-bold text-white text-base">Registered Corporate Office</h3>
            </div>
            <span className="text-xs font-mono text-[#AEB8D6]">
              CIN: [PLACEHOLDER: U74999MH2024PTC123456]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#AEB8D6]">
            <div>
              <span className="font-semibold text-white block pb-1">Headquarters Address:</span>
              <p className="leading-relaxed">
                [PLACEHOLDER: ShipCargo Technologies Private Limited]<br />
                [PLACEHOLDER: Level 4, Platina Tower, Bandra Kurla Complex (BKC)]<br />
                Mumbai, Maharashtra — 400051, India
              </p>
            </div>
            <div>
              <span className="font-semibold text-white block pb-1">Statutory Registrations &amp; Portals:</span>
              <p className="leading-relaxed">
                GSTIN: [PLACEHOLDER: 27AABCS1429B1Z8]<br />
                Compliant with Directorate General of Foreign Trade (DGFT) &amp; Central Board of Indirect Taxes and Customs (CBIC).
              </p>
            </div>
          </div>
        </section>

        {/* Footer info line */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 flex flex-col sm:flex-row justify-between gap-2">
          <span>Direct Advisory Contact: Mr. Lijo Augustine (+91 8089720725)</span>
          <span>Last verified: 22 November 2026</span>
        </footer>

      </div>
    </main>
  );
}
