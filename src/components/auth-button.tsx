
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User as UserIcon, LogOut, Settings, LifeBuoy, Menu, Shield, Users, FileText, Search, ShieldCheck, Bell, CreditCard, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";

const exporterNavLinks = [
  { href: "/dashboard/exporter", label: "Dashboard" },
  { href: "/dashboard/exporter/my-shipments", label: "My Shipments" },
];

const carrierNavLinks = [
    { href: "/dashboard/carrier", label: "Dashboard" },
    { href: "/dashboard/carrier/find-shipments", label: "Find Shipments" },
    { href: "/dashboard/carrier/my-bids", label: "My Bids" },
];

const employeeNavLinks = [
    { href: "/dashboard/employee", label: "Dashboard" },
    { href: "/dashboard/manage-shipments", label: "Manage Shipments" },
    { href: "/dashboard/user-management", label: "User Management" },
    { href: "/dashboard/verification", label: "Verification" },
    { href: "/dashboard/analytics", label: "Analytics" },
    { href: "/dashboard/insurance", label: "Insurance Companies" },
];

export const publicRoleNavLinks = [
  { href: "/for-importers", label: "Importer / Buyer" },
  { href: "/for-exporters", label: "Exporter / Shipper" },
  { href: "/for-carriers", label: "Carrier / Vendor" },
];

export function NavLinks() {
  const { user, userType, loading } = useAuth();
  const pathname = usePathname();

  // If userType is still being determined for an employee, don't render the wrong tabs
  if (loading && userType === 'employee') {
      return null;
  }

  // If user is logged in AND on a dashboard route, show their role-specific dashboard links
  if (user && pathname.startsWith("/dashboard")) {
    const getLinks = () => {
      switch (userType) {
          case 'carrier': return carrierNavLinks;
          case 'employee': return employeeNavLinks;
          case 'exporter':
          default: return exporterNavLinks;
      }
    };
    const links = getLinks();

    return (
      <nav className="hidden sm:flex items-center gap-2 lg:gap-3 text-sm font-medium">
        {links.map((link) => {
          let isActive = false;
          if (link.href.endsWith("/dashboard") || link.href.endsWith("/exporter") || link.href.endsWith("/carrier") || link.href.endsWith("/employee")) {
            isActive = pathname === link.href;
          } else {
            isActive = pathname.startsWith(link.href);
          }
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all",
                isActive
                  ? "bg-[#13285A] text-[#ECE6DC] font-bold shadow-sm"
                  : "text-[#13285A]/80 font-medium hover:text-[#FF5A12] hover:bg-[#13285A]/5"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  // Primary Role Navigation: Importer/Buyer, Exporter/Shipper, Carrier/Vendor
  return (
    <nav className="hidden sm:flex items-center gap-1 sm:gap-1.5 md:gap-2.5">
      {publicRoleNavLinks.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 select-none",
              isActive
                ? "bg-[#13285A] text-[#ECE6DC] shadow-sm ring-1 ring-[#13285A]"
                : "text-[#13285A]/85 hover:text-[#FF5A12] hover:bg-[#13285A]/5"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNavLinks() {
    const { user, userType, loading, signOut: authSignOut } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        try {
          await authSignOut();
          setOpen(false);
          router.push("/");
        } catch (error) {
          console.error("Error signing out: ", error);
        }
    };

    const handleLinkClick = (href: string) => {
        router.push(href);
        setOpen(false);
    }
  
    if (loading) {
      return (
          <div className="flex flex-col gap-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
          </div>
      )
    }

    const getDashboardLinks = () => {
        if (!user) return [];
        switch (userType) {
            case 'carrier': return carrierNavLinks;
            case 'employee': return employeeNavLinks;
            case 'exporter':
            default: return exporterNavLinks;
        }
    }
    const dashboardLinks = getDashboardLinks();
  
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#13285A] hover:bg-[#13285A]/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pt-12 flex flex-col bg-[#ECE6DC] text-[#13285A] border-l border-[#13285A]/15">
                {/* Primary 3 Role Solutions */}
                <div className="flex flex-col gap-1 py-3 text-base font-bold">
                    <span className="text-[11px] uppercase tracking-wider text-[#13285A]/60 px-3 font-mono font-bold mb-1">
                      Platform Roles &amp; Tools
                    </span>
                    <button
                      onClick={() => handleLinkClick('/find-demand')}
                      className={cn(
                        "text-left px-3.5 py-2.5 rounded-xl font-headline font-bold text-base transition-all flex items-center gap-2",
                        pathname === '/find-demand'
                          ? "bg-[#13285A] text-[#ECE6DC] shadow-sm"
                          : "text-[#13285A] hover:bg-[#13285A]/10 hover:text-[#FF5A12]"
                      )}
                    >
                      <Compass className="w-4 h-4 text-[#FF5A12]" />
                      <span>Find Demand (Live Radar)</span>
                    </button>
                    {publicRoleNavLinks.map((role) => {
                      const isActive = pathname === role.href;
                      return (
                        <button
                          key={role.href}
                          onClick={() => handleLinkClick(role.href)}
                          className={cn(
                            "text-left px-3.5 py-2.5 rounded-xl font-headline font-bold text-base transition-all",
                            isActive
                              ? "bg-[#13285A] text-[#ECE6DC] shadow-sm"
                              : "text-[#13285A] hover:bg-[#13285A]/10 hover:text-[#FF5A12]"
                          )}
                        >
                          {role.label}
                        </button>
                      );
                    })}
                </div>

                {/* Logged in Dashboard Links */}
                {user && dashboardLinks.length > 0 && (
                  <div className="flex flex-col gap-1 py-3 text-sm font-semibold border-t border-[#13285A]/15 mt-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#13285A]/60 px-3 font-mono font-bold mb-1">
                      Dashboard Navigation
                    </span>
                    {dashboardLinks.map((link) => {
                        let isActive = false;
                        if (link.href.endsWith("/dashboard") || link.href.endsWith("/exporter") || link.href.endsWith("/carrier") || link.href.endsWith("/employee")) {
                            isActive = pathname === link.href;
                        } else {
                            isActive = pathname.startsWith(link.href);
                        }
                        return (
                          <button
                              key={link.href}
                              onClick={() => handleLinkClick(link.href)}
                              className={cn(
                                  "text-left px-3.5 py-2 rounded-xl transition-all",
                                  isActive ? "bg-[#13285A]/15 text-[#13285A] font-bold" : "text-[#13285A]/80 hover:bg-[#13285A]/10 hover:text-[#FF5A12]"
                              )}
                          >
                              {link.label}
                          </button>
                        );
                    })}
                  </div>
                )}

                {/* Footer Actions */}
                <div className="mt-auto flex flex-col gap-3 pt-4 border-t border-[#13285A]/15">
                    {user ? (
                      <>
                        <button
                            onClick={() => handleLinkClick('/dashboard/transactions')}
                            className="transition-colors hover:text-[#FF5A12] text-left text-[#13285A]/80 font-medium flex items-center px-3 py-1"
                        >
                             <CreditCard className="mr-2 h-4 w-4" /> Transactions
                        </button>
                        <button
                            onClick={() => handleLinkClick('/settings')}
                            className="transition-colors hover:text-[#FF5A12] text-left text-[#13285A]/80 font-medium flex items-center px-3 py-1"
                        >
                             <Settings className="mr-2 h-4 w-4" /> Settings
                        </button>
                        <button
                            onClick={() => handleLinkClick('/support')}
                            className="transition-colors hover:text-[#FF5A12] text-left text-[#13285A]/80 font-medium flex items-center px-3 py-1"
                        >
                             <LifeBuoy className="mr-2 h-4 w-4" /> Support
                        </button>
                        <button
                            onClick={handleLogout}
                            className="transition-colors hover:text-red-600 text-left text-[#13285A]/80 font-medium flex items-center px-3 py-1 pt-2"
                        >
                             <LogOut className="mr-2 h-4 w-4" /> Logout
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2.5 w-full">
                        <Button variant="outline" asChild className="w-full justify-center text-sm font-bold border-2 border-[#13285A] text-[#13285A] bg-transparent hover:bg-[#13285A] hover:text-[#ECE6DC]" onClick={() => setOpen(false)}>
                            <Link href="/login">Log In</Link>
                        </Button>
                        <Button asChild className="w-full justify-center text-sm font-bold bg-[#FF5A12] hover:bg-[#E04800] text-white shadow-md shadow-[#FF5A12]/30 border-none" onClick={() => setOpen(false)}>
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                      </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
  }

export function AuthButton() {
  const { user, userType, loading, signOut: authSignOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authSignOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (loading) {
      return <Skeleton className="h-10 w-28" />
  }

  if (user) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Find Demand link just on the left of user/login */}
        <Link
          href="/find-demand"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-[#13285A] hover:text-[#FF5A12] hover:bg-[#13285A]/10 transition-all border border-[#13285A]/15 bg-[#ECE6DC]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A12] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5A12]"></span>
          </span>
          <Compass className="w-4 h-4 text-[#FF5A12]" />
          <span>Find Demand</span>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {userType === 'employee' ? <Shield/> : (user.email ? user.email.charAt(0).toUpperCase() : <UserIcon />)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/dashboard/transactions')}>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Transactions</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/support')}>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
      {/* Find Demand page link directly on the left of Log In */}
      <Link
        href="/find-demand"
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#13285A] hover:text-[#FF5A12] hover:bg-[#13285A]/10 transition-all border border-[#13285A]/15 bg-white/70 sm:bg-transparent shadow-sm sm:shadow-none whitespace-nowrap"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A12] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5A12]"></span>
        </span>
        <Compass className="w-4 h-4 text-[#FF5A12]" />
        <span>Find Demand</span>
      </Link>

      <Button variant="ghost" asChild className="w-full sm:w-auto justify-start sm:justify-center text-[#13285A] hover:bg-[#13285A]/10 hover:text-[#13285A] font-semibold">
        <Link href="/login">Log In</Link>
      </Button>
      <Button asChild className="w-full sm:w-auto justify-start sm:justify-center bg-[#FF5A12] hover:bg-[#E04E0C] text-white font-semibold shadow-md shadow-[#FF5A12]/20 border-none">
        <Link href="/signup">Sign Up</Link>
      </Button>
    </div>
  );
}

export function MobileMenu() {
  const { loading } = useAuth();

  if (loading) {
    return <Skeleton className="h-10 w-10 sm:hidden" />;
  }
  
  return (
    <div className="sm:hidden">
      <MobileNavLinks />
    </div>
  );
}
