"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Send,
  CheckCircle2,
  Phone,
  MessageCircle,
  Building2,
  Mail,
  User,
  Package,
  Globe,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type UserRole = "exporter" | "importer" | "carrier" | "general";

export function ContactInquiryForm() {
  const [role, setRole] = useState<UserRole>("exporter");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [commodity, setCommodity] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated fast submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const getRolePlaceholder = () => {
    switch (role) {
      case "exporter":
        return "E.g., 2x 40' HC Basmati Rice from Mundra to Jebel Ali, seeking container bidding & buyer verification...";
      case "importer":
        return "E.g., Looking for 50 MT Paracetamol API from verified Indian manufacturer with WHO-GMP & COA...";
      case "carrier":
        return "E.g., MTO forwarder interested in participating in live reverse auctions for US East Coast lanes...";
      default:
        return "Please describe how our trade desk and Mr. Lijo Augustine can assist you...";
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-3xl bg-[#0A1636]/90 border border-emerald-500/40 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-headline text-white">
            Inquiry Received Successfully!
          </h3>
          <p className="text-sm text-[#AEB8D6] max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-white">{fullName}</strong>. Your export inquiry has been routed directly to our Senior Export Advisor, <strong>Mr. Lijo Augustine</strong>.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#13285A]/80 border border-[#ECE6DC]/15 text-xs text-[#ECE6DC] space-y-2 max-w-md mx-auto text-left">
          <div className="flex items-center justify-between text-[#AEB8D6]">
            <span>Advisory Response SLA:</span>
            <span className="font-mono text-emerald-400 font-bold">Within 2 Business Hours</span>
          </div>
          <div className="flex items-center justify-between text-[#AEB8D6]">
            <span>Dedicated Advisor:</span>
            <span className="font-semibold text-white">Mr. Lijo Augustine</span>
          </div>
          <div className="flex items-center justify-between text-[#AEB8D6]">
            <span>Direct Hotline:</span>
            <span className="font-mono text-[#FF5A12] font-bold">+91 8089720725</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="https://wa.me/918089720725?text=Hi%20Mr.%20Lijo,%20I%20just%20submitted%20an%20export%20inquiry%20on%20ShipCargo%20and%20would%20like%20to%20connect%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with Mr. Lijo on WhatsApp</span>
          </Link>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setMessage("");
            }}
            className="w-full sm:w-auto border-[#ECE6DC]/20 bg-[#13285A] text-white text-xs hover:bg-[#13285A]/80"
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-6 shadow-xl">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30 uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Priority Trade Desk</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-headline text-white">
          Send an Inquiry to Our Export Desk
        </h3>
        <p className="text-xs text-[#AEB8D6]">
          Fill in your trade requirements below. Mr. Lijo Augustine and our compliance officers review every request within 2 hours.
        </p>
      </div>

      {/* Role Selector Tabs */}
      <div className="space-y-2">
        <Label className="text-xs font-mono text-[#AEB8D6] uppercase tracking-wider">
          I am reaching out as an:
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: "exporter", label: "Exporter / Shipper" },
            { id: "importer", label: "Importer / Buyer" },
            { id: "carrier", label: "Carrier / Forwarder" },
            { id: "general", label: "General Inquiry" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setRole(tab.id as UserRole)}
              className={`p-2.5 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer border ${
                role === tab.id
                  ? "bg-[#FF5A12] text-white border-[#FF5A12] shadow-sm font-bold"
                  : "bg-[#13285A]/60 text-[#AEB8D6] hover:text-white border-[#ECE6DC]/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div className="space-y-1.5">
          <Label htmlFor="fullName" className="text-xs text-[#ECE6DC] flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#FF5A12]" />
            <span>Full Name *</span>
          </Label>
          <Input
            id="fullName"
            required
            placeholder="e.g., Rajesh Sharma"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-11 rounded-xl bg-[#13285A]/80 border-[#ECE6DC]/20 text-white placeholder:text-[#AEB8D6]/50 focus:border-[#FF5A12] text-xs sm:text-sm"
          />
        </div>

        {/* Company Name */}
        <div className="space-y-1.5">
          <Label htmlFor="companyName" className="text-xs text-[#ECE6DC] flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#FF5A12]" />
            <span>Company / Business Name *</span>
          </Label>
          <Input
            id="companyName"
            required
            placeholder="e.g., Apex Global Exports Pvt Ltd"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="h-11 rounded-xl bg-[#13285A]/80 border-[#ECE6DC]/20 text-white placeholder:text-[#AEB8D6]/50 focus:border-[#FF5A12] text-xs sm:text-sm"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs text-[#ECE6DC] flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#FF5A12]" />
            <span>Business Email *</span>
          </Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="e.g., contact@apexexports.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-xl bg-[#13285A]/80 border-[#ECE6DC]/20 text-white placeholder:text-[#AEB8D6]/50 focus:border-[#FF5A12] text-xs sm:text-sm"
          />
        </div>

        {/* Phone / WhatsApp */}
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-xs text-[#ECE6DC] flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#FF5A12]" />
            <span>Phone / WhatsApp Number *</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            required
            placeholder="e.g., +91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-11 rounded-xl bg-[#13285A]/80 border-[#ECE6DC]/20 text-white placeholder:text-[#AEB8D6]/50 focus:border-[#FF5A12] text-xs sm:text-sm"
          />
        </div>

        {/* Commodity / Route */}
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="commodity" className="text-xs text-[#ECE6DC] flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-[#FF5A12]" />
            <span>Commodity / Port Corridor (Optional)</span>
          </Label>
          <Input
            id="commodity"
            placeholder="e.g., Basmati Rice (HS 10063020) · JNPT to Jebel Ali · 2x 40' HC"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            className="h-11 rounded-xl bg-[#13285A]/80 border-[#ECE6DC]/20 text-white placeholder:text-[#AEB8D6]/50 focus:border-[#FF5A12] text-xs sm:text-sm"
          />
        </div>

        {/* Message */}
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="message" className="text-xs text-[#ECE6DC] flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#FF5A12]" />
            <span>Requirement Details &amp; Questions *</span>
          </Label>
          <Textarea
            id="message"
            required
            rows={4}
            placeholder={getRolePlaceholder()}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-xl bg-[#13285A]/80 border-[#ECE6DC]/20 text-white placeholder:text-[#AEB8D6]/50 focus:border-[#FF5A12] text-xs sm:text-sm leading-relaxed"
          />
        </div>

      </div>

      {/* Submit Button & Fast WhatsApp fallback */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="h-12 px-8 rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#FF5A12]/20 transition-all cursor-pointer"
        >
          {loading ? (
            <span>Routing to Mr. Lijo...</span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              <span>Submit Inquiry to Trade Desk</span>
            </span>
          )}
        </Button>

        <div className="text-center sm:text-right">
          <span className="text-[11px] text-[#AEB8D6] block">Need instant guidance?</span>
          <Link
            href="https://wa.me/918089720725?text=Hi%20Mr.%20Lijo,%20I%20need%20urgent%20export%20advisory%20support%20on%20ShipCargo."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Mr. Lijo Augustine Directly ➔</span>
          </Link>
        </div>
      </div>
    </form>
  );
}
