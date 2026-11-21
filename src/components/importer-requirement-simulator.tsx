"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FlaskConical, Building2, Package, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategorySpec {
  id: string;
  name: string;
  iconName: string;
  leadTime: string;
  origin: string;
  sampleTime: string;
  minOrder: string;
  standards: string[];
}

const CATEGORIES: CategorySpec[] = [
  {
    id: "spices",
    name: "Spices & Oleoresins",
    iconName: "chilli",
    leadTime: "12–15 Days",
    origin: "Guntur, Andhra Pradesh",
    sampleTime: "3–4 Days via Courier",
    minOrder: "1 x 20' FCL (14 MT)",
    standards: ["Spices Board India Certified", "Aflatoxin < 10 ppb", "Sudan 1-4 Negative", "Moisture < 11%"]
  },
  {
    id: "grains",
    name: "Basmati & Non-Basmati Rice",
    iconName: "wheat",
    leadTime: "10–14 Days",
    origin: "Karnal, Haryana & Punjab",
    sampleTime: "3–4 Days via Courier",
    minOrder: "1 x 20' FCL (25 MT)",
    standards: ["APEDA Registered Mill", "Avg Grain 8.35mm+", "Purity 95% min", "FSSAI Export Grade"]
  },
  {
    id: "textiles",
    name: "Cotton Yarn & Home Textiles",
    iconName: "scissors",
    leadTime: "18–22 Days",
    origin: "Tirupur & Coimbatore, Tamil Nadu",
    sampleTime: "4–5 Days via Courier",
    minOrder: "1 x 40' HC (22 MT)",
    standards: ["OEKO-TEX Standard 100", "GOTS Organic Certified", "TEXPROCIL Validated", "Count C30s to C80s"]
  },
  {
    id: "pharma",
    name: "Active Pharma Ingredients (API)",
    iconName: "flask",
    leadTime: "14–20 Days",
    origin: "Hyderabad, Telangana & Gujarat",
    sampleTime: "5–7 Days with MSDS",
    minOrder: "500 kg to 5 MT",
    standards: ["WHO-GMP Certified Plant", "US FDA / EDQM Audited", "COA with HPLC Purity > 99.5%", "Cold Chain (2-8°C) Available"]
  }
];

export function ImporterRequirementSimulator() {
  const [selectedId, setSelectedId] = useState("spices");
  const [sampleModalOpen, setSampleModalOpen] = useState(false);

  const activeCategory = CATEGORIES.find((c) => c.id === selectedId) || CATEGORIES[0];

  return (
    <div className="rounded-3xl bg-[#0A1636]/90 border border-[#ECE6DC]/15 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECE6DC]/10 pb-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#FF5A12] font-bold block">
            Interactive Sourcing Console
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Browse Indian Factory Direct Commodities
          </h3>
        </div>
        <div className="text-xs text-[#AEB8D6] font-mono">
          <span>Active Export Clusters: </span>
          <span className="text-emerald-400 font-bold">14 States</span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedId(cat.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer",
              selectedId === cat.id
                ? "bg-[#FF5A12] text-white shadow-lg shadow-[#FF5A12]/30 font-bold scale-[1.02]"
                : "bg-[#13285A]/80 text-[#ECE6DC]/80 hover:bg-[#13285A] hover:text-white border border-[#ECE6DC]/10"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Selected Commodity Specification Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-[#13285A]/60 border border-[#ECE6DC]/10">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#FF5A12]" />
            <h4 className="text-base font-bold text-white">{activeCategory.name} Specifications</h4>
          </div>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between py-1 border-b border-[#ECE6DC]/5">
              <span className="text-[#AEB8D6]">Primary Origin Belt</span>
              <span className="font-semibold text-white">{activeCategory.origin}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#ECE6DC]/5">
              <span className="text-[#AEB8D6]">Standard Production Lead Time</span>
              <span className="font-semibold text-white">{activeCategory.leadTime}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#ECE6DC]/5">
              <span className="text-[#AEB8D6]">Courier Sample Delivery</span>
              <span className="font-semibold text-emerald-400">{activeCategory.sampleTime}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#AEB8D6]">Minimum Export Order (MOQ)</span>
              <span className="font-mono font-bold text-[#FF5A12]">{activeCategory.minOrder}</span>
            </div>
          </div>
        </div>

        {/* Quality & Statutory Testing Checklist */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-[#FF5A12]" />
            <h4 className="text-base font-bold text-white">Pre-Loaded Quality Standards</h4>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-[#AEB8D6]">
            {activeCategory.standards.map((std, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{std}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <span className="text-xs text-[#AEB8D6] text-center sm:text-left">
          Samples are dispatched with official Certificates of Analysis logged to your Document Room.
        </span>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href="/signup/exporter"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#FF5A12]/30 transition-all"
          >
            <span>Post Requirement for {activeCategory.name}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
