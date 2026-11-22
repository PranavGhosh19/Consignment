"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, X, Smartphone, Monitor, CheckCircle2, Share2, PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PwaInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isIos, setIsIos] = useState<boolean>(false);
  const [showIosGuide, setShowIosGuide] = useState<boolean>(false);

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            // Check for worker updates periodically
            reg.onupdatefound = () => {
              const installingWorker = reg.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
                    console.log("New content is available; please refresh.");
                  }
                };
              }
            };
          })
          .catch((err) => {
            console.warn("ServiceWorker registration failed: ", err);
          });
      });
    }

    // 2. Check if already installed / standalone mode
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();

    // 3. Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIos(isIosDevice);

    // 4. Capture BeforeInstallPromptEvent (Desktop Chrome/Edge, Android)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      // Check if dismissed recently (within 3 days)
      const lastDismissed = localStorage.getItem("shipcargo_pwa_dismissed");
      if (lastDismissed) {
        const diff = Date.now() - parseInt(lastDismissed, 10);
        if (diff < 3 * 24 * 60 * 60 * 1000) {
          return;
        }
      }

      // Show install prompt banner after a slight initial delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2500);

      return () => clearTimeout(timer);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // 5. Handle AppInstalled event
    const handleAppInstalled = () => {
      setShowBanner(false);
      setDeferredPrompt(null);
      setIsStandalone(true);
      localStorage.removeItem("shipcargo_pwa_dismissed");
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    // 6. Listen for manual "open-pwa-install" triggers from anywhere in app
    const handleManualTrigger = () => {
      if (isIosDevice && !isStandalone) {
        setShowIosGuide(true);
      } else if (deferredPrompt) {
        deferredPrompt.prompt();
      } else {
        setShowBanner(true);
      }
    };

    window.addEventListener("open-pwa-install", handleManualTrigger);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("open-pwa-install", handleManualTrigger);
    };
  }, [deferredPrompt, isStandalone]);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosGuide(true);
      setShowBanner(false);
      return;
    }

    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setShowBanner(false);
      setDeferredPrompt(null);
    } else {
      dismissBanner();
    }
  };

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem("shipcargo_pwa_dismissed", Date.now().toString());
  };

  // Don't render banner if already installed as standalone PWA
  if (isStandalone) {
    return null;
  }

  return (
    <>
      {/* iOS Safari Installation Guide Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-[#0A1636] border-2 border-[#FF5A12]/40 p-6 text-white shadow-2xl space-y-4">
            <button
              type="button"
              onClick={() => setShowIosGuide(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#13285A] text-[#AEB8D6] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#13285A] border border-[#ECE6DC]/20 flex items-center justify-center shrink-0 overflow-hidden">
                <Image src="/icon-192.png" alt="ShipCargo" width={48} height={48} className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-base font-headline">Install on iPhone / iPad</h3>
                <span className="text-xs text-[#AEB8D6]">Fast native app experience</span>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs text-[#ECE6DC]/90">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#13285A]/80 border border-[#ECE6DC]/10">
                <Share2 className="w-5 h-5 text-[#FF5A12] shrink-0" />
                <span>1. Tap the <strong>Share button</strong> in your Safari bottom bar.</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#13285A]/80 border border-[#ECE6DC]/10">
                <PlusSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>2. Scroll down and tap <strong>&apos;Add to Home Screen&apos;</strong>.</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#13285A]/80 border border-[#ECE6DC]/10">
                <CheckCircle2 className="w-5 h-5 text-[#FF5A12] shrink-0" />
                <span>3. Tap <strong>&apos;Add&apos;</strong> in top-right corner to install!</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => setShowIosGuide(false)}
              className="w-full h-11 rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white font-bold text-xs"
            >
              Got It
            </Button>
          </div>
        </div>
      )}

      {/* Floating PWA Install Prompt Banner (Mobile & Desktop) */}
      {showBanner && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-40 animate-in slide-in-from-bottom-5 duration-300">
          <div className="relative rounded-2xl bg-[#0A1636]/95 border-2 border-[#FF5A12]/40 backdrop-blur-xl p-4 sm:p-5 shadow-2xl text-[#ECE6DC] space-y-3.5">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={dismissBanner}
              className="absolute top-3 right-3 p-1 rounded-lg text-[#AEB8D6] hover:text-white hover:bg-[#13285A] transition-colors"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3.5 pr-6">
              <div className="w-12 h-12 rounded-2xl bg-[#13285A] border border-[#ECE6DC]/20 flex items-center justify-center shrink-0 shadow-md overflow-hidden">
                <Image
                  src="/icon-192.png"
                  alt="ShipCargo App Icon"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#FF5A12]/20 text-[#FF5A12] uppercase tracking-wider">
                    Install App
                  </span>
                  <span className="text-[11px] text-[#AEB8D6] hidden sm:inline flex items-center gap-1">
                    <Monitor className="w-3 h-3" /> Desktop &amp; <Smartphone className="w-3 h-3" /> Mobile
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white font-headline">
                  Install ShipCargo on Your Device
                </h4>
                <p className="text-[11px] text-[#AEB8D6] leading-relaxed">
                  Fast access, offline mode, and real-time reverse container auction updates right from your home screen or desktop.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <Button
                type="button"
                onClick={handleInstallClick}
                className="flex-1 h-10 rounded-xl bg-[#FF5A12] hover:bg-[#E04800] text-white font-bold text-xs shadow-md shadow-[#FF5A12]/25 cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install ShipCargo App</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={dismissBanner}
                className="h-10 px-3.5 rounded-xl border-[#ECE6DC]/20 bg-[#13285A]/80 text-[#AEB8D6] hover:text-white text-xs cursor-pointer"
              >
                Not Now
              </Button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
