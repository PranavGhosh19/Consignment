
'use client';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { collectionGroup, getDocs, query, where, getFirestore, doc, getDoc, orderBy, Timestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase'; 
import { Info, Loader2, Send } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from './ui/badge';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RegisterButton } from './RegisterButton';
import type { User } from 'firebase/auth';

const db = getFirestore(app);

interface Shipment {
  id: string;
  productName: string;
  exporterName?: string;
  shipmentType?: string;
  hsnCode?: string;
  modeOfShipment?: string;
  origin?: { portOfLoading: string; zipCode?: string };
  destination: { portOfDelivery: string; zipCode?: string };
  departureDate?: Timestamp;
  deliveryDeadline: Timestamp | null;
  cargo?: {
    type?: string;
    packageType?: string;
    weight?: string;
    dimensions?: {
      length?: string;
      width?: string;
      height?: string;
      unit?: string;
    };
  };
  specialInstructions?: string;
  status: string;
  goLiveAt: Timestamp | null;
  winningCarrierId?: string;
}

export function RecentActivities() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    if (!user) return;

    const fetchRegisteredShipments = async () => {
      try {
        const registerQuery = query(
          collectionGroup(db, 'register'),
          where('carrierId', '==', user.uid)
        );

        const registerSnap = await getDocs(registerQuery);
        const shipmentIds = new Set<string>();
        registerSnap.forEach((doc) => {
          const parentPath = doc.ref.parent.parent?.id;
          if (parentPath) shipmentIds.add(parentPath);
        });

        if (shipmentIds.size === 0) {
            setShipments([]);
            setLoading(false);
            return;
        }

        const shipmentPromises = Array.from(shipmentIds).map(async (shipmentId) => {
          const shipmentRef = doc(db, 'shipments', shipmentId);
          const shipmentSnap = await getDoc(shipmentRef);
          if (shipmentSnap.exists()) {
            return { id: shipmentSnap.id, ...shipmentSnap.data() } as Shipment;
          }
          return null;
        });

        const shipmentsData = (await Promise.all(shipmentPromises)).filter(Boolean) as Shipment[];
        
        shipmentsData.sort((a, b) => {
            const timeA = a.goLiveAt?.toDate()?.getTime() || 0;
            const timeB = b.goLiveAt?.toDate()?.getTime() || 0;
            return timeB - timeA;
        });

        setShipments(shipmentsData);
      } catch (err) {
        console.error('Error fetching shipments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredShipments();

  }, [user]);

  const handleRowClick = (shipment: Shipment) => {
    if (shipment.status === 'live') {
      router.push(`/dashboard/carrier/shipment/${shipment.id}`);
    } else {
      setSelectedShipment(shipment);
      setIsDialogOpen(true);
    }
  };
  
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'live':
      case 'awarded':
        return 'success';
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
                ? 'Congratulations! You won this bid.'
                : 'This shipment has been awarded to another carrier.';
        default:
            return 'Bidding for this shipment is closed.';
    }
  };

  const hasDimensions = selectedShipment?.cargo?.dimensions?.length && selectedShipment?.cargo?.dimensions?.width && selectedShipment?.cargo?.dimensions?.height;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin mr-2" /> Loading recent activities...
      </div>
    );
  }

  if (shipments.length === 0) {
    return (
        <div className="text-center text-muted-foreground py-12">
            <p>No recent activity to display.</p>
            <p className="text-sm">Register your interest on scheduled shipments to see them here.</p>
        </div>
    );
  }

  return (
    <>
        <div className="border rounded-lg overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="hidden md:table-cell">Destination</TableHead>
                        <TableHead className="hidden lg:table-cell">Delivery Deadline</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">Goes Live On</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {shipments.map((shipment) => (
                        <TableRow key={shipment.id} className="cursor-pointer" onClick={() => handleRowClick(shipment)}>
                            <TableCell className="font-medium">{shipment.productName || 'N/A'}</TableCell>
                            <TableCell className="hidden md:table-cell">{shipment.destination?.portOfDelivery || 'N/A'}</TableCell>
                            <TableCell className="hidden lg:table-cell">{shipment.deliveryDeadline ? format(shipment.deliveryDeadline.toDate(), "PP") : 'N/A'}</TableCell>
                             <TableCell className="text-center">
                                <Badge variant={getStatusVariant(shipment.status)}>{shipment.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                {shipment.goLiveAt ? (
                                    <span>{format(shipment.goLiveAt.toDate(), "PPp")}</span>
                                ) : (
                                    <Badge variant="secondary">Not Scheduled</Badge>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-headline">Shipment Details</DialogTitle>
                    <p className="text-muted-foreground">Review the shipment details.</p>
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
                                {selectedShipment.hsnCode && <div><span className="font-semibold">HSN Code: </span>{selectedShipment.hsnCode}</div>}
                                {selectedShipment.modeOfShipment && <div><span className="font-semibold">Mode: </span>{selectedShipment.modeOfShipment}</div>}

                                <div><span className="font-semibold">Origin Port: </span>{selectedShipment.origin?.portOfLoading}</div>
                                <div><span className="font-semibold">Destination Port: </span>{selectedShipment.destination?.portOfDelivery}</div>
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
                        <Card className="bg-secondary border-dashed">
                            <CardContent className="p-6 flex items-center justify-center gap-4">
                                <Info className="text-muted-foreground h-5 w-5" />
                                <p className="text-muted-foreground text-center">
                                    {renderStatusMessage()}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
  );
}
