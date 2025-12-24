"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";
import { format } from "date-fns";

type Transaction = {
  id: string;
  type: "listing" | "registration";
  amount: number;
  shipmentId: string;
  productName: string;
  paidAt: any; // Firestore Timestamp
};

const PageSkeleton = () => (
  <div className="container py-6 md:py-10">
    <Skeleton className="h-10 w-64 mb-4" />
    <Skeleton className="h-8 w-96 mb-8" />
    <Skeleton className="h-12 w-full mb-8" />
    <Skeleton className="h-80 w-full" />
  </div>
);

export default function TransactionsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { toast } = useToast();

  /* ---------------- AUTH ---------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  /* ---------------- FETCH TRANSACTIONS ---------------- */
  useEffect(() => {
    if (!user) return;

    const fetchTransactions = async () => {
      setLoading(true);

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) return;

        const userType = userDoc.data().userType;
        let fetched: Transaction[] = [];

        /* -------- EXPORTER -------- */
        if (userType === "exporter") {
          const q = query(
            collection(db, "shipments"),
            where("exporterId", "==", user.uid),
            where("listingPaymentId", "!=", null)
          );

          const snap = await getDocs(q);

          fetched = snap.docs.map((docSnap) => ({
            id: docSnap.data().listingPaymentId,
            type: "listing",
            amount: 1000,
            shipmentId: docSnap.id,
            productName: docSnap.data().productName,
            paidAt: docSnap.data().createdAt,
          }));
        }

        /* -------- CARRIER -------- */
        if (userType === "carrier") {
          const q = query(
            collectionGroup(db, "register"),
            where("carrierId", "==", user.uid)
          );

          const snap = await getDocs(q);

          const results = await Promise.all(
            snap.docs.map(async (regDoc) => {
              const regData = regDoc.data();
              const shipmentId = regDoc.ref.parent.parent?.id;

              if (!shipmentId) return null;

              const shipmentDoc = await getDoc(
                doc(db, "shipments", shipmentId)
              );

              if (!shipmentDoc.exists()) return null;

              return {
                id: regData.paymentId,
                type: "registration",
                amount: 10,
                shipmentId,
                productName: shipmentDoc.data().productName,
                paidAt: regData.registeredAt,
              } as Transaction;
            })
          );

          fetched = results.filter(Boolean) as Transaction[];
        }

        fetched.sort(
          (a, b) => b.paidAt.toDate().getTime() - a.paidAt.toDate().getTime()
        );

        setTransactions(fetched);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Could not load transaction history.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user, toast]);

  /* ---------------- REDIRECT HANDLER ---------------- */
  const handleRowClick = (tx: Transaction) => {
    if (tx.type === "registration") {
      router.push(
        `/dashboard/carrier/registered-shipment/${tx.shipmentId}`
      );
    } else {
      router.push(`/dashboard/shipment/${tx.shipmentId}`);
    }
  };

  if (loading) return <PageSkeleton />;

  return (
    <div className="container py-6 md:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold font-headline">
        Transaction History
      </h1>
      <p className="text-muted-foreground mb-8">
        A record of all your payments on the platform.
      </p>

      {transactions.length ? (
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Shipment</TableHead>
                <TableHead className="text-right">Amount (INR)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow
                  key={tx.id}
                  onClick={() => handleRowClick(tx)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">
                    {tx.paidAt
                      ? format(tx.paidAt.toDate(), "dd MMM, yyyy")
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tx.type === "listing" ? "default" : "secondary"
                      }
                      className="capitalize"
                    >
                      {tx.type === "listing"
                        ? "Shipment Listing"
                        : "Bid Registration"}
                    </Badge>
                  </TableCell>
                  <TableCell>{tx.productName}</TableCell>
                  <TableCell className="text-right font-mono">
                    ₹{tx.amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="border rounded-lg p-12 text-center bg-card">
          <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">
            No Transactions Found
          </h2>
          <p className="text-muted-foreground">
            Your payment history will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
