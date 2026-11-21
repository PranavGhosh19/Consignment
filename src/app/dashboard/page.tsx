
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { user, userType, verificationStatus, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace('/login');
      return;
    }

    if (!user.emailVerified) {
      router.replace('/verify-email');
      return;
    }

    if (verificationStatus === 'unsubmitted' || verificationStatus === 'rejected') {
      router.replace('/gst-verification');
      return;
    }

    if (userType === 'exporter') {
      router.replace('/dashboard/exporter');
    } else if (userType === 'carrier') {
      router.replace('/dashboard/carrier');
    } else if (userType === 'employee') {
      router.replace('/dashboard/employee');
    } else {
      router.replace('/select-type');
    }
  }, [user, userType, verificationStatus, loading, router]);

  return (
    <div className="container py-10">
        <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-10 w-48" />
        </div>
        <Skeleton className="h-80 w-full rounded-lg" />
    </div>
  );
}
