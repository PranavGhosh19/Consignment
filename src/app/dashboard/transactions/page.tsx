
"use client";

import { useState, useEffect, useMemo } from "react";
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
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CreditCard, Calendar as CalendarIcon, X } from "lucide-react";
import { format, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";

/* ---------------- TYPES ---------------- */

type Transaction = {
  id: string;
  type: "listing" | "registration";
  amount: number;
  shipmentId: string;
  productName: string;
  paidAt: any; // Firestore Timestamp
};

/* ---------------- SKELETON ---------------- */

const PageSkeleton = () => (
  <div className="container py-6 md:py-10">
    <Skeleton className="h-10 w-64 mb-4" />
    <Skeleton className="h-8 w-96 mb-8" />
    <Skeleton className="h-12 w-full mb-8" />
    <Skeleton className="h-80 w-full" />
  </div>
);

/* ---------------- PAGE ---------------- */

export default function TransactionsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState<Date | undefined>();

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
            where("listingPayment.id", "!=", null)
          );

          const snap = await getDocs(q);

          fetched = snap.docs.map((docSnap) => {
            const data = docSnap.data();
            const payment = data.listingPayment;

            return {
              id: payment.id,
              type: "listing",
              amount: payment.amount,
              shipmentId: docSnap.id,
              productName: data.productName,
              paidAt: payment.paidAt,
            };
          });
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
                amount: regData.amount ?? 10,
                shipmentId,
                productName: shipmentDoc.data().productName,
                paidAt: regData.registeredAt,
              } as Transaction;
            })
          );

          fetched = results.filter(Boolean) as Transaction[];
        }

        /* -------- SORT BY PAYMENT TIME -------- */
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

  const filteredTransactions = useMemo(() => {
    if (!dateFilter) return transactions;
    return transactions.filter(tx => isSameDay(tx.paidAt.toDate(), dateFilter));
  }, [transactions, dateFilter]);

  /* ---------------- ROW CLICK REDIRECT ---------------- */

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

  /* ---------------- UI ---------------- */

  return (
    <div className="container py-6 md:py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-headline">
                    Transaction History
                </h1>
                <p className="text-muted-foreground">
                    A record of all your payments on the platform.
                </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full sm:w-[280px] justify-start text-left font-normal",
                            !dateFilter && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFilter ? format(dateFilter, "PPP") : <span>Filter by date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={dateFilter}
                            onSelect={setDateFilter}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                 {dateFilter && (
                    <Button variant="ghost" size="icon" onClick={() => setDateFilter(undefined)}>
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>

      {filteredTransactions.length > 0 ? (
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Shipment</TableHead>
                <TableHead className="text-right">
                  Amount (INR)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow
                  key={tx.id}
                  onClick={() => handleRowClick(tx)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">
                    {format(tx.paidAt.toDate(), "dd MMM, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tx.type === "listing"
                          ? "default"
                          : "secondary"
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
             {dateFilter ? "No transactions found for the selected date." : "Your payment history will appear here."}
          </p>
        </div>
      )}
    </div>
  );
}
