"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  Clock,
  FileCheck,
  Gavel,
  ShieldAlert,
  Ship,
  Truck,
  Filter,
  CheckCheck,
  ExternalLink,
  Trash2,
  Search,
} from "lucide-react";

interface NotificationItem {
  id: string;
  category: "bids" | "shipments" | "documents" | "compliance";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl: string;
  actionLabel: string;
  badge: string;
  badgeColor: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    category: "bids",
    title: "New Lowest Bid Submitted: JNPT → Jebel Ali",
    message: "A certified MTO carrier submitted a competing bid of $1,340 (prev. $1,420) for 1x 40' HC Dry (Lot #SC-8921). 14 minutes remaining in live reverse auction.",
    timestamp: "12 mins ago",
    read: false,
    actionUrl: "/dashboard/carrier/my-bids",
    actionLabel: "View Reverse Auction",
    badge: "Reverse Auction",
    badgeColor: "bg-[#FF5A12]/20 text-[#FF5A12] border-[#FF5A12]/30",
  },
  {
    id: "notif-2",
    category: "documents",
    title: "Sample Batch Approved by Rotterdam Buyer",
    message: "Buyer registered approval for 1121 Steam Basmati Rice (24 MT consignment). Document Room digital sign-off verified with non-GMO and tricyclazole residue certificate.",
    timestamp: "45 mins ago",
    read: false,
    actionUrl: "/document-room",
    actionLabel: "Open Document Room",
    badge: "Sample Approval",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  {
    id: "notif-3",
    category: "shipments",
    title: "Container Gate-In Confirmed at Gateway Port",
    message: "Container MSCU-9182741 (Lot #SC-7740) recorded gate-in at JNPT Nhava Sheva BMCT Terminal. Let Export Order (LEO) linked with electronic seal #ES-88219.",
    timestamp: "2 hours ago",
    read: false,
    actionUrl: "/dashboard/manage-shipments",
    actionLabel: "Track Telemetry",
    badge: "Port Gate-In",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  {
    id: "notif-4",
    category: "compliance",
    title: "ICEGATE Let Export Order (LEO) Issued",
    message: "Customs EDI granted LEO clearance for Shipping Bill #8291048. RoDTEPY declaration logged with eligible duty credit scroll #SCR-2026-9912.",
    timestamp: "5 hours ago",
    read: true,
    actionUrl: "/export-guide/icegate-customs-clearance-process",
    actionLabel: "Inspect Customs LEO",
    badge: "ICEGATE Customs",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  {
    id: "notif-5",
    category: "documents",
    title: "Bill of Lading Draft Available for Exporter Verification",
    message: "Carrier issued draft OBL (Ocean Bill of Lading) #MAEU-2026-0918 for consignment to Port of Newark, NJ. Please review consignee details within 6 hours.",
    timestamp: "Yesterday",
    read: true,
    actionUrl: "/document-room",
    actionLabel: "Review Draft BL",
    badge: "Bill of Lading",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  {
    id: "notif-6",
    category: "compliance",
    title: "Annual GST LUT (Form RFD-11) Active for FY 2026-27",
    message: "Your zero-rated export letter of undertaking is registered under GSTIN 27AABCS1429B1Z8. Realization tracking monitored through RBI EDPMS.",
    timestamp: "2 days ago",
    read: true,
    actionUrl: "/export-guide/gst-lut-export-refund-rules",
    actionLabel: "View LUT Guidelines",
    badge: "GST Compliance",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [unreadOnly, setUnreadOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const toggleReadStatus = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: !item.read } : item))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredNotifications = notifications.filter((item) => {
    if (filterCategory !== "all" && item.category !== filterCategory) return false;
    if (unreadOnly && item.read) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECE6DC]/15 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#FF5A12]/15 text-[#FF5A12] border border-[#FF5A12]/30">
                <Bell className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-headline text-white">
                Notifications &amp; Alerts
              </h1>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#FF5A12] text-white">
                  {unreadCount} unread
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#AEB8D6]">
              Real-time telemetry, reverse auction bids, Document Room approvals, and customs alerts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0A1636] border border-[#ECE6DC]/20 hover:border-[#ECE6DC]/40 text-[#ECE6DC] transition-all cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mark all read</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="p-4 rounded-2xl bg-[#0A1636]/80 border border-[#ECE6DC]/15 space-y-3.5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-[#AEB8D6] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search alerts, container IDs, lot numbers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#13285A]/80 border border-[#ECE6DC]/20 text-white placeholder:text-[#AEB8D6]/60 focus:outline-none focus:border-[#FF5A12]"
              />
            </div>

            {/* Unread toggle */}
            <label className="flex items-center gap-2 text-xs font-medium text-[#AEB8D6] cursor-pointer self-start sm:self-auto select-none">
              <input
                type="checkbox"
                checked={unreadOnly}
                onChange={(e) => setUnreadOnly(e.target.checked)}
                className="rounded border-[#ECE6DC]/30 text-[#FF5A12] focus:ring-[#FF5A12] bg-[#13285A]"
              />
              <span>Show unread only</span>
            </label>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
            {[
              { id: "all", label: "All Alerts", count: notifications.length },
              { id: "bids", label: "Bids & Auctions", count: notifications.filter((n) => n.category === "bids").length },
              { id: "shipments", label: "Shipments", count: notifications.filter((n) => n.category === "shipments").length },
              { id: "documents", label: "Document Room", count: notifications.filter((n) => n.category === "documents").length },
              { id: "compliance", label: "Compliance & LEO", count: notifications.filter((n) => n.category === "compliance").length },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  filterCategory === tab.id
                    ? "bg-[#FF5A12] text-white font-bold shadow-sm"
                    : "bg-[#13285A]/60 text-[#AEB8D6] hover:text-white border border-[#ECE6DC]/10"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 rounded-3xl bg-[#0A1636]/60 border border-[#ECE6DC]/10 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#13285A] text-[#AEB8D6] mx-auto flex items-center justify-center">
                <Bell className="w-6 h-6 opacity-40" />
              </div>
              <h3 className="font-bold text-white text-base">No notifications found</h3>
              <p className="text-xs text-[#AEB8D6]">
                {unreadOnly
                  ? "You have caught up with all active alerts!"
                  : "No notifications match your current search or category filter."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  notif.read
                    ? "bg-[#0A1636]/60 border-[#ECE6DC]/10 opacity-80 hover:opacity-100"
                    : "bg-[#0A1636]/95 border-[#ECE6DC]/25 shadow-md relative overflow-hidden"
                }`}
              >
                {!notif.read && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#FF5A12]" />
                )}

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${notif.badgeColor}`}>
                        {notif.badge}
                      </span>
                      <span className="text-[11px] font-mono text-[#AEB8D6] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notif.timestamp}
                      </span>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-[#FF5A12] shrink-0" />
                      )}
                    </div>

                    <h2 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {notif.title}
                    </h2>

                    <p className="text-xs text-[#AEB8D6] leading-relaxed">
                      {notif.message}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#ECE6DC]/10">
                    <Link
                      href={notif.actionUrl}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#FF5A12] hover:bg-[#E04800] text-white shadow-sm transition-all"
                    >
                      <span>{notif.actionLabel}</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => toggleReadStatus(notif.id)}
                        className="p-1.5 rounded-md text-[11px] text-[#AEB8D6] hover:text-white hover:bg-[#13285A] transition-colors"
                        title={notif.read ? "Mark unread" : "Mark read"}
                      >
                        <CheckCircle2 className={`w-3.5 h-3.5 ${notif.read ? "text-emerald-400" : ""}`} />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteNotification(notif.id)}
                        className="p-1.5 rounded-md text-[11px] text-[#AEB8D6] hover:text-red-400 hover:bg-[#13285A] transition-colors"
                        title="Dismiss"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
