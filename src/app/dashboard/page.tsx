
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, query, getDocs, DocumentData, orderBy, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Calendar as CalendarIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  
  // Form state
  const [productName, setProductName] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [totalWeight, setTotalWeight] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [deliveryDeadline, setDeliveryDeadline] = useState<Date>();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);
  
  const fetchProducts = useCallback(async (uid: string) => {
    try {
      const productsCollectionRef = collection(db, 'users', uid, 'products');
      const q = query(productsCollectionRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
      fetchProducts(user.uid);
    }
  }, [user, fetchProducts]);

  const resetForm = () => {
    setProductName("");
    setHsnCode("");
    setTotalWeight("");
    setCargoType("");
    setLength("");
    setWidth("");
    setHeight("");
    setDepartureDate(undefined);
    setDeliveryDeadline(undefined);
  }

  const handleAddProduct = async () => {
    if (!productName || !totalWeight || !cargoType || !departureDate || !deliveryDeadline) {
      toast({ title: "Error", description: "Please fill out Product Name, Total Weight, Cargo Type, and Scheduling dates.", variant: "destructive" });
      return;
    }
    if (!user) {
      toast({ title: "Error", description: "You must be logged in to add a product.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'users', user.uid, 'products'), {
        productName,
        hsnCode,
        totalWeight: totalWeight ? parseFloat(totalWeight) : null,
        cargoType,
        dimensions: {
            length: length ? parseFloat(length) : null,
            width: width ? parseFloat(width) : null,
            height: height ? parseFloat(height) : null,
        },
        departureDate: departureDate ? Timestamp.fromDate(departureDate) : null,
        deliveryDeadline: deliveryDeadline ? Timestamp.fromDate(deliveryDeadline) : null,
        createdAt: new Date(),
      });
      toast({ title: "Success", description: "Shipment request created." });
      resetForm();
      setOpen(false);
      await fetchProducts(user.uid); // Refetch products
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({ title: "Error", description: "Failed to create shipment request.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !user) {
    return (
        <div className="container py-10">
            <div className="flex justify-between items-center mb-8">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-48" />
            </div>
            <Skeleton className="h-64 w-full" />
        </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">Shipments</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> New Shipment Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-headline">New Shipment Request</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="e.g., Premium Coffee Beans" value={productName} onChange={e => setProductName(e.target.value)} disabled={isSubmitting} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="hsn-code">HSN Code</Label>
                    <Input id="hsn-code" placeholder="e.g., 0901" value={hsnCode} onChange={e => setHsnCode(e.target.value)} disabled={isSubmitting} />
                  </div>
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="total-weight">Total Weight (kg)</Label>
                    <Input id="total-weight" type="number" placeholder="500" value={totalWeight} onChange={e => setTotalWeight(e.target.value)} disabled={isSubmitting} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cargo Details</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="cargo-type">Cargo Type</Label>
                    <Select onValueChange={setCargoType} value={cargoType} disabled={isSubmitting}>
                      <SelectTrigger id="cargo-type">
                        <SelectValue placeholder="Select a cargo type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Cargo">General Cargo</SelectItem>
                        <SelectItem value="Refrigerated">Refrigerated</SelectItem>
                        <SelectItem value="Hazardous Materials">Hazardous Materials</SelectItem>
                        <SelectItem value="Bulk Cargo">Bulk Cargo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Cargo Dimensions (L x W x H in meters)</Label>
                    <div className="flex gap-2">
                      <Input type="number" placeholder="Length" value={length} onChange={e => setLength(e.target.value)} disabled={isSubmitting} />
                      <Input type="number" placeholder="Width" value={width} onChange={e => setWidth(e.target.value)} disabled={isSubmitting} />
                      <Input type="number" placeholder="Height" value={height} onChange={e => setHeight(e.target.value)} disabled={isSubmitting} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Scheduling</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="departure-date">Preferred Departure Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal",
                            !departureDate && "text-muted-foreground"
                          )}
                          disabled={isSubmitting}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {departureDate ? format(departureDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={departureDate}
                          onSelect={setDepartureDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="delivery-deadline">Delivery Deadline</Label>
                     <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal",
                            !deliveryDeadline && "text-muted-foreground"
                          )}
                           disabled={isSubmitting}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {deliveryDeadline ? format(deliveryDeadline, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={deliveryDeadline}
                          onSelect={setDeliveryDeadline}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardContent>
              </Card>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddProduct} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {products.length > 0 ? (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Cargo Type</TableHead>
                <TableHead>Weight (kg)</TableHead>
                <TableHead>Departure Date</TableHead>
                <TableHead className="text-right">Delivery Deadline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.productName}</TableCell>
                  <TableCell>{product.cargoType}</TableCell>
                  <TableCell>{product.totalWeight}</TableCell>
                  <TableCell>{product.departureDate ? format(product.departureDate.toDate(), "PPP") : 'N/A'}</TableCell>
                  <TableCell className="text-right">{product.deliveryDeadline ? format(product.deliveryDeadline.toDate(), "PPP") : 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="border rounded-lg p-12 text-center bg-card">
          <h2 className="text-xl font-semibold mb-2">No shipment requests yet</h2>
          <p className="text-muted-foreground">Click "New Shipment Request" to get started.</p>
        </div>
      )}
    </div>
  );
}
