"use client";

import { useState } from "react";
import Link from "next/link";
import { Scale, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function IncotermsSelectorPage() {
  const [freightPayer, setFreightPayer] = useState<"seller" | "buyer">("seller");
  const [insurancePayer, setInsurancePayer] = useState<"seller" | "buyer">("seller");
  const [deliveryPoint, setDeliveryPoint] = useState<"port" | "factory" | "destination">("port");

  // Determine matching term
  let term = "CIF";
  let description = "Cost, Insurance & Freight (named port of destination)";
  let reason = "The seller contracts ocean carriage and provides marine insurance, with risk passing once goods are loaded on board at the Indian origin port.";

  if (deliveryPoint === "factory") {
    term = "EXW";
    description = "Ex Works (named place of delivery)";
    reason = "The buyer takes all responsibility from the seller's factory gate. Caution: Exporter may lack control over the Indian shipping bill.";
  } else if (freightPayer === "buyer") {
    term = "FOB";
    description = "Free on Board (named port of shipment)";
    reason = "The seller delivers goods on board the vessel and clears Indian customs. The buyer contracts ocean freight and assumes all risk from loading onward.";
  } else if (freightPayer === "seller" && insurancePayer === "buyer") {
    term = "CFR";
    description = "Cost and Freight (named port of destination)";
    reason = "The seller pays ocean carriage to the foreign port, but the buyer arranges marine insurance.";
  } else if (deliveryPoint === "destination") {
    term = "DAP";
    description = "Delivered at Place (named place of destination)";
    reason = "The seller delivers goods ready for unloading at the buyer's destination premises, excluding destination import customs duties.";
  }

  return (
    <main className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-[#AEB8D6] flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#AEB8D6]">Tools</span>
          <span>/</span>
          <span className="text-[#ECE6DC] font-semibold">Incoterms Selector</span>
        </nav>

        {/* Header */}
        <div className="space-y-4 border-b border-[#ECE6DC]/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30">
            ICC Incoterms 2020 Decision Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-headline tracking-tight text-white">
            Interactive Incoterms 2020 Selector
          </h1>
          <p className="text-base sm:text-lg text-[#AEB8D6] leading-relaxed">
            Answer 3 quick commercial questions to find the ideal trade term for your export transaction, 
            understand exact risk transfer boundaries, and identify where you can maximize freight margins.
          </p>
        </div>

        {/* Wizard Questions */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1636]/90 border border-[#ECE6DC]/15 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="space-y-6">
            {/* Question 1: Who books and pays ocean freight? */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#AEB8D6] font-bold block">
                1. Who contracts and pays the main international ocean freight?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFreightPayer("seller")}
                  className={cn(
                    "p-4 rounded-xl text-left border transition-all cursor-pointer",
                    freightPayer === "seller"
                      ? "bg-[#13285A] border-[#FF5A12] shadow-md shadow-[#FF5A12]/20"
                      : "bg-[#0A1636]/60 border-[#ECE6DC]/10 hover:border-[#ECE6DC]/20"
                  )}
                >
                  <span className="font-bold text-white block text-sm">Seller / Indian Exporter (Prepaid)</span>
                  <span className="text-xs text-[#AEB8D6] block mt-1">Recommended to capture reverse freight auction savings.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFreightPayer("buyer")}
                  className={cn(
                    "p-4 rounded-xl text-left border transition-all cursor-pointer",
                    freightPayer === "buyer"
                      ? "bg-[#13285A] border-[#FF5A12] shadow-md shadow-[#FF5A12]/20"
                      : "bg-[#0A1636]/60 border-[#ECE6DC]/10 hover:border-[#ECE6DC]/20"
                  )}
                >
                  <span className="font-bold text-white block text-sm">Buyer / Foreign Importer (Collect)</span>
                  <span className="text-xs text-[#AEB8D6] block mt-1">Buyer nominates carrier with global rate contract.</span>
                </button>
              </div>
            </div>

            {/* Question 2: Who arranges marine insurance? */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#AEB8D6] font-bold block">
                2. Who procures marine transit insurance?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setInsurancePayer("seller")}
                  className={cn(
                    "p-4 rounded-xl text-left border transition-all cursor-pointer",
                    insurancePayer === "seller"
                      ? "bg-[#13285A] border-[#FF5A12] shadow-md shadow-[#FF5A12]/20"
                      : "bg-[#0A1636]/60 border-[#ECE6DC]/10 hover:border-[#ECE6DC]/20"
                  )}
                >
                  <span className="font-bold text-white block text-sm">Seller Arranges (CIF rule)</span>
                  <span className="text-xs text-[#AEB8D6] block mt-1">Underwriter policy with minimum 110% CIF value.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInsurancePayer("buyer")}
                  className={cn(
                    "p-4 rounded-xl text-left border transition-all cursor-pointer",
                    insurancePayer === "buyer"
                      ? "bg-[#13285A] border-[#FF5A12] shadow-md shadow-[#FF5A12]/20"
                      : "bg-[#0A1636]/60 border-[#ECE6DC]/10 hover:border-[#ECE6DC]/20"
                  )}
                >
                  <span className="font-bold text-white block text-sm">Buyer Arranges (CFR / FOB rule)</span>
                  <span className="text-xs text-[#AEB8D6] block mt-1">Buyer covers cargo from loading point.</span>
                </button>
              </div>
            </div>

            {/* Question 3: Where does primary physical delivery occur? */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#AEB8D6] font-bold block">
                3. Physical point where cargo is handed over:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "port" as const, title: "On Vessel at Indian Port", sub: "Standard for maritime containers (Nhava Sheva/Mundra)" },
                  { id: "factory" as const, title: "At Exporter Factory", sub: "Buyer collects directly from plant gate" },
                  { id: "destination" as const, title: "At Buyer Destination", sub: "Delivered to buyer warehouse abroad" }
                ].map((pt) => (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setDeliveryPoint(pt.id)}
                    className={cn(
                      "p-4 rounded-xl text-left border transition-all cursor-pointer",
                      deliveryPoint === pt.id
                        ? "bg-[#13285A] border-[#FF5A12] shadow-md shadow-[#FF5A12]/20"
                        : "bg-[#0A1636]/60 border-[#ECE6DC]/10 hover:border-[#ECE6DC]/20"
                    )}
                  >
                    <span className="font-bold text-white block text-xs sm:text-sm">{pt.title}</span>
                    <span className="text-[11px] text-[#AEB8D6] block mt-1">{pt.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Result Display */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#18367A] via-[#102555] to-[#0A1636] border border-[#FF5A12]/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ECE6DC]/10 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                  Recommended Trade Term
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white mt-1">
                  {term}
                </div>
              </div>
              <span className="text-xs font-mono bg-[#0A1636] px-3 py-1.5 rounded-xl border border-[#ECE6DC]/15 text-[#AEB8D6]">
                ICC Incoterms 2020 Standard
              </span>
            </div>

            <p className="text-sm font-semibold text-white">{description}</p>
            <p className="text-xs sm:text-sm text-[#AEB8D6] leading-relaxed">{reason}</p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#ECE6DC]/10">
              <span className="text-xs text-[#AEB8D6]">
                Read our in-depth analysis on why CIF creates margin advantages for Indian exporters.
              </span>
              <Link
                href="/export-guide/incoterms-2020-exporters-guide"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF5A12] hover:text-white transition-colors"
              >
                <span>Read Full Incoterms Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 flex flex-col sm:flex-row justify-between gap-2">
          <span>Standards: International Chamber of Commerce (ICC) Incoterms 2020 Rules</span>
          <span>Last verified: 21 November 2026</span>
        </footer>
      </div>
    </main>
  );
}
