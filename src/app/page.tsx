"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { AuthRedirect } from '@/components/auth-redirect';
import {
  ArrowRight,
  Ship,
  Truck,
  Anchor,
  TrendingDown,
  Clock,
  Shield,
  Zap,
  CheckCircle2,
  XCircle,
  Star,
  Award,
  Sparkles,
  Layers,
  FileCheck2,
  BarChart3,
  Globe2,
  Users2,
  BadgePercent,
  Check,
  ChevronRight,
  FileText,
  ShieldCheck,
  Building2,
  Compass
} from "lucide-react";
import { EcosystemWorkflow } from "@/components/ecosystem-workflow";

// Hook: Intersection Observer for scroll-triggered activations
function useInView(threshold: number = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

// Hook: Smooth number count-up animation
function useCountUp(target: number, inView: boolean, duration: number = 1600) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return count;
}

// Component: Left-to-right wipe-in heading
function HeadingWipe({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView(0.1);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        clipPath: inView ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
        opacity: inView ? 1 : 0.2,
        transform: inView ? "translateX(0)" : "translateX(-28px)",
        transition: "clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out"
      }}
    >
      {children}
    </div>
  );
}

// Component: 3D Tilt, blur & alternating fly-in card
function TiltCard({
  children,
  index,
  className = "",
  glowOnCenter = false
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
  glowOnCenter?: boolean;
}) {
  const [ref, inView] = useInView(0.1);
  const [isCenter, setIsCenter] = useState(false);

  useEffect(() => {
    if (!glowOnCenter) return;
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const cardCenter = rect.top + rect.height / 2;
      // Triggers when within vertical middle 30% of screen
      if (cardCenter >= vh * 0.35 && cardCenter <= vh * 0.65) {
        setIsCenter(true);
      } else {
        setIsCenter(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [glowOnCenter, ref]);

  const isEven = index % 2 === 0;
  const staggerDelay = (index % 3) * 120; // Staggered arrival per row

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: inView
          ? isCenter
            ? "perspective(1000px) rotateY(0deg) rotateX(0deg) translate3d(0, 0, 0) scale(1.03)"
            : "perspective(1000px) rotateY(0deg) rotateX(0deg) translate3d(0, 0, 0)"
          : isEven
            ? "perspective(1000px) rotateY(-18deg) rotateX(8deg) translate3d(-40px, 30px, 0)"
            : "perspective(1000px) rotateY(18deg) rotateX(8deg) translate3d(40px, 30px, 0)",
        opacity: inView ? 1 : 0,
        filter: inView ? "blur(0px)" : "blur(8px)",
        boxShadow: isCenter ? "0 0 35px 2px rgba(255, 90, 18, 0.55), 0 20px 40px rgba(0,0,0,0.35)" : undefined,
        borderColor: isCenter ? "#FF5A12" : undefined,
        transition: `transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms, opacity 0.75s ease-out ${staggerDelay}ms, filter 0.75s ease-out ${staggerDelay}ms, box-shadow 0.35s ease, border-color 0.35s ease`
      }}
    >
      {children}
    </div>
  );
}

// Component: Carrier Band expanding from rounded inset to full width on scroll
function ExpandingCarrierBand() {
  const bandRef = useRef<HTMLDivElement>(null);
  const [expandRatio, setExpandRatio] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!bandRef.current) return;
      const rect = bandRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // Scroll progress from bottom entrance to center
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.75)));
      setExpandRatio(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const borderRadius = Math.max(0, Math.round(36 * (1 - expandRatio)));
  const insetMargin = Math.round(32 * (1 - expandRatio));

  return (
    <div ref={bandRef} className="w-full py-8 transition-all duration-300">
      <div
        className="relative overflow-hidden bg-gradient-to-r from-[#183472] via-[#13285A] to-[#183472] border-y-2 sm:border-2 border-[#FF5A12]/40 shadow-2xl transition-all duration-300 mx-auto"
        style={{
          borderRadius: `${borderRadius}px`,
          maxWidth: expandRatio > 0.85 ? "100%" : `calc(100% - ${insetMargin * 2}px)`
        }}
      >
        {/* Ambient Orange Beam */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FF5A12]/10 via-transparent to-[#FF5A12]/10" />

        <div className="container px-6 py-12 md:py-16 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-[#FF5A12]/40 bg-[#FF5A12]/15 text-[#FF5A12]">
              Carrier Network Corridor
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-headline text-[#ECE6DC]">
              Pan-India Seaport &amp; Inland Container Depot Connectivity
            </h3>
            <p className="text-[#ECE6DC]/80 text-sm sm:text-base leading-relaxed">
              Real-time vessel capacity across 10 major hubs with verified customs and drayage synchronicity.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Nhava Sheva (JNPT)",
              "Mundra Port",
              "Chennai Port",
              "Pipavav",
              "Tuticorin (V.O.C)",
              "Hazira Port",
              "Kolkata / Haldia",
              "ICD Tughlakabad",
              "ICD Dadri",
              "ICD Whitefield"
            ].map((port, i) => (
              <div
                key={i}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#ECE6DC]/10 hover:bg-[#FF5A12] hover:text-white text-[#ECE6DC] border border-[#ECE6DC]/20 transition-all duration-200 cursor-default shadow-sm"
              >
                ⚓ {port}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Interactive Mock Shipment Routes for Hero Showcase
interface DemoShipment {
  id: string;
  lane: string;
  origin: string;
  originCode: string;
  destination: string;
  destCode: string;
  cargo: string;
  targetPrice: string;
  targetNum: number;
  currentL1: string;
  l1Num: number;
  savings: string;
  savingsPercent: string;
  timeRemaining: string;
  bidsCount: number;
  bids: Array<{
    rank: string;
    carrier: string;
    amount: string;
    rating: string;
    tag: string;
    isL1: boolean;
  }>;
}

const DEMO_SHIPMENTS: Record<string, DemoShipment> = {
  jnpt: {
    id: "SHP-8821",
    lane: "India to UAE Gulf Lane",
    origin: "Nhava Sheva (JNPT), Mumbai",
    originCode: "INNSA",
    destination: "Jebel Ali Port, Dubai",
    destCode: "AEJEA",
    cargo: "2 × 40' High Cube Containers (44 MT - Industrial Goods)",
    targetPrice: "₹1,85,000",
    targetNum: 185000,
    currentL1: "₹1,47,500",
    l1Num: 147500,
    savings: "₹37,500",
    savingsPercent: "20.3%",
    timeRemaining: "04:18",
    bidsCount: 14,
    bids: [
      { rank: "L1", carrier: "Apex Maritime Forwarders", amount: "₹1,47,500", rating: "4.9", tag: "Lowest Bidder", isL1: true },
      { rank: "L2", carrier: "OceanBridge Global", amount: "₹1,51,000", rating: "4.8", tag: "+₹3,500", isL1: false },
      { rank: "L3", carrier: "Pacific Container Lines", amount: "₹1,55,200", rating: "4.7", tag: "+₹7,700", isL1: false },
    ]
  },
  mundra: {
    id: "SHP-7940",
    lane: "India to North Europe Corridor",
    origin: "Mundra Port, Gujarat",
    originCode: "INMUN",
    destination: "Rotterdam Port, Netherlands",
    destCode: "NLRTM",
    cargo: "1 × 20' Standard Dry Box (21 MT - Cotton Textiles)",
    targetPrice: "₹2,40,000",
    targetNum: 240000,
    currentL1: "₹1,96,000",
    l1Num: 196000,
    savings: "₹44,000",
    savingsPercent: "18.3%",
    timeRemaining: "07:45",
    bidsCount: 9,
    bids: [
      { rank: "L1", carrier: "TransGlobal Freightways", amount: "₹1,96,000", rating: "4.9", tag: "Lowest Bidder", isL1: true },
      { rank: "L2", carrier: "EuroLine Direct Express", amount: "₹2,02,500", rating: "4.8", tag: "+₹6,500", isL1: false },
      { rank: "L3", carrier: "SeaMaster Ocean Freight", amount: "₹2,09,000", rating: "4.6", tag: "+₹13,000", isL1: false },
    ]
  },
  chennai: {
    id: "SHP-9104",
    lane: "India to Southeast Asia Route",
    origin: "Chennai Port (Madras)",
    originCode: "INMAA",
    destination: "PSA Singapore Terminal",
    destCode: "SGSIN",
    cargo: "3 × 40' Standard Containers (60 MT - Auto Components)",
    targetPrice: "₹3,15,000",
    targetNum: 315000,
    currentL1: "₹2,54,000",
    l1Num: 254000,
    savings: "₹61,000",
    savingsPercent: "19.4%",
    timeRemaining: "02:30",
    bidsCount: 18,
    bids: [
      { rank: "L1", carrier: "Orient Express Shipping", amount: "₹2,54,000", rating: "5.0", tag: "Lowest Bidder", isL1: true },
      { rank: "L2", carrier: "SingaFast Logistics", amount: "₹2,59,000", rating: "4.9", tag: "+₹5,000", isL1: false },
      { rank: "L3", carrier: "SouthBay Marine Lines", amount: "₹2,64,200", rating: "4.7", tag: "+₹10,200", isL1: false },
    ]
  }
};

export default function Home() {
  const [activeLaneKey, setActiveLaneKey] = useState<string>("jnpt");
  const activeShipment = DEMO_SHIPMENTS[activeLaneKey] || DEMO_SHIPMENTS.jnpt;

  // Window scroll tracking for hero parallax & moving blueprint grid
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Visual simulation countdown
  const [countdownSeconds, setCountdownSeconds] = useState(260);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 10 ? prev - 1 : 280));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Stats Intersection & Count-Up Hooks
  const [statsRef, statsInView] = useInView(0.2);
  const count58 = useCountUp(58, statsInView, 1600);
  const count57 = useCountUp(57, statsInView, 1700);
  const count126 = useCountUp(126, statsInView, 1800);

  // Auction board table rows in view
  const [auctionRef, auctionInView] = useInView(0.15);

  // Hero fade-out calculations
  const heroProgress = Math.min(1, Math.max(0, scrollY / 460));
  const headlineTranslateY = -(scrollY * 0.32);
  const headlineOpacity = Math.max(0, 1 - heroProgress * 1.35);
  const headlineBlur = Math.min(10, heroProgress * 10);
  const captainCargoDriftY = scrollY * 0.16; // Drifts down more slowly
  const glowTopDriftY = scrollY * 0.26;
  const glowSideDriftY = scrollY * 0.12;

  return (
    <>
      <AuthRedirect />

      <main className="relative flex-1 overflow-hidden bg-[#13285A] text-[#ECE6DC]">
        
        {/* Moving Blueprint Grid behind the whole page (slides upward as you scroll) */}
        <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
          <div 
            className="absolute inset-0 bg-[radial-gradient(#ECE6DC_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.07]"
            style={{
              transform: `translate3d(0, -${(scrollY * 0.22) % 28}px, 0)`
            }}
          />
        </div>

        {/* Ambient Glowing Auras Moving at Differential Speeds */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Glow 1: Top Center Aura */}
          <div 
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-gradient-to-b from-[#1C3A7E]/50 via-[#FF5A12]/12 to-transparent blur-[140px] rounded-full will-change-transform"
            style={{
              transform: `translate3d(-50%, ${glowTopDriftY}px, 0)`
            }}
          />
          {/* Glow 2: Lateral Aura */}
          <div 
            className="absolute top-[850px] -left-40 w-[650px] h-[650px] bg-gradient-to-tr from-[#183472]/45 to-transparent blur-[150px] rounded-full will-change-transform"
            style={{
              transform: `translate3d(0, ${glowSideDriftY}px, 0)`
            }}
          />
          <div className="absolute top-[1500px] -right-40 w-[700px] h-[700px] bg-gradient-to-bl from-[#FF5A12]/15 via-[#183472]/30 to-transparent blur-[150px] rounded-full" />
        </div>

        {/* 1. HERO SECTION WITH FADE-OUT PARALLAX */}
        <section className="relative pt-10 pb-16 md:pt-16 md:pb-24">
          <div className="container px-4 md:px-6">

            {/* Main Hero Grid: Left Content, Right Captain Cargo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
              
              {/* Left Column: Headline, CTAs, Trust Badges (Blurs and fades while sliding up) */}
              <div 
                className="lg:col-span-7 xl:col-span-7 text-left space-y-7 will-change-transform"
                style={{
                  transform: `translate3d(0, ${headlineTranslateY}px, 0)`,
                  opacity: headlineOpacity,
                  filter: `blur(${headlineBlur}px)`
                }}
              >
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl font-headline leading-[1.12] text-[#ECE6DC]">
                  Get The Best Freight Rates Through{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF5A12] via-[#FF8544] to-[#FFAE7A]">
                    Competitive Live Bidding
                  </span>
                </h1>

                {/* Primary Dual Call To Actions — Premium Architectural Weight */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 pt-3">
                  {/* Primary 10% Accent CTA: Ember Orange Luxury Button */}
                  <Link
                    href="/signup/exporter"
                    className="group relative inline-flex items-center justify-center gap-3.5 min-h-[58px] sm:min-h-[64px] px-8 sm:px-10 rounded-2xl text-base sm:text-lg font-headline font-bold text-white bg-gradient-to-b from-[#FF6B2B] via-[#FF5A12] to-[#E04800] border-t border-white/35 border-b-2 border-black/30 shadow-[0_14px_30px_-4px_rgba(255,90,18,0.55),0_6px_14px_-2px_rgba(255,90,18,0.35)] hover:shadow-[0_22px_44px_-4px_rgba(255,90,18,0.7),0_8px_20px_-2px_rgba(255,90,18,0.5)] hover:-translate-y-1 active:translate-y-0.5 active:scale-[0.99] transition-all duration-200 cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-2xl" />
                    <Ship className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0 drop-shadow-sm transition-transform duration-200 group-hover:scale-110" />
                    <span className="relative z-10 tracking-tight drop-shadow-sm">Post Shipment For Bidding</span>
                    <ArrowRight className="w-5 h-5 text-white/90 shrink-0 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </Link>

                  {/* Secondary 30% Surface CTA: Pearl Shell Solid Monument */}
                  <Link
                    href="/signup/carrier"
                    className="group relative inline-flex items-center justify-center gap-3.5 min-h-[58px] sm:min-h-[64px] px-8 sm:px-10 rounded-2xl text-base sm:text-lg font-headline font-bold text-[#13285A] bg-[#ECE6DC] hover:bg-white border-2 border-white/50 shadow-[0_14px_30px_-4px_rgba(0,0,0,0.35),0_6px_14px_-2px_rgba(0,0,0,0.2)] hover:shadow-[0_22px_44px_-4px_rgba(0,0,0,0.45)] hover:-translate-y-1 active:translate-y-0.5 active:scale-[0.99] transition-all duration-200 cursor-pointer"
                  >
                    <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF5A12] shrink-0 transition-transform duration-200 group-hover:scale-110" />
                    <span className="tracking-tight">Bid On Shipments (Carriers)</span>
                  </Link>
                </div>

                {/* Trust Micro-Badges */}
                <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-2 text-xs sm:text-sm text-[#ECE6DC]/80 pt-2">
                  <div className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5A12]" />
                    <span>Direct Carrier Rates</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Shield className="w-4 h-4 text-[#ECE6DC]" />
                    <span>GST &amp; KYC Verified Forwarders</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Zap className="w-4 h-4 text-[#FF5A12]" />
                    <span>Sub-Second Live Auction Clock</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Captain Cargo (Drifts down more slowly) */}
              <div 
                className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center relative mt-6 lg:mt-0 will-change-transform"
                style={{
                  transform: `translate3d(0, ${captainCargoDriftY}px, 0)`
                }}
              >
                {/* Glowing radiant aura */}
                <div className="absolute w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-tr from-[#FF5A12]/20 via-[#1C3A7E]/50 to-[#ECE6DC]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

                {/* Captain Cargo & Vessel Showcase */}
                <div className="relative group flex flex-col items-center w-full max-w-[440px]">
                  {/* Floating speech bubble */}
                  <div className="mb-2 sm:mb-3 px-4 py-2 rounded-2xl bg-[#ECE6DC] border-2 border-[#ECE6DC] shadow-2xl backdrop-blur-md text-xs font-bold flex items-center gap-2.5 transition-transform duration-300 group-hover:scale-105 z-20">
                    <span className="text-lg">👋</span>
                    <div>
                      <div className="text-[#FF5A12] font-extrabold text-xs">Captain Cargo</div>
                      <div className="text-[#13285A]/80 text-[11px] font-medium">Your Navigator to Lowest Freight Rates!</div>
                    </div>
                  </div>

                  {/* Character & Ship Composition */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-[1/1] max-h-[460px] flex items-end justify-center">
                    {/* Background Cargo Ship with orange arc */}
                    <div className="absolute top-2 right-0 w-[230px] sm:w-[270px] lg:w-[300px] aspect-[3/2] opacity-85 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 pointer-events-none">
                      <Image
                        src="/cargo-ship.png"
                        alt="ShipCargo Ocean Freight Vessel"
                        fill
                        priority
                        sizes="(max-width: 768px) 230px, 300px"
                        className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                      />
                    </div>

                    {/* Foreground Mascot: Captain Cargo */}
                    <div className="relative w-[190px] sm:w-[220px] lg:w-[245px] aspect-[2/3] z-10 -ml-16 sm:-ml-24">
                      <Image
                        src="/captain-cargo.png"
                        alt="Captain Cargo - ShipCargo Mascot"
                        fill
                        priority
                        sizes="(max-width: 768px) 190px, 245px"
                        className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>

                  {/* Ground Shadow */}
                  <div className="w-64 h-3.5 bg-black/40 rounded-full blur-md -mt-2" />
                </div>
              </div>

            </div>

            {/* Interactive Hero Visual: Live Reverse Auction Simulator */}
            <div ref={auctionRef} className="mt-14 max-w-4xl mx-auto">
              {/* Lane Selector Pills */}
              <div className="flex items-center justify-center gap-2 mb-3 overflow-x-auto pb-2">
                <span className="text-xs font-semibold text-[#ECE6DC]/70 uppercase tracking-wider mr-1 hidden sm:inline">
                  Preview Active Lanes:
                </span>
                <button
                  type="button"
                  onClick={() => setActiveLaneKey("jnpt")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeLaneKey === "jnpt"
                      ? "bg-[#FF5A12] text-white shadow-md shadow-[#FF5A12]/30 scale-105"
                      : "bg-[#ECE6DC]/10 text-[#ECE6DC]/75 hover:bg-[#ECE6DC]/20 hover:text-[#ECE6DC]"
                  }`}
                >
                  JNPT ➔ Jebel Ali
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLaneKey("mundra")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeLaneKey === "mundra"
                      ? "bg-[#FF5A12] text-white shadow-md shadow-[#FF5A12]/30 scale-105"
                      : "bg-[#ECE6DC]/10 text-[#ECE6DC]/75 hover:bg-[#ECE6DC]/20 hover:text-[#ECE6DC]"
                  }`}
                >
                  Mundra ➔ Rotterdam
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLaneKey("chennai")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeLaneKey === "chennai"
                      ? "bg-[#FF5A12] text-white shadow-md shadow-[#FF5A12]/30 scale-105"
                      : "bg-[#ECE6DC]/10 text-[#ECE6DC]/75 hover:bg-[#ECE6DC]/20 hover:text-[#ECE6DC]"
                  }`}
                >
                  Chennai ➔ Singapore
                </button>
              </div>

              {/* Showcase Card Frame */}
              <div className="relative rounded-2xl p-1 bg-gradient-to-b from-[#ECE6DC]/25 via-[#183472] to-[#FF5A12]/20 shadow-2xl backdrop-blur-xl">
                <div className="border border-[#ECE6DC]/15 bg-[#0E1E45]/95 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl">
                  {/* Card Header Bar */}
                  <div className="px-5 py-4 border-b border-[#ECE6DC]/10 bg-[#0A1633]/90 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30 text-xs font-bold tracking-wider uppercase">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A12] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5A12]"></span>
                        </span>
                        Live Bidding Room
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#ECE6DC]/60">
                        Shipment ID: #{activeShipment.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#ECE6DC] bg-[#13285A] px-2.5 py-1 rounded-md border border-[#ECE6DC]/15">
                        <Clock className="w-3.5 h-3.5 text-[#FF5A12]" />
                        <span className="text-[#ECE6DC]/80">Round Closes In:</span>
                        <span className="font-mono text-[#FF5A12] font-bold">{formatTimer(countdownSeconds)}</span>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-md bg-[#ECE6DC]/10 text-[#ECE6DC] border border-[#ECE6DC]/20 font-semibold">
                        {activeShipment.bidsCount} Bids Placed
                      </span>
                    </div>
                  </div>

                  {/* Route & Cargo Summary Grid */}
                  <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-[#ECE6DC]/10">
                    <div className="md:col-span-7 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#FF5A12] uppercase tracking-wide">
                        <Globe2 className="w-3.5 h-3.5" />
                        <span>{activeShipment.lane}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm sm:text-base font-bold text-[#ECE6DC]">
                        <span className="px-2 py-0.5 rounded bg-[#13285A] border border-[#ECE6DC]/20 text-xs font-mono text-[#ECE6DC]">
                          {activeShipment.originCode}
                        </span>
                        <span>{activeShipment.origin}</span>
                        <ArrowRight className="w-4 h-4 text-[#FF5A12] shrink-0" />
                        <span className="px-2 py-0.5 rounded bg-[#13285A] border border-[#ECE6DC]/20 text-xs font-mono text-[#ECE6DC]">
                          {activeShipment.destCode}
                        </span>
                        <span>{activeShipment.destination}</span>
                      </div>
                      <p className="text-xs text-[#ECE6DC]/75 flex items-center gap-1.5 pt-1">
                        <Ship className="w-3.5 h-3.5 text-[#ECE6DC]/50 shrink-0" />
                        <span>{activeShipment.cargo}</span>
                      </p>
                    </div>

                    <div className="md:col-span-5 grid grid-cols-2 gap-3 bg-[#13285A]/80 p-4 rounded-xl border border-[#ECE6DC]/15">
                      <div>
                        <span className="text-[11px] text-[#ECE6DC]/65 uppercase font-semibold block">Target Ceiling</span>
                        <span className="text-sm font-semibold line-through text-[#ECE6DC]/50">
                          {activeShipment.targetPrice}
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] text-[#FF5A12] uppercase font-bold block">Current L1 Bid</span>
                        <span className="text-lg font-extrabold text-[#ECE6DC] font-mono">
                          {activeShipment.currentL1}
                        </span>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-[#ECE6DC]/10 flex items-center justify-between text-xs">
                        <span className="text-[#ECE6DC]/75">Realized Savings:</span>
                        <span className="font-bold text-[#FF5A12] flex items-center gap-1">
                          <TrendingDown className="w-3.5 h-3.5" />
                          {activeShipment.savings} ({activeShipment.savingsPercent})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Real-Time Bidding Ladder — Rows Slide In One by One */}
                  <div className="p-5 md:p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#ECE6DC]/60 uppercase tracking-wider mb-2">
                      <span>Real-Time Bidding Ladder (Ranked L1 to L3)</span>
                      <span className="text-[11px] text-[#FF5A12]">Live Instant Rank Updates</span>
                    </div>

                    <div className="space-y-2.5">
                      {activeShipment.bids.map((bid, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-500 ${
                            bid.isL1 
                              ? "bg-gradient-to-r from-[#FF5A12]/20 via-[#183472] to-[#13285A] border-[#FF5A12] shadow-lg shadow-[#FF5A12]/15" 
                              : "bg-[#13285A]/60 border-[#ECE6DC]/10 hover:border-[#ECE6DC]/25"
                          }`}
                          style={{
                            transform: auctionInView ? "translate3d(0, 0, 0)" : "translate3d(0, 26px, 0)",
                            opacity: auctionInView ? 1 : 0,
                            transition: `all 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${i * 130}ms`
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs font-mono shadow-sm ${
                              bid.isL1 
                                ? "bg-[#FF5A12] text-white shadow-md shadow-[#FF5A12]/40" 
                                : "bg-[#ECE6DC]/15 text-[#ECE6DC]"
                            }`}>
                              {bid.rank}
                            </span>
                            <div>
                              <div className="text-sm font-bold text-[#ECE6DC] flex items-center gap-2">
                                <span>{bid.carrier}</span>
                                {bid.isL1 && (
                                  <Badge className="bg-[#FF5A12] text-white text-[10px] py-0 px-1.5 h-4 font-semibold uppercase">
                                    Winning L1
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-[#ECE6DC]/70">
                                <span className="flex items-center text-amber-400">
                                  <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                                  {bid.rating}
                                </span>
                                <span>• Verified Forwarder</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-base sm:text-lg font-bold font-mono text-[#ECE6DC]">
                              {bid.amount}
                            </div>
                            <span className="text-[11px] text-[#ECE6DC]/60">{bid.tag}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom CTA within card */}
                    <div className="mt-4 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#ECE6DC]/75 border-t border-[#ECE6DC]/10">
                      <span>Want to run an auction like this for your next shipment?</span>
                      <Button asChild size="sm" className="h-8 text-xs font-semibold bg-[#FF5A12] hover:bg-[#E04800] text-white border-none cursor-pointer">
                        <Link href="/signup/exporter">
                          Start 15-Minute Auction
                          <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. REAL-TIME STATS & METRICS BAR (Pearl Shell 30% Surface) */}
        {/* Statistics count up as cards appear: 58%, 57 hrs, +126%; 3–10% stays static */}
        <section ref={statsRef} className="w-full py-12 border-y border-[#13285A]/15 bg-[#ECE6DC] text-[#13285A] shadow-md">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              
              {/* Stat 1: 3–10% Range Stays Static */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1 p-2">
                <div className="flex items-center gap-2 text-[#FF5A12] mb-1">
                  <BadgePercent className="w-5 h-5 text-[#FF5A12]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#13285A]/75">Typical Spot Variance</span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-headline tracking-tight text-[#13285A]">
                  3–10%
                </div>
                <p className="text-xs text-[#13285A]/70 font-medium">Standard baseline rate variance</p>
              </div>

              {/* Stat 2: 58% Counts up from zero */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1 p-2">
                <div className="flex items-center gap-2 text-[#FF5A12] mb-1">
                  <Zap className="w-5 h-5 text-[#FF5A12]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#13285A]/75">Procurement Speedup</span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-headline tracking-tight text-[#13285A] font-mono">
                  {count58}%
                </div>
                <p className="text-xs text-[#13285A]/70 font-medium">Faster booking closure than phone calls</p>
              </div>

              {/* Stat 3: 57 hrs Counts up from zero */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1 p-2">
                <div className="flex items-center gap-2 text-[#FF5A12] mb-1">
                  <Clock className="w-5 h-5 text-[#FF5A12]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#13285A]/75">Turnaround Saved</span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-headline tracking-tight text-[#13285A] font-mono">
                  {count57} hrs
                </div>
                <p className="text-xs text-[#13285A]/70 font-medium">Average time saved per shipment round</p>
              </div>

              {/* Stat 4: +126% Counts up from zero */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1 p-2">
                <div className="flex items-center gap-2 text-[#FF5A12] mb-1">
                  <TrendingDown className="w-5 h-5 text-[#FF5A12]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#13285A]/75">Slot Liquidity Growth</span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-headline tracking-tight text-[#13285A] font-mono">
                  +{count126}%
                </div>
                <p className="text-xs text-[#13285A]/70 font-medium">Year-over-year bidding network depth</p>
              </div>

            </div>
          </div>
        </section>

        {/* 3. CARRIER BAND — Opens up from a rounded, inset shape to full width on scroll */}
        <section className="w-full py-8 md:py-12 bg-[#13285A]">
          <ExpandingCarrierBand />
        </section>

        {/* 4. ONE ECOSYSTEM: FROM BUYER DEMAND TO DELIVERED CARGO */}
        <section className="w-full border-b border-[#13285A]/15">
          <EcosystemWorkflow />
        </section>

        {/* 5. INTERACTIVE HOW IT WORKS — Each step glows orange when it reaches the middle of the screen */}
        <section className="w-full py-20 md:py-28 bg-[#0B1736] border-y border-[#ECE6DC]/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-14">
              <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-[#FF5A12]/30 bg-[#FF5A12]/10 text-[#FF5A12]">
                Transparent &amp; Streamlined
              </span>
              <HeadingWipe>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl font-headline text-[#ECE6DC]">
                  How Reverse Freight Bidding Works
                </h2>
              </HeadingWipe>
              <p className="max-w-2xl text-[#ECE6DC]/70 text-base sm:text-lg">
                Whether you own cargo needing swift export or run logistics capacity looking for steady loads, 
                our platform removes friction at every step.
              </p>
            </div>

            {/* Interactive Role Tabs */}
            <Tabs defaultValue="exporters" className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-10">
                <TabsList className="grid grid-cols-2 w-[340px] sm:w-[420px] p-1 bg-[#0A1633] border border-[#ECE6DC]/15 rounded-xl">
                  <TabsTrigger 
                    value="exporters" 
                    className="rounded-lg text-sm font-bold data-[state=active]:bg-[#FF5A12] data-[state=active]:text-white text-[#ECE6DC]/80 transition-all cursor-pointer"
                  >
                    <Ship className="w-4 h-4 mr-2" /> For Exporters
                  </TabsTrigger>
                  <TabsTrigger 
                    value="carriers" 
                    className="rounded-lg text-sm font-bold data-[state=active]:bg-[#FF5A12] data-[state=active]:text-white text-[#ECE6DC]/80 transition-all cursor-pointer"
                  >
                    <Truck className="w-4 h-4 mr-2" /> For Carriers
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Exporters Workflow — Steps glow orange in the middle of screen */}
              <TabsContent value="exporters" className="space-y-6 focus-visible:outline-none">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Step 1 */}
                  <TiltCard index={0} glowOnCenter={true}>
                    <div className="relative rounded-2xl p-6 space-y-4 border-2 border-[#ECE6DC] bg-[#ECE6DC] text-[#13285A] shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                      <div className="w-12 h-12 rounded-xl bg-[#13285A] text-[#ECE6DC] font-bold font-mono text-lg flex items-center justify-center shadow-md">
                        01
                      </div>
                      <h3 className="text-xl font-bold font-headline text-[#13285A]">Post Your Shipment</h3>
                      <p className="text-sm text-[#13285A]/80 leading-relaxed">
                        Input your container type (20ft, 40ft, Reefer), cargo gross weight, origin port, and target price in under 2 minutes.
                      </p>
                      <div className="pt-2 text-xs font-bold text-[#FF5A12] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Instant 2-Minute Setup
                      </div>
                    </div>
                  </TiltCard>

                  {/* Step 2 */}
                  <TiltCard index={1} glowOnCenter={true}>
                    <div className="relative rounded-2xl p-6 space-y-4 border-2 border-[#ECE6DC] bg-[#ECE6DC] text-[#13285A] shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                      <div className="w-12 h-12 rounded-xl bg-[#FF5A12] text-white font-bold font-mono text-lg flex items-center justify-center shadow-md shadow-[#FF5A12]/30">
                        02
                      </div>
                      <h3 className="text-xl font-bold font-headline text-[#13285A]">Live Reverse Bidding</h3>
                      <p className="text-sm text-[#13285A]/80 leading-relaxed">
                        Pre-verified carriers and shipping lines enter your live room. Real-time competitive pressure drives prices down automatically.
                      </p>
                      <div className="pt-2 text-xs font-bold text-[#FF5A12] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Watch Rates Drop Live
                      </div>
                    </div>
                  </TiltCard>

                  {/* Step 3 */}
                  <TiltCard index={2} glowOnCenter={true}>
                    <div className="relative rounded-2xl p-6 space-y-4 border-2 border-[#ECE6DC] bg-[#ECE6DC] text-[#13285A] shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                      <div className="w-12 h-12 rounded-xl bg-[#13285A] text-[#ECE6DC] font-bold font-mono text-lg flex items-center justify-center shadow-md">
                        03
                      </div>
                      <h3 className="text-xl font-bold font-headline text-[#13285A]">Award &amp; Ship</h3>
                      <p className="text-sm text-[#13285A]/80 leading-relaxed">
                        Review the lowest bidder (L1), verified ratings, and transit timetable. Award the shipment with one click and get direct contact.
                      </p>
                      <div className="pt-2 text-xs font-bold text-[#FF5A12] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Instant Confirmation
                      </div>
                    </div>
                  </TiltCard>

                </div>

                <div className="text-center pt-4">
                  <Link
                    href="/signup/exporter"
                    className="group inline-flex items-center justify-center gap-2.5 min-h-[52px] sm:min-h-[56px] px-8 sm:px-9 rounded-2xl text-base font-headline font-bold text-white bg-gradient-to-b from-[#FF6B2B] via-[#FF5A12] to-[#E04800] border-t border-white/30 border-b border-black/25 shadow-[0_10px_24px_-4px_rgba(255,90,18,0.5)] hover:shadow-[0_16px_32px_-4px_rgba(255,90,18,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                  >
                    <span>Create Exporter Account</span>
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </TabsContent>

              {/* Carriers Workflow */}
              <TabsContent value="carriers" className="space-y-6 focus-visible:outline-none">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Step 1 */}
                  <TiltCard index={0} glowOnCenter={true}>
                    <div className="relative rounded-2xl p-6 space-y-4 border-2 border-[#ECE6DC] bg-[#ECE6DC] text-[#13285A] shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                      <div className="w-12 h-12 rounded-xl bg-[#13285A] text-[#ECE6DC] font-bold font-mono text-lg flex items-center justify-center shadow-md">
                        01
                      </div>
                      <h3 className="text-xl font-bold font-headline text-[#13285A]">Discover High-Volume Lanes</h3>
                      <p className="text-sm text-[#13285A]/80 leading-relaxed">
                        Search verified export shipments across JNPT, Mundra, Chennai, and inland ICDs matching your vessel slots and empty equipment.
                      </p>
                      <div className="pt-2 text-xs font-bold text-[#FF5A12] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Direct Shipper Access
                      </div>
                    </div>
                  </TiltCard>

                  {/* Step 2 */}
                  <TiltCard index={1} glowOnCenter={true}>
                    <div className="relative rounded-2xl p-6 space-y-4 border-2 border-[#ECE6DC] bg-[#ECE6DC] text-[#13285A] shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                      <div className="w-12 h-12 rounded-xl bg-[#FF5A12] text-white font-bold font-mono text-lg flex items-center justify-center shadow-md shadow-[#FF5A12]/30">
                        02
                      </div>
                      <h3 className="text-xl font-bold font-headline text-[#13285A]">Bid With Precision</h3>
                      <p className="text-sm text-[#13285A]/80 leading-relaxed">
                        Submit real-time bids during scheduled rounds. Instant rank feedback shows your position (L1/L2) so you can optimize bids.
                      </p>
                      <div className="pt-2 text-xs font-bold text-[#FF5A12] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Sub-Second Rank Feedback
                      </div>
                    </div>
                  </TiltCard>

                  {/* Step 3 */}
                  <TiltCard index={2} glowOnCenter={true}>
                    <div className="relative rounded-2xl p-6 space-y-4 border-2 border-[#ECE6DC] bg-[#ECE6DC] text-[#13285A] shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                      <div className="w-12 h-12 rounded-xl bg-[#13285A] text-[#ECE6DC] font-bold font-mono text-lg flex items-center justify-center shadow-md">
                        03
                      </div>
                      <h3 className="text-xl font-bold font-headline text-[#13285A]">Win High-Yield Cargo Loads</h3>
                      <p className="text-sm text-[#13285A]/80 leading-relaxed">
                        When awarded, deal directly with genuine corporate exporters. Grow your business with transparent bookings and reliable volume.
                      </p>
                      <div className="pt-2 text-xs font-bold text-[#FF5A12] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Direct Invoicing &amp; Settlement
                      </div>
                    </div>
                  </TiltCard>

                </div>

                <div className="text-center pt-4">
                  <Link
                    href="/signup/carrier"
                    className="group inline-flex items-center justify-center gap-2.5 min-h-[52px] sm:min-h-[56px] px-8 sm:px-9 rounded-2xl text-base font-headline font-bold text-[#13285A] bg-[#ECE6DC] hover:bg-white border-2 border-white/50 shadow-[0_10px_24px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_32px_-4px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                  >
                    <Truck className="w-5 h-5 text-[#FF5A12]" />
                    <span>Register as a Carrier</span>
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </TabsContent>
            </Tabs>

          </div>
        </section>

        {/* 5. SIDE-BY-SIDE PLATFORM COMPARISON */}
        <section className="w-full py-20 md:py-28 bg-[#13285A]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-14">
              <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-[#ECE6DC]/20 bg-[#ECE6DC]/10 text-[#ECE6DC]">
                The Advantage
              </span>
              <HeadingWipe>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl font-headline text-[#ECE6DC]">
                  Why India&apos;s Shippers Choose ShipCargo
                </h2>
              </HeadingWipe>
              <p className="max-w-2xl text-[#ECE6DC]/70 text-base sm:text-lg">
                See the contrast between manual freight negotiation and ShipCargo&apos;s digital reverse auction engine.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Old Traditional Brokerage — Flies in from left with 3D tilt */}
              <TiltCard index={0}>
                <div className="rounded-2xl border-2 border-red-500/25 bg-[#ECE6DC] text-[#13285A] p-6 sm:p-8 space-y-6 shadow-lg h-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center font-bold">
                      <XCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-headline text-[#13285A]">Traditional Freight Brokers</h3>
                      <p className="text-xs text-[#13285A]/70">Opaque, manual, and expensive</p>
                    </div>
                  </div>

                  <ul className="space-y-4 text-sm">
                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#13285A]">15%–20% Hidden Broker Margins: </span>
                        <span className="text-[#13285A]/80">Brokers take substantial cuts on top of real carrier rates without disclosure.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#13285A]">2–4 Days of WhatsApp &amp; Phone Calls: </span>
                        <span className="text-[#13285A]/80">Chaotic back-and-forth haggling with 3 or 4 local agents.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#13285A]">Zero Rate Transparency: </span>
                        <span className="text-[#13285A]/80">No way to verify if you are truly receiving the fair market bottom price.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#13285A]">Unverified Sub-Agents: </span>
                        <span className="text-[#13285A]/80">Shipments frequently brokered through 2nd and 3rd tier intermediaries.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </TiltCard>

              {/* ShipCargo Reverse Auction — Flies in from right with 3D tilt */}
              <TiltCard index={1}>
                <div className="rounded-2xl border-2 border-[#FF5A12]/50 bg-gradient-to-br from-[#183472] to-[#0E1E45] p-6 sm:p-8 space-y-6 shadow-2xl shadow-[#FF5A12]/15 relative overflow-hidden h-full">
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#FF5A12] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                      Recommended
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FF5A12]/15 border border-[#FF5A12]/30 flex items-center justify-center p-1 overflow-hidden shrink-0">
                      <Image
                        src="/cargo-ship.png"
                        alt="ShipCargo Vessel"
                        width={44}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-headline text-[#ECE6DC]">ShipCargo Reverse Auction</h3>
                      <p className="text-xs text-[#ECE6DC]/70">Fast, direct, and mathematical bottom pricing</p>
                    </div>
                  </div>

                  <ul className="space-y-4 text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#FF5A12] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#ECE6DC]">Direct Exporter-Carrier Matching: </span>
                        <span className="text-[#ECE6DC]/80">Eliminate multi-tiered markups with direct counterparty rate discovery.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#FF5A12] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#ECE6DC]">15-Minute Live Auctions: </span>
                        <span className="text-[#ECE6DC]/80">Synchronized countdown rooms finalize bookings in minutes rather than days.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#FF5A12] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#ECE6DC]">Complete Real-Time Visibility: </span>
                        <span className="text-[#ECE6DC]/80">Track every bid, vendor rank, and price drop in live transparent logs.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#FF5A12] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#ECE6DC]">100% KYC &amp; GST Verified: </span>
                        <span className="text-[#ECE6DC]/80">Only vetted corporate carriers and active exporters participate.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </TiltCard>

            </div>
          </div>
        </section>

        {/* 6. BENTO GRID FEATURES & CORE CAPABILITIES */}
        {/* Cards fly in with 3D tilt, short blur, alternating slide-in & row stagger */}
        <section className="w-full py-20 md:py-28 bg-[#0B1736] border-y border-[#ECE6DC]/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-14">
              <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-[#ECE6DC]/20 bg-[#ECE6DC]/10 text-[#ECE6DC]">
                Engineered For Scale
              </span>
              <HeadingWipe>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl font-headline text-[#ECE6DC]">
                  Built For Modern Logistics Teams
                </h2>
              </HeadingWipe>
              <p className="max-w-2xl text-[#ECE6DC]/70 text-base sm:text-lg">
                Everything you need to orchestrate containerized ocean freight, air cargo, and inland port connectivity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              
              {/* Feature 1 */}
              <TiltCard index={0}>
                <div className="p-6 space-y-3 rounded-2xl border-2 border-[#ECE6DC] bg-[#ECE6DC] text-[#13285A] shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#13285A] text-[#FF5A12] flex items-center justify-center shadow-md">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-headline text-[#13285A]">Live Reverse Auction Engine</h3>
                  <p className="text-sm text-[#13285A]/80 leading-relaxed">
                    Real-time algorithmic price discovery pits verified forwarders against each other to find true market rates.
                  </p>
                </div>
              </TiltCard>

              {/* Feature 2 */}
              <TiltCard index={1}>
                <div className="p-6 space-y-3 rounded-2xl border-2 border-[#ECE6DC] bg-[#ECE6DC] text-[#13285A] shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#13285A] text-[#FF5A12] flex items-center justify-center shadow-md">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-headline text-[#13285A]">Deterministic Precision Clock</h3>
                  <p className="text-sm text-[#13285A]/80 leading-relaxed">
                    0.0s latency bidding synchronizes auction openings and closings right to the millisecond across all devices.
                  </p>
                </div>
              </TiltCard>

              {/* Feature 3 */}
              <TiltCard index={2}>
                <div className="p-6 space-y-3 rounded-2xl border-2 border-[#ECE6DC] bg-[#ECE6DC] text-[#13285A] shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#13285A] text-[#FF5A12] flex items-center justify-center shadow-md">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-headline text-[#13285A]">Verified Corporate Network</h3>
                  <p className="text-sm text-[#13285A]/80 leading-relaxed">
                    Rigorous GST verification, company registration validation, and rating history ensure peace of mind for every cargo owner.
                  </p>
                </div>
              </TiltCard>

              {/* Feature 4: Document Room Vault with slide-in row indicators */}
              <TiltCard index={3}>
                <div className="p-6 space-y-3 rounded-2xl border-2 border-[#ECE6DC] bg-[#ECE6DC] text-[#13285A] shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#13285A] text-[#FF5A12] flex items-center justify-center shadow-md">
                      <FileCheck2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold font-headline text-[#13285A]">Document Room Vault</h3>
                    <p className="text-sm text-[#13285A]/80 leading-relaxed">
                      Store and manage Bill of Lading (BL), shipping bills, commercial invoices, and packing lists directly on the platform.
                    </p>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-[#13285A]/15 text-xs font-semibold">
                    <div className="flex items-center justify-between text-[#13285A]/80 py-0.5">
                      <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-[#FF5A12]" /> Bill of Lading (BL)</span>
                      <span className="text-[#FF5A12] text-[11px]">Instant Vault</span>
                    </div>
                    <div className="flex items-center justify-between text-[#13285A]/80 py-0.5">
                      <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#FF5A12]" /> Shipping Bill</span>
                      <span className="text-[#FF5A12] text-[11px]">Digital Signed</span>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Feature 5 */}
              <TiltCard index={4}>
                <div className="p-6 space-y-3 rounded-2xl border-2 border-[#ECE6DC] bg-[#ECE6DC] text-[#13285A] shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#13285A] text-[#FF5A12] flex items-center justify-center shadow-md">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-headline text-[#13285A]">Lane Analytics &amp; History</h3>
                  <p className="text-sm text-[#13285A]/80 leading-relaxed">
                    Track spot rate trends over time, compare historic port fees, and benchmark your shipping spend against market averages.
                  </p>
                </div>
              </TiltCard>

              {/* Feature 6 */}
              <TiltCard index={5}>
                <div className="p-6 space-y-3 rounded-2xl border-2 border-[#ECE6DC] bg-[#ECE6DC] text-[#13285A] shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#13285A] text-[#FF5A12] flex items-center justify-center shadow-md">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-headline text-[#13285A]">Multi-Equipment Support</h3>
                  <p className="text-sm text-[#13285A]/80 leading-relaxed">
                    Full flexibility for 20&apos; Standard, 40&apos; High Cube, Open Top, Reefer, Flat Rack, and Less-than-Container Load (LCL).
                  </p>
                </div>
              </TiltCard>

            </div>
          </div>
        </section>

        {/* 7. FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
        <section className="w-full py-20 md:py-28 bg-[#13285A]">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-[#ECE6DC]/20 bg-[#ECE6DC]/10 text-[#ECE6DC]">
                Got Questions?
              </span>
              <HeadingWipe>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl font-headline text-[#ECE6DC]">
                  Frequently Asked Questions
                </h2>
              </HeadingWipe>
              <p className="text-[#ECE6DC]/70 text-sm sm:text-base">
                Everything you need to know about ShipCargo&apos;s reverse bidding platform.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              
              <AccordionItem value="item-1" className="border-2 border-[#ECE6DC] rounded-xl px-5 py-1 bg-[#ECE6DC] text-[#13285A] shadow-md">
                <AccordionTrigger className="text-left font-bold text-base text-[#13285A] hover:text-[#FF5A12] transition-colors hover:no-underline">
                  How does reverse freight bidding save money for exporters?
                </AccordionTrigger>
                <AccordionContent className="text-[#13285A]/85 leading-relaxed text-sm">
                  In a traditional negotiation, exporters ask one broker who adds a 15–20% markup. In ShipCargo&apos;s reverse auction, multiple verified freight forwarders and vessel slot holders bid against each other simultaneously. Because they see their real-time rank (L1, L2), they lower their rates to fill empty container allocations, driving costs down to the true market floor.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-2 border-[#ECE6DC] rounded-xl px-5 py-1 bg-[#ECE6DC] text-[#13285A] shadow-md">
                <AccordionTrigger className="text-left font-bold text-base text-[#13285A] hover:text-[#FF5A12] transition-colors hover:no-underline">
                  How does shipment posting and live bidding work for exporters?
                </AccordionTrigger>
                <AccordionContent className="text-[#13285A]/85 leading-relaxed text-sm">
                  Exporters register, define their container specifications, set custom target rates, and initiate scheduled live bidding rounds. Pre-vetted carriers compete down in price, and you retain complete discretion to award the shipment to the best-matching qualified carrier.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-2 border-[#ECE6DC] rounded-xl px-5 py-1 bg-[#ECE6DC] text-[#13285A] shadow-md">
                <AccordionTrigger className="text-left font-bold text-base text-[#13285A] hover:text-[#FF5A12] transition-colors hover:no-underline">
                  How are carriers and freight forwarders vetted on ShipCargo?
                </AccordionTrigger>
                <AccordionContent className="text-[#13285A]/85 leading-relaxed text-sm">
                  Every carrier and forwarder undergoes rigorous verification including GST validation, company identification, trade references, and operational compliance. Only approved corporate vendors can participate in live auction rooms, ensuring your cargo is handled exclusively by reputable professionals.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-2 border-[#ECE6DC] rounded-xl px-5 py-1 bg-[#ECE6DC] text-[#13285A] shadow-md">
                <AccordionTrigger className="text-left font-bold text-base text-[#13285A] hover:text-[#FF5A12] transition-colors hover:no-underline">
                  What happens when an auction ends?
                </AccordionTrigger>
                <AccordionContent className="text-[#13285A]/85 leading-relaxed text-sm">
                  When the live countdown timer reaches zero, the exporter receives the complete bidding ladder with the lowest bidder (L1) highlighted. The exporter can review the vendor profile, ratings, and proposed transit days, and award the shipment with a single click. Contact details and documentation workflows open immediately.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-2 border-[#ECE6DC] rounded-xl px-5 py-1 bg-[#ECE6DC] text-[#13285A] shadow-md">
                <AccordionTrigger className="text-left font-bold text-base text-[#13285A] hover:text-[#FF5A12] transition-colors hover:no-underline">
                  How does the deterministic 0.0s auction timer work?
                </AccordionTrigger>
                <AccordionContent className="text-[#13285A]/85 leading-relaxed text-sm">
                  Our platform utilizes synchronized millisecond-precision timers. Shipments scheduled for a specific time (e.g., 07:00 AM) go live at exactly 07:00:00.000 with sub-second synchronization, preventing any race conditions or unfair bidder advantages.
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </div>
        </section>

        {/* 8. HIGH-IMPACT FINAL CALL TO ACTION — Flies in the same way as the cards */}
        <section className="relative w-full py-20 md:py-28 overflow-hidden bg-gradient-to-b from-[#13285A] to-[#0A1633]">
          {/* Glowing Ambient Mesh */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF5A12]/10 to-[#13285A]/40 pointer-events-none" />
          
          <div className="container relative px-4 md:px-6">
            <TiltCard index={0} className="max-w-5xl mx-auto">
              <div className="relative rounded-3xl border-2 border-[#ECE6DC]/20 bg-gradient-to-br from-[#183472] via-[#13285A] to-[#0A1633] p-8 sm:p-12 md:p-16 text-center shadow-2xl backdrop-blur-xl overflow-hidden">
                
                {/* Radial Accent Glow inside banner */}
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5A12]/20 blur-[120px] rounded-full pointer-events-none" />

                {/* Watermark illustrated Cargo Ship cutting through ocean waves */}
                <div className="absolute -bottom-10 -right-8 w-64 sm:w-80 lg:w-96 aspect-[3/2] opacity-20 pointer-events-none select-none">
                  <Image
                    src="/cargo-ship.png"
                    alt="ShipCargo Vessel"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="relative space-y-6 max-w-3xl mx-auto z-10">
                  {/* Official ShipCargo Icon Display */}
                  <div className="flex justify-center mb-2">
                    <Image
                      src="/ship-icon.png"
                      alt="ShipCargo"
                      width={120}
                      height={72}
                      className="h-14 sm:h-16 w-auto object-contain drop-shadow-xl transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-[#FF5A12]/40 bg-[#FF5A12]/15 text-[#FF5A12]">
                    Start Saving Today
                  </span>

                  <HeadingWipe>
                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl font-headline text-[#ECE6DC]">
                      Ready To Revolutionize Your Freight Procurement?
                    </h2>
                  </HeadingWipe>

                  <p className="text-base sm:text-lg text-[#ECE6DC]/80 leading-relaxed">
                    Join hundreds of forward-thinking Indian exporters and logistics providers closing transparent deals in real time. Setup takes less than 2 minutes.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    {/* Primary 10% CTA: Ember Orange Luxury Button */}
                    <Link
                      href="/signup/exporter"
                      className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3.5 min-h-[58px] sm:min-h-[64px] px-8 sm:px-10 rounded-2xl text-base sm:text-lg font-headline font-bold text-white bg-gradient-to-b from-[#FF6B2B] via-[#FF5A12] to-[#E04800] border-t border-white/35 border-b-2 border-black/30 shadow-[0_14px_30px_-4px_rgba(255,90,18,0.55),0_6px_14px_-2px_rgba(255,90,18,0.35)] hover:shadow-[0_22px_44px_-4px_rgba(255,90,18,0.7),0_8px_20px_-2px_rgba(255,90,18,0.5)] hover:-translate-y-1 active:translate-y-0.5 active:scale-[0.99] transition-all duration-200 cursor-pointer overflow-hidden"
                    >
                      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-2xl" />
                      <Ship className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0 drop-shadow-sm transition-transform duration-200 group-hover:scale-110" />
                      <span className="relative z-10 tracking-tight drop-shadow-sm">Post Your First Shipment</span>
                      <ArrowRight className="w-5 h-5 text-white/90 shrink-0 transition-transform duration-200 group-hover:translate-x-1.5" />
                    </Link>

                    {/* Secondary 30% CTA: Pearl Shell Solid Monument */}
                    <Link
                      href="/signup/carrier"
                      className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3.5 min-h-[58px] sm:min-h-[64px] px-8 sm:px-10 rounded-2xl text-base sm:text-lg font-headline font-bold text-[#13285A] bg-[#ECE6DC] hover:bg-white border-2 border-white/50 shadow-[0_14px_30px_-4px_rgba(0,0,0,0.35),0_6px_14px_-2px_rgba(0,0,0,0.2)] hover:shadow-[0_22px_44px_-4px_rgba(0,0,0,0.45)] hover:-translate-y-1 active:translate-y-0.5 active:scale-[0.99] transition-all duration-200 cursor-pointer"
                    >
                      <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF5A12] shrink-0 transition-transform duration-200 group-hover:scale-110" />
                      <span className="tracking-tight">Register as Carrier</span>
                    </Link>
                  </div>

                  <p className="text-xs text-[#ECE6DC]/60 pt-2">
                    No credit card required • Instant KYC onboarding • 24/7 dedicated support
                  </p>
                </div>

              </div>
            </TiltCard>
          </div>
        </section>

      </main>
    </>
  );
}
