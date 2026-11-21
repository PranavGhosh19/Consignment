
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, collection, query, orderBy, onSnapshot, DocumentData, addDoc, updateDoc, Timestamp, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/auth-context";
import { BiddingCountdown } from "@/components/BiddingCountdown";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, TrendingDown, Award } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function CarrierShipmentDetailPage() {
  const { user, userName, userType, loading: authLoading } = useAuth();
  const carrierName = userName || 'Anonymous Carrier';
  const [shipment, setShipment] = useState<DocumentData | null>(null);
  const [shipmentInternalId, setShipmentInternalId] = useState<string | null>(null);
  const [bids, setBids] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [isBiddingClosed, setIsBiddingClosed] = useState(false);

  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const publicId = params.id as string;

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/login');
      return;
    }
    if (userType !== 'carrier') {
      router.push('/dashboard');
    }
  }, [user, userType, authLoading, router]);

  useEffect(() => {
    if (!user || !publicId) return;
    
    let unsubscribeShipment: () => void = () => {};
    
    const shipmentQuery = query(collection(db, "shipments"), where("publicId", "==", publicId));

    unsubscribeShipment = onSnapshot(shipmentQuery, (snapshot) => {
       if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        const shipmentData = docSnap.data();
        const isLive = shipmentData.status === 'live' ||
          (shipmentData.status === 'scheduled' && shipmentData.goLiveAt && shipmentData.goLiveAt.toDate().getTime() <= Date.now());

        if (!isLive && shipmentData.status !== 'bidding_closed') {
            toast({ title: "Info", description: "Bidding for this shipment is not currently open.", variant: "default" });
            router.push(`/dashboard/carrier/registered-shipment/${publicId}`);
            return;
        }
        setShipment({ id: docSnap.id, ...shipmentData });
        setShipmentInternalId(docSnap.id);
      } else {
        toast({ title: "Error", description: "Shipment not found.", variant: "destructive" });
        router.push("/dashboard/carrier");
      }
      setLoading(false);
    }, (error) => {
        console.error("Error fetching shipment: ", error);
        toast({ title: "Error", description: "Failed to fetch shipment details.", variant: "destructive" });
        setLoading(false);
    });

    return () => {
        unsubscribeShipment();
    };
  }, [user, publicId, router, toast]);

  useEffect(() => {
    if (!shipmentInternalId) return;

    let unsubscribeBids: () => void = () => {};
    const bidsQuery = query(collection(db, "shipments", shipmentInternalId, "bids"), orderBy("bidAmount", "asc"));
    
    unsubscribeBids = onSnapshot(bidsQuery, (querySnapshot) => {
      const bidsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBids(bidsData);
    }, (error) => {
        console.error("Error fetching bids: ", error);
        toast({ title: "Error", description: "Failed to fetch bids.", variant: "destructive" });
    });

    return () => {
        unsubscribeBids();
    };
  }, [shipmentInternalId, toast]);

  const userBids = useMemo(() => {
    if (!user) return [];
    return bids
        .filter(b => b.carrierId === user.uid)
        .sort((a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime());
  }, [bids, user]);

  const userLowestBid = useMemo(() => {
    if (!userBids || userBids.length === 0) return null;
    return Math.min(...userBids.map(b => Number(b.bidAmount)));
  }, [userBids]);
  
  const { userBidRank, isL1, userBidCount } = useMemo(() => {
    if (!user || bids.length === 0) {
      return { userBidRank: null, isL1: false, userBidCount: 0 };
    }
    
    const count = userBids.length;

    if (count === 0) {
      return { userBidRank: null, isL1: false, userBidCount: 0 };
    }
    
    // Step 1: Find the lowest bid for each carrier
    const lowestBidsByCarrier: Record<string, number> = {};
    bids.forEach(bid => {
      if (!lowestBidsByCarrier[bid.carrierId] || bid.bidAmount < lowestBidsByCarrier[bid.carrierId]) {
        lowestBidsByCarrier[bid.carrierId] = bid.bidAmount;
      }
    });

    // Step 2: Get unique sorted list of these lowest bids
    const uniqueLowestBids = [...new Set(Object.values(lowestBidsByCarrier))].sort((a, b) => a - b);
    
    // Step 3: Find the user's best bid and its rank
    const userBestBidAmount = lowestBidsByCarrier[user.uid];
    const rankIndex = uniqueLowestBids.indexOf(userBestBidAmount);

    return {
      userBidRank: rankIndex !== -1 ? `L${rankIndex + 1}` : null,
      isL1: rankIndex === 0,
      userBidCount: count
    };
  }, [bids, user, userBids]);

  const isBiddingOpen = useMemo(() => {
    if (!shipment || isBiddingClosed) return false;
    const isLive = shipment.status === 'live' ||
      (shipment.status === 'scheduled' && shipment.goLiveAt && shipment.goLiveAt.toDate().getTime() <= Date.now());
    if (!isLive) return false;
    const effectiveCloseAt = shipment.biddingCloseAt || 
      (shipment.goLiveAt ? Timestamp.fromDate(new Date(shipment.goLiveAt.toDate().getTime() + 3 * 60 * 1000)) : null);
    if (effectiveCloseAt) {
      const closeTime = effectiveCloseAt.toDate ? effectiveCloseAt.toDate().getTime() : 0;
      return closeTime > Date.now();
    }
    return true;
  }, [shipment, isBiddingClosed]);

  const handlePlaceBid = async () => {
    if (!user || !shipmentInternalId || !bidAmount) {
      toast({ title: "Error", description: "Please enter a bid amount.", variant: "destructive" });
      return;
    }

    if (!isBiddingOpen) {
      toast({ title: "Bidding Closed", description: "The bidding window for this shipment has closed.", variant: "destructive" });
      return;
    }

    if (userBidCount >= 3) {
      toast({ title: "Limit Reached", description: "You cannot place more than 3 bids.", variant: "destructive" });
      return;
    }

    const newBidAmount = parseFloat(bidAmount);
    if (isNaN(newBidAmount) || newBidAmount <= 0) {
       toast({ title: "Invalid Bid", description: "Please enter a valid bid amount.", variant: "destructive" });
       return;
    }

    if (userLowestBid !== null && newBidAmount >= userLowestBid) {
      toast({ 
        title: "Bid Amount Too High", 
        description: `Your new bid ($${newBidAmount.toLocaleString()}) must be strictly less than your previous lowest bid of $${userLowestBid.toLocaleString()}.`, 
        variant: "destructive" 
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (shipment?.status === 'scheduled' && shipment.goLiveAt) {
        const effectiveCloseAt = shipment.biddingCloseAt || 
          Timestamp.fromDate(new Date(shipment.goLiveAt.toDate().getTime() + 3 * 60 * 1000));
        updateDoc(doc(db, "shipments", shipmentInternalId), {
          status: 'live',
          goLiveAt: shipment.goLiveAt,
          biddingCloseAt: effectiveCloseAt
        }).catch(console.error);
      }
      await addDoc(collection(db, "shipments", shipmentInternalId, "bids"), {
        carrierId: user.uid,
        carrierName: carrierName,
        bidAmount: newBidAmount,
        createdAt: Timestamp.now(),
      });
      toast({ title: "Success", description: "Your bid has been placed." });
      setBidAmount("");
    } catch (error) {
      console.error("Error placing bid: ", error);
      toast({ title: "Error", description: "Failed to place your bid.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !shipment) {
    return (
      <div className="container py-6 md:py-10">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
            <div className="space-y-6">
                 <Skeleton className="h-32 w-full" />
            </div>
        </div>
      </div>
    );
  }

  const hasDimensions = shipment.cargo?.dimensions?.length && shipment.cargo?.dimensions?.width && shipment.cargo?.dimensions?.height;
  const atBidLimit = userBidCount >= 3;

  return (
    <div className="container py-6 md:py-10">
      <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push('/dashboard/carrier/find-shipments')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Shipments
          </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white dark:bg-card">
                <CardHeader>
                    <CardTitle className="text-2xl sm:text-3xl font-headline">{shipment.productName}</CardTitle>
                    <CardDescription>From: {shipment.exporterName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 text-sm">
                    <div className="grid md:grid-cols-2 gap-4 border-b pb-6">
                         {shipment.shipmentType && <div><span className="font-semibold text-muted-foreground block mb-1">Shipment Type</span>{shipment.shipmentType}</div>}
                         {shipment.hsnCode && <div><span className="font-semibold text-muted-foreground block mb-1">HSN / ITC-HS Code</span>{shipment.hsnCode}</div>}
                         {shipment.modeOfShipment && <div className="md:col-span-2"><span className="font-semibold text-muted-foreground block mb-1">Mode of Shipment</span>{shipment.modeOfShipment}</div>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 border-b pb-6">
                         <div><span className="font-semibold text-muted-foreground block mb-1">Origin Port</span>{shipment.origin?.portOfLoading}</div>
                         <div><span className="font-semibold text-muted-foreground block mb-1">Destination Port</span>{shipment.destination?.portOfDischarge}</div>
                         {shipment.origin?.zipCode && <div><span className="font-semibold text-muted-foreground block mb-1">Origin Zip</span>{shipment.origin.zipCode}</div>}
                         {shipment.destination?.zipCode && <div><span className="font-semibold text-muted-foreground block mb-1">Destination Zip</span>{shipment.destination.zipCode}</div>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 border-b pb-6">
                         <div><span className="font-semibold text-muted-foreground block mb-1">Departure Date</span>{shipment.departureDate ? format(shipment.departureDate.toDate(), "dd/MM/yyyy") : 'N/A'}</div>
                         <div><span className="font-semibold text-muted-foreground block mb-1">Delivery Deadline</span>{shipment.deliveryDeadline ? format(shipment.deliveryDeadline.toDate(), "dd/MM/yyyy") : 'N/A'}</div>
                    </div>
                    <div className="space-y-4">
                        <p className="font-semibold text-foreground">Cargo Information</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div><span className="font-semibold text-muted-foreground block mb-1">Cargo Type</span>{shipment.cargo?.type || 'General'}</div>
                            {shipment.cargo?.packageType && <div><span className="font-semibold text-muted-foreground block mb-1">Package Type</span>{shipment.cargo.packageType}</div>}
                            <div><span className="font-semibold text-muted-foreground block mb-1">Weight</span>{shipment.cargo?.weight} kg</div>
                            {hasDimensions && <div className="md:col-span-2"><span className="font-semibold text-muted-foreground block mb-1">Dimensions (LxWxH)</span>{shipment.cargo.dimensions.length} x {shipment.cargo.dimensions.width} x {shipment.cargo.dimensions.height} {shipment.cargo.dimensions.unit || ''}</div>}
                        </div>
                    </div>

                    {shipment.specialInstructions && <div className="pt-2"><p className="font-semibold text-muted-foreground mb-1">Special Instructions</p><p>{shipment.specialInstructions}</p></div>}
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6 lg:sticky lg:top-24">
            <Card className="bg-white dark:bg-card">
              <CardHeader>
                <CardTitle>{isBiddingOpen ? "Live Bidding" : "Bidding Closed"}</CardTitle>
                <CardDescription>
                    {isBiddingOpen 
                        ? `Place your bid. (${userBidCount} of 3 bids placed)`
                        : "The bidding window for this shipment has closed."
                    }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="flex flex-col items-center justify-center p-4 bg-[#13285A] text-[#ECE6DC] border border-[#ECE6DC]/20 rounded-xl">
                    {userBidRank ? (
                         <div className={cn(
                            "mt-2 text-base font-semibold text-white px-4 py-1 rounded-full flex items-center gap-2",
                            isL1 ? 'bg-green-500' : 'bg-gray-600'
                         )}>
                            <Award className="h-5 w-5" />
                            Your Rank: {userBidRank}
                        </div>
                    ) : (
                         <p className="text-sm text-gray-400 mt-2">You haven't placed a bid yet.</p>
                    )}
                </div>

                {isBiddingOpen && (shipment.biddingCloseAt || shipment.goLiveAt) && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">Bidding closes in:</p>
                    <BiddingCountdown 
                      closeAt={shipment.biddingCloseAt || (shipment.goLiveAt ? Timestamp.fromDate(new Date(shipment.goLiveAt.toDate().getTime() + 3 * 60 * 1000)) : null)}
                      status="live"
                      formatStyle="digital"
                      onExpire={() => setIsBiddingClosed(true)}
                    />
                  </div>
                )}

                {isBiddingOpen ? (
                  atBidLimit ? (
                     <div className="text-center text-muted-foreground border-dashed border-2 p-4 rounded-md">
                        You have reached your bid limit for this shipment.
                    </div>
                  ) : (
                    <>
                        <div className="grid gap-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="bid-amount">Your Bid Amount (USD)</Label>
                                {userLowestBid !== null && (
                                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                                        Must be &lt; ${userLowestBid.toLocaleString()}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center">
                                <span className="bg-muted text-muted-foreground px-3 py-2 border border-r-0 rounded-l-md">$</span>
                                <Input
                                id="bid-amount"
                                type="number"
                                placeholder={userLowestBid !== null ? `Must be less than $${userLowestBid.toLocaleString()}` : "e.g., 2500"}
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                                disabled={isSubmitting}
                                className="rounded-l-none"
                                />
                            </div>
                            {userLowestBid !== null && (
                                <p className="text-xs text-muted-foreground">
                                    You cannot place a bid equal to or higher than your previous bid (${userLowestBid.toLocaleString()}).
                                </p>
                            )}
                        </div>
                        <Button 
                            onClick={handlePlaceBid} 
                            disabled={isSubmitting || (userLowestBid !== null && bidAmount !== "" && parseFloat(bidAmount) >= userLowestBid)} 
                            className="w-full"
                        >
                            <Send className="mr-2 h-4 w-4" />
                            {isSubmitting ? 'Placing Bid...' : 'Place Bid'}
                        </Button>
                    </>
                  )
                ) : (
                  <div className="text-center text-muted-foreground border-dashed border-2 p-6 rounded-md bg-secondary/30">
                    <p className="font-semibold text-foreground mb-1">Bidding is Closed</p>
                    <p className="text-sm text-muted-foreground">The bidding window for this shipment has ended. The exporter is now reviewing the bids.</p>
                  </div>
                )}
              </CardContent>
            </Card>
            {userBids.length > 0 && (
                <Card className="bg-white dark:bg-card">
                    <CardHeader>
                        <CardTitle>Your Bids</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {userBids.map(bid => (
                                <li key={bid.id} className="flex justify-between items-center text-sm p-3 bg-secondary rounded-md">
                                    <span className="font-bold font-mono text-base">${bid.bidAmount.toLocaleString()}</span>
                                    <span className="text-muted-foreground">{format(bid.createdAt.toDate(), "PPpp")}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
