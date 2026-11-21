"use client";

import React, { useEffect, useState, memo } from "react";
import { Timestamp } from "firebase/firestore";

interface BiddingCountdownProps {
  closeAt: Timestamp | null | undefined;
  status?: string;
  formatStyle?: "digital" | "verbose";
  className?: string;
  onExpire?: () => void;
}

export const BiddingCountdown: React.FC<BiddingCountdownProps> = memo(function BiddingCountdown({
  closeAt,
  status = "live",
  formatStyle = "digital",
  className = "text-2xl font-bold font-mono text-destructive",
  onExpire,
}) {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    if (status !== "live" || !closeAt) return 0;
    const target = closeAt.toDate ? closeAt.toDate().getTime() : 0;
    const diff = target - Date.now();
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    if (status !== "live" || !closeAt) {
      setTimeLeft(0);
      return;
    }

    const calculateRemaining = () => {
      const target = closeAt.toDate ? closeAt.toDate().getTime() : 0;
      const diff = target - Date.now();
      return diff > 0 ? diff : 0;
    };

    const initial = calculateRemaining();
    setTimeLeft(initial);
    if (initial <= 0) {
      onExpire?.();
      return;
    }

    const interval = setInterval(() => {
      const remaining = calculateRemaining();
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [closeAt, status, onExpire]);

  if (status !== "live" || timeLeft <= 0) {
    return <span className={className}>Bidding closed</span>;
  }

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const formattedTime =
    formatStyle === "verbose"
      ? `${minutes}m ${seconds}s`
      : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return <span className={className}>{formattedTime}</span>;
});
