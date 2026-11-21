"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, TrendingDown, DollarSign, Shield, Zap } from "lucide-react";

export function ExporterSavingsCalculator() {
  const [containersPerMonth, setContainersPerMonth] = useState(15);
  const [avgFreightPerBox, setAvgFreightPerBox] = useState(175000); // INR (~$2,100)

  // Reverse bidding benchmark savings: 18.5%
  const monthlySpend = containersPerMonth * avgFreightPerBox;
  const monthlySavings = Math.round(monthlySpend * 0.185);
  const annualSavings = monthlySavings * 12;

  return (
    <div className="rounded-3xl bg-[#0A1636]/90 border border-[#ECE6DC]/15 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECE6DC]/10 pb-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#FF5A12] font-bold block">
            Freight Reverse Auction Calculator
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Calculate Your Bottom-Line Freight Savings
          </h3>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <TrendingDown className="w-3.5 h-3.5" />
          <span>Avg 18.5% Cost Reduction</span>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Slider 1: Containers Per Month */}
        <div className="space-y-3 p-4 rounded-2xl bg-[#13285A]/60 border border-[#ECE6DC]/10">
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#AEB8D6] font-medium">Monthly Export Volume:</span>
            <span className="font-mono font-bold text-white text-base sm:text-lg bg-[#0A1636] px-3 py-1 rounded-lg border border-[#ECE6DC]/15">
              {containersPerMonth} TEUs / Month
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={containersPerMonth}
            onChange={(e) => setContainersPerMonth(Number(e.target.value))}
            className="w-full h-2 bg-[#0A1636] rounded-lg appearance-none cursor-pointer accent-[#FF5A12]"
          />
          <div className="flex justify-between text-[11px] font-mono text-[#AEB8D6]/60">
            <span>1 TEU</span>
            <span>50 TEUs</span>
            <span>100+ TEUs</span>
          </div>
        </div>

        {/* Slider 2: Average Freight Spend Per Container */}
        <div className="space-y-3 p-4 rounded-2xl bg-[#13285A]/60 border border-[#ECE6DC]/10">
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#AEB8D6] font-medium">Average Ocean Freight Per Box:</span>
            <span className="font-mono font-bold text-[#FF5A12] text-base sm:text-lg bg-[#0A1636] px-3 py-1 rounded-lg border border-[#ECE6DC]/15">
              ₹{avgFreightPerBox.toLocaleString("en-IN")}
            </span>
          </div>
          <input
            type="range"
            min="60000"
            max="400000"
            step="10000"
            value={avgFreightPerBox}
            onChange={(e) => setAvgFreightPerBox(Number(e.target.value))}
            className="w-full h-2 bg-[#0A1636] rounded-lg appearance-none cursor-pointer accent-[#FF5A12]"
          />
          <div className="flex justify-between text-[11px] font-mono text-[#AEB8D6]/60">
            <span>₹60,000 (Middle East)</span>
            <span>₹2,00,000 (Europe)</span>
            <span>₹4,00,000 (US East Coast)</span>
          </div>
        </div>
      </div>

      {/* Calculated Output Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#18367A] via-[#102555] to-[#0A1636] border border-[#FF5A12]/30 text-center sm:text-left">
        <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-[#ECE6DC]/10 pb-4 sm:pb-0 sm:pr-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#AEB8D6]">
            Estimated Monthly Savings
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
            ₹{monthlySavings.toLocaleString("en-IN")}
          </div>
          <span className="text-[11px] text-[#AEB8D6]/70">
            Kept directly in your bottom-line exporter profit.
          </span>
        </div>

        <div className="space-y-1 sm:pl-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#FF5A12] font-bold">
            Projected Annual Profit Gain
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
            ₹{annualSavings.toLocaleString("en-IN")}
          </div>
          <span className="text-[11px] text-[#AEB8D6]/70">
            Across {containersPerMonth * 12} container shipments yearly.
          </span>
        </div>
      </div>

      {/* Exporter CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <span className="text-xs text-[#AEB8D6] text-center sm:text-left">
          Listing export shipments on ShipCargo is ₹0. No upfront fees. Carriers bid in real time.
        </span>
        <Link
          href="/signup/exporter"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#FF5A12]/30 transition-all shrink-0"
        >
          <span>List a Shipment for Live Bidding</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
