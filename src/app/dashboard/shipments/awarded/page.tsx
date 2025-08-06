
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, DocumentData, orderBy, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Award, ArrowLeft } from "lucide-react";

export default function AwardedShipmentsPage() {
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
        const shipmentsQuery = query(
            collection(db, 'shipments'), 
            where('status', '==', 'awarded'),
            orderBy('createdAt', 'desc')
        );

        unsubscribeSnapshots = onSnapshot(shipmentsQuery, (querySnapshot) => {
            const shipmentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setShipments(shipmentsList);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching awarded shipments: ", error);
            if (error.code !== 'permission-denied') {
              toast({ title: "Error", description: "Could not fetch awarded shipments.", variant: "destructive" });
            }
            setLoading(false);
        });
    }

    return () => {
        unsubscribeSnapshots();
    };
  }, [user, toast]);
  
  const handleRowClick = (shipmentId: string) => {
    router.push(`/dashboard/shipment/${shipmentId}`);
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
            <Award className="text-primary"/> Awarded Shipments
        </h1>
      </div>

      {shipments.length > 0 ? (
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Exporter</TableHead>
                <TableHead>Winning Carrier</TableHead>
                <TableHead className="hidden md:table-cell">Winning Bid</TableHead>
                <TableHead className="hidden lg:table-cell">Awarded At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.id} onClick={() => handleRowClick(shipment.id)} className="cursor-pointer">
                  <TableCell className="font-medium">{shipment.productName || 'N/A'}</TableCell>
                  <TableCell>{shipment.exporterName || 'N/A'}</TableCell>
                  <TableCell>{shipment.winningCarrierName || 'N/A'}</TableCell>
                  <TableCell className="hidden md:table-cell font-mono">${(shipment.winningBidAmount || 0).toLocaleString()}</TableCell>
                  <TableCell className="hidden lg:table-cell">{shipment.createdAt ? format(shipment.createdAt.toDate(), "dd/MM/yyyy") : 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="border rounded-lg p-12 text-center bg-card dark:bg-card">
          <h2 className="text-xl font-semibold mb-2">No Awarded Shipments Found</h2>
          <p className="text-muted-foreground">There are currently no shipments that have been awarded to a carrier.</p>
        </div>
      )}
    </div>
  );
}
