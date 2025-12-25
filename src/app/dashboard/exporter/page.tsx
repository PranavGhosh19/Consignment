
"use client";

import { useState, useEffect, useCallback, Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldAlert, PlusCircle, Ship } from "lucide-react";
import Link from "next/link";

const DashboardCard = ({ title, description, href, icon: Icon }: { title: string, description: string, href: string, icon: React.ElementType }) => (
    <Link href={href}>
        <Card className="hover:border-primary hover:bg-secondary transition-all h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">{title}</CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    </Link>
);


const PageSkeleton = () => (
    <div className="container py-6 md:py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <Skeleton className="h-10 w-64" />
        </div>
        <Skeleton className="h-64 w-full" />
    </div>
);


export default function ExporterDashboardPageWrapper() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ExporterDashboardPage />
    </Suspense>
  );
}

function ExporterDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const uData = userDoc.data();
          if (uData.userType === 'exporter') {
            setUser(currentUser);
            setUserData(uData);
          } else {
             router.push('/dashboard');
          }
        } else {
           router.push('/login');
        }
      } else {
        router.push('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);
  
  const VerificationStatus = () => {
    const status = userData?.verificationStatus;
    if (status === 'pending') {
        return (
            <Card className="bg-yellow-50 dark:bg-card border-yellow-400 dark:border-yellow-600">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><ShieldAlert className="text-yellow-600"/>Verification Pending</CardTitle>
                    <CardDescription className="dark:text-yellow-500">
                        Your business details are currently under review. You will be notified once the verification is complete. You can create and save draft shipments, but you cannot schedule them to go live yet.
                    </CardDescription>
                </CardHeader>
            </Card>
        )
    }
    if (status === 'rejected') {
         return (
            <Card className="bg-red-50 dark:bg-card border-red-400 dark:border-red-600">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><ShieldAlert className="text-red-600"/>Verification Denied</CardTitle>
                    <CardDescription className="dark:text-red-500">
                       Your verification request was not approved. Please review your details in Settings and contact support if you believe this is an error.
                    </CardDescription>
                </CardHeader>
            </Card>
        )
    }
    return null;
  }

  if (loading || !user) {
    return <PageSkeleton />;
  }

  const isApproved = userData?.verificationStatus === 'approved';
  const exporterName = userData?.name || 'Exporter';

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Welcome, {exporterName}</h1>
      </div>
      
      {!isApproved && <div className="mb-8"><VerificationStatus /></div>}
      
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard 
                title="My Shipments"
                description="View, track, and manage all your shipment requests."
                href="/dashboard/exporter/my-shipments"
                icon={Ship}
            />
             <DashboardCard 
                title="New Shipment"
                description="Create a new shipment request to get bids from carriers."
                href="/dashboard/exporter/my-shipments?new=true"
                icon={PlusCircle}
            />
      </div>

    </div>
  );
}
