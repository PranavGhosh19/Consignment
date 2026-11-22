"use client";

import Link from "next/link";
import {
  WifiOff,
  RefreshCw,
  Phone,
  MessageCircle,
  FileText,
  Compass,
  Calculator,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  const handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <main className="min-h-screen bg-[#13285A] text-[#ECE6DC] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full mx-auto space-y-8 text-center">
        
        {/* Offline Graphic */}
        <div className="relative mx-auto w-24 h-24 rounded-3xl bg-[#0A1636] border border-[#FF5A12]/40 flex items-center justify-center shadow-2xl">
          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#FF5A12] border-2 border-[#13285A] flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          </div>
          <WifiOff className="w-10 h-10 text-[#FF5A12]" />
        </div>

        {/* Status Text */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30 uppercase">
            <span>Offline Mode Active</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-headline text-white">
            Connection Lost
          </h1>
          <p className="text-sm text-[#AEB8D6] leading-relaxed max-w-md mx-auto">
            You are currently offline or have weak connectivity. ShipCargo keeps your core tools cached locally. Live reverse auction bidding will resume as soon as your connection is restored.
          </p>
        </div>

        {/* Action Button */}
        <div>
          <Button
            type="button"
            onClick={handleReload}
            className="h-12 px-6 rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#FF5A12]/20 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Reconnecting Now</span>
          </Button>
        </div>

        {/* Offline Available Modules */}
        <div className="p-6 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 text-left space-y-4">
          <div className="flex items-center justify-between border-b border-[#ECE6DC]/10 pb-3">
            <span className="text-xs font-mono font-bold text-[#ECE6DC] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Locally Cached Tools</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Available Offline</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/find-demand"
              className="p-3 rounded-xl bg-[#13285A]/70 hover:bg-[#13285A] border border-[#ECE6DC]/10 text-xs text-center space-y-1.5 transition-all block"
            >
              <Compass className="w-4 h-4 text-[#FF5A12] mx-auto" />
              <span className="font-semibold text-white block">Demand Radar</span>
              <span className="text-[10px] text-[#AEB8D6] block">Cached corridors</span>
            </Link>

            <Link
              href="/document-room"
              className="p-3 rounded-xl bg-[#13285A]/70 hover:bg-[#13285A] border border-[#ECE6DC]/10 text-xs text-center space-y-1.5 transition-all block"
            >
              <FileText className="w-4 h-4 text-[#FF5A12] mx-auto" />
              <span className="font-semibold text-white block">Document Room</span>
              <span className="text-[10px] text-[#AEB8D6] block">Compliance guides</span>
            </Link>

            <Link
              href="/tools/freight-rate-calculator"
              className="p-3 rounded-xl bg-[#13285A]/70 hover:bg-[#13285A] border border-[#ECE6DC]/10 text-xs text-center space-y-1.5 transition-all block"
            >
              <Calculator className="w-4 h-4 text-[#FF5A12] mx-auto" />
              <span className="font-semibold text-white block">Freight Tool</span>
              <span className="text-[10px] text-[#AEB8D6] block">Rate estimates</span>
            </Link>
          </div>
        </div>

        {/* Emergency Voice Hotline (Works Without Data) */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1C3A7E]/60 to-[#0A1636] border border-[#FF5A12]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-white">
              <UserCheck className="w-4 h-4 text-[#FF5A12]" />
              <span>Urgent Shipment Assistance</span>
            </div>
            <p className="text-[11px] text-[#AEB8D6]">
              Cellular voice calls work even without mobile data:
            </p>
          </div>

          <Link
            href="tel:+918089720725"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white font-bold text-xs shadow-md transition-all shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Mr. Lijo Augustine</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
