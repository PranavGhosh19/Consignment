"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PublicDemandRadar } from "@/components/public-demand-radar";
import { cn } from "@/lib/utils";
import {
  Compass,
  Ship,
  ArrowRight,
  TrendingDown,
  Clock,
  CheckCircle2,
  Activity,
  Layers,
  ChevronRight,
  Radio,
  ExternalLink,
  Navigation,
  Box
} from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  city: string;
  code: string;
  role: "HUB" | "PORT" | "GATEWAY";
  active: number;
  lanes: number;
  ontime: string;
  dwell: string;
  busiest: string;
  bars: number[];
  pos: { left: string; top: string };
  labelPos: "lp-t" | "lp-b" | "lp-l" | "lp-r" | "lp-tl" | "lp-bl" | "lp-tr" | "lp-br";
  isHub?: boolean;
  // Specific live shipment telemetry matching reference
  telemetry: {
    unit: string;
    status: "ON TIME" | "IN TRANSIT" | "SCHEDULED";
    statusColor: string;
    reference: string;
    transporter: string;
    load: string;
    rate: string;
    corridor: string;
    progress: number;
  };
}

const NODES: NodeData[] = [
  {
    id: "del",
    name: "DELHI NCR",
    city: "Delhi NCR",
    code: "DEL",
    role: "HUB",
    active: 122,
    lanes: 4,
    ontime: "95.4%",
    dwell: "57 min",
    busiest: "DEL → RTM",
    bars: [24, 27, 86, 30, 64, 92, 25, 82, 45, 22, 29, 73, 71, 26],
    pos: { left: "71.44%", top: "36.88%" },
    labelPos: "lp-t",
    isHub: true,
    telemetry: {
      unit: "TN 38 BZ 3669",
      status: "ON TIME",
      statusColor: "emerald",
      reference: "FF-1045",
      transporter: "Carrier F · FTL",
      load: "Pharma (2-8°C) · 19T",
      rate: "₹32.1/km",
      corridor: "DEL → Mundra (ICD)",
      progress: 53
    }
  },
  {
    id: "bom",
    name: "MUMBAI",
    city: "Mumbai (JNPT)",
    code: "BOM",
    role: "HUB",
    active: 101,
    lanes: 5,
    ontime: "85.1%",
    dwell: "59 min",
    busiest: "BOM → DXB",
    bars: [25, 90, 33, 46, 98, 98, 92, 25, 91, 92, 68, 24, 46, 23],
    pos: { left: "70.25%", top: "43.98%" },
    labelPos: "lp-bl",
    isHub: true,
    telemetry: {
      unit: "MSKU 928410",
      status: "ON TIME",
      statusColor: "emerald",
      reference: "SC-2041",
      transporter: "Maersk · 40' HC FCL",
      load: "Organic Spices · 24 MT",
      rate: "$1,820 / FEU",
      corridor: "BOM → DXB (Jebel Ali)",
      progress: 68
    }
  },
  {
    id: "mun",
    name: "MUNDRA",
    city: "Mundra Port",
    code: "MUN",
    role: "PORT",
    active: 182,
    lanes: 4,
    ontime: "94.3%",
    dwell: "50 min",
    busiest: "MUN → DXB",
    bars: [71, 36, 87, 33, 91, 57, 89, 41, 31, 92, 91, 99, 42, 65],
    pos: { left: "69.36%", top: "41.21%" },
    labelPos: "lp-tl",
    isHub: true,
    telemetry: {
      unit: "CMAU 410982",
      status: "IN TRANSIT",
      statusColor: "amber",
      reference: "SC-1830",
      transporter: "CMA CGM · 20' Dry",
      load: "Cotton Yarn · 21 MT",
      rate: "$2,140 / TEU",
      corridor: "MUN → RTM (Rotterdam)",
      progress: 44
    }
  },
  {
    id: "maa",
    name: "CHENNAI",
    city: "Chennai Port",
    code: "MAA",
    role: "HUB",
    active: 64,
    lanes: 4,
    ontime: "90.6%",
    dwell: "36 min",
    busiest: "MAA → SIN",
    bars: [90, 25, 97, 44, 81, 86, 72, 58, 77, 92, 76, 64, 56, 49],
    pos: { left: "72.31%", top: "48.47%" },
    labelPos: "lp-br",
    isHub: true,
    telemetry: {
      unit: "HLCU 773192",
      status: "ON TIME",
      statusColor: "emerald",
      reference: "SC-3012",
      transporter: "Hapag-Lloyd · 40' Reefer",
      load: "Frozen Seafood · 26 MT",
      rate: "$1,950 / FEU",
      corridor: "MAA → SIN (Singapore)",
      progress: 81
    }
  },
  {
    id: "ccu",
    name: "KOLKATA",
    city: "Kolkata Port",
    code: "CCU",
    role: "HUB",
    active: 86,
    lanes: 2,
    ontime: "92.4%",
    dwell: "47 min",
    busiest: "CCU → SIN",
    bars: [28, 91, 56, 85, 81, 61, 75, 54, 95, 27, 33, 83, 71, 39],
    pos: { left: "74.56%", top: "41.37%" },
    labelPos: "lp-tr",
    isHub: true,
    telemetry: {
      unit: "OOCL 552190",
      status: "ON TIME",
      statusColor: "emerald",
      reference: "SC-1194",
      transporter: "Ocean Network · 20' Dry",
      load: "Engineering Goods · 18 MT",
      rate: "$1,420 / TEU",
      corridor: "CCU → SHA (Shanghai)",
      progress: 37
    }
  },
  {
    id: "dxb",
    name: "DUBAI",
    city: "Dubai (Jebel Ali)",
    code: "DXB",
    role: "GATEWAY",
    active: 55,
    lanes: 3,
    ontime: "85.8%",
    dwell: "63 min",
    busiest: "DEL → DXB",
    bars: [71, 23, 27, 89, 91, 58, 61, 62, 94, 81, 92, 76, 26, 29],
    pos: { left: "65.36%", top: "39.44%" },
    labelPos: "lp-l",
    telemetry: {
      unit: "DXB-JA-4421",
      status: "ON TIME",
      statusColor: "emerald",
      reference: "FF-1090",
      transporter: "DP World Drayage",
      load: "Basmati Rice · 22 MT",
      rate: "$95 / drayage",
      corridor: "Jebel Ali Gate-in",
      progress: 92
    }
  },
  {
    id: "jed",
    name: "JEDDAH",
    city: "Jeddah Islamic Port",
    code: "JED",
    role: "GATEWAY",
    active: 46,
    lanes: 1,
    ontime: "89.7%",
    dwell: "36 min",
    busiest: "BOM → JED",
    bars: [25, 57, 100, 91, 75, 54, 67, 62, 20, 77, 63, 39, 96, 32],
    pos: { left: "60.89%", top: "42.18%" },
    labelPos: "lp-l",
    telemetry: {
      unit: "JED-RED-1120",
      status: "IN TRANSIT",
      statusColor: "amber",
      reference: "SC-4402",
      transporter: "Red Sea Logistics",
      load: "Auto Components · 15T",
      rate: "$1,620 / FEU",
      corridor: "BOM → JED Corridors",
      progress: 58
    }
  },
  {
    id: "mba",
    name: "MOMBASA",
    city: "Mombasa Port",
    code: "MBA",
    role: "GATEWAY",
    active: 75,
    lanes: 1,
    ontime: "84.7%",
    dwell: "50 min",
    busiest: "BOM → MBA",
    bars: [34, 49, 68, 68, 81, 28, 39, 75, 69, 88, 53, 35, 73, 88],
    pos: { left: "61.03%", top: "61.24%" },
    labelPos: "lp-l",
    telemetry: {
      unit: "MBA-KPA-8891",
      status: "ON TIME",
      statusColor: "emerald",
      reference: "SC-5120",
      transporter: "East Africa Shipping",
      load: "Refined Sugar · 25 MT",
      rate: "$2,200 / TEU",
      corridor: "BOM → MBA Corridors",
      progress: 74
    }
  },
  {
    id: "dur",
    name: "DURBAN",
    city: "Durban Port",
    code: "DUR",
    role: "GATEWAY",
    active: 47,
    lanes: 1,
    ontime: "92.5%",
    dwell: "54 min",
    busiest: "BOM → DUR",
    bars: [66, 47, 37, 28, 40, 37, 47, 47, 19, 80, 93, 41, 51, 54],
    pos: { left: "58.61%", top: "80.56%" },
    labelPos: "lp-l",
    telemetry: {
      unit: "DUR-TPT-3390",
      status: "ON TIME",
      statusColor: "emerald",
      reference: "SC-5521",
      transporter: "Safmarine Express",
      load: "Ceramic Tiles · 28 MT",
      rate: "$1,890 / FEU",
      corridor: "BOM → DUR Corridors",
      progress: 65
    }
  },
  {
    id: "lag",
    name: "LAGOS",
    city: "Lagos Port (Apapa)",
    code: "LOS",
    role: "GATEWAY",
    active: 12,
    lanes: 1,
    ontime: "85.7%",
    dwell: "66 min",
    busiest: "MUN → LOS",
    bars: [65, 96, 90, 58, 34, 83, 97, 24, 76, 89, 68, 68, 69, 68],
    pos: { left: "50.94%", top: "53.39%" },
    labelPos: "lp-l",
    telemetry: {
      unit: "LOS-AP-2041",
      status: "IN TRANSIT",
      statusColor: "amber",
      reference: "SC-6612",
      transporter: "West Coast Drayage",
      load: "Textiles & Garments · 14T",
      rate: "$2,450 / TEU",
      corridor: "MUN → LOS Corridors",
      progress: 49
    }
  },
  {
    id: "rtm",
    name: "ROTTERDAM",
    city: "Rotterdam Port",
    code: "RTM",
    role: "GATEWAY",
    active: 25,
    lanes: 2,
    ontime: "89.8%",
    dwell: "57 min",
    busiest: "DEL → RTM",
    bars: [25, 42, 26, 44, 74, 38, 32, 61, 94, 24, 31, 18, 90, 37],
    pos: { left: "51.25%", top: "19.49%" },
    labelPos: "lp-t",
    telemetry: {
      unit: "RTM-ECT-9941",
      status: "ON TIME",
      statusColor: "emerald",
      reference: "FF-2099",
      transporter: "EuroGateway Drayage",
      load: "Solar Modules · 20 MT",
      rate: "€1,780 / FEU",
      corridor: "DEL → RTM Corridors",
      progress: 88
    }
  },
  {
    id: "nyc",
    name: "NEW YORK",
    city: "New York / Newark",
    code: "NYC",
    role: "GATEWAY",
    active: 80,
    lanes: 1,
    ontime: "85.2%",
    dwell: "55 min",
    busiest: "BOM → NYC",
    bars: [96, 21, 27, 44, 96, 66, 37, 99, 50, 62, 95, 64, 78, 33],
    pos: { left: "29.44%", top: "27.85%" },
    labelPos: "lp-l",
    telemetry: {
      unit: "NY-PN-5582",
      status: "ON TIME",
      statusColor: "emerald",
      reference: "SC-7710",
      transporter: "Atlantic Intermodal",
      load: "Generic API Medicines · 12T",
      rate: "$3,100 / FEU",
      corridor: "BOM → NYC Corridors",
      progress: 76
    }
  },
  {
    id: "lax",
    name: "LOS ANGELES",
    city: "Los Angeles",
    code: "LAX",
    role: "GATEWAY",
    active: 26,
    lanes: 1,
    ontime: "94.2%",
    dwell: "61 min",
    busiest: "DEL → LAX",
    bars: [79, 79, 57, 28, 36, 31, 61, 51, 79, 38, 84, 20, 44, 85],
    pos: { left: "17.17%", top: "32.85%" },
    labelPos: "lp-l",
    telemetry: {
      unit: "LAX-POLA-3310",
      status: "ON TIME",
      statusColor: "emerald",
      reference: "SC-8812",
      transporter: "Pacific Drayage",
      load: "Handicrafts & Rugs · 16T",
      rate: "$3,450 / FEU",
      corridor: "DEL → LAX Corridors",
      progress: 62
    }
  },
  {
    id: "gru",
    name: "SANTOS",
    city: "Santos Port (São Paulo)",
    code: "SSZ",
    role: "GATEWAY",
    active: 58,
    lanes: 1,
    ontime: "85.8%",
    dwell: "66 min",
    busiest: "MUN → SSZ",
    bars: [21, 85, 56, 100, 29, 51, 84, 64, 39, 63, 46, 86, 87, 82],
    pos: { left: "37.14%", top: "76.10%" },
    labelPos: "lp-l",
    telemetry: {
      unit: "SSZ-BTP-1102",
      status: "IN TRANSIT",
      statusColor: "amber",
      reference: "SC-9901",
      transporter: "Santos Brasil Terminal",
      load: "Agrochemicals · 23 MT",
      rate: "$2,850 / TEU",
      corridor: "MUN → SSZ Corridors",
      progress: 51
    }
  },
  {
    id: "sin",
    name: "SINGAPORE",
    city: "PSA Singapore",
    code: "SIN",
    role: "GATEWAY",
    active: 54,
    lanes: 2,
    ontime: "91.6%",
    dwell: "44 min",
    busiest: "MAA → SIN",
    bars: [48, 69, 47, 43, 84, 81, 63, 21, 21, 53, 78, 51, 42, 95],
    pos: { left: "78.83%", top: "57.23%" },
    labelPos: "lp-r",
    telemetry: {
      unit: "PSA-TUAS-7811",
      status: "ON TIME",
      statusColor: "emerald",
      reference: "FF-3301",
      transporter: "PSA Coastal Connect",
      load: "Electronic Components · 11T",
      rate: "$850 / TEU",
      corridor: "MAA → SIN Corridors",
      progress: 95
    }
  },
  {
    id: "sha",
    name: "SHANGHAI",
    city: "Shanghai (Yangshan)",
    code: "SHA",
    role: "GATEWAY",
    active: 56,
    lanes: 2,
    ontime: "89.4%",
    dwell: "54 min",
    busiest: "DEL → SHA",
    bars: [64, 28, 46, 31, 47, 78, 43, 61, 44, 79, 97, 96, 18, 79],
    pos: { left: "83.75%", top: "34.95%" },
    labelPos: "lp-r",
    telemetry: {
      unit: "SHA-SIPG-9022",
      status: "ON TIME",
      statusColor: "emerald",
      reference: "SC-4112",
      transporter: "SIPG Intermodal",
      load: "Iron Ore Pellets · 30 MT",
      rate: "$1,120 / TEU",
      corridor: "DEL → SHA Corridors",
      progress: 84
    }
  },
  {
    id: "tyo",
    name: "TOKYO",
    city: "Tokyo / Yokohama",
    code: "TYO",
    role: "GATEWAY",
    active: 95,
    lanes: 1,
    ontime: "88.1%",
    dwell: "37 min",
    busiest: "MAA → TYO",
    bars: [33, 67, 43, 79, 40, 73, 99, 60, 29, 68, 77, 69, 28, 38],
    pos: { left: "88.81%", top: "31.59%" },
    labelPos: "lp-r",
    telemetry: {
      unit: "TYO-OI-6641",
      status: "ON TIME",
      statusColor: "emerald",
      reference: "SC-4550",
      transporter: "K-Line Logistics",
      load: "Automotive Precision Parts · 17T",
      rate: "$2,250 / FEU",
      corridor: "MAA → TYO Corridors",
      progress: 71
    }
  },
  {
    id: "syd",
    name: "SYDNEY",
    city: "Sydney (Port Botany)",
    code: "SYD",
    role: "GATEWAY",
    active: 33,
    lanes: 1,
    ontime: "95.9%",
    dwell: "33 min",
    busiest: "MAA → SYD",
    bars: [37, 93, 77, 36, 96, 94, 78, 62, 37, 88, 88, 34, 20, 19],
    pos: { left: "92.00%", top: "83.55%" },
    labelPos: "lp-l",
    telemetry: {
      unit: "SYD-PB-1299",
      status: "ON TIME",
      statusColor: "emerald",
      reference: "FF-4402",
      transporter: "Patrick Stevedores",
      load: "Textile Home Furnishings · 18 MT",
      rate: "$2,380 / FEU",
      corridor: "MAA → SYD Corridors",
      progress: 89
    }
  },
  {
    id: "cmb",
    name: "COLOMBO",
    city: "Colombo Port",
    code: "CMB",
    role: "GATEWAY",
    active: 95,
    lanes: 1,
    ontime: "85.2%",
    dwell: "40 min",
    busiest: "MAA → CMB",
    bars: [73, 42, 45, 21, 50, 45, 55, 82, 48, 93, 59, 51, 87, 71],
    pos: { left: "72.19%", top: "53.09%" },
    labelPos: "lp-b",
    telemetry: {
      unit: "CMB-SAGT-7712",
      status: "ON TIME",
      statusColor: "emerald",
      reference: "FF-1008",
      transporter: "Lanka Feeder Express",
      load: "Transshipment Feed · 20 TEU",
      rate: "$480 / TEU",
      corridor: "MAA → CMB Feeder",
      progress: 96
    }
  }
];

const ARCS = [
  { id: "arc0", from: "del", to: "rtm", d: "M714.4,137.2 Q613.5,41.2 512.5,72.5", dur: "4s", begin: "0.0s" },
  { id: "arc1", from: "del", to: "dxb", d: "M714.4,137.2 Q684.0,123.5 653.6,146.7", dur: "5s", begin: "0.7s" },
  { id: "arc2", from: "del", to: "sha", d: "M714.4,137.2 Q776.0,96.6 837.5,130.0", dur: "6s", begin: "1.4s" },
  { id: "arc3", from: "del", to: "lax", d: "M714.4,137.2 Q443.0,6.0 171.7,122.2", dur: "7s", begin: "2.1s" },
  { id: "arc4", from: "bom", to: "dxb", d: "M702.5,163.6 Q678.0,139.6 653.6,146.7", dur: "8s", begin: "2.8s" },
  { id: "arc5", from: "bom", to: "jed", d: "M702.5,163.6 Q655.7,132.1 608.9,156.9", dur: "4s", begin: "3.5s" },
  { id: "arc6", from: "bom", to: "mba", d: "M702.5,163.6 Q656.4,162.0 610.3,227.8", dur: "5s", begin: "4.2s" },
  { id: "arc7", from: "bom", to: "dur", d: "M702.5,163.6 Q644.3,177.9 586.1,299.7", dur: "6s", begin: "4.9s" },
  { id: "arc8", from: "bom", to: "nyc", d: "M702.5,163.6 Q498.4,9.9 294.4,103.6", dur: "7s", begin: "5.6s" },
  { id: "arc9", from: "mun", to: "dxb", d: "M693.6,153.3 Q673.6,137.8 653.6,146.7", dur: "8s", begin: "0.3s" },
  { id: "arc10", from: "mun", to: "rtm", d: "M693.6,153.3 Q603.0,53.4 512.5,72.5", dur: "4s", begin: "1.0s" },
  { id: "arc11", from: "mun", to: "lag", d: "M693.6,153.3 Q601.5,119.0 509.4,198.6", dur: "5s", begin: "1.7s" },
  { id: "arc12", from: "mun", to: "gru", d: "M693.6,153.3 Q532.5,114.0 371.4,283.1", dur: "6s", begin: "2.4s" },
  { id: "arc13", from: "maa", to: "sin", d: "M723.1,180.3 Q755.7,174.7 788.3,212.9", dur: "7s", begin: "3.1s" },
  { id: "arc14", from: "maa", to: "cmb", d: "M723.1,180.3 Q722.5,183.7 721.9,197.5", dur: "8s", begin: "3.8s" },
  { id: "arc15", from: "maa", to: "syd", d: "M723.1,180.3 Q821.5,174.7 920.0,310.8", dur: "4s", begin: "4.5s" },
  { id: "arc16", from: "maa", to: "tyo", d: "M723.1,180.3 Q805.6,95.9 888.1,117.5", dur: "5s", begin: "5.2s" },
  { id: "arc17", from: "ccu", to: "sin", d: "M745.6,153.9 Q767.0,161.6 788.3,212.9", dur: "6s", begin: "5.9s" },
  { id: "arc18", from: "ccu", to: "sha", d: "M745.6,153.9 Q791.5,113.5 837.5,130.0", dur: "7s", begin: "0.6s" }
];

// Telemetry templates matching the user's reference mockup
const TELEMETRY_TEMPLATES = [
  { dot: "blue", action: "Gate-in recorded", sub: "e-Way Bill verified at port gate" },
  { dot: "green", action: "Delivered · ePOD captured", sub: "Document Room closed & signed off" },
  { dot: "orange", action: "In-transit check call", sub: "Telemetry ping: Speed & GPS on corridor" },
  { dot: "orange", action: "New bid placed", sub: "Carrier placed competitive quote" },
  { dot: "green", action: "Sample approved", sub: "Buyer issued lab approval certificate" },
  { dot: "blue", action: "Bill of Lading signed", sub: "Smart contract verified in Document Room" }
];

interface ActivityRow {
  id: string;
  dot: "blue" | "green" | "orange";
  ref: string;
  time: string;
  action: string;
  corridor: string;
  detail: string;
}

export default function FindDemandPage() {
  const [sel, setSel] = useState<string>("bom");
  const [pinUntil, setPinUntil] = useState<number>(0);
  const nRef = useRef(1050);

  const mkRow = (): ActivityRow => {
    const arc = ARCS[Math.floor(Math.random() * ARCS.length)];
    const tpl = TELEMETRY_TEMPLATES[Math.floor(Math.random() * TELEMETRY_TEMPLATES.length)];
    const fromCode = NODES.find((x) => x.id === arc.from)?.code || arc.from.toUpperCase();
    const toCode = NODES.find((x) => x.id === arc.to)?.code || arc.to.toUpperCase();
    nRef.current += 1;
    const time = new Date().toLocaleTimeString("en-GB");

    return {
      id: `ev-${Date.now()}-${nRef.current}`,
      dot: tpl.dot as "blue" | "green" | "orange",
      ref: `FF-${nRef.current}`,
      time,
      action: tpl.action,
      corridor: `${fromCode} → ${toCode}`,
      detail: tpl.sub
    };
  };

  const [rows, setRows] = useState<ActivityRow[]>([
    {
      id: "ev-init-1049",
      dot: "blue",
      ref: "FF-1049",
      time: "23:12:49",
      action: "Gate-in recorded",
      corridor: "STV → BOM",
      detail: "Container sealed and dock receipts generated"
    },
    {
      id: "ev-init-1017",
      dot: "green",
      ref: "FF-1017",
      time: "23:12:47",
      action: "Delivered · ePOD captured",
      corridor: "Delhi NCR",
      detail: "Final delivery milestone completed"
    },
    {
      id: "ev-init-1042",
      dot: "orange",
      ref: "FF-1042",
      time: "23:12:46",
      action: "In-transit check call",
      corridor: "DEL → AGR",
      detail: "Corridor telemetry verified on NH-48"
    },
    {
      id: "ev-init-1040",
      dot: "green",
      ref: "SC-1040",
      time: "23:12:41",
      action: "Sample approved",
      corridor: "BOM → DXB",
      detail: "Exporter cleared to ship 50 MT Spices"
    }
  ]);

  // Telemetry stream generator (runs every 3.2 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setRows((prev) => [mkRow(), ...prev.slice(0, 3)]);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Hub rotation tour (every 5 seconds unless user pinned a selection)
  useEffect(() => {
    const tour = setInterval(() => {
      if (Date.now() < pinUntil) return;
      setSel((prevSel) => {
        const i = NODES.findIndex((x) => x.id === prevSel);
        return NODES[(i + 1) % NODES.length].id;
      });
    }, 5000);
    return () => clearInterval(tour);
  }, [pinUntil]);

  const activeNode = NODES.find((x) => x.id === sel) || NODES[1];

  const handlePick = (id: string) => {
    setSel(id);
    setPinUntil(Date.now() + 15000);
  };

  return (
    <main className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden bg-gradient-to-b from-[#13285A] via-[#0E1E45] to-[#0A1636] text-[#ECE6DC]">

      {/* Optimized Map Animation Styles & Precise Positioning Offsets */}
      <style jsx>{`
        .fl {
          stroke-dasharray: 2 10;
          animation: fl 2.2s linear infinite;
        }
        @keyframes fl {
          to { stroke-dashoffset: -24; }
        }
        .rg-anim {
          animation: rg 2.8s ease-out infinite;
        }
        @keyframes rg {
          0% { transform: scale(0.35); opacity: 0.95; }
          100% { transform: scale(1.65); opacity: 0; }
        }
        .ev-in {
          animation: evin 0.35s ease-out both;
        }
        @keyframes evin {
          from { opacity: 0; transform: translateY(-5px); }
        }
        
        /* Non-overlapping directional offsets for port code labels */
        .lp-t { left: 50%; bottom: 18px; transform: translateX(-50%); }
        .lp-b { left: 50%; top: 18px; transform: translateX(-50%); }
        .lp-l { right: 18px; top: 50%; transform: translateY(-50%); }
        .lp-r { left: 18px; top: 50%; transform: translateY(-50%); }
        .lp-tl { right: 14px; bottom: 14px; }
        .lp-bl { right: 14px; top: 14px; }
        .lp-tr { left: 14px; bottom: 14px; }
        .lp-br { left: 14px; top: 14px; }
      `}</style>

      {/* Main Container with Balanced Margins */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 space-y-4">

        {/* Top Header: Clean, balanced, prominent */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A12] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5A12]" />
              </span>
              <span>Find Demand · Global Trade Radar</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-headline tracking-tight text-white">
              Every lane out of India, bidding live.
            </h1>

            <p className="text-xs sm:text-sm text-[#C9D2EE] max-w-2xl">
              Tap or hover any terminal to inspect active export trade lanes, live container telemetry, and carrier competition.
            </p>
          </div>

          {/* Quick Hub Quick-Selector Pills & Jump Link */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <div className="flex flex-wrap items-center gap-1 bg-[#0A1636]/80 p-1.5 rounded-2xl border border-[#ECE6DC]/15 backdrop-blur-md">
              <span className="text-[10px] font-mono text-[#ECE6DC]/60 px-2 uppercase font-bold hidden sm:inline">
                Hubs:
              </span>
              {[
                { id: "bom", code: "BOM", name: "Mumbai" },
                { id: "del", code: "DEL", name: "Delhi" },
                { id: "mun", code: "MUN", name: "Mundra" },
                { id: "maa", code: "MAA", name: "Chennai" },
                { id: "ccu", code: "CCU", name: "Kolkata" },
                { id: "dxb", code: "DXB", name: "Dubai" },
                { id: "rtm", code: "RTM", name: "Rotterdam" },
                { id: "nyc", code: "NYC", name: "New York" },
                { id: "sin", code: "SIN", name: "Singapore" }
              ].map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => handlePick(h.id)}
                  className={cn(
                    "px-2.5 py-1 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer",
                    sel === h.id
                      ? "bg-[#FF5A12] text-white shadow-md shadow-[#FF5A12]/40 font-bold scale-105"
                      : "text-[#ECE6DC]/80 hover:bg-[#ECE6DC]/10 hover:text-white"
                  )}
                >
                  {h.code}
                </button>
              ))}
            </div>

            <a
              href="#public-demand"
              className="px-3 py-1.5 rounded-2xl text-xs font-mono font-bold text-[#FF5A12] bg-[#FF5A12]/15 hover:bg-[#FF5A12] hover:text-white border border-[#FF5A12]/30 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Country Demands</span>
              <span className="text-[10px] bg-[#FF5A12] text-white px-1.5 py-0.2 rounded-full">12</span>
              <span>↓</span>
            </a>
          </div>
        </div>

        {/* Interactive World Map Canvas Container */}
        <div id="radar-map-canvas" className="relative w-full rounded-2xl sm:rounded-3xl bg-[#091530]/95 border-2 border-[#1E3E7E]/70 shadow-2xl backdrop-blur-xl overflow-hidden scroll-mt-20">

          {/* Subtle Ambient Radial Lighting */}
          <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-[#1D3670]/40 blur-3xl rounded-full" />

          {/* Aspect Ratio 1000/372 matching design artboard */}
          <div className="relative w-full aspect-[1000/372] max-h-[580px]">
            <svg
              viewBox="0 0 1000 372"
              width="100%"
              className="block absolute inset-0 h-full w-full select-none"
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern id="dots" width="5.6" height="5.6" patternUnits="userSpaceOnUse">
                  <circle cx="2.8" cy="2.8" r="1.05" fill="#4A6BB8" />
                </pattern>

                {/* Landmass Geometry Mask */}
                <mask id="lm">
                  <rect width="1000" height="372" fill="#000" />
                  <path d="M33.3,33.3 L47.2,25.0 L66.7,18.1 L108.3,23.6 L152.8,22.2 L194.4,27.8 L236.1,25.0 L261.1,27.8 L272.2,33.3 L277.8,41.7 L286.1,44.4 L305.6,50.0 L322.2,50.0 L330.6,61.1 L344.4,72.2 L333.3,86.1 L316.7,94.4 L305.6,100.0 L294.4,105.6 L288.9,119.4 L275.0,130.6 L277.8,144.4 L269.4,136.1 L263.9,133.3 L250.0,133.3 L238.9,136.1 L230.6,144.4 L230.6,158.3 L236.1,166.7 L250.0,158.3 L258.3,158.3 L255.6,172.2 L266.7,175.0 L269.4,188.9 L280.6,191.7 L286.1,194.4 L277.8,195.8 L263.9,188.9 L258.3,180.6 L244.4,176.4 L233.3,172.2 L216.7,166.7 L208.3,161.1 L205.6,152.8 L188.9,136.1 L180.6,130.6 L175.0,126.4 L166.7,122.2 L155.6,105.6 L155.6,88.9 L147.2,77.8 L133.3,66.7 L116.7,55.6 L94.4,47.2 L77.8,52.8 L61.1,58.3 L41.7,63.9 L47.2,52.8 L38.9,44.4Z" fill="#fff" />
                  <path d="M297.2,0.0 L333.3,-11.1 L416.7,-13.9 L450.0,-5.6 L444.4,16.7 L433.3,22.2 L388.9,36.1 L377.8,50.0 L361.1,41.7 L350.0,27.8 L333.3,5.6Z" fill="#fff" />
                  <path d="M286.1,194.4 L300.0,183.3 L327.8,186.1 L355.6,202.8 L361.1,216.7 L377.8,222.2 L402.8,230.6 L402.8,241.7 L391.7,255.6 L388.9,272.2 L377.8,280.6 L366.7,288.9 L352.8,311.1 L338.9,322.2 L327.8,325.0 L319.4,333.3 L316.7,347.2 L308.3,358.3 L311.1,369.4 L300.0,363.9 L291.7,347.2 L294.4,322.2 L302.8,300.0 L305.6,266.7 L288.9,255.6 L275.0,230.6 L277.8,216.7 L283.3,208.3Z" fill="#fff" />
                  <path d="M475.0,113.9 L475.0,95.8 L495.8,95.8 L487.5,81.9 L505.6,75.0 L513.9,69.4 L523.6,66.7 L523.6,56.9 L529.2,56.9 L529.2,65.3 L538.9,66.7 L555.6,65.3 L558.3,58.3 L566.7,52.8 L583.3,50.0 L583.3,33.3 L588.9,25.0 L611.1,30.6 L622.2,27.8 L666.7,25.0 L694.4,13.9 L722.2,13.9 L777.8,2.8 L819.4,11.1 L861.1,19.4 L894.4,16.7 L944.4,22.2 L972.2,22.2 L1000.0,25.0 L1000.0,36.1 L977.8,47.2 L958.3,50.0 L952.8,58.3 L933.3,75.0 L933.3,61.1 L916.7,52.8 L894.4,52.8 L877.8,66.7 L891.7,72.2 L888.9,83.3 L875.0,97.2 L861.1,100.0 L858.3,119.4 L850.0,119.4 L850.0,111.1 L847.2,105.6 L838.9,105.6 L827.8,111.1 L838.9,113.9 L833.3,125.0 L838.9,130.6 L836.1,138.9 L825.0,152.8 L813.9,155.6 L800.0,156.9 L794.4,163.9 L802.8,175.0 L802.8,186.1 L791.7,191.7 L786.1,188.9 L777.8,180.6 L777.8,194.4 L786.1,212.5 L777.8,208.3 L772.2,194.4 L772.2,172.2 L761.1,169.4 L761.1,161.1 L755.6,155.6 L744.4,155.6 L738.9,161.1 L725.0,172.2 L722.2,180.6 L716.7,191.7 L713.9,194.4 L702.8,172.2 L700.0,158.3 L694.4,158.3 L686.1,147.2 L672.2,147.2 L658.3,145.8 L655.6,141.7 L644.4,138.9 L638.9,133.3 L633.3,133.3 L638.9,144.4 L644.4,150.0 L655.6,144.4 L663.9,155.6 L652.8,169.4 L644.4,172.2 L625.0,180.6 L619.4,180.6 L611.1,161.1 L597.2,138.9 L594.4,130.6 L600.0,116.7 L583.3,115.3 L575.0,113.9 L572.2,105.6 L580.6,102.8 L563.9,105.6 L566.7,111.1 L558.3,111.1 L555.6,105.6 L552.8,100.0 L538.9,91.7 L533.3,94.4 L544.4,102.8 L550.0,105.6 L544.4,111.1 L543.1,111.1 L533.3,102.8 L527.8,94.4 L519.4,95.8 L508.3,97.2 L500.0,108.3 L494.4,113.9 L486.1,116.7Z" fill="#fff" />
                  <path d="M513.9,52.8 L513.9,44.4 L538.9,30.6 L555.6,22.2 L577.8,19.4 L586.1,22.2 L577.8,33.3 L569.4,36.1 L558.3,38.9 L550.0,44.4 L547.2,52.8 L536.1,61.1 L530.6,54.2 L522.2,55.6Z" fill="#fff" />
                  <path d="M452.8,158.3 L463.9,138.9 L475.0,130.6 L483.3,116.7 L527.8,113.9 L530.6,125.0 L555.6,130.6 L583.3,130.6 L591.7,133.3 L602.8,155.6 L619.4,183.3 L641.7,183.3 L627.8,208.3 L611.1,227.8 L611.1,258.3 L597.2,283.3 L591.7,291.7 L577.8,308.3 L555.6,313.9 L550.0,305.6 L541.7,291.7 L533.3,263.9 L536.1,238.9 L525.0,219.4 L525.0,205.6 L511.1,200.0 L477.8,204.2 L463.9,194.4 L452.8,177.8Z" fill="#fff" />
                  <path d="M622.2,286.1 L630.6,286.1 L638.9,258.3 L636.1,250.0 L622.2,263.9Z" fill="#fff" />
                  <path d="M763.9,202.8 L772.2,205.6 L794.4,225.0 L788.9,233.3 L777.8,222.2Z" fill="#fff" />
                  <path d="M791.7,233.3 L816.7,237.5 L816.7,240.3 L794.4,237.5Z" fill="#fff" />
                  <path d="M802.8,211.1 L825.0,197.2 L830.6,213.9 L822.2,227.8 L805.6,225.0Z" fill="#fff" />
                  <path d="M863.9,219.4 L891.7,225.0 L916.7,244.4 L894.4,241.7 L883.3,238.9 L869.4,227.8Z" fill="#fff" />
                  <path d="M833.3,166.7 L838.9,166.7 L844.4,183.3 L850.0,197.2 L838.9,197.2 L833.3,177.8Z" fill="#fff" />
                  <path d="M863.9,122.2 L875.0,119.4 L888.9,116.7 L894.4,105.6 L888.9,102.8 L883.3,113.9 L869.4,118.1Z" fill="#fff" />
                  <path d="M888.9,100.0 L902.8,95.8 L894.4,90.3Z" fill="#fff" />
                  <path d="M722.2,190.3 L727.8,197.2 L725.0,200.0 L722.2,200.0Z" fill="#fff" />
                  <path d="M486.1,77.8 L502.8,75.0 L504.2,69.4 L494.4,61.1 L491.7,54.2 L483.3,55.6 L486.1,66.7 L491.7,69.4 L486.1,72.2Z" fill="#fff" />
                  <path d="M472.2,72.2 L483.3,72.2 L483.3,63.9 L477.8,63.9Z" fill="#fff" />
                  <path d="M433.3,38.9 L461.1,38.9 L458.3,33.3 L438.9,33.3Z" fill="#fff" />
                  <path d="M816.7,277.8 L816.7,288.9 L819.4,311.1 L827.8,313.9 L844.4,308.3 L863.9,304.2 L875.0,313.9 L886.1,316.7 L891.7,322.2 L908.3,325.0 L916.7,319.4 L925.0,302.8 L925.0,286.1 L905.6,269.4 L894.4,247.2 L891.7,263.9 L877.8,258.3 L863.9,250.0 L852.8,255.6 L838.9,263.9 L827.8,272.2Z" fill="#fff" />
                  <path d="M977.8,312.5 L994.4,322.2 L986.1,330.6 L980.6,325.0Z" fill="#fff" />
                  <path d="M977.8,330.6 L983.3,331.9 L975.0,341.7 L963.9,344.4Z" fill="#fff" />
                  <path d="M263.9,155.6 L277.8,152.8 L294.4,161.1 L283.3,161.1Z" fill="#fff" />
                  <path d="M236.1,50.0 L241.7,58.3 L263.9,63.9 L277.8,72.2 L280.6,63.9 L286.1,50.0 L269.4,38.9 L250.0,38.9Z" fill="#000" />
                  <path d="M577.8,101.4 L577.8,91.7 L591.7,88.9 L605.6,86.1 L613.9,100.0 L600.0,101.4 L586.1,102.2Z" fill="#000" />
                  <path d="M630.6,91.7 L647.2,87.5 L650.0,102.8 L650.0,113.9 L638.9,113.9 L636.1,105.6 L630.6,97.2Z" fill="#000" />
                </mask>
              </defs>

              {/* Blueprint Reference Grid lines */}
              {[0, 83.3, 166.7, 250, 333.3, 416.7, 500, 583.3, 666.7, 750, 833.3, 916.7, 1000].map((x, i) => (
                <line key={`lx-${i}`} x1={x} y1="0" x2={x} y2="372" stroke="#ECE6DC" strokeOpacity="0.05" />
              ))}
              {[50, 133.3, 216.7, 300].map((y, i) => (
                <line key={`ly-${i}`} x1="0" y1={y} x2="1000" y2={y} stroke="#ECE6DC" strokeOpacity="0.05" />
              ))}

              {/* Masked Dot Matrix Pattern on Continents */}
              <rect width="1000" height="372" fill="#2A4380" fillOpacity="0.22" mask="url(#lm)" />
              <rect width="1000" height="372" fill="url(#dots)" mask="url(#lm)" />

              {/* Dynamic Curved Trade Route Arcs with Travelling Packets */}
              {ARCS.map((arc) => {
                const isActive = arc.from === sel || arc.to === sel;

                return (
                  <g key={arc.id}>
                    {/* Background trade corridor arc */}
                    <path
                      id={arc.id}
                      d={arc.d}
                      fill="none"
                      stroke={isActive ? "#FF5A12" : "#5E7FD8"}
                      strokeOpacity={isActive ? 1 : 0.38}
                      strokeWidth={isActive ? 2.2 : 1.2}
                      className="transition-all duration-300"
                    />

                    {/* Animated dashed stream */}
                    <path
                      d={arc.d}
                      fill="none"
                      stroke={isActive ? "#FF5A12" : "#ECE6DC"}
                      strokeOpacity={isActive ? 0.95 : 0.45}
                      strokeWidth={isActive ? 1.6 : 1}
                      className="fl transition-all duration-300"
                    />

                    {/* Travelling Pulse Packet */}
                    <circle
                      r={isActive ? "3.2" : "2.4"}
                      fill={isActive ? "#FF5A12" : "#38BDF8"}
                      className="transition-all"
                    >
                      <animateMotion dur={arc.dur} begin={arc.begin} repeatCount="indefinite">
                        <mpath href={`#${arc.id}`} />
                      </animateMotion>
                    </circle>
                  </g>
                );
              })}
            </svg>

            {/* Interactive Port Buttons with Non-Colliding Labels & Codes */}
            {NODES.map((node) => {
              const isSelected = node.id === sel;

              return (
                <button
                  key={node.id}
                  type="button"
                  data-id={node.id}
                  aria-label={`${node.name} (${node.role.toLowerCase()}). Show details`}
                  style={{ left: node.pos.left, top: node.pos.top }}
                  onClick={() => handlePick(node.id)}
                  onMouseEnter={() => handlePick(node.id)}
                  onFocus={() => handlePick(node.id)}
                  className="absolute w-[26px] h-[26px] -ml-[13px] -mt-[13px] p-0 border-0 bg-transparent cursor-pointer text-[#ECE6DC] z-10 focus:outline-none group"
                >
                  {/* Pulsing Radar Ring */}
                  <span
                    className={cn(
                      "absolute left-1/2 top-1/2 rounded-full border transition-all duration-300 pointer-events-none",
                      isSelected
                        ? "w-[44px] h-[44px] -ml-[22px] -mt-[22px] border-[#FF5A12] rg-anim opacity-100"
                        : node.isHub
                          ? "w-[40px] h-[40px] -ml-[20px] -mt-[20px] border-[#FF5A12]/60 rg-anim opacity-80"
                          : "w-[30px] h-[30px] -ml-[15px] -mt-[15px] border-white/20 rg-anim opacity-0 group-hover:opacity-60"
                    )}
                  />

                  {/* Core Port Node Indicator */}
                  <span
                    className={cn(
                      "absolute left-1/2 top-1/2 rounded-full transition-all duration-250 pointer-events-none",
                      isSelected
                        ? "w-[12px] h-[12px] -ml-[6px] -mt-[6px] bg-[#FF5A12] shadow-[0_0_0_4px_rgba(255,90,18,0.4),0_0_20px_#FF5A12]"
                        : node.isHub
                          ? "w-[11px] h-[11px] -ml-[5.5px] -mt-[5.5px] bg-[#ECE6DC] shadow-[0_0_14px_rgba(255,255,255,0.85)] group-hover:bg-[#FF5A12]"
                          : "w-[8px] h-[8px] -ml-[4px] -mt-[4px] bg-[#B9C6EE] shadow-[0_0_8px_rgba(150,175,255,0.7)] group-hover:bg-white"
                    )}
                  />

                  {/* Standardized 3-Letter Port Code Badge */}
                  <span
                    className={cn(
                      "absolute whitespace-nowrap font-mono tracking-wider text-[10px] sm:text-[11px] pointer-events-none drop-shadow-[0_2px_4px_rgba(10,22,54,0.95)] transition-all duration-200 hidden min-[540px]:inline-block",
                      node.labelPos,
                      isSelected
                        ? "text-white font-extrabold scale-110 drop-shadow-[0_0_8px_rgba(255,90,18,0.8)]"
                        : node.isHub
                          ? "text-white font-bold tracking-widest"
                          : "text-[#B9C6EE] group-hover:text-white group-hover:font-bold"
                    )}
                  >
                    {node.code}
                  </span>
                </button>
              );
            })}

          </div>

        </div>

        {/* Telemetry & Network Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">

          {/* Left Panel: Active Port Terminal Telemetry (5 cols) */}
          <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#0A1636]/85 border border-[#ECE6DC]/15 backdrop-blur-xl shadow-xl flex flex-col justify-between">
            <div className="space-y-3.5">

              <div className="flex items-center justify-between border-b border-[#ECE6DC]/10 pb-3">
                <div>
                  <h3 className="font-mono text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span>{activeNode.city}</span>
                    <span className="text-[#FF5A12] text-sm">({activeNode.code})</span>
                  </h3>
                  <span className="text-xs text-[#ECE6DC]/60 font-mono">
                    {activeNode.role === "HUB" ? "Primary Origin Hub" : activeNode.role === "PORT" ? "Major Seaport Terminal" : "Destination Gateway"}
                  </span>
                </div>
                <Badge className="bg-[#5E7FD8]/25 text-[#8FB0FF] border border-[#5E7FD8] font-mono text-xs font-bold px-2.5 py-0.5 uppercase tracking-wider">
                  {activeNode.role}
                </Badge>
              </div>

              {/* Key Value Metrics */}
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1 border-b border-[#ECE6DC]/5">
                  <span className="text-[#AEB8D6]">Active Container Loads</span>
                  <b className="font-mono font-bold text-white">{activeNode.active} TEUs</b>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#ECE6DC]/5">
                  <span className="text-[#AEB8D6]">Corridors Served</span>
                  <b className="font-mono font-bold text-white">{activeNode.lanes} Connected Lanes</b>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#ECE6DC]/5">
                  <span className="text-[#AEB8D6]">On-Time Reliability</span>
                  <b className="font-mono font-bold text-emerald-400">{activeNode.ontime}</b>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#AEB8D6]">Average Terminal Dwell</span>
                  <b className="font-mono font-bold text-white">{activeNode.dwell}</b>
                </div>
              </div>

            </div>

            {/* Busiest Corridor & Volume Histogram */}
            <div className="border-t border-[#ECE6DC]/15 mt-4 pt-3 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-[#AEB8D6] block font-mono">Busiest Trade Lane</span>
                <span className="text-xs sm:text-sm font-bold text-[#8FB0FF] flex items-center gap-1.5 mt-0.5">
                  <Ship className="w-3.5 h-3.5 text-[#FF5A12]" />
                  <span>{activeNode.busiest}</span>
                </span>
              </div>

              <div className="flex items-end gap-1 h-7">
                {activeNode.bars.map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-1.5 bg-[#5E7FD8] hover:bg-[#FF5A12] rounded-xs transition-all duration-300"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Simulated Live Network Activity (7 cols) */}
          <div className="lg:col-span-7 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#0A1636]/85 border border-[#ECE6DC]/15 backdrop-blur-xl shadow-xl flex flex-col justify-between">
            <div className="space-y-3">

              <div className="flex items-center justify-between border-b border-[#ECE6DC]/10 pb-3">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#FF5A12] animate-pulse" />
                  <span className="font-mono text-xs font-bold tracking-widest text-[#ECE6DC]/90 uppercase">
                    NETWORK ACTIVITY
                  </span>
                </div>
                <Badge className="bg-[#5E7FD8]/20 text-[#8FB0FF] border border-[#5E7FD8]/40 text-[10px] font-mono font-bold px-2 py-0.5 uppercase">
                  SIMULATED TELEMETRY
                </Badge>
              </div>

              {/* Feed Rows with Real-time Telemetry format */}
              <div className="space-y-2">
                {rows.map((r) => (
                  <div
                    key={r.id}
                    className="ev-in p-2.5 sm:p-3 rounded-xl bg-[#ECE6DC]/[0.03] border border-[#ECE6DC]/10 hover:border-[#FF5A12]/40 transition-all flex items-start gap-3"
                  >
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full mt-1.5 shrink-0",
                        r.dot === "green"
                          ? "bg-emerald-400 shadow-[0_0_6px_#34D399]"
                          : r.dot === "blue"
                            ? "bg-[#5E7FD8] shadow-[0_0_6px_#5E7FD8]"
                            : "bg-[#FF5A12] shadow-[0_0_6px_#FF5A12]"
                      )}
                    />
                    <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="truncate">
                        <span className="font-mono font-bold text-xs text-white mr-2">
                          {r.ref}
                        </span>
                        <span className="text-xs text-[#ECE6DC] font-medium mr-2">
                          · {r.action}
                        </span>
                        <span className="text-[11px] text-[#AEB8D6] hidden md:inline">
                          · {r.detail}
                        </span>
                      </div>

                      <div className="font-mono text-[11px] text-[#AEB8D6] shrink-0">
                        <span className="text-[#8FB0FF] font-semibold">{r.corridor}</span>
                        <span className="text-[#ECE6DC]/50 ml-2">{r.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Quick Action Link Footer */}
            <div className="border-t border-[#ECE6DC]/15 mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[#AEB8D6]">Want to move cargo on these active corridors?</span>
              <div className="flex items-center gap-3">
                <Link
                  href="/carrier"
                  className="font-bold text-[#8FB0FF] hover:text-white transition-colors"
                >
                  Carrier Bidding Console ➔
                </Link>
                <Link
                  href="/exporter"
                  className="px-3 py-1 rounded-xl font-bold text-white bg-[#FF5A12] hover:bg-[#E04800] transition-all shadow-sm"
                >
                  Post Demand / Shipment
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Public Global Demand Radar: Which Country Demands What */}
        <PublicDemandRadar
          onSelectMapNode={handlePick}
          selectedMapNode={sel}
        />

      </div>

    </main>
  );
}
