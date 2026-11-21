
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from 'next/navigation';
import { collection, query, getDocs, DocumentData, orderBy, doc, getDoc, addDoc, where, collectionGroup, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/auth-context';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, Info, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RegisterButton } from "@/components/RegisterButton";

export default function FindShipmentsPage() {
  const { user, userData, userType, loading: authLoading } = useAuth();
  const [shipments, setShipments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBidDialogOpen, setIsBidDialogOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<DocumentData | null>(null);
  const [bidAmount, setBidAmount] = useState("");
  const [isSubmittingBid, setIsSubmittingBid] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();

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
    if (!user) return; // Wait for user to be loaded

    let unsubscribeSnapshots: () => void = () => {};
    
    // Only set loading to true when we start fetching shipments.
    // The initial `true` state handles the auth/user data loading.
    if (userData?.verificationStatus === 'approved') {
        setLoading(true);
        const shipmentsQuery = query(collection(db, 'shipments'), orderBy('createdAt', 'desc'));

        unsubscribeSnapshots = onSnapshot(shipmentsQuery, (snapshot) => {
            const shipmentsList = snapshot.docs
                .map(doc => ({ id: doc.id, ...(doc.data() as any) }))
                .filter((shipment: any) => shipment.status === 'scheduled');

            setShipments(shipmentsList);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching shipments in real-time: ", error);
            toast({ title: "Error", description: "Could not fetch shipments.", variant: "destructive" });
            setLoading(false);
        });
    } else if (userData) { // userData is loaded but not approved
        setLoading(false);
    }
    
     return () => {
        unsubscribeSnapshots();
    };
  }, [user, userData, toast]);

  const handleOpenBidDialog = (shipment: DocumentData) => {
    setSelectedShipment(shipment);
    setIsBidDialogOpen(true);
    setBidAmount("");
  };

  const handleRowClick = (shipment: DocumentData) => {
    const isLive = shipment.status === 'live' ||
      (shipment.status === 'scheduled' && shipment.goLiveAt && shipment.goLiveAt.toDate().getTime() <= Date.now());

    if (isLive) {
      router.push(`/dashboard/carrier/shipment/${shipment.publicId}`);
    } else {
      handleOpenBidDialog(shipment);
    }
  };

  const handlePlaceBid = async () => {
    if (!user || !selectedShipment || !bidAmount) {
      toast({ title: "Error", description: "Please enter a bid amount.", variant: "destructive" });
      return;
    }

    const newBidAmount = parseFloat(bidAmount);
    if (isNaN(newBidAmount) || newBidAmount <= 0) {
      toast({ title: "Invalid Bid", description: "Please enter a valid bid amount.", variant: "destructive" });
      return;
    }

    if (selectedShipment.status !== 'live') {
      toast({ title: "Info", description: "This shipment is not currently accepting bids.", variant: "default" });
      return;
    }
    setIsSubmittingBid(true);
    try {
      // Validate that bid is strictly lower than previous bid(s) by this carrier
      const existingBidsQuery = query(
        collection(db, "shipments", selectedShipment.id, "bids"),
        where("carrierId", "==", user.uid)
      );
      const existingBidsSnap = await getDocs(existingBidsQuery);
      if (!existingBidsSnap.empty) {
        const previousLowest = Math.min(...existingBidsSnap.docs.map(d => Number(d.data().bidAmount)));
        if (newBidAmount >= previousLowest) {
          toast({
            title: "Bid Amount Too High",
            description: `Your new bid ($${newBidAmount.toLocaleString()}) must be strictly lower than your previous bid of $${previousLowest.toLocaleString()}.`,
            variant: "destructive",
          });
          setIsSubmittingBid(false);
          return;
        }
      }

      await addDoc(collection(db, "shipments", selectedShipment.id, "bids"), {
        carrierId: user.uid,
        carrierName: userData?.name || 'Anonymous Carrier',
        bidAmount: newBidAmount,
        createdAt: new Date(),
      });
      toast({ title: "Success", description: "Your bid has been placed." });
      setIsBidDialogOpen(false);
      setSelectedShipment(null);
    } catch (error) {
      console.error("Error placing bid: ", error);
      toast({ title: "Error", description: "Failed to place your bid.", variant: "destructive" });
    } finally {
      setIsSubmittingBid(false);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'draft':
      case 'scheduled':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const renderStatusMessage = () => {
    if (!selectedShipment) return null;

    switch (selectedShipment.status) {
        case 'draft':
            return 'This shipment is not yet scheduled.';
        case 'scheduled':
            if (selectedShipment.goLiveAt) {
                return `Bidding for this shipment is set for ${format(selectedShipment.goLiveAt.toDate(), "PPp")}`;
            }
            return 'This shipment is scheduled to go live soon.';
        case 'awarded':
            return selectedShipment.winningCarrierId === user?.uid
                ? 'You are Awarded'
                : 'Other Carrier has been Awarded';
        default:
            return 'Bidding for this shipment is closed.';
    }
  };

  const onRegisterSuccess = (shipmentId: string) => {
    // We can choose to refetch or manually update state here.
    // For simplicity, closing the dialog is enough as the main list will eventually reflect changes.
    setIsBidDialogOpen(false);
  }

  const renderTable = (data: DocumentData[]) => {
    if (data.length === 0) {
        return (
             <div className="border rounded-lg p-12 text-center bg-card dark:bg-card mt-8">
                <h2 className="text-xl font-semibold mb-2">No shipments found</h2>
                <p className="text-muted-foreground">There are no scheduled shipments available at the moment.</p>
            </div>
        )
    }
    return (
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="hidden sm:table-cell">Exporter</TableHead>
              <TableHead className="hidden md:table-cell">Origin</TableHead>
              <TableHead className="hidden md:table-cell">Destination</TableHead>
              <TableHead className="hidden lg:table-cell text-right">Delivery Deadline</TableHead>
              <TableHead className="hidden lg:table-cell text-right">Bid On</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((shipment) => {
              const statusContent = (
                  <Badge variant={getStatusVariant(shipment.status)} className="capitalize">
                      {shipment.status}
                  </Badge>
              );

              return (
                  <TableRow key={shipment.id} onClick={() => handleRowClick(shipment)} className="cursor-pointer">
                  <TableCell className="font-medium">{shipment.productName || 'N/A'}</TableCell>
                  <TableCell className="hidden sm:table-cell">{shipment.exporterName || 'N/A'}</TableCell>
                  <TableCell className="hidden md:table-cell">{shipment.origin?.portOfLoading || 'N/A'}</TableCell>
                  <TableCell className="hidden md:table-cell">{shipment.destination?.portOfDischarge || 'N/A'}</TableCell>
                  <TableCell className="hidden lg:table-cell text-right">{shipment.deliveryDeadline ? format(shipment.deliveryDeadline.toDate(), "dd/MM/yyyy") : 'N/A'}</TableCell>
                  <TableCell className="hidden lg:table-cell text-right">{shipment.goLiveAt ? format(shipment.goLiveAt.toDate(), "dd/MM/yyyy p") : 'N/A'}</TableCell>
                  <TableCell className="text-center">
                      {statusContent}
                  </TableCell>
                  </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }


  if (loading) {
    return (
        <div className="container py-6 md:py-10">
            <div className="flex justify-between items-center mb-8">
                <Skeleton className="h-10 w-48" />
            </div>
            <Skeleton className="h-96 w-full" />
        </div>
    )
  }

  const isApproved = userData?.verificationStatus === 'approved';

  if (!isApproved) {
    return (
        <div className="container py-6 md:py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold font-headline">Find Shipments</h1>
            </div>
             <Card className="bg-yellow-50 dark:bg-card border-yellow-400 dark:border-yellow-600">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><ShieldAlert className="text-yellow-600"/>Verification Required</CardTitle>
                    <CardDescription className="dark:text-yellow-500">
                        Your account must be verified and approved by our team before you can view and bid on shipments. Please check your dashboard for your verification status.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
  }

  const hasDimensions = selectedShipment?.cargo?.dimensions?.length && selectedShipment?.cargo?.dimensions?.width && selectedShipment?.cargo?.dimensions?.height;

  return (
    <div className="container py-6 md:py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Find Shipments</h1>
      </div>

      {renderTable(shipments)}

      <Dialog open={isBidDialogOpen} onOpenChange={setIsBidDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                  <DialogTitle className="text-2xl font-headline">Shipment Details</DialogTitle>
                  <DialogDescription>Review the shipment details and register your interest to bid.</DialogDescription>
              </DialogHeader>
              {selectedShipment && (
                  <div className="grid gap-6 py-4">
                      <Card>
                          <CardHeader>
                              <CardTitle>{selectedShipment.productName}</CardTitle>
                              <CardDescription>From: {selectedShipment.exporterName}</CardDescription>
                          </CardHeader>
                          <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
                              {selectedShipment.shipmentType && <div className="md:col-span-2"><span className="font-semibold">Shipment Type: </span>{selectedShipment.shipmentType}</div>}
                              {selectedShipment.hsnCode && <div><span className="font-semibold">HSN / ITC-HS Code: </span>{selectedShipment.hsnCode}</div>}
                              {selectedShipment.modeOfShipment && <div><span className="font-semibold">Mode: </span>{selectedShipment.modeOfShipment}</div>}

                              <div><span className="font-semibold">Origin Port: </span>{selectedShipment.origin?.portOfLoading}</div>
                              <div><span className="font-semibold">Destination Port: </span>{selectedShipment.destination?.portOfDischarge}</div>
                              {selectedShipment.origin?.zipCode && <div><span className="font-semibold">Origin Zip: </span>{selectedShipment.origin?.zipCode}</div>}
                              {selectedShipment.destination?.zipCode && <div><span className="font-semibold">Destination Zip: </span>{selectedShipment.destination?.zipCode}</div>}

                              <div><span className="font-semibold">Departure: </span>{selectedShipment.departureDate ? format(selectedShipment.departureDate.toDate(), "dd/MM/yyyy") : 'N/A'}</div>
                              <div><span className="font-semibold">Deadline: </span>{selectedShipment.deliveryDeadline ? format(selectedShipment.deliveryDeadline.toDate(), "dd/MM/yyyy") : 'N/A'}</div>
                              <div className="md:col-span-2"><span className="font-semibold">Cargo: </span>{selectedShipment.cargo?.type || 'General'} - {selectedShipment.cargo?.weight}kg</div>
                              {selectedShipment.cargo?.packageType && <div className="md:col-span-2"><span className="font-semibold">Package: </span>{selectedShipment.cargo.packageType}</div>}
                              {hasDimensions && <div className="md:col-span-2"><span className="font-semibold">Dimensions (LxWxH): </span>{selectedShipment.cargo.dimensions.length} x {selectedShipment.cargo.dimensions.width} x {selectedShipment.cargo.dimensions.height} {selectedShipment.cargo.dimensions.unit || ''}</div>}
                              {selectedShipment.specialInstructions && <div className="md:col-span-2"><span className="font-semibold">Instructions: </span>{selectedShipment.specialInstructions}</div>}
                          </CardContent>
                      </Card>

                      {selectedShipment.status === 'live' && (!selectedShipment.biddingCloseAt || selectedShipment.biddingCloseAt.toDate() > new Date()) ? (
                        <div className="grid gap-2">
                            <Label htmlFor="bid-amount">Your Bid Amount (USD)</Label>
                            <div className="flex items-center">
                                <span className="bg-muted text-muted-foreground px-3 py-2 border border-r-0 rounded-l-md">$</span>
                                <Input
                                id="bid-amount"
                                type="number"
                                placeholder="e.g., 2500"
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                                disabled={isSubmittingBid}
                                className="rounded-l-none"
                                />
                            </div>
                        </div>
                      ) : (
                        <Card className="bg-secondary border-dashed">
                          <CardContent className="p-6 flex items-center justify-center gap-4">
                              <Info className="text-muted-foreground h-5 w-5" />
                              <p className="text-muted-foreground text-center">
                                {selectedShipment.status === 'live'
                                  ? "The bidding window for this shipment has closed."
                                  : renderStatusMessage()}
                              </p>
                          </CardContent>
                        </Card>
                      )}
                  </div>
              )}
              <DialogFooter>
                  <Button variant="outline" onClick={() => setIsBidDialogOpen(false)}>Cancel</Button>
                  {selectedShipment?.status === 'scheduled' && user && (
                    <RegisterButton 
                        shipmentId={selectedShipment.id} 
                        user={user} 
                        onRegisterSuccess={onRegisterSuccess} 
                    />
                  )}
                  {selectedShipment?.status === 'live' && (!selectedShipment.biddingCloseAt || selectedShipment.biddingCloseAt.toDate() > new Date()) && (
                    <Button onClick={handlePlaceBid} disabled={isSubmittingBid}>
                        <Send className="mr-2 h-4 w-4" />
                        {isSubmittingBid ? 'Placing Bid...' : 'Place Bid'}
                    </Button>
                  )}
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </div>
  );
}

    

    