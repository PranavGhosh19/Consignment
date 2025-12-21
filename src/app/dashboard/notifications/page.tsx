
"use client";

import { useEffect } from "react";
import { useRouter } from 'next/navigation';

// This page is deprecated. Redirecting to dashboard.
export default function NotificationsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return null;
}
