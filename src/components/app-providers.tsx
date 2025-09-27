
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { AuthButton, MobileMenu, NavLinks } from "@/components/auth-button";
import { BottomBar } from "@/components/bottom-bar";
import { Clock } from "@/components/clock";

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
    const [clickCount, setClickCount] = useState(0);
    const router = useRouter();

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const newClickCount = clickCount + 1;
        setClickCount(newClickCount);

        if (newClickCount >= 5) {
            router.push('/login/employee');
            setClickCount(0); // Reset after navigation
        } else {
             // Reset if time between clicks is too long
            setTimeout(() => {
                setClickCount(0);
            }, 1000); // 1 second timeout
        }
    }

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
              onClick={handleLogoClick}
              className="flex items-center gap-2 font-bold text-lg font-headline justify-center sm:justify-start"
            >
              <LogoIcon />
              <span className="font-bold text-base sm:text-xl">Shipping Battlefield</span>
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
  <footer className="py-6 md:px-8 md:py-0 border-t pb-24 sm:pb-6">
    <div className="container relative flex h-12 items-center justify-center">
      <p className="text-center text-sm text-muted-foreground">
        &copy; 2025 Shipping Battlefield. All rights reserved.
      </p>
      <div className="absolute right-6 md:right-8 hidden sm:block">
        <Clock />
      </div>
    </div>
  </footer>
);


export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
            <BottomBar />
        </div>
    )
}
