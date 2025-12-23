
"use client";

import { useState, useEffect, useCallback, Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, query, getDocs, DocumentData, Timestamp, where, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Send, Pencil, Clock, ShieldAlert, Calculator, Anchor, MapPin, Receipt, User as UserIcon, FileUp, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { CbmCalculatorDialog } from "@/components/cbm-calculator-dialog";
import { MODES_OF_SHIPMENT, CARGO_TYPES_BY_MODE, PACKAGE_TYPES, DIMENSION_UNITS, INCOTERMS, FOREIGN_SEA_PORTS, ATTACHMENT_TYPES } from "@/lib/constants";
import { Combobox } from "@/components/ui/combobox";
import { Checkbox } from "@/components/ui/checkbox";

const allPortsOptions = FOREIGN_SEA_PORTS.map(port => ({ value: port, label: port }));


const PageSkeleton = () => (
    <div className="container py-6 md:py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-48" />
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
  const [products, setProducts] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingShipmentId, setEditingShipmentId] = useState<string | null>(null);
  
  // Form state
  const [shipmentType, setShipmentType] = useState("");
  const [productName, setProductName] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [modeOfShipment, setModeOfShipment] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [packageType, setPackageType] = useState("");
  const [weight, setWeight] = useState("");
  const [dimensionL, setDimensionL] = useState("");
  const [dimensionW, setDimensionW] = useState("");
  const [dimensionH, setDimensionH] = useState("");
  const [dimensionUnit, setDimensionUnit] = useState("CMS");
  const [incoterm, setIncoterm] = useState("");
  const [numberOfPackages, setNumberOfPackages] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [deliveryDeadline, setDeliveryDeadline] = useState<Date>();
  const [placeOfReceipt, setPlaceOfReceipt] = useState("");
  const [otherPlaceOfReceipt, setOtherPlaceOfReceipt] = useState("");
  const [portOfLoading, setPortOfLoading] = useState("");
  const [originAddress, setOriginAddress] = useState("");
  const [portOfDischarge, setPortOfDischarge] = useState("");
  const [finalPlaceOfDelivery, setFinalPlaceOfDelivery] = useState("");
  const [otherFinalPlaceOfDelivery, setOtherFinalPlaceOfDelivery] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [packingListNo, setPackingListNo] = useState("");
  const [buyerCompanyName, setBuyerCompanyName] = useState("");
  const [buyerCountry, setBuyerCountry] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isCbmDialogOpen, setIsCbmDialogOpen] = useState(false);
  const [goLiveDate, setGoLiveDate] = useState<Date | undefined>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const isFCL = modeOfShipment === "Sea – FCL (Full Container Load)";
  
  const cargoTypeOptions = useMemo(() => {
    if (modeOfShipment && (CARGO_TYPES_BY_MODE as any)[modeOfShipment]) {
        return (CARGO_TYPES_BY_MODE as any)[modeOfShipment];
    }
    return [];
  }, [modeOfShipment]);

  const showDimensions = useMemo(() => {
    return (modeOfShipment === "Air Cargo" || modeOfShipment === "Sea – LCL (Less than Container Load)") && ["General Cargo", "HAZMAT", "Perishable"].includes(cargoType);
  }, [modeOfShipment, cargoType]);

  const calculatedCBM = useMemo(() => {
    const l = parseFloat(dimensionL) || 0;
    const w = parseFloat(dimensionW) || 0;
    const h = parseFloat(dimensionH) || 0;
    const packages = parseInt(numberOfPackages, 10) || 0;

    if (l <= 0 || w <= 0 || h <= 0 || packages <= 0) return 0;
    
    let cbmValue = l * w * h * packages;
    switch (dimensionUnit) {
        case "CMS": cbmValue /= 1000000; break;
        case "FEET": cbmValue *= 0.0283168; break;
        case "MM": cbmValue /= 1000000000; break;
        case "METRE": break;
    }
    return parseFloat(cbmValue.toFixed(4));
  }, [dimensionL, dimensionW, dimensionH, numberOfPackages, dimensionUnit]);


  useEffect(() => {
    // Reset cargo type if it's not in the current options
    if (cargoType && !cargoTypeOptions.find((opt: string) => opt === cargoType)) {
        setCargoType("");
    }
  }, [cargoType, cargoTypeOptions]);


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
    });
    return () => unsubscribe();
  }, [router]);
  
  const fetchProducts = useCallback(async (uid: string) => {
    setLoading(true);
    try {
      const shipmentsCollectionRef = collection(db, 'shipments');
      const q = query(shipmentsCollectionRef, where('exporterId', '==', uid));
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      productsList.sort((a, b) => {
        const timeA = a.createdAt?.toDate().getTime() || 0;
        const timeB = b.createdAt?.toDate().getTime() || 0;
        return timeB - timeA;
      });

      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products: ", error);
      toast({ title: "Error", description: "Could not fetch products.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (user) {
      if (userData?.verificationStatus === 'approved') {
        fetchProducts(user.uid);
      } else {
        setLoading(false);
      }
    }
  }, [user, userData, fetchProducts]);

  useEffect(() => {
    const editId = searchParams.get('edit');
    if (editId && user) {
        const fetchAndSetShipment = async () => {
            try {
                const shipmentDocRef = doc(db, 'shipments', editId);
                const docSnap = await getDoc(shipmentDocRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.exporterId !== user.uid) {
                         toast({ title: "Error", description: "You are not authorized to edit this shipment.", variant: "destructive" });
                         router.push('/dashboard/exporter');
                         return;
                    }

                    setShipmentType(data.shipmentType || "");
                    setProductName(data.productName || "");
                    setHsnCode(data.hsnCode || "");
                    setModeOfShipment(data.modeOfShipment || "");
                    setCargoType(data.cargo?.type || "");
                    setPackageType(data.cargo?.packageType || "");
                    setWeight(data.cargo?.weight || "");
                    setDimensionL(data.cargo?.dimensions?.length || "");
                    setDimensionW(data.cargo?.dimensions?.width || "");
                    setDimensionH(data.cargo?.dimensions?.height || "");
                    setDimensionUnit(data.cargo?.dimensions?.unit || "CMS");
                    setIncoterm(data.incoterm || "");
                    setNumberOfPackages(data.cargo?.numberOfPackages || "");
                    setEquipmentType(data.cargo?.equipmentType || "");
                    setDepartureDate(data.departureDate?.toDate());
                    setDeliveryDeadline(data.deliveryDeadline?.toDate());
                    setPlaceOfReceipt(data.origin?.placeOfReceipt || "");
                    setOtherPlaceOfReceipt(data.origin?.otherPlaceOfReceipt || "");
                    setPortOfLoading(data.origin?.portOfLoading || "");
                    setOriginAddress(data.origin?.address || "");
                    setPortOfDischarge(data.destination?.portOfDischarge || "");
                    setFinalPlaceOfDelivery(data.destination?.finalPlaceOfDelivery || "");
                    setOtherFinalPlaceOfDelivery(data.destination?.otherFinalPlaceOfDelivery || "");
                    setDestinationAddress(data.destination?.address || "");
                    setInvoiceNo(data.documentation?.invoiceNo || "");
                    setPackingListNo(data.documentation?.packingListNo || "");
                    setBuyerCompanyName(data.buyer?.companyName || "");
                    setBuyerCountry(data.buyer?.country || "");
                    setBuyerAddress(data.buyer?.address || "");
                    setBuyerEmail(data.buyer?.email || "");
                    setBuyerPhone(data.buyer?.phone || "");
                    setAttachments(data.certificationsNeeded || []);
                    setSpecialInstructions(data.specialInstructions || "");
                    
                    setEditingShipmentId(editId);
                    setOpen(true);
                } else {
                    toast({ title: "Error", description: "Shipment to edit not found.", variant: "destructive" });
                    router.push('/dashboard/exporter');
                }
            } catch (error) {
                console.error("Error fetching shipment for edit: ", error);
                toast({ title: "Error", description: "Failed to load shipment for editing.", variant: "destructive" });
                router.push('/dashboard/exporter');
            }
        };
        fetchAndSetShipment();
    }
  }, [searchParams, user, router, toast]);

  useEffect(() => {
    if (departureDate && deliveryDeadline && departureDate > deliveryDeadline) {
      setDeliveryDeadline(undefined);
      toast({
        title: "Info",
        description: "Delivery deadline was cleared as it cannot be before the departure date.",
      });
    }
  }, [departureDate, deliveryDeadline, toast]);

  const resetForm = () => {
    setShipmentType("");
    setProductName("");
    setHsnCode("");
    setModeOfShipment("");
    setCargoType("");
    setPackageType("");
    setWeight("");
    setDimensionL("");
    setDimensionW("");
    setDimensionH("");
    setDimensionUnit("CMS");
    setIncoterm("");
    setNumberOfPackages("");
    setEquipmentType("");
    setDepartureDate(undefined);
    setDeliveryDeadline(undefined);
    setPlaceOfReceipt("");
    setOtherPlaceOfReceipt("");
    setPortOfLoading("");
    setOriginAddress("");
    setPortOfDischarge("");
    setFinalPlaceOfDelivery("");
    setOtherFinalPlaceOfDelivery("");
    setDestinationAddress("");
    setInvoiceNo("");
    setPackingListNo("");
    setBuyerCompanyName("");
    setBuyerCountry("");
    setBuyerAddress("");
    setBuyerEmail("");
    setBuyerPhone("");
    setAttachments([]);
    setSpecialInstructions("");
    setEditingShipmentId(null);
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
        resetForm();
        router.push('/dashboard/exporter', { scroll: false });
    }
  }

  const handleValidation = () => {
    if (!productName || !portOfLoading || !originAddress || !portOfDischarge || !destinationAddress || !departureDate) {
      toast({ title: "Error", description: "Please fill out all required fields.", variant: "destructive" });
      return false;
    }
    if (hsnCode && (hsnCode.length < 6 || hsnCode.length > 8 || !/^\d+$/.test(hsnCode))) {
      toast({ title: "Invalid HSN Code", description: "HSN / ITC-HS Code must be 6-8 digits.", variant: "destructive" });
      return false;
    }
    if (!user) {
      toast({ title: "Error", description: "You must be logged in to create a shipment.", variant: "destructive" });
      return false;
    }
    return true;
  }
  
  const handleOpenScheduleDialog = () => {
    if (handleValidation()) {
        setIsScheduleDialogOpen(true);
    }
  }

  const handleSubmit = async (status: 'draft' | 'scheduled' = 'draft', goLiveTimestamp?: Timestamp | null) => {
    if (!handleValidation() || !user) return;

    setIsSubmitting(true);
    
    const shipmentPayload: any = {
      shipmentType,
      productName,
      hsnCode,
      modeOfShipment,
      cargo: {
        type: cargoType,
        packageType: packageType,
        weight,
        dimensions: {
          length: dimensionL,
          width: dimensionW,
          height: dimensionH,
          unit: dimensionUnit,
        },
        numberOfPackages: numberOfPackages,
        equipmentType: equipmentType,
      },
      incoterm: incoterm,
      departureDate: departureDate ? Timestamp.fromDate(departureDate) : null,
      deliveryDeadline: deliveryDeadline ? Timestamp.fromDate(deliveryDeadline) : null,
      origin: {
        placeOfReceipt: placeOfReceipt,
        otherPlaceOfReceipt: otherPlaceOfReceipt,
        portOfLoading,
        address: originAddress,
      },
      destination: {
        portOfDischarge,
        finalPlaceOfDelivery: finalPlaceOfDelivery,
        otherFinalPlaceOfDelivery: otherFinalPlaceOfDelivery,
        address: destinationAddress,
      },
      documentation: {
        invoiceNo,
        packingListNo,
      },
      buyer: {
        companyName: buyerCompanyName,
        country: buyerCountry,
        address: buyerAddress,
        email: buyerEmail,
        phone: buyerPhone,
      },
      certificationsNeeded: attachments,
      specialInstructions,
      status: status,
      ...(goLiveTimestamp && { goLiveAt: goLiveTimestamp })
    };
    
    try {
      if (editingShipmentId) {
        const shipmentDocRef = doc(db, "shipments", editingShipmentId);
        await updateDoc(shipmentDocRef, shipmentPayload);
        toast({ title: "Success", description: "Shipment updated." });
      } else {
        const userDocRef = doc(db, 'users', user.uid);
        const companyDetailsRef = doc(db, 'users', user.uid, 'companyDetails', user.uid);
        
        const [userDoc, companyDetailsDoc] = await Promise.all([
          getDoc(userDocRef),
          getDoc(companyDetailsRef)
        ]);
        
        const uData = userDoc.data();
        const companyData = companyDetailsDoc.data();
        
        const exporterName = companyData?.legalName || uData?.name || 'Unknown Exporter';

        await addDoc(collection(db, 'shipments'), {
          ...shipmentPayload,
          exporterId: user.uid,
          exporterName: exporterName,
          createdAt: Timestamp.now(),
        });
        const successMessage = status === 'draft' ? "Shipment request saved as draft." : "Shipment has been scheduled.";
        toast({ title: "Success", description: successMessage });
      }
      resetForm();
      setOpen(false);
      setIsScheduleDialogOpen(false);
      setGoLiveDate(undefined);
      router.push('/dashboard/exporter', { scroll: false });
      await fetchProducts(user.uid);
    } catch (error) {
      console.error("Error submitting document: ", error);
      toast({ title: "Error", description: "Failed to save shipment.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmSchedule = () => {
    if (goLiveDate) {
        initiatePayment();
    } else {
        toast({title: "Error", description: "Please select a date and time to go live.", variant: "destructive"})
    }
  }
  
  const handlePaymentSuccess = () => {
    if (goLiveDate) {
      const goLiveTimestamp = Timestamp.fromDate(goLiveDate);
      handleSubmit('scheduled', goLiveTimestamp);
    }
  }

  const initiatePayment = async () => {
    if (!user || !userData) {
      toast({ title: "Error", description: "You must be logged in to register.", variant: "destructive" });
      return;
    }
    
    setIsSubmitting(true); // Re-use isSubmitting for processing state
    const amount = 1000; // 1000 Rupees

    try {
        const res = await fetch('/api/razorpay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: amount * 100, // Amount in paise
                currency: "INR",
                notes: {
                    userId: user.uid,
                    action: "shipment-listing-fee"
                }
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.details || 'Failed to create Razorpay order.');
        }
        
        const order = await res.json();

        const options = {
            key: "rzp_test_RuMOD23vC1ZlS8", 
            amount: order.amount,
            currency: order.currency,
            name: "Shipment Listing Fee",
            description: `Fee to list shipment: ${productName}`,
            order_id: order.id,
            handler: function (response: any) {
                // Payment is successful, now schedule the shipment
                handlePaymentSuccess();
            },
            prefill: {
                name: userData.name,
                email: userData.email,
            },
            theme: {
                color: "#2563EB"
            }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
            toast({
                title: "Payment Failed",
                description: `Error: ${response.error.description}`,
                variant: "destructive"
            });
            setIsSubmitting(false); // Stop processing indicator on failure
        });
        rzp.open();
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        toast({
            title: "Error",
            description: `Could not initiate payment. ${errorMessage}`,
            variant: "destructive",
        });
        setIsSubmitting(false);
    }
  };
  
  const foreignPortOptions = useMemo(() => {
    return FOREIGN_SEA_PORTS.map(port => ({ value: port, label: port }));
  }, []);


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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'live':
        return 'success';
      case 'awarded':
        return 'success';
      case 'draft':
      case 'scheduled':
        return 'secondary';
      default:
        return 'outline';
    }
  }

  return (
    <>
    <div className="container py-6 md:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">My Shipments</h1>
        {isApproved && (
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpen(true)} className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" /> New Shipment Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader className="flex flex-row items-center justify-between">
                <div>
                  <DialogTitle className="text-2xl font-headline">{editingShipmentId ? 'Edit Shipment' : 'New Shipment'}</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to create or update your shipment request.
                  </DialogDescription>
                </div>
                {isFCL && (
                  <Button variant="outline" size="icon" type="button" onClick={() => setIsCbmDialogOpen(true)}>
                    <Calculator className="h-4 w-4" />
                    <span className="sr-only">Open CBM Calculator</span>
                  </Button>
                )}
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <Card className="bg-secondary">
                  <CardHeader><CardTitle>Product & Cargo Details</CardTitle></CardHeader>
                  <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="grid gap-2 lg:col-span-3">
                      <Label htmlFor="shipment-type">Shipment</Label>
                      <Select value={shipmentType} onValueChange={setShipmentType} disabled={isSubmitting}>
                        <SelectTrigger id="shipment-type">
                          <SelectValue placeholder="Select shipment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EXPORT">EXPORT</SelectItem>
                          <SelectItem value="IMPORT">IMPORT</SelectItem>
                          <SelectItem value="COASTAL MOVEMENT">COASTAL MOVEMENT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="product-name">Product Name</Label>
                      <Input id="product-name" placeholder="e.g., Electronics, Textiles" value={productName} onChange={e => setProductName(e.target.value)} disabled={isSubmitting} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="hsn-code">HSN / ITC-HS Code</Label>
                      <Input id="hsn-code" placeholder="e.g., 85171290" value={hsnCode} onChange={e => setHsnCode(e.target.value)} disabled={isSubmitting} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="mode-of-shipment">Mode of Shipment</Label>
                      <Select value={modeOfShipment} onValueChange={setModeOfShipment} disabled={isSubmitting}>
                        <SelectTrigger id="mode-of-shipment">
                          <SelectValue placeholder="Select a mode" />
                        </SelectTrigger>
                        <SelectContent>
                          {MODES_OF_SHIPMENT.map((mode) => (
                            <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cargo-type">Cargo Type</Label>
                      <Select value={cargoType} onValueChange={setCargoType} disabled={isSubmitting || !modeOfShipment}>
                        <SelectTrigger id="cargo-type">
                          <SelectValue placeholder="Select a cargo type" />
                        </SelectTrigger>
                        <SelectContent>
                          {cargoTypeOptions.map((option: string) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {!isFCL && (
                      <div className="grid gap-2">
                        <Label htmlFor="package-type">Package Type</Label>
                        <Select value={packageType} onValueChange={setPackageType} disabled={isSubmitting}>
                          <SelectTrigger id="package-type">
                            <SelectValue placeholder="Select a package type" />
                          </SelectTrigger>
                          <SelectContent>
                            {PACKAGE_TYPES.map((option) => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="number-of-packages">{isFCL ? "Number of Containers" : "Number of Packages"}</Label>
                        <Input id="number-of-packages" type="number" placeholder="e.g., 10" value={numberOfPackages} onChange={e => setNumberOfPackages(e.target.value)} disabled={isSubmitting} />
                    </div>

                    {isFCL && (
                        <div className="grid gap-2">
                            <Label htmlFor="equipment-type">Equipment Type</Label>
                            <Select value={equipmentType} onValueChange={setEquipmentType} disabled={isSubmitting}>
                                <SelectTrigger id="equipment-type"><SelectValue placeholder="Select equipment" /></SelectTrigger>
                                <SelectContent>
                                    {PACKAGE_TYPES.map(eq => <SelectItem key={eq} value={eq}>{eq}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="grid gap-2">
                      <Label htmlFor="weight">Total Weight</Label>
                      <div className="flex items-center">
                          <Input id="weight" type="number" placeholder="e.g., 1200" value={weight} onChange={e => setWeight(e.target.value)} disabled={isSubmitting} className="rounded-r-none" />
                          <span className="bg-muted text-muted-foreground px-3 py-2 border border-l-0 rounded-r-md">kg</span>
                      </div>
                    </div>
                    {showDimensions && (
                      <div className="grid gap-2 lg:col-span-3">
                        <Label>Dimensions (per package)</Label>
                        <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2">
                            <Input placeholder="Length" value={dimensionL} onChange={e => setDimensionL(e.target.value)} disabled={isSubmitting} />
                            <Input placeholder="Width" value={dimensionW} onChange={e => setDimensionW(e.target.value)} disabled={isSubmitting} />
                            <Input placeholder="Height" value={dimensionH} onChange={e => setDimensionH(e.target.value)} disabled={isSubmitting} />
                            <Select value={dimensionUnit} onValueChange={setDimensionUnit} disabled={isSubmitting}>
                              <SelectTrigger>
                                  <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                  {DIMENSION_UNITS.map((unit) => (
                                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                        </div>
                         {calculatedCBM > 0 && <Badge variant="secondary" className="w-fit">Total CBM: {calculatedCBM}</Badge>}
                      </div>
                    )}
                     <div className="grid gap-2">
                        <Label htmlFor="incoterm">Incoterms</Label>
                        <Select value={incoterm} onValueChange={setIncoterm} disabled={isSubmitting}>
                            <SelectTrigger id="incoterm"><SelectValue placeholder="Select Incoterm" /></SelectTrigger>
                            <SelectContent>
                                {INCOTERMS.map(term => <SelectItem key={term} value={term}>{term}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-secondary">
                    <CardHeader><CardTitle>Scheduling</CardTitle></CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                      <div className="grid gap-2">
                          <Label>Preferred Departure Date</Label>
                          <DateTimePicker 
                              date={departureDate}
                              setDate={setDepartureDate}
                              disabled={isSubmitting}
                              disabledDates={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                          />
                      </div>
                      <div className="grid gap-2">
                          <Label>Delivery Deadline</Label>
                          <DateTimePicker 
                              date={deliveryDeadline}
                              setDate={setDeliveryDeadline}
                              disabled={isSubmitting || !departureDate}
                              disabledDates={(date) => departureDate ? date < departureDate : date < new Date(new Date().setHours(0,0,0,0))}
                          />
                      </div>
                    </CardContent>
                </Card>
                
                 <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-secondary">
                        <CardHeader><CardTitle className="flex items-center gap-2"><Anchor className="h-5 w-5 text-primary" /> Origin</CardTitle></CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="place-of-receipt">Place of Receipt</Label>
                                <Combobox
                                    options={allPortsOptions}
                                    value={placeOfReceipt}
                                    onChange={setPlaceOfReceipt}
                                    placeholder="Search ports..."
                                    searchPlaceholder="Search ports..."
                                    noResultsMessage="No ports found."
                                />
                            </div>
                            {placeOfReceipt === 'Other' && (
                                <div className="grid gap-2">
                                    <Label htmlFor="other-place-of-receipt">Please specify Place of Receipt</Label>
                                    <Input id="other-place-of-receipt" placeholder="Enter ICD name" value={otherPlaceOfReceipt} onChange={e => setOtherPlaceOfReceipt(e.target.value)} disabled={isSubmitting} />
                                </div>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="port-of-loading">Port of Loading</Label>
                                <Combobox
                                    options={allPortsOptions}
                                    value={portOfLoading}
                                    onChange={setPortOfLoading}
                                    placeholder="Search ports..."
                                    searchPlaceholder="Search ports..."
                                    noResultsMessage="No ports found."
                                />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="origin-address">Origin Address</Label>
                                <Textarea id="origin-address" placeholder="Enter the full origin address" value={originAddress} onChange={e => setOriginAddress(e.target.value)} disabled={isSubmitting} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary">
                        <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Destination</CardTitle></CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="port-of-discharge">Port of Discharge</Label>
                                <Combobox
                                    options={foreignPortOptions}
                                    value={portOfDischarge}
                                    onChange={setPortOfDischarge}
                                    placeholder="Search foreign ports..."
                                    searchPlaceholder="Search ports..."
                                    noResultsMessage="No ports found."
                                />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="final-place-of-delivery">Final Place of Delivery</Label>
                                <Combobox
                                    options={allPortsOptions}
                                    value={finalPlaceOfDelivery}
                                    onChange={setFinalPlaceOfDelivery}
                                    placeholder="Search ports..."
                                    searchPlaceholder="Search ports..."
                                    noResultsMessage="No ports found."
                                />
                            </div>
                            {finalPlaceOfDelivery === 'Other' && (
                                <div className="grid gap-2">
                                    <Label htmlFor="other-final-place-of-delivery">Please specify Final Place of Delivery</Label>
                                    <Input id="other-final-place-of-delivery" placeholder="Enter ICD name" value={otherFinalPlaceOfDelivery} onChange={e => setOtherFinalPlaceOfDelivery(e.target.value)} disabled={isSubmitting} />
                                </div>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="destination-address">Destination Address</Label>
                                <Textarea id="destination-address" placeholder="Enter the full destination address" value={destinationAddress} onChange={e => setDestinationAddress(e.target.value)} disabled={isSubmitting} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
              
                <Card className="bg-secondary">
                  <CardHeader><CardTitle className="flex items-center gap-2"><Receipt className="h-5 w-5 text-primary" /> Documentation</CardTitle></CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6">
                      <div className="grid gap-4">
                          <div className="grid gap-2">
                              <Label htmlFor="invoice-number">Export Invoice Number</Label>
                              <Input id="invoice-number" placeholder="e.g., EXP-001/23-24" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
                          </div>
                          <div className="grid gap-2">
                              <Label htmlFor="invoice-upload">Invoice Upload</Label>
                              <Input id="invoice-upload" type="file" />
                          </div>
                      </div>
                      <div className="grid gap-4">
                          <div className="grid gap-2">
                              <Label htmlFor="packing-list-number">Packing List Number</Label>
                              <Input id="packing-list-number" placeholder="e.g., PKL-001/23-24" value={packingListNo} onChange={(e) => setPackingListNo(e.target.value)} />
                          </div>
                          <div className="grid gap-2">
                              <Label htmlFor="packing-list-upload">Packing List Upload</Label>
                              <Input id="packing-list-upload" type="file" />
                          </div>
                      </div>
                  </CardContent>
                </Card>

                <Card className="bg-secondary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><UserIcon className="h-5 w-5 text-primary" />Buyer's / Seller's Information</CardTitle>
                    <CardDescription>Details of the overseas buyer.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6">
                      <div className="grid gap-2">
                        <Label>Company Name</Label>
                        <Input placeholder="Buyer's company name" value={buyerCompanyName} onChange={(e) => setBuyerCompanyName(e.target.value)} />
                      </div>
                      <div className="grid gap-2">
                        <Label>Country</Label>
                        <Input placeholder="Country" value={buyerCountry} onChange={(e) => setBuyerCountry(e.target.value)} />
                      </div>
                      <div className="grid gap-2 md:col-span-2">
                        <Label>Address</Label>
                        <Textarea placeholder="Full address" value={buyerAddress} onChange={(e) => setBuyerAddress(e.target.value)} />
                      </div>
                      <div className="grid gap-2">
                        <Label>Email</Label>
                        <Input type="email" placeholder="Buyer's email" value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} />
                      </div>
                      <div className="grid gap-2">
                        <Label>Phone</Label>
                        <Input type="tel" placeholder="Buyer's phone" value={buyerPhone} onChange={(e) => setBuyerPhone(e.target.value)} />
                      </div>
                  </CardContent>
                </Card>

                <Card className="bg-secondary">
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><FileUp className="h-6 w-6 text-primary" /> Certifications Needed</CardTitle>
                        <CardDescription>Select all relevant certificates to be attached. Actual file upload is not yet implemented.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {ATTACHMENT_TYPES.map((item) => (
                            <div key={item} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`attachment-${item}`}
                                    checked={attachments.includes(item)}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setAttachments(prev => [...prev, item]);
                                        } else {
                                            setAttachments(prev => prev.filter(i => i !== item));
                                        }
                                    }}
                                />
                                <Label htmlFor={`attachment-${item}`} className="font-normal">{item}</Label>
                            </div>
                        ))}
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="bg-secondary">
                    <CardHeader><CardTitle>Additional Information</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid gap-2">
                            <Label htmlFor="special-instructions">Special Instructions</Label>
                            <Textarea id="special-instructions" placeholder="e.g., Handle with care, keep refrigerated below 5°C." value={specialInstructions} onChange={e => setSpecialInstructions(e.target.value)} disabled={isSubmitting} />
                        </div>
                    </CardContent>
                </Card>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => handleSubmit('draft')} disabled={isSubmitting}>
                    {editingShipmentId ? <Pencil className="mr-2 h-4 w-4" /> : <Send className="mr-2 h-4 w-4" />}
                     {isSubmitting ? 'Saving...' : (editingShipmentId ? 'Save Changes to Draft' : 'Save as Draft')}
                </Button>
                <Button type="button" onClick={handleOpenScheduleDialog} disabled={isSubmitting || !isApproved} title={!isApproved ? "Your account must be approved to schedule shipments." : ""}>
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      {!isApproved && <div className="mb-8"><VerificationStatus /></div>}
      
      <AlertDialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Schedule Go-Live Time</AlertDialogTitle>
            <AlertDialogDescription>
                Select the exact date and time you want this shipment to go live for bidding. A listing fee is required.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4 space-y-4">
                <DateTimePicker
                    date={goLiveDate}
                    setDate={setGoLiveDate}
                    disabledDates={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                />
                 <Card className="bg-secondary">
                    <CardContent className="p-4 flex items-center justify-between">
                        <p className="font-semibold">Shipment Listing Fee</p>
                        <p className="font-bold text-lg">₹1000</p>
                    </CardContent>
                </Card>
            </div>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setGoLiveDate(undefined)} disabled={isSubmitting}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmSchedule} disabled={!goLiveDate || isSubmitting}>
                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</> : 'Pay & Schedule'}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {products.length > 0 ? (
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="hidden md:table-cell">Destination</TableHead>
                <TableHead className="hidden lg:table-cell">Departure Date</TableHead>
                <TableHead className="hidden lg:table-cell">Delivery Deadline</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} onClick={() => router.push(`/dashboard/shipment/${product.id}`)} className="cursor-pointer">
                  <TableCell className="font-medium">{product.productName || 'N/A'}</TableCell>
                  <TableCell className="hidden md:table-cell">{product.destination?.portOfDischarge || 'N/A'}</TableCell>
                  <TableCell className="hidden lg:table-cell">{product.departureDate ? format(product.departureDate.toDate(), "PP") : 'N/A'}</TableCell>
                  <TableCell className="hidden lg:table-cell">{product.deliveryDeadline ? format(product.deliveryDeadline.toDate(), "PP") : 'N/A'}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getStatusVariant(product.status)} className={cn("capitalize", { "animate-blink bg-green-500/80": product.status === 'live' })}>
                        {product.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        isApproved && (
          <div className="border rounded-lg p-12 text-center bg-card dark:bg-card">
            <h2 className="text-xl font-semibold mb-2">No shipment requests yet</h2>
            <p className="text-muted-foreground">Click "New Shipment Request" to get started.</p>
          </div>
        )
      )}
    </div>
    <CbmCalculatorDialog open={isCbmDialogOpen} setOpen={setIsCbmDialogOpen} />
    </>
  );
}
