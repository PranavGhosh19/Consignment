"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Search,
  Filter,
  Globe2,
  Ship,
  Truck,
  ArrowRight,
  CheckCircle2,
  Building2,
  Calendar,
  FileCheck2,
  FlaskConical,
  CreditCard,
  Scale,
  Sparkles,
  Layers,
  MapPin,
  X,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Package,
  TrendingUp,
  AlertCircle,
  Eye,
  SlidersHorizontal,
  Table as TableIcon,
  LayoutGrid
} from "lucide-react";

export interface DemandItem {
  id: string;
  country: string;
  countryCode: string;
  flag: string;
  port: string;
  portCode: string;
  nodeId: string; // Corresponding world map node
  product: string;
  category: "spices" | "rice" | "textiles" | "pharma" | "engineering" | "marine" | "chemicals";
  categoryLabel: string;
  hsCode: string;
  quantityStr: string;
  quantityMT: number;
  equipment: string;
  buyerType: string;
  buyerCity: string;
  deadline: string;
  paymentTerms: string;
  specs: string[];
  status: "Accepting Samples" | "Quotes Open" | "RFQ Closing Soon" | "Priority Procurement";
  verifiedBuyer: boolean;
}

export const PUBLIC_DEMAND_DATA: DemandItem[] = [
  {
    id: "DEM-UAE-101",
    country: "United Arab Emirates",
    countryCode: "AE",
    flag: "🇦🇪",
    port: "Dubai (Jebel Ali)",
    portCode: "DXB",
    nodeId: "dxb",
    product: "Dried Red Chillies (Grade S17 / Teja)",
    category: "spices",
    categoryLabel: "Spices & Agro",
    hsCode: "HS 0904.21",
    quantityStr: "50 MT",
    quantityMT: 50,
    equipment: "2x 40' HC FCL",
    buyerType: "Supermarket Wholesale Network",
    buyerCity: "Dubai, UAE",
    deadline: "30 Dec 2026",
    paymentTerms: "CIF Jebel Ali · 100% Irrevocable LC at Sight",
    specs: ["Stemless, Moisture < 11%", "Aflatoxin < 5 ppb (Eurofins Certified)", "25kg New PP export bags"],
    status: "Accepting Samples",
    verifiedBuyer: true
  },
  {
    id: "DEM-USA-204",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    port: "New York / Newark",
    portCode: "NYC",
    nodeId: "nyc",
    product: "Generic Paracetamol API (USP/BP Grade)",
    category: "pharma",
    categoryLabel: "Pharma & APIs",
    hsCode: "HS 2922.29",
    quantityStr: "18 MT",
    quantityMT: 18,
    equipment: "1x 20' Dry FCL (Palletized)",
    buyerType: "FDA Licensed Pharma Manufacturer",
    buyerCity: "New Jersey, USA",
    deadline: "15 Jan 2027",
    paymentTerms: "CIF New York · 30% Advance, 70% against BL",
    specs: ["Purity >= 99.8% (HPLC)", "Heavy Metals < 10 ppm", "US-FDA DMF & GMP Certificate required"],
    status: "Quotes Open",
    verifiedBuyer: true
  },
  {
    id: "DEM-NLD-302",
    country: "Netherlands",
    countryCode: "NL",
    flag: "🇳🇱",
    port: "Rotterdam Port",
    portCode: "RTM",
    nodeId: "rtm",
    product: "1121 XXL Steam Basmati Rice",
    category: "rice",
    categoryLabel: "Basmati Rice & Grains",
    hsCode: "HS 1006.30",
    quantityStr: "125 MT",
    quantityMT: 125,
    equipment: "5x 20' Dry FCL",
    buyerType: "European Bulk Food Importer",
    buyerCity: "Rotterdam, Netherlands",
    deadline: "22 Dec 2026",
    paymentTerms: "CIF Rotterdam · 100% LC at sight",
    specs: ["Average Grain Length >= 8.35mm", "Moisture < 12.5%", "EU MRL compliant (Nil Tricyclazole)"],
    status: "Priority Procurement",
    verifiedBuyer: true
  },
  {
    id: "DEM-SAU-405",
    country: "Saudi Arabia",
    countryCode: "SA",
    flag: "🇸🇦",
    port: "Jeddah Islamic Port",
    portCode: "JED",
    nodeId: "jed",
    product: "Machine Cleaned Cumin Seeds (Jeera 99%)",
    category: "spices",
    categoryLabel: "Spices & Agro",
    hsCode: "HS 0909.31",
    quantityStr: "28 MT",
    quantityMT: 28,
    equipment: "1x 40' HC FCL",
    buyerType: "Saudi Food Distribution Group",
    buyerCity: "Jeddah, Saudi Arabia",
    deadline: "05 Jan 2027",
    paymentTerms: "CIF Jeddah · 100% Confirmed LC",
    specs: ["Purity >= 99.5% (Singapore Quality)", "Moisture < 8.5%", "SFDA Compliant Barcoding"],
    status: "Accepting Samples",
    verifiedBuyer: true
  },
  {
    id: "DEM-SGP-508",
    country: "Singapore",
    countryCode: "SG",
    flag: "🇸🇬",
    port: "PSA Singapore",
    portCode: "SIN",
    nodeId: "sin",
    product: "Frozen Vannamei Shrimp (HLSO 16/20)",
    category: "marine",
    categoryLabel: "Marine & Seafood",
    hsCode: "HS 0306.17",
    quantityStr: "26 MT",
    quantityMT: 26,
    equipment: "1x 40' Reefer (-18°C)",
    buyerType: "Cold Chain Logistics & Food Service",
    buyerCity: "Jurong, Singapore",
    deadline: "28 Dec 2026",
    paymentTerms: "CIF Singapore · 100% LC at sight",
    specs: ["Individually Quick Frozen (IQF)", "BAP 4-Star Certified", "Glaze 10% Net Weight"],
    status: "Accepting Samples",
    verifiedBuyer: true
  },
  {
    id: "DEM-USA-210",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    port: "Los Angeles",
    portCode: "LAX",
    nodeId: "lax",
    product: "Organic Combed Cotton Yarn (Ne 30s/1)",
    category: "textiles",
    categoryLabel: "Textiles & Apparel",
    hsCode: "HS 5205.12",
    quantityStr: "40 MT",
    quantityMT: 40,
    equipment: "2x 40' HC FCL",
    buyerType: "Knitted Apparel Manufacturer",
    buyerCity: "Los Angeles, CA, USA",
    deadline: "20 Jan 2027",
    paymentTerms: "FOB Mundra / CIF LAX · Net 30 Days",
    specs: ["GOTS Certified 100% Organic", "CSP 2850+, Uster Classimat Tested", "Auto-coned paper tubes"],
    status: "Quotes Open",
    verifiedBuyer: true
  },
  {
    id: "DEM-GBR-601",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    port: "London Gateway",
    portCode: "RTM",
    nodeId: "rtm",
    product: "Assam CTC Second Flush Black Tea (BOP)",
    category: "spices",
    categoryLabel: "Spices & Agro",
    hsCode: "HS 0902.30",
    quantityStr: "35 MT",
    quantityMT: 35,
    equipment: "2x 20' Dry FCL",
    buyerType: "Specialty Tea Blender & Brand",
    buyerCity: "London, UK",
    deadline: "18 Jan 2027",
    paymentTerms: "CIF London Gateway · 20% Adv, 80% on DP",
    specs: ["Tea Board of India Certified", "Moisture < 6.5%, Rich Liquor", "Multi-wall paper sacks with foil liner"],
    status: "Accepting Samples",
    verifiedBuyer: true
  },
  {
    id: "DEM-DEU-703",
    country: "Germany",
    countryCode: "DE",
    flag: "🇩🇪",
    port: "Hamburg Port",
    portCode: "RTM",
    nodeId: "rtm",
    product: "Precision Machined SS316 Flanges & Valves",
    category: "engineering",
    categoryLabel: "Engineering & Auto",
    hsCode: "HS 7307.21",
    quantityStr: "15 MT",
    quantityMT: 15,
    equipment: "1x 20' Heavy FCL",
    buyerType: "Industrial Fluid Piping OEM",
    buyerCity: "Düsseldorf, Germany",
    deadline: "10 Feb 2027",
    paymentTerms: "CIF Hamburg · 30% Advance, 70% against BL",
    specs: ["ANSI B16.5, Class 150/300 RF", "EN 10204 3.1 Material Test Certificate", "Anti-rust oil coated in wooden boxes"],
    status: "RFQ Closing Soon",
    verifiedBuyer: true
  },
  {
    id: "DEM-JPN-801",
    country: "Japan",
    countryCode: "JP",
    flag: "🇯🇵",
    port: "Tokyo / Yokohama",
    portCode: "TYO",
    nodeId: "tyo",
    product: "High Purity Curcumin Extract (95% HPLC)",
    category: "pharma",
    categoryLabel: "Pharma & APIs",
    hsCode: "HS 2932.99",
    quantityStr: "12 MT",
    quantityMT: 12,
    equipment: "Air / Sea Consolidation (FCL)",
    buyerType: "Nutraceutical Formulation Lab",
    buyerCity: "Tokyo, Japan",
    deadline: "25 Jan 2027",
    paymentTerms: "CIF Yokohama · 100% LC at sight",
    specs: ["95% HPLC Certified Purity", "Nil Residual Solvents (Class 3 only)", "Food Chemicals Codex (FCC) Grade"],
    status: "Accepting Samples",
    verifiedBuyer: true
  },
  {
    id: "DEM-AUS-902",
    country: "Australia",
    countryCode: "AU",
    flag: "🇦🇺",
    port: "Sydney (Port Botany)",
    portCode: "SYD",
    nodeId: "syd",
    product: "Organic Ground Spices (Turmeric, Chilli, Garam Masala)",
    category: "spices",
    categoryLabel: "Spices & Agro",
    hsCode: "HS 0910.91",
    quantityStr: "22 MT",
    quantityMT: 22,
    equipment: "1x 20' Dry FCL",
    buyerType: "Supermarket Gourmet Food Importer",
    buyerCity: "Sydney, Australia",
    deadline: "08 Feb 2027",
    paymentTerms: "CIF Sydney · 100% Irrevocable LC",
    specs: ["DAFF Australian Biosecurity Compliant", "Retail 500g zipper stand-up pouches", "Steam Sterilized (Zero ETO treatment)"],
    status: "Accepting Samples",
    verifiedBuyer: true
  },
  {
    id: "DEM-ZAF-110",
    country: "South Africa",
    countryCode: "ZA",
    flag: "🇿🇦",
    port: "Durban Port",
    portCode: "DUR",
    nodeId: "dur",
    product: "Glazed Vitrified Porcelain Floor Tiles (600x1200mm)",
    category: "engineering",
    categoryLabel: "Engineering & Auto",
    hsCode: "HS 6907.21",
    quantityStr: "110 MT",
    quantityMT: 110,
    equipment: "4x 20' Heavy FCL",
    buyerType: "Commercial Building Materials Importer",
    buyerCity: "Durban, South Africa",
    deadline: "14 Feb 2027",
    paymentTerms: "CIF Durban · 25% Advance, 75% on BL copy",
    specs: ["Water Absorption < 0.05%", "High Gloss Nano Polish finish", "Export fumigated wooden pallet crates"],
    status: "Quotes Open",
    verifiedBuyer: true
  },
  {
    id: "DEM-CHN-120",
    country: "China",
    countryCode: "CN",
    flag: "🇨🇳",
    port: "Shanghai (Yangshan)",
    portCode: "SHA",
    nodeId: "sha",
    product: "Refined Castor Oil (First Special Grade - FSG)",
    category: "chemicals",
    categoryLabel: "Chemicals & Dyes",
    hsCode: "HS 1515.30",
    quantityStr: "160 MT",
    quantityMT: 160,
    equipment: "8x Flexitanks in 20' FCL",
    buyerType: "Bio-lubricant & Polymer Chemical Corp",
    buyerCity: "Shanghai, China",
    deadline: "29 Jan 2027",
    paymentTerms: "CIF Shanghai · 100% LC at sight",
    specs: ["Free Fatty Acid (FFA) < 1.00%", "Moisture & Volatiles < 0.25%", "Lovibond Color 15Y / 1.5R max"],
    status: "Quotes Open",
    verifiedBuyer: true
  }
];

interface PublicDemandRadarProps {
  onSelectMapNode?: (nodeId: string) => void;
  selectedMapNode?: string;
}

export function PublicDemandRadar({ onSelectMapNode, selectedMapNode }: PublicDemandRadarProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [quantityFilter, setQuantityFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  
  // Sample Response Dialog State
  const [selectedDemandForSample, setSelectedDemandForSample] = useState<DemandItem | null>(null);
  const [sampleSubmitting, setSampleSubmitting] = useState(false);
  const [sampleSuccess, setSampleSuccess] = useState(false);

  // Available unique countries
  const countries = useMemo(() => {
    const map = new Map<string, { code: string; name: string; flag: string }>();
    PUBLIC_DEMAND_DATA.forEach((d) => {
      if (!map.has(d.country)) {
        map.set(d.country, { code: d.countryCode, name: d.country, flag: d.flag });
      }
    });
    return Array.from(map.values());
  }, []);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return PUBLIC_DEMAND_DATA.filter((item) => {
      // Country match
      if (selectedCountry !== "ALL" && item.country !== selectedCountry) {
        return false;
      }
      // Category match
      if (selectedCategory !== "ALL" && item.category !== selectedCategory) {
        return false;
      }
      // Quantity match
      if (quantityFilter === "UNDER_25" && item.quantityMT >= 25) {
        return false;
      }
      if (quantityFilter === "25_TO_50" && (item.quantityMT < 25 || item.quantityMT > 50)) {
        return false;
      }
      if (quantityFilter === "50_TO_100" && (item.quantityMT <= 50 || item.quantityMT > 100)) {
        return false;
      }
      if (quantityFilter === "OVER_100" && item.quantityMT <= 100) {
        return false;
      }
      // Search text match
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesProduct = item.product.toLowerCase().includes(q);
        const matchesCountry = item.country.toLowerCase().includes(q);
        const matchesPort = item.port.toLowerCase().includes(q);
        const matchesHs = item.hsCode.toLowerCase().includes(q);
        const matchesBuyer = item.buyerType.toLowerCase().includes(q) || item.buyerCity.toLowerCase().includes(q);
        const matchesSpecs = item.specs.some((s) => s.toLowerCase().includes(q));
        if (!matchesProduct && !matchesCountry && !matchesPort && !matchesHs && !matchesBuyer && !matchesSpecs) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCountry, selectedCategory, quantityFilter, searchQuery]);

  // Total MT demanded in filtered set
  const totalDemandedMT = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + curr.quantityMT, 0);
  }, [filteredData]);

  const handleRespondWithSample = (item: DemandItem) => {
    setSelectedDemandForSample(item);
    setSampleSuccess(false);
  };

  const submitSampleProposal = () => {
    setSampleSubmitting(true);
    setTimeout(() => {
      setSampleSubmitting(false);
      setSampleSuccess(true);
    }, 900);
  };

  const isAnyFilterActive =
    selectedCountry !== "ALL" ||
    selectedCategory !== "ALL" ||
    quantityFilter !== "ALL" ||
    searchQuery.trim() !== "";

  const resetFilters = () => {
    setSelectedCountry("ALL");
    setSelectedCategory("ALL");
    setQuantityFilter("ALL");
    setSearchQuery("");
  };

  return (
    <section id="public-demand" className="space-y-4 pt-2">
      
      {/* Header Banner: Title, Subtitle, Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-[#0A1636]/90 border border-[#ECE6DC]/15 backdrop-blur-xl shadow-xl">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30 uppercase">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Public Global Demand Radar · Real Buyer Requirements</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-headline tracking-tight text-white">
            Which country demands what from India.
          </h2>

          <p className="text-xs sm:text-sm text-[#C9D2EE] leading-relaxed">
            Verified international buyers listing product specifications, quantities, and payment terms. Indian exporters can filter requisitions, submit quotes, and send lab-approved samples.
          </p>
        </div>

        {/* Counter Pills */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="px-3.5 py-2 rounded-2xl bg-[#13285A]/80 border border-[#ECE6DC]/10 text-center min-w-[100px]">
            <span className="block text-[10px] font-mono uppercase text-[#AEB8D6]">Total Demands</span>
            <span className="text-lg font-bold font-mono text-white">{filteredData.length} Requisitions</span>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-[#13285A]/80 border border-[#FF5A12]/30 text-center min-w-[110px]">
            <span className="block text-[10px] font-mono uppercase text-[#AEB8D6]">Volume Pool</span>
            <span className="text-lg font-bold font-mono text-[#FF5A12]">{totalDemandedMT.toLocaleString()} MT</span>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-[#13285A]/80 border border-[#ECE6DC]/10 text-center min-w-[100px] hidden sm:block">
            <span className="block text-[10px] font-mono uppercase text-[#AEB8D6]">Settlement</span>
            <span className="text-lg font-bold font-mono text-emerald-400">100% Verified LC</span>
          </div>
        </div>
      </div>

      {/* Streamlined & Simplified Filter Toolbar */}
      <div className="p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#0A1636]/85 border border-[#ECE6DC]/15 backdrop-blur-xl shadow-xl space-y-3">
        
        {/* Unified Responsive Filter Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 items-center">
          
          {/* 1. Free-Text Search Input (4 cols on desktop) */}
          <div className="lg:col-span-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AEB8D6] pointer-events-none" />
            <Input
              type="text"
              placeholder="Search product, HS code, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-9 h-10 rounded-xl bg-[#13285A]/70 border-[#ECE6DC]/15 text-[#ECE6DC] placeholder:text-[#AEB8D6]/60 text-xs sm:text-sm focus:border-[#FF5A12] focus:ring-1 focus:ring-[#FF5A12]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AEB8D6] hover:text-white cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 2. Country Dropdown Selector (3 cols on desktop) */}
          <div className="lg:col-span-3 relative">
            <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF5A12] pointer-events-none" />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              aria-label="Filter as per Country"
              className={cn(
                "w-full h-10 pl-9 pr-8 rounded-xl text-xs sm:text-sm font-medium transition-all appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FF5A12]",
                selectedCountry !== "ALL"
                  ? "bg-[#FF5A12]/15 border-[#FF5A12]/50 text-white font-bold"
                  : "bg-[#13285A]/70 border-[#ECE6DC]/15 text-[#ECE6DC] hover:border-[#ECE6DC]/30"
              )}
            >
              <option value="ALL" className="bg-[#0A1636] text-white">All Countries ({countries.length})</option>
              {countries.map((c) => (
                <option key={c.name} value={c.name} className="bg-[#0A1636] text-white">
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AEB8D6] pointer-events-none" />
          </div>

          {/* 3. Product Category Dropdown Selector (2 cols on desktop) */}
          <div className="lg:col-span-2 relative">
            <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5E7FD8] pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter as per Product"
              className={cn(
                "w-full h-10 pl-9 pr-8 rounded-xl text-xs sm:text-sm font-medium transition-all appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FF5A12]",
                selectedCategory !== "ALL"
                  ? "bg-[#5E7FD8]/20 border-[#5E7FD8]/50 text-white font-bold"
                  : "bg-[#13285A]/70 border-[#ECE6DC]/15 text-[#ECE6DC] hover:border-[#ECE6DC]/30"
              )}
            >
              <option value="ALL" className="bg-[#0A1636] text-white">All Commodities</option>
              <option value="spices" className="bg-[#0A1636] text-white">🌶️ Spices & Agro</option>
              <option value="rice" className="bg-[#0A1636] text-white">🌾 Basmati Rice</option>
              <option value="pharma" className="bg-[#0A1636] text-white">💊 Pharma & APIs</option>
              <option value="textiles" className="bg-[#0A1636] text-white">🧵 Textiles & Yarn</option>
              <option value="marine" className="bg-[#0A1636] text-white">🦐 Marine & Seafood</option>
              <option value="engineering" className="bg-[#0A1636] text-white">⚙️ Engineering Goods</option>
              <option value="chemicals" className="bg-[#0A1636] text-white">🧪 Chemicals & Oils</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AEB8D6] pointer-events-none" />
          </div>

          {/* 4. Quantity Range Dropdown Selector (2 cols on desktop) */}
          <div className="lg:col-span-2 relative">
            <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF5A12] pointer-events-none" />
            <select
              value={quantityFilter}
              onChange={(e) => setQuantityFilter(e.target.value)}
              aria-label="Filter by Quantity"
              className={cn(
                "w-full h-10 pl-9 pr-8 rounded-xl text-xs sm:text-sm font-medium transition-all appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FF5A12]",
                quantityFilter !== "ALL"
                  ? "bg-[#FF5A12]/15 border-[#FF5A12]/50 text-white font-bold"
                  : "bg-[#13285A]/70 border-[#ECE6DC]/15 text-[#ECE6DC] hover:border-[#ECE6DC]/30"
              )}
            >
              <option value="ALL" className="bg-[#0A1636] text-white">Any Quantity</option>
              <option value="UNDER_25" className="bg-[#0A1636] text-white">&lt; 25 MT (Small/LCL)</option>
              <option value="25_TO_50" className="bg-[#0A1636] text-white">25 – 50 MT (1-2 FCL)</option>
              <option value="50_TO_100" className="bg-[#0A1636] text-white">50 – 100 MT (2-4 FCL)</option>
              <option value="OVER_100" className="bg-[#0A1636] text-white">100+ MT (Bulk Volume)</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AEB8D6] pointer-events-none" />
          </div>

          {/* 5. View Mode Toggle (Cards vs Table) (1 col on desktop) */}
          <div className="lg:col-span-1 flex items-center justify-end">
            <div className="flex items-center p-0.5 rounded-xl bg-[#13285A] border border-[#ECE6DC]/10">
              <button
                type="button"
                onClick={() => setViewMode("cards")}
                aria-label="Cards View"
                title="Cards Grid View"
                className={cn(
                  "p-2 rounded-lg text-xs transition-colors cursor-pointer",
                  viewMode === "cards" ? "bg-[#FF5A12] text-white shadow-sm font-bold" : "text-[#AEB8D6] hover:text-white"
                )}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                aria-label="Table View"
                title="Data Table View"
                className={cn(
                  "p-2 rounded-lg text-xs transition-colors cursor-pointer",
                  viewMode === "table" ? "bg-[#FF5A12] text-white shadow-sm font-bold" : "text-[#AEB8D6] hover:text-white"
                )}
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Minimal Active Filter Tags (Only rendered when a filter is applied) */}
        {isAnyFilterActive && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#ECE6DC]/10 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono text-[#AEB8D6]">Filters:</span>
              
              {selectedCountry !== "ALL" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF5A12]/20 text-[#FF5A12] border border-[#FF5A12]/40 text-xs font-mono font-medium">
                  <span>{selectedCountry}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedCountry("ALL")}
                    className="hover:text-white font-bold ml-0.5 cursor-pointer"
                    aria-label={`Remove ${selectedCountry} filter`}
                  >
                    ×
                  </button>
                </span>
              )}

              {selectedCategory !== "ALL" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#5E7FD8]/20 text-[#8FB0FF] border border-[#5E7FD8]/40 text-xs font-mono font-medium">
                  <span>Category: {selectedCategory}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("ALL")}
                    className="hover:text-white font-bold ml-0.5 cursor-pointer"
                    aria-label="Remove category filter"
                  >
                    ×
                  </button>
                </span>
              )}

              {quantityFilter !== "ALL" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF5A12]/20 text-[#FF5A12] border border-[#FF5A12]/40 text-xs font-mono font-medium">
                  <span>Volume: {quantityFilter === "UNDER_25" ? "< 25 MT" : quantityFilter === "25_TO_50" ? "25-50 MT" : quantityFilter === "50_TO_100" ? "50-100 MT" : "100+ MT"}</span>
                  <button
                    type="button"
                    onClick={() => setQuantityFilter("ALL")}
                    className="hover:text-white font-bold ml-0.5 cursor-pointer"
                    aria-label="Remove quantity filter"
                  >
                    ×
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-mono font-medium">
                  <span>&quot;{searchQuery}&quot;</span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="hover:text-white font-bold ml-0.5 cursor-pointer"
                    aria-label="Clear search query"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[#AEB8D6]">
                Showing <b className="text-white">{filteredData.length}</b> of {PUBLIC_DEMAND_DATA.length}
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-[#FF5A12] hover:text-[#FF8544] underline font-mono cursor-pointer"
              >
                Clear all
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Main Content Area: Cards or Table */}
      {filteredData.length === 0 ? (
        <div className="p-12 rounded-3xl bg-[#0A1636]/70 border border-[#ECE6DC]/10 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-[#FF5A12] mx-auto opacity-80" />
          <h3 className="text-lg font-bold text-white">No Matching Public Requisitions Found</h3>
          <p className="text-xs sm:text-sm text-[#AEB8D6] max-w-md mx-auto">
            No international buyers match your current filters. Try resetting the country, commodity, or quantity criteria.
          </p>
          <Button
            onClick={() => {
              setSelectedCountry("ALL");
              setSelectedCategory("ALL");
              setQuantityFilter("ALL");
              setSearchQuery("");
            }}
            className="rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white text-xs font-bold"
          >
            Show All Demands
          </Button>
        </div>
      ) : viewMode === "cards" ? (
        
        /* 1. CARDS GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="group p-5 rounded-3xl bg-[#0A1636]/85 border border-[#ECE6DC]/15 hover:border-[#FF5A12]/50 backdrop-blur-xl shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4 hover:translate-y-[-2px]"
            >
              <div className="space-y-3">
                
                {/* Card Top: Country Flag, Port, Status Badge */}
                <div className="flex items-center justify-between gap-2 border-b border-[#ECE6DC]/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" role="img" aria-label={item.country}>{item.flag}</span>
                    <div>
                      <div className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{item.country}</span>
                        <span className="text-[#8FB0FF]">({item.portCode})</span>
                      </div>
                      <span className="text-[11px] text-[#AEB8D6] block truncate">
                        {item.port}
                      </span>
                    </div>
                  </div>

                  <Badge
                    className={cn(
                      "font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider shrink-0",
                      item.status === "Accepting Samples"
                        ? "bg-[#FF5A12]/20 text-[#FF5A12] border border-[#FF5A12]/40"
                        : item.status === "Priority Procurement"
                        ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    )}
                  >
                    {item.status}
                  </Badge>
                </div>

                {/* Product Name & Category */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#AEB8D6] mb-1">
                    <span>{item.categoryLabel}</span>
                    <span className="text-[#8FB0FF]">{item.hsCode}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-[#FF5A12] transition-colors">
                    {item.product}
                  </h3>
                </div>

                {/* Quantity & Equipment Badge Callout */}
                <div className="p-3 rounded-2xl bg-[#13285A]/70 border border-[#ECE6DC]/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#AEB8D6] block">Required Quantity</span>
                    <span className="text-lg font-extrabold font-mono text-white tracking-tight">{item.quantityStr}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase text-[#AEB8D6] block">Equipment</span>
                    <span className="text-xs font-mono font-semibold text-[#8FB0FF]">{item.equipment}</span>
                  </div>
                </div>

                {/* Technical Specifications checklist */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-[#AEB8D6] block tracking-wider">
                    Quality Specifications:
                  </span>
                  <ul className="space-y-1">
                    {item.specs.map((spec, i) => (
                      <li key={i} className="text-xs text-[#ECE6DC]/90 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A12] mt-0.5 shrink-0" />
                        <span className="leading-snug">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buyer Profile & Payment Terms */}
                <div className="pt-2 border-t border-[#ECE6DC]/10 space-y-1.5 text-xs text-[#AEB8D6]">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Building2 className="w-3.5 h-3.5 text-[#5E7FD8]" />
                      <span>{item.buyerType}</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#ECE6DC]/60">{item.buyerCity}</span>
                  </div>
                  
                  <div className="flex justify-between items-center font-mono text-[11px]">
                    <span className="flex items-center gap-1 text-[#AEB8D6]">
                      <CreditCard className="w-3.5 h-3.5 text-[#FF5A12]" />
                      <span>Terms:</span>
                    </span>
                    <span className="font-semibold text-white truncate max-w-[200px]" title={item.paymentTerms}>
                      {item.paymentTerms}
                    </span>
                  </div>

                  <div className="flex justify-between items-center font-mono text-[11px]">
                    <span className="flex items-center gap-1 text-[#AEB8D6]">
                      <Calendar className="w-3.5 h-3.5 text-[#5E7FD8]" />
                      <span>Needed By:</span>
                    </span>
                    <span className="font-semibold text-amber-300">{item.deadline}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#ECE6DC]/10 flex items-center gap-2">
                
                {/* Respond with a Sample Button */}
                <Button
                  onClick={() => handleRespondWithSample(item)}
                  className="flex-1 h-9 rounded-xl text-xs font-bold font-headline bg-gradient-to-r from-[#FF6B2B] to-[#FF5A12] hover:from-[#FF5A12] hover:to-[#E04800] text-white shadow-md shadow-[#FF5A12]/30 cursor-pointer"
                >
                  <FlaskConical className="w-3.5 h-3.5 mr-1.5" />
                  Respond with Sample
                </Button>

                {/* Inspect Corridor on Map */}
                {onSelectMapNode && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onSelectMapNode(item.nodeId);
                      const el = document.getElementById("radar-map-canvas");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    title={`Highlight route to ${item.portCode} on map`}
                    className="h-9 px-2.5 rounded-xl border-[#ECE6DC]/20 bg-[#13285A]/60 hover:bg-[#13285A] text-[#8FB0FF] hover:text-white"
                  >
                    <Ship className="w-3.5 h-3.5" />
                  </Button>
                )}

              </div>

            </div>
          ))}
        </div>

      ) : (
        
        /* 2. COMPACT DATA TABLE VIEW */
        <div className="rounded-3xl bg-[#0A1636]/90 border border-[#ECE6DC]/15 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#13285A] text-[#AEB8D6] uppercase tracking-wider border-b border-[#ECE6DC]/10">
                <tr>
                  <th className="py-3 px-4">Country &amp; Port</th>
                  <th className="py-3 px-4">Product &amp; HS Code</th>
                  <th className="py-3 px-4">Volume Required</th>
                  <th className="py-3 px-4">Quality Specs</th>
                  <th className="py-3 px-4">Payment Structure</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECE6DC]/10 text-[#ECE6DC]">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-[#13285A]/50 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.flag}</span>
                        <div>
                          <div className="font-bold text-white">{item.country}</div>
                          <span className="text-[11px] text-[#8FB0FF]">{item.port}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-xs">{item.product}</div>
                      <span className="text-[11px] text-[#AEB8D6]">{item.categoryLabel} · {item.hsCode}</span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-white block">{item.quantityStr}</span>
                      <span className="text-[11px] text-[#AEB8D6]">{item.equipment}</span>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="text-[11px] text-[#AEB8D6] truncate" title={item.specs.join(" · ")}>
                        {item.specs.join(" · ")}
                      </div>
                      <span className="text-[10px] text-emerald-400 font-semibold">{item.buyerType}</span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="text-[11px] text-white font-medium">{item.paymentTerms}</div>
                      <Badge className="bg-[#FF5A12]/15 text-[#FF5A12] border-none text-[9px] px-1.5 py-0 mt-0.5">
                        {item.status}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-amber-300 font-semibold">
                      {item.deadline}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          onClick={() => handleRespondWithSample(item)}
                          className="h-8 rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white text-xs font-bold font-headline"
                        >
                          Send Sample
                        </Button>
                        {onSelectMapNode && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              onSelectMapNode(item.nodeId);
                              const el = document.getElementById("radar-map-canvas");
                              if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                            }}
                            className="h-8 w-8 p-0 text-[#8FB0FF] hover:text-white hover:bg-white/10"
                          >
                            <Ship className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      )}

      {/* Interactive Sample Response Modal (Matching Ecosystem Stage 2) */}
      <Dialog
        open={Boolean(selectedDemandForSample)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedDemandForSample(null);
            setSampleSuccess(false);
          }
        }}
      >
        <DialogContent className="max-w-lg bg-[#0A1636] border-2 border-[#1E3E7E] text-[#ECE6DC] p-6 rounded-3xl shadow-2xl">
          {selectedDemandForSample && (
            <>
              <DialogHeader className="space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#FF5A12]/20 text-[#FF5A12] border border-[#FF5A12]/40 text-xs font-mono font-bold">
                    ECOSYSTEM STAGE 2 · EXPORTER RESPONSE
                  </Badge>
                </div>
                <DialogTitle className="text-xl font-bold font-headline text-white">
                  Respond with Sample: {selectedDemandForSample.product}
                </DialogTitle>
                <DialogDescription className="text-xs text-[#AEB8D6]">
                  Submitting a certified commercial sample and factory quote to verified buyer in {selectedDemandForSample.country} ({selectedDemandForSample.port}).
                </DialogDescription>
              </DialogHeader>

              {sampleSuccess ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Sample Proposal Dispatched!</h4>
                  <p className="text-xs text-[#AEB8D6] max-w-sm mx-auto">
                    Your lab specs and sample courier tracking have been recorded. Lab test reports will be archived in the Document Room upon receipt in {selectedDemandForSample.buyerCity}.
                  </p>
                  <div className="p-3 rounded-2xl bg-[#13285A]/70 border border-[#ECE6DC]/10 text-xs font-mono text-[#AEB8D6]">
                    Reference ID: <b className="text-white">SMPL-{selectedDemandForSample.portCode}-{Math.floor(1000 + Math.random() * 9000)}</b>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-2 text-xs">
                  
                  {/* Requisition Summary Card */}
                  <div className="p-3.5 rounded-2xl bg-[#13285A]/80 border border-[#ECE6DC]/15 space-y-2">
                    <div className="flex justify-between text-[#AEB8D6]">
                      <span>Destination Port:</span>
                      <b className="text-white font-mono">{selectedDemandForSample.port}</b>
                    </div>
                    <div className="flex justify-between text-[#AEB8D6]">
                      <span>Total Requisition:</span>
                      <b className="text-[#FF5A12] font-mono">{selectedDemandForSample.quantityStr} ({selectedDemandForSample.equipment})</b>
                    </div>
                    <div className="flex justify-between text-[#AEB8D6]">
                      <span>Incoterm &amp; Payment:</span>
                      <b className="text-white font-mono">{selectedDemandForSample.paymentTerms}</b>
                    </div>
                  </div>

                  {/* Sample Proposal Input Mock */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-mono text-[#AEB8D6] mb-1 uppercase">
                        Sample Package Weight &amp; Batch No.
                      </label>
                      <Input
                        defaultValue="500g Sealed Export Sample (Batch #IND-2026-99)"
                        className="h-9 rounded-xl bg-[#091530] border-[#ECE6DC]/20 text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#AEB8D6] mb-1 uppercase">
                        FOB / CIF Quotation against this demand
                      </label>
                      <Input
                        defaultValue="USD $2,450 / MT CIF Jebel Ali"
                        className="h-9 rounded-xl bg-[#091530] border-[#ECE6DC]/20 text-white text-xs font-mono"
                      />
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5 text-emerald-300">
                      <FileCheck2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-relaxed">
                        ShipCargo Document Room automatically locks this quote and generates sample airway bill (e-Way Bill) on dispatch.
                      </span>
                    </div>
                  </div>

                </div>
              )}

              <DialogFooter className="flex items-center justify-between gap-3 pt-3 border-t border-[#ECE6DC]/10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedDemandForSample(null)}
                  className="rounded-xl text-xs text-[#AEB8D6] hover:text-white"
                >
                  {sampleSuccess ? "Close" : "Cancel"}
                </Button>

                {!sampleSuccess ? (
                  <Button
                    onClick={submitSampleProposal}
                    disabled={sampleSubmitting}
                    className="rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white text-xs font-bold font-headline h-9 px-5 cursor-pointer"
                  >
                    {sampleSubmitting ? "Generating Airway Bill..." : "Submit Sample & Quote"}
                  </Button>
                ) : (
                  <Link
                    href="/exporter"
                    className="rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white text-xs font-bold font-headline h-9 px-5 inline-flex items-center"
                  >
                    Go to Exporter Dashboard
                  </Link>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

    </section>
  );
}
