
"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, DocumentData, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
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
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [shipmentCount, setShipmentCount] = useState(0);
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

            // Fetch shipment count
            const shipmentsQuery = query(collection(db, 'shipments'), where('exporterId', '==', currentUser.uid));
            const shipmentsSnapshot = await getDocs(shipmentsQuery);
            setShipmentCount(shipmentsSnapshot.size);

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
  
  if (loading || !user) {
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
