"use client";

import { useState } from "react";
import Link from "next/link";
import { Ship, Clock, ArrowRight, TrendingDown, CheckCircle2, Shield, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveAuctionSample {
  id: string;
  lane: string;
  corridorCode: string;
  cargo: string;
  equipment: string;
  vesselCutoff: string;
  currentLowBid: string;
  bidsCount: number;
  timeLeft: string;
}

const SAMPLE_AUCTIONS: LiveAuctionSample[] = [
  {
    id: "auc-1",
    lane: "Nhava Sheva (JNPT) → Jebel Ali (Dubai)",
    corridorCode: "BOM → DXB",
    cargo: "Organic Spices & Chillies (24 MT)",
    equipment: "40' HC FCL",
    vesselCutoff: "3 Days (25 Nov)",
    currentLowBid: "$1,820",
    bidsCount: 7,
    timeLeft: "04:12:30"
  },
  {
    id: "auc-2",
    lane: "Mundra Port → Rotterdam (RTM)",
    corridorCode: "MUN → RTM",
    cargo: "Cotton Combed Yarn (21 MT)",
    equipment: "20' Dry FCL",
    vesselCutoff: "5 Days (27 Nov)",
    currentLowBid: "$2,140",
    bidsCount: 11,
    timeLeft: "08:45:10"
  },
  {
    id: "auc-3",
    lane: "Chennai Port → Singapore (SIN)",
    corridorCode: "MAA → SIN",
    cargo: "Automotive Precision Castings (19 MT)",
    equipment: "20' Heavy FCL",
    vesselCutoff: "2 Days (24 Nov)",
    currentLowBid: "$780",
    bidsCount: 5,
    timeLeft: "02:18:00"
  }
];

export function CarrierBiddingSimulator() {
  const [selectedAuctionId, setSelectedAuctionId] = useState("auc-1");
  const activeAuction = SAMPLE_AUCTIONS.find((a) => a.id === selectedAuctionId) || SAMPLE_AUCTIONS[0];

  return (
    <div className="rounded-3xl bg-[#0A1636]/90 border border-[#ECE6DC]/15 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECE6DC]/10 pb-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#FF5A12] font-bold block flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-[#FF5A12] animate-pulse" />
            <span>Carrier Console Preview</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Confirmed Export Cargo Ready for Ocean Bidding
          </h3>
        </div>
        <div className="text-xs font-mono text-[#AEB8D6]">
          Every auction represents real cargo with buyer-approved samples.
        </div>
      </div>

      {/* Auction Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SAMPLE_AUCTIONS.map((auc) => (
          <button
            key={auc.id}
            type="button"
            onClick={() => setSelectedAuctionId(auc.id)}
            className={cn(
              "p-3.5 rounded-2xl text-left border transition-all cursor-pointer",
              selectedAuctionId === auc.id
                ? "bg-[#13285A] border-[#FF5A12] shadow-md shadow-[#FF5A12]/20"
                : "bg-[#0A1636]/60 border-[#ECE6DC]/10 hover:border-[#ECE6DC]/20"
            )}
          >
            <div className="flex justify-between items-center text-xs font-mono mb-1">
              <span className="font-bold text-[#FF5A12]">{auc.corridorCode}</span>
              <span className="text-emerald-400 font-semibold">{auc.currentLowBid}</span>
            </div>
            <div className="text-xs font-semibold text-white truncate">{auc.equipment}</div>
            <div className="text-[11px] text-[#AEB8D6] truncate mt-0.5">{auc.cargo}</div>
          </button>
        ))}
      </div>

      {/* Selected Auction Detail Card */}
      <div className="p-5 rounded-2xl bg-[#13285A]/70 border border-[#ECE6DC]/10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Ship className="w-5 h-5 text-[#FF5A12]" />
            <h4 className="text-base font-bold text-white">{activeAuction.lane}</h4>
          </div>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between py-1 border-b border-[#ECE6DC]/5">
              <span className="text-[#AEB8D6]">Cargo Description</span>
              <span className="font-semibold text-white">{activeAuction.cargo}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#ECE6DC]/5">
              <span className="text-[#AEB8D6]">Container Equipment</span>
              <span className="font-mono font-bold text-white">{activeAuction.equipment}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#ECE6DC]/5">
              <span className="text-[#AEB8D6]">Vessel Gate Cut-Off</span>
              <span className="font-semibold text-amber-400">{activeAuction.vesselCutoff}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#AEB8D6]">Auction Activity</span>
              <span className="font-mono font-bold text-emerald-400">{activeAuction.bidsCount} Verified Bids Placed</span>
            </div>
          </div>
        </div>

        {/* Live Bidding Box */}
        <div className="p-4 rounded-xl bg-[#0A1636] border border-[#ECE6DC]/10 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs text-[#AEB8D6]">
              <span>Current Leading Low Bid:</span>
              <span className="font-mono text-xs text-amber-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {activeAuction.timeLeft}
              </span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-white">
              {activeAuction.currentLowBid} <span className="text-xs text-[#AEB8D6] font-normal">/ all-in container</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#13285A]/50 border border-[#ECE6DC]/10 text-xs text-[#AEB8D6] space-y-1">
            <p className="flex items-center gap-1.5 text-white font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct shipper contract &amp; irrevocable payment lock.</span>
            </p>
            <p className="text-[11px] text-[#AEB8D6]/70">Platform fee is only 1.5–3.0% on successful completion.</p>
          </div>

          <Link
            href="/signup/carrier"
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#FF5A12]/30 transition-all cursor-pointer"
          >
            <span>Register as Carrier to Place Bids</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
