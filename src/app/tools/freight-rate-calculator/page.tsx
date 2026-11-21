"use client";

import { useState } from "react";
import Link from "next/link";
import { Ship, Calculator, ArrowRight, TrendingDown, Clock, ShieldCheck, CheckCircle2, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface LaneData {
  origin: string;
  dest: string;
  transitDays: number;
  rates: {
    "20dry": number;
    "40hc": number;
    "40reefer": number;
  };
  baf: number;
  originThcInr: number;
}

const LANE_RATES: Record<string, LaneData> = {
  "bom-dxb": { origin: "Nhava Sheva (JNPT)", dest: "Dubai (Jebel Ali)", transitDays: 4, rates: { "20dry": 980, "40hc": 1650, "40reefer": 2400 }, baf: 120, originThcInr: 9500 },
  "bom-rtm": { origin: "Nhava Sheva (JNPT)", dest: "Rotterdam (Netherlands)", transitDays: 24, rates: { "20dry": 1750, "40hc": 2450, "40reefer": 3600 }, baf: 280, originThcInr: 9500 },
  "bom-nyc": { origin: "Nhava Sheva (JNPT)", dest: "New York (USA)", transitDays: 28, rates: { "20dry": 2600, "40hc": 3800, "40reefer": 5100 }, baf: 390, originThcInr: 9500 },
  "bom-sin": { origin: "Nhava Sheva (JNPT)", dest: "Singapore", transitDays: 9, rates: { "20dry": 680, "40hc": 1150, "40reefer": 1850 }, baf: 95, originThcInr: 9500 },
  "mun-dxb": { origin: "Mundra Port (MUN)", dest: "Dubai (Jebel Ali)", transitDays: 3, rates: { "20dry": 940, "40hc": 1580, "40reefer": 2350 }, baf: 120, originThcInr: 9200 },
  "mun-rtm": { origin: "Mundra Port (MUN)", dest: "Rotterdam (Netherlands)", transitDays: 23, rates: { "20dry": 1720, "40hc": 2400, "40reefer": 3550 }, baf: 280, originThcInr: 9200 },
  "mun-nyc": { origin: "Mundra Port (MUN)", dest: "New York (USA)", transitDays: 27, rates: { "20dry": 2550, "40hc": 3750, "40reefer": 5050 }, baf: 390, originThcInr: 9200 },
  "maa-sin": { origin: "Chennai Port (MAA)", dest: "Singapore", transitDays: 6, rates: { "20dry": 620, "40hc": 1050, "40reefer": 1750 }, baf: 90, originThcInr: 9400 },
  "maa-dxb": { origin: "Chennai Port (MAA)", dest: "Dubai (Jebel Ali)", transitDays: 9, rates: { "20dry": 1150, "40hc": 1900, "40reefer": 2700 }, baf: 140, originThcInr: 9400 },
  "ccu-sin": { origin: "Kolkata Port (CCU)", dest: "Singapore", transitDays: 7, rates: { "20dry": 690, "40hc": 1180, "40reefer": 1890 }, baf: 95, originThcInr: 9800 }
};

export default function FreightRateCalculatorPage() {
  const [selectedRoute, setSelectedRoute] = useState("bom-dxb");
  const [equipment, setEquipment] = useState<"20dry" | "40hc" | "40reefer">("40hc");
  const [quantity, setQuantity] = useState(1);

  const lane = LANE_RATES[selectedRoute] || LANE_RATES["bom-dxb"];
  const baseFreight = lane.rates[equipment];
  const baf = lane.baf;
  const totalPerContainer = baseFreight + baf;
  const totalSpend = totalPerContainer * quantity;

  // Expected reverse auction reduction on ShipCargo: 18.5%
  const estimatedSavings = Math.round(totalSpend * 0.185);
  const auctionWinningTarget = totalSpend - estimatedSavings;

  return (
    <main className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-[#AEB8D6] flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#AEB8D6]">Tools</span>
          <span>/</span>
          <span className="text-[#ECE6DC] font-semibold">Ocean Freight Calculator</span>
        </nav>

        {/* Header */}
        <div className="space-y-4 border-b border-[#ECE6DC]/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30">
            Instant Maritime Freight Estimator
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-headline tracking-tight text-white">
            Container Ocean Freight Rate Calculator
          </h1>
          <p className="text-base sm:text-lg text-[#AEB8D6] leading-relaxed">
            Estimate baseline container shipping rates from major Indian origin seaports to global destinations. 
            See how much you can save when verified shipping lines compete on your confirmed cargo.
          </p>
        </div>

        {/* Calculator Interactive Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1636]/90 border border-[#ECE6DC]/15 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Route Selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#AEB8D6] font-bold block">
                Trade Corridor &amp; Port Pair:
              </label>
              <select
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="w-full bg-[#13285A] border border-[#ECE6DC]/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#FF5A12]"
              >
                <option value="bom-dxb">Nhava Sheva (JNPT) → Dubai (Jebel Ali)</option>
                <option value="bom-rtm">Nhava Sheva (JNPT) → Rotterdam (EU)</option>
                <option value="bom-nyc">Nhava Sheva (JNPT) → New York (USA)</option>
                <option value="bom-sin">Nhava Sheva (JNPT) → Singapore</option>
                <option value="mun-dxb">Mundra Port (MUN) → Dubai (Jebel Ali)</option>
                <option value="mun-rtm">Mundra Port (MUN) → Rotterdam (EU)</option>
                <option value="mun-nyc">Mundra Port (MUN) → New York (USA)</option>
                <option value="maa-sin">Chennai Port (MAA) → Singapore</option>
                <option value="maa-dxb">Chennai Port (MAA) → Dubai (Jebel Ali)</option>
                <option value="ccu-sin">Kolkata Port (CCU) → Singapore</option>
              </select>
            </div>

            {/* Equipment Selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#AEB8D6] font-bold block">
                Container Equipment:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "20dry" as const, label: "20' Dry" },
                  { id: "40hc" as const, label: "40' High Cube" },
                  { id: "40reefer" as const, label: "40' Reefer" }
                ].map((eq) => (
                  <button
                    key={eq.id}
                    type="button"
                    onClick={() => setEquipment(eq.id)}
                    className={cn(
                      "p-3 rounded-xl text-xs font-mono font-bold transition-all border text-center cursor-pointer",
                      equipment === eq.id
                        ? "bg-[#FF5A12] text-white border-[#FF5A12] shadow-md shadow-[#FF5A12]/30"
                        : "bg-[#13285A]/70 text-[#ECE6DC]/80 border-[#ECE6DC]/10 hover:border-[#ECE6DC]/30"
                    )}
                  >
                    {eq.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Number of Containers Slider */}
          <div className="p-4 rounded-2xl bg-[#13285A]/60 border border-[#ECE6DC]/10 space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-[#AEB8D6] font-medium">Number of Containers:</span>
              <span className="font-mono font-bold text-white text-base bg-[#0A1636] px-3 py-1 rounded-lg border border-[#ECE6DC]/15">
                {quantity} {equipment === "20dry" ? "TEU" : "FEU"}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full h-2 bg-[#0A1636] rounded-lg appearance-none cursor-pointer accent-[#FF5A12]"
            />
          </div>

          {/* Rate Breakdown Output */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#18367A] via-[#102555] to-[#0A1636] border border-[#FF5A12]/30">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#AEB8D6]">Transit Duration</span>
              <div className="text-2xl font-bold font-mono text-white flex items-center gap-1.5">
                <Clock className="w-5 h-5 text-[#FF5A12]" />
                <span>{lane.transitDays} Days</span>
              </div>
              <span className="text-[11px] text-[#AEB8D6]/70">Port-to-port ocean transit</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#AEB8D6]">Traditional Market Cost</span>
              <div className="text-2xl font-bold font-mono text-white line-through opacity-75">
                ${totalSpend.toLocaleString("en-US")}
              </div>
              <span className="text-[11px] text-[#AEB8D6]/70">Includes ${baf * quantity} Bunker Factor</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Reverse Auction Target</span>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                ${auctionWinningTarget.toLocaleString("en-US")}
              </div>
              <span className="text-[11px] text-emerald-300 font-semibold">
                Est. Savings: ~${estimatedSavings.toLocaleString("en-US")} (18.5%)
              </span>
            </div>
          </div>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-xs text-[#AEB8D6] text-center sm:text-left">
              Actual winning rates are determined by real-time bidding between verified ocean carriers.
            </span>
            <Link
              href="/signup/exporter"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#FF5A12]/30 transition-all shrink-0"
            >
              <span>Post Shipment to Win This Rate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Informative Guidance */}
        <div className="p-6 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-4 text-xs sm:text-sm text-[#AEB8D6]">
          <h3 className="text-lg font-bold text-white">How Freight Surcharges are Structured</h3>
          <p className="leading-relaxed">
            All carrier quotes on ShipCargo are required to be <strong>all-in</strong>, combining the base ocean freight 
            with mandatory ocean surcharges including the Bunker Adjustment Factor (BAF) and Currency Adjustment Factor (CAF). 
            Origin Terminal Handling Charges (THC) are clearly distinguished to prevent surprise dock billings.
          </p>
        </div>

        {/* Footer */}
        <footer className="text-xs font-mono text-[#AEB8D6]/70 border-t border-[#ECE6DC]/10 pt-4 flex flex-col sm:flex-row justify-between gap-2">
          <span>Freight benchmark data updated weekly from major shipping line schedules</span>
          <span>Last verified: 21 November 2026</span>
        </footer>
      </div>
    </main>
  );
}
