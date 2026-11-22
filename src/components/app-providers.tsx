
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { AuthButton, MobileMenu, NavLinks } from "@/components/auth-button";
import { BottomBar } from "@/components/bottom-bar";
import { Clock } from "@/components/clock";
import { FirebaseErrorListener } from "./FirebaseErrorListener";
import { ShipmentLifecycleSweeper } from "./ShipmentLifecycleSweeper";
import { AuthProvider } from "@/contexts/auth-context";
import { Linkedin, Anchor, Download } from "lucide-react";

const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="32" height="32" rx="8" fill="hsl(var(--primary))" />
    <path
      d="M23 23.5C24.3807 23.5 25.5 22.3807 25.5 21C25.5 19.6193 24.3807 18.5 23 18.5H9C7.61929 18.5 6.5 19.6193 6.5 21C6.5 22.3807 7.61929 23.5 9 23.5H23Z"
      stroke="hsl(var(--primary-foreground))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 18.5L12.5 10.5H19.5L22.5 18.5"
      stroke="hsl(var(--primary-foreground))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 10.5V8"
      stroke="hsl(var(--primary-foreground))"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Header = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-[#13285A]/15 bg-[#ECE6DC] text-[#13285A] shadow-sm transition-all"
      )}
    >
      <div className="container flex h-18 sm:h-20 items-center justify-between relative">
        {/* Centered Logo on small screens, left-aligned on larger screens */}
        <div className="flex-1 sm:flex-none">
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 justify-center sm:justify-start group py-1"
          >
            <Image
              src="/ship-icon.png"
              alt="ShipCargo"
              width={80}
              height={48}
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              priority
            />
            <span className="font-headline font-bold text-xl sm:text-2xl tracking-tight leading-none flex items-center">
              <span className="text-[#13285A]">Ship</span>
              <span className="text-[#FF5A12]">Cargo</span>
            </span>
          </Link>
        </div>

        {/* NavLinks appear on larger screens */}
        <div className="hidden sm:flex items-center gap-6 ml-6">
          <NavLinks />
        </div>

        {/* Auth buttons (desktop) & MobileMenu (mobile) */}
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <AuthButton />
          </div>
          <MobileMenu />
        </div>
      </div>

      {/* Glowing orange scroll progress bar directly under sticky navigation */}
      <div
        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#FF5A12] via-[#FF7B3D] to-[#FF5A12] shadow-[0_0_12px_2px_rgba(255,90,18,0.85)] pointer-events-none transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
}

const Footer = () => (
  <footer className="border-t border-[#13285A]/15 bg-[#ECE6DC] text-[#13285A] pb-24 sm:pb-0">
    <div className="container py-12 sm:py-16 space-y-12">
      {/* Top Row: Brand & Mission & Verified Badges */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-[#13285A]/15 pb-8">
        <div className="space-y-3 max-w-xl">
          <Link href="/" className="inline-flex items-center gap-2.5 py-1 group">
            <Image
              src="/ship-icon.png"
              alt="ShipCargo"
              width={90}
              height={54}
              className="h-11 sm:h-13 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <span className="font-headline font-bold text-2xl tracking-tight leading-none">
              <span className="text-[#13285A]">Ship</span>
              <span className="text-[#FF5A12]">Cargo</span>
            </span>
          </Link>
          <p className="text-sm text-[#13285A]/80 leading-relaxed">
            India&apos;s digital cross-border trade & live freight bidding ecosystem. We connect verified Indian exporters 
            with international buyers and global carriers through tamper-evident documentation and reverse freight auctions.
          </p>
        </div>

        {/* Mascot / Quick Trust Badge */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#13285A]/5 border border-[#13285A]/10">
          <div className="relative w-12 h-12 rounded-xl bg-[#13285A] flex items-center justify-center text-white shrink-0 shadow-md">
            <Anchor className="w-6 h-6 text-[#FF5A12]" />
          </div>
          <div className="text-xs">
            <span className="font-mono font-bold text-[#13285A] block uppercase tracking-wider">Statutory Verification</span>
            <span className="text-[#13285A]/70">CBIC · ICEGATE · DGFT · GST RFD-11</span>
          </div>
        </div>
      </div>

      {/* 5-Column Grid: Comprehensive Categorized Links for All Pages */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
        {/* Col 1: Platform & Ecosystem */}
        <div className="space-y-3.5">
          <h4 className="font-bold text-[#13285A] font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5A12]" />
            <span>Platform</span>
          </h4>
          <ul className="space-y-2.5 text-[#13285A]/80 text-xs sm:text-sm">
            <li><Link href="/find-demand" className="hover:text-[#FF5A12] transition-colors font-medium">Find Demand Radar</Link></li>
            <li><Link href="/document-room" className="hover:text-[#FF5A12] transition-colors">Document Room</Link></li>
            <li><Link href="/how-it-works" className="hover:text-[#FF5A12] transition-colors">How Bidding Works</Link></li>
            <li><Link href="/tools/freight-rate-calculator" className="hover:text-[#FF5A12] transition-colors">Freight Calculator</Link></li>
            <li><Link href="/tools/incoterms-selector" className="hover:text-[#FF5A12] transition-colors">Incoterms Selector</Link></li>
            <li><Link href="/for-exporters" className="hover:text-[#FF5A12] transition-colors">For Exporters</Link></li>
            <li><Link href="/for-importers" className="hover:text-[#FF5A12] transition-colors">For Importers</Link></li>
            <li><Link href="/for-carriers" className="hover:text-[#FF5A12] transition-colors">For Carriers</Link></li>
            <li className="pt-1">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-pwa-install"));
                  }
                }}
                className="hover:text-[#FF5A12] transition-colors flex items-center gap-1.5 cursor-pointer text-left text-xs font-bold text-[#FF5A12]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install ShipCargo App</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 2: Export Guides & Rules */}
        <div className="space-y-3.5">
          <h4 className="font-bold text-[#13285A] font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            <span>Export Guides</span>
          </h4>
          <ul className="space-y-2.5 text-[#13285A]/80 text-xs sm:text-sm">
            <li><Link href="/export-guide/how-to-start-export-business-india" className="hover:text-[#FF5A12] transition-colors font-medium">How to Export from India</Link></li>
            <li><Link href="/export-guide/iec-registration-dgft-guide" className="hover:text-[#FF5A12] transition-colors">IEC Registration (DGFT)</Link></li>
            <li><Link href="/export-guide/gst-lut-export-refund-rules" className="hover:text-[#FF5A12] transition-colors">GST LUT & Refund Rules</Link></li>
            <li><Link href="/export-guide/export-documentation-checklist" className="hover:text-[#FF5A12] transition-colors">Documentation Checklist</Link></li>
            <li><Link href="/export-guide/incoterms-2020-exporters-guide" className="hover:text-[#FF5A12] transition-colors">Incoterms 2020 Guide</Link></li>
            <li><Link href="/export-guide/export-payment-terms-lc-advance" className="hover:text-[#FF5A12] transition-colors">LC & Payment Terms</Link></li>
            <li><Link href="/export-guide/icegate-customs-clearance-process" className="hover:text-[#FF5A12] transition-colors">ICEGATE & LEO Guide</Link></li>
            <li><Link href="/export-guide/rodtep-rosctl-export-incentives" className="hover:text-[#FF5A12] transition-colors">RoDTEP & RoSCTL Schemes</Link></li>
            <li><Link href="/glossary" className="hover:text-[#FF5A12] transition-colors font-mono text-xs">Trade Dictionary (A–Z)</Link></li>
          </ul>
        </div>

        {/* Col 3: Trade Corridors */}
        <div className="space-y-3.5">
          <h4 className="font-bold text-[#13285A] font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Trade Corridors</span>
          </h4>
          <ul className="space-y-2.5 text-[#13285A]/80 text-xs sm:text-sm">
            <li><Link href="/freight/india-to-dubai" className="hover:text-[#FF5A12] transition-colors">India → Dubai (Jebel Ali)</Link></li>
            <li><Link href="/freight/india-to-rotterdam" className="hover:text-[#FF5A12] transition-colors">India → Rotterdam (EU)</Link></li>
            <li><Link href="/freight/india-to-usa" className="hover:text-[#FF5A12] transition-colors">India → USA (NYC / Savannah)</Link></li>
            <li><Link href="/find-demand" className="hover:text-[#FF5A12] transition-colors text-xs text-[#13285A]/60">Explore all 19 lanes ➔</Link></li>
          </ul>
        </div>

        {/* Col 4: Sourcing Catalogs */}
        <div className="space-y-3.5">
          <h4 className="font-bold text-[#13285A] font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Product Catalogs</span>
          </h4>
          <ul className="space-y-2.5 text-[#13285A]/80 text-xs sm:text-sm">
            <li><Link href="/products/spices/dried-red-chillies" className="hover:text-[#FF5A12] transition-colors">Dried Red Chillies (Teja/S17)</Link></li>
            <li><Link href="/products/grains/1121-steam-basmati-rice" className="hover:text-[#FF5A12] transition-colors">1121 Steam Basmati Rice</Link></li>
            <li><Link href="/products/pharmaceuticals/paracetamol-api" className="hover:text-[#FF5A12] transition-colors">Paracetamol API (Pharma)</Link></li>
            <li><Link href="/find-demand#public-demand" className="hover:text-[#FF5A12] transition-colors text-xs text-[#13285A]/60">All Country Demands ➔</Link></li>
          </ul>
        </div>

        {/* Col 5: Company, Trust & Legal */}
        <div className="space-y-3.5">
          <h4 className="font-bold text-[#13285A] font-mono uppercase tracking-wider text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span>Company & Legal</span>
          </h4>
          <ul className="space-y-2.5 text-[#13285A]/80 text-xs sm:text-sm">
            <li><Link href="/about" className="hover:text-[#FF5A12] transition-colors font-medium">About ShipCargo</Link></li>
            <li><Link href="/contact" className="hover:text-[#FF5A12] transition-colors font-medium text-[#FF5A12]">Contact Us &amp; Advisor</Link></li>
            <li><Link href="/support" className="hover:text-[#FF5A12] transition-colors">Help Center &amp; FAQ</Link></li>
            <li><Link href="/editorial-policy" className="hover:text-[#FF5A12] transition-colors">Editorial Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#FF5A12] transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-[#FF5A12] transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Live Clock */}
      <div className="pt-8 border-t border-[#13285A]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#13285A]/70">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} ShipCargo Technologies. All rights reserved.</span>
          <span className="hidden sm:inline">·</span>
          <span>Verified against DGFT, CBIC/ICEGATE, and GST statutory portals.</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#13285A]/75 hover:text-[#FF5A12] transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Clock />
        </div>
      </div>
    </div>
  </footer>
);


export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="relative flex min-h-screen flex-col bg-[#13285A] text-[#ECE6DC]">
        <FirebaseErrorListener />
        <ShipmentLifecycleSweeper />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <BottomBar />
      </div>
    </AuthProvider>
  )
}
