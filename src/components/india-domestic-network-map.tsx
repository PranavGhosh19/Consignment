"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface IndiaNode {
  id: string;
  name: string;
  code: string;
  x: number;
  y: number;
  labelPos: "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  isMajor: boolean;
  hasPulseIcon?: boolean;
}

interface IndiaArc {
  id: string;
  from: string;
  to: string;
  d: string;
  isMainCorridor?: boolean;
}

interface VehicleTelemetry {
  unit: string;
  status: "ON TIME" | "IN TRANSIT" | "SCHEDULED";
  ref: string;
  transporter: string;
  load: string;
  rate: string;
  corridor: string;
  progress: number;
  anchorX?: number; // relative % for desktop card placement
  anchorY?: number;
}

interface ActivityEvent {
  id: string;
  dot: "blue" | "green" | "orange";
  ref: string;
  time: string;
  action: string;
  corridor: string;
}

// Coordinate space: 1000 x 750 (aspect ~ 4:3 matching user reference)
const INDIA_NODES: IndiaNode[] = [
  // Major Huds (Bold glowing text in screenshot)
  { id: "delhi", name: "DELHI NCR", code: "DEL", x: 295, y: 155, labelPos: "bottom", isMajor: true, hasPulseIcon: true },
  { id: "ahmedabad", name: "AHMEDABAD", code: "AMD", x: 140, y: 350, labelPos: "left", isMajor: true, hasPulseIcon: true },
  { id: "mumbai", name: "MUMBAI", code: "BOM", x: 155, y: 485, labelPos: "left", isMajor: true, hasPulseIcon: true },
  { id: "pune", name: "PUNE", code: "PNQ", x: 200, y: 525, labelPos: "right", isMajor: true, hasPulseIcon: true },
  { id: "hyderabad", name: "HYDERABAD", code: "HYD", x: 355, y: 540, labelPos: "right", isMajor: true, hasPulseIcon: true },
  { id: "bengaluru", name: "BENGALURU", code: "BLR", x: 260, y: 680, labelPos: "left", isMajor: true, hasPulseIcon: true },
  { id: "chennai", name: "CHENNAI", code: "MAA", x: 430, y: 660, labelPos: "right", isMajor: true, hasPulseIcon: true },
  { id: "kolkata", name: "KOLKATA", code: "CCU", x: 695, y: 375, labelPos: "right", isMajor: true, hasPulseIcon: true },

  // Active Vehicle Reference Nodes (Kota & Jaipur corridor)
  { id: "jaipur", name: "JAIPUR", code: "JAI", x: 300, y: 220, labelPos: "right", isMajor: false },
  { id: "kota", name: "KOTA", code: "KOT", x: 275, y: 270, labelPos: "left", isMajor: false },

  // Northern Hub Extensions (Punjab, Haryana, J&K)
  { id: "chd", name: "CHANDIGARH", code: "IXC", x: 285, y: 105, labelPos: "top", isMajor: false, hasPulseIcon: true },
  { id: "jammu", name: "JAMMU", code: "IXJ", x: 220, y: 65, labelPos: "left", isMajor: false, hasPulseIcon: true },
  { id: "srinagar", name: "SRINAGAR", code: "SXR", x: 215, y: 35, labelPos: "top", isMajor: false },

  // West & Central intermediate feeder nodes
  { id: "jodhpur", name: "JODHPUR", code: "JDH", x: 165, y: 245, labelPos: "left", isMajor: false, hasPulseIcon: true },
  { id: "udaipur", name: "UDAIPUR", code: "UDR", x: 255, y: 295, labelPos: "left", isMajor: false, hasPulseIcon: true },
  { id: "surat", name: "SURAT", code: "STV", x: 150, y: 425, labelPos: "left", isMajor: false, hasPulseIcon: true },
  { id: "nagpur", name: "NAGPUR", code: "NAG", x: 380, y: 410, labelPos: "right", isMajor: false, hasPulseIcon: true },
  { id: "agra", name: "AGRA", code: "AGR", x: 340, y: 210, labelPos: "right", isMajor: false },
  { id: "kanpur", name: "KANPUR", code: "KNP", x: 440, y: 245, labelPos: "top", isMajor: false },

  // East & North-East feeder nodes
  { id: "patna", name: "PATNA", code: "PAT", x: 575, y: 270, labelPos: "top", isMajor: false },
  { id: "ranchi", name: "RANCHI", code: "IXR", x: 615, y: 355, labelPos: "bottom", isMajor: false },
  { id: "siliguri", name: "SILIGURI", code: "IXB", x: 700, y: 245, labelPos: "top", isMajor: false },
  { id: "guwahati", name: "GUWAHATI", code: "GAU", x: 815, y: 260, labelPos: "top", isMajor: false, hasPulseIcon: true },
  { id: "shillong", name: "SHILLONG", code: "SHL", x: 815, y: 285, labelPos: "right", isMajor: false, hasPulseIcon: true },
  { id: "imphal", name: "IMPHAL", code: "IMF", x: 890, y: 305, labelPos: "right", isMajor: false },
  { id: "agartala", name: "AGARTALA", code: "IXA", x: 795, y: 340, labelPos: "bottom", isMajor: false },

  // South feeder nodes
  { id: "hubli", name: "HUBLI", code: "HBX", x: 215, y: 605, labelPos: "left", isMajor: false, hasPulseIcon: true },
  { id: "kochi", name: "KOCHI", code: "COK", x: 280, y: 765, labelPos: "bottom", isMajor: false, hasPulseIcon: true },
  { id: "coimbatore", name: "COIMBATORE", code: "CJB", x: 320, y: 720, labelPos: "right", isMajor: false },
  { id: "vijayawada", name: "VIJAYAWADA", code: "VGA", x: 445, y: 555, labelPos: "right", isMajor: false },
  { id: "vizag", name: "VIZAG", code: "VTZ", x: 540, y: 505, labelPos: "right", isMajor: false }
];

const INDIA_ARCS: IndiaArc[] = [
  // Primary Highway Corridors
  // Active Featured Corridor: Kota <-> Jaipur
  { id: "arc-active", from: "kota", to: "jaipur", d: "M275,270 L300,220", isMainCorridor: true },

  // Northern Network
  { id: "arc-del-jai", from: "delhi", to: "jaipur", d: "M295,155 L300,220" },
  { id: "arc-del-chd", from: "delhi", to: "chd", d: "M295,155 L285,105" },
  { id: "arc-chd-jam", from: "chd", to: "jammu", d: "M285,105 L220,65" },
  { id: "arc-jam-sri", from: "jammu", to: "srinagar", d: "M220,65 L215,35" },
  { id: "arc-del-agr", from: "delhi", to: "agra", d: "M295,155 L340,210" },
  { id: "arc-agr-knp", from: "agra", to: "kanpur", d: "M340,210 L440,245" },

  // Western Network (Delhi -> Rajasthan -> Gujarat -> Mumbai)
  { id: "arc-jai-jdh", from: "jaipur", to: "jodhpur", d: "M300,220 L165,245" },
  { id: "arc-jdh-amd", from: "jodhpur", to: "ahmedabad", d: "M165,245 L140,350" },
  { id: "arc-kot-udr", from: "kota", to: "udaipur", d: "M275,270 L255,295" },
  { id: "arc-udr-amd", from: "udaipur", to: "ahmedabad", d: "M255,295 L140,350" },
  { id: "arc-amd-stv", from: "ahmedabad", to: "surat", d: "M140,350 L150,425" },
  { id: "arc-stv-bom", from: "surat", to: "mumbai", d: "M150,425 L155,485" },
  { id: "arc-amd-bom", from: "ahmedabad", to: "mumbai", d: "M140,350 Q135,420 155,485" },

  // Central Corridor
  { id: "arc-bom-pnq", from: "mumbai", to: "pune", d: "M155,485 L200,525" },
  { id: "arc-bom-nag", from: "mumbai", to: "nagpur", d: "M155,485 Q260,450 380,410" },
  { id: "arc-del-nag", from: "delhi", to: "nagpur", d: "M295,155 Q350,280 380,410" },
  { id: "arc-nag-hyd", from: "nagpur", to: "hyderabad", d: "M380,410 L355,540" },
  { id: "arc-pnq-hyd", from: "pune", to: "hyderabad", d: "M200,525 L355,540" },

  // Southern Corridors
  { id: "arc-pnq-hbx", from: "pune", to: "hubli", d: "M200,525 L215,605" },
  { id: "arc-hbx-blr", from: "hubli", to: "bengaluru", d: "M215,605 L260,680" },
  { id: "arc-hyd-blr", from: "hyderabad", to: "bengaluru", d: "M355,540 L260,680" },
  { id: "arc-blr-maa", from: "bengaluru", to: "chennai", d: "M260,680 L430,660" },
  { id: "arc-hyd-vga", from: "hyderabad", to: "vijayawada", d: "M355,540 L445,555" },
  { id: "arc-vga-maa", from: "vijayawada", to: "chennai", d: "M445,555 L430,660" },
  { id: "arc-blr-cjb", from: "bengaluru", to: "coimbatore", d: "M260,680 L320,720" },
  { id: "arc-cjb-cok", from: "coimbatore", to: "kochi", d: "M320,720 L280,765" },
  { id: "arc-blr-cok", from: "bengaluru", to: "kochi", d: "M260,680 Q250,720 280,765" },

  // Eastern Corridors
  { id: "arc-knp-pat", from: "kanpur", to: "patna", d: "M440,245 L575,270" },
  { id: "arc-pat-ccu", from: "patna", to: "kolkata", d: "M575,270 L695,375" },
  { id: "arc-nag-rnc", from: "nagpur", to: "ranchi", d: "M380,410 L615,355" },
  { id: "arc-rnc-ccu", from: "ranchi", to: "kolkata", d: "M615,355 L695,375" },
  { id: "arc-vga-vtz", from: "vijayawada", to: "vizag", d: "M445,555 L540,505" },
  { id: "arc-vtz-ccu", from: "vizag", to: "kolkata", d: "M540,505 Q620,440 695,375" },

  // North-East Corridors (from Kolkata)
  { id: "arc-ccu-slg", from: "kolkata", to: "siliguri", d: "M695,375 L700,245" },
  { id: "arc-slg-gau", from: "siliguri", to: "guwahati", d: "M700,245 L815,260" },
  { id: "arc-gau-shl", from: "guwahati", to: "shillong", d: "M815,260 L815,285" },
  { id: "arc-shl-imf", from: "shillong", to: "imphal", d: "M815,285 L890,305" },
  { id: "arc-shl-agt", from: "shillong", to: "agartala", d: "M815,285 L795,340" }
];

// Presets for the interactive in-transit vehicle card
const VEHICLE_PRESETS: Record<string, VehicleTelemetry> = {
  default: {
    unit: "TN 38 BZ 3669",
    status: "ON TIME",
    ref: "FF-1045",
    transporter: "Carrier F · FTL",
    load: "Pharma (2-8°C) · 19T",
    rate: "₹32.1/km",
    corridor: "Kota → Jaipur",
    progress: 53
  },
  delhi: {
    unit: "DL 1M 4492",
    status: "ON TIME",
    ref: "FF-1082",
    transporter: "ColdEx Express · Reefer",
    load: "Fresh Produce · 16T",
    rate: "₹36.0/km",
    corridor: "Delhi NCR → Jaipur",
    progress: 42
  },
  mumbai: {
    unit: "MH 04 AB 9120",
    status: "ON TIME",
    ref: "FF-1064",
    transporter: "Mahindra Logistics · FCL",
    load: "Auto Parts · 21T",
    rate: "₹29.5/km",
    corridor: "Mumbai → Pune",
    progress: 78
  },
  ahmedabad: {
    unit: "GJ 01 CX 8812",
    status: "ON TIME",
    ref: "FF-1077",
    transporter: "Gujarat Roadways · Tanker",
    load: "Chemical Intermediates · 24T",
    rate: "₹34.8/km",
    corridor: "Ahmedabad → Surat",
    progress: 61
  },
  pune: {
    unit: "MH 12 QX 4501",
    status: "ON TIME",
    ref: "FF-1051",
    transporter: "VRL Logistics · FTL",
    load: "Industrial Machinery · 18T",
    rate: "₹31.4/km",
    corridor: "Pune → Hyderabad",
    progress: 35
  },
  bengaluru: {
    unit: "KA 03 AA 2284",
    status: "ON TIME",
    ref: "FF-1090",
    transporter: "Delhivery Freight · GPS",
    load: "Electronics / IT · 12T",
    rate: "₹42.0/km",
    corridor: "Bengaluru → Chennai",
    progress: 84
  },
  chennai: {
    unit: "TN 09 BX 1104",
    status: "ON TIME",
    ref: "FF-1033",
    transporter: "TVS Supply Chain · Flatbed",
    load: "EV Battery Modules · 17T",
    rate: "₹38.5/km",
    corridor: "Chennai → Vijayawada",
    progress: 29
  },
  hyderabad: {
    unit: "TS 07 UA 3902",
    status: "ON TIME",
    ref: "FF-1049",
    transporter: "Gati-KWE · Pharma Line",
    load: "Active Pharma (API) · 14T",
    rate: "₹35.2/km",
    corridor: "Hyderabad → Mumbai",
    progress: 68
  },
  kolkata: {
    unit: "WB 02 E 5519",
    status: "ON TIME",
    ref: "FF-1018",
    transporter: "Eastern Carriers · Heavy",
    load: "Jute & Agro Feeds · 22T",
    rate: "₹28.0/km",
    corridor: "Kolkata → Patna",
    progress: 49
  }
};

export function IndiaDomesticNetworkMap() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("default");

  // Dynamic live event stream matching exact screenshot values
  const [events, setEvents] = useState<ActivityEvent[]>([
    {
      id: "ev-1049",
      dot: "blue",
      ref: "FF-1049",
      time: "23:12:49",
      action: "Gate-in recorded",
      corridor: "STV → BOM"
    },
    {
      id: "ev-1017",
      dot: "green",
      ref: "FF-1017",
      time: "23:12:47",
      action: "Delivered · ePOD captured",
      corridor: "Delhi NCR"
    },
    {
      id: "ev-1042",
      dot: "orange",
      ref: "FF-1042",
      time: "23:12:46",
      action: "In-transit check call",
      corridor: "DEL → AGR"
    }
  ]);

  // Periodic simulated live events feeder
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", { hour12: false });
      const seed = Math.floor(1000 + Math.random() * 900);
      const randomCorridors = [
        "STV → BOM",
        "DEL → AGR",
        "KOT → JAI",
        "BOM → PNQ",
        "BLR → MAA",
        "AMD → STV",
        "HYD → BLR",
        "CCU → PAT"
      ];
      const randomActions = [
        { action: "Gate-in recorded", dot: "blue" as const },
        { action: "Delivered · ePOD captured", dot: "green" as const },
        { action: "In-transit check call", dot: "orange" as const },
        { action: "Electronic toll cross", dot: "blue" as const },
        { action: "Weight check verified", dot: "green" as const }
      ];

      const act = randomActions[Math.floor(Math.random() * randomActions.length)];
      const cor = randomCorridors[Math.floor(Math.random() * randomCorridors.length)];

      const newEv: ActivityEvent = {
        id: `ev-dyn-${Date.now()}-${seed}`,
        dot: act.dot,
        ref: `FF-${seed}`,
        time: timeStr,
        action: act.action,
        corridor: cor
      };

      setEvents((prev) => [newEv, ...prev.slice(0, 2)]);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const activeVehicle = VEHICLE_PRESETS[selectedNodeId] || VEHICLE_PRESETS.default;

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[#071026] border-2 border-[#1B3673]/80 shadow-2xl backdrop-blur-xl overflow-hidden select-none">
      {/* Background Radial Glow Effects Matching Screenshot */}
      <div className="pointer-events-none absolute -top-20 left-[20%] w-[550px] h-[450px] bg-[#18367A]/35 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 left-[15%] w-[450px] h-[400px] bg-[#142B63]/40 blur-[100px] rounded-full" />
      <div className="pointer-events-none absolute top-[30%] right-[20%] w-[400px] h-[350px] bg-[#18367A]/25 blur-[110px] rounded-full" />

      {/* SVG Canvas (1000 x 750) */}
      <div className="relative w-full aspect-[1000/750] min-h-[480px] sm:min-h-[580px]">
        <svg
          viewBox="0 0 1000 750"
          width="100%"
          height="100%"
          className="block absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ECE6DC" strokeOpacity="0.03" strokeWidth="1" />
            </pattern>

            {/* Glowing filter for nodes and arcs */}
            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="pulseGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Blueprint Background Grid */}
          <rect width="1000" height="750" fill="url(#grid)" />

          {/* Coordinate grid lines matching screenshot */}
          {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
            <line key={`gl-x-${x}`} x1={x} y1="0" x2={x} y2="750" stroke="#4A6BB8" strokeOpacity="0.05" />
          ))}
          {[75, 150, 225, 300, 375, 450, 525, 600, 675].map((y) => (
            <line key={`gl-y-${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="#4A6BB8" strokeOpacity="0.05" />
          ))}

          {/* Corridor Arcs */}
          {INDIA_ARCS.map((arc) => {
            const isActive = arc.id === "arc-active" || arc.from === selectedNodeId || arc.to === selectedNodeId;

            return (
              <g key={arc.id}>
                {/* Main line */}
                <path
                  d={arc.d}
                  fill="none"
                  stroke={isActive ? "#3B82F6" : "#2E4E94"}
                  strokeOpacity={isActive ? 0.95 : 0.45}
                  strokeWidth={isActive ? 2.4 : 1.2}
                  className="transition-all duration-300"
                />

                {/* Subtle outer glow when active */}
                {isActive && (
                  <path
                    d={arc.d}
                    fill="none"
                    stroke="#60A5FA"
                    strokeOpacity={0.6}
                    strokeWidth={4.5}
                    filter="url(#glow)"
                  />
                )}

                {/* Moving Packet along active corridor */}
                {isActive && (
                  <circle r="3.2" fill="#60A5FA" filter="url(#glow)">
                    <animateMotion dur="3.5s" repeatCount="indefinite" path={arc.d} />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Secondary Concentric Radar Glow Rings behind major nodes */}
          {INDIA_NODES.filter((n) => n.isMajor).map((node) => (
            <g key={`glow-ring-${node.id}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r="36"
                fill="none"
                stroke="#3B82F6"
                strokeOpacity="0.12"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r="54"
                fill="none"
                stroke="#3B82F6"
                strokeOpacity="0.06"
              />
            </g>
          ))}

          {/* Nodes Rendering */}
          {INDIA_NODES.map((node) => {
            const isSelected = selectedNodeId === node.id || (selectedNodeId === "default" && (node.id === "kota" || node.id === "jaipur"));

            return (
              <g
                key={node.id}
                className="cursor-pointer group"
                onClick={() => setSelectedNodeId(node.id)}
              >
                {/* Outer animated ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.isMajor ? "16" : "12"}
                  fill="none"
                  stroke={isSelected ? "#60A5FA" : "#3B82F6"}
                  strokeOpacity={isSelected ? "0.9" : "0.5"}
                  strokeWidth="1.2"
                  className={cn(node.isMajor && "animate-ping origin-center")}
                  style={{ transformOrigin: `${node.x}px ${node.y}px`, animationDuration: "3s" }}
                />

                {/* Background soft disk */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.isMajor ? "10" : "7"}
                  fill="#0B1A42"
                  stroke={isSelected ? "#60A5FA" : "#3B82F6"}
                  strokeOpacity={0.8}
                  strokeWidth="1.2"
                />

                {/* Glowing Core Dot */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.isMajor ? "4.5" : "3"}
                  fill={isSelected ? "#FFFFFF" : "#60A5FA"}
                  filter={isSelected ? "url(#glow)" : undefined}
                  className="transition-all duration-200 group-hover:scale-125"
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />

                {/* Small center directional indicator (chevron/triangle) for certain nodes like screenshot */}
                {node.hasPulseIcon && (
                  <path
                    d={`M ${node.x - 2.5} ${node.y + 1} L ${node.x} ${node.y - 2.5} L ${node.x + 2.5} ${node.y + 1}`}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.85"
                  />
                )}

                {/* City Label (Only for major nodes and key corridor nodes like Kota/Jaipur) */}
                {node.isMajor && (
                  <text
                    x={
                      node.labelPos === "left"
                        ? node.x - 24
                        : node.labelPos === "right"
                          ? node.x + 24
                          : node.x
                    }
                    y={
                      node.labelPos === "bottom"
                        ? node.y + 24
                        : node.labelPos === "top"
                          ? node.y - 20
                          : node.y + 4
                    }
                    textAnchor={
                      node.labelPos === "left"
                        ? "end"
                        : node.labelPos === "right"
                          ? "start"
                          : "middle"
                    }
                    fill="#ECE6DC"
                    fontSize="11"
                    fontFamily="IBM Plex Mono, monospace"
                    fontWeight="600"
                    letterSpacing="0.06em"
                    className="drop-shadow-[0_2px_4px_rgba(7,16,38,0.9)] pointer-events-none transition-colors group-hover:fill-white"
                  >
                    {node.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Active In-Transit Telemetry HUD Card (Positioned exactly near Kota/Jaipur as in screenshot) */}
        <div className="absolute top-[12%] sm:top-[16%] left-[24%] sm:left-[27%] z-30 pointer-events-auto w-[240px] sm:w-[290px] md:w-[310px] rounded-2xl bg-[#091530]/95 border border-[#2B4B96]/80 shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl p-3.5 sm:p-4 text-[#ECE6DC] transition-all duration-300">
          {/* Card Header: Unit & On-Time Badge */}
          <div className="flex items-center justify-between border-b border-[#ECE6DC]/10 pb-2.5">
            <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wide">
              {activeVehicle.unit}
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#13285A] text-[#60A5FA] border border-[#3B82F6]/40 uppercase tracking-wider shadow-sm">
              {activeVehicle.status}
            </span>
          </div>

          {/* Key-Value Details matching user reference */}
          <div className="py-2.5 space-y-1.5 text-xs">
            <div className="flex justify-between items-center text-[#8E9BBF]">
              <span>Reference</span>
              <span className="font-mono font-semibold text-white">{activeVehicle.ref}</span>
            </div>
            <div className="flex justify-between items-center text-[#8E9BBF]">
              <span>Transporter</span>
              <span className="font-medium text-white truncate max-w-[160px] sm:max-w-[190px]">{activeVehicle.transporter}</span>
            </div>
            <div className="flex justify-between items-center text-[#8E9BBF]">
              <span>Load</span>
              <span className="font-medium text-white truncate max-w-[160px] sm:max-w-[190px]">{activeVehicle.load}</span>
            </div>
            <div className="flex justify-between items-center text-[#8E9BBF]">
              <span>Rate</span>
              <span className="font-mono font-semibold text-[#8FB0FF]">{activeVehicle.rate}</span>
            </div>
          </div>

          {/* Progress Bar & Destination */}
          <div className="pt-2 border-t border-[#ECE6DC]/10 space-y-1.5">
            <div className="w-full bg-[#13285A] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] h-full rounded-full shadow-[0_0_8px_#3B82F6] transition-all duration-500"
                style={{ width: `${activeVehicle.progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center font-mono text-[11px] sm:text-xs">
              <span className="text-[#8E9BBF] truncate max-w-[180px]">{activeVehicle.corridor}</span>
              <span className="text-white font-bold">{activeVehicle.progress}%</span>
            </div>
          </div>
        </div>

        {/* Embedded Bottom-Right "NETWORK ACTIVITY · SIMULATED" Widget (Matching screenshot) */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 pointer-events-auto max-w-[280px] sm:max-w-[360px] md:max-w-[400px] w-full rounded-2xl bg-[#091530]/90 border border-[#203D7E]/70 shadow-[0_12px_36px_rgba(0,0,0,0.65)] backdrop-blur-xl p-3 sm:p-4 text-xs transition-all">
          <div className="flex items-center justify-between pb-2 border-b border-[#ECE6DC]/10 font-mono tracking-wider">
            <span className="text-[10px] sm:text-[11px] text-[#AEB8D6] font-bold">
              NETWORK ACTIVITY
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#60A5FA] font-bold">
              SIMULATED
            </span>
          </div>

          <div className="mt-2 sm:mt-2.5 space-y-1.5 sm:space-y-2">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="p-1.5 sm:p-2 rounded-xl bg-[#ECE6DC]/[0.03] border border-[#ECE6DC]/5 hover:border-[#3B82F6]/30 transition-all flex items-center justify-between gap-2 text-[11px] sm:text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full shrink-0",
                      ev.dot === "blue"
                        ? "bg-[#3B82F6] shadow-[0_0_6px_#3B82F6]"
                        : ev.dot === "green"
                          ? "bg-emerald-400 shadow-[0_0_6px_#34D399]"
                          : "bg-amber-400 shadow-[0_0_6px_#F59E0B]"
                    )}
                  />
                  <span className="font-mono font-bold text-white shrink-0">
                    {ev.ref}
                  </span>
                  <span className="text-[#AEB8D6] truncate">
                    · {ev.action}
                  </span>
                </div>

                <div className="font-mono text-[10px] sm:text-[11px] text-[#8FB0FF] shrink-0 text-right">
                  <span>{ev.corridor}</span>
                  <span className="text-[#ECE6DC]/40 ml-1.5 hidden sm:inline">{ev.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
