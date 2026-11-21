
"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/auth-context';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ship } from "lucide-react";

const StatCard = ({ title, value, icon: Icon }: { title: string, value: string | number, icon: React.ElementType }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);

export default function ExporterDashboardPage() {
  const { user, userData, userType, loading } = useAuth();
  const [shipmentCount, setShipmentCount] = useState(0);
  const [loadingShipments, setLoadingShipments] = useState(true);
  
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
      return;
    }
    if (userType !== 'exporter') {
      router.push('/dashboard');
      return;
    }

    const fetchShipmentCount = async () => {
      try {
        const shipmentsQuery = query(collection(db, 'shipments'), where('exporterId', '==', user.uid));
        const shipmentsSnapshot = await getDocs(shipmentsQuery);
        setShipmentCount(shipmentsSnapshot.size);
      } catch (err) {
        console.error("Error fetching shipment count:", err);
      } finally {
        setLoadingShipments(false);
      }
    };

    fetchShipmentCount();
  }, [user, userType, loading, router]);
  
  if (loading || loadingShipments || !user) {
    return (
        <div className="container py-6 md:py-10">
            <div className="flex justify-between items-center mb-8">
                <Skeleton className="h-10 w-64" />
            </div>
             <div className="w-full max-w-xs">
                <Skeleton className="h-28" />
            </div>
        </div>
    )
  }

  return (
    <div className="container py-6 md:py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Welcome, {userData?.name || 'Exporter'}</h1>
        </div>

        <div className="w-full max-w-xs">
            <StatCard title="Total Shipments" value={shipmentCount} icon={Ship} />
        </div>
    </div>
  );
}
