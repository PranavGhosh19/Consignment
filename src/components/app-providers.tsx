
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { AuthButton, MobileMenu, NavLinks } from "@/components/auth-button";
import { BottomBar } from "@/components/bottom-bar";
import { Clock } from "@/components/clock";
import { FirebaseErrorListener } from "./FirebaseErrorListener";
import { Linkedin } from "lucide-react";

const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" rx="8" fill="hsl(var(--primary))" />
      <path
        d="M23 23.5C24.3807 23.5 25.5 22.3807 25.5 21C25.5 19.6193 24.3807 18.5 23 18.5H9C7.61929 18.5 6.5 19.6193 6.5 21C6.5 22.3807 7.61929 23.5 9 23.5H23Z"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 18.5L12.5 10.5H19.5L22.5 18.5"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 10.5V8"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

const Header = () => {
    return (
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm dark:bg-background/80"
        )}
      >
        <div className="container flex h-16 items-center">
          {/* Centered Logo on small screens, left-aligned on larger screens */}
          <div className="flex-1 sm:flex-none">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg font-headline justify-center sm:justify-start"
            >
              <LogoIcon />
              <span className="font-bold text-base sm:text-xl">ShipCargo</span>
            </Link>
          </div>

          {/* NavLinks appear on larger screens */}
          <div className="hidden sm:flex items-center gap-6 ml-6">
            <NavLinks />
          </div>
          
          {/* Auth buttons and MobileMenu appear on larger screens */}
           <div className="ml-auto hidden sm:flex items-center gap-2">
             <div className="hidden sm:flex">
                <AuthButton />
             </div>
             <MobileMenu />
          </div>
        </div>
      </header>
    );
}

const Footer = () => (
    <footer className="border-t bg-secondary pb-24 sm:pb-0">
        <div className="container py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1 space-y-4">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl font-headline">
                        <LogoIcon />
                        <span>ShipCargo</span>
                    </Link>
                    <p className="text-sm text-muted-foreground">The global marketplace for freight, connecting exporters and carriers in real-time.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:col-span-3 gap-8">
                    <div className="space-y-3">
                        <h4 className="font-semibold">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/signup/exporter" className="text-muted-foreground hover:text-primary">For Exporters</Link></li>
                            <li><Link href="/signup/carrier" className="text-muted-foreground hover:text-primary">For Carriers</Link></li>
                            <li><Link href="/how-it-works" className="text-muted-foreground hover:text-primary">How It Works</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-semibold">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                            <li><Link href="/support" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
                        </ul>
                    </div>
                     <div className="space-y-3">
                        <h4 className="font-semibold">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} ShipCargo. All rights reserved.
                </p>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Clock />
                </div>
            </div>
        </div>
    </footer>
);


export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <FirebaseErrorListener />
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
            <BottomBar />
        </div>
    )
}
