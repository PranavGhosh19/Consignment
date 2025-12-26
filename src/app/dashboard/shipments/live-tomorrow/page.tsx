
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, DocumentData, orderBy, doc, getDoc, onSnapshot, where, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { format, startOfTomorrow, endOfTomorrow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Sunrise, ArrowLeft } from "lucide-react";

export default function LiveTomorrowPage() {
  const [user, setUser] = useState<User | null>(null);
  const [shipments, setShipments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data()?.userType === 'employee') {
           setUser(currentUser);
        } else {
            router.push('/dashboard');
        }
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribeAuth();
  }, [router]);
  
  useEffect(() => {
    let unsubscribeSnapshots: () => void = () => {};

    if (user) {
        setLoading(true);

        const tomorrowStart = Timestamp.fromDate(startOfTomorrow());
        const tomorrowEnd = Timestamp.fromDate(endOfTomorrow());

        const shipmentsQuery = query(
            collection(db, 'shipments'), 
            where('goLiveAt', '>=', tomorrowStart),
            where('goLiveAt', '<=', tomorrowEnd),
            orderBy('goLiveAt', 'asc')
        );

        unsubscribeSnapshots = onSnapshot(shipmentsQuery, (querySnapshot) => {
            const shipmentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setShipments(shipmentsList);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching shipments for tomorrow: ", error);
            if (error.code !== 'permission-denied') {
              toast({ title: "Error", description: "Could not fetch tomorrow's shipments.", variant: "destructive" });
            }
            setLoading(false);
        });
    }

    return () => {
        unsubscribeSnapshots();
    };
  }, [user, toast]);
  
  const handleRowClick = (publicId: string) => {
    router.push(`/dashboard/shipment/${publicId}`);
  };

  if (loading) {
    return (
        <div className="container py-6 md:py-10">
            <Skeleton className="h-10 w-64 mb-8" />
            <Skeleton className="h-96 w-full" />
        </div>
    )
  }

  return (
    <div className="container py-6 md:py-10">
      <div className="flex items-center mb-8 gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard/manage-shipments')}>
          <ArrowLeft />
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline flex items-center gap-2">
            <Sunrise className="text-primary"/> Shipments Going Live Tomorrow
        </h1>
      </div>

      {shipments.length > 0 ? (
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Exporter</TableHead>
                <TableHead className="hidden md:table-cell">Destination</TableHead>
                <TableHead className="hidden lg:table-cell">Scheduled Time</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.id} onClick={() => handleRowClick(shipment.publicId)} className="cursor-pointer">
                  <TableCell className="font-medium">{shipment.productName || 'N/A'}</TableCell>
                  <TableCell>{shipment.exporterName || 'N/A'}</TableCell>
                  <TableCell className="hidden md:table-cell">{shipment.destination?.portOfDelivery || 'N/A'}</TableCell>
                  <TableCell className="hidden lg:table-cell">{shipment.goLiveAt ? format(shipment.goLiveAt.toDate(), "p") : 'N/A'}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="capitalize">
                        {shipment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="border rounded-lg p-12 text-center bg-card dark:bg-card">
          <h2 className="text-xl font-semibold mb-2">No Shipments For Tomorrow</h2>
          <p className="text-muted-foreground">There are no shipments scheduled to go live for bidding tomorrow.</p>
        </div>
      )}
    </div>
  );
}
