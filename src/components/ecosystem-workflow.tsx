"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FileText,
  CheckCircle2,
  Truck,
  Ship,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FlaskConical,
  Boxes,
  Building2,
  Table as TableIcon,
  LayoutGrid,
  ChevronRight,
  Clock,
  ExternalLink
} from "lucide-react";

export interface EcosystemStage {
  id: number;
  stageName: string;
  who: string;
  title: string;
  description: string;
  shipCargoAction: string;
  badgeNumber: number;
  isOrangeBadge?: boolean;
  preview: {
    tag: string;
    pill: string;
    title: string;
    subtitle: string;
    fields: Array<{ label: string; value: string }>;
    ctaText: string;
    ctaHref: string;
  };
}

export const ECOSYSTEM_STAGES: EcosystemStage[] = [
  {
    id: 1,
    stageName: "Requirement",
    who: "Importer",
    title: "Importer lists a requirement",
    description: "Product, quantity, deadline, specs and payment structure, visible to verified exporters.",
    shipCargoAction: "Lists product, quantity, deadline, specs and payment structure",
    badgeNumber: 1,
    preview: {
      tag: "IMPORTER REQUIREMENT",
      pill: "SAMPLE",
      title: "50 MT Dried Red Chillies",
      subtitle: "Buyer in Dubai, UAE",
      fields: [
        { label: "NEEDED BY", value: "30 Dec" },
        { label: "PAYMENT", value: "[PAYMENT TERMS]" },
        { label: "SPECS", value: "[GRADE, MOISTURE, PACKING]" },
        { label: "DELIVERY", value: "[INCOTERM, PORT]" }
      ],
      ctaText: "Respond with a sample",
      ctaHref: "/signup/exporter"
    }
  },
  {
    id: 2,
    stageName: "Response",
    who: "Exporter",
    title: "Exporter responds with a sample",
    description: "Indian exporters send quotes and ship samples against the requirement.",
    shipCargoAction: "Sends a quote and ships a sample",
    badgeNumber: 2,
    preview: {
      tag: "EXPORTER RESPONSE",
      pill: "SAMPLE SENT",
      title: "Sample Batch Dispatched",
      subtitle: "Verified Exporter in Guntur, India",
      fields: [
        { label: "SAMPLE TRACKING", value: "Air Express #DXB-98124" },
        { label: "INDICATIVE FOB", value: "$2,850 / Metric Ton" },
        { label: "SPECIFICATION", value: "S17 Teja Stemless (<10% Moist)" },
        { label: "DISPATCH DATE", value: "Delivered in 3 Business Days" }
      ],
      ctaText: "Review Sample & Quote",
      ctaHref: "/signup/exporter"
    }
  },
  {
    id: 3,
    stageName: "Sample approval",
    who: "Importer, lab",
    title: "Sample tested and approved",
    description: "Lab results and the importer's approval are recorded in the Document Room.",
    shipCargoAction: "Stores the test report and the approval in the Document Room",
    badgeNumber: 3,
    preview: {
      tag: "DOCUMENT ROOM VAULT",
      pill: "LAB TESTED",
      title: "Quality Analysis & Approval",
      subtitle: "SGS Accredited Testing Laboratory",
      fields: [
        { label: "MOISTURE TEST", value: "8.4% (Conforming Standard)" },
        { label: "PESTICIDE SCREEN", value: "Nil / Zero Residue" },
        { label: "CERTIFICATE OF ANALYSIS", value: "COA-2026-9814.pdf" },
        { label: "BUYER APPROVAL", value: "Approved for Full 50 MT Order" }
      ],
      ctaText: "Open Document Room",
      ctaHref: "/login"
    }
  },
  {
    id: 4,
    stageName: "Freight bidding",
    who: "Exporter, carriers",
    title: "Freight goes to live bidding",
    description: "The exporter posts the shipment and carriers bid to win the move.",
    shipCargoAction: "Posts the confirmed shipment; carriers bid live",
    badgeNumber: 4,
    preview: {
      tag: "LIVE FREIGHT AUCTION",
      pill: "ROUND ACTIVE",
      title: "2 × 40' HC Containers (50 MT)",
      subtitle: "Chennai (INMAA) ➔ Jebel Ali (AEJEA)",
      fields: [
        { label: "TARGET CEILING", value: "₹2,10,000" },
        { label: "CURRENT L1 BID", value: "₹1,68,000 (18% Savings)" },
        { label: "ACTIVE CARRIERS", value: "14 Verified Forwarders" },
        { label: "ROUND CLOSES IN", value: "04:18 (Deterministic Clock)" }
      ],
      ctaText: "Join Live Bidding Room",
      ctaHref: "/signup/carrier"
    }
  },
  {
    id: 5,
    stageName: "Delivery",
    who: "Carrier",
    title: "Carrier delivers",
    description: "The winner books, ships and updates documents until the buyer receives the goods.",
    shipCargoAction: "Books, ships and updates documents until delivery",
    badgeNumber: 5,
    isOrangeBadge: true,
    preview: {
      tag: "CARRIER FULFILLMENT",
      pill: "EN ROUTE",
      title: "Vessel: CMA CGM Mumbai",
      subtitle: "Containers #MEDU-882194 / 882195",
      fields: [
        { label: "BILL OF LADING", value: "BL-99214-DXB Verified" },
        { label: "CUSTOMS CLEARANCE", value: "LEO Granted / Cleared" },
        { label: "ESTIMATED BERTH", value: "28 Dec • On Schedule" },
        { label: "MILESTONES", value: "Real-Time GPS & Port Gate-In" }
      ],
      ctaText: "Track Consignment",
      ctaHref: "/login"
    }
  }
];

export function EcosystemWorkflow({ className = "" }: { className?: string }) {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"visual" | "table">("visual");

  const currentStage =
    ECOSYSTEM_STAGES.find((s) => s.id === activeStageId) || ECOSYSTEM_STAGES[0];

  return (
    <div className={cn("w-full py-16 md:py-24 bg-[#ECE6DC] text-[#13285A] relative", className)}>
      {/* Moving coordinate grid backdrop (30% Pearl Shell surface) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#13285A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.06]" />

      <div className="container relative z-10 px-4 md:px-6 max-w-6xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#13285A]/10 text-[#13285A] border border-[#13285A]/15 mb-3">
            <Boxes className="w-3.5 h-3.5 text-[#FF5A12]" />
            <span>End-to-End Trade Lifecycle</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-[#13285A] leading-[1.15]">
            One ecosystem, from buyer demand to delivered cargo
          </h2>

          <p className="mt-4 text-[#13285A]/80 text-base sm:text-lg leading-relaxed max-w-2xl">
            Importers post what they need. Exporters respond with samples and quotes. Carriers then compete live to move the cargo.
          </p>

          {/* View Mode Toggle: Interactive Visual vs Stage Matrix Table */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-[#13285A]/10 border border-[#13285A]/15">
            <button
              type="button"
              onClick={() => setViewMode("visual")}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer",
                viewMode === "visual"
                  ? "bg-[#13285A] text-[#ECE6DC] shadow-sm"
                  : "text-[#13285A]/70 hover:text-[#13285A]"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Interactive Flow</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer",
                viewMode === "table"
                  ? "bg-[#13285A] text-[#ECE6DC] shadow-sm"
                  : "text-[#13285A]/70 hover:text-[#13285A]"
              )}
            >
              <TableIcon className="w-4 h-4" />
              <span>Stage Matrix Table</span>
            </button>
          </div>
        </div>

        {/* 1. VISUAL INTERACTIVE FLOW MODE (Exact Match to User Image) */}
        {viewMode === "visual" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Deep Sapphire Requirement / Stage Preview Card */}
            <div className="lg:col-span-5 w-full">
              <div className="sticky top-28 rounded-3xl p-6 sm:p-8 bg-[#0E1E45] border-2 border-[#13285A] text-[#ECE6DC] shadow-2xl relative overflow-hidden transition-all duration-300">
                {/* Ambient Ember Glow in corner */}
                <div className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 bg-[#FF5A12]/15 blur-3xl rounded-full" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 w-60 h-60 bg-[#13285A]/80 blur-3xl rounded-full" />

                {/* Card Header */}
                <div className="flex items-center justify-between gap-2 border-b border-[#ECE6DC]/10 pb-4 mb-5">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#ECE6DC]/70 uppercase">
                    {currentStage.preview.tag}
                  </span>
                  <Badge className="bg-[#FF5A12] text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    {currentStage.preview.pill}
                  </Badge>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1 mb-6">
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-headline text-white tracking-tight">
                    {currentStage.preview.title}
                  </h3>
                  <p className="text-sm font-medium text-[#ECE6DC]/75 flex items-center gap-1.5">
                    <span>📍</span>
                    <span>{currentStage.preview.subtitle}</span>
                  </p>
                </div>

                {/* 2x2 Grid of Parameters */}
                <div className="grid grid-cols-2 gap-3.5 mb-7">
                  {currentStage.preview.fields.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#13285A]/80 border border-[#ECE6DC]/15 space-y-1"
                    >
                      <span className="text-[10px] font-bold tracking-wider text-[#ECE6DC]/60 uppercase block">
                        {f.label}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-white block truncate">
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stage Progress Tracker Pill */}
                <div className="mb-6 px-3.5 py-2 rounded-xl bg-black/25 border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[#ECE6DC]/70">Active Stage {currentStage.id} of 5:</span>
                  <span className="font-bold text-[#FF5A12] flex items-center gap-1">
                    <span>{currentStage.stageName}</span>
                    <span className="text-[#ECE6DC]/50">•</span>
                    <span className="text-white">{currentStage.who}</span>
                  </span>
                </div>

                {/* Premium Button Matching User Request */}
                <Link
                  href={currentStage.preview.ctaHref}
                  className="group relative w-full inline-flex items-center justify-center gap-3 min-h-[52px] sm:min-h-[56px] px-6 rounded-2xl text-base font-headline font-bold text-white bg-gradient-to-b from-[#FF6B2B] via-[#FF5A12] to-[#E04800] border-t border-white/35 border-b-2 border-black/30 shadow-[0_12px_28px_-4px_rgba(255,90,18,0.55),0_4px_10px_-2px_rgba(255,90,18,0.35)] hover:shadow-[0_18px_36px_-4px_rgba(255,90,18,0.7)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-2xl" />
                  <span className="relative z-10 tracking-tight drop-shadow-sm">
                    {currentStage.preview.ctaText}
                  </span>
                  <ArrowRight className="w-4 h-4 text-white/90 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Column: 5 Sequential Stages */}
            <div className="lg:col-span-7 space-y-4">
              {ECOSYSTEM_STAGES.map((stage) => {
                const isActive = stage.id === activeStageId;
                // Stage 5 is orange in the screenshot, or if the stage is currently selected
                const showOrangeBadge = stage.isOrangeBadge || isActive;

                return (
                  <div
                    key={stage.id}
                    onClick={() => setActiveStageId(stage.id)}
                    className={cn(
                      "p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left select-none",
                      isActive
                        ? "bg-white border-[#FF5A12] shadow-xl ring-2 ring-[#FF5A12]/30 scale-[1.01]"
                        : "bg-[#F8F5EE] border-[#13285A]/15 hover:bg-white hover:border-[#13285A]/30 shadow-md"
                    )}
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* Number Badge (1 to 5) */}
                      <div
                        className={cn(
                          "w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 transition-all duration-200 shadow-md",
                          showOrangeBadge
                            ? "bg-[#FF5A12] text-white shadow-[#FF5A12]/40"
                            : "bg-[#13285A] text-white shadow-[#13285A]/25"
                        )}
                      >
                        {stage.badgeNumber}
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-lg sm:text-xl font-bold font-headline text-[#13285A]">
                            {stage.title}
                          </h4>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#13285A]/10 text-[#13285A] uppercase tracking-wide">
                            {stage.who}
                          </span>
                        </div>

                        <p className="text-sm sm:text-base text-[#13285A]/80 leading-relaxed">
                          {stage.description}
                        </p>

                        {/* Interactive prompt clue */}
                        {isActive && (
                          <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#FF5A12]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Previewing Stage {stage.id} on left panel</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* 2. STAGE MATRIX TABLE MODE */}
        {viewMode === "table" && (
          <div className="rounded-3xl border-2 border-[#13285A]/20 bg-white shadow-2xl overflow-hidden max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#13285A] text-[#ECE6DC] border-b border-[#13285A]/30 text-xs sm:text-sm font-headline uppercase tracking-wider">
                    <th className="py-4 px-6 font-bold w-1/4">Stage</th>
                    <th className="py-4 px-6 font-bold w-1/4">Who</th>
                    <th className="py-4 px-6 font-bold w-1/2">What ShipCargo Does</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#13285A]/10 text-sm sm:text-base">
                  {ECOSYSTEM_STAGES.map((stage) => (
                    <tr
                      key={stage.id}
                      onClick={() => {
                        setActiveStageId(stage.id);
                        setViewMode("visual");
                      }}
                      className="hover:bg-[#FF5A12]/5 transition-colors cursor-pointer group"
                    >
                      {/* Stage column */}
                      <td className="py-4 px-6 align-top">
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0",
                            stage.isOrangeBadge ? "bg-[#FF5A12] text-white" : "bg-[#13285A] text-white"
                          )}>
                            {stage.id}
                          </span>
                          <div>
                            <span className="font-bold text-[#13285A] block group-hover:text-[#FF5A12] transition-colors">
                              {stage.stageName}
                            </span>
                            <span className="text-xs text-[#13285A]/60">Step {stage.id} of 5</span>
                          </div>
                        </div>
                      </td>

                      {/* Who column */}
                      <td className="py-4 px-6 align-top">
                        <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-[#13285A]/10 text-[#13285A]">
                          {stage.who}
                        </span>
                      </td>

                      {/* What ShipCargo does column */}
                      <td className="py-4 px-6 align-top">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-[#13285A]/85 font-medium leading-relaxed">
                            {stage.shipCargoAction}
                          </p>
                          <ChevronRight className="w-4 h-4 text-[#FF5A12] shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all mt-1" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-4 bg-[#F8F5EE] border-t border-[#13285A]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#13285A]/70">
              <span>Click any row to open the interactive simulation view.</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("visual")}
                className="text-xs font-bold text-[#FF5A12] hover:text-[#E04800] hover:bg-[#FF5A12]/10"
              >
                Switch to Interactive Flow ➔
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
